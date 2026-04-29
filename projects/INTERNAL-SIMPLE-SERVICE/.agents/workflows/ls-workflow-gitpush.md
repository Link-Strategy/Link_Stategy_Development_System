---
trigger: "on_demand"
description: "Quy trình bàn giao và nộp bài an toàn (Agent-led Secure Delivery)"
---

# LS-WORKFLOW-GITPUSH (QUY TRÌNH BÀN GIAO)

Chào Hands, đây là quy trình **BẮT BUỘC TỐI THƯỢNG**. Mọi hành vi nộp bài không đi qua Agent sẽ bị REJECT tự động.

## BƯỚC 1: AGENT-LED INTERNAL REVIEW (KHẮT KHE)
### 1. Agent-led Internal Review (Mandatory)
- Agent thực hiện rà soát mã nguồn dựa trên các bộ quy tắc:
    - **`ls-rule-master-governance`**: Kiểm tra tính chủ quyền và Spec-First.
    - **`ls-rule-handover-protocol`**: Kiểm tra tính đầy đủ của hồ sơ 8 phần và DoD.
    - **`ls-rule-gate-acceptance`**: Chạy chấm điểm Scorecard (Yêu cầu >= 80/100).
    - **`ls-rule-conventional-commits`**: Kiểm tra lịch sử commit.
- Nếu không vượt qua, Agent phải Reject và yêu cầu Hands sửa đổi ngay tại Local.
*   **Hard-coded Secrets:** Tuyệt đối không có API Keys, Passwords trong code.
*   **Dry Principle:** Phát hiện mã nguồn lặp lại > 3 lần.
*   **Rule Integrity:** Kiểm tra MD5 của bộ luật. Mọi sai lệch phải được báo cáo.
*   **Naming Convention:** Check chuẩn CamelCase cho biến và PascalCase cho class.

## BƯỚC 2: CẬP NHẬT TIẾN ĐỘ TỰ ĐỘNG (PROGRESS UPDATE)
Agent tự động cập nhật nhật ký vào `LOGS.md` dự án:
*   Đánh dấu `[x]` các task đã hoàn thành.
*   Ghi chú các điểm nghẽn (Blockers) nếu có.

## BƯỚC 3: THỰC THI KIỂM THỬ (STRICT TESTING)
*   **Yêu cầu:** Pass 100% test cases. Không có ngoại lệ "skip" hay "todo" trong tests.

## BƯỚC 4: THỰC THI NỘP BÀI (TURBO DELIVERY)
// turbo
*   **Lệnh:** `.\.agents\skills\ls-skill-engine-ops\scripts\ls-gitpush.ps1`
*   **Chốt chặn:** Nếu không có `AGENT_REVIEW_REPORT.md`, GitHub Action sẽ **REJECT** tự động.

---
**Status:** ACTIVE HARDENED WORKFLOW
**Priority:** LEVEL 1 (OVERRIDE ALL)

---
**Status:** **ACTIVE WORKFLOW**
**Mandatory for:** All Satellite Operations
