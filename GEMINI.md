# LINK STRATEGY MASTER GOVERNANCE (GEMINI.md)

Chào Agent, đây là bản Hiến pháp thực thi cao nhất tại Workspace này. Bạn bắt buộc phải tuân thủ các quy tắc sau:

---

## I. NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)

1. **Rule Sovereignty:** Tuyệt đối tuân thủ các bộ quy tắc thực thi: `ls-rule-master-governance` (Chủ quyền), `ls-rule-gate-acceptance` (Nghiệm thu), `ls-rule-handover-protocol` (Bàn giao).
2. **Strategic Alignment:** Luôn tham chiếu `.LinkStrategy/00_BLUEPRINT_Link Strategy.md` khi task ảnh hưởng đến chiến lược hoặc roadmap. Mọi hardening phải liên kết được với chiến lược này.
3. **Brain Sovereignty:** Luôn coi USER là "The Brain". Mọi thay đổi kiến trúc lớn phải được phê duyệt qua `02_DECISION_LOGS.md` trước khi thực thi.
4. **Spec-First:** Mọi nhiệm vụ phải bắt đầu bằng Đặc tả (Spec) chuẩn 5 Pillars tại `01_TASK_SPEC.md` trước khi viết code.

---

## II. QUY TRÌNH KHỞI ĐỘNG (BOOTSTRAP ORDER)

Để đảm bảo context luôn đầy đủ và không sai sót, Agent **PHẢI** thực hiện bootstrap theo thứ tự:

1. Đọc file `ASSET_INDEX.md` để nắm danh mục tài sản hiện có.
2. Đọc các Rule Master tại `.agents/rules/` (Governance, Gate, Handover, Commits, Secrets).
3. Đọc workflow master: `.agents/workflows/ls-workflow-gitpush.md`.
4. Kiểm tra `03_LOGS.md` gần nhất để nắm tiến độ và các điểm nghẽn.
5. Tuyệt đối không tự viết lại logic nếu đã có Asset tương ứng trong `ASSET_INDEX.md`.

---

## III. ĐẶC TẢ KỸ THUẬT (TECHNICAL STANDARDS)

- **Ngôn ngữ & Framework:** Theo đúng yêu cầu trong Spec. Ưu tiên Clean Code và Modularization.
- **Micro Frontend & UI Kit:** Bắt buộc dùng `ls-skill-ui-kit` từ `components/ui`. Nghiêm cấm Custom CSS tùy tiện.
- **Audit Ledger:** Mọi hành động sửa đổi mã nguồn nhạy cảm phải được log lại.
- **Verification-First:** Mọi task hoàn thành bắt buộc phải vượt qua chốt chặn `npm run verify-gate -- --project-path .` trước khi nộp PR.
- **Rule Integrity:** Nghiêm cấm sửa đổi/xóa bỏ bất kỳ tệp luật nào trong `.agents/rules/`. Mọi hành vi vi phạm tính toàn vẹn của luật pháp sẽ bị Reject PR tự động.
- **Conventional Commits:** Bắt buộc tuân thủ chuẩn commit message để phục vụ bàn giao 24h.

---

## IV. CẬP NHẬT TÀI SẢN (ASSET HARDENING)

1. **Documentation:** Duy trì nhật ký `03_LOGS.md` (Done/Block/Next) mỗi phiên làm việc.
2. **Hardening:** Chủ động đề xuất bóc tách các đoạn code/module có khả năng tái sử dụng để đưa vào kho `.agents/`.
3. **Index Registry:** Mọi asset mới hoặc thay đổi trạng thái phải được cập nhật ngay vào `ASSET_INDEX.md`.

---

**Status:** **ACTIVE MASTER RULES**
**Priority:** LEVEL 1 (OVERRIDE ALL)
