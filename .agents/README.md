# Antigravity Technical Specification (.agents)

Chào Brain, đây là bản tóm tắt Spec kỹ thuật chính thức từ Antigravity (https://antigravity.codes) để chuẩn hóa hệ thống Link Strategy.

## 1. Cấu trúc thư mục phân tầng (Sovereign Structure)
Hệ thống sử dụng cấu trúc 3 tầng (Master-Brain-Hands) để cô lập và bảo mật tri thức:
- **`.agents/rules/[master|brain|hands]/`**: Các quy tắc quản trị và thi công.
- **`.agents/workflows/[master|brain|hands]/`**: Các quy trình vận hành tự động.
- **`.agents/skills/[brain|hands]/`**: Các kỹ năng và công cụ chuyên môn.

## 2. Định dạng file Rule (Rule Formatting)
Mỗi file `.md` trong `.agents/rules/` bắt buộc có phần **YAML Frontmatter**:

```yaml
---
trigger: "always_on" | "on_demand"
description: "Mô tả vai trò của Rule"
---
```

### Cơ chế Kích hoạt động (Dynamic Activation):
- Tại **Master**: Toàn bộ phôi rule để ở `on_demand`.
- Tại **Brain/Hands**: Engine tự động chuyển thành `always_on` để cưỡng chế thực thi kỷ luật.

## 3. Hierarchy (Thứ tự ưu tiên nạp Context)
1. **`GEMINI.md`** (Root): Hiến pháp vận hành tối cao.
2. **`ASSET_INDEX.md`**: Bản đồ tài sản đã được hóa cứng (Hardened) theo tầng.
3. **`.agents/rules/*.md`**: Quy tắc quản trị cấp độ dự án/vệ tinh.
4. **`.agents/workflows/` & `.agents/skills/`**: Quy trình và kỹ năng bổ trợ.

---
*Tuân thủ tiêu chuẩn Antigravity v1.0 - Link Strategy Sovereign Edition*
