export const harvestProtectedPaths = [".git"];

export const satellitePackageScripts = {
  "verify-gate": "node .agents/tools/ls-engine/cli.mjs verify-gate",
  "ls-gitpush": "node .agents/tools/ls-engine/cli.mjs ls-gitpush"
};

export const brainPackageScripts = {
  "new-hands": "node .agents/tools/ls-engine/cli.mjs new-hands",
  "push-rules": "node .agents/tools/ls-engine/cli.mjs push-rules-to-satellite",
  "pull-code": "node .agents/tools/ls-engine/cli.mjs pull-code-from-satellite",
  "verify-gate": "node .agents/tools/ls-engine/cli.mjs verify-gate",
  "self-test": "node .agents/tools/ls-engine/cli.mjs self-test"
};

export const brainOnlyPackageScripts = new Set([
  "new-project",
  "new-hands",
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
  ".github/workflows/link-strategy-ci.yml",
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
