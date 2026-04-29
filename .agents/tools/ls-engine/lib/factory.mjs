import path from "node:path";
import { copyDir, copyFile, copyIfExists, ensureDir, exists, readJson, toPosix, writeText } from "./fs-utils.mjs";
import { mergeBrainPackageContract } from "./package-contract.mjs";

export async function newProject(runtime) {
  const clientId = runtime.requireArg("client-id");
  const projectName = runtime.requireArg("project-name");
  const projectType = runtime.requireArg("project-type");
  const basePath = runtime.args["base-path"] || "..";
  const projectDirName = `${clientId.toUpperCase()}-${projectName}`;
  const projectPath = runtime.resolvePath(basePath, projectDirName);
  const templateDir = runtime.resolvePath(".agents/templates");

  if (exists(projectPath)) {
    console.warn(`Project already exists: ${projectPath}`);
    return;
  }

  ensureDir(path.join(projectPath, "src"));
  ensureDir(path.join(projectPath, "tests"));
  ensureDir(path.join(projectPath, "assets"));
  ensureDir(path.join(projectPath, "hands"));
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
  copyIfExists(path.join(templateDir, "01_TASK_SPEC_TEMPLATE.md"), path.join(projectPath, "01_TASK_SPEC.md"));
  copyIfExists(path.join(templateDir, "02_DECISION_LOGS_TEMPLATE.md"), path.join(projectPath, "02_DECISION_LOGS.md"));
  copyIfExists(path.join(templateDir, "03_LOGS_TEMPLATE.md"), path.join(projectPath, "03_LOGS.md"));
  copyIfExists(path.join(templateDir, "ENV_EXAMPLE_TEMPLATE"), path.join(projectPath, ".env.example"));

  writeText(path.join(projectPath, "active-hands.json"), JSON.stringify({ hands: [] }, null, 2) + "\n");

  writeText(path.join(projectPath, "README.md"), `# BRAIN PROJECT: ${projectDirName} (${projectType})

- Client: ${clientId}
- Created: ${new Date().toISOString().slice(0, 10)}

## Brain Command Center

1. [GEMINI.md](GEMINI.md) - Project Constitution
2. [03_LOGS.md](03_LOGS.md) - Main Progress Log
3. [active-hands.json](active-hands.json) - Hands/Satellite Registry

## Project Operations

- Create Hands: \`npm run new-hands -- --project-path ./hands/[NAME] --repo-name [REPO]\`
- Harvest Code: \`npm run pull-code -- --project-path ./hands/[NAME]\`
- Sync Rules: \`npm run push-rules -- --project-path ./hands/[NAME]\`
`);

  updateRegistry(runtime, projectDirName, toPosix(path.relative(runtime.root, projectPath)), `Automatically generated Brain Project for ${clientId}.`);
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

function updateRegistry(runtime, id, projectPath, description) {
  const registryPath = runtime.resolvePath("active-projects.json");
  if (!exists(registryPath)) return;
  const registry = readJson(registryPath);
  registry.projects ||= [];
  if (!registry.projects.some((project) => project.id === id)) {
    registry.projects.push({ id, path: projectPath, remote_url: "", status: "active", description });
    writeText(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
  }
}
