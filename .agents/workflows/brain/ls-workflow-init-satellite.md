---
description: "Kích hoạt hạ tầng Satellite repository từ folder local"
---

# LS-WORKFLOW-INIT-SATELLITE

Quy trình này hướng dẫn Agent kích hoạt hạ tầng (Provisioning) trên Cloud/GitHub khi gói bàn giao đã sẵn sàng.

1. **Chuẩn bị (Preparation)**:
   Xác định đường dẫn thư mục task (`folder-path`) và tên repository mục tiêu (`repo-name`).

2. **Kích hoạt Hạ tầng (Provisioning)**:
   // turbo
   ```bash
   npm run init-satellite -- --path "[folder-path]" --repo-name "[repo-name]"
   ```

3. **Xác nhận kết quả (Verification)**:
   Kiểm tra terminal output để đảm bảo:
   - Repo đã được tạo trên GitHub.
   - Files đã được đẩy lên dựa trên Slicing Profile.
   - Satellite đã được đăng ký vào `active-hands.json`.

4. **Bàn giao (Handover)**:
   Cung cấp URL GitHub cho User và xác nhận trạng thái **READY**.

---
**Status:** ACTIVE HARDENED WORKFLOW (Antigravity Optimized)
**Target:** AI Agent (Executor)
