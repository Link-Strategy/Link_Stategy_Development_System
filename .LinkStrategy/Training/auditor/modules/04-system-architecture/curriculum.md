# GIÁO ÁN HUẤN LUYỆN - MODULE 4: SYSTEM ARCHITECTURE & LS TERRITORY

## I. TỔNG QUAN (OVERVIEW)
Module này huấn luyện Auditor trở thành một "Bác sĩ giải phẫu hệ thống". Mục tiêu tối thượng là giúp học viên làm chủ 25 Concept công nghệ tinh hoa để khi nhìn vào bất kỳ usecase nào (từ kho bãi, nhà máy đến tài chính), Auditor có thể ngay lập tức đề xuất một kiến trúc can thiệp chuẩn xác.

---

## II. LỘ TRÌNH ĐÀO TẠO CHI TIẾT (DETAILED SYLLABUS)

### Giai đoạn 1: 25 Concept công nghệ "Vạn năng" (Elite Tech Concepts)

**Nhóm 1: Hệ thống & Kết nối (The Backbone)**
1.  **Internet & Networking:** Hiểu IP, DNS, Firewall và luồng đi của dữ liệu xuyên biên giới.
2.  **Client-Server & Cloud Native:** Bản chất của việc thuê tài nguyên (AWS, Azure) và vận hành trên mây.
3.  **Giao thức kết nối (HTTP, MQTT, WebSockets):** "Hệ thần kinh" của giao tiếp dữ liệu.
4.  **API & Webhooks:** "Người phục vụ" và "Kẻ báo tin" giữa các phần mềm rời rạc.
5.  **Virtualization & Containers (Docker):** Cách đóng gói ứng dụng để chạy ổn định ở bất cứ đâu.

**Nhóm 2: Dữ liệu & Sự thật (The Truth)**
6.  **SQL vs NoSQL:** Khi nào dùng Database chặt chẽ (Kế toán), khi nào dùng Database linh hoạt (Big Data).
7.  **Data Integrity & ACID:** Tại sao dữ liệu không được phép sai lệch (Tính toàn vẹn).
8.  **Audit Logs & Immutable Ledger:** Kỹ thuật ghi chép "bất biến" để chống gian lận.
9.  **Vector Databases (RAG):** "Bộ nhớ" của AI Agents để hiểu tri thức riêng của khách hàng.
10. **Observability (Monitoring):** Cách biết hệ thống đang "khỏe" hay "ốm" từ xa.

**Nhóm 3: Công nghệ thực thi (The Muscles)**
11. **IoT (Internet of Things):** Sensors, Gateway và sự kết nối thế giới vật lý vào hệ thống.
12. **PLC & SCADA (Industrial Tech):** Cách các máy móc trong nhà máy giao tiếp.
13. **LLM & AI Agents:** Sự khác biệt giữa Trí tuệ (AI) và Tự động hóa thông thường.
14. **RPA (Robotic Process Automation):** Robot bắt chước thao tác người dùng trên các hệ thống cũ (Legacy).
15. **Automation & Orchestration:** Sự phối hợp nhịp nhàng giữa hàng nghìn tác vụ tự động.

**Nhóm 4: Hệ sinh thái & Chiến lược (The Strategy)**
16. **Open Source & Libraries:** Tận dụng tri thức cộng đồng (NPM, Python) để tăng tốc 10x.
17. **Technical Debt (Nợ kỹ thuật):** Nhận diện lỗi hệ thống do sự lỗi thời của công nghệ.
18. **Microservices vs Monolith:** Tư duy bóc tách module linh hoạt hay tập trung.
19. **Encryption & Data Sovereignty:** Bảo mật và quyền sở hữu dữ liệu pháp lý của khách hàng.
20. **Headless Architecture:** Tách biệt phần nhìn (Front-end) và phần xử lý (Back-end) để linh hoạt.

**Nhóm 5: Kết nối vật lý & Hạ tầng (The Physical)**
21. **Wi-Fi, 5G & LoRaWAN:** Cách thức kết nối dữ liệu ở mọi quy mô địa lý.
22. **RFID, NFC & Barcode:** Công nghệ định danh vật thể trong kho bãi và logistics.
23. **Edge Computing:** Xử lý dữ liệu ngay tại hiện trường để giảm độ trễ và chi phí Cloud.
24. **SaaS vs On-premise Deployment:** Tư duy cho thuê dịch vụ vs Sở hữu hạ tầng vật lý.
25. **Version Control (Git Logic):** Tại sao quản lý phiên bản là nền tảng của sự minh bạch và chuyên nghiệp.

### Giai đoạn 2: Bản đồ vũ khí Link Strategy (LS Territory Mastery)
*   **Bài 2.1: Kiến trúc 4 tầng của LS (The 4-Plane Engine).** Layer A (Edge) -> Layer B (Dispatch) -> Layer C (Cloud nghiệp vụ) -> Layer D (Hành động).
*   **Bài 2.2: Khám phá phẩm vật (Product Capabilities).** Đánh giá năng lực thực tế của ERP Next, IoT Ingestion và bộ Service AI của Link Strategy.
*   **Bài 2.3: Triết lý Mô-đun hóa (Modularity).** Tại sao chúng ta can thiệp nhanh theo mô-đun thay vì bán giải pháp cồng kềnh.

### Giai đoạn 3: Ma trận Phác đồ Kiến trúc (The Architecture Prescription Matrix)

| Triệu chứng (Pains) | Phác đồ Kiến trúc (Prescription) | Thành phần LS tương ứng |
| :--- | :--- | :--- |
| **Silo dữ liệu:** Hệ thống rời rạc. | **Integration Hub (API Center).** | API Dispatcher / Webhooks |
| **Mất dấu vết vật lý:** Thất thoát. | **Edge-to-Cloud (IoT Ingestion).** | IoT Edge / Layer A-B |
| **Nghẽn quyết định:** Sếp bận. | **Agentic Workflow (AI Automation).** | LLM Agent / Layer C |
| **Hệ thống cũ đóng kín:** Ko API. | **Data Mirroring / RPA Automation.** | Database Sync / RPA Tool |
| **Dữ liệu bị xào nấu:** Gian lận. | **Immutable Ledger (Audit Trail).** | Audit Trail / Layer D |
| **Vận hành mù quáng:** Chậm báo cáo. | **Stream Processing (Real-time).** | Dashboard Real-time Layer |

---

## III. BỘ CÔNG CỤ SỬ DỤNG (TOOLBOX)
- **Thiết kế kiến trúc:** Mermaid.js (Sơ đồ Sequence, Architecture Map).
- **Từ điển công nghệ:** 25 Elite Concept Cheat Sheet (Tài liệu tra cứu).
- **Phác đồ mẫu:** Architecture Prescription Matrix.
- **Đóng gói:** Intervention Spec Template.

---

## IV. BÀI TẬP TỐT NGHIỆP MODULE 4 (GRADUATION PROJECT)

**Nhiệm vụ:** Thiết kế "Đơn thuốc kiến trúc" (The Prescription) cho một doanh nghiệp đa quốc gia có hệ thống phức tạp.
1.  **Chẩn đoán:** Chỉ ra các Red Flags về kiến trúc dựa trên 25 Concept tinh hoa.
2.  **Ra toa:** Sử dụng Matrix để gọi tên chính xác các Pattern và Công nghệ (IoT/Agents/Protocols) cần áp dụng.
3.  **Vẽ phác đồ:** Hoàn thiện sơ đồ To-be Architecture Map chuyên nghiệp.
4.  **Harden:** Thuyết minh sự lựa chọn công nghệ (ví dụ: Tại sao dùng LoRaWAN thay vì WiFi cho usecase này).

---

## V. TIÊU CHUẨN NGHIỆM THU (DoD)
- [ ] Giải thích được 25 concept công nghệ bắt buộc theo ngôn ngữ nghiệp vụ.
- [ ] Gọi tên được mẫu kiến trúc phù hợp cho ít nhất 05 usecase khác nhau.
- [ ] Hiểu rõ và áp dụng được mô hình 4 tầng kiến trúc của Link Strategy.
- [ ] Vẽ được sơ đồ kiến trúc can thiệp đạt chuẩn chuyên gia.
