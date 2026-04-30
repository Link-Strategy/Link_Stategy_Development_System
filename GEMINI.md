# LINK STRATEGY - MASTER CONSTITUTION (GEMINI.md)

Chào Agent, đây là bản Hiến pháp thực thi cao nhất tại Workspace này (Tầng MASTER - The Root). Bạn bắt buộc phải tuân thủ các quy tắc sau:

---

## I. NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)

1. **Rule Sovereignty:** Master nắm giữ chủ quyền tối cao đối với bộ gen hệ thống (Rules, Engine, Workflows). Mọi thay đổi tại Master sẽ được truyền xuống các Brain Project.
2. **Strategic Alignment:** Luôn tham chiếu `.LinkStrategy/00_BLUEPRINT_Link Strategy.md` khi task ảnh hưởng đến chiến lược hoặc roadmap. Mọi hardening phải liên kết được với chiến lược này.
3. **Master Sovereignty:** Master chịu trách nhiệm tạo ra các Brain Project (Tầng 2) và duy trì tính toàn vẹn của nền tảng.
4. **Project Orchestration:** Master điều phối các Brain Project thông qua `active-projects.json`. Việc thi công thực tế sẽ do Brain Project giao cho Hands.

---

## II. QUY TRÌNH KHỞI ĐỘNG (BOOTSTRAP ORDER)

Để đảm bảo context luôn đầy đủ và không sai sót, Agent **PHẢI** thực hiện bootstrap theo thứ tự:

1. Đọc file `ASSET_INDEX.md` để nắm danh mục tài sản hiện có.
2. Đọc các Rule Master tại `.agents/rules/` và các phôi tại `brain/`, `hands/`.
3. Đọc các Workflow tại `.agents/workflows/master/`, `brain/`, `hands/`.
4. Đọc các Skill tại `.agents/skills/brain/`, `hands/`.
4. Kiểm tra tài liệu liên quan trong `docs/` và registry trước khi thay đổi cấu trúc hoặc workflow.
5. Tuyệt đối không tự viết lại logic nếu đã có Asset tương ứng trong `ASSET_INDEX.md`.

---

## III. ĐẶC TẢ KỸ THUẬT (TECHNICAL STANDARDS)

- **Ngôn ngữ & Framework:** Theo đúng yêu cầu trong Spec. Ưu tiên Clean Code và Modularization.
- **Micro Frontend & UI Kit:** Bắt buộc dùng `ls-skill-ui-kit` từ `components/ui`. Nghiêm cấm Custom CSS tùy tiện.
- **Audit Ledger:** Mọi hành động sửa đổi mã nguồn nhạy cảm phải được log lại.
- **Verification-First:** Mọi task Hands/Satellite hoàn thành bắt buộc phải vượt qua chốt chặn `npm run verify-gate -- --project-path .` trước khi nộp bài.
- **Rule Integrity:** Nghiêm cấm sửa đổi/xóa bỏ bất kỳ tệp luật nào trong `.agents/rules/`. Mọi hành vi vi phạm tính toàn vẹn của luật pháp sẽ bị Reject PR tự động.
- **Conventional Commits:** Bắt buộc tuân thủ chuẩn commit message để phục vụ bàn giao 24h.

---

## IV. CẬP NHẬT TÀI SẢN (ASSET HARDENING)

1. **Documentation:** Duy trì tài liệu vận hành trong `docs/` hoặc tài liệu cụ thể của project/Satellite; root workspace không dùng `03_LOGS.md`.
2. **Hardening:** Chủ động đề xuất bóc tách các đoạn code/module có khả năng tái sử dụng để đưa vào kho `.agents/`.
3. **Index Registry:** Mọi asset mới hoặc thay đổi trạng thái phải được cập nhật ngay vào `ASSET_INDEX.md`.

---

**Status:** **ACTIVE MASTER RULES**
**Priority:** LEVEL 1 (OVERRIDE ALL)
