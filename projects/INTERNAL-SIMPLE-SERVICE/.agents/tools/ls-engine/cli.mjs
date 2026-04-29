#!/usr/bin/env node
import { lsGitPush } from "./lib/delivery.mjs";
import { newModule, newProject } from "./lib/factory.mjs";
import { verifyGate } from "./lib/gate.mjs";
import { initSatellite } from "./lib/init-satellite.mjs";
import { createRuntime } from "./lib/runtime.mjs";
import { selfTest, stressTest } from "./lib/self-test.mjs";
import { pullCode, pushRules } from "./lib/sync.mjs";

const command = process.argv[2];
const args = parseArgs(process.argv.slice(3));
const runtime = createRuntime(args);

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});

async function main() {
  switch (command) {
    case "new-project":
      return newProject(runtime);
    case "new-module":
      return newModule(runtime);
    case "verify-gate":
      return verifyGate(runtime, { projectPath: args["project-path"] || "." });
    case "ls-gitpush":
      return lsGitPush(runtime);
    case "push-rules-to-satellite":
      return pushRules(runtime);
    case "pull-code-from-satellite":
      return pullCode(runtime);
    case "new-hands":
    case "init-satellite":
      return initSatellite(runtime);
    case "self-test":
      return selfTest(runtime);
    case "stress-test":
      return stressTest(runtime);
    default:
      printUsage();
      process.exit(command ? 1 : 0);
  }
}

function parseArgs(argv) {
  const parsed = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = true;
    } else {
      parsed[key] = next;
      i += 1;
    }
  }
  return parsed;
}

function printUsage() {
  console.log(`Link Strategy Engine Ops

Commands:
  new-project --client-id ID --project-name NAME --project-type TYPE [--base-path projects]
  new-module --project-path PATH --module-name NAME
  verify-gate --project-path PATH
  ls-gitpush --title TITLE [--body BODY] [--commit-message MSG] [--project-path PATH]
  push-rules-to-satellite --project-path PATH [--commit-message MSG] [--git-push] [--dry-run]
  pull-code-from-satellite --project-path PATH [--remote-url URL] [--remote-branch main] [--dry-run] [--skip-ci-check]
  new-hands --project-path PATH --repo-name NAME [--public] [--organization linkstrategy]
  init-satellite --project-path PATH --repo-name NAME [--public] [--organization linkstrategy]
  self-test
  stress-test [--iterations 10]
`);
}
