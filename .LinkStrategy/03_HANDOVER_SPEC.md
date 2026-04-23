<div style="width: 100% !important; font-family: sans-serif !important; white-space: nowrap !important; line-height: 0 !important; background-color: transparent !important;">
  <!-- Khối Metadata -->
  <div style="display: inline-block !important; width: 50% !important; vertical-align: middle !important; white-space: normal !important; line-height: 1.5 !important; border: 1px solid #003366 !important; border-radius: 4px !important; overflow: hidden !important; margin: 0 !important; background-color: #f8f9fa !important;">
    <div style="background-color: #003366 !important; color: white !important; padding: 4px 10px !important; font-weight: bold !important; font-size: 0.8em !important; border: none !important; margin: 0 !important;">Production Engine Handover Standard</div>
    <div style="padding: 8px 2px !important; background-color: #f8f9fa !important; font-size: 0.8em !important; color: #333333 !important; border: none !important; margin-top: -1px !important;">
      <div style="margin-bottom: 4px !important; background-color: transparent !important; line-height: 0.8 !important;">
        <span style="display: inline-block !important; width: 120px !important; font-weight: bold !important; color: #666666 !important; background-color: transparent !important;">Document:</span><span style="color: #003366 !important; font-weight: bold !important; background-color: transparent !important;">Microservice Handover Spec</span>
      </div>
      <div style="margin-bottom: 0 !important; background-color: transparent !important; line-height: 1.1 !important;">
        <span style="display: inline-block !important; width: 120px !important; font-weight: bold !important; color: #666666 !important; background-color: transparent !important;">Classification:</span><span style="color: #333333 !important; background-color: transparent !important;">Internal Operational</span>
      </div>
    </div>
  </div><!-- QUAN TRỌNG: KHÔNG ĐỂ KHOẢNG TRẮNG Ở ĐÂY --><div style="display: inline-block !important; width: 54% !important; vertical-align: middle !important; text-align: right !important; white-space: normal !important; line-height: 1.5 !important; margin: 0 !important; background-color: transparent !important;">
    <!-- Khối Branding Badge -->
    <div style="display: inline-flex !important; align-items: center !important; background-color: #003366 !important; padding: 8px 14px !important; border-radius: 4px !important; text-align: left !important; box-shadow: 0 2px 6px rgba(0,0,0,0.15) !important;">
      <img src="../Assets/LINK%20STRATEGY.png" width="32" height="32" alt="Link Strategy Logo" style="background-color: white !important; padding: 2px !important; border-radius: 50% !important; display: block !important; border: none !important; object-fit: contain !important;">
      <div style="margin-left: 12px !important; background-color: transparent !important;">
        <div style="font-size: 1.25em !important; font-weight: bold !important; letter-spacing: 1px !important; line-height: 1 !important; background-color: transparent !important;">
          <span style="color: white !important; background-color: transparent !important;">LINK</span> <span style="color: #FFB800 !important; background-color: transparent !important;">STRATEGY</span>
        </div>
        <div style="font-size: 0.65em !important; font-weight: bold !important; color: #cccccc !important; letter-spacing: 0.5px !important; line-height: 1 !important; background-color: transparent !important;">OPERATION SOLUTIONS DIVISION</div>
      </div>
    </div>
  </div>
</div>

# MICROSERVICE HANDOVER STANDARD (MHS) - QUY CHUẨN BÀN GIAO MICROSERVICE

Tài liệu này xác lập các tiêu chuẩn bắt buộc cho bộ hồ sơ bàn giao (Handover Package) từ **Brain** (Link Strategy) cho **Hands** (Developer/Freelancer) trong kiến trúc phân tán.

---

## I. TỔNG QUAN HỒ SƠ (PACKAGE OVERVIEW)

Mọi Task/Module thuộc mô hình Microservices khi bàn giao phải được đặt trong thư mục `docs/blueprints/` của Satellite Repository, bao gồm 8 thành phần nòng cốt:

1. **Global Service Map** (Vị trí hệ sinh thái).
2. **Service Interface Contract** (Hợp đồng API/Message).
3. **Internal Data Schema** (Cấu trúc dữ liệu nội bộ).
4. **Inter-service Playbook** (Kịch bản tương tác).
5. **Local Sandbox Spec** (Môi trường thực thi biệt lập).
6. **Hardened Asset Rules** (Quy tắc sử dụng tài sản có sẵn).
7. **Acceptance Scenarios & UAT** (Kịch bản nghiệm thu thực tế).
8. **Security & Secret Protocol** (Quy tắc bảo mật và biến môi trường).

---

## II. CHI TIẾT CÁC THÀNH PHẦN

### 1. Global Service Map (Bản đồ Tích hợp)
*   **Mục đích:** Giúp Hands hiểu flow dữ liệu xuyên suốt.
*   **Yêu cầu:** Sơ đồ Mermaid mô tả:
    *   **Upstream:** Service nào gọi đến mình? (API Gateway, BFF, hay Service khác).
    *   **Downstream:** Mình cần gọi đến Service nào để hoàn thành tác vụ?
    *   **Auth Flow:** Vị trí xác thực JWT và phân quyền (RBAC/ABAC).

### 2. Service Interface Contract (Hợp đồng Giao tiếp)
Đây là "bản cam kết" không thể thay đổi nếu không có sự phê duyệt của Brain.
*   **Backend:** File `swagger.yaml` hoặc `proto` file định nghĩa rõ Endpoint, Method, Input (Validation rules), và Output (Dạng JSON chuẩn).
*   **Frontend (Micro-frontend):** Đặc tả các **Props** (Input) và **Custom Events** (Output) mà module này trao đổi với Shell Application.

### 3. Internal Data Schema (Cấu trúc Dữ liệu Nội bộ)
Mỗi Microservice sở hữu dữ liệu riêng biệt.
*   **Yêu cầu:** Sơ đồ ERD hoặc bản mô tả Schema (Collection/Table) chi tiết.
*   **Encapsulation:** Nghiêm cấm Hands tự ý query trực tiếp vào Database của service khác. Mọi trao đổi dữ liệu phải qua API/Messaging.

### 4. Inter-service Playbook (Kịch bản Tương tác)
Quy định cách các dịch vụ "nói chuyện" với nhau một cách an toàn.
*   **Sync:** Quy định cơ chế Retry, Timeout và Circuit Breaker (nếu có).
*   **Async (Event-driven):** Định nghĩa Message Schema và Topic/Queue sử dụng. 
*   **Error Handling:** Bảng mã lỗi chung của hệ thống để đồng bộ log giữa các service.

### 5. Local Sandbox Spec (Môi trường Sandbox)
Hands phải có khả năng chạy code mà không cần kết nối vào Production hoặc Staging.
*   **Dockerization:** File `docker-compose.yml` khởi tạo môi trường local.
*   **Mocking Infrastructure:** Danh sách các Mock endpoints cho các dịch vụ Downstream mà service hiện tại phụ thuộc.
*   **Seed Data:** Bộ dữ liệu mẫu (JSON/SQL) để khởi tạo trạng thái ban đầu của service.

### 6. Hardened Asset Rules (Quy tắc Tài sản)
*   Liệt kê các **Skills** và **Tools** đã được Link Strategy đóng gói sẵn mà Hands *bắt buộc* phải sử dụng (ví dụ: `ls-skill-log-auditor`, `ls-tool-mcp-bridge`).
*   Nghiêm cấm tự viết lại các logic đã có trong thư viện tài sản của Brain.
*   **UI/UX Standard:** Bắt buộc sử dụng các components từ `ls-skill-ui-kit`. Tuyệt đối không tự định nghĩa CSS tùy tiện (Custom CSS) cho các thành phần đã có sẵn trong kho dùng chung.

### 7. Acceptance Scenarios & UAT (Kịch bản nghiệm thu)
Đây là căn cứ pháp lý cao nhất để đánh giá hoàn thành công việc.
*   **Yêu cầu:** Danh sách các kịch bản kiểm thử phía người dùng (User Stories).
*   **Ví dụ:** "Người dùng nhập liệu sai -> Hệ thống phải báo lỗi A", "Người dùng bấm xác nhận -> Database phải ghi nhận trạng thái B".

### 8. Security & Secret Protocol (Bảo mật)
Nghiêm cấm tuyệt đối việc rò rỉ thông tin nhạy cảm.
*   **Secret Management:** Mọi thông tin nhạy cảm (API Keys, DB Passwords) phải dùng biến môi trường `.env`. Tuyệt đối không commit các file này lên Git.
*   **Vulnerability:** Sản phẩm không được chứa các lỗ hổng cơ bản (SQL Injection, XSS) đã được nhắc trong checklist bảo mật của Brain.

---

## III. DEFINITION OF DONE (DOD) CHO MICROSERVICES

Một Microservice chỉ được coi là hoàn thiện khi thỏa mãn:

1. **Unit Test:** Đạt coverage > 80% cho logic nghiệp vụ.
2. **Integration Test:** Phải pass các test cases gọi đến Mock-server.
3. **Observability:** Phải implement đúng định dạng logs có chứa `trace_id` để track luồng qua nhiều service.
4. **Documentation:** Cập nhật README chi tiết cách setup local sandbox.
5. **Asset Hardening Proposal:** Freelancer phải chủ động đề xuất ít nhất 1 đoạn code hoặc module trong task để đưa vào kho "Hardened Assets" (Tài sản tái sử dụng).

---

## IV. QUY TRÌNH BÀN GIAO (EXECUTION FLOW)

1. **Brain:** Xuất bản bộ Spec chuẩn (8 thành phần trên) vào Satellite Repo.
2. **Hands:** Thực hiện `In-boarding 24h` (Đọc Spec, chạy Sandbox).
3. **Sync-Up:** Một buổi thảo luận tối đa 15p để làm rõ các điểm mơ hồ (áp dụng quy tắc No Ambiguity).
4. **Activation:** Hands bắt đầu Code và Commit hàng ngày vào nhánh Feature.

---
**Status:** **OFFICIAL STANDARD v1.0**
**Owner:** Link Strategy Brain Delegate
