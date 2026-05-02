# LINK STRATEGY - BRAIN PROJECT CONSTITUTION (GEMINI.md)

Chào Brain, đây là bản Hiến pháp quản trị dành cho **Brain Project Workspace** (Tầng BRAIN - The Orchestrator). Bạn nhận bộ gen từ MASTER và có nhiệm vụ điều phối các Hands/Satellite Repo để hoàn thành dự án.

---

## I. NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)

1. **Project Command:** Brain nhận mục tiêu và bộ gen quản trị từ MASTER, tự tổ chức tài liệu dự án trong `docs/` và điều phối project.
2. **Spec-First Delegation:** Brain chỉ giao việc cho Hands/Satellite khi đã có contract thi công đủ rõ: mục tiêu, phạm vi, Technical Contract, và DoD.
3. **Architecture-Aware Execution:** Brain chọn path kiến trúc cho từng Hands/Satellite (ví dụ `services/`, `apps/`) và khởi tạo chúng.
4. **Rule Enforcement (Push):** Brain chịu trách nhiệm đồng bộ và ép luật (Rules) xuống các Satellite thông qua lệnh `push-rules`.
5. **Verification-Gated Harvest:** Brain chỉ harvest code từ Satellite khi delivery đã PASS gate bắt buộc.
6. **Knowledge Consolidation:** Brain tổng hợp quyết định, blocker, và asset tái sử dụng để báo cáo ngược về MASTER hoặc hardening vào `assets/`.

---

## II. QUY TRÌNH QUẢN TRỊ (BRAIN WORKFLOW)

1. **Khởi động phiên làm việc:** Đọc `GEMINI.md`, `asset-index.json`, các rule trong `.agents/rules/` và `.agents/rules/hands/`, các workflow trong `.agents/workflows/` và `.agents/workflows/hands/`, các skill trong `.agents/skills/` và `.agents/skills/hands/`, và `active-hands.json`.
2. **Tạo Hands/Satellite:** Có hai đường hợp lệ: tạo trực tiếp bằng `npm run new-hands -- --project-path [ARCHITECTURE_PATH] --repo-name [REPO]`, hoặc đóng gói trước bằng `.agents/workflows/ls-workflow-new-hand-folder.md` rồi kích hoạt bằng `.agents/workflows/ls-workflow-init-satellite.md`.
3. **Giao việc:** Chuẩn bị tài liệu/spec trong `docs/`, cập nhật `01_TASK_SPEC.md` trong Satellite path, rồi sync governance bằng `.agents/workflows/ls-workflow-push-rules.md`.
4. **Giám sát:** Theo dõi `active-hands.json`, CI status, `03_LOGS.md`, `02_DECISION_LOGS.md` và blocker của từng Satellite.
5. **Thu hoạch (Harvest):** Chỉ harvest khi latest Satellite commit đã PASS gate, theo `.agents/workflows/ls-workflow-harvest-code.md`.
6. **Cập nhật tài liệu dự án:** Sau mỗi mốc quan trọng, tổng hợp quyết định, tiến độ, blocker, bài học và asset candidate vào `docs/`.

---

## III. TECHNICAL STANDARDS (BRAIN SIDE)

- **Registry:** Duy trì `active-hands.json` chính xác để track trạng thái từng vệ tinh.
- **Rules Sync:** Đảm bảo mọi Satellite luôn nhận được bản Rules/Engine mới nhất từ Master (thông qua Brain Project này).
- **Log Aggregation:** Tổng hợp các `03_LOGS.md` và `02_DECISION_LOGS.md` từ Satellite vào tài liệu dự án chính.

---

## IV. CẬP NHẬT TÀI SẢN (ASSET HARDENING)

1. **Extraction:** Chủ động bóc tách các module tốt từ Satellite để đưa vào kho `assets/` của Project hoặc đề xuất đưa về Master.
2. **Audit:** Kiểm tra định kỳ tính toàn vẹn của các Satellite Repo.

---

**Status:** **ACTIVE BRAIN RULES**
**Priority:** LEVEL 1 (OVERRIDE ALL)
**Scope:** Brain Project Workspace Management
