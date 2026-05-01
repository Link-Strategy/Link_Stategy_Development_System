---
trigger: "on_demand"
description: "Agent instruction for provisioning a Satellite repository from a local folder"
---

# LS-WORKFLOW-INIT-SATELLITE (AGENT INSTRUCTION)

Workflow này hướng dẫn **Agent** cách kích hoạt hạ tầng (Provisioning) khi User phê duyệt gói bàn giao.

## 1. Kích hoạt Hạ tầng (Provisioning)
Khi User yêu cầu kích hoạt vệ tinh (ví dụ: "Kích hoạt repo cho task Login"), Agent phải:
1. Xác định đường dẫn folder task và tên repo mục tiêu.
2. Sử dụng lệnh `run_command` để thực hiện:
   ```bash
   npm run init-satellite -- --path "[folder-path]" --repo-name "[repo-name]"
   ```
3. Kiểm tra log để xác nhận:
   - Repo đã được tạo trên GitHub.
   - Selective Push đã hoàn tất dựa trên Profile.
   - Satellite đã được đăng ký vào `active-hands.json`.

## 2. Bàn giao & Thông báo
Sau khi kích hoạt thành công, Agent phải:
1. Cung cấp URL GitHub của Satellite cho User.
2. Xác nhận trạng thái "READY" của vệ tinh.
3. Hướng dẫn User (nếu cần) cách gửi link này cho Hands/Freelancer.

---
**Status:** ACTIVE AGENT WORKFLOW
**Target:** AI Agent (Executor)
