import fs from "node:fs";
import path from "node:path";
import { exists, fileSha256, readJson } from "./fs-utils.mjs";

export function verifyBrain(runtime) {
  console.log("\n--- LINK STRATEGY: BRAIN AUDIT ---");
  const root = runtime.root;
  let hasErrors = false;
  let registry = null;

  // 1. Registry Validation
  const registryPath = path.join(root, "active-hands.json");
  if (!exists(registryPath)) {
    console.log("[FAIL] active-hands.json is missing.");
    hasErrors = true;
  } else {
    try {
      registry = readJson(registryPath);
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
        for (const error of validateHarvestEvidence(hand, root)) {
          console.log(`[FAIL] Satellite '${hand.id}': ${error}`);
          hasErrors = true;
        }
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

  console.log("\n--- AUDIT SUMMARY ---");
  if (hasErrors) {
    console.log("STATUS: FAIL - Critical issues found in Brain configuration.");
    process.exit(1);
  } else {
    console.log("STATUS: PASS - Brain registry and harvested evidence are valid.");
  }
}

function validateHarvestEvidence(hand, root) {
  const errors = [];
  if (!hand.remote_url) errors.push("remote_url is required.");
  if (!isSha1(hand.last_sha)) errors.push("last_sha must be a 40-character commit SHA from the last harvest.");
  if (!isSha256(hand.last_gate_hash)) errors.push("last_gate_hash must be a 64-character SHA256 hash from Hands CI.");
  if (!isNonEmptyString(hand.gate_run_id)) errors.push("gate_run_id is required.");
  if (!isNonEmptyString(hand.ci_status)) errors.push("ci_status is required.");
  else if (hand.ci_status !== "success") errors.push(`ci_status must be 'success' for Brain CI enforcement, got '${hand.ci_status}'.`);
  if (!isNonEmptyString(hand.harvested_at) || Number.isNaN(Date.parse(hand.harvested_at))) errors.push("harvested_at must be a valid ISO timestamp.");
  errors.push(...validateEvidenceFile(root, hand.gate_report_path, "gate_report_path"));
  errors.push(...validateEvidenceFile(root, hand.gate_manifest_path, "gate_manifest_path"));
  errors.push(...validateDeliveryReceiptEvidence(hand, root));
  return errors;
}

function validateDeliveryReceiptEvidence(hand, root) {
  const errors = [];
  errors.push(...validateEvidenceFile(root, hand.delivery_receipt_path, "delivery_receipt_path"));
  if (!isSha256(hand.delivery_receipt_hash)) errors.push("delivery_receipt_hash must be a 64-character SHA256 hash.");

  if (errors.length) return errors;

  const receiptPath = resolveEvidencePath(root, hand.delivery_receipt_path);
  const actualHash = fileSha256(receiptPath);
  if (actualHash !== hand.delivery_receipt_hash.toUpperCase()) {
    errors.push(`delivery_receipt_hash does not match ${hand.delivery_receipt_path}. Expected ${hand.delivery_receipt_hash}; actual ${actualHash}.`);
  }

  try {
    const receipt = readJson(receiptPath);
    if (receipt.tool !== "ls-gitpush") errors.push("delivery receipt tool must be 'ls-gitpush'.");
    if (!isSha256(receipt.gate_hash)) errors.push("delivery receipt gate_hash must be a 64-character SHA256 hash.");
    else if (isSha256(hand.last_gate_hash) && receipt.gate_hash.toUpperCase() !== hand.last_gate_hash.toUpperCase()) {
      errors.push(`delivery receipt gate_hash does not match last_gate_hash. Receipt=${receipt.gate_hash}; Registry=${hand.last_gate_hash}.`);
    }
  } catch (error) {
    errors.push(`delivery_receipt_path is not valid JSON: ${error.message}`);
  }

  return errors;
}

function validateEvidenceFile(root, value, label) {
  const errors = [];
  if (!isNonEmptyString(value)) {
    errors.push(`${label} is required.`);
    return errors;
  }
  if (path.isAbsolute(value)) {
    errors.push(`${label} must be a repository-relative path.`);
    return errors;
  }

  const fullPath = path.resolve(root, value);
  const relative = path.relative(root, fullPath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    errors.push(`${label} must stay inside the Brain repository: ${value}`);
    return errors;
  }
  if (!exists(fullPath)) {
    errors.push(`${label} file does not exist: ${value}`);
    return errors;
  }
  try {
    const stat = fs.statSync(fullPath);
    if (!stat.isFile()) errors.push(`${label} must point to a file: ${value}`);
  } catch (error) {
    errors.push(`${label} cannot be read: ${error.message}`);
  }
  return errors;
}

function resolveEvidencePath(root, value) {
  return path.resolve(root, value);
}

function isSha1(value) {
  return typeof value === "string" && /^[a-fA-F0-9]{40}$/.test(value);
}

function isSha256(value) {
  return typeof value === "string" && /^[a-fA-F0-9]{64}$/.test(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}
