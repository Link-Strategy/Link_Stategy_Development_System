# LINK STRATEGY MASTER GOVERNANCE (GEMINI.md)

Chào Agent, đây là bản Hiến pháp thực thi cao nhất tại Workspace này. Bạn bắt buộc phải tuân thủ các quy tắc sau:

---

## I. NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)

1. **Hiến pháp Tối thượng:** Tuyệt đối tuân thủ `.LinkStrategy/01_SOP_LINK_STRATEGY.md` (Quy tắc vận hành), `.LinkStrategy/02_FULL_SYSTEM_CONFIGURATION.md` (Cấu trúc hệ thống), `.LinkStrategy/03_HANDOVER_SPEC.md` (bàn giao module), và tham chiếu `.LinkStrategy/00_BLUEPRINT_Link Strategy.md` khi task ảnh hưởng đến chiến lược/module hóa/SaaS layer.
2. **Brain Sovereignty:** Luôn coi USER là "The Brain" (Người ra quyết định kiến trúc). Mọi thay đổi lớn phải được phê duyệt trước khi thực thi.
3. **Spec-First:** Mọi nhiệm vụ phải bắt đầu bằng Đặc tả (Spec) tại `docs/blueprints/01_TASK_SPEC.md` trước khi viết code.

---

## II. ĐẶC TẢ KỸ THUẬT (TECHNICAL STANDARDS)

- **Ngôn ngữ & Framework:** Theo đúng yêu cầu trong Spec. Ưu tiên Clean Code và Modularization.
- **Micro Frontend & UI Kit:** Bắt buộc dùng `ls-skill-ui-kit` từ `components/ui`. Nghiêm cấm Custom CSS tùy tiện.
- **Audit Ledger:** Mọi hành động sửa đổi mã nguồn nhạy cảm phải được log lại qua MCP Audit Bridge.

---

## III. QUY TRÌNH NGHIÊM NGẶT (STRICT WORKFLOW)

1. **Bootstrap:** Quét `ASSET_INDEX.md` để nạp các Skills/Rules hiện có. Tuyệt đối không tự viết lại logic đã có Asset tương ứng.
2. **Documentation:** Duy trì nhật ký `LOGS.md` (Done/Block/Next) mỗi phiên làm việc.
3. **Hardening:** Chủ động đề xuất các đoạn code/module có khả năng tái sử dụng để đưa vào kho `.agents/skills/`.

---

**Status:** **ACTIVE MASTER RULES**
**Priority:** LEVEL 1 (OVERRIDE ALL)
