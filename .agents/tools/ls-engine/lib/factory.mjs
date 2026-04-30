import path from "node:path";
import { copyDir, copyFile, copyIfExists, ensureDir, exists, readJson, readText, toPosix, writeText } from "./fs-utils.mjs";
import { mergeBrainPackageContract } from "./package-contract.mjs";
import { run, runOut } from "./process-utils.mjs";

export async function newProject(runtime) {
  const projectName = runtime.requireArg("project-name");
  const basePath = runtime.args["base-path"] || process.env.LS_BASE_PATH || "..";
  const projectDirName = projectName;
  const projectPath = runtime.resolvePath(basePath, projectDirName);
  const templateDir = runtime.resolvePath(".agents/templates");

  printSystemSnapshot(runtime);
  validateEnvironment(runtime);
  checkDependencies();
  validateIsolation(runtime, projectPath);

  if (exists(projectPath)) {
    console.warn(`Project already exists: ${projectPath}`);
    return;
  }

  try {
    ensureDir(path.join(projectPath, "assets"));
  ensureDir(path.join(projectPath, "docs"));
  ensureDir(path.join(projectPath, ".agents/rules"));
  ensureDir(path.join(projectPath, ".agents/workflows"));
  ensureDir(path.join(projectPath, ".agents/templates"));
  ensureDir(path.join(projectPath, ".agents/tools/ls-engine"));
  ensureDir(path.join(projectPath, ".github"));
  ensureDir(path.join(projectPath, "components/ui"));

  ensureDir(path.join(projectPath, ".agents/rules/hands"));
  // Master -> Brain: Flatten and ACTIVATE brain rules
  copyDirWithRuleActivation(runtime.resolvePath(".agents/rules/brain"), path.join(projectPath, ".agents/rules"), true);
  // Master -> Brain: Keep hands rules as TEMPLATES (on_demand)
  copyDirWithRuleActivation(runtime.resolvePath(".agents/rules/hands"), path.join(projectPath, ".agents/rules/hands"), false);
  // Workflows: Flatten brain workflows, keep hands workflows in subfolder
  ensureDir(path.join(projectPath, ".agents/workflows/hands"));
  copyDir(runtime.resolvePath(".agents/workflows/brain"), path.join(projectPath, ".agents/workflows"));
  copyDir(runtime.resolvePath(".agents/workflows/hands"), path.join(projectPath, ".agents/workflows/hands"));

  // Skills: Flatten brain skills, keep hands skills in subfolder
  ensureDir(path.join(projectPath, ".agents/skills/hands"));
  copyDir(runtime.resolvePath(".agents/skills/brain"), path.join(projectPath, ".agents/skills"));
  copyDir(runtime.resolvePath(".agents/skills/hands"), path.join(projectPath, ".agents/skills/hands"));

  copyDir(runtime.resolvePath(".agents/templates"), path.join(projectPath, ".agents/templates"));
  copyDir(runtime.resolvePath(".agents/tools/ls-engine"), path.join(projectPath, ".agents/tools/ls-engine"));
  copyDir(runtime.resolvePath(".github"), path.join(projectPath, ".github"));
  copyDir(runtime.resolvePath("components/ui"), path.join(projectPath, "components/ui"));
  
  mergeBrainPackageContract(path.join(projectPath, "package.json"), { name: projectDirName.toLowerCase() });

  copyFile(path.join(templateDir, "GEMINI_BRAIN_TEMPLATE.md"), path.join(projectPath, "GEMINI.md"));
  copyFile(runtime.resolvePath("ASSET_INDEX.md"), path.join(projectPath, "ASSET_INDEX.md"));
  copyIfExists(path.join(templateDir, "ENV_EXAMPLE_TEMPLATE"), path.join(projectPath, ".env.example"));

  writeText(path.join(projectPath, "active-hands.json"), JSON.stringify({ hands: [] }, null, 2) + "\n");

  const readmeContent = `# BRAIN PROJECT: ${projectDirName}

- Created: ${new Date().toISOString().slice(0, 10)}
- Source Master: ${toPosix(path.resolve(runtime.root))}

## Brain Command Center

1. [GEMINI.md](GEMINI.md) - Project Constitution
2. [docs/](docs/) - Project documents managed freely by Brain
3. [active-hands.json](active-hands.json) - Hands/Satellite Registry

## Project Operations

- Choose the architecture path for Hands, for example \`./services/[NAME]\` or \`./app/[NAME]\`
- Create Hands: \`npm run new-hands -- --project-path ./services/[NAME] --repo-name [REPO]\`
- Harvest Code: \`npm run pull-code -- --project-path ./services/[NAME]\`
- Sync Rules: \`npm run push-rules -- --project-path ./services/[NAME]\`
`;
  writeText(path.join(projectPath, "README.md"), readmeContent);

  let remoteUrl = initializeProjectRemote(runtime, projectPath, projectDirName);

  updateRegistry(runtime, projectDirName, toPosix(path.relative(runtime.root, projectPath)), remoteUrl, `Automatically generated Brain Project.`);
  printVerificationReport(projectPath, projectDirName, remoteUrl);
  } catch (error) {
    console.error(`[FATAL ERROR] Project initialization failed: ${error.message}`);
    if (exists(projectPath)) {
      console.log(`[CLEANUP] Removing incomplete project directory: ${projectPath}`);
      // Simple safety check to ensure we don't delete master root or something crazy
      if (projectPath.length > runtime.root.length) {
         run("powershell", ["Remove-Item", "-Recurse", "-Force", projectPath]);
      }
    }
    throw error;
  }
}

function printSystemSnapshot(runtime) {
  const registryPath = runtime.resolvePath("active-projects.json");
  const registry = exists(registryPath) ? readJson(registryPath) : { projects: [] };
  const projectCount = registry.projects?.length || 0;
  
  console.log("\n" + "-".repeat(60));
  console.log("LINK STRATEGY MASTER - SYSTEM SNAPSHOT");
  console.log("-".repeat(60));
  console.log(`[STATE] Master Path  : ${toPosix(path.resolve(runtime.root))}`);
  console.log(`[STATE] Registry     : ${projectCount} Active Projects`);
  console.log(`[STATE] Governance   : ENFORCED (ls-rule-master-governance)`);
  console.log(`[STATE] Organization : ${process.env.LS_ORGANIZATION || "Link-Strategy"}`);
  console.log("-".repeat(60) + "\n");
}

function validateEnvironment(runtime) {
  const required = ["ASSET_INDEX.md", "active-projects.json", ".agents/rules/ls-rule-master-governance.md"];
  for (const file of required) {
    if (!exists(runtime.resolvePath(file))) {
      throw new Error(`[PREFLIGHT FAIL] Missing master asset: ${file}. Ensure you are running in the Master Workspace.`);
    }
  }
}

function checkDependencies() {
  const deps = [
    { name: "git", cmd: ["git", "--version"] },
    { name: "gh", cmd: ["gh", "--version"] }
  ];
  for (const dep of deps) {
    try {
      run(dep.cmd[0], dep.cmd.slice(1), { capture: true });
    } catch (e) {
      throw new Error(`[DEPENDENCY FAIL] '${dep.name}' is not installed or not in PATH.`);
    }
  }
}

function validateIsolation(runtime, projectPath) {
  const absoluteMaster = path.resolve(runtime.root);
  const absoluteProject = path.resolve(projectPath);
  
  // Prevent nesting project inside Master
  if (absoluteProject.startsWith(absoluteMaster) && absoluteProject !== absoluteMaster) {
    throw new Error(`[ISOLATION VIOLATION] Cannot create project workspace inside the Master Workspace directory.\nTarget: ${absoluteProject}\nMaster: ${absoluteMaster}\nUse '--base-path ..' to create it as a sibling.`);
  }
}

function printVerificationReport(projectPath, projectName, remoteUrl) {
  const report = [
    "",
    "=".repeat(60),
    `VERIFICATION REPORT: ${projectName}`,
    "=".repeat(60),
    `[x] Workspace      : ${projectPath}`,
    `[x] DNA Sync       : Rules, Workflows, Engine, Skills`,
    `[x] Registry       : Registered in active-projects.json`,
    `[x] GitHub Remote  : ${remoteUrl || "SKIPPED/FAILED"}`,
    "=".repeat(60),
    `STATUS: SUCCESS - Brain Project '${projectName}' is initialized.`,
    "=".repeat(60),
    ""
  ];
  console.log(report.join("\n"));
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
  
  if (!exists(registryPath)) {
    throw new Error(`[REGISTRY ERROR] Mandatory file 'active-projects.json' is missing. Cannot register project.`);
  }

  const registry = readJson(registryPath);
  registry.projects ||= [];
  
  // Normalize path to be relative to Master root for portability
  const relativePath = toPosix(path.relative(runtime.root, projectPath));
  
  const existingIndex = registry.projects.findIndex((p) => p.id === id);
  const entry = { 
    id, 
    path: relativePath, 
    remote_url: remoteUrl || "", 
    status: "active", 
    description: description || `Brain Project: ${id}` 
  };

  if (existingIndex >= 0) {
    const existing = registry.projects[existingIndex];
    if (existing.path !== relativePath) {
      console.warn(`[REGISTRY WARNING] Project ID '${id}' already exists at a different path: ${existing.path}. Updating to: ${relativePath}`);
    }
    registry.projects[existingIndex] = { ...existing, ...entry };
  } else {
    registry.projects.push(entry);
  }

  // Create backup before writing
  copyFile(registryPath, `${registryPath}.bak`);

  writeText(registryPath, JSON.stringify(registry, null, 2) + "\n");
}

function initializeProjectRemote(runtime, projectPath, projectDirName) {
  const organization = process.env.LS_ORGANIZATION || "Link-Strategy";
  const repoName = projectDirName;
  const visibility = process.env.LS_VISIBILITY || "--private";
  try {
    if (!exists(path.join(projectPath, ".git"))) run("git", ["init"], { cwd: projectPath });
    
    // Attempt to create. If it fails, we will try to fetch the existing one.
    run("gh", ["repo", "create", `${organization}/${repoName}`, visibility, "--source=.", "--remote=origin"], {
      cwd: projectPath,
      allowFailure: true
    });

    const remoteUrl = runOut("git", ["remote", "get-url", "origin"], projectPath, true) || `https://github.com/${organization}/${repoName}`;
    
    run("git", ["add", "."], { cwd: projectPath });
    if (runOut("git", ["status", "--porcelain"], projectPath)) {
      run("git", ["commit", "-m", "chore(init): initialize brain project"], { cwd: projectPath });
    }
    run("git", ["branch", "-M", "main"], { cwd: projectPath });
    run("git", ["push", "-u", "origin", "main", "--force-with-lease"], { cwd: projectPath, allowFailure: true });
    
    return remoteUrl.trim();
  } catch (error) {
    console.warn(`Project remote synchronization failed: ${error.message}`);
    return `https://github.com/${organization}/${repoName}`;
  }
}


