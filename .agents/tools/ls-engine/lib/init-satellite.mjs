import path from "node:path";
import { brainOnlyPackageScripts, requiredSatellitePaths } from "./constants.mjs";
import { copyFile, ensureDir, exists, readJson, readText, writeText } from "./fs-utils.mjs";
import { gitChangedFiles } from "./git-utils.mjs";
import { run, runOut } from "./process-utils.mjs";
import { pushRules } from "./sync.mjs";

export function initSatellite(runtime) {
  const projectPath = path.resolve(runtime.args.path || runtime.requireArg("project-path"));
  const repoName = runtime.requireArg("repo-name");
  const profilePath = path.join(projectPath, "slicing-profile.json");
  const profile = exists(profilePath) ? readJson(profilePath) : {};
  const organization = runtime.args.organization || profile.provisioning?.organization || "Link-Strategy";
  ensureDir(projectPath);




  if (!exists(path.join(projectPath, ".git"))) run("git", ["init"], { cwd: projectPath });
  
  const mandatoryPaths = profile.provisioning?.mandatory_paths || ["src", "tests"];
  for (const p of mandatoryPaths) {
    ensureDir(path.join(projectPath, p));
  }

  ensureSatelliteGitignore(projectPath);


  pushRules(runtime, { "project-path": projectPath, "git-push": false });
  validateSatelliteLayout(projectPath);
  stageInitialSatelliteFiles(projectPath);
  if (runOut("git", ["status", "--porcelain"], projectPath)) {
    run("git", ["commit", "-m", "chore(init): initialize satellite governance"], { cwd: projectPath });
  }
  run("git", ["branch", "-M", "main"], { cwd: projectPath });

  const visibility = runtime.args.public ? "--public" : "--private";
  let remoteUrl = "";
  try {
    remoteUrl = ensureOriginRemote(projectPath, organization, repoName, visibility);
    run("git", ["push", "-u", "origin", "main", "--force-with-lease"], { cwd: projectPath });
  } catch (error) {
    console.warn(`Remote setup failed: ${error.message}`);
    remoteUrl = `https://github.com/${organization}/${repoName}`;
  }
  
  registerHands(runtime, projectPath, repoName, organization, remoteUrl);

  console.log("Direct-main delivery enabled; Brain harvest is CI-gated.");
  console.log(`SATELLITE READY: ${organization}/${repoName}`);
}

function registerHands(runtime, projectPath, repoName, organization, remoteUrl) {
  const registryPath = runtime.resolvePath("active-hands.json");
  if (!exists(registryPath)) return;
  const registry = readJson(registryPath);
  registry.hands ||= [];
  const relPath = path.relative(runtime.root, projectPath).replaceAll("\\", "/");
  
  const entry = {
    id: repoName,
    path: relPath,
    remote_url: remoteUrl,
    last_sha: "",
    ci_status: "unknown",
    harvested_at: ""
  };

  const byId = registry.hands.findIndex((h) => h.id === repoName);
  const byPath = registry.hands.findIndex((h) => h.path === relPath);

  if (byId >= 0) {
    const existing = registry.hands[byId];
    if (existing.path !== relPath) {
      console.warn(`[REGISTRY WARNING] Satellite ID '${repoName}' moved from ${existing.path} to ${relPath}`);
    }
    registry.hands[byId] = { ...existing, ...entry };
  } else if (byPath >= 0) {
    console.warn(`[REGISTRY WARNING] Satellite at path '${relPath}' renamed from ${registry.hands[byPath].id} to ${repoName}`);
    registry.hands[byPath] = { ...registry.hands[byPath], ...entry };
  } else {
    registry.hands.push(entry);
  }
  
  writeText(registryPath, JSON.stringify(registry, null, 2) + "\n");
}

export function ensureSatelliteGitignore(projectPath) {
  const gitignorePath = path.join(projectPath, ".gitignore");
  const required = [".env", ".env.*", "!.env.example", "node_modules/", "dist/", "build/", ".gemini/", "GATE_REPORT.md"];
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
    normalized.startsWith("components/") ||
    normalized.startsWith("docs/") ||
    normalized.startsWith("src/") ||
    normalized.startsWith("tests/");
}

function ensureOriginRemote(projectPath, organization, repoName, visibility) {
  const existingOrigin = runOut("git", ["remote", "get-url", "origin"], projectPath, true);
  if (existingOrigin) return existingOrigin.trim();
  const result = run("gh", ["repo", "create", `${organization}/${repoName}`, visibility, "--source=.", "--remote=origin"], {
    cwd: projectPath,
    capture: true,
    allowFailure: true
  });
  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || "").trim();
    throw new Error(`Failed to create GitHub repo or configure origin. Install/authenticate gh or add origin manually.\n${detail}`);
  }
  return `https://github.com/${organization}/${repoName}`;
}
