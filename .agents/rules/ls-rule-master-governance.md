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
- **Gate Scorecard:** Việc nghiệm thu phải tuân thủ nghiêm ngặt **`ls-rule-gate-acceptance`** với điểm số >= 80/100.

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
2. Đọc các Rule Master tại `.agents/rules/` (Governance, Gate, Handover, Commits, Secrets).
3. Quét `ASSET_INDEX.md` để nạp các Skills/Workflows hiện có.
4. Đọc `Task Spec` hiện hành.
5. Kiểm tra `LOGS.md` gần nhất để nắm bắt context.

## 7. NO-MANUAL-PUSH POLICY (CẤM PUSH THỦ CÔNG)

- **Nguyên tắc:** Hands không được phép sử dụng `git push` thủ công để đẩy code trực tiếp lên nhánh chính hoặc tạo PR mà không thông qua sự kiểm soát của Agent.
- **Agent-Led Review:** Mọi đợt nộp bài (Delivery) phải được thực hiện thông qua script `ls-gitpush.ps1`. Agent sẽ thực hiện một "Internal Review" cực kỳ khắt khe:
    *   **Anti-pattern Detection:** Kiểm tra các lỗi thiết kế, mã nguồn lặp lại hoặc vi phạm Clean Code.
    *   **Strict Testing:** Đảm bảo toàn bộ Unit Test và Integration Test mô tả trong Spec đã được thực thi và Pass.
    *   **Security & Rules:** MD5 Hash check cho luật pháp và rà quét Secret.
    *   **Documentation:** Cập nhật nhật ký bàn giao khẩn cấp trong `LOGS.md`.
- **Enforcement:** Mọi PR không chứa bằng chứng (Artifact) từ Agent-Led Review sẽ bị Brain REJECT ngay lập tức mà không cần xem xét code.

---
**Status:** ACTIVE MASTER RULE
**Priority:** LEVEL 1
