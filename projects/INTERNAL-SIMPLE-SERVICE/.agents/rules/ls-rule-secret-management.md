---
trigger: always_on
description: "Chính sách quản lý bí mật và ngăn chặn rò rỉ thông tin nhạy cảm của Link Strategy."
---

# LS-RULE-SECRET-MANAGEMENT

Chào Hands, đây là bộ quy tắc nghiêm ngặt nhất để bảo vệ tài sản số của Link Strategy và khách hàng. Mọi vi phạm quy tắc này sẽ dẫn đến việc đình chỉ task ngay lập tức mà không cần báo trước.

## 1. CẤM COMMIT SECRET (NO SECRETS IN GIT)

- **Tuyệt đối không:** Không bao giờ được commit các giá trị bí mật (API Keys, Passwords, Database URIs, Private Keys) vào Git repository.
- **Phát hiện:** Nếu phát hiện secret đã lỡ commit, phải thực hiện quy trình "Nuke history" (Sử dụng BFG hoặc git filter-repo) và Revoke key đó ngay lập tức.

## 2. GIAO THỨC BIẾN MÔI TRƯỜNG (.ENV PROTOCOL)

- **.gitignore:** File `.env` và các biến thể chứa secret thực tế bắt buộc phải nằm trong `.gitignore`.
- **.env.example:** Chỉ được phép commit file `.env.example` chứa danh sách các khóa (Keys) nhưng giá trị (Values) phải để rỗng hoặc là dữ liệu giả (Dummy data).
- **Local Development:** Mỗi freelancer phải tự tạo file `.env` cá nhân từ `.env.example`.

## 3. PHÂN TÁCH MÔI TRƯỜNG (ENVIRONMENT ISOLATION)

- **Production Access:** Freelancer (Hands) không bao giờ được cấp quyền truy cập trực tiếp vào Production Environment.
- **Mock First:** Khuyến khích sử dụng Mock Server hoặc Sandbox database thay cho database thực tế trong giai đoạn phát triển.

## 4. QUY TRÌNH GATE REVIEW

- Brain sẽ chạy công cụ quét secret (như `trufflehog` hoặc `gitleaks`) trước khi merge bất kỳ PR nào.
- Mọi PR chứa file `.env` sẽ bị **REJECT tự động**.

---
**Status:** ACTIVE SECURITY RULE
**Priority:** LEVEL 1 (CRITICAL)
