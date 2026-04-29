import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { harvestDirs } from "./constants.mjs";
import { copyDir, copyFile, exists, listFiles, readJson, removeContents, toPosix } from "./fs-utils.mjs";
import { mergePackageContract } from "./package-contract.mjs";
import { run, runOut } from "./process-utils.mjs";

export function pushRules(runtime, overrides = {}) {
  const args = { ...runtime.args, ...overrides };
  const projectPath = path.resolve(args["project-path"] || runtime.requireArg("project-path"));
  const dryRun = Boolean(args["dry-run"]);
  const commitMessage = args["commit-message"] || "chore(sync): push updated rules from brain";
  if (!exists(projectPath)) throw new Error(`Project path not found: ${projectPath}`);

  const copies = [
    [runtime.resolvePath(".agents/rules"), path.join(projectPath, ".agents/rules"), true],
    [runtime.resolvePath(".agents/workflows"), path.join(projectPath, ".agents/workflows"), true],
    [runtime.resolvePath(".agents/templates"), path.join(projectPath, ".agents/templates"), true],
    [runtime.resolvePath(".agents/tools/ls-engine"), path.join(projectPath, ".agents/tools/ls-engine"), false],
    [runtime.resolvePath(".github"), path.join(projectPath, ".github"), false],
    [runtime.resolvePath(".agents/templates/GEMINI_SATELLITE_TEMPLATE.md"), path.join(projectPath, "GEMINI.md"), false]
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
  if (dryRun) console.log(`Would merge package contract: ${path.join(projectPath, "package.json")}`);
  else mergePackageContract(path.join(projectPath, "package.json"));

  if (args["git-push"] && dryRun) console.log("DRY RUN: skipping git commit and push.");
  else if (args["git-push"]) {
    run("git", ["add", ".agents", ".github", "GEMINI.md", "package.json"], { cwd: projectPath });
    const status = run("git", ["status", "--porcelain"], { cwd: projectPath, capture: true });
    if ((status.stdout || "").trim()) {
      run("git", ["pull", "origin", "main", "--rebase"], { cwd: projectPath });
      run("git", ["commit", "-m", commitMessage], { cwd: projectPath });
      run("git", ["push", "origin", "main", "--force-with-lease"], { cwd: projectPath });
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

  if (skipCiCheck) {
    console.warn("WARNING: --skip-ci-check bypasses GitHub Actions verification. Use only for explicit Brain override.");
  } else {
    assertRemoteCiPassed(remoteUrl, remoteBranch, runtime.args["ci-workflow-name"] || "Link Strategy Verification Gate");
  }

  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "ls-harvest-"));
  run("git", ["clone", "--depth", "1", "--branch", remoteBranch, remoteUrl, temp], { cwd: runtime.root });

  try {
    const harvested = harvestFiles(temp);
    if (dryRun) {
      console.log(`Would harvest to ${projectPath}:`);
      console.log(harvested.length ? harvested.map((file) => ` - ${file}`).join("\n") : " - No src/tests/docs files found.");
      return;
    }
    for (const dir of harvestDirs) {
      const src = path.join(temp, dir);
      const dest = path.join(projectPath, dir);
      if (!exists(src)) continue;
      removeContents(dest);
      copyDir(src, dest);
      console.log(`Harvested ${dir}: ${src} -> ${dest}`);
    }
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}

export function harvestFiles(sourceRoot) {
  return harvestDirs
    .flatMap((dir) => listFiles(path.join(sourceRoot, dir)).map((file) => toPosix(path.relative(sourceRoot, file))))
    .sort();
}

export function findRemoteUrl(runtime, projectPath) {
  const registryPath = runtime.resolvePath("active-projects.json");
  if (!exists(registryPath)) throw new Error("active-projects.json not found and --remote-url was not provided.");
  const registry = readJson(registryPath);
  const rel = toPosix(path.relative(runtime.root, projectPath));
  const project = registry.projects?.find((item) => item.path === rel || item.path === `./${rel}` || item.path === rel.replaceAll("/", "\\"));
  if (!project?.remote_url) throw new Error(`Remote URL not found for ${projectPath}`);
  return project.remote_url;
}

export function assertRemoteCiPassed(remoteUrl, branch, workflowName) {
  const repo = parseGitHubRepo(remoteUrl);
  if (!repo) {
    throw new Error(`Cannot verify CI for non-GitHub remote. Provide a GitHub remote URL or use --skip-ci-check for explicit Brain override.\nRemote: ${remoteUrl}`);
  }
  const shaOutput = runOut("git", ["ls-remote", remoteUrl, `refs/heads/${branch}`]);
  const sha = shaOutput.split(/\s+/)[0];
  if (!sha || !/^[a-f0-9]{40}$/i.test(sha)) {
    throw new Error(`Cannot resolve latest ${branch} commit for ${remoteUrl}`);
  }

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
