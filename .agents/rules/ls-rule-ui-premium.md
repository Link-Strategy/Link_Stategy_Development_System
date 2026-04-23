---
trigger: glob
globs: "components/ui/**/*, projects/**/ui/**/*"
description: "Tiêu chuẩn thiết kế Premium dành cho hệ sinh thái UI của Link Strategy."
---

# LS-RULE-UI-PREMIUM

Chào Hands, đây là bộ quy tắc ép buộc (Enforcement) nhằm đảm bảo mọi thành phần giao diện được tạo ra trong hệ sinh thái Link Strategy đều đạt chuẩn **Premium & State-of-the-Art**.

## 1. NGUYÊN TẮC MÀU SẮC (COLOR DISCIPLINE)

- **Cấm tuyệt đối:** Không được sử dụng mã màu Hex (`#FFFFFF`) hoặc màu thủ công (`red`, `blue`) trong code.
- **Bắt buộc:** Phải sử dụng hệ màu **HSL** được định nghĩa trong hệ thống design tokens.
- **Dark Mode First:** Mọi component phải được thiết kế tương thích hoàn hảo với chế độ tối (Dark Mode), sử dụng các sắc độ xám sâu (Deep Grayscale) thay vì màu đen thuần.

## 2. TYPOGRAPHY (CHỮ VIẾT)

- **Font chữ:** Chỉ sử dụng các font hiện đại từ Google Fonts: **Inter**, **Outfit**, hoặc **Roboto**.
- **Kích thước:** Tuân thủ hệ thống `rem` để đảm bảo tính responsive và khả năng mở rộng.

## 3. MICRO-ANIMATIONS (CHUYỂN ĐỘNG VI MÔ)

Giao diện của Link Strategy phải "sống động":
- **Hover effects:** Mọi interactive element (Button, Card, Link) bắt buộc phải có hiệu ứng hover mượt mà với `transition: all 0.2s ease-in-out`.
- **Glassmorphism:** Ưu tiên sử dụng hiệu ứng kính mờ (`backdrop-filter: blur()`) cho các lớp overlay và sidebar để tạo cảm giác cao cấp.
- **Subtle Gradients:** Sử dụng gradient chuyển màu nhẹ nhàng thay vì các mảng màu phẳng đơn điệu.

## 4. QUY TẮC CẤU TRÚC (STRUCTURAL RULES)

- **Ưu tiên Asset:** Kiểm tra thư mục `components/ui/` trước khi tự viết một component mới.
- **No Ad-hoc Styles:** Không sử dụng các utility class tùy tiện nếu chúng phá vỡ hệ thống design tokens đã định nghĩa.

## 5. AUDIT CHECKLIST

AI và Brain sẽ từ chối PR nếu:
- [ ] Có mã màu Hex trong CSS/JS.
- [ ] Component không có trạng thái hover/active.
- [ ] Sử dụng font chữ mặc định của trình duyệt.
- [ ] Bố cục không responsive trên mobile.

---
**Status:** ACTIVE TARGETED RULE
**Priority:** HIGH (Enforced by Glob)
