import { toPosix } from "./fs-utils.mjs";

export const GOVERNANCE_PATHS_PLACEHOLDER = "[GOVERNANCE_PATHS]";
export const ALLOWED_WORKSPACE_PATHS_PLACEHOLDER = "[ALLOWED_WORKSPACE_PATHS]";

export function renderSatelliteGeminiTemplate(templateText, mappings, harvesting) {
  let content = templateText.replace(GOVERNANCE_PATHS_PLACEHOLDER, renderGovernancePaths(mappings, harvesting));
  content = content.replace(ALLOWED_WORKSPACE_PATHS_PLACEHOLDER, renderWorkspacePaths(harvesting));
  return content;
}

function renderGovernancePaths(mappings, harvesting) {
  const harvestTargets = new Set((harvesting || []).map(h => toPosix(h.source)));
  return mappings
    .map(m => toPosix(m.target))
    .filter(t => !harvestTargets.has(t))
    .sort()
    .map(t => `- ${t}`)
    .join("\n");
}

function renderWorkspacePaths(harvesting) {
  return (harvesting || [])
    .map(h => toPosix(h.source))
    .sort()
    .map(t => `- ${t}`)
    .join("\n");
}
