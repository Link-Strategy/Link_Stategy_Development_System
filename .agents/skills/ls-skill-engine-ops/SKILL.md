---
name: ls-skill-engine-ops
description: Quản trị bộ máy sản xuất Link Strategy (Sync Protocol, Project/Module Gen, Verification Gate). Dùng khi cần khởi tạo dự án, đồng bộ satellite repo hoặc kiểm tra gate nghiệm thu.
---

# LS-SKILL-ENGINE-OPS

Kỹ năng vận hành bộ máy sản xuất phần mềm Link Strategy (Production Engine). Skill này cho phép AI Agent quản trị toàn bộ vòng đời của Master-Satellite Repositories, từ khởi tạo dự án đến thu hoạch tài sản tri thức.

## TỔNG QUAN (OVERVIEW)

Skill này đóng gói các công cụ tự động hóa hạ tầng của Link Strategy, chuyển đổi các file script `.ps1` rời rạc thành một năng lực vận hành có tính hệ thống cho AI Agent.

## CÁC NĂNG LỰC CỐT LÕI (CAPABILITIES)

### 1. Quản trị Dự án & Module (Project/Module Factory)
*   **Generate Project:** Khởi tạo phôi dự án theo chuẩn Monorepo.
*   **Generate Module:** Tạo không gian làm việc độc lập cho từng module trong dự án.
*   **Command:** 
    *   `powershell .agents/skills/ls-skill-engine-ops/scripts/new-project.ps1`
    *   `powershell .agents/skills/ls-skill-engine-ops/scripts/new-module.ps1`

### 2. Đồng bộ & Cưỡng chế Luật pháp (Sync & Enforcement)
*   **Init Satellite:** Khởi tạo remote repository và thiết lập chốt chặn PR.
*   **Push Rules:** Cưỡng chế đồng bộ `GEMINI.md` và `.agents/` từ Master xuống Satellite.
*   **Command:**
    *   `powershell .agents/skills/ls-skill-engine-ops/scripts/init-satellite.ps1`
    *   `powershell .agents/skills/ls-skill-engine-ops/scripts/push-rules-to-satellite.ps1`

### 3. Kiểm soát Chất lượng & Thu hoạch (Gate & Harvesting)
*   **Pull Code:** Thu hoạch mã nguồn và tài sản tri thức sau khi đã vượt qua Gate. Script tự động tra cứu Remote URL từ `active-projects.json` dựa trên ProjectPath.
*   **Secure Delivery (ls-gitpush):** Agent thực hiện rà soát Anti-patterns, chạy verify-gate và nộp PR tự động.
*   **Command:**
    *   `powershell .agents/skills/ls-skill-engine-ops/scripts/verify-gate.ps1`
    *   `powershell .agents/skills/ls-skill-engine-ops/scripts/pull-code-from-satellite.ps1`
    *   `powershell .agents/skills/ls-skill-engine-ops/scripts/ls-gitpush.ps1`

## QUY TẮC VẬN HÀNH (GOVERNANCE RULES)

1.  **Sovereignty First:** Luôn ưu tiên bảo vệ tính toàn vẹn của Master Monorepo. Mọi thao tác `Push Rule` sử dụng cơ chế `pull --rebase` và `push --force-with-lease` để đảm bảo an toàn dữ liệu.
2.  **Integrity Check:** Trước khi thực hiện `Harvesting` (Pull Code), bắt buộc phải chạy `verify-gate` để đảm bảo Hands không sửa đổi bất kỳ tệp luật nào.
3.  **Audit Trail:** Mọi hành động khởi tạo hoặc đồng bộ phải được ghi nhận vào `LOGS.md` của dự án tương ứng.
4.  **Auto-Registration:** Scripts tự động cập nhật `active-projects.json` và `ASSET_INDEX.md`. AI Agent phải kiểm tra các registry này để nắm bắt hiện trạng hệ thống.
5.  **Agent-Led Push Only:** Cấm push thủ công. Mọi nộp bài phải qua `ls-gitpush.ps1` để Agent rà soát anti-patterns và ký nhận báo cáo.
6.  **Path Mapping:** Khi thu hoạch code, scripts tự động ánh xạ tệp từ Satellite về đúng thư mục dự án trong Master, tránh làm bẩn root Monorepo.

## YÊU CẦU MÔI TRƯỜNG (REQUIREMENTS)
*   **PowerShell 7+**
*   **Git CLI**
*   **GitHub CLI (gh)**: Bắt buộc để thực hiện `init-satellite`.

---
**Status:** ACTIVE HARDENED SKILL
**Owner:** Antigravity (AI Agent)
