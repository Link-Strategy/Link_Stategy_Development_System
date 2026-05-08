---
description: "Khởi tạo Brain Project Workspace mới từ Master DNA"
---

# LS-WORKFLOW-NEW-PROJECT

Quy trình này tự động hóa việc khởi tạo một trạm điều phối (Brain Project) mới, đảm bảo tính cô lập và đồng bộ hóa toàn bộ DNA quản trị.

1. **Thực thi Khởi tạo (Execution)**:
   Agent chạy lệnh sau để tạo Project Workspace. Thay thế `<NAME>` bằng tên dự án.

   // turbo
   ```bash
   npm run new-project -- --project-name "<NAME>" [--overwrite-remote] [--update] [--force-local]
   ```

2. **Hướng dẫn Phản ứng (Agent Reaction Guide)**:
   Dựa trên output của script, Agent xử lý như sau:
   - **Nếu báo `Project already exists`:** Dừng lại và hỏi User chọn:
     *   *Clean Init:* Dùng flag `--force-local` để xóa folder cũ và làm mới.
     *   *DNA Sync:* Dùng flag `--update` để chỉ cập nhật DNA vào dự án cũ.
   - **Nếu báo lỗi Remote (isDirtyRemote):** Kiểm tra xem Repo đã có dữ liệu chưa. Nếu có, đề xuất dùng `--overwrite-remote`.

3. **Kiểm tra Kết quả (Verification)**:
   - Kiểm tra bảng **System Snapshot** tại terminal để xác nhận Master DNA hợp lệ.
   - Kiểm tra bảng **Verification Report (DoD)** ở cuối output. 
   - Nếu `STATUS: SUCCESS`, dự án đã được đăng ký thành công vào `active-projects.json`.

4. **Bàn giao (Handover)**:
   Di chuyển sang thư mục dự án mới vừa tạo để bắt đầu điều phối.

---
**Status:** ACTIVE HARDENED WORKFLOW (Antigravity Optimized)
**Priority:** LEVEL 1

