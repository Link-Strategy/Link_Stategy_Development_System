---
trigger: "on_demand"
description: "Agent instruction for packaging a feature task into a local folder"
---

# LS-WORKFLOW-NEW-HAND-FOLDER (AGENT INSTRUCTION)

Workflow này hướng dẫn **Agent** cách đóng gói một nhiệm vụ (Packaging) khi nhận được yêu cầu từ User.

## 1. Khởi tạo Gói bàn giao (Packaging)
Khi User yêu cầu tạo một Hand/Folder mới (ví dụ: "Tạo folder cho task Login"), Agent phải:
1. Xác định đường dẫn mục tiêu (ví dụ: `src/features/login`).
2. Sử dụng lệnh `run_command` để thực hiện:
   ```bash
   npm run new-hand-folder -- --path "src/features/login"
   ```
3. Xác nhận 4 file hộ chiếu đã được tạo thành công trong folder.

## 2. Soạn thảo Đặc tả (Drafting)
Sau khi khởi tạo, Agent **KHÔNG DỪNG LẠI**, mà phải tiếp tục:
1. Đọc yêu cầu từ User để soạn thảo nội dung sơ bộ cho `01_TASK_SPEC.md`.
2. Review lại `slicing-profile.json` để đảm bảo các Shell Assets cần thiết đã được đưa vào whitelist.
3. Thông báo cho User khi gói bàn giao đã sẵn sàng để User review hoặc phê duyệt.

---
**Status:** ACTIVE AGENT WORKFLOW
**Target:** AI Agent (Executor)
