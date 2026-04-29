# Link Strategy Asset Index

This file is the bootstrap registry for Brain, AI Agents, and Hands. Read it at the start of every work session before creating new rules, templates, scripts, tools, components, or project assets.

## Registry Contract

Every asset should be tracked with these fields:

| Field | Meaning |
| --- | --- |
| Name | Stable asset name using Link Strategy naming conventions. |
| Type | Constitution, Rule, Workflow, Template, Skill, Tool, Component, Dataset, Script, or Project. |
| Path | Location in this repository. |
| Owner | Accountable owner. Default is `Brain`. |
| Status | `Active`, `Draft`, `Placeholder`, `Planned`, or `Deprecated`. |
| Purpose | Why this asset exists. |
| Input | Required input/context to use the asset. |
| Output | Expected result after using the asset. |
| Mandatory Usage | When usage is required. |
| Related Docs | Source or downstream documents connected to the asset. |

## Status Legend

| Status | Definition |
| --- | --- |
| Active | Exists and is usable as an operating asset. |
| Draft | Exists with useful content, but still needs hardening. |
| Placeholder | Exists, but is empty or not yet operational. |
| Planned | Required by governance/backlog, but file or implementation does not exist yet. |
| Deprecated | Should not be used for new work. |

## Bootstrap Order

1. Read `GEMINI.md`.
2. Read the core constitution and system configuration documents.
3. Read this `ASSET_INDEX.md`.
4. Locate the relevant rules, workflows, templates, scripts, or components below.
5. If an asset exists, use or extend it before creating a new one.
6. If a new asset is created or hardened, update this index in the same change.

---

## Core Governance Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `master-agent-governance` | Rule | `GEMINI.md` | Brain | Active | Defines current AI agent behavior and workspace-level execution discipline. | Any AI agent session. | Operating rules for agent behavior. | Required at the start of every AI-assisted session. | `ASSET_INDEX.md` |
| `base-platform-backlog` | Project | `backlog.md` | Brain | Active | Tracks implementation work for Base Platform V1. | Current repo state and governance docs. | Prioritized checklist and status. | Required when choosing next platform task. | `README.md`, `ASSET_INDEX.md` |
| `workspace-progress-log` | Dataset | `03_LOGS.md` | Brain | Active | Captures workspace-level done/block/next handover notes. | End-of-session progress. | Continuity log for the next operator. | Required after meaningful work sessions. | `.agents/templates/03_LOGS_TEMPLATE.md` |
| `antigravity-technical-spec` | Constitution | `.agents/README.md` | Brain | Active | Official technical specification for Antigravity directory structure, rule formatting, and hierarchy. | Agent configuration or asset creation. | Technical compliance for the production engine. | Required when creating new rules, workflows, or skills. | `backlog.md`, https://antigravity.codes |


## Rules Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ls-rule-master-governance` | Rule | `.agents/rules/ls-rule-master-governance.md` | Brain | Active | Master rule for Brain sovereignty, Spec-First execution, verification gate, hardening, and audit. | Agent session or delivery task. | Operational constraints for execution. | Mandatory for all work. | `GEMINI.md` |
| `ls-rule-gate-acceptance` | Rule | `.agents/rules/ls-rule-gate-acceptance.md` | Brain | Active | 100-point Gate Scorecard and automated acceptance protocol for module delivery. | PR or delivery request. | Scorecard report and Pass/Fail decision. | Required for all delivery acceptance. | `ls-workflow-gitpush` |
| `ls-rule-handover-protocol` | Rule | `.agents/rules/ls-rule-handover-protocol.md` | Brain | Active | Defines the 8-pillar handover package and DoD for Microservices/Modules. | New task or module setup. | Compliant handover package. | Required for all module tasking. | `ls-workflow-gitpush` |
| `ls-rule-secret-management` | Rule | `.agents/rules/ls-rule-secret-management.md` | Brain | Active | Secret handling policy for `.env`, credentials, production access, and key revocation. | Any project using environment variables or credentials. | Secure secret usage and revocation requirements. | Required before project/satellite handover. | `.gitignore` |
| `ls-rule-conventional-commits` | Rule | `.agents/rules/ls-rule-conventional-commits.md` | Brain | Active | Enforces readable and standardized Git history for 24h staffing replaceability. | Every code commit. | Standardized commit logs. | Mandatory for all developers (Hands). | `.github/pull_request_template.md` |
| `ls-rule-ui-premium` | Rule | `.agents/rules/ls-rule-ui-premium.md` | Brain | Planned | Targeted aesthetic enforcement for premium UI design (HSL, micro-animations, typography). | Frontend or UI component work. | Premium aesthetic compliance. | Mandatory for all files matching `components/ui/**/*`. | `components/ui/README.md` |
| `ls-rule-handover-guide` | Rule | `.agents/rules/ls-rule-handover-guide-for-hands.md` | Brain | Active | Defines how Hands should handle Swagger specs and Figma designs during implementation. | New task/module handover. | Compliance with technical and visual contracts. | Mandatory for all Hands during 24h onboarding. | `.agents/templates/01_TASK_SPEC_TEMPLATE.md` |


## Workflow Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ls-workflow-gitpush` | Workflow | `.agents/workflows/ls-workflow-gitpush.md` | Brain | Active | Quy trình bàn giao và nộp bài an toàn (Agent-led Secure Delivery). | Task/module delivery request. | Standard execution sequence. | Mandatory for all delivery work. | N/A |
| `ls-workflow-new-project` | Workflow | `.agents/workflows/ls-workflow-new-project.md` | Brain | Planned | Step-by-step for setting up a brand new project. | New project request. | Initialized project folder. | Required for project consistency. | `npm run new-project` |
| `ls-workflow-daily-harvesting` | Workflow | `.agents/workflows/ls-workflow-daily-harvesting.md` | Brain | Planned | End-of-day workflow for extracting knowledge, risks, and hardening candidates from logs and commits. | `03_LOGS.md`, commits, `02_DECISION_LOGS.md`. | Knowledge pieces and hardening candidates. | Required for Brain daily review once created. | N/A |

## Template Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `task-spec-template` | Template | `.agents/templates/01_TASK_SPEC_TEMPLATE.md` | Brain | Active | Provides the base Spec-First structure for task/module handover. | Feature/module objective and context. | `01_TASK_SPEC.md`. | Required before implementation starts. | N/A |
| `decision-logs-template` | Template | `.agents/templates/02_DECISION_LOGS_TEMPLATE.md` | Brain | Active | Decision ledger template for logic alignment and architectural consensus. | Questions and decisions during delivery. | `02_DECISION_LOGS.md`. | Required for all project/module work. | N/A |
| `progress-logs-template` | Template | `.agents/templates/03_LOGS_TEMPLATE.md` | Brain | Active | Provides Done/Block/Next daily action format. | Daily or session-end work state. | `03_LOGS.md`. | Required for all project/module work. | N/A |
| `hardening-proposal-template` | Template | `.agents/templates/HARDENING_PROPOSAL_TEMPLATE.md` | Brain | Active | Captures reusable logic candidates and abstraction plan after PR/milestone. | Completed implementation or module. | Hardening proposal for asset extraction. | Required before macro-hardening review. | `backlog.md` |
| `gate-scorecard-template` | Template | `.agents/templates/GATE_SCORECARD_TEMPLATE.md` | Brain | Active | Standard 100-point delivery scorecard. | Test/lint/docs/security/hardening evidence. | Gate score and payment decision basis. | Required for delivery acceptance. | N/A |
| `decision-log-template` | Template | `.agents/templates/DECISION_LOG_TEMPLATE.md` | Brain | Planned | Captures architectural decisions and consequences. | Architecture or governance decision. | Decision log entry. | Required for significant architecture changes. | N/A |
| `security-checklist-template` | Template | `.agents/templates/SECURITY_CHECKLIST_TEMPLATE.md` | Brain | Planned | Security review checklist for handover and gate review. | Module/service implementation. | Security review evidence. | Required before accepting modules that handle data/auth/secrets. | N/A |
| `pr-template` | Template | `.github/pull_request_template.md` | Brain | Active | Standard GitHub PR template for delivery checkpoints. | Completed task implementation. | PR description with checklist evidence. | Required for all merge requests. | `backlog.md` |
| `verify-gate-action` | Template | `.agents/templates/verify-gate.yml` | Brain | Active | GitHub Action workflow that runs the mandatory remote verification gate. | PR event on GitHub. | Verified/failed status on PR. | Mandatory for all satellite repositories. | `npm run verify-gate` |
| `branch-protection-checklist` | Template | `.agents/templates/BRANCH_PROTECTION_CHECKLIST.md` | Brain | Active | Guidance for configuring GitHub branch protection to secure the main branch. | GitHub repository settings. | Secure branch configuration. | Required before onboarding Hands. | `backlog.md`, `ls-rule-master-governance` |
| `codeowners-policy` | Template | `.github/CODEOWNERS` | Brain | Active | Defines repo ownership and mandatory review authority. | Repo configuration. | Automated PR assignment and protection. | Required for monorepo governance. | `GEMINI.md` |
| `env-example-template` | Template | `.agents/templates/ENV_EXAMPLE_TEMPLATE` | Brain | Planned | Standard environment variable example file. | Service/module config requirements. | `.env.example`. | Required for projects/modules with runtime config. | `.gitignore`, `ls-rule-secret-management` |
| `onboarding-checklist-template` | Template | `.agents/templates/ONBOARDING_CHECKLIST_TEMPLATE.md` | Brain | Planned | 24h onboarding checklist for replacement Hands. | New contributor/module assignment. | Ready-to-work checklist. | Required when onboarding Hands. | N/A |
| `offboarding-checklist-template` | Template | `.agents/templates/OFFBOARDING_CHECKLIST_TEMPLATE.md` | Brain | Planned | 15-minute offboarding and revoke-access checklist. | Freelancer removal or risk event. | Access revocation and evidence trail. | Required when offboarding Hands. | N/A |

## Skill Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ls-skill-engine-ops` | Skill | `.agents/skills/ls-skill-engine-ops/` | Brain | Active | Hardened capability for managing the Link Strategy Production Engine (Sync, Verification, Project/Module Gen). | Project/Satellite metadata. | Managed repository infrastructure. | Required for all platform operations (Sync, Gate, Init). | N/A |
| `nodejs-backend-patterns` | Skill | `.agents/skills/nodejs-backend-patterns/` | Brain | Active | Production-ready Node.js backend patterns (Express/Fastify, middleware, auth). | Backend task requirements. | Hardened Node.js implementation. | Optional/Recommended for Node.js work. | N/A |
| `prompt-engineering-patterns` | Skill | `.agents/skills/prompt-engineering-patterns/` | Brain | Active | Advanced prompt engineering techniques for production LLM performance. | Prompt design task. | Optimized prompts. | Required for AI Agent optimization. | N/A |
| `python-design-patterns` | Skill | `.agents/skills/python-design-patterns/` | Brain | Active | Python design patterns (KISS, Separation of Concerns, etc.). | Python development task. | Clean Python code. | Optional/Recommended for Python work. | N/A |
| `react-state-management` | Skill | `.agents/skills/react-state-management/` | Brain | Active | Modern React state management (Redux, Zustand, React Query). | Frontend state task. | Efficient state logic. | Optional/Recommended for React work. | N/A |
| `tailwind-design-system` | Skill | `.agents/skills/tailwind-design-system/` | Brain | Active | Scalable design systems with Tailwind CSS v4. | UI/UX development task. | Standardized Tailwind styles. | Required for UI Kit work. | N/A |


## Tool Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ls-tool-mcp-bridge` | Tool | `.agents/tools/ls-tool-mcp-bridge/` | Brain | Planned | Planned bridge between AI context and live system data. | Agent query/context. | Real-time data response. | Required for live data inquiry once implemented. | N/A |
| `ls-tool-auditor-proxy` | Tool | `.agents/tools/ls-tool-auditor-proxy/` | Brain | Planned | Planned control layer for risky AI/Hands commands. | Proposed command/action. | Allow/block decision and audit record. | Required for Action Lane once implemented. | N/A |
| `ls-tool-dev-sandbox` | Tool | `.agents/tools/ls-tool-dev-sandbox/` | Brain | Planned | Planned dockerized isolated execution environment. | Project/module source code. | Safe local runtime. | Required for satellite handover once implemented. | N/A |

## Script Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ls-engine-cli` | Tool | `.agents/tools/ls-engine/cli.mjs` | Brain | Active | Node.js CLI source of truth for Phase 1 operations. | npm command arguments. | Project/satellite/gate/sync actions. | Required for all platform automation. | `package.json`, `README.md`, `backlog.md` |
| `new-project` | Script | `npm run new-project` | Brain | Active | Generates project workspace skeleton. | `--client-id`, `--project-name`, `--project-type`. | `projects/[CLIENT_ID]-[PROJECT_NAME]/`. | Required for consistent project creation. | `README.md`, `backlog.md` |
| `new-module` | Script | `npm run new-module` | Brain | Active | Generates module workspace inside a project. | `--project-path`, `--module-name`. | Module folder with 01/02/03/src/tests. | Required for module-based tasking. | N/A |
| `init-satellite` | Script | `npm run init-satellite` | Brain | Active | Automates GitHub repo creation, remote setup, initial governance push, and branch protection. | `--project-path`, `--repo-name`. | Production-ready Satellite Repository. | Required for external project onboarding. | `docs/sync-linkage.md` |
| `verify-gate` | Script | `npm run verify-gate` | Brain | Active | Performs local/CI gate checks and creates pass/fail evidence. | `--project-path`. | `GATE_REPORT.md`. | Required before delivery. | `gate-scorecard-template` |
| `push-rules` | Script | `npm run push-rules` | Brain | Active | Pushes governance assets and Node engine from Master to Satellite. | `--project-path`, optional `--dry-run`. | Updated rules/tooling in satellite. | Post-governance update. | `docs/sync-linkage.md` |
| `pull-code` | Script | `npm run pull-code` | Brain | Active | Pulls (harvests) source code from Satellite to Master. | `--project-path`, optional `--remote-url`, `--dry-run`. | Source code integrated in Master. | Post-milestone acceptance. | `docs/sync-linkage.md` |
| `ls-gitpush` | Script | `npm run ls-gitpush` | Brain | Active | Agent-led delivery: runs gate, stages allowed delivery files, pushes branch, and creates GitHub PR. | `--project-path`, `--title`, optional `--body`. | Created Pull Request on GitHub. | Mandatory for all Hands submissions. | `.LinkStrategy/01_SOP_LINK_STRATEGY.md` |
| `register-asset` | Script | `npm run register-asset` | Brain | Planned | Helps register new hardened assets in this index. | Asset metadata. | Updated or draft index entry. | Required after hardening once implemented. | `ASSET_INDEX.md` |

## Component Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `shared-ui-library` | Component | `components/ui/` | Brain | Placeholder | Planned shared UI component library for frontend work. Current README is empty. | Frontend task requirements. | Reusable UI components and patterns. | Required for frontend work once implemented. | `ls-skill-ui-kit`, `.LinkStrategy/02_FULL_SYSTEM_CONFIGURATION.md` |

## Dataset Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `audit-trail-schema` | Dataset | `.agents/datasets/audit-trail.schema.json` | Brain | Planned | Defines local/future ledger audit record schema. | Agent/action event metadata. | Validated audit record shape. | Required before audit automation. | `.LinkStrategy/02_FULL_SYSTEM_CONFIGURATION.md` |
| `active-projects` | Dataset | `active-projects.json` | Brain | Active | Central registry of all Satellite Repositories and their sync status. | Platform scripts. | Project list for automation. | Required for batch sync operations. | `.LinkStrategy/04_SYNC_PROTOCOL.md` |
| `knowledge-piece-template` | Template | `.agents/templates/KNOWLEDGE_PIECE_TEMPLATE.md` | Brain | Planned | Standard format for reusable knowledge pieces before vector KB ingestion. | Lessons, patterns, anti-patterns. | Knowledge piece document. | Required for knowledge harvesting once created. | `.LinkStrategy/01_SOP_LINK_STRATEGY.md` |

## Project Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `demo-base-platform` | Project | `projects/DEMO-BASE-PLATFORM/` | Brain | Active | Reference project proving project factory, templates, logs, and gate verification. | Project factory scripts and templates. | Demo project workspace. | Required for Base Platform V1 validation. | `backlog.md` |
| `INTERNAL-SIMPLE-SERVICE` | Project | `projects/INTERNAL-SIMPLE-SERVICE/` | Brain | Active | Automatically generated hardened satellite project. | N/A | Project structure | Mandatory | N/A |

## Training Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `auditor-training` | Dataset | `.LinkStrategy/Training/auditor/` | Brain | Active | Auditor Capability Training curriculum and handbook. | Candidate profile. | Trained Auditor. | Required for Auditor onboarding. | N/A |

---

## Registration Rules

- Do not create a new asset if an existing asset can be extended safely.
- New assets must use Link Strategy naming: `ls-rule-*`, `ls-workflow-*`, `ls-skill-*`, `ls-tool-*`, or clear template/script names.
- Every new asset must be registered here in the same change that creates it.
- Placeholder assets must not be treated as operational until their status is changed to `Draft` or `Active`.
- `Active` requires enough documentation for another operator or AI Agent to use the asset without hidden context.
