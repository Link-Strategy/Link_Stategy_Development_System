import { runOut } from "./process-utils.mjs";

export function gitChangedFiles(projectPath) {
  const output = runOut("git", ["status", "--porcelain"], projectPath);
  if (!output) return [];
  return output.split(/\r?\n/).map(parsePorcelainPath).filter(Boolean);
}

function parsePorcelainPath(line) {
  const pathStart = line[2] === " " ? 3 : 2;
  const raw = line.slice(pathStart).trim();
  const rename = raw.split(" -> ");
  return rename[rename.length - 1];
}
