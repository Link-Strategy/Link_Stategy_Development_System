# SYNC LINKAGE CONTRACT - CƠ CHẾ ĐỒNG BỘ MASTER-SATELLITE

Tài liệu này xác lập các giao thức kỹ thuật để duy trì sự nhất quán giữa **Master Monorepo (The Brain)** và các **Satellite Repos (The Hands)**.

## 1. PHÂN LỚP DỮ LIỆU ĐỒNG BỘ (DATA LAYERS)

| Lớp dữ liệu | Hướng đồng bộ | Tần suất | Chế độ tại Satellite |
| :--- | :--- | :--- | :--- |
| **Governance (.agents/rules)** | Master ➔ Satellite | Real-time (CI/CD) | **Read-Only** |
| **Blueprints (.LinkStrategy)** | Master ➔ Satellite | Per Milestone | **Read-Only** |
| **Source Code (src/tests)** | Satellite ➔ Master | Sau khi PR Approved | **Read-Write** (Hands) |
| **Logs (LOGS.md)** | Satellite ➔ Master | Daily | **Read-Write** (Hands) |

## 2. GIAO THỨC ĐỒNG BỘ RULE (PUSH PROTOCOL)
*Mục tiêu: Đảm bảo Hands luôn bị áp đặt bởi Rules mới nhất từ Brain.*

1.  **Trigger:** Brain commit thay đổi vào `.agents/rules/` trên Monorepo.
2.  **Action:** GitHub Action duyệt danh sách Satellite Repos (quản lý trong `active-projects.json`).
3.  **Command:** `git push satellite-remote main` (chỉ ghi đè thư mục `.agents/rules/`).
4.  **Enforcement:** File `.cursorrules` tại Satellite luôn trỏ về các Rule này.

## 3. GIAO THỨC ĐỒNG BỘ CODE (PULL PROTOCOL)
*Mục tiêu: Thu hoạch tài sản sau khi đã qua Verification Gate.*

1.  **Trigger:** PR trên Satellite đạt điểm Gate >= 80/100 và Brain bấm `Approve`.
2.  **Action:** Script `sync-satellite-code.ps1` thực hiện:
    *   `git remote add satellite [URL]`
    *   `git fetch satellite`
    *   `git checkout satellite/main -- projects/[ID]/src`
    *   `git commit -m "harden(sync): tích hợp code từ satellite [ID]"`
3.  **Audit:** Ghi vết phiên đồng bộ vào Master Audit Log.

## 4. QUY TẮC GIẢI QUYẾT XUNG ĐỘT (CONFLICT RESOLUTION)
*   **Quy tắc tối thượng:** Master luôn thắng (Master is Superior).
*   Nếu Hands tự ý sửa Rules tại Satellite ➔ CI/CD của Master sẽ ghi đè (Overwrite) mà không báo trước.
*   Nếu có xung đột tại Source Code ➔ Hands phải tự resolve trên Satellite trước khi Brain thực hiện Pull.

---
**Status:** DRAFT CONTRACT (PHASE 7.2)
**Priority:** P0 - Critical for Scaling
