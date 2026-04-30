import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { harvestProtectedPaths } from "./constants.mjs";
import { copyAndHardenAssetIndex, copyDir, copyDirWithRuleActivation, copyFile, copyFileWithRuleActivation, ensureDir, exists, listFiles, readJson, removeContents, toPosix } from "./fs-utils.mjs";
import { mergePackageContract } from "./package-contract.mjs";
import { run, runOut } from "./process-utils.mjs";

export function pushRules(runtime, overrides = {}) {
  const args = { ...runtime.args, ...overrides };
  const dryRun = Boolean(args["dry-run"]);
  const all = Boolean(args["all"]);
  const projectPathArg = args["project-path"];

  if (all || !projectPathArg) {
    const registryPath = runtime.resolvePath("active-hands.json");
    if (!exists(registryPath)) {
      if (!projectPathArg) throw new Error("No --project-path provided and active-hands.json not found.");
      return pushRulesToPath(runtime, path.resolve(projectPathArg), args);
    }
    const registry = readJson(registryPath);
    const hands = registry.hands || [];
    if (hands.length === 0) {
      if (!projectPathArg) throw new Error("No hands registered in active-hands.json and no --project-path provided.");
      return pushRulesToPath(runtime, path.resolve(projectPathArg), args);
    }

    console.log(`Pushing rules to ${hands.length} hands...`);
    for (const hand of hands) {
      const targetPath = runtime.resolvePath(hand.path);
      console.log(`[${hand.id}] Syncing: ${targetPath}`);
      try {
        pushRulesToPath(runtime, targetPath, args);
      } catch (error) {
        console.error(`[${hand.id}] Failed: ${error.message}`);
      }
    }
    return;
  }

  return pushRulesToPath(runtime, path.resolve(projectPathArg), args);
}

function pushRulesToPath(runtime, projectPath, args) {
  const dryRun = Boolean(args["dry-run"]);
  const commitMessage = args["commit-message"] || "chore(sync): push updated rules from brain";
  if (!exists(projectPath)) throw new Error(`Project path not found: ${projectPath}`);

  const copies = [
    // Rule Copy Logic: Context-aware mapping
    ...(() => {
      const isMaster = exists(runtime.resolvePath(".agents/rules/ls-rule-master-governance.md"));
      if (isMaster) {
        // Master pushing to Brain: Flatten and ACTIVATE brain rules, keep hands rules as TEMPLATES
        return [
          [runtime.resolvePath(".agents/rules/brain"), path.join(projectPath, ".agents/rules"), true, true],
          [runtime.resolvePath(".agents/rules/hands"), path.join(projectPath, ".agents/rules/hands"), true, false]
        ];
      } else {
        // Brain pushing to Hands: Flatten and ACTIVATE hands rules to satellite root
        return [
          [runtime.resolvePath(".agents/rules/hands"), path.join(projectPath, ".agents/rules"), true, true]
        ];
      }
    })(),
    // Workflow Copy Logic: Context-aware
    ...(() => {
      const isMaster = exists(runtime.resolvePath(".agents/rules/ls-rule-master-governance.md"));
      if (isMaster) {
        return [
          [runtime.resolvePath(".agents/workflows/brain"), path.join(projectPath, ".agents/workflows"), true, false],
          [runtime.resolvePath(".agents/workflows/hands"), path.join(projectPath, ".agents/workflows/hands"), true, false]
        ];
      } else {
        return [
          [runtime.resolvePath(".agents/workflows/hands"), path.join(projectPath, ".agents/workflows"), true, false]
        ];
      }
    })(),
    // Skill Copy Logic: Context-aware
    ...(() => {
      const isMaster = exists(runtime.resolvePath(".agents/rules/ls-rule-master-governance.md"));
      if (isMaster) {
        return [
          [runtime.resolvePath(".agents/skills/brain"), path.join(projectPath, ".agents/skills"), true, false],
          [runtime.resolvePath(".agents/skills/hands"), path.join(projectPath, ".agents/skills/hands"), true, false]
        ];
      } else {
        return [
          [runtime.resolvePath(".agents/skills/hands"), path.join(projectPath, ".agents/skills"), true, false]
        ];
      }
    })(),
    [runtime.resolvePath(".agents/templates"), path.join(projectPath, ".agents/templates"), true, false],
    [runtime.resolvePath(".agents/tools/ls-engine"), path.join(projectPath, ".agents/tools/ls-engine"), false, false],
    [runtime.resolvePath(".github"), path.join(projectPath, ".github"), false, false],
    [runtime.resolvePath("components/ui"), path.join(projectPath, "components/ui"), true, false],
    [runtime.resolvePath("assets"), path.join(projectPath, "assets"), true, false],
    [runtime.resolvePath(".agents/templates/GEMINI_SATELLITE_TEMPLATE.md"), path.join(projectPath, "GEMINI.md"), false, false]
  ];

  for (const [src, dest, replace, activate] of copies) {
    if (!exists(src)) continue;
    if (dryRun) {
      console.log(`Would ${replace ? "replace" : "copy"}${activate ? " and activate" : ""}: ${src} -> ${dest}`);
      continue;
    }
    if (replace) removeContents(dest);
    if (fs.statSync(src).isDirectory()) copyDirWithRuleActivation(src, dest, activate);
    else copyFileWithRuleActivation(src, dest, activate);
  }
  if (dryRun) console.log(`Would merge package contract: ${path.join(projectPath, "package.json")}`);
  else mergePackageContract(path.join(projectPath, "package.json"));
  // ASSET_INDEX.md: Harden for target tier
  const isMaster = exists(runtime.resolvePath(".agents/rules/ls-rule-master-governance.md"));
  const targetTier = isMaster ? "brain" : "hands";
  if (!dryRun) {
    copyAndHardenAssetIndex(runtime.resolvePath("ASSET_INDEX.md"), path.join(projectPath, "ASSET_INDEX.md"), targetTier);
  } else {
    console.log(`Would harden ASSET_INDEX.md for tier: ${targetTier}`);
  }

  if (args["git-push"] && dryRun) console.log("DRY RUN: skipping git commit and push.");
  else if (args["git-push"]) {
    const gitAddList = [".agents", ".github", "GEMINI.md", "package.json", "assets", "components/ui", "01_TASK_SPEC.md", "02_DECISION_LOGS.md", "03_LOGS.md"];
    const existingToAdd = gitAddList.filter(f => exists(path.join(projectPath, f)));
    
    if (existingToAdd.length > 0) {
      run("git", ["add", ...existingToAdd], { cwd: projectPath });
      const status = run("git", ["status", "--porcelain"], { cwd: projectPath, capture: true });
      if ((status.stdout || "").trim()) {
        run("git", ["pull", "origin", "main", "--rebase"], { cwd: projectPath });
        run("git", ["commit", "-m", commitMessage], { cwd: projectPath });
        run("git", ["push", "origin", "main", "--force-with-lease"], { cwd: projectPath });
      }
    }
  }
}

export function pullCode(runtime) {
  const projectPath = path.resolve(runtime.requireArg("project-path"));
  const remoteUrl = runtime.args["remote-url"] || findRemoteUrl(runtime, projectPath);
  const remoteBranch = runtime.args["remote-branch"] || "main";
  const dryRun = Boolean(runtime.args["dry-run"]);
  const skipCiCheck = Boolean(runtime.args["skip-ci-check"]);
  if (!exists(projectPath)) throw new Error(`Project path not found: ${projectPath}`);

  let sha = "";
  let gateRun = null;
  if (skipCiCheck) {
    console.warn("WARNING: --skip-ci-check bypasses GitHub Actions verification. Use only for explicit Brain override.");
    sha = resolveLatestSha(remoteUrl, remoteBranch);
  } else {
    gateRun = assertRemoteCiPassed(remoteUrl, remoteBranch, runtime.args["ci-workflow-name"] || "Link Strategy Verification Gate");
    sha = gateRun.sha;
  }

  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "ls-harvest-"));
  run("git", ["clone", "--depth", "1", "--branch", remoteBranch, remoteUrl, temp], { cwd: runtime.root });

  try {
    const harvested = harvestFiles(temp);
    if (dryRun) {
      console.log(`Would harvest to ${projectPath}:`);
      console.log(harvested.length ? harvested.map((file) => ` - ${file}`).join("\n") : " - No tracked files found.");
      return;
    }
    harvestTrackedSnapshot(temp, projectPath);
    if (gateRun) downloadGateReports(runtime, projectPath, gateRun);
    updateHandsRegistryAfterHarvest(runtime, projectPath, sha, skipCiCheck ? "skipped" : "success");
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}

export function harvestFiles(sourceRoot) {
  return listTrackedFiles(sourceRoot);
}

export function harvestTrackedSnapshot(sourceRoot, targetRoot) {
  const sourceFiles = listTrackedFiles(sourceRoot);
  removeStaleTrackedFiles(targetRoot, new Set(sourceFiles));
  for (const rel of sourceFiles) {
    const src = safeJoin(sourceRoot, rel);
    const dest = safeJoin(targetRoot, rel);
    copyFile(src, dest);
  }
  console.log(`Harvested tracked snapshot: ${sourceFiles.length} files -> ${targetRoot}`);
}

function removeStaleTrackedFiles(targetRoot, sourceSet) {
  if (!exists(path.join(targetRoot, ".git"))) return;
  const targetFiles = listTrackedFiles(targetRoot);
  for (const rel of targetFiles) {
    if (sourceSet.has(rel) || isProtectedHarvestPath(rel)) continue;
    fs.rmSync(safeJoin(targetRoot, rel), { force: true });
  }
  pruneEmptyDirs(targetRoot);
}

function listTrackedFiles(repoRoot) {
  if (!exists(path.join(repoRoot, ".git"))) return listFiles(repoRoot).map((file) => toPosix(path.relative(repoRoot, file))).filter((file) => !isProtectedHarvestPath(file)).sort();
  const output = runOut("git", ["ls-files", "-z"], repoRoot);
  return output
    .split("\0")
    .map((file) => toPosix(file))
    .filter(Boolean)
    .filter((file) => !isProtectedHarvestPath(file))
    .sort();
}

function safeJoin(root, rel) {
  const normalized = toPosix(rel);
  if (!normalized || normalized.startsWith("../") || normalized.includes("/../") || path.isAbsolute(normalized)) {
    throw new Error(`Unsafe harvest path: ${rel}`);
  }
  const target = path.resolve(root, ...normalized.split("/"));
  const resolvedRoot = path.resolve(root);
  if (target !== resolvedRoot && !target.startsWith(`${resolvedRoot}${path.sep}`)) {
    throw new Error(`Harvest path escapes target root: ${rel}`);
  }
  return target;
}

function isProtectedHarvestPath(rel) {
  const normalized = toPosix(rel);
  return harvestProtectedPaths.some((protectedPath) => normalized === protectedPath || normalized.startsWith(`${protectedPath}/`));
}

function pruneEmptyDirs(root) {
  if (!exists(root)) return false;
  let empty = true;
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".git") {
        empty = false;
        continue;
      }
      if (pruneEmptyDirs(full)) fs.rmdirSync(full);
      else empty = false;
    } else {
      empty = false;
    }
  }
  return empty;
}

export function findRemoteUrl(runtime, projectPath) {
  const rel = toPosix(path.relative(runtime.root, projectPath));
  const handsRegistryPath = runtime.resolvePath("active-hands.json");
  if (exists(handsRegistryPath)) {
    const registry = readJson(handsRegistryPath);
    const hand = registry.hands?.find((item) => item.path === rel || item.path === `./${rel}` || item.path === rel.replaceAll("/", "\\"));
    if (hand?.remote_url) return hand.remote_url;
  }

  const registryPath = runtime.resolvePath("active-projects.json");
  if (!exists(registryPath)) throw new Error("active-projects.json or active-hands.json not found and --remote-url was not provided.");
  const registry = readJson(registryPath);
  const project = registry.projects?.find((item) => item.path === rel || item.path === `./${rel}` || item.path === rel.replaceAll("/", "\\"));
  if (!project?.remote_url) throw new Error(`Remote URL not found for ${projectPath}`);
  return project.remote_url;
}

export function resolveLatestSha(remoteUrl, branch) {
  const shaOutput = runOut("git", ["ls-remote", remoteUrl, `refs/heads/${branch}`]);
  const sha = shaOutput.split(/\s+/)[0];
  if (!sha || !/^[a-f0-9]{40}$/i.test(sha)) {
    throw new Error(`Cannot resolve latest ${branch} commit for ${remoteUrl}`);
  }
  return sha;
}

export function assertRemoteCiPassed(remoteUrl, branch, workflowName) {
  const repo = parseGitHubRepo(remoteUrl);
  if (!repo) {
    throw new Error(`Cannot verify CI for non-GitHub remote. Provide a GitHub remote URL or use --skip-ci-check for explicit Brain override.\nRemote: ${remoteUrl}`);
  }
  const sha = resolveLatestSha(remoteUrl, branch);

  const endpoint = `/repos/${repo.owner}/${repo.name}/actions/runs?head_sha=${sha}&branch=${encodeURIComponent(branch)}&per_page=20`;
  const result = run("gh", ["api", endpoint], { capture: true, allowFailure: true });
  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || "").trim();
    throw new Error(`Cannot verify GitHub Actions status. Install/authenticate gh before Brain harvest.\n${detail}`);
  }

  let payload;
  try {
    payload = JSON.parse(result.stdout || "{}");
  } catch {
    throw new Error("Cannot parse GitHub Actions response from gh api.");
  }

  const runs = Array.isArray(payload.workflow_runs) ? payload.workflow_runs : [];
  const matching = runs.filter((runItem) => runItem.name === workflowName || runItem.path?.endsWith("/verify-gate.yml"));
  const success = matching.find((runItem) => runItem.head_sha === sha && runItem.status === "completed" && runItem.conclusion === "success");
  if (!success) {
    const seen = matching.length
      ? matching.map((runItem) => ` - ${runItem.name}: ${runItem.status}/${runItem.conclusion || "none"} (${runItem.head_sha})`).join("\n")
      : " - No matching verification-gate workflow run found.";
    throw new Error(`Brain harvest blocked: latest ${branch} commit has not passed GitHub Actions verification-gate.\nCommit: ${sha}\n${seen}`);
  }
  console.log(`GitHub Actions verified for ${repo.owner}/${repo.name}@${sha}: ${success.name} success.`);
  return { sha, repo, runId: String(success.id), workflowName: success.name };
}

export function downloadGateReports(runtime, projectPath, gateRun) {
  const rel = toPosix(path.relative(runtime.root, projectPath));
  const satelliteId = sanitizeAuditPath(rel || path.basename(projectPath));
  const reportDir = path.join(runtime.root, "docs", "audit", "gate-reports", satelliteId, gateRun.sha);
  ensureDir(reportDir);
  const repoName = `${gateRun.repo.owner}/${gateRun.repo.name}`;
  const result = run("gh", [
    "run",
    "download",
    gateRun.runId,
    "--repo",
    repoName,
    "--pattern",
    "gate-report-*",
    "--dir",
    reportDir
  ], { cwd: runtime.root, capture: true, allowFailure: true });
  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || "").trim();
    throw new Error(`Cannot download gate report artifacts for ${repoName}@${gateRun.sha}.\n${detail}`);
  }
  console.log(`Downloaded gate report artifacts to: ${reportDir}`);
}

function sanitizeAuditPath(value) {
  return String(value || "satellite").replace(/^[./\\]+/, "").replace(/[^A-Za-z0-9._-]+/g, "_") || "satellite";
}

function updateHandsRegistryAfterHarvest(runtime, projectPath, sha, ciStatus) {
  const registryPath = runtime.resolvePath("active-hands.json");
  if (!exists(registryPath)) return;
  const registry = readJson(registryPath);
  const rel = toPosix(path.relative(runtime.root, projectPath));
  const hand = registry.hands?.find((item) => item.path === rel || item.path === `./${rel}` || item.path === rel.replaceAll("/", "\\"));
  if (hand) {
    hand.last_sha = sha;
    hand.ci_status = ciStatus;
    hand.harvested_at = new Date().toISOString();
    writeText(registryPath, JSON.stringify(registry, null, 2) + "\n");
    console.log(`Updated active-hands.json: ${hand.id} -> ${sha} (${ciStatus})`);
  }
}

export function parseGitHubRepo(remoteUrl) {
  const trimmed = String(remoteUrl || "").trim();
  const https = trimmed.match(/^https:\/\/github\.com\/([^/]+)\/(.+?)(?:\.git)?$/i);
  if (https) return { owner: https[1], name: https[2] };
  const ssh = trimmed.match(/^git@github\.com:([^/]+)\/(.+?)(?:\.git)?$/i);
  if (ssh) return { owner: ssh[1], name: ssh[2] };
  const sshUrl = trimmed.match(/^ssh:\/\/git@github\.com\/([^/]+)\/(.+?)(?:\.git)?$/i);
  if (sshUrl) return { owner: sshUrl[1], name: sshUrl[2] };
  return null;
}
