#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const engineDir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const command = process.argv[2];
const args = parseArgs(process.argv.slice(3));

const requiredSpecMarkers = [
  "Strategic Context",
  "Logic Visualization",
  "Data Schema",
  "Technical Contract",
  "Definition of Done"
];

const placeholderPatterns = [
  /\[TÃªn Module\/Task\]/,
  /\[Tên Module\/Task\]/,
  /\[TODO\]/i,
  /\[TBD\]/i,
  /\[MÃ´ táº£/,
  /\[Mô tả/,
  /<replace/i,
  /lorem ipsum/i
];

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});

async function main() {
  switch (command) {
    case "new-project":
      return newProject();
    case "new-module":
      return newModule();
    case "verify-gate":
      return verifyGate({ projectPath: args["project-path"] || "." });
    case "ls-gitpush":
      return lsGitPush();
    case "push-rules-to-satellite":
      return pushRules();
    case "pull-code-from-satellite":
      return pullCode();
    case "init-satellite":
      return initSatellite();
    default:
      printUsage();
      process.exit(command ? 1 : 0);
  }
}

function parseArgs(argv) {
  const parsed = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = true;
    } else {
      parsed[key] = next;
      i += 1;
    }
  }
  return parsed;
}

function printUsage() {
  console.log(`Link Strategy Engine Ops

Commands:
  new-project --client-id ID --project-name NAME --project-type TYPE [--base-path projects]
  new-module --project-path PATH --module-name NAME
  verify-gate --project-path PATH
  ls-gitpush --title TITLE [--body BODY] [--commit-message MSG] [--project-path PATH] [--draft]
  push-rules-to-satellite --project-path PATH [--commit-message MSG] [--git-push] [--dry-run]
  pull-code-from-satellite --project-path PATH [--remote-url URL] [--remote-branch main] [--dry-run]
  init-satellite --project-path PATH --repo-name NAME [--public] [--organization linkstrategy]
`);
}

function requireArg(name) {
  const value = args[name];
  if (!value || value === true) throw new Error(`Missing required argument --${name}`);
  return value;
}

function resolvePath(...parts) {
  return path.resolve(root, ...parts);
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function exists(target) {
  return fs.existsSync(target);
}

function readText(file) {
  return fs.readFileSync(file, "utf8");
}

function readJson(file) {
  return JSON.parse(readText(file).replace(/^\uFEFF/, ""));
}

function writeText(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content, "utf8");
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  if (!exists(src)) return;
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else if (entry.isFile()) copyFile(srcPath, destPath);
  }
}

function removeContents(dir) {
  if (!exists(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    fs.rmSync(path.join(dir, entry), { recursive: true, force: true });
  }
}

function listFiles(dir) {
  if (!exists(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

function sha256(content) {
  return createHash("sha256").update(content).digest("hex").toUpperCase();
}

function fileSha256(file) {
  return createHash("sha256").update(fs.readFileSync(file)).digest("hex").toUpperCase();
}

function relative(rootPath, file) {
  return toPosix(path.relative(rootPath, file));
}

function isIntegrityExcluded(rel) {
  const normalized = rel.replaceAll("\\", "/");
  if (["GATE_REPORT.md", "AGENT_REVIEW_REPORT.md"].includes(normalized)) return true;
  return normalized.split("/").some((part) => [".git", "node_modules", "dist", "build"].includes(part));
}

function codebaseIntegrity(projectRoot) {
  const manifest = listFiles(projectRoot)
    .map((file) => relative(projectRoot, file))
    .filter((rel) => !isIntegrityExcluded(rel))
    .sort()
    .map((rel) => `${rel}\t${fileSha256(path.join(projectRoot, rel))}`);
  return { hash: sha256(manifest.join("\n")), manifest };
}

function run(cmd, cmdArgs, options = {}) {
  const result = spawnSync(cmd, cmdArgs, {
    cwd: options.cwd || root,
    encoding: "utf8",
    shell: false,
    stdio: options.capture ? "pipe" : "inherit"
  });
  if (options.allowFailure) return result;
  if (result.status !== 0) {
    throw new Error(`${cmd} ${cmdArgs.join(" ")} failed with exit code ${result.status}`);
  }
  return result;
}

function runOut(cmd, cmdArgs, cwd = root, allowFailure = false) {
  const result = run(cmd, cmdArgs, { cwd, capture: true, allowFailure });
  return (result.stdout || "").trim();
}

function newProject() {
  const clientId = requireArg("client-id");
  const projectName = requireArg("project-name");
  const projectType = requireArg("project-type");
  const basePath = args["base-path"] || "projects";
  const projectDirName = `${clientId.toUpperCase()}-${projectName}`;
  const projectPath = resolvePath(basePath, projectDirName);
  const templateDir = resolvePath(".agents/templates");

  if (exists(projectPath)) {
    console.warn(`Project already exists: ${projectPath}`);
    return;
  }

  ensureDir(path.join(projectPath, "src"));
  ensureDir(path.join(projectPath, "tests"));
  ensureDir(path.join(projectPath, "assets"));
  ensureDir(path.join(projectPath, ".agents/rules"));
  ensureDir(path.join(projectPath, ".agents/workflows"));
  ensureDir(path.join(projectPath, ".agents/tools"));

  copyDir(resolvePath(".agents/rules"), path.join(projectPath, ".agents/rules"));
  copyDir(resolvePath(".agents/workflows"), path.join(projectPath, ".agents/workflows"));
  copyDir(resolvePath(".agents/tools/ls-engine"), path.join(projectPath, ".agents/tools/ls-engine"));
  copyFile(resolvePath("package.json"), path.join(projectPath, "package.json"));
  copyFile(path.join(templateDir, "GEMINI_SATELLITE_TEMPLATE.md"), path.join(projectPath, "GEMINI.md"));
  copyIfExists(path.join(templateDir, "01_TASK_SPEC_TEMPLATE.md"), path.join(projectPath, "01_TASK_SPEC.md"));
  copyIfExists(path.join(templateDir, "02_DECISION_LOGS_TEMPLATE.md"), path.join(projectPath, "02_DECISION_LOGS.md"));
  copyIfExists(path.join(templateDir, "03_LOGS_TEMPLATE.md"), path.join(projectPath, "03_LOGS.md"));
  copyIfExists(path.join(templateDir, "ENV_EXAMPLE_TEMPLATE"), path.join(projectPath, ".env.example"));

  writeText(path.join(projectPath, "README.md"), `# PROJECT: ${projectDirName} (${projectType})

- Client: ${clientId}
- Created: ${new Date().toISOString().slice(0, 10)}

## Governance Front-end

1. [01_TASK_SPEC.md](01_TASK_SPEC.md)
2. [02_DECISION_LOGS.md](02_DECISION_LOGS.md)
3. [03_LOGS.md](03_LOGS.md)

## Operational Tools

4. Verify Gate: \`npm run verify-gate -- --project-path .\`
5. Safe Delivery: \`npm run ls-gitpush -- --title "feat: delivery"\`
`);

  updateRegistry(projectDirName, toPosix(path.relative(root, projectPath)), `Automatically generated project for ${clientId}.`);
  console.log(`Success: Project created at ${projectPath}`);
}

function copyIfExists(src, dest) {
  if (exists(src)) copyFile(src, dest);
}

function updateRegistry(id, projectPath, description) {
  const registryPath = resolvePath("active-projects.json");
  if (!exists(registryPath)) return;
  const registry = readJson(registryPath);
  registry.projects ||= [];
  if (!registry.projects.some((project) => project.id === id)) {
    registry.projects.push({ id, path: projectPath, remote_url: "", status: "active", description });
    writeText(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
  }
}

function newModule() {
  const projectPath = resolvePath(requireArg("project-path"));
  const moduleName = requireArg("module-name");
  if (!exists(projectPath)) throw new Error(`Project path does not exist: ${projectPath}`);
  const moduleDir = path.join(projectPath, "src", moduleName);
  const docsDir = path.join(projectPath, "docs", "blueprints", moduleName);
  ensureDir(moduleDir);
  ensureDir(docsDir);
  copyIfExists(resolvePath(".agents/templates/01_TASK_SPEC_TEMPLATE.md"), path.join(docsDir, "01_TASK_SPEC.md"));
  writeText(path.join(moduleDir, "README.md"), `# MODULE: ${moduleName}

[Description]

- [Spec](../../docs/blueprints/${moduleName}/01_TASK_SPEC.md)
`);
  console.log(`Success: Module added at ${moduleDir}`);
}

function verifyGate(options = {}) {
  const projectPath = path.resolve(options.projectPath || args["project-path"] || ".");
  const failures = [];
  const warnings = [];
  const passes = [];
  const pass = (message) => { passes.push(message); console.log(`[PASS] ${message}`); };
  const fail = (message) => { failures.push(message); console.log(`[FAIL] ${message}`); };
  const warn = (message) => { warnings.push(message); console.log(`[WARN] ${message}`); };

  if (!exists(projectPath)) throw new Error(`Project path does not exist: ${projectPath}`);
  console.log("--- LINK STRATEGY: VERIFY GATE (PHASE 1) ---");
  console.log(`Project Path: ${projectPath}`);

  const masterRules = resolvePath(".agents/rules");
  const projectRules = path.join(projectPath, ".agents/rules");
  if (!exists(projectRules)) fail("Governance rules folder is missing.");
  else {
    for (const file of listFiles(masterRules).filter((f) => f.endsWith(".md"))) {
      const target = path.join(projectRules, path.basename(file));
      hashMatch(file, target, `Rule ${path.basename(file)}`, pass, fail);
    }
  }

  const projectEngine = path.join(projectPath, ".agents/tools/ls-engine/cli.mjs");
  hashMatch(resolvePath(".agents/tools/ls-engine/cli.mjs"), projectEngine, "Node engine cli.mjs", pass, fail);
  hashMatch(resolvePath(".agents/templates/GEMINI_SATELLITE_TEMPLATE.md"), path.join(projectPath, "GEMINI.md"), "GEMINI.md", pass, fail);

  for (const required of ["package.json", "README.md", "03_LOGS.md", "02_DECISION_LOGS.md", "01_TASK_SPEC.md", "src", "tests"]) {
    if (exists(path.join(projectPath, required))) pass(`${required} found.`);
    else fail(`${required} is missing.`);
  }

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

function hashMatch(source, target, label, pass, fail) {
  if (!exists(source)) {
    fail(`Master ${label} is missing.`);
    return;
  }
  if (!exists(target)) {
    fail(`${label} is missing from project.`);
    return;
  }
  if (fileSha256(source) === fileSha256(target)) pass(`${label} matches Master governance.`);
  else fail(`${label} has been modified outside Brain governance.`);
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

function lsGitPush() {
  const title = requireArg("title");
  const body = args.body || "Agentic Delivery via ls-gitpush. Verification Gate and Agent Review passed.";
  const commitMessage = args["commit-message"] || title;
  const projectPath = path.resolve(args["project-path"] || ".");
  if (!verifyGate({ projectPath })) throw new Error("Verification gate failed.");

  const report = readText(path.join(projectPath, "GATE_REPORT.md"));
  const match = report.match(/Integrity-Hash:\s*([A-Fa-f0-9]{64})/);
  if (!match) throw new Error("Integrity-Hash was not found in GATE_REPORT.md");
  const review = `# AGENT DELIVERY SUMMARY
**Timestamp:** ${new Date().toISOString()}
**Project:** ${projectPath}
**Integrity-Hash:** ${match[1].toUpperCase()}

This is a delivery summary generated from the technical gate result, not a deep human review.

## Verification
- Technical gate: PASS
- Report source: GATE_REPORT.md
`;
  writeText(path.join(projectPath, "AGENT_REVIEW_REPORT.md"), review);

  const changed = gitChangedFiles(projectPath);
  const allowed = changed.filter(isDeliveryAllowed);
  const blocked = changed.filter((file) => !isDeliveryAllowed(file));
  if (blocked.length) throw new Error(`Refusing to stage files outside delivery allowlist:\n${blocked.join("\n")}`);
  if (!allowed.length) throw new Error("No allowed delivery files found to stage.");
  console.log("Staging files:\n" + allowed.map((file) => ` - ${file}`).join("\n"));
  run("git", ["add", "--", ...allowed], { cwd: projectPath });
  run("git", ["commit", "-m", commitMessage], { cwd: projectPath });
  const branch = runOut("git", ["branch", "--show-current"], projectPath);
  if (!branch) throw new Error("Cannot determine current git branch.");
  run("git", ["push", "-u", "origin", branch], { cwd: projectPath });

  const finalBody = `## LINK STRATEGY: AGENT-LED DELIVERY REPORT

${body}

### Verification Evidence
${review}

### Gate Scorecard
${report}
`;
  const ghArgs = ["pr", "create", "--title", title, "--body", finalBody];
  if (args.draft) ghArgs.push("--draft");
  run("gh", ghArgs, { cwd: projectPath });
}

function gitChangedFiles(projectPath) {
  const output = runOut("git", ["status", "--porcelain"], projectPath);
  if (!output) return [];
  return output.split(/\r?\n/).map((line) => line.slice(3).trim()).filter(Boolean);
}

function isDeliveryAllowed(file) {
  const normalized = file.replaceAll("\\", "/");
  return normalized === "GATE_REPORT.md" ||
    normalized === "AGENT_REVIEW_REPORT.md" ||
    normalized === "README.md" ||
    normalized === "01_TASK_SPEC.md" ||
    normalized === "02_DECISION_LOGS.md" ||
    normalized === "03_LOGS.md" ||
    normalized.startsWith("src/") ||
    normalized.startsWith("tests/") ||
    normalized.startsWith("docs/");
}

function pushRules() {
  const projectPath = path.resolve(requireArg("project-path"));
  const dryRun = Boolean(args["dry-run"]);
  const commitMessage = args["commit-message"] || "chore(sync): push updated rules from brain";
  if (!exists(projectPath)) throw new Error(`Project path not found: ${projectPath}`);

  const copies = [
    [resolvePath(".agents/rules"), path.join(projectPath, ".agents/rules"), true],
    [resolvePath(".agents/workflows"), path.join(projectPath, ".agents/workflows"), true],
    [resolvePath(".agents/templates"), path.join(projectPath, ".agents/templates"), true],
    [resolvePath(".agents/tools/ls-engine"), path.join(projectPath, ".agents/tools/ls-engine"), false],
    [resolvePath(".github"), path.join(projectPath, ".github"), false],
    [resolvePath("package.json"), path.join(projectPath, "package.json"), false],
    [resolvePath(".agents/templates/GEMINI_SATELLITE_TEMPLATE.md"), path.join(projectPath, "GEMINI.md"), false]
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

  if (args["git-push"] && dryRun) console.log("DRY RUN: skipping git commit and push.");
  else if (args["git-push"]) {
    run("git", ["add", ".agents", ".github", "GEMINI.md"], { cwd: projectPath });
    if (runOut("git", ["status", "--porcelain"], projectPath)) {
      run("git", ["pull", "origin", "main", "--rebase"], { cwd: projectPath });
      run("git", ["commit", "-m", commitMessage], { cwd: projectPath });
      run("git", ["push", "origin", "main", "--force-with-lease"], { cwd: projectPath });
    }
  }
}

function pullCode() {
  const projectPath = path.resolve(requireArg("project-path"));
  const remoteUrl = args["remote-url"] || findRemoteUrl(projectPath);
  const remoteBranch = args["remote-branch"] || "main";
  const dryRun = Boolean(args["dry-run"]);
  const remoteName = `sat-${path.basename(projectPath)}`;
  const existing = runOut("git", ["remote"], root).split(/\r?\n/);
  if (!existing.includes(remoteName)) run("git", ["remote", "add", remoteName, remoteUrl]);
  else run("git", ["remote", "set-url", remoteName, remoteUrl]);
  run("git", ["fetch", remoteName], { cwd: root });
  if (dryRun) {
    const files = runOut("git", ["ls-tree", "-r", "--name-only", `${remoteName}/${remoteBranch}`, "src", "tests", "docs"], root, true);
    console.log(`Would harvest to ${projectPath}:\n${files}`);
    return;
  }
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "ls-harvest-"));
  try {
    const archive = spawnSync("git", ["archive", "--format=tar", `${remoteName}/${remoteBranch}`, "src", "tests", "docs"], { cwd: root, encoding: null });
    if (archive.status !== 0) throw new Error("Failed to archive satellite files.");
    const tar = spawnSync("tar", ["-x", "-C", temp], { input: archive.stdout, encoding: null });
    if (tar.status !== 0) throw new Error("Failed to extract satellite archive.");
    copyDir(temp, projectPath);
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}

function findRemoteUrl(projectPath) {
  const registryPath = resolvePath("active-projects.json");
  if (!exists(registryPath)) throw new Error("active-projects.json not found and --remote-url was not provided.");
  const registry = readJson(registryPath);
  const rel = toPosix(path.relative(root, projectPath));
  const project = registry.projects?.find((item) => item.path === rel || item.path === `./${rel}` || item.path === rel.replaceAll("/", "\\"));
  if (!project?.remote_url) throw new Error(`Remote URL not found for ${projectPath}`);
  return project.remote_url;
}

function initSatellite() {
  const projectPath = path.resolve(requireArg("project-path"));
  const repoName = requireArg("repo-name");
  const organization = args.organization || "linkstrategy";
  if (!exists(projectPath)) throw new Error(`ProjectPath does not exist: ${projectPath}`);
  run("git", ["init"], { cwd: projectPath });
  if (!exists(path.join(projectPath, ".gitignore"))) writeText(path.join(projectPath, ".gitignore"), ".env\nnode_modules/\ndist/\n.gemini/\n");
  const visibility = args.public ? "--public" : "--private";
  run("gh", ["repo", "create", `${organization}/${repoName}`, visibility, "--source=.", "--remote=origin", "--push"], { cwd: projectPath, allowFailure: true });
  pushRulesForPath(projectPath);
  run("git", ["add", "."], { cwd: projectPath });
  run("git", ["branch", "-M", "main"], { cwd: projectPath });
  run("git", ["push", "-u", "origin", "main", "--force-with-lease"], { cwd: projectPath });
  applyBranchProtection(organization, repoName);
  console.log(`SATELLITE READY: ${organization}/${repoName}`);
}

function pushRulesForPath(projectPath) {
  const saved = { ...args };
  args["project-path"] = projectPath;
  args["git-push"] = false;
  pushRules();
  Object.assign(args, saved);
}

function applyBranchProtection(owner, repoName) {
  const payload = {
    required_status_checks: {
      strict: true,
      contexts: ["verification-gate", "block-illegal-changes"]
    },
    enforce_admins: true,
    required_pull_request_reviews: {
      dismissal_restrictions: {},
      dismiss_stale_reviews: true,
      require_code_owner_reviews: true,
      required_approving_review_count: 1,
      require_last_push_approval: false
    },
    restrictions: null,
    required_linear_history: false,
    allow_force_pushes: false,
    allow_deletions: false,
    block_creations: false,
    required_conversation_resolution: true,
    lock_branch: false,
    allow_fork_syncing: true
  };
  const result = spawnSync("gh", [
    "api",
    "--method",
    "PUT",
    "-H",
    "Accept: application/vnd.github+json",
    `/repos/${owner}/${repoName}/branches/main/protection`,
    "--input",
    "-"
  ], {
    cwd: root,
    input: JSON.stringify(payload),
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"]
  });
  if (result.status !== 0) {
    console.warn(`Branch protection was not applied automatically: ${(result.stderr || result.stdout || "").trim()}`);
    console.warn("Repository was initialized, but branch protection still needs manual configuration.");
  } else {
    console.log("Branch protection applied successfully.");
  }
}
