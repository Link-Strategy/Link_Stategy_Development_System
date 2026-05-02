---
description: "Khởi tạo Brain Project Workspace mới từ Master DNA"
---

# LS-WORKFLOW-NEW-PROJECT

Quy trình này tự động hóa việc khởi tạo một trạm điều phối (Brain Project) mới, đảm bảo tính cô lập và đồng bộ hóa toàn bộ DNA quản trị.

1. **Nạp Ngữ cảnh (Context Loading)**:
   Đọc các file sau để nắm bắt quy tắc và danh mục tài sản:
   - [GEMINI.md](file:///d:/Business%20Analyze/Link_Stategy_Development_System/GEMINI.md)
   - [ASSET_INDEX.md](file:///d:/Business%20Analyze/Link_Stategy_Development_System/ASSET_INDEX.md)

2. **Thực thi Khởi tạo (Execution)**:
   Agent không cần đọc file Master DNA thủ công. Chạy lệnh sau để tạo Project Workspace ngang hàng với Master. Thay thế `<NAME>` bằng tên dự án.

   // turbo
   ```bash
   npm run new-project -- --project-name "<NAME>"
   ```

3. **Kiểm tra Kết quả (Verification)**:
   - Kiểm tra bảng **System Snapshot** tại terminal để xác nhận Master DNA hợp lệ.
   - Kiểm tra bảng **Verification Report (DoD)** ở cuối output. 
   - Nếu `STATUS: SUCCESS`, dự án đã được đăng ký thành công vào `active-projects.json`.

4. **Bàn giao (Handover)**:
   Di chuyển sang thư mục dự án mới vừa tạo để bắt đầu điều phối.

---
**Status:** ACTIVE HARDENED WORKFLOW (Antigravity Optimized)
**Priority:** LEVEL 1

