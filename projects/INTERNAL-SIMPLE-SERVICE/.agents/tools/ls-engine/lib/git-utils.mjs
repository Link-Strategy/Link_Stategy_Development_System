import { runOut } from "./process-utils.mjs";

export function gitChangedFiles(projectPath) {
  const output = runOut("git", ["status", "--porcelain"], projectPath);
  if (!output) return [];
  return output.split(/\r?\n/).map((line) => line.slice(3).trim()).filter(Boolean);
}
