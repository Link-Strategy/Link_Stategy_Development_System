# BRANCH PROTECTION CHECKLIST (BRAIN DELEGATE)

Tài liệu này dùng để cấu hình GitHub Branch Protection nhằm bảo vệ tuyệt đối "Brain Sovereignty" và ngăn chặn code không đạt chuẩn lọt vào `main`.

## 1. Cấu hình Branch Protection (GitHub Settings)
- [ ] **Require a pull request before merging:**
    - [ ] Checked: `Require approvals` (Số lượng: ít nhất 1).
    - [ ] Checked: `Dismiss stale pull request approvals when new commits are pushed`.
    - [ ] Checked: `Require review from Code Owners`.
- [ ] **Require status checks to pass before merging:**
    - [ ] Checked: `Require branches to be up to date before merging`.
    - [ ] List: Thêm `verification-gate` (Nếu dùng GitHub Actions) hoặc check thủ công.
- [ ] **Require conversation resolution before merging:**
    - [ ] Checked: Đảm bảo mọi thảo luận trên PR đều được giải quyết.
- [ ] **Restrict pushes:**
    - [ ] Checked: Chỉ cho phép Brain/Brain Delegate được merge hoặc push trực tiếp nếu cần.
- [ ] **Lock branch:**
    - [ ] Không checked (Trừ khi dự án đang trong giai đoạn đóng băng).

## 2. Cấu hình Repository
- [ ] **CODEOWNERS:** Đã cập nhật file `.github/CODEOWNERS` trỏ đúng vào Brain account.
- [ ] **PR Template:** Đã tồn tại `.github/pull_request_template.md`.
- [ ] **Issue Templates:** Đã có template cho Task Spec.

## 3. Kiểm soát quyền lực (Permissions)
- [ ] **Hands/Freelancers:** Chỉ có quyền `Read` hoặc `Write` (để tạo branch), KHÔNG CÓ quyền `Maintainer` hoặc `Admin`.
- [ ] **Automated Bots:** Phải được cấu hình qua GitHub App với quyền hạn tối thiểu.

## 4. Audit & Verification
- [ ] Tất cả PR merge vào `main` đều phải có file `01_TASK_SPEC.md` đi kèm.
- [ ] Scorecard nghiệm thu phải đạt >= 80 điểm.

---
**Status:** ENFORCED TEMPLATE
**Owner:** Brain Delegate
