---
trigger: always_on
description: Master rule for Brain sovereignty, Spec-First execution, Phase 1 technical gate, and audit.
---

# LS-RULE-MASTER-GOVERNANCE

Quy tắc này bảo vệ chủ quyền của Brain, đồng thời cho phép **AI Hands Agent** tự triển khai trong phạm vi Spec mà không cần Brain can thiệp từng bước.

## 1. Brain Sovereignty

- **Brain:** USER quyết định kiến trúc, tiêu chuẩn nghiệm thu cuối và quyền sở hữu tài sản.
- **Hands Agent:** đơn vị thực thi trong Satellite, được tự xử lý implementation nếu không vượt khỏi Spec.
- Hands Agent không được tự đổi:
  - logic/kiến trúc lõi đã được Brain chốt,
  - acceptance standard,
  - governance files,
  - Verification Gate,
  - branch protection,
  - package scripts bắt buộc.

## 2. Spec-First

Không bắt đầu code khi `01_TASK_SPEC.md` chưa đủ 5 phần:

1. **Strategic Context**
2. **Logic Visualization**
3. **Data Schema**
4. **Technical Contract**
5. **Definition of Done**

Nếu Spec thiếu hoặc mâu thuẫn, Hands Agent phải ghi blocker vào `03_LOGS.md` và đề xuất hướng xử lý trong `02_DECISION_LOGS.md`.

## 3. Hands Agent Autonomy

Hands Agent được tự quyết:
- tổ chức code nội bộ trong `src/`,
- thêm/cập nhật test trong `tests/`,
- thêm tài liệu kỹ thuật trong `docs/`,
- thêm dependency hợp lý trong `package.json`,
- refactor để làm rõ implementation.

Hands Agent phải ghi `02_DECISION_LOGS.md` trước khi:
- thay đổi API/data model/validation/error contract,
- thêm framework hoặc dependency có ảnh hưởng kiến trúc,
- suy luận một phần Spec còn thiếu nhưng không mâu thuẫn.

Hands Agent phải dừng và block khi:
- cần đổi governance/engine/workflow,
- cần secret thật hoặc production access,
- Spec thiếu mục tiêu nghiệp vụ cốt lõi,
- cần Brain phê duyệt kiến trúc hoặc acceptance standard mới.

## 4. Phase 1 Verification-First

Phase 1 dùng gate kỹ thuật pass/fail:

- `npm test` phải pass.
- `npm run verify-gate -- --project-path .` phải pass.
- `GATE_REPORT.md` phải có SHA256 `Integrity-Hash`.
- `.agents/`, `.github/`, `GEMINI.md`, engine và package contract phải nguyên vẹn.

Scorecard 100 điểm, giải ngân, hardening đầy đủ và nghiệm thu nghiệp vụ cuối thuộc Brain acceptance hoặc Phase 2+.

## 5. Audit & Logging

- `03_LOGS.md` phải ghi Done/Block/Next và bằng chứng test.
- `02_DECISION_LOGS.md` phải ghi quyết định hoặc giả định ảnh hưởng contract.
- Commit phải theo Conventional Commits.

## 6. Bootstrap Order

Mỗi phiên làm việc:

1. Đọc `GEMINI.md`.
2. Đọc `.agents/rules/*.md`.
3. Đọc `01_TASK_SPEC.md`.
4. Đọc `02_DECISION_LOGS.md`.
5. Đọc `03_LOGS.md`.
6. Kiểm tra `package.json` và scripts Satellite.

## 7. No Manual Push

- Không push trực tiếp lên protected branch.
- Không tạo PR thủ công để né gate.
- Delivery phải qua `npm run ls-gitpush -- --title "feat: delivery"`.

---
**Status:** ACTIVE MASTER RULE  
**Priority:** LEVEL 1  
**Scope:** Phase 1 Technical Execution + Brain Sovereignty
