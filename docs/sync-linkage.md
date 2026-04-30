# SYNC LINKAGE CONTRACT - 3-LAYER LIFECYCLE

This document defines the Phase 1 technical sync contract between the Master Workspace, Brain Project Workspace, and Hands/Satellite Repositories.

## 1. Lifecycle Layers

| Layer | Role | Source of Truth |
| :--- | :--- | :--- |
| **Master Workspace** | Nguồn gốc của engine, rules, workflows, templates. | Tuyệt đối |
| **Brain Project Workspace** | Repo riêng để Brain quản lý một project thật. Nhận engine từ Master. | Chiến lược Project |
| **Hands Workspace** | Repo thi công cho Hands. Bootstrap bởi Brain. | Execution Lane |

## 2. Layer 1: Master -> Brain Project

Brain dùng Master Workspace để khởi tạo một **Brain Project Workspace** độc lập.

1. **Create Brain Project:**
   `npm run new-project -- --project-name <NAME>`
2. **Result:** Một repo mới nằm ở `../<NAME>` theo mặc định, chứa toàn bộ engine, rules, workflows và templates từ Master, cùng `GEMINI.md` dành cho Brain.

## 3. Layer 2: Brain Project -> Hands Workspace

Brain dùng Brain Project Workspace để khởi tạo các **Hands/Satellite Repos** cho dự án.

1. **Create Hands Workspace:**
   `npm run new-hands -- --project-path <ARCHITECTURE_PATH> --repo-name <REPO>`
2. **Result:** Folder `<ARCHITECTURE_PATH>` được tạo nếu chưa có, bootstrap thành git repo, kết nối GitHub remote, chứa rules/engine và `GEMINI.md` dành cho Satellite. Thông tin được ghi vào `active-hands.json`.

## 4. Layer 3: Hands -> Brain Harvest

Goal: Thu hoạch sản phẩm từ Hands về Brain Project Workspace sau khi CI PASS.

1. **Hands Delivery:**
   Hands nộp bài bằng `npm run ls-gitpush`, push trực tiếp lên `origin/main`.
2. **CI Validation:**
   GitHub Actions `verification-gate` phải PASS cho latest commit trên `main` của Hands.
3. **Brain Harvest:**
Brain chạy từ Brain Project Workspace theo `LS-WORKFLOW-HARVEST-CODE`:
   `npm run pull-code -- --project-path <ARCHITECTURE_PATH>`
4. **Result:** toàn bộ tracked snapshot của Satellite commit đã PASS được copy về đúng path trong Brain Project, không copy `.git/`; `GATE_REPORT.md` artifact được lưu vào `docs/audit/gate-reports/`; `active-hands.json` cập nhật SHA và trạng thái CI.

## 5. Sync Governance

Brain có thể cập nhật rules cho Satellite từ Brain Project Workspace theo `LS-WORKFLOW-PUSH-RULES`:
`npm run push-rules -- --project-path <ARCHITECTURE_PATH> --git-push`

## 6. Conflict Rule

- **Master owns templates/engine:** Mọi thay đổi core phải thực hiện ở Master rồi sync ra các Brain Projects.
- **Brain Project owns Spec/Strategy:** tài liệu chiến lược/spec/roadmap nằm trong `docs/` và do Brain tự tổ chức.
- **Hands owns Implementation:** Code thi công nằm tại Hands Repo và chỉ được harvest khi sạch (CI PASS).

---
**Status:** Phase 1 Active Lifecycle Contract  
**Priority:** Level 1
