# Link Strategy Asset Index

This file is the bootstrap registry for Brain, AI Agents, and Hands. Read it at the start of every work session before creating new rules, templates, scripts, tools, components, or project assets.

---

## Core Governance Registry

| Name | Type | Path | Purpose |
| --- | --- | --- | --- |
| `master-agent-governance` | Rule | `GEMINI.md` | Operating rules for AI agent behavior and discipline. |
| `base-platform-backlog` | Project | `backlog.md` | Tracks implementation work and roadmap. |
| `antigravity-technical-spec` | Constitution | `.agents/README.md` | Technical spec for directory structure and rules. |
| `ls-sync-protocol` | Constitution | `.LinkStrategy/04_SYNC_PROTOCOL.md` | Protocol for Slicing, Sync, and Harvesting. |
| `ls-identity-detection` | Tool | `.agents/tools/ls-engine/lib/identity.mjs` | Automated tier-based identity detection. |

## Rules Registry

| Name | Type | Path | Purpose |
| --- | --- | --- | --- |
| `ls-rule-master-governance` | Rule | `.agents/rules/ls-rule-master-governance.md` | Master rule for Brain sovereignty and CI enforcement. |
| `ls-rule-brain-governance` | Rule | `.agents/rules/brain/ls-rule-brain-governance.md` | Governance for Brain project coordination. |
| `ls-rule-gate-acceptance` | Rule | `.agents/rules/hands/ls-rule-gate-acceptance.md` | Technical gate criteria for Satellite delivery. |
| `ls-rule-handover-protocol` | Rule | `.agents/rules/brain/ls-rule-handover-protocol.md` | Defines handover package and DoD for modules. |
| `ls-rule-secret-management` | Rule | `.agents/rules/hands/ls-rule-secret-management.md` | Secret handling and key revocation policy. |
| `ls-rule-conventional-commits` | Rule | `.agents/rules/hands/ls-rule-conventional-commits.md` | Standardized Git history for replaceability. |
| `ls-rule-handover-guide` | Rule | `.agents/rules/hands/ls-rule-handover-guide-for-hands.md` | Guide for Hands handling Specs and Figma. |

## Workflow Registry

| Name | Type | Path | Purpose |
| --- | --- | --- | --- |
| `ls-workflow-gitpush` | Workflow | `.agents/workflows/hands/ls-workflow-gitpush.md` | Secure delivery workflow for Hands. |
| `ls-workflow-new-project` | Workflow | `.agents/workflows/master/ls-workflow-new-project.md` | Step-by-step for creating Brain Workspaces. |
| `ls-workflow-init-satellite` | Workflow | `.agents/workflows/brain/ls-workflow-init-satellite.md` | Provisioning a Satellite repo from local. |
| `ls-workflow-new-hand-folder` | Workflow | `.agents/workflows/brain/ls-workflow-new-hand-folder.md` | Initializing and drafting task folders. |
| `ls-workflow-push-rules` | Workflow | `.agents/workflows/brain/ls-workflow-push-rules.md` | Syncing DNA/Shell assets to Satellites. |
| `ls-workflow-harvest-code` | Workflow | `.agents/workflows/brain/ls-workflow-harvest-code.md` | CI-gated harvest of verified code to Brain. |

## Template Registry

| Name | Type | Path | Purpose |
| --- | --- | --- | --- |
| `task-spec-template` | Template | `.agents/templates/01_TASK_SPEC_TEMPLATE.md` | Base structure for task/module spec. |
| `decision-logs-template` | Template | `.agents/templates/02_DECISION_LOGS_TEMPLATE.md` | Decision ledger for logic alignment. |
| `progress-logs-template` | Template | `.agents/templates/03_LOGS_TEMPLATE.md` | Action log format for daily execution. |
| `hardening-proposal-template` | Template | `.agents/templates/HARDENING_PROPOSAL_TEMPLATE.md` | Reusable logic extraction plan. |
| `brain-constitution-template` | Template | `.agents/templates/GEMINI_BRAIN_TEMPLATE.md` | Standard constitution for Brain Workspaces. |
| `gate-scorecard-template` | Template | `.agents/templates/GATE_SCORECARD_TEMPLATE.md` | Phase 2+ Brain acceptance scorecard. |
| `verify-gate-action` | Template | `.github/workflows/link-strategy-ci.yml` | Unified CI Suite for tier-aware verification. |
| `branch-protection-checklist` | Template | `.agents/templates/BRANCH_PROTECTION_CHECKLIST.md` | GitHub hardening guidance. |
| `codeowners-policy` | Template | `.github/CODEOWNERS` | Repo ownership and review authority. |
| `env-example-template` | Template | `.agents/templates/ENV_EXAMPLE_TEMPLATE` | Standard environment variable example. |

## Skill Registry

| Name | Type | Path | Purpose |
| --- | --- | --- | --- |
| `ls-skill-engine-ops` | Skill | `.agents/skills/brain/ls-skill-engine-ops/` | Core engine management capability. |
| `nodejs-backend-patterns` | Skill | `.agents/skills/hands/nodejs-backend-patterns/` | Production-ready Node.js patterns. |
| `prompt-engineering` | Skill | `.agents/skills/hands/prompt-engineering-patterns/` | LLM performance optimization techniques. |
| `python-design-patterns` | Skill | `.agents/skills/hands/python-design-patterns/` | Clean and modular Python patterns. |
| `react-state-management` | Skill | `.agents/skills/hands/react-state-management/` | Modern React state patterns. |
| `tailwind-design-system` | Skill | `.agents/skills/hands/tailwind-design-system/` | Scalable UI design with Tailwind v4. |

## Tool & Script Registry

| Name | Type | Path | Purpose |
| --- | --- | --- | --- |
| `ls-engine-cli` | Tool | `.agents/tools/ls-engine/cli.mjs` | CLI source of truth for platform ops. |
| `new-project` | Script | `npm run new-project` | Generates Brain Workspaces from Master. |
| `new-hand-folder` | Script | `npm run new-hand-folder` | Initializes local task packaging. |
| `init-satellite` | Script | `npm run init-satellite` | Provisions Cloud infrastructure for task. |
| `verify-gate` | Script | `npm run verify-gate` | Local/CI technical gate verification. |
| `push-rules` | Script | `npm run push-rules` | DNA/Shell asset synchronization. |
| `pull-code` | Script | `npm run pull-code` | CI-gated code harvesting into Brain. |
| `ls-gitpush` | Script | `npm run ls-gitpush` | Agent-led secure delivery to main. |

## Component & Dataset Registry

| Name | Type | Path | Purpose |
| --- | --- | --- | --- |
| `active-projects` | Dataset | `active-projects.json` | Registry of managed Brain Workspaces. |
| `active-hands` | Dataset | `active-hands.json` | Registry of managed Satellite repos. |

---

## Registration Rules

- Do not create a new asset if an existing asset can be extended safely.
- New assets must use Link Strategy naming: `ls-rule-*`, `ls-workflow-*`, `ls-skill-*`, `ls-tool-*`.
- Every new asset must be registered here in the same change that creates it.
- Assets must have documentation enough for another operator or AI Agent to use.
