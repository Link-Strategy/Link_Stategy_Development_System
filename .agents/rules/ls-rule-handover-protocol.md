# LS-RULE-HANDOVER-PROTOCOL

Quy tắc này phân biệt rõ **Phase 1 technical delivery** và **Phase 2/full handover** để Hands Agent không bị nhầm phạm vi.

## 1. Phase 1 Handover Minimum

Trong Phase 1, một Satellite delivery chỉ cần đủ các bằng chứng kỹ thuật sau:

- `01_TASK_SPEC.md` đủ 5 phần: Strategic Context, Logic Visualization, Data Schema, Technical Contract, Definition of Done.
- `02_DECISION_LOGS.md` ghi mọi quyết định/giả định vượt quá Spec.
- `03_LOGS.md` ghi Done/Block/Next và bằng chứng test.
- `src/` chứa implementation.
- `tests/` chứa test thật.
- `package.json` có `test`, `verify-gate`, `ls-gitpush`.
- `npm test` PASS.
- `npm run verify-gate -- --project-path .` PASS.

Đây là điều kiện đủ để Hands Agent nộp PR Phase 1.

## 2. Phase 2 / Full Module Handover

8-pillar handover package là mục tiêu cho module/service hoàn chỉnh hoặc nghiệm thu sâu bởi Brain:

1. Global Service Map.
2. Service Interface Contract.
3. Internal Data Schema.
4. Inter-service Playbook.
5. Local Sandbox Spec.
6. Hardened Asset Rules.
7. Acceptance Scenarios (UAT).
8. Security & Secret Protocol.

Nếu Spec Phase 1 không yêu cầu đủ 8 phần này, Hands Agent không được tự block delivery chỉ vì thiếu 8-pillar package.

## 3. DoD Áp Dụng Cho Hands Agent

Hands Agent phải bám theo DoD trong `01_TASK_SPEC.md`. Nếu DoD yêu cầu coverage, integration test, sandbox hoặc observability thì phải làm. Nếu DoD chưa yêu cầu, các mục đó là đề xuất cải thiện hoặc Phase 2, không phải điều kiện gate Phase 1.

## 4. Quy Trình Khi Thiếu Context

- Thiếu chi tiết nhỏ nhưng không đổi contract: tự quyết và ghi vào `03_LOGS.md`.
- Thiếu chi tiết ảnh hưởng contract: ghi vào `02_DECISION_LOGS.md`.
- Thiếu mục tiêu nghiệp vụ hoặc mâu thuẫn DoD: ghi blocker vào `03_LOGS.md` và dừng.

---
**Status:** ACTIVE OPERATIONAL RULE  
**Priority:** LEVEL 1  
**Scope:** Phase 1 minimum + Phase 2 handover boundary
