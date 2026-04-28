# GIÁO ÁN HUẤN LUYỆN - MODULE 1: AI RESEARCH & DOCUMENT STACK

## I. TỔNG QUAN (OVERVIEW)
Module này không dạy bạn cách "chat" với AI. Module này huấn luyện bạn cách **thiết lập và điều khiển một Hệ điều hành Auditor** dựa trên AI Coding Agent, biến các tác vụ văn phòng và chẩn đoán phức tạp thành các quy trình tự động hóa có tính kỷ luật cao.

---

## II. LỘ TRÌNH ĐÀO TẠO CHI TIẾT (DETAILED SYLLABUS)

### Giai đoạn 1: Tư duy Agentic & Hệ điều hành Auditor (Environment & Mindset)
*   **Bài 1.1: Từ Chatbot đến Agent.** Hiểu về vòng lặp chẩn đoán: `Quan sát (Observation) -> Tư duy (Thinking) -> Hành động (Action)`. Tại sao Auditor cần một Coding Agent có quyền can thiệp vào file hệ thống.
*   **Bài 1.2: Cấu trúc Workspace Link Strategy.** Thực hành thấu hiểu kiến trúc Repository: Thư mục Hiến pháp (`.LinkStrategy`), Thư mục công cụ và luật (`.agents`), và khu vực thực thi dự án.
*   **Bài 1.3: Kỷ luật Giao thức (Protocol Discipline).** Huấn luyện thói quen tối thượng: Luôn để Agent đọc `GEMINI.md` và `ASSET_INDEX.md` trước khi bắt đầu bất kỳ tác vụ nào.

### Giai đoạn 2: Buồng lái Auditor & Các "Cánh tay" của AI (Config & MCP)
*   **Bài 2.1: Thiết lập Buồng lái (IDE Setup) - "Biến phần mềm soạn thảo thành cộng sự"**
    *   **Concept:** Coi Cursor/VSCode là một phần mềm "siêu Microsoft Word" có khả năng hiểu cấu trúc doanh nghiệp.
    *   **Thực hành:** 
        *   Hướng dẫn giao diện 3 vùng: **Explorer** (Bản đồ tệp tin - nhìn thấy toàn bộ doanh nghiệp), **Editor** (Nội dung tài liệu), và **Chat/Agent** (Vùng thảo luận với cộng sự AI).
        *   Cài đặt một chạm (One-click extensions): Cài Markdown (để viết báo cáo đẹp), Mermaid (để vẽ sơ đồ quy trình tự động), và GitLens (để biết ai đã sửa dữ liệu nào).
*   **Bài 2.2: Tự chế tạo công cụ nghiệp vụ (Custom MCP Building)**
    *   **Concept:** Chuyên gia nghiệp vụ là "Kiến trúc sư công cụ". Auditor dùng AI Agent để lập trình ra các MCP Tool giải quyết chính xác bài toán chẩn đoán (ví dụ: Tool tự tính ROI, Tool đọc định dạng file ERP cũ).
    *   **Thực hành:** 
        *   **Thiết kế Logic:** Hướng dẫn cách mô tả quy trình nghiệp vụ (công thức tính, điều kiện lọc dữ liệu) để Agent hiểu.
        *   **Lập trình Agentic:** Auditor ra lệnh cho Agent viết code MCP Server (Python/NodeJS) để thực thi logic đó.
        *   **Triển khai:** Đăng ký và gọi các "vũ khí tự chế" (`calculate-ls-roi`, `lean-waste-scanner`) ngay trong không gian làm việc của AI Agent.
*   **Bài 2.3: Vận hành an toàn & Engine Room (Terminal & Cloud Sync)**
    *   **Concept:** Terminal là "Phòng máy". Bạn không cần là thợ máy, nhưng cần biết nút "Khởi động" và "Dừng".
    *   **Thực hành:** 
        *   Dạy các câu lệnh "Lệnh bài" (Safe commands): `ls` để xem mình đang có những hồ sơ gì, `cd` để đi vào từng phòng ban dự án.
        *   **Kỷ luật Bảng lương & Bảo mật:** Cách quản lý các khóa bí mật (API Keys). Tại sao tuyệt đối không được để lộ API Key vào file báo cáo (Sử dụng file `.env` như một cái két sắt).
        *   **Lưu trữ vĩnh viễn (Git basics):** Coi Git như một "Cỗ máy thời gian". Hướng dẫn cách `Commit` (chốt dữ liệu) và `Push` (cất vào kho an toàn trên GitHub) để không bao giờ bị mất tài liệu chẩn đoán.

### Giai đoạn 3: Thiết kế Luật chơi & Quản trị AI (Rule Design & Governance)
*   **Bài 3.1: Thiết kế Luật nguyên tử (Atomic Rules).** Cách viết file `.cursorrules` để ép AI tuân thủ các checklist cứng (Ví dụ: Định dạng ngày tháng, cấu trúc đầu mục báo cáo, cấm sử dụng từ ngữ sáo rỗng).
*   **Bài 3.2: Hệ thống quy tắc phức hợp (Rule Systems).** Cách thiết kế bộ quy tắc phân tầng. Sử dụng `GEMINI.md` làm Master Rule để điều khiển các Agent vệ tinh trong các dự án con.
*   **Bài 3.3: Debugging & Hardening Rules.** Khi Agent làm sai hoặc Hallucinate, Auditor phải biết cách sửa đổi bộ quy tắc (Rule) để lỗi đó không bao giờ lặp lại. Đưa tri thức vào "Code của hệ thống" thay vì sửa lỗi tạm thời.

### Giai đoạn 4: Hóa thạch Tài liệu & Năng suất 10x (Document-as-Code)
*   **Bài 4.1: Kỹ thuật Document Hardening.** Thực hành dùng Agent để "chưng cất" dữ liệu rác (ảnh chụp, memo, ghi âm) thành các bản Spec chuẩn 5 Pillars có chiều sâu kỹ thuật.
*   **Bài 4.2: Evidence-based Documentation.** Huấn luyện Agent cách đính kèm bằng chứng (Path, Link, Log snippet) cho mọi luận điểm chẩn đoán trong báo cáo.
*   **Bài 4.3: Tự động hóa tác vụ văn phòng.** Thiết lập các Script và Template để Agent tự động sinh báo cáo hàng ngày, biên bản họp và nhật ký chẩn đoán (`LOGS.md`).

---

## III. BỘ CÔNG CỤ SỬ DỤNG (TOOLBOX)
Để hoàn thành Module này, học viên cần làm chủ các công cụ sau:
- **Hệ thống lõi:** Cursor/VSCode (Giao diện lập trình tài liệu), Antigravity Agent.
- **Hạ tầng quản trị:** Git (Quản lý phiên bản), GitHub (Lưu trữ và đồng bộ tri thức).
- **Công cụ dòng lệnh:** PowerShell/Terminal (Vận hành Engine room).
- **Kết nối dữ liệu:** MCP (FileSystem, Excel/Spreadsheet Connectors).
- **Ngôn ngữ chuẩn hóa:** Markdown (Viết báo cáo), Mermaid.js (Vẽ sơ đồ).

---

## IV. BÀI TẬP TỐT NGHIỆP MODULE 1 (GRADUATION PROJECT)

**Nhiệm vụ:** Thiết lập một Workspace chẩn đoán chuyên nghiệp cho một khách hàng giả định.
1.  **Thiết lập cấu hình:** Cài đặt đầy đủ Rule và MCP cần thiết cho Agent.
2.  **Thiết kế Rule:** Viết 01 file `.cursorrules` chuyên biệt để chẩn đoán lỗi trong quy trình kế toán hoặc vận hành kho.
3.  **Thực thi:** Dùng Agent trích xuất dữ liệu từ một bộ file hỗn độn (Messy Data) và sản xuất ra 01 bản Spec chẩn đoán đạt điểm Gate Score > 80.
4.  **Harden:** Chứng minh khả năng dùng Agent để tự động cập nhật tri thức mới vào `ASSET_INDEX.md`.

---

## IV. TIÊU CHUẨN NGHIỆM THU (DoD)
- [ ] Học viên nắm vững cách config workspace và IDE.
- [ ] Biết viết và debug Rules cho Agent.
- [ ] Biết cách dùng MCP để Agent truy cập dữ liệu trực tiếp.
- [ ] Tạo được Output (Spec) có tính kỷ luật cao, không lỗi định dạng.
