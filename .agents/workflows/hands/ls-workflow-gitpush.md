---
description: "Quy trình nộp bài (Secure Delivery) cho AI Hands Agent"
---

# LS-WORKFLOW-GITPUSH

Quy trình này là đường nộp bài bắt buộc của **AI Hands Agent** trong Satellite. Mục tiêu là push delivery lên `origin/main` sau khi Phase 1 Technical Gate pass local.

1. **Nạp Ngữ cảnh (Context Loading)**:
   Đọc các file sau để xác định giới hạn thi công và tiêu chuẩn nghiệm thu:
   - [GEMINI.md](file:///d:/Business%20Analyze/Link_Stategy_Development_System/GEMINI.md)
   - `.agents/rules/*.md`
   - [01_TASK_SPEC.md](file:///d:/Business%20Analyze/Link_Stategy_Development_System/01_TASK_SPEC.md)
   - [02_DECISION_LOGS.md](file:///d:/Business%20Analyze/Link_Stategy_Development_System/02_DECISION_LOGS.md)
   - [03_LOGS.md](file:///d:/Business%20Analyze/Link_Stategy_Development_System/03_LOGS.md)

2. **Kiểm tra Kỹ thuật (Technical Testing)**:
   // turbo
   ```bash
   npm test
   ```
   Nếu fail, sửa code/test trước khi tiếp tục. Không skip hoặc todo test để né gate.

3. **Xác minh Cổng (Verify Gate)**:
   // turbo
   ```bash
   npm run verify-gate -- --project-path .
   ```
   Lệnh này phải PASS để đảm bảo tính toàn vẹn của DNA quản trị (không sửa `.agents/`, `.github/`, `GEMINI.md`).

4. **Cập nhật Nhật ký (Progress Snapshot)**:
   Append một block mới vào `03_LOGS.md` bao gồm: Overall Progress, Task Status (copy từ Spec), Changed Since Last Push, và Test Evidence.

5. **Nộp bài (Secure Delivery)**:
   // turbo
   ```bash
   npm run ls-gitpush -- --title "feat: delivery"
   ```
   Tool sẽ tự động chạy lại gate, tạo `GATE_REPORT.md`, stage file, commit và push trực tiếp lên `origin/main`.

---
**Status:** ACTIVE HARDENED WORKFLOW (Antigravity Optimized)
**Mandatory for:** All Phase 1 Satellite Deliveries
