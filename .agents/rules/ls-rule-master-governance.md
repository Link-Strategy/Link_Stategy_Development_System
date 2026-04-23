---
trigger: always_on
description: Master rule for Brain sovereignty, Spec-First execution, verification gate, hardening, and audit.
---

# LS-RULE-MASTER-GOVERNANCE

Chào Agent, đây là Quy tắc Vận hành Master áp dụng cho toàn bộ workspace này. Bạn bắt buộc phải thực thi các nguyên tắc dưới đây để bảo vệ lợi ích dài hạn của Link Strategy.

## 1. BRAIN SOVEREIGNTY (CHỦ QUYỀN CỦA BRAIN)

- **The Brain:** USER là người quyết định kiến trúc, tiêu chuẩn nghiệm thu và sở hữu tài sản.
- **The Hands:** AI Agent và Freelancer là đơn vị thực thi.
- **Quy tắc:**
    - Tuyệt đối không thay đổi logic lõi, kiến trúc hệ thống hoặc tiêu chuẩn nghiệm thu nếu không có phê duyệt từ Brain.
    - Mọi thay đổi lớn phải được đề xuất qua `02_QA_LOGS.md` trước khi thực hiện.
    - Quyền diễn giải cuối cùng thuộc về Brain.

## 2. SPEC-FIRST (ĐẶC TẢ TRƯỚC, CODE SAU)

- Không bao giờ bắt đầu viết code khi chưa có bản Đặc tả (Spec) đạt chuẩn tại `docs/blueprints/01_TASK_SPEC.md` (hoặc vị trí chỉ định trong project).
- Bản Spec đạt chuẩn phải bám sát **5 Pillars**:
    1. **Strategic Context:** Tại sao phải làm?
    2. **Logic Visualization:** Sơ đồ Mermaid (Flowchart/State).
    3. **Data Schema:** Cấu trúc dữ liệu chi tiết.
    4. **Technical Contract:** API/Interface/Contract.
    5. **Definition of Done (DoD):** Checklist nghiệm thu.

## 3. VERIFICATION-FIRST (KIỂM CHỨNG TRƯỚC BÁO CÁO)

- Không tin vào báo cáo miệng. Chỉ tin vào kết quả có thể kiểm chứng (Tests, Logs, Screenshots, Videos).
- **Gate Scorecard:** Giải ngân/Nghiệm thu dựa trên bảng điểm 100đ:
    - Unit Test (30đ) - Pass 100%, Coverage > 80%.
    - Clean Code (20đ) - Không lỗi Lint/Logic.
    - Documentation (20đ) - README, Video Demo.
    - Hardening Ready (10đ) - Khả năng tái sử dụng.
    - Security & AI Audit (20đ) - Không lỗ hổng.

## 4. HARDENING (HÓA THẠCH TRI THỨC)

- Mọi module/tính năng sau khi hoàn thiện phải được xem xét khả năng "Hardening".
- **Quy trình:** Nhận diện pattern tái sử dụng -> Tổng quát hóa (Abstract) -> Đóng gói thành Asset (Rule/Skill/Tool/Template).
- Chủ động đề xuất hardening sau mỗi Pull Request hoặc Milestone thành công.

## 5. AUDIT & LOGGING (GHI CHÉP BẤT BIẾN)

- Mọi hành động có tác động lớn phải để lại dấu vết.
- Duy trì `LOGS.md` (Done/Block/Next) mỗi phiên làm việc.
- Tuân thủ **Conventional Commits** để lịch sử Git luôn minh bạch.

## 6. BOOTSTRAP ORDER (THỨ TỰ KHỞI ĐỘNG)

Mỗi khi bắt đầu phiên làm việc mới, Agent phải thực hiện:
1. Đọc `GEMINI.md`.
2. Đọc Hiến pháp & Cấu hình tại `.LinkStrategy/`.
3. Quét `ASSET_INDEX.md` để nạp các Skills/Rules hiện có.
4. Đọc `Task Spec` hiện hành.
5. Kiểm tra `LOGS.md` gần nhất để nắm bắt context.

---
**Status:** ACTIVE MASTER RULE
**Priority:** LEVEL 1
