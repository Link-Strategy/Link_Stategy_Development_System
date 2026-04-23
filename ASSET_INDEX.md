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
| `strategic-business-blueprint` | Constitution | `.LinkStrategy/00_BLUEPRINT_Link Strategy.md` | Brain | Active | Defines Link Strategy's business identity, pain-led wedge strategy, monetization ladder, module-to-SaaS path, and strategic hardening logic. | Roadmap, offer, module, SaaS, or hardening decision. | Strategic interpretation for why a module should exist. | Required before approving work that affects roadmap, ICP, offer, reusable module strategy, or SaaS pathway. | `.LinkStrategy/01_SOP_LINK_STRATEGY.md`, `backlog.md` |
| `master-operating-constitution` | Constitution | `.LinkStrategy/01_SOP_LINK_STRATEGY.md` | Brain | Active | Defines Brain/Hands doctrine, SDLC loop, hardening rules, gate scorecard, exception handling, and knowledge governance. | Any platform or delivery decision. | Highest-level operating interpretation. | Required before changing architecture, delivery rules, acceptance, or asset governance. | `GEMINI.md`, `.LinkStrategy/02_FULL_SYSTEM_CONFIGURATION.md` |
| `production-engine-configuration` | Constitution | `.LinkStrategy/02_FULL_SYSTEM_CONFIGURATION.md` | Brain | Active | Defines repository strategy, 4-plane architecture, asset discovery, audit, hardening pipeline, and gate scorecard. | Platform structure or automation work. | Technical blueprint for the production engine. | Required for base platform, repo structure, agent workflow, and audit design. | `.LinkStrategy/01_SOP_LINK_STRATEGY.md`, `README.md` |
| `microservice-handover-standard` | Constitution | `.LinkStrategy/03_HANDOVER_SPEC.md` | Brain | Active | Defines the required 8-part handover package for modules/microservices. | Module handover or satellite repo setup. | Handover checklist and DoD expectations. | Required before handing work to Hands/Freelancers. | `.agents/templates/01_TASK_SPEC_TEMPLATE.md` |
| `master-agent-governance` | Rule | `GEMINI.md` | Brain | Draft | Defines current AI agent behavior and workspace-level execution discipline. | Any AI agent session. | Operating rules for agent behavior. | Required at the start of every AI-assisted session. | `ASSET_INDEX.md`, `.LinkStrategy/01_SOP_LINK_STRATEGY.md` |
| `base-platform-backlog` | Project | `backlog.md` | Brain | Active | Tracks implementation work for Base Platform V1. | Current repo state and governance docs. | Prioritized checklist and status. | Required when choosing next platform task. | `README.md`, `ASSET_INDEX.md` |
| `workspace-progress-log` | Dataset | `LOGS.md` | Brain | Draft | Captures workspace-level done/block/next handover notes. | End-of-session progress. | Continuity log for the next operator. | Required after meaningful work sessions. | `.agents/templates/LOGS_TEMPLATE.md` |
| `antigravity-technical-spec` | Constitution | `.agents/README.md` | Brain | Active | Official technical specification for Antigravity directory structure, rule formatting, and hierarchy. | Agent configuration or asset creation. | Technical compliance for the production engine. | Required when creating new rules, workflows, or skills. | `backlog.md`, https://antigravity.codes |


## Rules Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ls-rule-master-governance` | Rule | `.agents/rules/ls-rule-master-governance.md` | Brain | Active | Master rule for Brain sovereignty, Spec-First execution, verification gate, hardening, and audit. | Agent session or delivery task. | Operational constraints for execution. | Mandatory for all work. | `GEMINI.md`, `.LinkStrategy/01_SOP_LINK_STRATEGY.md` |
| `ls-rule-secret-management` | Rule | `.agents/rules/ls-rule-secret-management.md` | Brain | Active | Secret handling policy for `.env`, credentials, production access, and key revocation. | Any project using environment variables or credentials. | Secure secret usage and revocation requirements. | Required before project/satellite handover. | `.gitignore`, `.LinkStrategy/03_HANDOVER_SPEC.md` |
| `ls-rule-conventional-commits` | Rule | `.agents/rules/ls-rule-conventional-commits.md` | Brain | Active | Enforces readable and standardized Git history for 24h staffing replaceability. | Every code commit. | Standardized commit logs. | Mandatory for all developers (Hands). | `.github/pull_request_template.md` |
| `ls-rule-ui-premium` | Rule | `.agents/rules/ls-rule-ui-premium.md` | Brain | Active | Targeted aesthetic enforcement for premium UI design (HSL, micro-animations, typography). | Frontend or UI component work. | Premium aesthetic compliance. | Mandatory for all files matching `components/ui/**/*`. | `components/ui/README.md` |


## Workflow Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ls-workflow-delivery-loop` | Workflow | `.agents/workflows/ls-workflow-delivery-loop.md` | Brain | Active | Standard workflow for the full SDLC loop: Spec-First, Bidding & Isolation, Execution, Gate, Hardening. | Task/module delivery request. | Standard execution sequence. | Mandatory for all delivery work. | `.LinkStrategy/01_SOP_LINK_STRATEGY.md` |
| `ls-workflow-daily-harvesting` | Workflow | `.agents/workflows/ls-workflow-daily-harvesting.md` | Brain | Planned | End-of-day workflow for extracting knowledge, risks, and hardening candidates from logs and commits. | `LOGS.md`, commits, QA logs. | Knowledge pieces and hardening candidates. | Required for Brain daily review once created. | `.LinkStrategy/01_SOP_LINK_STRATEGY.md` |

## Template Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `task-spec-template` | Template | `.agents/templates/01_TASK_SPEC_TEMPLATE.md` | Brain | Active | Provides the base Spec-First structure for task/module handover. | Feature/module objective and context. | `01_TASK_SPEC.md`. | Required before implementation starts. | `.LinkStrategy/03_HANDOVER_SPEC.md` |
| `qa-logs-template` | Template | `.agents/templates/02_QA_LOGS_TEMPLATE.md` | Brain | Active | Planned communication-plane template for questions, decisions, owners, and status. | Questions and decisions during delivery. | `02_QA_LOGS.md`. | Required for all project/module work. | `.LinkStrategy/02_FULL_SYSTEM_CONFIGURATION.md` |
| `daily-logs-template` | Template | `.agents/templates/LOGS_TEMPLATE.md` | Brain | Draft | Provides Done/Block/Next daily handover format. Needs commit links, risk, and handover note fields. | Daily or session-end work state. | `LOGS.md`. | Required for all project/module work. | `.LinkStrategy/01_SOP_LINK_STRATEGY.md` |
| `hardening-proposal-template` | Template | `.agents/templates/HARDENING_PROPOSAL_TEMPLATE.md` | Brain | Active | Captures reusable logic candidates and abstraction plan after PR/milestone. | Completed implementation or module. | Hardening proposal for asset extraction. | Required before macro-hardening review. | `backlog.md`, `.LinkStrategy/01_SOP_LINK_STRATEGY.md` |
| `gate-scorecard-template` | Template | `.agents/templates/GATE_SCORECARD_TEMPLATE.md` | Brain | Active | Standard 100-point delivery scorecard. | Test/lint/docs/security/hardening evidence. | Gate score and payment decision basis. | Required for delivery acceptance. | `.LinkStrategy/01_SOP_LINK_STRATEGY.md` |
| `decision-log-template` | Template | `.agents/templates/DECISION_LOG_TEMPLATE.md` | Brain | Planned | Captures architectural decisions and consequences. | Architecture or governance decision. | Decision log entry. | Required for significant architecture changes. | `.LinkStrategy/01_SOP_LINK_STRATEGY.md` |
| `security-checklist-template` | Template | `.agents/templates/SECURITY_CHECKLIST_TEMPLATE.md` | Brain | Planned | Security review checklist for handover and gate review. | Module/service implementation. | Security review evidence. | Required before accepting modules that handle data/auth/secrets. | `.LinkStrategy/03_HANDOVER_SPEC.md` |
| `pr-template` | Template | `.github/pull_request_template.md` | Brain | Active | Standard GitHub PR template for delivery checkpoints. | Completed task implementation. | PR description with checklist evidence. | Required for all merge requests. | `backlog.md` |
| `codeowners-policy` | Template | `.github/CODEOWNERS` | Brain | Active | Defines repo ownership and mandatory review authority. | Repo configuration. | Automated PR assignment and protection. | Required for monorepo governance. | `GEMINI.md` |
| `env-example-template` | Template | `.agents/templates/ENV_EXAMPLE_TEMPLATE` | Brain | Planned | Standard environment variable example file. | Service/module config requirements. | `.env.example`. | Required for projects/modules with runtime config. | `.gitignore`, `ls-rule-secret-management` |
| `onboarding-checklist-template` | Template | `.agents/templates/ONBOARDING_CHECKLIST_TEMPLATE.md` | Brain | Planned | 24h onboarding checklist for replacement Hands. | New contributor/module assignment. | Ready-to-work checklist. | Required when onboarding Hands. | `.LinkStrategy/01_SOP_LINK_STRATEGY.md` |
| `offboarding-checklist-template` | Template | `.agents/templates/OFFBOARDING_CHECKLIST_TEMPLATE.md` | Brain | Planned | 15-minute offboarding and revoke-access checklist. | Freelancer removal or risk event. | Access revocation and evidence trail. | Required when offboarding Hands. | `.LinkStrategy/01_SOP_LINK_STRATEGY.md` |

## Skill Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ls-skill-ui-kit` | Skill | `.agents/skills/ls-skill-ui-kit/` | Brain | Planned | Guides use of the shared UI component library. | Frontend UI task. | UI implementation using shared assets. | Required for frontend projects once created. | `components/ui/README.md`, `.LinkStrategy/02_FULL_SYSTEM_CONFIGURATION.md` |
| `ls-ops` | Skill | `.agents/skills/ls-ops/` | Brain | Planned | Guides infrastructure operations such as CLI, storage, database, and deployment tasks. | Infrastructure task. | Controlled operational execution. | Required for operations work once created. | `.agents/tools/`, `scripts/` |

## Tool Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ls-tool-mcp-bridge` | Tool | `.agents/tools/ls-tool-mcp-bridge/` | Brain | Planned | Planned bridge between AI context and live system data. | Agent query/context. | Real-time data response. | Required for live data inquiry once implemented. | `.LinkStrategy/02_FULL_SYSTEM_CONFIGURATION.md` |
| `ls-tool-auditor-proxy` | Tool | `.agents/tools/ls-tool-auditor-proxy/` | Brain | Planned | Planned control layer for risky AI/Hands commands. | Proposed command/action. | Allow/block decision and audit record. | Required for Action Lane once implemented. | `.LinkStrategy/02_FULL_SYSTEM_CONFIGURATION.md` |
| `ls-tool-dev-sandbox` | Tool | `.agents/tools/ls-tool-dev-sandbox/` | Brain | Planned | Planned Dockerized isolated execution environment. | Project/module source code. | Safe local runtime. | Required for satellite handover once implemented. | `.LinkStrategy/03_HANDOVER_SPEC.md` |

## Script Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `scripts-catalog` | Script | `scripts/README.md` | Brain | Active | Planned catalog for platform automation scripts. | Script user or maintainer. | Script usage guidance. | Required before adding automation scripts. | `README.md` |
| `new-project` | Script | `scripts/new-project.ps1` | Brain | Active | Generates project workspace skeleton. | `client_id`, `project_name`, `project_type`. | `projects/[CLIENT_ID]-[PROJECT_NAME]/`. | Required for consistent project creation. | `README.md`, `backlog.md` |
| `new-module` | Script | `scripts/new-module.ps1` | Brain | Active | Generates module workspace inside a project. | `project_path`, `module_name`, `module_type`. | Module folder with docs/src/tests/logs. | Required for module-based tasking. | `.LinkStrategy/03_HANDOVER_SPEC.md` |
| `verify-gate` | Script | `scripts/verify-gate.ps1` | Brain | Active | Performs local gate checks and creates pass/fail evidence. | Project or module path. | Gate report. | Required before acceptance. | `gate-scorecard-template` |
| `register-asset` | Script | `scripts/register-asset.ps1` | Brain | Planned | Helps register new hardened assets in this index. | Asset metadata. | Updated or draft index entry. | Required after hardening once implemented. | `ASSET_INDEX.md` |

## Component Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `shared-ui-library` | Component | `components/ui/` | Brain | Placeholder | Planned shared UI component library for frontend work. Current README is empty. | Frontend task requirements. | Reusable UI components and patterns. | Required for frontend work once implemented. | `ls-skill-ui-kit`, `.LinkStrategy/02_FULL_SYSTEM_CONFIGURATION.md` |

## Dataset Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `audit-trail-schema` | Dataset | `.agents/datasets/audit-trail.schema.json` | Brain | Planned | Defines local/future ledger audit record schema. | Agent/action event metadata. | Validated audit record shape. | Required before audit automation. | `.LinkStrategy/02_FULL_SYSTEM_CONFIGURATION.md` |
| `knowledge-piece-template` | Dataset | `.agents/templates/KNOWLEDGE_PIECE_TEMPLATE.md` | Brain | Planned | Standard format for reusable knowledge pieces before vector KB ingestion. | Lessons, patterns, anti-patterns. | Knowledge piece document. | Required for knowledge harvesting once created. | `.LinkStrategy/01_SOP_LINK_STRATEGY.md` |

## Project Registry

| Name | Type | Path | Owner | Status | Purpose | Input | Output | Mandatory Usage | Related Docs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `root-blueprint-task` | Project | `docs/blueprints/01_TASK_SPEC.md` | Brain | Draft | Existing task spec for pushing the production engine to GitHub. | Repository setup objective. | Completed infrastructure task spec. | Historical reference only. | `LOGS.md` |
| `demo-base-platform` | Project | `projects/DEMO-BASE-PLATFORM/` | Brain | Active | Reference project proving project factory, templates, logs, and gate verification. | Project factory scripts and templates. | Demo project workspace. | Required for Base Platform V1 validation. | `backlog.md` |

---

## Registration Rules

- Do not create a new asset if an existing asset can be extended safely.
- New assets must use Link Strategy naming: `ls-rule-*`, `ls-workflow-*`, `ls-skill-*`, `ls-tool-*`, or clear template/script names.
- Every new asset must be registered here in the same change that creates it.
- Placeholder assets must not be treated as operational until their status is changed to `Draft` or `Active`.
- `Active` requires enough documentation for another operator or AI Agent to use the asset without hidden context.
