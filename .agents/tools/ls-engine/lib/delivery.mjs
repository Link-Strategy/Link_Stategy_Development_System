import path from "node:path";
import { run } from "./process-utils.mjs";
import { gitChangedFiles } from "./git-utils.mjs";
import { verifyGate } from "./gate.mjs";

export function lsGitPush(runtime) {
  const title = runtime.requireArg("title");
  const commitMessage = runtime.args["commit-message"] || title;
  const projectPath = path.resolve(runtime.args["project-path"] || ".");
  if (!verifyGate(runtime, { projectPath })) throw new Error("Verification gate failed.");

  const changed = gitChangedFiles(projectPath);
  const allowed = changed.filter(isDeliveryAllowed);
  const ignoredGenerated = changed.filter(isGateReport);
  const blocked = changed.filter((file) => !isDeliveryAllowed(file) && !isGateReport(file));
  if (blocked.length) throw new Error(`Refusing to stage files outside delivery allowlist:\n${blocked.join("\n")}`);
  if (!allowed.length) throw new Error("No allowed delivery files found to stage.");
  if (ignoredGenerated.length) {
    console.log("Leaving generated gate report unstaged; GitHub Actions will regenerate gate artifact:");
    console.log(ignoredGenerated.map((file) => ` - ${file}`).join("\n"));
  }
  console.log("Staging files:\n" + allowed.map((file) => ` - ${file}`).join("\n"));
  run("git", ["add", "--", ...allowed], { cwd: projectPath });
  run("git", ["commit", "-m", commitMessage], { cwd: projectPath });
  run("git", ["branch", "-M", "main"], { cwd: projectPath });
  run("git", ["push", "-u", "origin", "main"], { cwd: projectPath });
  console.log("Delivery pushed to origin/main. Brain harvest must wait for GitHub Actions verification-gate success.");
}

function isDeliveryAllowed(file) {
  const normalized = file.replaceAll("\\", "/");
  return normalized === "README.md" ||
    normalized === "01_TASK_SPEC.md" ||
    normalized === "02_DECISION_LOGS.md" ||
    normalized === "03_LOGS.md" ||
    normalized === "asset-index.json" ||
    normalized === "package.json" ||
    normalized === "package-lock.json" ||
    normalized === "npm-shrinkwrap.json" ||
    normalized === "pnpm-lock.yaml" ||
    normalized === "yarn.lock" ||
    normalized.startsWith("src/") ||
    normalized.startsWith("tests/") ||
    normalized.startsWith("docs/");
}

function isGateReport(file) {
  const normalized = file.replaceAll("\\", "/");
  return normalized === "GATE_REPORT.md";
}
