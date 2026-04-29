# BRANCH PROTECTION CHECKLIST (BRAIN DELEGATE)

Tai lieu nay dung de cau hinh GitHub Branch Protection nham bao ve "Brain Sovereignty" va ngan chan code khong dat chuan lot vao `main`.

## 1. Branch Protection
- [ ] Require a pull request before merging.
- [ ] Require at least 1 approval.
- [ ] Dismiss stale pull request approvals when new commits are pushed.
- [ ] Require review from Code Owners.
- [ ] Require status checks to pass before merging.
- [ ] Require branches to be up to date before merging.
- [ ] Required check: `verification-gate (ubuntu-latest)` from `.github/workflows/verify-gate.yml`.
- [ ] Required check: `verification-gate (windows-latest)` from `.github/workflows/verify-gate.yml`.
- [ ] Required check: `verification-gate (macos-latest)` from `.github/workflows/verify-gate.yml`.
- [ ] Required check: `block-illegal-changes` from `.github/workflows/rules-protection.yml`.
- [ ] Do not merge if the GitHub Verification Gate is red, skipped, or missing.
- [ ] Require conversation resolution before merging.
- [ ] Restrict direct pushes to Brain or Brain Delegate only.

## 2. Repository Setup
- [ ] `.github/CODEOWNERS` points to the correct Brain account.
- [ ] `.github/pull_request_template.md` exists.
- [ ] Task spec template exists for project onboarding.

## 3. Permissions
- [ ] Hands/Freelancers only have `Read` or `Write` access.
- [ ] Hands/Freelancers do not have `Maintain` or `Admin`.
- [ ] Bots use least-privilege permissions.

## 4. Audit And Verification
- [ ] Every PR into `main` includes `01_TASK_SPEC.md` or an explicit link to it.
- [ ] `verify-gate` passes before merge.

---
**Status:** ENFORCED TEMPLATE
**Owner:** Brain Delegate
