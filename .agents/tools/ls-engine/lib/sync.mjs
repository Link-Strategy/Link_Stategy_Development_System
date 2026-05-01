import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { harvestForbiddenTargets, harvestProtectedPaths } from "./constants.mjs";
import { copyAndHardenAssetIndex, copyDir, copyDirWithRuleActivation, copyFile, copyFileWithRuleActivation, ensureDir, exists, listFiles, readJson, removeContents, toPosix } from "./fs-utils.mjs";
import { mergePackageContract } from "./package-contract.mjs";
import { run, runOut } from "./process-utils.mjs";
import { verifyGate } from "./gate.mjs";

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

    if (!args["confirm"]) {
      throw new Error("[SAFETY BLOCKED] Batch operation '--all' requires '--confirm' flag to proceed. This operation affects multiple satellites.");
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

  const taskProfilePath = path.join(projectPath, "slicing-profile.json");
  const templatePath = runtime.resolvePath(".agents/templates/SLICING_PROFILE_TEMPLATE.json");
  
  let blueprint = exists(templatePath) ? readJson(templatePath) : { mappings: {} };
  let taskProfile = exists(taskProfilePath) ? readJson(taskProfilePath) : { mappings: {} };

  console.log(`[SYNC] Orchestrating slicing for: ${projectPath}`);

  const copies = [];

  // Helper to merge mappings (Template + Task Overrides)
  const getCombinedMappings = (category) => {
    const bMap = blueprint.mappings?.[category] || [];
    const tMap = taskProfile.mappings?.[category] || [];
    
    // Merge: Blueprint as base, Task can add more. 
    const combined = [...bMap];
    for (const t of tMap) {
      if (!combined.find(b => b.source === t.source && b.target === t.target)) {
        combined.push(t);
      }
    }
    return combined;
  };

  const allMappings = [
    ...getCombinedMappings("DNA"),
    ...getCombinedMappings("SHELL"),
    ...getCombinedMappings("TASK")
  ];

  for (const mapping of allMappings) {
    const src = runtime.resolvePath(mapping.source);
    const dest = path.join(projectPath, mapping.target);
    
    // DNA assets activation logic
    const isDna = (blueprint.mappings?.DNA || []).some(m => m.source === mapping.source) || 
                  (taskProfile.mappings?.DNA || []).some(m => m.source === mapping.source);
    
    const activate = isDna && mapping.source.includes("/hands/");

    copies.push([src, dest, true, activate]);
  }




  for (const [src, dest, replace, activate] of copies) {
    if (!exists(src)) continue;
    if (dryRun) {
      console.log(`Would ${replace ? "replace" : "copy"}${activate ? " and activate" : ""}: ${src} -> ${dest}`);
      continue;
    }
    
    // Special Handlers for Link Strategy Core Files
    const fileName = path.basename(dest);
    if (fileName === "package.json") {
      mergePackageContract(dest);
      console.log(`[SYNC] Merged package contract: ${dest}`);
    } else if (fileName === "ASSET_INDEX.md") {
      const isMaster = exists(runtime.resolvePath(".agents/rules/ls-rule-master-governance.md"));
      copyAndHardenAssetIndex(src, dest, isMaster ? "brain" : "hands");
      console.log(`[SYNC] Hardened Asset Index: ${dest}`);
    } else if ((fileName === "02_DECISION_LOGS.md" || fileName === "03_LOGS.md") && exists(dest)) {
      // Protect Hands' reports (Decision & Implementation logs) from being overwritten by Brain
      console.log(`[SYNC] Skipped (Protected Report): ${dest}`);

    } else {
      if (replace) replaceTarget(dest);

      if (fs.statSync(src).isDirectory()) copyDirWithRuleActivation(src, dest, activate);
      else copyFileWithRuleActivation(src, dest, activate);
    }
  }


  if (args["git-push"] && dryRun) console.log("DRY RUN: skipping git commit and push.");
  else if (args["git-push"]) {
    // Dynamic Git Add: Only stage files/folders that are defined in mappings
    const gitAddList = allMappings.map(m => m.target.split("/")[0]).filter((v, i, a) => a.indexOf(v) === i);
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
    gateRun = assertRemoteCiPassed(remoteUrl, remoteBranch, runtime.args["ci-workflow-name"] || "Link Strategy CI Suite");
    sha = gateRun.sha;
  }

  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "ls-harvest-"));
  run("git", ["clone", "--depth", "1", "--branch", remoteBranch, remoteUrl, temp], { cwd: runtime.root });

  console.log(`[HARVEST] Performing Brain-side verification for: ${remoteUrl}`);
  const isVerified = verifyGate(runtime, { projectPath: temp });
  if (!isVerified) {
    fs.rmSync(temp, { recursive: true, force: true });
    throw new Error(`[HARVEST BLOCKED] Satellite content failed Brain-side integrity check. Harvest aborted to protect Monolith DNA.`);
  }

  try {
    if (dryRun) {
      console.log(`Would harvest to ${projectPath}:`);
      const plan = harvestPlan(temp);
      console.log(plan.length ? plan.map((item) => {
        const notes = [
          item.exists ? "" : "source missing",
          ...(item.errors || [])
        ].filter(Boolean);
        return ` - ${item.source} -> ${item.target}${notes.length ? ` (${notes.join("; ")})` : ""}`;
      }).join("\n") : " - No harvesting mappings found.");
      const errors = plan.flatMap((item) => item.errors || []);
      if (errors.length > 0) {
        throw new Error(`[HARVEST DRY-RUN INVALID] Unsafe harvesting profile:\n${errors.map((error) => ` - ${error}`).join("\n")}`);
      }
      return;
    }
    harvestTrackedSnapshot(temp, projectPath);
    if (gateRun) downloadGateReports(runtime, projectPath, gateRun);
    updateHandsRegistryAfterHarvest(runtime, projectPath, sha, skipCiCheck ? "skipped" : "success");
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}

function replaceTarget(targetPath) {
  if (!exists(targetPath)) return;
  if (fs.statSync(targetPath).isDirectory()) removeContents(targetPath);
  else fs.rmSync(targetPath, { force: true });
}

export function harvestFiles(sourceRoot) {
  return listTrackedFiles(sourceRoot);
}

export function harvestPlan(sourceRoot) {
  const profilePath = path.join(sourceRoot, "slicing-profile.json");
  if (!exists(profilePath)) return [];
  const profile = readJson(profilePath);
  return validateHarvestMappings(sourceRoot, profile.harvesting || [], { requireSources: false }).plan;
}

export function harvestTrackedSnapshot(sourceRoot, targetRoot) {
  const profilePath = path.join(sourceRoot, "slicing-profile.json");
  if (!exists(profilePath)) {
    throw new Error(`[HARVEST ERROR] slicing-profile.json not found in satellite at ${sourceRoot}. Cannot determine harvest scope.`);
  }

  const profile = readJson(profilePath);
  const harvesting = profile.harvesting || [];
  
  if (harvesting.length === 0) {
    console.warn(`[HARVEST] Warning: No harvesting mappings found in profile. Nothing to pull.`);
    return;
  }

  const validation = validateHarvestMappings(sourceRoot, harvesting, { requireSources: true });
  if (validation.errors.length > 0) {
    throw new Error(`[HARVEST BLOCKED] Unsafe harvesting profile:\n${validation.errors.map((error) => ` - ${error}`).join("\n")}`);
  }

  console.log(`[HARVEST] Executing profile-driven harvest...`);

  for (const mapping of validation.plan) {
    const satelliteRel = mapping.source;
    const monolithRel = mapping.target;

    const src = safeJoin(sourceRoot, satelliteRel);
    const dest = safeJoin(targetRoot, monolithRel);

    if (exists(src)) {
      if (fs.statSync(src).isDirectory()) {
        // Prune stale files in target before copying new ones to ensure clean sync
        pruneStaleFiles(src, dest);
        copyDir(src, dest); 
      } else {
        copyFile(src, dest); // Copy individual logs
      }
      console.log(`[HARVEST] Pulled: ${satelliteRel} -> ${monolithRel}`);
    }
  }

  console.log(`\nSUCCESS: Harvest completed based on slicing profile.\n`);
}

function validateHarvestMappings(sourceRoot, harvesting, { requireSources }) {
  const plan = [];
  const errors = [];
  const seenTargets = new Map();

  harvesting.forEach((mapping, index) => {
    const source = normalizeMappingPath(mapping?.source || "");
    const target = normalizeMappingPath(mapping?.target || "");
    const itemErrors = [];
    const label = `harvesting[${index}]`;

    if (!source) itemErrors.push(`${label}: source is required`);
    if (!target) itemErrors.push(`${label}: target is required`);
    if (hasUnresolvedPlaceholder(source)) itemErrors.push(`${label}: source contains unresolved placeholder '${source}'`);
    if (hasUnresolvedPlaceholder(target)) itemErrors.push(`${label}: target contains unresolved placeholder '${target}'`);

    if (target) {
      if (seenTargets.has(target)) {
        itemErrors.push(`${label}: duplicate target '${target}' also used by harvesting[${seenTargets.get(target)}]`);
      } else {
        seenTargets.set(target, index);
      }
      if (isForbiddenHarvestTarget(target)) {
        itemErrors.push(`${label}: target '${target}' overlaps protected Brain path`);
      }
    }

    let existsSource = false;
    if (source && !hasUnresolvedPlaceholder(source)) {
      try {
        existsSource = exists(safeJoin(sourceRoot, source));
      } catch (error) {
        itemErrors.push(`${label}: ${error.message}`);
      }
    }
    if (requireSources && source && !existsSource) {
      itemErrors.push(`${label}: source not found '${source}'`);
    }

    plan.push({ source, target, exists: existsSource, errors: itemErrors });
    errors.push(...itemErrors);
  });

  return { plan, errors };
}

function normalizeMappingPath(value) {
  return toPosix(String(value || "").trim()).replace(/\/+$/g, "");
}

function hasUnresolvedPlaceholder(value) {
  return /\[[^\]\r\n]+\]/u.test(value);
}

function isForbiddenHarvestTarget(rel) {
  const normalized = normalizeMappingPath(rel);
  return harvestForbiddenTargets.some((protectedPath) => {
    const protectedRel = normalizeMappingPath(protectedPath);
    return normalized === protectedRel || normalized.startsWith(`${protectedRel}/`) || protectedRel.startsWith(`${normalized}/`);
  });
}

/**
 * Removes files from target directory that do not exist in source directory.
 * This ensures that deletions in the satellite are propagated back to the monolith.
 */
function pruneStaleFiles(srcDir, destDir) {
  if (!exists(destDir)) return;
  const srcFiles = new Set(fs.readdirSync(srcDir));
  for (const entry of fs.readdirSync(destDir)) {
    if (!srcFiles.has(entry)) {
      const stalePath = path.join(destDir, entry);
      // Extra safety check: never prune protected core paths even if missing in source
      if (isProtectedHarvestPath(stalePath)) continue;
      
      fs.rmSync(stalePath, { recursive: true, force: true });
      console.log(`[HARVEST] Pruned stale asset: ${entry}`);
    }
  }
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
  const matching = runs.filter((runItem) => 
    runItem.name === workflowName || 
    runItem.name === "Link Strategy Verification Gate" || 
    runItem.path?.endsWith("/link-strategy-ci.yml") ||
    runItem.path?.endsWith("/verify-gate.yml")
  );
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
