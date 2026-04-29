# LS-RULE-GATE-ACCEPTANCE

Quy tắc này định nghĩa **Phase 1 Technical Gate** cho Satellite delivery. Trong Phase 1, gate là cơ chế **PASS/FAIL kỹ thuật**, không phải scorecard nghiệm thu hoặc quyết định giải ngân của Brain.

## 1. Verification-First

Không tin báo cáo miệng. Chỉ tin bằng chứng có thể kiểm chứng:
- `npm test`
- `npm run verify-gate -- --project-path .`
- `GATE_REPORT.md`
- `03_LOGS.md`
- PR evidence do `npm run ls-gitpush` tạo

## 2. Điều Kiện PASS Phase 1

Delivery chỉ được nộp khi tất cả điều kiện sau đạt:

- Governance integrity PASS: `.agents/`, `.github/`, `GEMINI.md`, engine `.agents/tools/ls-engine/**/*.mjs` khớp Master.
- `package.json` PASS contract: có `verify-gate`, `ls-gitpush`; không expose Brain-only scripts.
- `01_TASK_SPEC.md` đủ 5 phần bắt buộc và không còn placeholder.
- `src/` tồn tại và chứa implementation theo Spec.
- `tests/` tồn tại, không rỗng, có test thật.
- `npm test` PASS.
- Secret scan cơ bản PASS.
- `GATE_REPORT.md` có `Integrity-Hash` SHA256.

Nếu một điều kiện FAIL, Agent phải sửa trong phạm vi được phép hoặc ghi blocker vào `03_LOGS.md`.

## 3. Điều Không Thuộc Phase 1 Gate

Các mục sau không phải điều kiện bắt buộc để Hands Agent nộp Phase 1, trừ khi Spec yêu cầu rõ:

- Scorecard 100 điểm.
- Quyết định nghiệm thu nghiệp vụ cuối.
- Quyết định giải ngân.
- Full SAST/dependency scan.
- Evidence archive dài hạn.
- Hardening proposal đầy đủ.
- 8-pillar handover package hoàn chỉnh.

Các mục này thuộc Brain acceptance hoặc Phase 2+.

## 4. Quy Trình Internal Review Cho Hands Agent

1. Đọc Spec, logs, rules.
2. Tự rà lại implementation so với Technical Contract và DoD.
3. Chạy `npm test`.
4. Chạy `npm run verify-gate -- --project-path .`.
5. Nếu PASS, nộp bằng `npm run ls-gitpush -- --title "feat: delivery"`.
6. Nếu FAIL, sửa lỗi trong phạm vi được phép; nếu lỗi do thiếu thông tin từ Spec, ghi blocker vào `03_LOGS.md` và quyết định/giả định vào `02_DECISION_LOGS.md`.

## 5. Scorecard Phase 2

Scorecard 100 điểm chỉ dùng khi Brain hoặc Brain Delegate thực hiện nghiệm thu sâu. Hands Agent không được coi scorecard là thay thế cho `verify-gate`, và cũng không được tự quyết định giải ngân.

---
**Status:** ACTIVE PHASE 1 TECHNICAL GATE RULE  
**Priority:** LEVEL 1
