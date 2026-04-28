# GIÁO ÁN HUẤN LUYỆN - MODULE 3: BUSINESS FORENSICS

## I. TỔNG QUAN (OVERVIEW)
Nếu Module 2 là nhìn ra bên ngoài để thấy vị thế thị trường, thì Module 3 là **nhìn sâu vào bên trong** để tìm kiếm sự thật vận hành. Module này huấn luyện kỹ thuật **"Điều tra hiện trường nội bộ"** (Internal Forensics), tập trung vào bằng chứng là các giao dịch (Transactions), hành vi nhân sự và dòng chảy thực tế của hàng hóa/tiền bạc để bóc trần những thất thoát kinh tế không đáng có.

---

## II. LỘ TRÌNH ĐÀO TẠO CHI TIẾT (DETAILED SYLLABUS)

### Giai đoạn 1: Kỹ thuật Điều tra hiện trường & Phỏng vấn (Field Forensics)
*   **Bài 1.1: Truy vết Hành vi (Behavioral Tracing).** Huấn luyện kỹ thuật "Gemba" (Quan sát tại hiện trường). Dạy Auditor cách dùng AI Agent để phân tích sự sai lệch giữa "Quy trình trên giấy" và "Hành vi thực tế" (ví dụ: Nhân viên không dùng ERP mà dùng Zalo để chốt đơn).
*   **Bài 1.2: Phỏng vấn chẩn đoán hiện trường (Diagnostic Interviewing).** 
    *   Sử dụng AI hỗ trợ thiết kế các câu hỏi "xoáy" vào các nút thắt vận hành.
    *   Kỹ thuật phân tích biên bản phỏng vấn bàng AI để tìm ra mâu thuẫn trong lời kể của các bộ phận (ví dụ: Kho nói một đường, Kế toán nói một nẻo).
*   **Bài 1.3: Kỷ luật Bằng chứng nội bộ (Evidence Integrity).** Cách thu thập và số hóa các chứng từ vật lý (Ảnh chụp kho bãi, ảnh chụp sổ chép tay) và biến chúng thành dữ liệu có thể chẩn đoán được bởi AI.

### Giai đoạn 2: Sơ đồ hóa sự hỗn loạn (Mapping the Spaghetti Reality)
*   **Bài 2.1: Vẽ bản đồ "Spaghetti" (The Messy As-is Flow).** Huấn luyện kỹ thuật vẽ sơ đồ dòng chảy công việc thực tế với tất cả sự đứt gãy, chồng chéo và các bước "đi tắt" của nhân sự. 
*   **Bài 2.2: Chẩn đoán 8 loại lãng phí hiện hữu (Operation Muda).** Tập trung vào việc tìm bằng chứng vật lý cho 8 loại rác thải vận hành ngay trong nhà máy/văn phòng khách hàng (ví dụ: tồn kho ảo, chờ đợi do thiếu thông tin, sai sót phải làm lại).
*   **Bài 2.3: Điểm gãy Dữ liệu (Internal Data Gaps).** Xác định chính xác những điểm mà phần mềm của khách hàng "chết đứng" và nhân sự phải dùng sức người để vá lỗ hổng.

### Giai đoạn 3: Truy vết thất thoát vận hành (Operational Leakage Analysis)
*   **Bài 3.1: Đối soát Giao dịch quy mô lớn (Large-scale Transaction Auditing).** Vận dụng Agent để thực hiện đối soát chéo (Reconciliation) giữa Sổ phụ ngân hàng, Log bán hàng và Log kho. Tìm ra các đơn hàng bị bỏ sót, các khoản thu chi không rõ nguồn gốc.
*   **Bài 3.2: Lượng hóa Thất thoát thực tế (Actual Loss Calculation).** Khác với lãng phí tiềm năng ở M2, bài này dạy cách tính số tiền khách hàng **đang mất thật** mỗi ngày do lỗi quy trình nội bộ (ví dụ: chi phí đền bù sai hỏng, lãi suất trên vốn tồn kho dư thừa).
*   **Bài 3.3: Thesis "Sự thật hồ sơ".** Xây dựng hồ sơ chẩn đoán dựa trên 100% bằng chứng nội bộ, biến Auditor thành một "Thám tử" kinh doanh có lập luận không thể phản bác.

### Giai đoạn 4: Công cụ truy vết đặc thù (Forensic Tooling Implementation)
*   **Bài 4.1: Custom Forensic Tools Building.** (Ứng dụng kỹ năng M1). Lập trình các công cụ MCP chuyên biệt để "ngửi" thấy sự bất thường ngay trong các tệp dữ liệu xuất ra từ hệ thống của khách (ví dụ: Tool phát hiện hóa đơn khống, Tool phát hiện sai lệch định mức vật tư).
*   **Bài 4.2: Thiết kế Pain Map nội bộ (Internal Pain Visualization).** Sử dụng Agent để vẽ các bản đồ nhiệt (Heatmaps) chỉ ra các bộ phận đang "đốt tiền" nhiều nhất trong doanh nghiệp khách hàng.
*   **Bài 4.3: Đóng gói Case Study chẩn đoán.** Kỹ thuật đóng gói các phát hiện Forensic vào kho tri thức để huấn luyện lại cho Agent, giúp các audit sau nhanh hơn.

---

## III. BỘ CÔNG CỤ SỬ DỤNG (TOOLBOX)
Bộ công cụ điều tra hiện trường (Forensics) bao gồm:
- **Thu thập hiện trường:** AI Transcription (Chuyển đổi voice phỏng vấn sang text), GPT-4o Vision (Phân tích ảnh chụp kho bãi/chứng từ).
- **Phân tích đối soát:** Agentic Python Scripts (Đối soát dữ liệu Excel/CSV quy mô lớn).
- **Trực quan hóa:** Mermaid.js (Vẽ sơ đồ mạng nhện "Spaghetti"), Pain Map visualization templates.
- **Công cụ đặc thù:** Custom "Anomaly Scanner" (MCP Tool tự xây để phát hiện sai lệch giao dịch).

---

## IV. BÀI TẬP TỐT NGHIỆP MODULE 3 (GRADUATION PROJECT)

**Nhiệm vụ:** Thực hiện "Phá án" năng suất cho một doanh nghiệp giả định dựa trên dữ liệu thô.
1.  **Dữ liệu:** 01 bộ Logs vận hành hỗn độn và 02 biên bản phỏng vấn mâu thuẫn.
2.  **Thực thi:** 
    *   Sơ đồ hóa quy trình thực tế (Spaghetti Map).
    *   Truy vết và chứng minh 03 điểm thất thoát tiền bạc (Leakage) dựa trên đối soát giao dịch.
3.  **Output:** Hồ sơ `Pain Map & Operational Leakage Report` đạt chuẩn "Bằng chứng thép".
4.  **Verification:** Bảo vệ kết luận trước tình huống khách hàng (Brain giả định) cố tình phủ nhận lỗi lầm.

---

## IV. TIÊU CHUẨN NGHIỆM THU (DoD)
- [ ] Phân biệt rõ lãng phí tiềm năng (M2) và thất thoát thực tế (M3 - Operational Leakage).
- [ ] Thành thạo kỹ năng phỏng vấn và truy vết hành vi con người.
- [ ] Biết vẽ sơ đồ workflow "Spaghetti" của thực trạng hỗn loạn.
- [ ] Biết lập trình và sử dụng tool AI để đối soát các giao dịch nội bộ quy mô lớn.
