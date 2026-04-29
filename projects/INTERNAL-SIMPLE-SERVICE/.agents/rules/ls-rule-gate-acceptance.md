# LS-RULE-GATE-ACCEPTANCE

Chào Agent, đây là bộ quy tắc nghiệm thu và chấm điểm (Gate Scorecard) tối thượng của Link Strategy. Bạn phải dùng bộ quy tắc này để Review mọi Pull Request (PR) hoặc đợt nộp bài của Hands.

## 1. NGUYÊN TẮC "THỬ LỬA" (VERIFICATION-FIRST)

Tuyệt đối không tin vào lời nói. Chỉ tin vào bằng chứng có thể kiểm chứng được trong mã nguồn và `03_LOGS.md`.

## 2. BẢNG ĐIỂM NGHIỆM THU (100-POINT SCORECARD)

Mọi task hoàn thiện phải được chấm điểm dựa trên thang 100đ. Điểm ĐẠT (Pass) là **>= 80/100**.

### A. Chất lượng Kỹ thuật (50đ)
- **Unit Test (30đ):** 
    - Phải có Unit Test cho logic nghiệp vụ. 
    - Coverage > 80% (15đ). 
    - Toàn bộ Test Pass (15đ). Nếu có 1 test Fail = 0đ mục này.
- **Clean Code & Architecture (20đ):** 
    - Không dùng "mẹo" (hacks), không code lặp. 
    - Tuân thủ đúng Design Pattern đã yêu cầu trong Spec.

### B. Bằng chứng & Tài liệu (30đ)
- **Log-First Documentation (20đ):** 
    - `03_LOGS.md` phải có đầy đủ bằng chứng thực thi (Evidence).
    - Có kết quả chạy UAT cho từng kịch bản trong Spec.
- **README & Comments (10đ):** 
    - Cập nhật hướng dẫn vận hành module rõ ràng.

### C. Quản trị & Bảo mật (20đ)
- **Hardening Ready (10đ):** 
    - Chủ động đề xuất ít nhất 1 thành phần để đưa vào kho Hardened Assets.
- **Security & AI Audit (10đ):** 
    - Không có Secret trong code. 
    - Tuân thủ đúng quy tắc Secret Management.

## 3. QUY TRÌNH KIỂM SOÁT CỦA AGENT (INTERNAL REVIEW)

Trước khi trình PR cho Brain, Agent phải chạy script `npm run verify-gate` và tự chấm điểm:
- **Score < 80:** Reject ngay lập tức, yêu cầu Hands sửa lại kèm theo danh sách lỗi.
- **Score >= 80:** Tạo PR, đính kèm báo cáo Scorecard và Evidence vào phần mô tả PR.

---
**Status:** ACTIVE OPERATIONAL RULE
**Priority:** LEVEL 1 (CRITICAL)

