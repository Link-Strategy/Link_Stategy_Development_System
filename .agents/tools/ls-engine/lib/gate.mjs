import path from "node:path";
import fs from "node:fs";
import { validateAssetRegistry } from "./asset-registry.mjs";
import { placeholderPatterns } from "./constants.mjs";
import { exists, listFiles, readJson, readText, relative, sha256, textFileSha256, writeText, toPosix } from "./fs-utils.mjs";
import { renderSatelliteGeminiTemplate } from "./gemini-template.mjs";
import { run } from "./process-utils.mjs";

/**
 * Governance 2.0: Whitelist-Only Hashing (The Steel Frame)
 * Purely data-driven. Relies exclusively on slicing-profile.json (The SOT).
 * Integrity-Hash = Hash(Mappings - Harvesting)
 */
export function codebaseIntegrity(projectRoot, profile) {
  const mappings = Array.isArray(profile.mappings) ? profile.mappings : [];
  const harvestTargets = (profile.harvesting || []).map(h => toPosix(h.source));
  
  const allMappedFiles = new Set();
  
  mappings.forEach(m => {
    const targetRel = toPosix(m.target);
    const fullPath = path.join(projectRoot, targetRel);
    if (!exists(fullPath)) return;
    
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      listFiles(fullPath).forEach(f => {
        allMappedFiles.add(toPosix(relative(projectRoot, f)));
      });
    } else {
      allMappedFiles.add(targetRel);
    }
  });

  const manifest = Array.from(allMappedFiles)
    .filter(rel => {
      // SOT Principle: If it is marked for harvesting, it is NOT part of the Governance Hash.
      return !harvestTargets.some(h => rel === h || rel.startsWith(h + "/"));
    })
    .sort()
    .map(rel => {
       const fullPath = path.join(projectRoot, rel);
       return `${rel}\t${textFileSha256(fullPath)}`;
    });

  return { hash: sha256(manifest.join("\n")).toUpperCase(), manifest };
}

export async function verifyGate(runtime) {
  const projectPath = process.cwd();
  const failures = [];
  const passes = [];
  const pass = (m) => { passes.push(m); console.log(`[PASS] ${m}`); };
  const fail = (m) => { failures.push(m); console.log(`[FAIL] ${m}`); };

  if (!exists(projectPath)) throw new Error(`Project path missing: ${projectPath}`);
  console.log("--- LINK STRATEGY: VERIFY GATE (UNIFIED POLICY) ---");
  
  const tier = detectProjectTier(projectPath);
  const profile = getProfile(projectPath);
  const gov = profile.provisioning || {};

  if (tier !== "BRAIN") {
    verifyManifestMappings(runtime, projectPath, profile, pass, fail);
  }

  if (tier !== "BRAIN") {
    const templatePath = runtime.resolvePath(".agents/templates/GEMINI_SATELLITE_TEMPLATE.md");
    const allMappings = Array.isArray(profile.mappings) ? profile.mappings : [];
    const expected = renderSatelliteGeminiTemplate(readText(templatePath), allMappings, profile.harvesting || []);
    hashMatchExpectedText(expected, path.join(projectPath, "GEMINI.md"), "GEMINI.md", pass, fail);
  }

  const mandatory = gov.mandatory_paths || [];
  mandatory.forEach(p => {
    if (exists(path.join(projectPath, p))) pass(`${p} found.`);
    else fail(`${p} is missing.`);
  });

  validateProjectAssetRegistry(projectPath, pass, fail);

  const specPath = path.join(projectPath, "01_TASK_SPEC.md");
  if (tier !== "BRAIN" && exists(specPath)) {
    const spec = readText(specPath);
    const markers = gov.spec_markers || [];
    markers.forEach(m => {
      if (spec.includes(m)) pass(`Spec section '${m}' present.`);
      else fail(`Spec section '${m}' is missing.`);
    });
    const placeholder = placeholderPatterns.find((p) => p.test(spec));
    if (placeholder) fail(`Spec contains placeholder: '${placeholder.source}'`);
  }

  runTests(projectPath, pass, fail);
  verifyContractSync(projectPath, pass, fail);

  const integrity = codebaseIntegrity(projectPath, profile);
  writeGateReport(projectPath, integrity, passes, failures);

  if (failures.length > 0) {
    console.log("STATUS: FAIL");
    process.exitCode = 1;
    return false;
  }
  console.log("STATUS: PASS");
  return true;
}

export function isDeliveryAllowed(file, projectPath, profile) {
  const norm = toPosix(file);
  const policy = profile.provisioning?.delivery_policy || {};
  
  const allow = policy.allow_baseline || [];
  if (allow.includes(norm) || allow.some(b => norm.endsWith("/" + b))) return true;

  const deny = policy.deny_prefixes || [];
  if (deny.some(p => norm === p || norm.startsWith(p))) return false;
  
  if (isGovernanceFile(norm, profile)) return false;

  return true;
}

export function isGovernanceFile(file, profile) {
  const mappings = Array.isArray(profile.mappings) ? profile.mappings : [];
  const harvest = (profile.harvesting || []).map(h => toPosix(h.source));

  const isMapped = mappings.some(m => {
    const target = toPosix(m.target);
    return file === target || file.startsWith(target + "/");
  });

  if (!isMapped) return false;

  return !harvest.some(h => file === h || file.startsWith(h + "/"));
}

function getProfile(projectPath) {
  const p = path.join(projectPath, "slicing-profile.json");
  return exists(p) ? readJson(p) : { mappings: [], harvesting: [], provisioning: {} };
}

function validateProjectAssetRegistry(projectPath, pass, fail) {
  const regPath = path.join(projectPath, "asset-index.json");
  if (!exists(regPath)) return;
  try {
    const errors = validateAssetRegistry(readJson(regPath), { rootPath: projectPath, requireGeneratedAt: false });
    if (errors.length) errors.forEach(e => fail(`asset-index.json: ${e}`));
    else pass("asset-index.json valid.");
  } catch (e) { fail(`asset-index.json invalid: ${e.message}`); }
}

function hashMatchExpectedText(expectedText, target, label, pass, fail) {
  if (sha256(normalizeText(expectedText)) === sha256(normalizeText(readText(target)))) pass(`${label} matches Master.`);
  else fail(`${label} modified outside governance.`);
}

function detectProjectTier(projectPath) {
  const regPath = path.join(projectPath, "asset-index.json");
  if (!exists(regPath)) return "HAND";
  try { return (readJson(regPath).identity?.tier || "HAND").toUpperCase(); } catch { return "HAND"; }
}

function normalizeText(c) { return c.replace(/\r\n/g, "\n"); }

function runTests(projectPath, pass, fail) {
  const pkgPath = path.join(projectPath, "package.json");
  if (exists(pkgPath)) {
    const pkg = readJson(pkgPath);
    if (pkg.scripts?.test) {
      if (run("npm", ["test"], { cwd: projectPath, allowFailure: true }).status === 0) pass("npm test passed.");
      else fail("npm test failed.");
      return;
    }
  }
  fail("Test script missing in package.json.");
}

function verifyContractSync(projectPath, pass, fail) {
  const schemaDir = path.join(projectPath, "assets/contracts/schema");
  if (!exists(schemaDir)) return;
  let allSynced = true;
  listFiles(schemaDir).filter(f => f.endsWith(".json")).forEach(s => {
    const name = path.parse(s).name;
    const expected = sha256(readText(s).replace(/\r\n/g, "\n"));
    ["typescript", "dart", "python"].forEach(l => {
      const ext = l === "typescript" ? ".ts" : (l === "dart" ? ".dart" : ".py");
      const gen = path.join(projectPath, "assets/contracts/generated", l, `${name}${ext}`);
      if (!exists(gen) || !readText(gen).includes(expected)) {
        fail(`Contract drift: ${name} (${l}) outdated.`);
        allSynced = false;
      }
    });
  });
  if (allSynced) pass("Contracts in sync.");
}

function writeGateReport(projectPath, integrity, passes, failures) {
  const reportDir = path.join(projectPath, "report");
  if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
  
  const manifestPath = path.join(reportDir, "gate-manifest.json");
  const currentManifest = exists(manifestPath) ? readJson(manifestPath) : null;
  
  // Smart Update: If project hash hasn't changed, reuse the old timestamp to prevent Git diff
  const timestamp = (currentManifest && currentManifest.project_hash === integrity.hash) 
    ? currentManifest.generated_at 
    : new Date().toISOString();

  const manifestData = {
    generated_at: timestamp,
    project_hash: integrity.hash,
    files: integrity.manifest.reduce((acc, l) => { const [p, h] = l.split("\t"); acc[p] = h; return acc; }, {})
  };

  const manifestContent = JSON.stringify(manifestData, null, 2);
  
  // Only write if something changed (hashes or timestamp)
  if (!currentManifest || JSON.stringify(currentManifest) !== manifestContent) {
    fs.writeFileSync(manifestPath, manifestContent);
  }

  const reportPath = path.join(reportDir, "GATE_REPORT.md");
  const content = `# GATE VERIFICATION REPORT
Status: ${failures.length === 0 ? "✅ PASS" : "❌ FAIL"}
Integrity-Hash: \`${integrity.hash}\`

## 🔍 Details
${failures.map(f => `- ❌ ${f}`).join("\n")}
${passes.map(p => `- ✅ ${p}`).join("\n")}

> [!NOTE]
> Manifest: [gate-manifest.json](gate-manifest.json)
`;
  
  // Smart update for MD report as well
  if (!exists(reportPath) || readText(reportPath) !== content) {
    writeText(reportPath, content);
  }
}

export function verifyManifestMappings(runtime, projectPath, profile, pass, fail) {
  const allMappings = Array.isArray(profile.mappings) ? profile.mappings : [];
  const harvestTargets = new Set((profile.harvesting || []).map(h => toPosix(h.source)));

  allMappings.forEach(m => {
    const targetNorm = toPosix(m.target);

    // 1. Skip if it's explicitly harvested (Hands has authority to modify)
    if (harvestTargets.has(targetNorm)) return;

    // 2. Skip special files handled elsewhere (e.g. GEMINI.md by template, asset-index.json by schema)
    if (["GEMINI.md", "asset-index.json"].includes(targetNorm)) return;

    const src = runtime.resolvePath(m.source);
    const trg = path.join(projectPath, m.target);
    if (!exists(trg)) return fail(`Missing target: ${m.target}`);
    
    if (exists(src)) {
      const srcStat = fs.statSync(src);
      const trgStat = fs.statSync(trg);
      
      if (srcStat.isDirectory() && trgStat.isDirectory()) {
        const srcFiles = listFiles(src).map(f => relative(src, f));
        let dirPass = true;
        for (const rel of srcFiles) {
          const sFile = path.join(src, rel);
          const tFile = path.join(trg, rel);
          if (!exists(tFile)) {
            fail(`Directory ${m.target}: missing file ${rel}`);
            dirPass = false;
            continue;
          }
          if (textFileSha256(sFile) !== textFileSha256(tFile)) {
            fail(`Directory ${m.target}: file ${rel} modified outside governance.`);
            dirPass = false;
          }
        }
        if (dirPass) pass(`${m.target} directory matches Master.`);
      } else if (srcStat.isFile() && trgStat.isFile()) {
        if (textFileSha256(src) === textFileSha256(trg)) pass(`${m.target} matches Master.`);
        else fail(`${m.target} modified outside governance.`);
      } else {
        fail(`${m.target} type mismatch (File vs Directory) compared to Master.`);
      }
    }
  });
}
