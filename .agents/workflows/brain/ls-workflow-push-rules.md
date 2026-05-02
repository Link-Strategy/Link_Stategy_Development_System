---
description: "Đồng bộ hóa quản trị và DNA (Governance/DNA) xuống Satellite"
---

# LS-WORKFLOW-PUSH-RULES

Quy trình này dùng để cập nhật các quy tắc quản trị, công cụ và tài sản Shell từ Brain Workspace xuống các Satellite.

1. **Nạp Ngữ cảnh (Context Loading)**:
   Đọc các file quản trị lõi:
   - [GEMINI.md](file:///d:/Business%20Analyze/Link_Stategy_Development_System/GEMINI.md)
   - [ASSET_INDEX.md](file:///d:/Business%20Analyze/Link_Stategy_Development_System/ASSET_INDEX.md)
   - `active-hands.json` (để xác định danh sách vệ tinh)

2. **Kiểm tra trước khi Sync (Dry Run)**:
   Xác định path của Satellite hoặc dùng `--all`.
   
   // turbo
   ```bash
   npm run push-rules -- --project-path <ARCHITECTURE_PATH> --dry-run
   ```
   Hoặc chạy dry-run cho toàn bộ:
   
   // turbo
   ```bash
   npm run push-rules -- --all --dry-run
   ```

3. **Thực thi Đồng bộ (Execution)**:
   Cập nhật và đẩy trực tiếp lên remote của Satellite.
   
   // turbo
   ```bash
   npm run push-rules -- --project-path <ARCHITECTURE_PATH> --git-push
   ```
   Để đồng bộ hàng loạt (Batch Mode) cho tất cả vệ tinh trong `active-hands.json`:
   
   // turbo
   ```bash
   npm run push-rules -- --all --confirm --git-push
   ```

4. **Xác minh Sau Sync (Verification)**:
   Chạy gate kiểm tra tại Satellite để đảm bảo tính toàn vẹn:
   
   // turbo
   ```bash
   npm run verify-gate -- --project-path <ARCHITECTURE_PATH>
   ```

---
**Status:** ACTIVE HARDENED WORKFLOW (Antigravity Optimized)
**Owner:** Brain
