import path from "node:path";
import { readText, writeText } from "./fs-utils.mjs";
import { run } from "./process-utils.mjs";
import { gitChangedFiles } from "./git-utils.mjs";
import { verifyGate } from "./gate.mjs";

export function lsGitPush(runtime) {
  const title = runtime.requireArg("title");
  const commitMessage = runtime.args["commit-message"] || title;
  const projectPath = path.resolve(runtime.args["project-path"] || ".");
  if (!verifyGate(runtime, { projectPath })) throw new Error("Verification gate failed.");

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
  const ignoredGenerated = changed.filter(isGeneratedReport);
  const blocked = changed.filter((file) => !isDeliveryAllowed(file) && !isGeneratedReport(file));
  if (blocked.length) throw new Error(`Refusing to stage files outside delivery allowlist:\n${blocked.join("\n")}`);
  if (!allowed.length) throw new Error("No allowed delivery files found to stage.");
  if (ignoredGenerated.length) {
    console.log("Leaving generated reports unstaged; GitHub Actions will regenerate gate artifacts:");
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
    normalized === "package.json" ||
    normalized === "package-lock.json" ||
    normalized === "npm-shrinkwrap.json" ||
    normalized === "pnpm-lock.yaml" ||
    normalized === "yarn.lock" ||
    normalized.startsWith("src/") ||
    normalized.startsWith("tests/") ||
    normalized.startsWith("docs/");
}

function isGeneratedReport(file) {
  const normalized = file.replaceAll("\\", "/");
  return normalized === "GATE_REPORT.md" || normalized === "AGENT_REVIEW_REPORT.md";
}
