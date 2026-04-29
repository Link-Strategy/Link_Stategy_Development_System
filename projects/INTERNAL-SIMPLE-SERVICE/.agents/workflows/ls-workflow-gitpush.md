---
trigger: "on_demand"
description: "Phase 1 secure delivery workflow for AI Hands Agent"
---

# LS-WORKFLOW-GITPUSH

Quy trình này là đường nộp bài bắt buộc của **AI Hands Agent** trong Satellite. Mục tiêu là tạo PR đã qua Phase 1 Technical Gate, không phải tự nghiệm thu nghiệp vụ thay Brain.

## 1. Preflight Context

Agent phải đọc:

- `GEMINI.md`
- `.agents/rules/*.md`
- `01_TASK_SPEC.md`
- `02_DECISION_LOGS.md`
- `03_LOGS.md`
- `package.json`

Nếu Spec thiếu 5 phần bắt buộc hoặc còn placeholder, dừng và ghi blocker.

## 2. Internal Review Phase 1

Trước khi nộp, Agent tự kiểm:

- Implementation nằm trong `src/`.
- Test thật nằm trong `tests/`.
- `03_LOGS.md` có bằng chứng test.
- `02_DECISION_LOGS.md` có quyết định/giả định vượt Spec.
- Không sửa `.agents/`, `.github/`, `GEMINI.md`.
- `package.json` giữ `verify-gate`, `ls-gitpush` và không expose Brain-only scripts.
- Không có secret hoặc file `.env` thật.

Scorecard 100 điểm và giải ngân không thuộc workflow Phase 1 này.

## 3. Test

Chạy:

```bash
npm test
```

Nếu fail, sửa implementation/test. Không skip hoặc todo test để né gate.

## 4. Verify Gate

Chạy:

```bash
npm run verify-gate -- --project-path .
```

Chỉ khi command này PASS mới được nộp.

## 5. Secure Delivery

Chạy:

```bash
npm run ls-gitpush -- --title "feat: delivery"
```

Tool sẽ:

- chạy lại gate,
- tạo `GATE_REPORT.md`,
- tạo `AGENT_REVIEW_REPORT.md`,
- stage allowlist delivery files,
- push branch,
- tạo PR bằng GitHub CLI.

## 6. Failure Handling

- Governance/package fail: khôi phục contract, không sửa gate.
- Test fail: sửa code hoặc test thật.
- Spec fail: hoàn thiện Spec nếu đủ thông tin; nếu thiếu thông tin cốt lõi, ghi blocker.
- Secret fail: xóa secret, revoke nếu cần, cập nhật `.env.example`.

---
**Status:** ACTIVE HARDENED WORKFLOW  
**Mandatory for:** All Phase 1 Satellite Deliveries
