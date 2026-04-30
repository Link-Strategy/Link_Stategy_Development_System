import path from "node:path";
import { copyDir, copyFile, copyIfExists, ensureDir, exists, readJson, toPosix, writeText } from "./fs-utils.mjs";
import { mergeBrainPackageContract } from "./package-contract.mjs";
import { run, runOut } from "./process-utils.mjs";

export async function newProject(runtime) {
  const projectName = runtime.requireArg("project-name");
  const basePath = runtime.args["base-path"] || "..";
  const projectDirName = projectName;
  const projectPath = runtime.resolvePath(basePath, projectDirName);
  const templateDir = runtime.resolvePath(".agents/templates");

  if (exists(projectPath)) {
    console.warn(`Project already exists: ${projectPath}`);
    return;
  }

  ensureDir(path.join(projectPath, "assets"));
  ensureDir(path.join(projectPath, "docs"));
  ensureDir(path.join(projectPath, ".agents/rules"));
  ensureDir(path.join(projectPath, ".agents/workflows"));
  ensureDir(path.join(projectPath, ".agents/templates"));
  ensureDir(path.join(projectPath, ".agents/tools/ls-engine"));
  ensureDir(path.join(projectPath, ".github"));
  ensureDir(path.join(projectPath, "components/ui"));

  copyDir(runtime.resolvePath(".agents/rules"), path.join(projectPath, ".agents/rules"));
  copyDir(runtime.resolvePath(".agents/workflows"), path.join(projectPath, ".agents/workflows"));
  copyDir(runtime.resolvePath(".agents/templates"), path.join(projectPath, ".agents/templates"));
  copyDir(runtime.resolvePath(".agents/tools/ls-engine"), path.join(projectPath, ".agents/tools/ls-engine"));
  copyDir(runtime.resolvePath(".agents/skills"), path.join(projectPath, ".agents/skills"));
  copyDir(runtime.resolvePath(".github"), path.join(projectPath, ".github"));
  copyDir(runtime.resolvePath("components/ui"), path.join(projectPath, "components/ui"));
  
  mergeBrainPackageContract(path.join(projectPath, "package.json"), { name: projectDirName.toLowerCase() });

  copyFile(path.join(templateDir, "GEMINI_BRAIN_TEMPLATE.md"), path.join(projectPath, "GEMINI.md"));
  copyFile(runtime.resolvePath("ASSET_INDEX.md"), path.join(projectPath, "ASSET_INDEX.md"));
  copyIfExists(path.join(templateDir, "ENV_EXAMPLE_TEMPLATE"), path.join(projectPath, ".env.example"));

  writeText(path.join(projectPath, "active-hands.json"), JSON.stringify({ hands: [] }, null, 2) + "\n");

  writeText(path.join(projectPath, "README.md"), `# BRAIN PROJECT: ${projectDirName}

- Created: ${new Date().toISOString().slice(0, 10)}

## Brain Command Center

1. [GEMINI.md](GEMINI.md) - Project Constitution
2. [docs/](docs/) - Project documents managed freely by Brain
3. [active-hands.json](active-hands.json) - Hands/Satellite Registry

## Project Operations

- Choose the architecture path for Hands, for example \`./services/[NAME]\` or \`./app/[NAME]\`
- Create Hands: \`npm run new-hands -- --project-path ./services/[NAME] --repo-name [REPO]\`
- Harvest Code: \`npm run pull-code -- --project-path ./services/[NAME]\`
- Sync Rules: \`npm run push-rules -- --project-path ./services/[NAME]\`
`);

  let remoteUrl = runtime.args["remote-url"] || "";
  if (!runtime.args["no-github"] && !remoteUrl) {
    remoteUrl = initializeProjectRemote(runtime, projectPath, projectDirName);
  }

  updateRegistry(runtime, projectDirName, toPosix(path.relative(runtime.root, projectPath)), remoteUrl, `Automatically generated Brain Project.`);
  console.log(`Success: Brain Project Workspace created at ${projectPath}`);
}

export function newModule(runtime) {
  const projectPath = runtime.resolvePath(runtime.requireArg("project-path"));
  const moduleName = runtime.requireArg("module-name");
  if (!exists(projectPath)) throw new Error(`Project path does not exist: ${projectPath}`);
  const moduleDir = path.join(projectPath, "src", moduleName);
  const docsDir = path.join(projectPath, "docs", "blueprints", moduleName);
  ensureDir(moduleDir);
  ensureDir(docsDir);
  copyIfExists(runtime.resolvePath(".agents/templates/01_TASK_SPEC_TEMPLATE.md"), path.join(docsDir, "01_TASK_SPEC.md"));
  writeText(path.join(moduleDir, "README.md"), `# MODULE: ${moduleName}

[Description]

- [Spec](../../docs/blueprints/${moduleName}/01_TASK_SPEC.md)
`);
  console.log(`Success: Module added at ${moduleDir}`);
}

function updateRegistry(runtime, id, projectPath, remoteUrl, description) {
  const registryPath = runtime.resolvePath("active-projects.json");
  if (!exists(registryPath)) return;
  const registry = readJson(registryPath);
  registry.projects ||= [];
  const existing = registry.projects.find((project) => project.id === id);
  if (existing) {
    existing.path ||= projectPath;
    if (remoteUrl) existing.remote_url = remoteUrl;
  } else {
    registry.projects.push({ id, path: projectPath, remote_url: remoteUrl, status: "active", description });
  }
  writeText(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
}

function initializeProjectRemote(runtime, projectPath, projectDirName) {
  const organization = runtime.args.organization || "linkstrategy";
  const repoName = runtime.args["repo-name"] || projectDirName;
  const visibility = runtime.args.public ? "--public" : "--private";
  try {
    if (!exists(path.join(projectPath, ".git"))) run("git", ["init"], { cwd: projectPath });
    run("git", ["add", "."], { cwd: projectPath });
    if (runOut("git", ["status", "--porcelain"], projectPath)) {
      run("git", ["commit", "-m", "chore(init): initialize brain project"], { cwd: projectPath });
    }
    run("git", ["branch", "-M", "main"], { cwd: projectPath });
    const remoteUrl = ensureProjectOriginRemote(projectPath, organization, repoName, visibility);
    run("git", ["push", "-u", "origin", "main", "--force-with-lease"], { cwd: projectPath });
    return remoteUrl;
  } catch (error) {
    console.warn(`Project remote setup failed: ${error.message}`);
    return `https://github.com/${organization}/${repoName}`;
  }
}

function ensureProjectOriginRemote(projectPath, organization, repoName, visibility) {
  const existingOrigin = runOut("git", ["remote", "get-url", "origin"], projectPath, true);
  if (existingOrigin) return existingOrigin.trim();
  const result = run("gh", ["repo", "create", `${organization}/${repoName}`, visibility, "--source=.", "--remote=origin"], {
    cwd: projectPath,
    capture: true,
    allowFailure: true
  });
  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || "").trim();
    throw new Error(`Failed to create GitHub repo or configure origin. Install/authenticate gh or add origin manually.\n${detail}`);
  }
  return `https://github.com/${organization}/${repoName}`;
}
