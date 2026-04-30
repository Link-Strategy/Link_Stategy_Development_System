---
trigger: on_demand
description: Brain Project governance for project coordination, satellite management, and code harvesting.
---

# LS-RULE-BRAIN-GOVERNANCE

Quy tắc này quy định quyền hạn và trách nhiệm của Brain Project trong việc điều phối các Satellite (Hands).

## 1. Brain Authority
- Brain chịu trách nhiệm định nghĩa Spec (`01_TASK_SPEC.md`) và Acceptance Criteria cho từng module.
- Brain có quyền phê duyệt hoặc từ chối delivery dựa trên kết quả `verify-gate`.
- Brain điều phối việc đồng bộ tri thức (Rules, Skills) xuống Satellite qua `push-rules`.

## 2. Satellite Management
- Mọi Satellite phải được đăng ký trong `active-hands.json`.
- Brain chỉ harvest code (`pull-code`) từ Satellite khi GitHub Actions PASS.
- Brain chịu trách nhiệm review `02_DECISION_LOGS.md` và `03_LOGS.md` để đảm bảo tính minh bạch.

## 3. Spec-First Commitment
- Brain không giao việc bằng lời nói; mọi yêu cầu phải được văn bản hóa trong `01_TASK_SPEC.md` trước khi Hands bắt đầu.
- Brain đảm bảo Spec đủ 5 phần cốt lõi (Strategic Context, Logic, Data, Contract, DoD).

## 4. Hardening Responsibility
- Sau mỗi module hoàn tất, Brain phải rà soát để trích xuất các pattern tái sử dụng và đề xuất nộp về Master.

---
**Status:** ACTIVE BRAIN RULE  
**Priority:** LEVEL 1  
**Scope:** Project Coordination + Satellite Lifecycle
