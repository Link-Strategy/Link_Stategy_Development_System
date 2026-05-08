import fs from 'fs';
import path from 'path';

export async function verifyContracts(runtime, options = {}) {
  const root = process.cwd();
  const schemaDir = path.join(root, "assets", "contracts", "schema");
  const pass = options.pass || ((msg) => console.log(`[PASS] ${msg}`));
  const fail = options.fail || ((msg) => console.error(`[FAIL] ${msg}`));

  console.log("Starting Contract Verification...");

  const { schemas, errors } = loadSchemas(schemaDir);
  let allPassed = errors.length === 0;

  for (const error of errors) {
    fail(error);
  }

  if (Object.keys(schemas).length === 0) {
    console.warn("No schemas found in assets/contracts.");
  } else if (allPassed) {
    pass(`Loaded ${Object.keys(schemas).length} contract schema(s). Markdown examples are not validated by this check.`);
  }

  if (!options.silent) {
    if (allPassed) console.log("\nOverall Contract Integrity: PASS");
    else console.error("\nOverall Contract Integrity: FAIL");
  }

  if (!allPassed && !options.noExit) process.exit(1);
  return allPassed;
}

function loadSchemas(dir) {
  const schemas = {};
  const errors = [];
  if (!fs.existsSync(dir)) return { schemas, errors };

  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith(".json")) {
      try {
        const content = fs.readFileSync(path.join(dir, file), 'utf-8');
        schemas[file] = JSON.parse(content);
        console.log(`Loaded schema: ${file}`);
      } catch (e) {
        errors.push(`Error loading schema ${file}: ${e.message}`);
      }
    }
  }
  return { schemas, errors };
}
