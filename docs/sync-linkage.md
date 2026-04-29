# SYNC LINKAGE CONTRACT - MASTER/SATELLITE

This document defines the Phase 1 technical sync contract between the Master
Monorepo (Brain) and Satellite repos (Hands).

## 1. Data Layers

| Layer | Direction | Mode at Satellite |
| :--- | :--- | :--- |
| Governance rules (`.agents/rules`) | Master -> Satellite | Read-only |
| Workflows/templates (`.agents/workflows`, `.agents/templates`) | Master -> Satellite | Read-only |
| Engine tools (`.agents/tools/ls-engine`) | Master -> Satellite | Read-only |
| GitHub gate (`.github/workflows`) | Master -> Satellite | Read-only |
| Source/test/docs (`src`, `tests`, `docs`) | Satellite -> Master | Read-write by Hands |
| Audit logs (`03_LOGS.md`) | Satellite -> Master | Read-write by Hands |

## 2. Rule Push Protocol

Goal: keep every Satellite repo on the same Phase 1 governance engine as Master.

1. Brain updates governance assets in Master.
2. Brain previews sync with:
   `npm run push-rules -- --project-path projects/CLIENT-PROJECT --dry-run`
3. Brain applies sync with:
   `npm run push-rules -- --project-path projects/CLIENT-PROJECT`
4. If pushing directly to the Satellite remote is required:
   `npm run push-rules -- --project-path projects/CLIENT-PROJECT --git-push`

The sync includes `.agents/rules`, `.agents/workflows`, `.agents/templates`,
`.agents/tools/ls-engine`, `.github`, and `GEMINI.md`. For Satellite
`package.json`, sync merges only the required Satellite npm scripts
(`verify-gate`, `ls-gitpush`) and Node engine contract; project dependencies,
metadata, and project-specific test scripts remain owned by Hands. Brain-only
scripts (`new-project`, `new-module`, `push-rules`, `pull-code`,
`init-satellite`, `self-test`, `stress-test`) must stay out of Satellite
`package.json`.

## 3. Code Pull Protocol

Goal: harvest implementation assets after the Satellite has passed the gate.

1. Satellite PR must pass GitHub Verification Gate.
2. Brain previews harvest with:
   `npm run pull-code -- --project-path projects/CLIENT-PROJECT --remote-url <repo-url> --dry-run`
3. Brain harvests with:
   `npm run pull-code -- --project-path projects/CLIENT-PROJECT --remote-url <repo-url>`

`pull-code` clones the Satellite into a temporary directory and copies only
`src`, `tests`, and `docs`. It does not depend on shell pipes, archive tools,
or OS-specific shell scripts.

## 4. Gate Contract

1. Local and CI gates run:
   `npm run verify-gate -- --project-path .`
2. `GATE_REPORT.md` is the source of truth.
3. `Integrity-Hash` is SHA256 over a stable manifest of `relative path + file hash`.
4. CI regenerates the gate report and recomputes integrity on
   `ubuntu-latest`, `windows-latest`, and `macos-latest`.

## 5. Conflict Rule

Master owns governance files. Hands own implementation files. If a Satellite
changes governance assets directly, the verification gate must fail until the
Satellite is resynced from Master.

---
Status: Phase 1 active contract
