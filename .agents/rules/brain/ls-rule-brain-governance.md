---
trigger: on_demand
description: Brain Project governance for project coordination, satellite management, and code harvesting.
---

# LS-RULE-BRAIN-GOVERNANCE

Quy tắc này quy định quyền hạn và trách nhiệm của Brain Project trong việc điều phối các Satellite (Hands).

## 1. Quyền hạn của Brain (Brain Authority)

> [!IMPORTANT]
> Brain chịu trách nhiệm định nghĩa Spec (`01_TASK_SPEC.md`) và Acceptance Criteria. Tuyệt đối không giao việc bằng lời nói; mọi yêu cầu phải được văn bản hóa.

- Brain có quyền phê duyệt hoặc từ chối delivery dựa trên kết quả `verify-gate`.
- Brain điều phối việc đồng bộ tri thức (Rules, Skills) xuống Satellite qua [ls-workflow-push-rules](file:///d:/Business%20Analyze/Link_Stategy_Development_System/.agents/workflows/brain/ls-workflow-push-rules.md).

## 2. Quản lý Vệ tinh (Satellite Management)

> [!WARNING]
> Chỉ harvest code (`pull-code`) từ Satellite khi GitHub Actions PASS. Không harvest theo lời báo miệng.

- Mọi Satellite phải được đăng ký trong `active-hands.json`.
- Brain chịu trách nhiệm review `02_DECISION_LOGS.md` và `03_LOGS.md` để đảm bảo tính minh bạch trước khi tích hợp code.

## 3. Trách nhiệm Hóa cứng (Hardening Responsibility)

> [!TIP]
> Sau mỗi module hoàn tất, Brain phải rà soát để trích xuất các pattern tái sử dụng và đề xuất nộp về Master để làm giàu DNA hệ thống.

## 4. Cách thức Xác minh (Verification for Agent)

Agent đóng vai trò Brain phải tự kiểm tra:
1. `01_TASK_SPEC.md` đã đầy đủ 5 phần chưa?
2. `active-hands.json` đã có thông tin Satellite chưa?
3. Trước khi chạy `pull-code`, CI của Satellite có đang xanh (PASS) không?
4. Tôi đã kiểm tra `02_DECISION_LOGS.md` của Hands chưa?

---
**Status:** ACTIVE BRAIN RULE  
**Priority:** LEVEL 1  
**Scope:** Project Coordination + Satellite Lifecycle
