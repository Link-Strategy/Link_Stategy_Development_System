# Antigravity Technical Specification (.agents)

Chào Brain, đây là bản tóm tắt Spec kỹ thuật chính thức từ Antigravity (https://antigravity.codes) để chuẩn hóa hệ thống Link Strategy.

## 1. Cấu trúc thư mục (Directory Structure)
Hệ thống Antigravity ưu tiên cấu trúc thư mục sau để quản trị instructions:
- **`.agents/rules/`**: Chứa các quy tắc (Rules) riêng lẻ cho từng module/glob.
- **`.agents/workflows/`**: Chứa các quy trình làm việc (Workflows) từng bước.
- **`.agents/skills/`**: Chứa các định nghĩa kỹ năng (Agent Skills) và công cụ (Tools).

## 2. Định dạng file Rule (Rule Formatting)
Mỗi file `.md` trong `.agents/rules/` nên có phần **YAML Frontmatter** để Engine của Antigravity có thể tự động nhận diện và nạp (Auto-grounding).

```yaml
---
trigger: "always_on" | "on_demand" | "glob"
globs: "mẫu_khớp_file_nghiêm_ngặt" (ví dụ: "src/ui/**/*, components/*.tsx")
description: "Mô tả ngắn gọn vai trò của Rule này"
---
```

### Các trường Metadata quan trọng:
- **`trigger`**: 
    - `always_on`: Luôn luôn nạp vào context (Thường dùng cho Governance/SOP/Master Rules).
    - `glob`: Chỉ kích hoạt khi đang làm việc với file khớp với mẫu `globs`.
    - `on_demand`: Chỉ nạp khi được Agent hoặc User gọi tên.
- **`globs`**: Danh sách các pattern (Wildcards) để lọc file áp dụng.
- **`description`**: Giúp Engine tóm tắt nhanh vai trò của rule trong danh sách điều khiển.

## 3. Cấu trúc Workflow & Turbo Mode
Nằm tại `.agents/workflows/`, sử dụng cú pháp Markdown kết hợp lệnh thực thi.
- Hỗ trợ **Turbo Mode**: Sử dụng command `// turbo` hoặc `// turbo-all` ngay phía trên các block lệnh để thực thi nhanh (Bypass confirmation).

## 4. Hierarchy (Thứ tự ưu tiên nạp Context)
1. **`GEMINI.md`** (Root): Quy tắc tối cao (Highest Priority).
2. **`AGENTS.md`** (Root): Quy tắc dùng chung (Cross-tool instructions).
3. **`.agents/rules/*.md`**: Quy tắc cụ thể cho từng phần hành.
4. **`src/.../AGENTS.md`**: Quy tắc lồng (Nested) cho từng thư mục dự án.

---
*Cập nhật theo tài liệu chính thức: https://antigravity.codes*
