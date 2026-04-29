export const harvestDirs = ["src", "tests", "docs"];

export const satellitePackageScripts = {
  "verify-gate": "node .agents/tools/ls-engine/cli.mjs verify-gate",
  "ls-gitpush": "node .agents/tools/ls-engine/cli.mjs ls-gitpush"
};

export const brainOnlyPackageScripts = new Set([
  "new-project",
  "new-hands",
  "new-module",
  "push-rules",
  "pull-code",
  "init-satellite",
  "self-test",
  "stress-test"
]);

export const requiredSatellitePaths = [
  ".agents/rules",
  ".agents/templates",
  ".agents/tools/ls-engine/cli.mjs",
  ".agents/workflows",
  ".github/CODEOWNERS",
  ".github/ISSUE_TEMPLATE/task_spec.yml",
  ".github/pull_request_template.md",
  ".github/workflows/rules-protection.yml",
  ".github/workflows/verify-gate.yml",
  "01_TASK_SPEC.md",
  "02_DECISION_LOGS.md",
  "03_LOGS.md",
  "GEMINI.md",
  "README.md",
  "package.json",
  "src",
  "tests"
];

export const requiredSpecMarkers = [
  "Strategic Context",
  "Logic Visualization",
  "Data Schema",
  "Technical Contract",
  "Definition of Done"
];

export const placeholderPatterns = [
  /\[TÃƒÂªn Module\/Task\]/,
  /\[TÃªn Module\/Task\]/,
  /\[TODO\]/i,
  /\[TBD\]/i,
  /\[MÃƒÂ´ tÃ¡ÂºÂ£/,
  /\[MÃ´ táº£/,
  /<replace/i,
  /lorem ipsum/i
];
