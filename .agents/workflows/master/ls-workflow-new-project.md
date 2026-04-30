---
trigger: "on_demand"
description: "Khởi tạo Brain Project Workspace"
---

# LS-WORKFLOW-NEW-PROJECT

Sử dụng workflow này để tạo trạm điều hành (Brain Project) mới, đảm bảo tính cô lập và đồng bộ quản trị từ Master.

## 1. Hành động (Execution)

Agent không cần đọc file Master. Mọi điều kiện môi trường và bối cảnh sẽ được script tự động xử lý. Thực thi lệnh để tạo Project Workspace ngang hàng với Master (mặc định `--base-path ..`)

```bash
npm run new-project -- --project-name "<NAME>"
```

## 2. Cơ chế hóa cứng (Enforcement)

Script thực hiện các chốt chặn tự động để loại bỏ sai sót thủ công:
- **Environment Guard:** Xác minh sự hiện diện của Master DNA (Rules, Engine).
- **Isolation Guard:** Chặn đứng việc tạo dự án bên trong thư mục Master.
- **DNA Transmission:** Đồng bộ hóa Rules, Workflows, Skills và Engine.
- **Context Injection:** Nhúng mục tiêu chiến lược trực tiếp vào `GEMINI.md` và `README.md`.
- **Registry Update:** Tự động đăng ký dự án vào `active-projects.json`.

## 3. Xác nhận (Verification)

Agent nạp context và xác nhận kết quả thông qua Terminal Output:
1. **System Snapshot:** Đọc bảng trạng thái Master hiển thị lúc bắt đầu lệnh.
2. **Verification Report:** Kiểm tra bảng DoD ở cuối lệnh.

Nếu báo cáo hiển thị `STATUS: SUCCESS`, workflow kết thúc. Agent sẵn sàng di chuyển sang dự án mới để thực hiện điều phối.

---
**Status:** ACTIVE HARDENED WORKFLOW
**Priority:** LEVEL 1
