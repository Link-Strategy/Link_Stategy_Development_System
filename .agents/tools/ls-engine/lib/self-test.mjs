import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { copyDir, copyFile, ensureDir, exists, readJson, writeText } from "./fs-utils.mjs";
import { ensureSatelliteGitignore, stageInitialSatelliteFiles, validateSatelliteLayout } from "./init-satellite.mjs";
import { run } from "./process-utils.mjs";
import { pushRules } from "./sync.mjs";

export function selfTest(runtime) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ls-engine-selftest-"));
  const fixtureBase = path.join(tempRoot, "brain");
  const satelliteRepo = path.join(tempRoot, "satellite-repo");
  const deliveryRemote = path.join(tempRoot, "delivery-remote.git");
  const harvestTarget = path.join(tempRoot, "harvest-target");
  const cliPath = path.join(fixtureBase, ".agents/tools/ls-engine/cli.mjs");

  try {
    seedSelfTestBrain(runtime, fixtureBase);
    console.log(`[SELF-TEST] fixture root: ${fixtureBase}`);
    run("node", [cliPath, "new-project", "--project-name", "CROSS", "--base-path", "projects", "--no-github"], { cwd: fixtureBase });
    const projectPath = path.join(fixtureBase, "projects", "CROSS");
    run("node", [cliPath, "new-module", "--project-path", projectPath, "--module-name", "alpha"], { cwd: fixtureBase });

    const failGate = run("node", [cliPath, "verify-gate", "--project-path", projectPath], { cwd: fixtureBase, capture: true, allowFailure: true });
    if (failGate.status === 0) throw new Error("Self-test expected placeholder gate to fail, but it passed.");

    hardenSelfTestProject(projectPath);
    pushRules({ ...runtime, root: fixtureBase, args: { "project-path": projectPath }, resolvePath: (...parts) => path.resolve(fixtureBase, ...parts), requireArg: () => projectPath });
    ensureSatelliteGitignore(projectPath);
    validateSatelliteLayout(projectPath);
    run("git", ["init"], { cwd: projectPath });
    run("git", ["config", "user.email", "selftest@example.local"], { cwd: projectPath });
    run("git", ["config", "user.name", "LS Engine Self Test"], { cwd: projectPath });
    fs.rmSync(path.join(projectPath, "active-hands.json"), { force: true });
    stageInitialSatelliteFiles(projectPath);
    run("git", ["commit", "-m", "chore(init): initialize satellite fixture"], { cwd: projectPath });
    run("node", [cliPath, "verify-gate", "--project-path", projectPath], { cwd: fixtureBase });
    run("node", [cliPath, "push-rules-to-satellite", "--project-path", projectPath, "--dry-run"], { cwd: fixtureBase });

    run("git", ["init", "--bare", deliveryRemote], { cwd: tempRoot });
    run("git", ["remote", "add", "origin", deliveryRemote], { cwd: projectPath });
    writeText(path.join(projectPath, "src", "index.js"), "export const delivered = true;\n");
    writeText(path.join(projectPath, "03_LOGS.md"), "# Logs\n\n- Self-test direct-main delivery.\n");
    run("node", [cliPath, "ls-gitpush", "--project-path", projectPath, "--title", "feat: self-test delivery"], { cwd: fixtureBase });

    seedSatelliteRepo(satelliteRepo);
    ensureDir(harvestTarget);
    const blockedHarvest = run("node", [cliPath, "pull-code-from-satellite", "--project-path", harvestTarget, "--remote-url", satelliteRepo, "--dry-run"], {
      cwd: fixtureBase,
      capture: true,
      allowFailure: true
    });
    if (blockedHarvest.status === 0) throw new Error("Self-test expected pull-code to block when CI check is not skipped.");
    run("node", [cliPath, "pull-code-from-satellite", "--project-path", harvestTarget, "--remote-url", satelliteRepo, "--dry-run", "--skip-ci-check"], { cwd: fixtureBase });
    run("node", [cliPath, "pull-code-from-satellite", "--project-path", harvestTarget, "--remote-url", satelliteRepo, "--skip-ci-check"], { cwd: fixtureBase });
    if (!exists(path.join(harvestTarget, "src", "index.js"))) throw new Error("Self-test harvest did not copy src/index.js.");
    if (!exists(path.join(harvestTarget, "03_LOGS.md"))) throw new Error("Self-test harvest did not copy 03_LOGS.md.");
    if (exists(path.join(harvestTarget, ".git"))) throw new Error("Self-test harvest should not copy .git.");

    console.log("[SELF-TEST] PASS");
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

export function stressTest(runtime) {
  const iterations = Number(runtime.args.iterations || 10);
  if (!Number.isInteger(iterations) || iterations < 1) throw new Error("--iterations must be a positive integer.");
  for (let i = 1; i <= iterations; i += 1) {
    console.log(`[STRESS-TEST] ${i}/${iterations}`);
    selfTest(runtime);
  }
  console.log(`[STRESS-TEST] PASS (${iterations}/${iterations})`);
}

function seedSelfTestBrain(runtime, targetRoot) {
  ensureDir(targetRoot);
  copyDir(runtime.resolvePath(".agents/rules"), path.join(targetRoot, ".agents/rules"));
  copyDir(runtime.resolvePath(".agents/workflows"), path.join(targetRoot, ".agents/workflows"));
  copyDir(runtime.resolvePath(".agents/templates"), path.join(targetRoot, ".agents/templates"));
  copyDir(runtime.resolvePath(".agents/tools/ls-engine"), path.join(targetRoot, ".agents/tools/ls-engine"));
  copyDir(runtime.resolvePath(".github"), path.join(targetRoot, ".github"));
  copyFile(runtime.resolvePath("package.json"), path.join(targetRoot, "package.json"));
  writeText(path.join(targetRoot, "active-projects.json"), `${JSON.stringify({ projects: [] }, null, 2)}\n`);
}

function hardenSelfTestProject(projectPath) {
  ensureDir(path.join(projectPath, "tests"));
  writeText(path.join(projectPath, "01_TASK_SPEC.md"), `# Self Test Task

## Strategic Context
Validate cross-platform Phase 1 setup, sync, and gate execution.

## Logic Visualization
Input -> gate -> report.

## Data Schema
- status: string

## Technical Contract
- npm test must pass.

## Definition of Done
- Gate report is generated with SHA256 integrity hash.
`);
  writeText(path.join(projectPath, "02_DECISION_LOGS.md"), "# Decision Logs\n\n- Self-test fixture decisions.\n");
  writeText(path.join(projectPath, "03_LOGS.md"), "# Logs\n\n- Self-test fixture setup.\n");
  writeText(path.join(projectPath, "tests", "smoke.test.js"), `import assert from "node:assert/strict";

assert.equal(1 + 1, 2);
`);
  const pkg = readJson(path.join(projectPath, "package.json"));
  pkg.scripts ||= {};
  pkg.scripts.test = "node tests/smoke.test.js";
  writeText(path.join(projectPath, "package.json"), `${JSON.stringify(pkg, null, 2)}\n`);
}

function seedSatelliteRepo(repoPath) {
  ensureDir(path.join(repoPath, "docs"));
  ensureDir(path.join(repoPath, "src"));
  ensureDir(path.join(repoPath, "tests"));
  writeText(path.join(repoPath, "01_TASK_SPEC.md"), "# Spec\n\n## Strategic Context\nSeed.\n\n## Logic Visualization\nSeed.\n\n## Data Schema\nSeed.\n\n## Technical Contract\nSeed.\n\n## Definition of Done\nSeed.\n");
  writeText(path.join(repoPath, "02_DECISION_LOGS.md"), "# Decisions\n\n- Seed decision.\n");
  writeText(path.join(repoPath, "03_LOGS.md"), "# Logs\n\n- Seed log.\n");
  writeText(path.join(repoPath, "README.md"), "# Satellite Seed\n");
  writeText(path.join(repoPath, "package.json"), `${JSON.stringify({ type: "module", scripts: { test: "node tests/index.test.js" } }, null, 2)}\n`);
  writeText(path.join(repoPath, ".env.example"), "EXAMPLE_VALUE=\n");
  writeText(path.join(repoPath, ".gitignore"), ".env\nnode_modules/\n");
  writeText(path.join(repoPath, "docs", "note.md"), "# Note\n");
  writeText(path.join(repoPath, "src", "index.js"), "export const value = 42;\n");
  writeText(path.join(repoPath, "tests", "index.test.js"), "console.log('ok');\n");
  run("git", ["init", "-b", "main"], { cwd: repoPath });
  run("git", ["config", "user.email", "selftest@example.local"], { cwd: repoPath });
  run("git", ["config", "user.name", "LS Engine Self Test"], { cwd: repoPath });
  run("git", ["add", "."], { cwd: repoPath });
  run("git", ["commit", "-m", "seed satellite"], { cwd: repoPath });
}
