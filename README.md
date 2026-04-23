# Link Strategy Development System

This repository is the Brain-controlled Master Monorepo for the Link Strategy Software Production Engine. It is not a single application repository. Its purpose is to store the operating doctrine, reusable assets, automation scripts, project workspaces, and governance records used to produce software through a repeatable Spec-First delivery loop.

## Repository Role

The Master Monorepo protects Link Strategy's system sovereignty:

- Brain owns architecture, acceptance criteria, reusable assets, and merge decisions.
- Hands/Freelancers execute isolated implementation tasks based on written specs.
- AI Agents must bootstrap from the asset index and governance rules before making changes.
- Delivery is accepted through verification, not verbal reporting.
- Reusable knowledge must be hardened into assets after each delivery cycle.

## Root Structure

| Path | Role |
| --- | --- |
| `.agents/` | AI execution assets: rules, workflows, templates, skills, tools, datasets, and automation context. |
| `.LinkStrategy/` | Founder/Brain governance documents, operating constitution, system configuration, and handover standards. |
| `components/` | Shared production components and reusable implementation assets, including the UI library. |
| `docs/` | Working documentation, blueprints, audit notes, operational references, and project-level records. |
| `projects/` | Client or internal project workspaces generated and governed by the production engine. |
| `scripts/` | Common infrastructure and workflow automation scripts for project creation, gate verification, and asset registration. |
| `ASSET_INDEX.md` | Registry and discovery entry point for reusable rules, skills, tools, templates, and shared assets. |
| `GEMINI.md` | Active execution governance for AI agents operating in this workspace. |
| `LOGS.md` | Workspace-level daily progress and handover log. |
| `backlog.md` | Implementation backlog for building the Base Platform. |

## Operating Documents

Read these files before changing platform structure or delivery rules:

- [.LinkStrategy/00_BLUEPRINT_Link Strategy.md](<.LinkStrategy/00_BLUEPRINT_Link Strategy.md>)
- [.LinkStrategy/01_SOP_LINK_STRATEGY.md](.LinkStrategy/01_SOP_LINK_STRATEGY.md)
- [.LinkStrategy/02_FULL_SYSTEM_CONFIGURATION.md](.LinkStrategy/02_FULL_SYSTEM_CONFIGURATION.md)
- [.LinkStrategy/03_HANDOVER_SPEC.md](.LinkStrategy/03_HANDOVER_SPEC.md)
- [ASSET_INDEX.md](ASSET_INDEX.md)
- [GEMINI.md](GEMINI.md)

## 4-Plane Architecture

| Plane | Purpose | Primary Locations |
| --- | --- | --- |
| Control Plane | Defines rules, workflows, doctrine, and acceptance authority. | `.LinkStrategy/`, `.agents/rules/`, `.agents/workflows/`, `GEMINI.md` |
| Communication Plane | Captures specs, QA decisions, handover notes, and daily progress. | `docs/`, `docs/blueprints/`, `LOGS.md`, project/module logs |
| Execution Plane | Provides reusable skills, tools, scripts, project workspaces, and shared components. | `.agents/skills/`, `.agents/tools/`, `scripts/`, `projects/`, `components/` |
| Audit Plane | Preserves review evidence, gate results, decision logs, and future ledger records. | `docs/audit/`, `.agents/datasets/`, scorecards, gate reports |

## Working Model

The repository follows the Link Strategy hardened loop:

1. Spec-First: every task starts from a written blueprint.
2. Isolation: implementation work is scoped by project/module.
3. Execution Visibility: progress is tracked through commits and logs.
4. Verification Gate: delivery must pass objective checks and scorecard review.
5. Hardening: reusable logic, patterns, and workflows are extracted into assets.

## Quickstart

Current Base Platform automation is still being implemented. Until `scripts/new-project.ps1` and `scripts/new-module.ps1` are available, create work manually with the same target structure.

### Create A Project Workspace

```text
projects/[CLIENT_ID]-[PROJECT_NAME]/
├── docs/
│   └── blueprints/
│       ├── 01_TASK_SPEC.md
│       └── 02_QA_LOGS.md
├── src/
├── tests/
├── LOGS.md
└── README.md
```

Minimum setup steps:

1. Create the project folder under `projects/`.
2. Copy `.agents/templates/01_TASK_SPEC_TEMPLATE.md` to `docs/blueprints/01_TASK_SPEC.md`.
3. Copy `.agents/templates/02_QA_LOGS_TEMPLATE.md` to `docs/blueprints/02_QA_LOGS.md`.
4. Copy `.agents/templates/LOGS_TEMPLATE.md` to `LOGS.md`.
5. Fill the task spec before writing implementation code.

### Create A Module Workspace

```text
projects/[CLIENT_ID]-[PROJECT_NAME]/modules/[MODULE_NAME]/
├── docs/
│   └── blueprints/
├── src/
├── tests/
├── LOGS.md
└── README.md
```

Each module must be scoped small enough for independent implementation, review, and replacement of Hands within 24 hours.

## Current Platform Status

This repo currently contains the base folder structure and initial governance documents. The platform is still being hardened through `backlog.md`; scripts, rules, workflows, scorecards, and project factory automation are being completed incrementally.
