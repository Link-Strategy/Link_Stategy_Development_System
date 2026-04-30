---
trigger: always_on
description: Master rule for Brain sovereignty, Spec-First execution, Phase 1 technical gate, and audit.
---

# LS-RULE-MASTER-GOVERNANCE

Quy tắc này bảo vệ chủ quyền của Master/Brain trong hệ sinh thái 3 tầng (Master-Brain-Hands), đồng thời cho phép **AI Hands Agent** tự triển khai trong phạm vi Spec mà không cần Brain can thiệp từng bước.

## 0. Phân cấp Chủ quyền (Sovereignty Hierarchy)

1. **MASTER (The Root):** Nắm giữ DNA, Engine và Governance Rules chuẩn. Có quyền tối cao.
2. **BRAIN (Orchestrator):** Trạm điều phối dự án. Nhận DNA từ Master, quản lý Satellite (Hands) qua `active-hands.json` và `push-rules`.
3. **HANDS (Executor):** Đơn vị thi công. Nhận DNA và Spec từ Brain, thực thi bài làm và nộp qua Verification Gate.

## 1. Brain Sovereignty

- **Brain:** USER quyết định kiến trúc, tiêu chuẩn nghiệm thu cuối và quyền sở hữu tài sản. Brain là thực thể duy nhất có quyền sửa `01_TASK_SPEC.md`.
- **Hands Agent:** đơn vị thực thi trong Satellite, được tự xử lý implementation nếu không vượt khỏi Spec. Hands KHÔNG ĐƯỢC sửa `01_TASK_SPEC.md`.
- Hands Agent không được tự đổi:
  - logic/kiến trúc lõi đã được Brain chốt,
  - acceptance standard,
  - governance files,
  - Verification Gate,
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

## 5. Source Of Truth

- Brain Project là nguồn sạch sau harvest.
- Satellite `main` là execution lane của Hands, không phải trusted source tự thân.
- Hands được push delivery lên Satellite `main` chỉ thông qua `npm run ls-gitpush`.
- Brain chỉ được harvest tracked snapshot từ latest Satellite `main` commit khi GitHub Actions `verification-gate` của commit đó PASS; không harvest `.git/` hoặc file local/untracked.

## 6. Audit & Logging

- `01_TASK_SPEC.md` là baseline contract và Task List Tổng; không dùng làm progress log.
- `03_LOGS.md` phải ghi Done/Block/Next, bằng chứng test và Progress Snapshot trước mỗi lần `ls-gitpush`.
- Progress Snapshot phải copy Task List Tổng từ `01_TASK_SPEC.md` và cập nhật trạng thái thực tế.
- `02_DECISION_LOGS.md` phải ghi quyết định hoặc giả định ảnh hưởng contract.
- Nếu Task List Tổng cần đổi scope, ghi đề xuất vào `02_DECISION_LOGS.md`; Brain mới cập nhật `01_TASK_SPEC.md` khi chấp thuận.
- Commit phải theo Conventional Commits.

## 7. Bootstrap Order

Mỗi phiên làm việc:

1. Đọc `GEMINI.md`.
2. Đọc `ASSET_INDEX.md`.
3. Đọc `.agents/rules/*.md`.
4. Đọc `01_TASK_SPEC.md`.
5. Đọc `02_DECISION_LOGS.md`.
6. Đọc `03_LOGS.md`.
7. Kiểm tra `package.json` và scripts Satellite.

## 8. Tool-Only Push

- Không push thủ công bằng Git/VS Code để né gate.
- Không tạo PR thủ công để giả lập evidence.
- Delivery phải qua `npm run ls-gitpush -- --title "feat: delivery"`.

---
**Status:** ACTIVE MASTER RULE  
**Priority:** LEVEL 1  
**Scope:** Phase 1 Technical Execution + Brain Sovereignty
