import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { placeholderPatterns, satellitePackageScripts } from "../.agents/tools/ls-engine/lib/constants.mjs";
import { verifyBrain } from "../.agents/tools/ls-engine/lib/audit-brain.mjs";
import { verifyGate } from "../.agents/tools/ls-engine/lib/gate.mjs";
import { harvestPlan, harvestTrackedSnapshot, pushRules } from "../.agents/tools/ls-engine/lib/sync.mjs";

const repoRoot = process.cwd();

function withTempDir(name, fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `ls-engine-${name}-`));
  try {
    return fn(dir);
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

function assertHarvestBlocked(name, harvesting, files = {}) {
  withTempDir(name, (root) => {
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

test("harvestPlan reports unresolved placeholders and missing sources without copying", () => {
  withTempDir("harvest-plan", (root) => {
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

test("harvest blocks unresolved placeholders", () => {
  assertHarvestBlocked("placeholder", [
    { source: "src/features/[feature-name]/", target: "src/features/[feature-name]/" }
  ]);
});

test("harvest blocks missing sources", () => {
  assertHarvestBlocked("missing-source", [
    { source: "src/missing/", target: "src/features/missing/" }
  ]);
});

test("harvest blocks duplicate targets", () => {
  assertHarvestBlocked("duplicate-target", [
    { source: "src/a.js", target: "src/features/index.js" },
    { source: "src/b.js", target: "src/features/index.js" }
  ], {
    "src/a.js": "export const a = true;\n",
    "src/b.js": "export const b = true;\n"
  });
});

test("harvest blocks protected Brain targets and their parents", () => {
  assertHarvestBlocked("protected-target", [
    { source: "src/core/index.js", target: "src/core/index.js" }
  ], {
    "src/core/index.js": "export const unsafe = true;\n"
  });

  assertHarvestBlocked("protected-parent", [
    { source: "src/", target: "src/" }
  ], {
    "src/index.js": "export const broad = true;\n"
  });

  assertHarvestBlocked("root-target", [
    { source: ".", target: "." }
  ], {
    "src/index.js": "export const root = true;\n"
  });
});

test("harvest copies valid narrow mappings", () => {
  withTempDir("valid-harvest", (root) => {
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

test("pushRules replaces stale file targets, activates Hands rules, and preserves logs", () => {
  withTempDir("push-rules", (root) => {
    const brain = path.join(root, "brain");
    const satellite = path.join(root, "satellite");
    fs.mkdirSync(brain, { recursive: true });
    fs.mkdirSync(satellite, { recursive: true });

    writeText(brain, ".agents/templates/SLICING_PROFILE_TEMPLATE.json", JSON.stringify({
      mappings: {
        DNA: [
          { source: ".agents/rules/hands/", target: ".agents/rules/" },
          { source: ".agents/tools/ls-engine/", target: ".agents/tools/ls-engine/" }
        ],
        TASK: [
          { source: "02_DECISION_LOGS.md", target: "02_DECISION_LOGS.md" },
          { source: "03_LOGS.md", target: "03_LOGS.md" }
        ]
      }
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
  });
});

test("verifyGate passes with activated Hands-only governance", () => {
  withTempDir("verify-gate", (project) => {
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
    writeText(project, "slicing-profile.json", JSON.stringify({
      harvesting: [
        { source: "src/features/test/", target: "src/features/test/" }
      ]
    }, null, 2));
    writeText(project, "src/features/test/index.js", "export const ok = true;\n");
    writeText(project, "tests/smoke.test.js", "import assert from 'node:assert/strict';\nassert.equal(1, 1);\n");
    writeText(project, "package.json", JSON.stringify({
      type: "module",
      engines: { node: ">=20" },
      scripts: {
        ...satellitePackageScripts,
        test: "node tests/smoke.test.js"
      }
    }, null, 2));

    const previousExitCode = process.exitCode;
    process.exitCode = 0;
    const passed = verifyGate(testRuntime(repoRoot), { projectPath: project });
    process.exitCode = previousExitCode;

    assert.equal(passed, true);
    assert.equal(fs.existsSync(path.join(project, "GATE_REPORT.md")), true);
  });
});

test("verifyBrain reports invalid registry JSON without crashing before summary", () => {
  withTempDir("verify-brain-invalid-json", (root) => {
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
