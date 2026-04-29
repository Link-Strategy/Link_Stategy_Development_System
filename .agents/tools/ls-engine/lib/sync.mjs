import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { harvestDirs } from "./constants.mjs";
import { copyDir, copyFile, exists, listFiles, readJson, removeContents, toPosix } from "./fs-utils.mjs";
import { mergePackageContract } from "./package-contract.mjs";
import { run } from "./process-utils.mjs";

export function pushRules(runtime, overrides = {}) {
  const args = { ...runtime.args, ...overrides };
  const projectPath = path.resolve(args["project-path"] || runtime.requireArg("project-path"));
  const dryRun = Boolean(args["dry-run"]);
  const commitMessage = args["commit-message"] || "chore(sync): push updated rules from brain";
  if (!exists(projectPath)) throw new Error(`Project path not found: ${projectPath}`);

  const copies = [
    [runtime.resolvePath(".agents/rules"), path.join(projectPath, ".agents/rules"), true],
    [runtime.resolvePath(".agents/workflows"), path.join(projectPath, ".agents/workflows"), true],
    [runtime.resolvePath(".agents/templates"), path.join(projectPath, ".agents/templates"), true],
    [runtime.resolvePath(".agents/tools/ls-engine"), path.join(projectPath, ".agents/tools/ls-engine"), false],
    [runtime.resolvePath(".github"), path.join(projectPath, ".github"), false],
    [runtime.resolvePath(".agents/templates/GEMINI_SATELLITE_TEMPLATE.md"), path.join(projectPath, "GEMINI.md"), false]
  ];

  for (const [src, dest, replace] of copies) {
    if (!exists(src)) continue;
    if (dryRun) {
      console.log(`Would ${replace ? "replace" : "copy"}: ${src} -> ${dest}`);
      continue;
    }
    if (replace) removeContents(dest);
    if (fs.statSync(src).isDirectory()) copyDir(src, dest);
    else copyFile(src, dest);
  }
  if (dryRun) console.log(`Would merge package contract: ${path.join(projectPath, "package.json")}`);
  else mergePackageContract(path.join(projectPath, "package.json"));

  if (args["git-push"] && dryRun) console.log("DRY RUN: skipping git commit and push.");
  else if (args["git-push"]) {
    run("git", ["add", ".agents", ".github", "GEMINI.md", "package.json"], { cwd: projectPath });
    const status = run("git", ["status", "--porcelain"], { cwd: projectPath, capture: true });
    if ((status.stdout || "").trim()) {
      run("git", ["pull", "origin", "main", "--rebase"], { cwd: projectPath });
      run("git", ["commit", "-m", commitMessage], { cwd: projectPath });
      run("git", ["push", "origin", "main", "--force-with-lease"], { cwd: projectPath });
    }
  }
}

export function pullCode(runtime) {
  const projectPath = path.resolve(runtime.requireArg("project-path"));
  const remoteUrl = runtime.args["remote-url"] || findRemoteUrl(runtime, projectPath);
  const remoteBranch = runtime.args["remote-branch"] || "main";
  const dryRun = Boolean(runtime.args["dry-run"]);
  if (!exists(projectPath)) throw new Error(`Project path not found: ${projectPath}`);

  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "ls-harvest-"));
  run("git", ["clone", "--depth", "1", "--branch", remoteBranch, remoteUrl, temp], { cwd: runtime.root });

  try {
    const harvested = harvestFiles(temp);
    if (dryRun) {
      console.log(`Would harvest to ${projectPath}:`);
      console.log(harvested.length ? harvested.map((file) => ` - ${file}`).join("\n") : " - No src/tests/docs files found.");
      return;
    }
    for (const dir of harvestDirs) {
      const src = path.join(temp, dir);
      const dest = path.join(projectPath, dir);
      if (!exists(src)) continue;
      removeContents(dest);
      copyDir(src, dest);
      console.log(`Harvested ${dir}: ${src} -> ${dest}`);
    }
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}

export function harvestFiles(sourceRoot) {
  return harvestDirs
    .flatMap((dir) => listFiles(path.join(sourceRoot, dir)).map((file) => toPosix(path.relative(sourceRoot, file))))
    .sort();
}

export function findRemoteUrl(runtime, projectPath) {
  const registryPath = runtime.resolvePath("active-projects.json");
  if (!exists(registryPath)) throw new Error("active-projects.json not found and --remote-url was not provided.");
  const registry = readJson(registryPath);
  const rel = toPosix(path.relative(runtime.root, projectPath));
  const project = registry.projects?.find((item) => item.path === rel || item.path === `./${rel}` || item.path === rel.replaceAll("/", "\\"));
  if (!project?.remote_url) throw new Error(`Remote URL not found for ${projectPath}`);
  return project.remote_url;
}
