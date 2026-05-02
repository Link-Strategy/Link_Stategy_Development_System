import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { copyDir, copyFile, ensureDir, exists, readJson, readText, writeText } from "./fs-utils.mjs";
import { ensureSatelliteGitignore, stageInitialSatelliteFiles, validateSatelliteLayout } from "./init-satellite.mjs";
import { run } from "./process-utils.mjs";
import { harvestTrackedSnapshot, pushRules } from "./sync.mjs";

export function selfTest(runtime) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ls-engine-selftest-"));
  const fixtureBase = path.join(tempRoot, "brain");
  const deliveryRemote = path.join(tempRoot, "delivery-remote.git");
  const harvestTarget = path.join(tempRoot, "harvest-target");
  const cliPath = path.join(fixtureBase, ".agents/tools/ls-engine/cli.mjs");

  try {
    seedSelfTestBrain(runtime, fixtureBase);
    console.log(`[SELF-TEST] fixture root: ${fixtureBase}`);
    run("node", [cliPath, "new-project", "--project-name", "CROSS", "--base-path", "..", "--no-github"], { cwd: fixtureBase });
    const projectPath = path.join(tempRoot, "CROSS");


    const failGate = run("node", [cliPath, "verify-gate", "--project-path", projectPath], { cwd: fixtureBase, capture: true, allowFailure: true });
    if (failGate.status === 0) throw new Error("Self-test expected placeholder gate to fail, but it passed.");
    fs.rmSync(path.join(projectPath, "GATE_REPORT.md"), { force: true });

    assertUnsafeHarvestProfilesFail(tempRoot);

    hardenSelfTestProject(projectPath);
    pushRules({ ...runtime, root: fixtureBase, args: { "project-path": projectPath }, resolvePath: (...parts) => path.resolve(fixtureBase, ...parts), requireArg: () => projectPath });
    assertRawSpecTemplateFailsPlaceholderGate(cliPath, fixtureBase, projectPath);
    ensureSatelliteGitignore(projectPath);
    validateSatelliteLayout(projectPath);
    run("git", ["init"], { cwd: projectPath });
    run("git", ["config", "user.email", "selftest@example.local"], { cwd: projectPath });
    run("git", ["config", "user.name", "LS Engine Self Test"], { cwd: projectPath });
    fs.rmSync(path.join(projectPath, "active-hands.json"), { force: true });
    run("git", ["add", "--", "active-hands.json"], { cwd: projectPath });
    run("git", ["commit", "-m", "test: remove brain registry for satellite fixture"], { cwd: projectPath });
    stageInitialSatelliteFiles(projectPath);
    run("git", ["commit", "-m", "chore(init): initialize satellite fixture"], { cwd: projectPath });
    run("node", [cliPath, "verify-gate", "--project-path", projectPath], { cwd: fixtureBase });
    run("node", [cliPath, "push-rules-to-satellite", "--project-path", projectPath, "--dry-run"], { cwd: fixtureBase });
    pushRules({ ...runtime, root: fixtureBase, args: { "project-path": projectPath }, resolvePath: (...parts) => path.resolve(fixtureBase, ...parts), requireArg: () => projectPath });

    run("git", ["init", "--bare", deliveryRemote], { cwd: tempRoot });
    run("git", ["remote", "add", "origin", deliveryRemote], { cwd: projectPath });
    writeText(path.join(projectPath, "src", "features", "selftest", "index.js"), "export const delivered = true;\n");
    writeText(path.join(projectPath, "03_LOGS.md"), "# Logs\n\n- Self-test direct-main delivery.\n");
    run("node", [cliPath, "ls-gitpush", "--project-path", projectPath, "--title", "feat: self-test delivery"], { cwd: fixtureBase });

    ensureDir(harvestTarget);
    const blockedHarvest = run("node", [cliPath, "pull-code-from-satellite", "--project-path", harvestTarget, "--remote-url", deliveryRemote, "--dry-run"], {
      cwd: fixtureBase,
      capture: true,
      allowFailure: true
    });
    if (blockedHarvest.status === 0) throw new Error("Self-test expected pull-code to block when CI check is not skipped.");
    run("node", [cliPath, "pull-code-from-satellite", "--project-path", harvestTarget, "--remote-url", deliveryRemote, "--dry-run", "--skip-ci-check"], { cwd: fixtureBase });
    run("node", [cliPath, "pull-code-from-satellite", "--project-path", harvestTarget, "--remote-url", deliveryRemote, "--skip-ci-check"], { cwd: fixtureBase });
    if (!exists(path.join(harvestTarget, "src", "features", "selftest", "index.js"))) throw new Error("Self-test harvest did not copy src/features/selftest/index.js.");
    if (!exists(path.join(harvestTarget, "03_LOGS.md"))) throw new Error("Self-test harvest did not copy 03_LOGS.md.");
    if (exists(path.join(harvestTarget, ".git"))) throw new Error("Self-test harvest should not copy .git.");

    console.log("[SELF-TEST] PASS");
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

function assertRawSpecTemplateFailsPlaceholderGate(cliPath, fixtureBase, projectPath) {
  const specPath = path.join(projectPath, "01_TASK_SPEC.md");
  const validSpec = readText(specPath);
  const rawTemplate = readText(path.join(projectPath, ".agents/templates/01_TASK_SPEC_TEMPLATE.md"));
  writeText(specPath, rawTemplate);
  const result = run("node", [cliPath, "verify-gate", "--project-path", projectPath], { cwd: fixtureBase, capture: true, allowFailure: true });
  writeText(specPath, validSpec);
  fs.rmSync(path.join(projectPath, "GATE_REPORT.md"), { force: true });
  if (result.status === 0) throw new Error("Self-test expected raw task spec template to fail, but it passed.");
  if (!/placeholder/i.test(`${result.stdout || ""}\n${result.stderr || ""}`)) {
    throw new Error("Self-test expected raw task spec template to fail because of placeholder content.");
  }
}

function assertUnsafeHarvestProfilesFail(tempRoot) {
  assertHarvestFailure(tempRoot, "unresolved-placeholder", {
    harvesting: [
      { source: "src/features/[feature-name]/", target: "src/features/[feature-name]/" }
    ]
  });
  assertHarvestFailure(tempRoot, "missing-source", {
    harvesting: [
      { source: "src/missing/", target: "src/features/missing/" }
    ]
  });
  assertHarvestFailure(tempRoot, "duplicate-target", {
    harvesting: [
      { source: "src/a.js", target: "src/features/index.js" },
      { source: "src/b.js", target: "src/features/index.js" }
    ]
  }, {
    "src/a.js": "export const a = true;\n",
    "src/b.js": "export const b = true;\n"
  });
  assertHarvestFailure(tempRoot, "protected-target", {
    harvesting: [
      { source: "src/core/index.js", target: "src/core/index.js" }
    ]
  }, {
    "src/core/index.js": "export const unsafe = true;\n"
  });
}

function assertHarvestFailure(tempRoot, name, profile, files = {}) {
  const sourceRoot = path.join(tempRoot, `unsafe-harvest-${name}`);
  const targetRoot = path.join(tempRoot, `unsafe-harvest-target-${name}`);
  ensureDir(sourceRoot);
  ensureDir(targetRoot);
  writeText(path.join(sourceRoot, "slicing-profile.json"), `${JSON.stringify(profile, null, 2)}\n`);
  for (const [rel, content] of Object.entries(files)) {
    writeText(path.join(sourceRoot, rel), content);
  }
  let failed = false;
  try {
    harvestTrackedSnapshot(sourceRoot, targetRoot);
  } catch {
    failed = true;
  }
  if (!failed) throw new Error(`Self-test expected unsafe harvest profile to fail: ${name}`);
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
  copyFile(runtime.resolvePath("asset-index.json"), path.join(targetRoot, "asset-index.json"));
  const masterRegistry = readJson(runtime.resolvePath("active-projects.json"));
  writeText(path.join(targetRoot, "active-projects.json"), `${JSON.stringify({ projects: [], blueprint: masterRegistry.blueprint }, null, 2)}\n`);
}

function hardenSelfTestProject(projectPath) {
  ensureDir(path.join(projectPath, "src"));
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
  writeText(path.join(projectPath, "slicing-profile.json"), `${JSON.stringify({
    harvesting: [
      { source: "src/features/selftest/", target: "src/features/selftest/" },
      { source: "03_LOGS.md", target: "03_LOGS.md" }
    ]
  }, null, 2)}\n`);
  writeText(path.join(projectPath, "tests", "smoke.test.js"), `import assert from "node:assert/strict";

assert.equal(1 + 1, 2);
`);
  const pkg = readJson(path.join(projectPath, "package.json"));
  pkg.scripts ||= {};
  pkg.scripts.test = "node tests/smoke.test.js";
  writeText(path.join(projectPath, "package.json"), `${JSON.stringify(pkg, null, 2)}\n`);
}
