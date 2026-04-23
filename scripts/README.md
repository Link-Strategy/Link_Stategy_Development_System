# Link Strategy Platform Scripts

Thư mục này chứa các công cụ tự động hóa (Automation Tools) giúp quản trị và vận hành dự án theo đúng quy trình Link Strategy.

## 🛠️ Danh sách Scripts

### 1. `new-project.ps1`
- **Mục đích:** Tự động sinh ra cấu trúc thư mục và các file blueprint cho một dự án mới.
- **Cách dùng:**
  ```powershell
  ./scripts/new-project.ps1 -clientId "LETRON" -projectName "StategyDev" -projectType "Core"
  ```

### 2. `new-module.ps1` (Planned)
- **Mục đích:** Khởi tạo một module độc lập bên trong một project hiện có.

### 3. `verify-gate.ps1` (Planned)
- **Mục đích:** Tự động kiểm tra tính đầy đủ của hồ sơ bàn giao (Spec, Logs, Tests).

---
**Lưu ý:** Chỉ sử dụng các script này khi bạn là Brain hoặc Brain Delegate (ví dụ: AI Agent). Mọi dự án mới sinh ra phải được đăng ký vào `ASSET_INDEX.md`.
