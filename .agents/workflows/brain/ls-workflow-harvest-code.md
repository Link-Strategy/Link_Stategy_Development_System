---
description: "Thu hoạch code (Harvest) từ Satellite về Brain Project Workspace"
---

# LS-WORKFLOW-HARVEST-CODE

Quy trình này dùng để thu thập code đã được xác thực (verified) từ Satellite về Brain Project sau khi delivery đã vượt qua kỹ thuật gate.

1. **Xác định Đối tượng (Identification)**:
   Xác định `project-path` của Satellite (ví dụ: `src/features/login`). Kiểm tra trạng thái GitHub Actions của commit mới nhất trên Satellite.

2. **Chạy Thử (Dry Run)**:
   Xác minh các mapping an toàn từ Satellite về Brain Project.
   
   // turbo
   ```bash
   npm run pull-code -- --project-path <ARCHITECTURE_PATH> --dry-run
   ```

3. **Thu hoạch (Harvest)**:
   Thực thi thu hoạch code và đồng bộ registry.
   
   // turbo
   ```bash
   npm run pull-code -- --project-path <ARCHITECTURE_PATH>
   ```
   Lệnh này tự động thực hiện Verify Gate (Brain-side) để đảm bảo tính an toàn.

4. **Kiểm tra sau Harvest (Review)**:
   - Kiểm tra diff tại Brain Project Workspace.
   - Tổng hợp quyết định, blocker và bài học từ `02_DECISION_LOGS.md` và `03_LOGS.md` của Hands.
   - Lưu trữ `GATE_REPORT.md` artifact vào thư mục `docs/audit/`.

---
**Status:** ACTIVE HARDENED WORKFLOW (Antigravity Optimized)
**Owner:** Brain
