import path from "node:path";
import { brainOnlyPackageScripts, satellitePackageScripts } from "./constants.mjs";
import { exists, readJson, writeText } from "./fs-utils.mjs";

export function validatePackageContract(projectPath, pass, fail) {
  const packageJson = path.join(projectPath, "package.json");
  if (!exists(packageJson)) return;
  let pkg;
  try {
    pkg = readJson(packageJson);
  } catch (error) {
    fail(`package.json is not valid JSON: ${error.message}`);
    return;
  }
  if (pkg.type === "module") pass("package.json type=module is present.");
  else fail("package.json must set type to module for the Node engine.");
  for (const [name, value] of Object.entries(satellitePackageScripts)) {
    if (pkg.scripts?.[name] === value) pass(`package.json script '${name}' matches engine contract.`);
    else fail(`package.json script '${name}' is missing or does not match engine contract.`);
  }
  for (const name of brainOnlyPackageScripts) {
    if (pkg.scripts?.[name]) fail(`package.json exposes Brain-only script '${name}' in Satellite.`);
  }
  if (pkg.engines?.node) pass("package.json declares a Node engine.");
  else fail("package.json must declare engines.node.");
}

export function mergePackageContract(packagePath, defaults = {}) {
  const current = exists(packagePath) ? readJson(packagePath) : {};
  const next = {
    ...current,
    ...defaults,
    private: current.private ?? true,
    type: "module",
    engines: {
      ...(current.engines || {}),
      node: current.engines?.node || ">=20"
    },
    scripts: sanitizeSatelliteScripts(current.scripts || {})
  };
  writeText(packagePath, `${JSON.stringify(next, null, 2)}\n`);
}

export function sanitizeSatelliteScripts(scripts) {
  const next = { ...scripts };
  for (const name of brainOnlyPackageScripts) delete next[name];
  return {
    ...next,
    ...satellitePackageScripts
  };
}
