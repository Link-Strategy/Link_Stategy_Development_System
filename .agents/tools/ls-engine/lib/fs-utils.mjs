import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

export function toPosix(value) {
  return value.split(path.sep).join("/");
}

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

export function exists(target) {
  return fs.existsSync(target);
}

export function readText(file) {
  return fs.readFileSync(file, "utf8");
}

export function readJson(file) {
  return JSON.parse(readText(file).replace(/^\uFEFF/, ""));
}

export function writeText(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content, "utf8");
}

export function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

export function copyIfExists(src, dest) {
  if (exists(src)) copyFile(src, dest);
}

export function copyDir(src, dest) {
  if (!exists(src)) return;
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else if (entry.isFile()) copyFile(srcPath, destPath);
  }
}

export function removeContents(dir) {
  if (!exists(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    fs.rmSync(path.join(dir, entry), { recursive: true, force: true });
  }
}

export function listFiles(dir) {
  if (!exists(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

export function sha256(content) {
  return createHash("sha256").update(content).digest("hex").toUpperCase();
}

export function fileSha256(file) {
  return createHash("sha256").update(fs.readFileSync(file)).digest("hex").toUpperCase();
}

export function relative(rootPath, file) {
  return toPosix(path.relative(rootPath, file));
}

export function copyFileWithRuleActivation(src, dest, activate = true) {
  ensureDir(path.dirname(dest));
  if (activate && src.endsWith(".md")) {
    let content = readText(src);
    // Dynamic trigger rewrite
    const updated = content.replace(/trigger:\s*["']?on_demand["']?/g, 'trigger: always_on');
    writeText(dest, updated);
  } else {
    fs.copyFileSync(src, dest);
  }
}

export function copyDirWithRuleActivation(src, dest, activate = true) {
  if (!exists(src)) return;
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDirWithRuleActivation(srcPath, destPath, activate);
    else if (entry.isFile()) copyFileWithRuleActivation(srcPath, destPath, activate);
  }
}
