---
description: "Đóng gói nhiệm vụ (Packaging) vào folder local"
---

# LS-WORKFLOW-NEW-HAND-FOLDER

Quy trình này hướng dẫn Agent khởi tạo và đóng gói một nhiệm vụ mới để chuẩn bị bàn giao cho Hands.

1. **Khởi tạo Gói bàn giao (Packaging)**:
   Xác định đường dẫn thư mục nhiệm vụ (ví dụ: `src/features/auth`).
   
   // turbo
   ```bash
   npm run new-hand-folder -- --path "[folder-path]"
   ```

2. **Soạn thảo Đặc tả (Drafting)**:
   Sau khi folder được tạo, Agent thực hiện:
   - Soạn thảo nội dung sơ bộ cho `01_TASK_SPEC.md` dựa trên yêu cầu của User.
   - Kiểm tra `slicing-profile.json` để đảm bảo whitelist file chính xác.

3. **Thông báo (Notification)**:
   Xác nhận với User khi gói bàn giao (Task Folder) đã sẵn sàng để review.

---
**Status:** ACTIVE HARDENED WORKFLOW (Antigravity Optimized)
**Target:** AI Agent (Executor)
