# LS-RULE-HANDOVER-PROTOCOL

Chào Agent, đây là bộ quy chuẩn bàn giao Microservice (MHS). Bạn phải đảm bảo mọi Satellite Repository hoặc Module mới đều tuân thủ cấu trúc này để đảm bảo tính thay thế 24h.

## 1. CẤU TRÚC HỒ SƠ 8 PHẦN (THE 8 PILLARS)

Mọi module bàn giao phải nằm trong thư mục `docs/blueprints/` với 8 thành phần:

1.  **Global Service Map:** Sơ đồ Mermaid mô tả luồng dữ liệu Upstream/Downstream.
2.  **Service Interface Contract:** Tệp `swagger.yaml`, `proto` hoặc bảng định nghĩa API/Props.
3.  **Internal Data Schema:** ERD hoặc Schema mô tả cấu trúc dữ liệu nội bộ.
4.  **Inter-service Playbook:** Quy tắc Retry, Timeout và mã lỗi chung.
5.  **Local Sandbox Spec:** `docker-compose.yml` và bộ dữ liệu mẫu (Seed Data) để chạy local.
6.  **Hardened Asset Rules:** Danh sách các `ls-skill-*` và `ls-tool-*` bắt buộc phải dùng.
7.  **Acceptance Scenarios (UAT):** Danh sách User Stories và kịch bản kiểm thử thực tế.
8.  **Security & Secret Protocol:** Quy tắc sử dụng `.env` và checklist chống lỗ hổng.

## 2. TIÊU CHUẨN DEFINITION OF DONE (DOD)

Một module chỉ được coi là hoàn thiện (Active) khi đạt 5 điều kiện:
- **Unit Test Coverage:** > 80%.
- **Integration Test:** Phải pass khi gọi mock-server.
- **Observability:** Đã implement `trace_id` trong logs.
- **Log-First Evidence:** Mọi kết quả UAT phải có dấu vết trong `LOGS.md`.
- **Hardening Proposal:** Có đề xuất bóc tách tài sản tái sử dụng.

## 3. QUY TRÌNH KIỂM TRA CỦA AGENT

Khi Hands báo cáo hoàn thành, Agent phải:
1. Đối soát danh mục tệp tin trong `docs/blueprints/` xem có đủ 8 phần không.
2. Kiểm tra `LOGS.md` để xác nhận bằng chứng thực thi (Evidence) cho từng kịch bản UAT.
3. Nếu thiếu, yêu cầu bổ sung trước khi tiến hành chấm điểm Gate Scorecard.

---
**Status:** ACTIVE OPERATIONAL RULE
**Priority:** LEVEL 1
