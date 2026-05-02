import path from "node:path";
import { validateAssetRegistry } from "./asset-registry.mjs";
import { placeholderPatterns, requiredSatellitePaths, requiredSpecMarkers } from "./constants.mjs";
import { exists, fileSha256, listFiles, readJson, readText, relative, sha256, writeText } from "./fs-utils.mjs";
import { run } from "./process-utils.mjs";
import { validatePackageContract } from "./package-contract.mjs";

export function isIntegrityExcluded(rel) {
  const normalized = rel.replaceAll("\\", "/");
  if (normalized === "GATE_REPORT.md") return true;
  return normalized.split("/").some((part) => [".git", "node_modules", "dist", "build"].includes(part));
}

export function codebaseIntegrity(projectRoot) {
  const manifest = listFiles(projectRoot)
    .map((file) => relative(projectRoot, file))
    .filter((rel) => !isIntegrityExcluded(rel))
    .sort()
    .map((rel) => `${rel}\t${fileSha256(path.join(projectRoot, rel))}`);
  return { hash: sha256(manifest.join("\n")), manifest };
}

export function verifyGate(runtime, options = {}) {
  const projectPath = path.resolve(options.projectPath || runtime.args["project-path"] || ".");
  const failures = [];
  const warnings = [];
  const passes = [];
  const pass = (message) => { passes.push(message); console.log(`[PASS] ${message}`); };
  const fail = (message) => { failures.push(message); console.log(`[FAIL] ${message}`); };

  if (!exists(projectPath)) throw new Error(`Project path does not exist: ${projectPath}`);
  console.log("--- LINK STRATEGY: VERIFY GATE (PHASE 1) ---");
  console.log(`Project Path: ${projectPath}`);

  const masterRules = resolveExpectedRulesDir(runtime);
  const projectRules = path.join(projectPath, ".agents/rules");
  if (!exists(projectRules)) fail("Governance rules folder is missing.");
  else {
    for (const file of listFiles(masterRules).filter((f) => f.endsWith(".md"))) {
      const target = path.join(projectRules, path.basename(file));
      hashMatchActivated(file, target, `Rule ${path.basename(file)}`, pass, fail);
    }
  }

  hashTree(runtime.resolvePath(".agents/tools/ls-engine"), path.join(projectPath, ".agents/tools/ls-engine"), "Node engine", pass, fail);
  hashMatch(runtime.resolvePath(".agents/templates/GEMINI_SATELLITE_TEMPLATE.md"), path.join(projectPath, "GEMINI.md"), "GEMINI.md", pass, fail);

  for (const required of requiredSatellitePaths) {
    if (exists(path.join(projectPath, required))) pass(`${required} found.`);
    else fail(`${required} is missing.`);
  }
  validateProjectAssetRegistry(projectPath, pass, fail);
  validatePackageContract(projectPath, pass, fail);

  const specPath = path.join(projectPath, "01_TASK_SPEC.md");
  if (exists(specPath)) {
    const spec = readText(specPath);
    for (const marker of requiredSpecMarkers) {
      if (spec.includes(marker)) pass(`Spec section '${marker}' present.`);
      else fail(`Spec section '${marker}' is missing.`);
    }
    const placeholder = placeholderPatterns.find((pattern) => pattern.test(spec));
    if (placeholder) fail(`Spec still contains placeholder content ('${placeholder.source}').`);
  }

  runTests(projectPath, pass, fail);
  secretScan(projectPath, pass, fail);
  const integrity = codebaseIntegrity(projectPath);
  writeGateReport(projectPath, integrity, passes, warnings, failures);

  if (failures.length > 0) {
    console.log("STATUS: FAIL");
    for (const failure of failures) console.log(` - ${failure}`);
    process.exitCode = 1;
    return false;
  }
  console.log("STATUS: PASS");
  return true;
}

function validateProjectAssetRegistry(projectPath, pass, fail) {
  const registryPath = path.join(projectPath, "asset-index.json");
  if (!exists(registryPath)) return;
  let registry;
  try {
    registry = readJson(registryPath);
  } catch (error) {
    fail(`asset-index.json is not valid JSON: ${error.message}`);
    return;
  }
  const errors = validateAssetRegistry(registry, { rootPath: projectPath, requireGeneratedAt: false });
  if (errors.length) {
    for (const error of errors) fail(`asset-index.json: ${error}`);
  } else {
    pass("asset-index.json schema is valid.");
  }
}

function hashMatch(source, target, label, pass, fail) {
  if (!exists(source)) {
    fail(`Master ${label} is missing.`);
    return;
  }
  if (!exists(target)) {
    fail(`${label} is missing from project.`);
    return;
  }
  if (textSha256(source) === textSha256(target)) pass(`${label} matches Master governance.`);
  else fail(`${label} has been modified outside Brain governance.`);
}

function resolveExpectedRulesDir(runtime) {
  const handsRules = runtime.resolvePath(".agents/rules/hands");
  if (exists(handsRules)) return handsRules;
  return runtime.resolvePath(".agents/rules");
}

function hashMatchActivated(source, target, label, pass, fail) {
  if (!exists(source)) {
    fail(`Master ${label} is missing.`);
    return;
  }
  if (!exists(target)) {
    fail(`${label} is missing from project.`);
    return;
  }
  const expected = normalizeText(activateRuleContent(readText(source)));
  const actual = normalizeText(readText(target));
  if (sha256(expected) === sha256(actual)) pass(`${label} matches activated governance.`);
  else fail(`${label} has been modified outside Brain governance.`);
}

function activateRuleContent(content) {
  return content.replace(/trigger:\s*["']?on_demand["']?/g, "trigger: always_on");
}

function textSha256(file) {
  return sha256(normalizeText(readText(file)));
}

function normalizeText(content) {
  return content.replace(/\r\n/g, "\n");
}

function hashTree(sourceDir, targetDir, label, pass, fail) {
  if (!exists(sourceDir)) {
    fail(`Master ${label} folder is missing.`);
    return;
  }
  if (!exists(targetDir)) {
    fail(`${label} folder is missing from project.`);
    return;
  }
  for (const sourceFile of listFiles(sourceDir).filter((file) => file.endsWith(".mjs")).sort()) {
    const rel = relative(sourceDir, sourceFile);
    const targetFile = path.join(targetDir, rel);
    hashMatch(sourceFile, targetFile, `${label} ${rel}`, pass, fail);
  }
}

function runTests(projectPath, pass, fail) {
  const testsDir = path.join(projectPath, "tests");
  if (!exists(testsDir)) {
    fail("Tests directory is missing, cannot execute verification tests.");
    return;
  }
  if (listFiles(testsDir).length === 0) {
    fail("Tests directory exists but contains no test files.");
    return;
  }
  const packageJson = path.join(projectPath, "package.json");
  if (exists(packageJson)) {
    const pkg = readJson(packageJson);
    if (!pkg.scripts?.test) fail("package.json exists but no test script is defined.");
    else {
      const result = run("npm", ["test"], { cwd: projectPath, allowFailure: true });
      if (result.status === 0) pass("npm test passed.");
      else fail("npm test failed.");
    }
    return;
  }
  if (["pyproject.toml", "requirements.txt", "pytest.ini"].some((file) => exists(path.join(projectPath, file)))) {
    const result = run("pytest", [], { cwd: projectPath, allowFailure: true });
    if (result.status === 0) pass("pytest passed.");
    else fail("pytest failed.");
    return;
  }
  fail("No supported test runner detected. Define a runnable test command for Phase 1 gate.");
}

function secretScan(projectPath, pass, fail) {
  const blockedNames = new Set([".env", ".env.local", ".env.production", ".env.development", "id_rsa", "id_dsa"]);
  const keyExts = new Set([".pem", ".p12", ".pfx", ".key"]);
  const textExts = new Set([".md", ".json", ".js", ".ts", ".tsx", ".jsx", ".py", ".yml", ".yaml", ".env.example", ".mjs"]);
  const patterns = [/AKIA[0-9A-Z]{16}/, /-----BEGIN (RSA|EC|DSA|OPENSSH|PRIVATE KEY)-----/, /(api[_-]?key|secret|token|password)\s*[:=]\s*['"][^'"]{8,}['"]/i];
  let found = false;
  for (const file of listFiles(projectPath)) {
    const rel = relative(projectPath, file);
    if (isIntegrityExcluded(rel)) continue;
    if (blockedNames.has(path.basename(file).toLowerCase()) || keyExts.has(path.extname(file).toLowerCase())) {
      fail(`Blocked secret file detected: ${file}`);
      found = true;
      continue;
    }
    if (textExts.has(path.extname(file).toLowerCase())) {
      const content = readText(file);
      if (patterns.some((pattern) => pattern.test(content))) {
        fail(`Potential secret pattern detected in ${file}`);
        found = true;
      }
    }
  }
  if (!found) pass("No blocked secret files or obvious secret patterns detected.");
}

function writeGateReport(projectPath, integrity, passes, warnings, failures) {
  const content = `# LINK STRATEGY: GATE VERIFICATION REPORT
Generated: ${new Date().toISOString()}
Project: ${projectPath}
Status: ${failures.length === 0 ? "PASS" : "FAIL"}
Integrity-Hash: ${integrity.hash}
Integrity-Algorithm: SHA256

## Integrity Manifest
\`\`\`
${integrity.manifest.join("\n")}
\`\`\`

## Summary
- **Passes:** ${passes.length}
- **Warnings:** ${warnings.length}
- **Failures:** ${failures.length}

## Details
### Failures
${failures.length ? failures.map((item) => `- ${item}`).join("\n") : "None"}

### Warnings
${warnings.length ? warnings.map((item) => `- ${item}`).join("\n") : "None"}

### Passes
${passes.length ? passes.map((item) => `- ${item}`).join("\n") : "None"}

---
*Audit Trail: Verified by Link Strategy Engine Ops.*
`;
  writeText(path.join(projectPath, "GATE_REPORT.md"), content);
  console.log(`Report saved to: ${path.join(projectPath, "GATE_REPORT.md")}`);
}
