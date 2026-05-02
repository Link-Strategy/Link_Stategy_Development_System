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

## 1. Chủ quyền của Brain (Brain Sovereignty)

> [!IMPORTANT]
> **USER (Brain)** quyết định kiến trúc, tiêu chuẩn nghiệm thu và quyền sở hữu tài sản. Brain là thực thể DUY NHẤT có quyền sửa `01_TASK_SPEC.md`.

- **Hands Agent:** đơn vị thực thi, được tự xử lý implementation nếu không vượt khỏi Spec. 
- **NGHIÊM CẤM:** Hands Agent không được tự đổi logic/kiến trúc lõi, tiêu chuẩn nghiệm thu, hoặc các file quản trị (`.agents/`, `.github/`, `GEMINI.md`).

## 2. Ưu tiên Đặc tả (Spec-First)

> [!WARNING]
> Không bắt đầu code khi `01_TASK_SPEC.md` chưa đủ 5 phần cốt lõi: Strategic Context, Logic Visualization, Data Schema, Technical Contract, và Definition of Done.

Nếu Spec thiếu hoặc mâu thuẫn, Hands Agent phải ghi **blocker** vào `03_LOGS.md` và đề xuất hướng xử lý trong `02_DECISION_LOGS.md`.

## 3. Quyền tự chủ của Hands (Hands Agent Autonomy)

Hands Agent được tự quyết tổ chức code trong `src/`, thêm test trong `tests/`, và refactor nội bộ.

> [!CAUTION]
> Phải ghi lại mọi quyết định vượt ngoài Spec hoặc thay đổi API/Data Model vào `02_DECISION_LOGS.md` trước khi thực hiện.

## 4. Xác minh Kỹ thuật (Verification-First)

Phase 1 sử dụng cổng kỹ thuật tự động:
- `npm test` phải pass.
- `npm run verify-gate -- --project-path .` phải pass.
- `GATE_REPORT.md` phải có SHA256 Integrity-Hash.

## 5. Nhật ký và Kiểm toán (Audit & Logging)

- `03_LOGS.md` phải ghi Done/Block/Next và kèm theo **Progress Snapshot** trước mỗi lần push.
- Commit phải tuân thủ chuẩn **Conventional Commits**.

## 6. Cách thức Xác minh (Verification for Agent)

Để đảm bảo tuân thủ luật này, Agent phải tự kiểm tra:
1. Tôi đã đọc `GEMINI.md` và `01_TASK_SPEC.md` chưa?
2. Spec có đủ 5 phần không?
3. Tôi có đang sửa file nào trong `.agents/` không? (Nếu có -> Dừng lại).
4. Tôi đã chạy `verify-gate` chưa?

---
**Status:** ACTIVE MASTER RULE  
**Priority:** LEVEL 1 (OVERRIDE ALL)
**Ref:** [ls-workflow-gitpush](file:///d:/Business%20Analyze/Link_Stategy_Development_System/.agents/workflows/hands/ls-workflow-gitpush.md)
