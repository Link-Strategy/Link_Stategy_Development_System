# LINK STRATEGY - SATELLITE CONSTITUTION (GEMINI.md)

Chào Agent, bạn đang làm việc trong một **Satellite Repo** (Dự án vệ tinh). Nhiệm vụ của bạn là thi công module này dưới sự giám sát chặt chẽ của Brain thông qua các chốt chặn tự động.

---

## I. NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)

1.  **Spec-First:** Tuyệt đối không viết code khi `01_TASK_SPEC.md` chưa được Brain + Agent phê duyệt.
2.  **Evidence-Based:** Mọi quyết định thay đổi logic, kiến trúc hoặc giải quyết các điểm chưa rõ trong Spec phải được ghi lại tại `02_DECISION_LOGS.md` như một sổ cái bằng chứng (Decision Ledger). Mọi tiến độ thực thi phải nằm trong `03_LOGS.md`.
3.  **Governance Integrity:** Các file trong `.agents/rules/` và các script tại `.agents/tools/ls-engine/` là bất biến. Mọi sự thay đổi tại đây sẽ bị phát hiện bởi cơ chế SHA256 Integrity và khiến bạn không thể nộp bài (Gate Fail).
4.  **Action via Tools:** Chỉ nộp bài thông qua công cụ `npm run ls-gitpush`.

---

## II. QUY TRÌNH KHỞI ĐỘNG (BOOTSTRAP ORDER)

Để đảm bảo context luôn đầy đủ, Agent **PHẢI** thực hiện theo thứ tự:

1.  Đọc file `01_TASK_SPEC.md` để hiểu "Làm cái gì?".
2.  Đọc file `02_DECISION_LOGS.md` để hiểu "Các quyết định đã chốt".
3.  Đọc file `03_LOGS.md` để nắm "Tiến độ hiện tại".
4.  Đọc các quy tắc tại `.agents/rules/` để biết "Luật chơi".
5.  Kiểm tra thư mục `assets/` để sử dụng các tài sản dùng chung từ Master.

---

## III. TIÊU CHUẨN THI CÔNG (TECHNICAL STANDARDS)

*   **Code & Test:** Code nằm ở `src/`, Test nằm ở `tests/`. Unit Test phải đạt coverage cao.
*   **Verification:** Trước khi nộp bài, phải chạy `npm run verify-gate -- --project-path .`. Bạn phải sửa toàn bộ lỗi (Failures) mới có thể nộp bài.
*   **Conventional Commits:** Tuân thủ đúng chuẩn commit để Brain có thể theo dõi lịch sử 24h.
*   **No Secrets:** Tuyệt đối không commit file `.env` hay API Key. Sử dụng `.env.example` làm mẫu.

---

## IV. QUY TRÌNH BÀN GIAO (DELIVERY PROTOCOL)

1.  **Tự kiểm định:** Chạy `npm run verify-gate -- --project-path .`.
2.  **Nộp bài:** Chạy `npm run ls-gitpush -- --title "feat: delivery"`. 
3.  **Bằng chứng:** Công cụ sẽ tự động tạo PR kèm theo **Integrity Hash** và **Gate Report**. 
4.  **Đợi duyệt:** Brain sẽ review PR dựa trên các bằng chứng này.

---

## V. XỬ LÝ SỰ CỐ & PHỤC HỒI (RECOVERY)

Trong trường hợp bạn nhận được thông báo **GATE FAIL** do vi phạm tính toàn vẹn (Integrity Hash), hãy thực hiện các bước sau:

1.  **Kiểm tra thay đổi:** Sử dụng `git diff .agents/` để xem bạn có vô tình chỉnh sửa file luật hoặc script hay không.
2.  **Khôi phục bản gốc:** 
    *   Sử dụng lệnh: `git checkout HEAD -- .agents/` để khôi phục toàn bộ thư mục quản trị về trạng thái an toàn nhất.
    *   Sử dụng lệnh: `git checkout HEAD -- GEMINI.md` để khôi phục Hiến pháp.
3.  **Lưu ý:** Việc cố tình sửa đổi các file trong `.agents/` mà không có sự đồng ý của Brain được coi là vi phạm nghiêm trọng và sẽ bị từ chối PR ngay lập tức.

---
**Status:** ACTIVE SATELLITE RULES
**Priority:** LEVEL 1 (Sovereign within this Project)

