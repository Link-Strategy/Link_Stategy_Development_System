---
trigger: always_on
description: Standard SDLC workflow for Link Strategy: Spec-First, Bidding, Execution, Gate, Hardening.
---

# LS-WORKFLOW-DELIVERY-LOOP

Đây là quy trình làm việc tiêu chuẩn (SDLC) bắt buộc cho mọi module/task trong hệ sinh thái Link Strategy.

## GIAI ĐOẠN 1: SPEC-FIRST (BLUEPRINTING)

- **Input:** Yêu cầu từ Brain hoặc roadmap chiến lược.
- **Action:**
    - Khởi tạo `docs/blueprints/01_TASK_SPEC.md`.
    - Vẽ sơ đồ Mermaid cho các logic phức tạp.
    - Định nghĩa rõ Data Schema và API Contract.
    - Brain duyệt Spec trước khi chuyển sang giai đoạn kế tiếp.
- **Output:** Bản Spec đạt chuẩn "No Ambiguity".

## GIAI ĐOẠN 2: BIDDING & ISOLATION (SETTING THE STAGE)

- **Input:** Bản Spec đã duyệt.
- **Action:**
    - Thiết lập Satellite Repo hoặc Feature Branch biệt lập.
    - Nạp context AI chuẩn (`.cursorrules`).
    - Giao việc cho Hands/Freelancer.
- **Output:** Môi trường làm việc an toàn và context đầy đủ.

## GIAI ĐOẠN 3: EXECUTION & VISIBILITY (THE WORK)

- **Input:** Task được giao.
- **Action:**
    - Hands thực hiện code và viết Unit Test song song.
    - Commit hàng ngày (Conventional Commits).
    - Cập nhật `LOGS.md` hằng ngày (Done/Block/Next).
    - AI Agent rà soát commit (Continuous Visibility).
- **Output:** Mã nguồn và nhật ký bàn giao ngầm.

## GIAI ĐOẠN 4: THE GATE (VERIFICATION)

- **Input:** Pull Request và bằng chứng thực thi.
- **Action:**
    - Chạy Automated Tests (Pass 100%, Coverage > 80%).
    - Quét lỗi bảo mật và Tech Debt.
    - Chấm điểm Scorecard (100đ).
- **Output:** Kết quả nghiệm thu (Pass/Partial/Reject) và Audit Trail.

## GIAI ĐOẠY 5: HARDENING & INTEGRATION (MATURATION)

- **Input:** Module đã nghiệm thu.
- **Action:**
    - Brain/Lead rà soát pattern để bóc tách asset.
    - Chuyển hóa logic tái sử dụng thành Rule/Skill/Tool/Template.
    - Nạp Asset vào Master Library và cập nhật `ASSET_INDEX.md`.
    - Merge code vào Main branch.
- **Output:** Asset mới trong thư viện và mã nguồn hoàn thiện.

---
**Status:** ACTIVE WORKFLOW
