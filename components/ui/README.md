# Link Strategy Shared UI library

Thư mục này chứa toàn bộ các tài sản UI dùng chung cho toàn bộ hệ sinh thái phần mềm của Link Strategy.

## ⚖️ Luật Vận Hành (UI Governance)

Mọi thay đổi hoặc bổ sung vào thư mục này đều phải tuân thủ tuyệt đối quy tắc **LS-RULE-UI-PREMIUM**.

- **Glob Enforcement:** Quy tắc thẩm mỹ sẽ tự động được kích hoạt khi bạn làm việc trong thư mục này.
- **Tiêu chuẩn:** HSL Colors, Micro-animations, Dark-mode first.
- **Quy trình:** Task -> Spec -> Implementation -> Verification Gate -> Hardening.

## 📂 Cấu trúc thư mục

- `/primitives`: Các thành phần cơ bản (Button, Input, Checkbox).
- `/patterns`: Các tổ hợp thành phần (Navbar, Sidebar, CardGrid).
- `/examples`: Các trang mẫu và demo.

## 🚀 Cách sử dụng

1. Kiểm tra danh sách component hiện có trong `ASSET_INDEX.md`.
2. Nếu component đã tồn tại, tuyệt đối không viết lại.
3. Nếu cần tạo component mới, hãy gửi `HARDENING_PROPOSAL` sau khi hoàn thiện dự án pilot.

---
**Status:** ACTIVE ASSET LIBRARY
**Rule Reference:** [.agents/rules/ls-rule-ui-premium.md](../../.agents/rules/ls-rule-ui-premium.md)
