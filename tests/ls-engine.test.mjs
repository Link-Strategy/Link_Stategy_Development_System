import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { brainOnlyPackageScripts, placeholderPatterns, satellitePackageScripts } from "../.agents/tools/ls-engine/lib/constants.mjs";
import { validateAssetRegistry } from "../.agents/tools/ls-engine/lib/asset-registry.mjs";
import { verifyBrain } from "../.agents/tools/ls-engine/lib/audit-brain.mjs";
import { verifyGate } from "../.agents/tools/ls-engine/lib/gate.mjs";
import { harvestPlan, harvestTrackedSnapshot, pushRules } from "../.agents/tools/ls-engine/lib/sync.mjs";
import { newProject } from "../.agents/tools/ls-engine/lib/factory.mjs";
import { detectIdentity } from "../.agents/tools/ls-engine/lib/identity.mjs";
import { mergePackageContract, validatePackageContract } from "../.agents/tools/ls-engine/lib/package-contract.mjs";

const repoRoot = process.cwd();

async function withTempDir(name, fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `ls-engine-${name}-`));
  try {
    return await fn(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function writeText(root, rel, content) {
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

function writeProfile(root, harvesting) {
  writeText(root, "slicing-profile.json", `${JSON.stringify({ harvesting }, null, 2)}\n`);
}

function readText(root, rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function testRuntime(root, args = {}) {
  return {
    root,
    args,
    resolvePath: (...parts) => path.resolve(root, ...parts),
    requireArg(name) {
      const value = args[name];
      if (!value) throw new Error(`Missing required argument: --${name}`);
      return value;
    }
  };
}

async function assertHarvestBlocked(name, harvesting, files = {}) {
  await withTempDir(name, (root) => {
    const source = path.join(root, "source");
    const target = path.join(root, "target");
    fs.mkdirSync(source, { recursive: true });
    fs.mkdirSync(target, { recursive: true });
    writeProfile(source, harvesting);
    for (const [rel, content] of Object.entries(files)) writeText(source, rel, content);

    assert.throws(
      () => harvestTrackedSnapshot(source, target),
      /HARVEST BLOCKED|HARVEST ERROR/
    );
  });
}

function writeJson(root, rel, value) {
  writeText(root, rel, `${JSON.stringify(value, null, 2)}\n`);
}

function seedValidSatellite(project, { includeAssetIndex = true, scripts = {} } = {}) {
  fs.cpSync(path.join(repoRoot, ".agents/rules/hands"), path.join(project, ".agents/rules"), { recursive: true });
  for (const file of fs.readdirSync(path.join(project, ".agents/rules"))) {
    if (!file.endsWith(".md")) continue;
    const rel = path.join(".agents/rules", file);
    writeText(project, rel, readText(project, rel).replace(/trigger:\s*["']?on_demand["']?/g, "trigger: always_on"));
  }
  fs.cpSync(path.join(repoRoot, ".agents/tools/ls-engine"), path.join(project, ".agents/tools/ls-engine"), { recursive: true });
  fs.mkdirSync(path.join(project, ".agents/templates"), { recursive: true });
  fs.cpSync(path.join(repoRoot, ".agents/templates/GEMINI_SATELLITE_TEMPLATE.md"), path.join(project, ".agents/templates/GEMINI_SATELLITE_TEMPLATE.md"));
  fs.cpSync(path.join(repoRoot, ".agents/templates/GEMINI_SATELLITE_TEMPLATE.md"), path.join(project, "GEMINI.md"));
  fs.mkdirSync(path.join(project, ".agents/workflows"), { recursive: true });
  fs.cpSync(path.join(repoRoot, ".github"), path.join(project, ".github"), { recursive: true });

  writeText(project, "README.md", "# Satellite\n");
  writeText(project, "02_DECISION_LOGS.md", "# Decision Logs\n");
  writeText(project, "03_LOGS.md", "# Logs\n");
  writeText(project, "01_TASK_SPEC.md", `# Valid Task

## Strategic Context
Validated fixture.

## Logic Visualization
Input -> output.

## Data Schema
- value: boolean

## Technical Contract
- npm test must pass.

## Definition of Done
- Gate returns PASS.
`);
  writeJson(project, "slicing-profile.json", {
    harvesting: [
      { source: "src/features/test/", target: "src/features/test/" }
    ]
  });
  if (includeAssetIndex) {
    writeJson(project, "asset-index.json", {
      identity: { name: "Satellite Registry", tier: "hands", version: "1.1.0" },
      assets: [
        { id: "hands-rules", type: "Rule", path: ".agents/rules/", purpose: "Hands governance." }
      ]
    });
  }
  writeText(project, "src/features/test/index.js", "export const ok = true;\n");
  writeText(project, "tests/smoke.test.js", "import assert from 'node:assert/strict';\nassert.equal(1, 1);\n");
  writeJson(project, "package.json", {
    type: "module",
    engines: { node: ">=20" },
    scripts: {
      ...satellitePackageScripts,
      test: "node tests/smoke.test.js",
      ...scripts
    }
  });
}

function seedMasterFromCurrentWorkspace(master) {
  const registry = JSON.parse(fs.readFileSync(path.join(repoRoot, "active-projects.json"), "utf8"));
  const paths = new Set(["asset-index.json", "active-projects.json", "package.json"]);
  for (const item of registry.blueprint.sync) paths.add(item.src.replace(/\/+$/g, ""));
  paths.add(".agents/rules/ls-rule-master-governance.md");

  for (const rel of paths) {
    const src = path.join(repoRoot, rel);
    const dest = path.join(master, rel);
    if (!fs.existsSync(src)) continue;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.cpSync(src, dest, { recursive: true });
  }
}

test("placeholder patterns detect UTF-8 task spec placeholders", () => {
  const rawSpec = `
# [Tên Module/Task]

## Strategic Context
- Dự án: [Dự án]
- Status: [Draft/Approved/In Progress]

## Technical Contract
- Link: [Link]
- Mô tả: [Mô tả task cụ thể]
`;

  assert.equal(placeholderPatterns.some((pattern) => pattern.test(rawSpec)), true);
  assert.equal(placeholderPatterns.some((pattern) => pattern.test("## Strategic Context\nReady for implementation.\n")), false);
});

test("harvestPlan reports unresolved placeholders and missing sources without copying", async () => {
  await withTempDir("harvest-plan", (root) => {
    writeProfile(root, [
      { source: "src/features/[feature-name]/", target: "src/features/[feature-name]/" },
      { source: "src/missing/", target: "src/features/missing/" }
    ]);

    const plan = harvestPlan(root);
    assert.equal(plan.length, 2);
    assert.match(plan[0].errors.join("\n"), /unresolved placeholder/);
    assert.equal(plan[1].exists, false);
  });
});

test("harvest blocks unresolved placeholders", async () => {
  await assertHarvestBlocked("placeholder", [
    { source: "src/features/[feature-name]/", target: "src/features/[feature-name]/" }
  ]);
});

test("harvest blocks missing sources", async () => {
  await assertHarvestBlocked("missing-source", [
    { source: "src/missing/", target: "src/features/missing/" }
  ]);
});

test("harvest blocks duplicate targets", async () => {
  await assertHarvestBlocked("duplicate-target", [
    { source: "src/a.js", target: "src/features/index.js" },
    { source: "src/b.js", target: "src/features/index.js" }
  ], {
    "src/a.js": "export const a = true;\n",
    "src/b.js": "export const b = true;\n"
  });
});

test("harvest blocks protected Brain targets and their parents", async () => {
  await assertHarvestBlocked("protected-target", [
    { source: "src/core/index.js", target: "src/core/index.js" }
  ], {
    "src/core/index.js": "export const unsafe = true;\n"
  });

  await assertHarvestBlocked("protected-parent", [
    { source: "src/", target: "src/" }
  ], {
    "src/index.js": "export const broad = true;\n"
  });

  await assertHarvestBlocked("root-target", [
    { source: ".", target: "." }
  ], {
    "src/index.js": "export const root = true;\n"
  });
});

test("harvest copies valid narrow mappings", async () => {
  await withTempDir("valid-harvest", (root) => {
    const source = path.join(root, "source");
    const target = path.join(root, "target");
    fs.mkdirSync(source, { recursive: true });
    fs.mkdirSync(target, { recursive: true });

    writeProfile(source, [
      { source: "src/features/login/", target: "src/features/login/" },
      { source: "03_LOGS.md", target: "03_LOGS.md" }
    ]);
    writeText(source, "src/features/login/index.js", "export const login = true;\n");
    writeText(source, "03_LOGS.md", "# Logs\n");

    harvestTrackedSnapshot(source, target);

    assert.equal(fs.readFileSync(path.join(target, "src/features/login/index.js"), "utf8"), "export const login = true;\n");
    assert.equal(fs.readFileSync(path.join(target, "03_LOGS.md"), "utf8"), "# Logs\n");
  });
});

test("pushRules replaces stale file targets, activates Hands rules, and preserves logs", async () => {
  await withTempDir("push-rules", (root) => {
    const brain = path.join(root, "brain");
    const satellite = path.join(root, "satellite");
    fs.mkdirSync(brain, { recursive: true });
    fs.mkdirSync(satellite, { recursive: true });

    writeText(brain, ".agents/templates/SLICING_PROFILE_TEMPLATE.json", JSON.stringify({
      mappings: {
        DNA: [
          { id: "hands-rules", type: "Rule", source: ".agents/rules/hands/", target: ".agents/rules/", description: "Hands rules" },
          { id: "ls-engine", type: "Tool", source: ".agents/tools/ls-engine/", target: ".agents/tools/ls-engine/", description: "Engine" },
          { id: "asset-index", type: "DNA", source: "asset-index.json", target: "asset-index.json", description: "Asset registry" }
        ],
        TASK: [
          { id: "decision-logs", type: "Task", source: "02_DECISION_LOGS.md", target: "02_DECISION_LOGS.md", description: "Hands decisions" },
          { id: "implementation-logs", type: "Task", source: "03_LOGS.md", target: "03_LOGS.md", description: "Hands logs" }
        ]
      }
    }, null, 2));
    writeText(brain, "asset-index.json", JSON.stringify({
      identity: { tier: "brain" },
      assets: [
        { id: "rule-hands", path: ".agents/rules/hands/rule.md" }
      ]
    }, null, 2));
    writeText(brain, ".agents/rules/hands/rule.md", "---\ntrigger: on_demand\n---\n# Rule\n");
    writeText(brain, ".agents/tools/ls-engine/cli.mjs", "export const engine = true;\n");
    writeText(brain, "02_DECISION_LOGS.md", "# Brain decisions\n");
    writeText(brain, "03_LOGS.md", "# Brain logs\n");

    writeText(satellite, "slicing-profile.json", JSON.stringify({ mappings: {} }, null, 2));
    writeText(satellite, ".agents/tools/ls-engine", "stale file blocking directory copy\n");
    writeText(satellite, "02_DECISION_LOGS.md", "# Hands decisions\n");
    writeText(satellite, "03_LOGS.md", "# Hands logs\n");

    const runtime = testRuntime(brain, { "project-path": satellite });
    pushRules(runtime);
    pushRules(runtime);

    assert.equal(fs.statSync(path.join(satellite, ".agents/tools/ls-engine")).isDirectory(), true);
    assert.equal(readText(satellite, ".agents/tools/ls-engine/cli.mjs"), "export const engine = true;\n");
    assert.match(readText(satellite, ".agents/rules/rule.md"), /trigger: always_on/);
    assert.equal(readText(satellite, "02_DECISION_LOGS.md"), "# Hands decisions\n");
    assert.equal(readText(satellite, "03_LOGS.md"), "# Hands logs\n");

    const satelliteRegistry = JSON.parse(readText(satellite, "asset-index.json"));
    assert.equal(satelliteRegistry.identity.tier, "hands");
    assert.equal(satelliteRegistry.identity.version, "1.1.0");
    assert.equal(satelliteRegistry.assets.some(a => a.path === ".agents/rules/"), true);
    assert.equal(satelliteRegistry.assets.some(a => a.path === "active-projects.json" || a.path.includes("/brain/")), false);
    for (const asset of satelliteRegistry.assets) {
      assert.equal(typeof asset.id, "string");
      assert.equal(typeof asset.type, "string");
      assert.equal(typeof asset.path, "string");
      assert.equal(typeof asset.purpose, "string");
    }
  });
});

test("verifyGate passes with activated Hands-only governance", async () => {
  await withTempDir("verify-gate", (project) => {
    seedValidSatellite(project);

    const previousExitCode = process.exitCode;
    process.exitCode = 0;
    const passed = verifyGate(testRuntime(repoRoot), { projectPath: project });
    process.exitCode = previousExitCode;

    assert.equal(passed, true);
    assert.equal(fs.existsSync(path.join(project, "GATE_REPORT.md")), true);
  });
});

test("verifyGate fails when Satellite registry is missing", async () => {
  await withTempDir("verify-gate-missing-registry", (project) => {
    seedValidSatellite(project, { includeAssetIndex: false });

    const previousExitCode = process.exitCode;
    process.exitCode = 0;
    const passed = verifyGate(testRuntime(repoRoot), { projectPath: project });
    const failedExitCode = process.exitCode;
    process.exitCode = previousExitCode;

    assert.equal(passed, false);
    assert.equal(failedExitCode, 1);
  });
});

test("verifyGate fails when Satellite registry schema is invalid", async () => {
  await withTempDir("verify-gate-invalid-registry", (project) => {
    seedValidSatellite(project);
    writeJson(project, "asset-index.json", {
      identity: { name: "Invalid Registry", tier: "hands", version: "1.1.0" },
      assets: [
        { id: "duplicate", type: "Rule", path: ".agents/rules/", purpose: "Rules" },
        { id: "duplicate", type: "Rule", path: "../outside", purpose: "Escape" }
      ]
    });

    const previousExitCode = process.exitCode;
    process.exitCode = 0;
    const passed = verifyGate(testRuntime(repoRoot), { projectPath: project });
    const failedExitCode = process.exitCode;
    process.exitCode = previousExitCode;

    assert.equal(passed, false);
    assert.equal(failedExitCode, 1);
  });
});

test("asset registry validator enforces required schema and unique IDs", () => {
  const errors = validateAssetRegistry({
    identity: { name: "Registry", tier: "hands", version: "1.1.0", generated_at: "bad-date" },
    assets: [
      { id: "one", type: "Rule", path: ".agents/rules/", purpose: "Rules" },
      { id: "one", type: "Rule", path: "/absolute", purpose: "Bad path" },
      { id: "", type: "Task", path: "README.md", purpose: "Missing ID" }
    ]
  }, { requireGeneratedAt: true });

  assert.equal(errors.some((error) => error.includes("generated_at")), true);
  assert.equal(errors.some((error) => error.includes("duplicated")), true);
  assert.equal(errors.some((error) => error.includes("relative path")), true);
  assert.equal(errors.some((error) => error.includes("id is required")), true);
});

test("package contract rejects Brain-only scripts in Satellite", async () => {
  await withTempDir("package-contract-negative", (project) => {
    writeJson(project, "package.json", {
      type: "module",
      engines: { node: ">=20" },
      scripts: {
        ...satellitePackageScripts,
        test: "node tests/smoke.test.js",
        "new-project": "node forbidden.js",
        "new-hands": "node forbidden.js",
        "push-rules": "node forbidden.js",
        "pull-code": "node forbidden.js",
        "init-satellite": "node forbidden.js",
        "self-test": "node forbidden.js",
        "stress-test": "node forbidden.js"
      }
    });

    const passes = [];
    const failures = [];
    validatePackageContract(project, (message) => passes.push(message), (message) => failures.push(message));

    for (const name of brainOnlyPackageScripts) {
      assert.equal(failures.some((failure) => failure.includes(`'${name}'`)), true);
    }
    assert.equal(passes.some((pass) => pass.includes("verify-gate")), true);
  });
});

test("mergePackageContract strips Brain-only scripts and preserves Satellite scripts", async () => {
  await withTempDir("package-contract-merge", (project) => {
    writeJson(project, "package.json", {
      scripts: {
        test: "node tests/smoke.test.js",
        "new-project": "node forbidden.js",
        "push-rules": "node forbidden.js",
        custom: "node custom.js"
      }
    });

    mergePackageContract(path.join(project, "package.json"));
    const pkg = JSON.parse(readText(project, "package.json"));

    assert.equal(pkg.scripts.test, "node tests/smoke.test.js");
    assert.equal(pkg.scripts.custom, "node custom.js");
    assert.equal(pkg.scripts["verify-gate"], satellitePackageScripts["verify-gate"]);
    assert.equal(pkg.scripts["ls-gitpush"], satellitePackageScripts["ls-gitpush"]);
    for (const name of brainOnlyPackageScripts) {
      assert.equal(pkg.scripts[name], undefined);
    }
  });
});

test("detectIdentity preserves tier precedence Master over Brain over Hands", async () => {
  await withTempDir("identity", (root) => {
    const master = path.join(root, "master");
    const brain = path.join(root, "brain");
    const hands = path.join(root, "hands");
    const overlap = path.join(root, "overlap");

    writeJson(master, "active-projects.json", { projects: [] });
    writeText(master, ".agents/rules/brain/rule.md", "# Brain rule\n");

    writeJson(brain, "active-hands.json", { hands: [] });

    writeText(hands, "01_TASK_SPEC.md", "# Spec\n");
    writeText(hands, "03_LOGS.md", "# Logs\n");

    writeJson(overlap, "active-projects.json", { projects: [] });
    writeText(overlap, ".agents/rules/brain/rule.md", "# Brain rule\n");
    writeJson(overlap, "active-hands.json", { hands: [] });
    writeText(overlap, "01_TASK_SPEC.md", "# Spec\n");
    writeText(overlap, "03_LOGS.md", "# Logs\n");

    const masterIdentity = detectIdentity(testRuntime(master), { silent: true });
    const brainIdentity = detectIdentity(testRuntime(brain), { silent: true });
    const handsIdentity = detectIdentity(testRuntime(hands), { silent: true });
    const overlapIdentity = detectIdentity(testRuntime(overlap), { silent: true });

    assert.equal(masterIdentity.isMaster, true);
    assert.equal(brainIdentity.isBrain, true);
    assert.equal(handsIdentity.isHands, true);
    assert.equal(overlapIdentity.tier, "MASTER (The Root)");
  });
});

test("verifyBrain reports invalid registry JSON without crashing before summary", async () => {
  await withTempDir("verify-brain-invalid-json", (root) => {
    writeText(root, ".agents/rules/rule.md", "# Rule\n");
    writeText(root, ".agents/tools/ls-engine/cli.mjs", "export const engine = true;\n");
    writeText(root, "active-hands.json", "{ bad json");

    const previousExit = process.exit;
    let exitCode = null;
    process.exit = (code) => {
      exitCode = code;
      throw new Error(`process.exit:${code}`);
    };

    try {
      assert.throws(() => verifyBrain(testRuntime(root)), /process\.exit:1/);
      assert.equal(exitCode, 1);
    } finally {
      process.exit = previousExit;
    }
  });
});

test("newProject factory initializes project from blueprint and generates registry", async () => {
  await withTempDir("new-project", async (root) => {
    const master = path.join(root, "master");
    const projects = path.join(root, "projects");
    fs.mkdirSync(master, { recursive: true });
    fs.mkdirSync(projects, { recursive: true });

    // Mock Master DNA
    writeText(master, "asset-index.json", "{}");
    writeText(master, "GEMINI.md", "# Master GEMINI");
    writeText(master, ".agents/rules/ls-rule-master-governance.md", "# Governance");
    writeText(master, ".agents/tools/ls-engine/lib/factory.mjs", "export const factory = true;");
    writeText(master, ".agents/templates/GEMINI_BRAIN_TEMPLATE.md", "# Brain GEMINI [PROJECT_NAME]");
    writeText(master, "active-projects.json", JSON.stringify({
      blueprint: {
        sync: [
          { src: ".agents/templates/GEMINI_BRAIN_TEMPLATE.md", dest: "GEMINI.md", id: "project-gemini", activate: true, purpose: "Rules" },
          { src: ".agents/tools/ls-engine/", dest: ".agents/tools/ls-engine/", id: "ls-engine", purpose: "Engine" }
        ]
      },
      projects: []
    }, null, 2));

    const runtime = testRuntime(master, { 
      "project-name": "test-project", 
      "no-github": true,
      "base-path": "../projects"
    });
    // Override projectsDir in runtime for testing
    runtime.projectsDir = projects;

    await newProject(runtime);

    const projectPath = path.join(projects, "test-project");
    assert.equal(fs.existsSync(projectPath), true);
    assert.match(readText(projectPath, "GEMINI.md"), /Brain GEMINI test-project/);
    assert.equal(fs.statSync(path.join(projectPath, ".agents/tools/ls-engine")).isDirectory(), true);

    // Verify generated registry
    const registry = JSON.parse(readText(projectPath, "asset-index.json"));
    assert.equal(registry.identity.name, "test-project Registry");
    assert.equal(registry.identity.tier, "brain");
    assert.equal(registry.identity.version, "1.0.0");
    assert.equal(registry.assets.length, 3);
    assert.equal(registry.assets.find(a => a.id === "project-gemini").path, "GEMINI.md");
    for (const asset of registry.assets) {
      assert.equal(typeof asset.id, "string");
      assert.equal(typeof asset.type, "string");
      assert.equal(typeof asset.path, "string");
      assert.equal(typeof asset.purpose, "string");
    }
    
    // Verify registration in master
    const masterRegistry = JSON.parse(readText(master, "active-projects.json"));
    assert.equal(masterRegistry.projects.length, 1);
    assert.equal(masterRegistry.projects[0].id, "test-project");
  });
});

test("newProject factory works with the real Master blueprint", async () => {
  await withTempDir("new-project-real-blueprint", async (root) => {
    const master = path.join(root, "master");
    const projects = path.join(root, "projects");
    fs.mkdirSync(master, { recursive: true });
    fs.mkdirSync(projects, { recursive: true });
    seedMasterFromCurrentWorkspace(master);

    const runtime = testRuntime(master, {
      "project-name": "real-blueprint-project",
      "no-github": true,
      "base-path": "../projects"
    });

    await newProject(runtime);

    const projectPath = path.join(projects, "real-blueprint-project");
    const registry = JSON.parse(readText(projectPath, "asset-index.json"));
    const assetPaths = new Set(registry.assets.map((asset) => asset.path));

    assert.equal(fs.existsSync(path.join(projectPath, "GEMINI.md")), true);
    assert.equal(fs.existsSync(path.join(projectPath, ".agents/rules/ls-rule-brain-governance.md")), true);
    assert.equal(fs.existsSync(path.join(projectPath, ".agents/rules/hands/ls-rule-gate-acceptance.md")), true);
    assert.equal(fs.existsSync(path.join(projectPath, ".github/workflows/link-strategy-ci.yml")), true);
    assert.equal(fs.existsSync(path.join(projectPath, ".env.example")), true);
    assert.equal(fs.existsSync(path.join(projectPath, "components/ui")), true);
    assert.equal(registry.identity.tier, "brain");
    assert.equal(assetPaths.has("active-hands.json"), true);
    assert.equal(assetPaths.has("GEMINI.md"), true);
    assert.equal(validateAssetRegistry(registry, { rootPath: projectPath, requireGeneratedAt: true }).length, 0);
  });
});
