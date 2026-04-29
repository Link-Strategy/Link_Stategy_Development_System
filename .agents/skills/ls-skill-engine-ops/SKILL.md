---
name: ls-skill-engine-ops
description: Quản trị bộ máy sản xuất Link Strategy (Sync Protocol, Project/Module Gen, Verification Gate). Dùng khi cần khởi tạo dự án, đồng bộ satellite repo hoặc kiểm tra gate nghiệm thu.
---

# LS-SKILL-ENGINE-OPS

Kỹ năng vận hành bộ máy sản xuất phần mềm Link Strategy (Production Engine). Skill này cho phép AI Agent quản trị toàn bộ vòng đời của Master-Satellite Repositories, từ khởi tạo dự án đến thu hoạch tài sản tri thức.

## TỔNG QUAN (OVERVIEW)

Skill này đóng gói CLI Node.js tự động hóa hạ tầng của Link Strategy thành một năng lực vận hành có tính hệ thống cho AI Agent.

## CÁC NĂNG LỰC CỐT LÕI (CAPABILITIES)

### 1. Quản trị Dự án & Module (Project/Module Factory)
*   **Generate Project:** Khởi tạo phôi dự án theo chuẩn Monorepo.
*   **Generate Module:** Tạo không gian làm việc độc lập cho từng module trong dự án.
*   **Command:** 
    *   `npm run new-project -- --client-id CLIENT --project-name PROJECT --project-type TYPE`
    *   `npm run new-module -- --project-path projects/CLIENT-PROJECT --module-name MODULE`

### 2. Đồng bộ & Cưỡng chế Luật pháp (Sync & Enforcement)
*   **Init Satellite:** Khởi tạo remote repository và thiết lập chốt chặn PR.
*   **Push Rules:** Cưỡng chế đồng bộ `GEMINI.md` và `.agents/` từ Master xuống Satellite.
*   **Command:**
    *   `npm run init-satellite -- --project-path projects/CLIENT-PROJECT --repo-name repo-name`
    *   `npm run push-rules -- --project-path projects/CLIENT-PROJECT`

### 3. Kiểm soát Chất lượng & Thu hoạch (Gate & Harvesting)
*   **Pull Code:** Thu hoạch mã nguồn và tài sản tri thức sau khi đã vượt qua Gate. Script tự động tra cứu Remote URL từ `active-projects.json` dựa trên ProjectPath.
*   **Secure Delivery (ls-gitpush):** Agent thực hiện rà soát Anti-patterns, chạy verify-gate và nộp PR tự động.
*   **Command:**
    *   `npm run verify-gate -- --project-path projects/CLIENT-PROJECT`
    *   `npm run pull-code -- --project-path projects/CLIENT-PROJECT`
    *   `npm run ls-gitpush -- --project-path projects/CLIENT-PROJECT --title "feat: delivery"`

## QUY TẮC VẬN HÀNH (GOVERNANCE RULES)

1.  **Sovereignty First:** Luôn ưu tiên bảo vệ tính toàn vẹn của Master Monorepo. Mọi thao tác `Push Rule` sử dụng cơ chế `pull --rebase` và `push --force-with-lease` để đảm bảo an toàn dữ liệu.
2.  **Integrity Check:** Trước khi thực hiện `Harvesting` (Pull Code), bắt buộc phải chạy `verify-gate` để đảm bảo Hands không sửa đổi bất kỳ tệp luật nào.
3.  **Audit Trail:** Mọi hành động khởi tạo hoặc đồng bộ phải được ghi nhận vào `03_LOGS.md` của dự án tương ứng.
4.  **Registry:** `new-project` cập nhật `active-projects.json` khi registry tồn tại. `ASSET_INDEX.md` là registry tài sản của Brain và phải được cập nhật thủ công khi tạo hoặc harden asset mới.
5.  **Agent-Led Push Only:** Cấm push thủ công. Mọi nộp bài phải qua `npm run ls-gitpush` để Agent rà soát anti-patterns và ký nhận báo cáo.
6.  **Path Mapping:** Khi thu hoạch code, scripts tự động ánh xạ tệp từ Satellite về đúng thư mục dự án trong Master, tránh làm bẩn root Monorepo.

## YÊU CẦU MÔI TRƯỜNG (REQUIREMENTS)
*   **Node.js 20+ / npm 10+**
*   **Git CLI**
*   **GitHub CLI (gh)**: Bắt buộc để thực hiện `init-satellite`.

---
**Status:** ACTIVE HARDENED SKILL
**Owner:** Antigravity (AI Agent)

