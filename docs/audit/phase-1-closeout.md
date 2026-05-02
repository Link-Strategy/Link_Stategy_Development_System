# Phase 1 Closeout Pack

## Authority

- Development SSOT: `backlog.md`
- Doctrine/constitution: `.LinkStrategy/`
- Runtime registry: `asset-index.json`
- Engine: `.agents/tools/ls-engine/`

## Scope Closed

Phase 1 closes the foundation layer only: project factory, satellite contract, rule sync, verification gate, safe delivery, CI-gated harvest, identity detection, package contract enforcement, and generated JSON asset registry.

The following remain Phase 2+ work: Brain review checklist, payout approval workflow, full SAST/dependency scan, long-term evidence archive, onboarding/offboarding playbooks, health dashboard, decommissioning, and knowledge generalization automation.

## Locked Invariants

- Master owns system DNA, engine, policies and `active-projects.json`.
- Brain Project owns project orchestration, `active-hands.json`, Satellite packaging, sync and harvest.
- Hands/Satellite owns implementation evidence in `01_TASK_SPEC.md`, `02_DECISION_LOGS.md`, `03_LOGS.md`, `src/` and `tests/`.
- `asset-index.json` is the official generated JSON asset registry. The legacy Markdown asset index filename must not be restored.
- Satellite must include valid `asset-index.json`; missing or invalid registry fails `verify-gate`.
- Satellite package scripts must expose only allowed Hands commands and must not expose Brain/Master-only commands.
- `02_DECISION_LOGS.md` and `03_LOGS.md` in Satellite are protected from Brain overwrite during `push-rules`.
- Registry assets must have `id`, `type`, `path`, `purpose`; paths must stay inside the workspace.

## Acceptance Evidence

Run these commands from the repository root before reopening Phase 1 scope:

```bash
npm test
npm run self-test
$legacy = "ASSET" + "_INDEX"; rg "$legacy|$legacy.md" -n .
rg "Master Monorepo \(Brain\)|Brain \(Master\)|Master \(Brain\)" -n README.md GEMINI.md backlog.md .agents .LinkStrategy
```

Expected result:

- `npm test` passes the full LS Engine suite.
- `npm run self-test` passes project creation, gate, sync and harvest checks.
- The legacy asset-index Markdown search has no runtime/doc references except intentional historical changelog entries.
- The terminology search has no ambiguous Master/Brain label in active docs.

## Current Verification

Verified on 2026-05-02:

- `npm test`: PASS, 18/18 tests passed.
- `npm run self-test`: PASS.
- Legacy Markdown asset-index reference search: PASS, no active matches.
- Ambiguous Master/Brain terminology search: PASS, no active matches.

## Closeout Decision

Phase 1 is considered closed when `backlog.md` marks `1.99.0 - Phase 1 Closeout & Acceptance` complete and the acceptance evidence above is current. New development should be planned under Phase 2+ unless it fixes a regression in the closed Phase 1 invariants.
