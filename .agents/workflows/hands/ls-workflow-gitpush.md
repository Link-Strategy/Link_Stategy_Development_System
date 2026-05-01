---
trigger: "on_demand"
description: "Phase 1 secure delivery workflow for AI Hands Agent"
---

# LS-WORKFLOW-GITPUSH

Quy trình này là đường nộp bài bắt buộc của **AI Hands Agent** trong Satellite. Mục tiêu là push delivery lên `origin/main` sau khi Phase 1 Technical Gate pass local. Satellite `main` không phải nguồn sạch; Brain chỉ harvest commit đã pass GitHub Actions và vượt qua bài kiểm tra tính toàn vẹn (Integrity check) tại Brain-side.

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
- `03_LOGS.md` có Progress Snapshot mới trước lần push này.
- `02_DECISION_LOGS.md` có quyết định/giả định vượt Spec.
- `01_TASK_SPEC.md` vẫn giữ Task List Tổng làm baseline, không bị tick/sửa chỉ để báo tiến độ.
- Không sửa `.agents/`, `.github/`, `GEMINI.md`. Bất kỳ sự thay đổi nào tại các tệp quản trị này sẽ bị CI chặn đứng (Hard Reject) ngay lập tức.
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

## 5. Progress Snapshot

Trước khi nộp, Agent phải append một block mới vào `03_LOGS.md`:

- `Overall Progress: [0-100]%`
- `Task Status`: copy toàn bộ Task List Tổng từ `01_TASK_SPEC.md` và tick trạng thái hiện tại.
- `Changed Since Last Push`: liệt kê thay đổi chính của lần nộp này.
- `Test Evidence`: ghi kết quả `npm test` và `npm run verify-gate -- --project-path .`.
- `Blockers`: ghi `None` hoặc blocker cụ thể.

Không cập nhật `01_TASK_SPEC.md` để ghi tiến độ. Nếu Task List Tổng cần đổi scope, ghi đề xuất vào `02_DECISION_LOGS.md`.

## 6. Secure Delivery

Chạy:

```bash
npm run ls-gitpush -- --title "feat: delivery"
```

Tool sẽ:

- chạy lại gate,
- tạo `GATE_REPORT.md`,
- stage allowlist delivery files,
- commit thay đổi,
- push trực tiếp lên `origin/main`.

`GATE_REPORT.md` không được stage. GitHub Actions sẽ tạo gate report artifact mới cho commit trên `main`.

## 7. Brain Harvest Rule

Brain chỉ được chạy `npm run pull-code` để harvest các mapping an toàn trong `slicing-profile.json` về Brain Project khi latest commit trên Satellite `main` có GitHub Actions `Link Strategy CI Suite` success. Nếu CI đang pending/fail/missing, `pull-code` phải block.

## 8. Failure Handling

- Governance/package fail: khôi phục contract, không sửa gate.
- Test fail: sửa code hoặc test thật.
- Spec fail: hoàn thiện Spec nếu đủ thông tin; nếu thiếu thông tin cốt lõi, ghi blocker.
- Secret fail: xóa secret, revoke nếu cần, cập nhật `.env.example`.

---
**Status:** ACTIVE HARDENED WORKFLOW  
**Mandatory for:** All Phase 1 Satellite Deliveries
