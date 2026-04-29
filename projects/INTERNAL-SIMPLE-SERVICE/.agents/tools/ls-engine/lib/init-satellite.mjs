import path from "node:path";
import { brainOnlyPackageScripts, requiredSatellitePaths } from "./constants.mjs";
import { exists, readJson, readText, writeText } from "./fs-utils.mjs";
import { gitChangedFiles } from "./git-utils.mjs";
import { run, runOut } from "./process-utils.mjs";
import { pushRules } from "./sync.mjs";

export function initSatellite(runtime) {
  const projectPath = path.resolve(runtime.requireArg("project-path"));
  const repoName = runtime.requireArg("repo-name");
  const organization = runtime.args.organization || "linkstrategy";
  if (!exists(projectPath)) throw new Error(`ProjectPath does not exist: ${projectPath}`);

  if (!exists(path.join(projectPath, ".git"))) run("git", ["init"], { cwd: projectPath });
  ensureSatelliteGitignore(projectPath);
  pushRules(runtime, { "project-path": projectPath, "git-push": false });
  validateSatelliteLayout(projectPath);
  stageInitialSatelliteFiles(projectPath);
  if (runOut("git", ["status", "--porcelain"], projectPath)) {
    run("git", ["commit", "-m", "chore(init): initialize satellite governance"], { cwd: projectPath });
  }
  run("git", ["branch", "-M", "main"], { cwd: projectPath });

  const visibility = runtime.args.public ? "--public" : "--private";
  ensureOriginRemote(projectPath, organization, repoName, visibility);
  run("git", ["push", "-u", "origin", "main", "--force-with-lease"], { cwd: projectPath });
  console.log("Direct-main delivery enabled; Brain harvest is CI-gated.");
  console.log(`SATELLITE READY: ${organization}/${repoName}`);
}

export function ensureSatelliteGitignore(projectPath) {
  const gitignorePath = path.join(projectPath, ".gitignore");
  const required = [".env", ".env.*", "!.env.example", "node_modules/", "dist/", "build/", ".gemini/", "GATE_REPORT.md", "AGENT_REVIEW_REPORT.md"];
  const current = exists(gitignorePath) ? readText(gitignorePath).split(/\r?\n/) : [];
  const next = [...current];
  for (const line of required) {
    if (!next.includes(line)) next.push(line);
  }
  writeText(gitignorePath, `${next.filter(Boolean).join("\n")}\n`);
}

export function validateSatelliteLayout(projectPath) {
  const missing = requiredSatellitePaths.filter((rel) => !exists(path.join(projectPath, rel)));
  if (missing.length) throw new Error(`Satellite init is missing required files/folders:\n${missing.map((item) => ` - ${item}`).join("\n")}`);
  const pkg = readJson(path.join(projectPath, "package.json"));
  const brainScripts = [...brainOnlyPackageScripts].filter((name) => pkg.scripts?.[name]);
  if (brainScripts.length) throw new Error(`Satellite package.json exposes Brain-only scripts:\n${brainScripts.map((item) => ` - ${item}`).join("\n")}`);
}

export function stageInitialSatelliteFiles(projectPath) {
  const changed = gitChangedFiles(projectPath);
  const allowed = changed.filter(isInitialSatelliteAllowed);
  const blocked = changed.filter((file) => !isInitialSatelliteAllowed(file));
  if (blocked.length) throw new Error(`Refusing to initialize Satellite with files outside init allowlist:\n${blocked.join("\n")}`);
  if (allowed.length) run("git", ["add", "--", ...allowed], { cwd: projectPath });
}

function isInitialSatelliteAllowed(file) {
  const normalized = file.replaceAll("\\", "/");
  return normalized === ".env.example" ||
    normalized === ".gitignore" ||
    normalized === "GEMINI.md" ||
    normalized === "README.md" ||
    normalized === "01_TASK_SPEC.md" ||
    normalized === "02_DECISION_LOGS.md" ||
    normalized === "03_LOGS.md" ||
    normalized === "package.json" ||
    normalized === "package-lock.json" ||
    normalized === "npm-shrinkwrap.json" ||
    normalized === "pnpm-lock.yaml" ||
    normalized === "yarn.lock" ||
    normalized.startsWith(".agents/") ||
    normalized.startsWith(".github/") ||
    normalized.startsWith("assets/") ||
    normalized.startsWith("docs/") ||
    normalized.startsWith("src/") ||
    normalized.startsWith("tests/");
}

function ensureOriginRemote(projectPath, organization, repoName, visibility) {
  const existingOrigin = runOut("git", ["remote", "get-url", "origin"], projectPath, true);
  if (existingOrigin) return;
  const result = run("gh", ["repo", "create", `${organization}/${repoName}`, visibility, "--source=.", "--remote=origin"], {
    cwd: projectPath,
    capture: true,
    allowFailure: true
  });
  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || "").trim();
    throw new Error(`Failed to create GitHub repo or configure origin. Install/authenticate gh or add origin manually.\n${detail}`);
  }
}
