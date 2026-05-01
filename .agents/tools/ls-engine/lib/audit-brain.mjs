import path from "node:path";
import { exists, readJson } from "./fs-utils.mjs";
import { run } from "./process-utils.mjs";

export function verifyBrain(runtime) {
  console.log("\n--- LINK STRATEGY: BRAIN AUDIT ---");
  const root = runtime.root;
  let hasErrors = false;
  let hasWarnings = false;

  // 1. Registry Validation
  const registryPath = path.join(root, "active-hands.json");
  if (!exists(registryPath)) {
    console.log("[FAIL] active-hands.json is missing.");
    hasErrors = true;
  } else {
    try {
      const registry = readJson(registryPath);
      const hands = registry.hands || [];
      console.log(`[PASS] Registry found: ${hands.length} hands registered.`);
      
      const ids = new Set();
      const paths = new Set();
      for (const hand of hands) {
        if (ids.has(hand.id)) {
          console.log(`[FAIL] Duplicate Satellite ID detected: ${hand.id}`);
          hasErrors = true;
        }
        if (paths.has(hand.path)) {
          console.log(`[FAIL] Duplicate Satellite Path detected: ${hand.path}`);
          hasErrors = true;
        }
        ids.add(hand.id);
        paths.add(hand.path);
      }
    } catch (e) {
      console.log(`[FAIL] active-hands.json is invalid JSON: ${e.message}`);
      hasErrors = true;
    }
  }

  // 2. DNA Integrity (Structure)
  const required = [".agents/rules", ".agents/tools/ls-engine"];
  for (const p of required) {
    if (exists(path.join(root, p))) {
      console.log(`[PASS] Core component present: ${p}`);
    } else {
      console.log(`[FAIL] Core component missing: ${p}`);
      hasErrors = true;
    }
  }

  // 3. Connectivity Check (Warnings only)
  if (exists(registryPath)) {
    const registry = readJson(registryPath);
    const hands = registry.hands || [];
    console.log("\n[CHECK] Verifying satellite connectivity...");
    for (const hand of hands) {
      if (!hand.remote_url) {
        console.log(`[WARN] Satellite '${hand.id}' has no remote URL.`);
        hasWarnings = true;
        continue;
      }
      
      // Simple git ls-remote to check connectivity without downloading
      const result = run("git", ["ls-remote", "--heads", hand.remote_url], { capture: true, allowFailure: true });
      if (result.status === 0) {
        console.log(`[PASS] Connection OK: ${hand.id}`);
      } else {
        console.log(`[WARN] Connection FAILED: ${hand.id} (${hand.remote_url})`);
        hasWarnings = true;
      }
    }
  }

  console.log("\n--- AUDIT SUMMARY ---");
  if (hasErrors) {
    console.log("STATUS: FAIL - Critical issues found in Brain configuration.");
    process.exit(1);
  } else if (hasWarnings) {
    console.log("STATUS: PASS (with warnings) - Connectivity issues detected but Brain structure is sound.");
  } else {
    console.log("STATUS: PASS - Brain is healthy and synchronized.");
  }
}
