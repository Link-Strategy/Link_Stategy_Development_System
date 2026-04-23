# LS-WORKFLOW-DELIVERY-LOOP (QUY TRÌNH BÀN GIAO CHUẨN)

Chào Hands (AI Agent & Freelancer), đây là quy trình bắt buộc bạn phải thực hiện TRƯỚC KHI thực hiện lệnh `git push` lên Satellite Repository. Việc vi phạm quy trình này sẽ dẫn đến việc PR bị từ chối tự động.

## BƯỚC 1: TỰ KIỂM TRA (SELF-VERIFICATION)
Bạn không được tin vào code của chính mình. Hãy để script đối soát làm việc đó.
*   **Hành động:** Chạy lệnh `.\scripts\verify-gate.ps1`.
*   **Yêu cầu:** Score phải đạt >= 80/100.
*   **Xử lý:** Nếu có lỗi Integrity (MD5 mismatch), tuyệt đối không được sửa luật. Bạn phải báo cáo ngay cho Brain nếu nghi ngờ bộ luật có vấn đề.

## BƯỚC 2: QUÉT BẢO MẬT (SECRET SCAN)
*   **Hành động:** Kiểm tra lại file `.env.example` và chắc chắn không có API Key thực tế nào nằm trong mã nguồn.
*   **Quy tắc:** Tuân thủ tuyệt đối `ls-rule-secret-management.md`.

## BƯỚC 3: ĐÓNG GÓI TRI THỨC (DOCS HARDENING)
*   **Hành động:** 
    *   Cập nhật `LOGS.md` (Done/Block/Next).
    *   Đảm bảo `README.md` của dự án/module đã mô tả đủ cách chạy code.
    *   Điền đầy đủ `02_QA_LOGS.md` nếu có các quyết định kiến trúc quan trọng.

## BƯỚC 4: COMMIT CHUẨN (CONVENTIONAL COMMIT)
*   **Hành động:** Sử dụng `git commit` theo chuẩn `ls-rule-conventional-commits.md`.
*   **Ví dụ:** `feat(auth): implement jwt validation`, `test(ui): add unit tests for login button`.

## BƯỚC 5: TẠO PULL REQUEST (PR SUBMISSION)
*   **Hành động:** Đẩy code lên GitHub và tạo PR.
*   **Yêu cầu:** Điền đầy đủ Checklist trong PR Template. Đính kèm (Paste) kết quả từ `verify-gate.ps1` vào phần bằng chứng.

---
**Status:** **ACTIVE WORKFLOW**
**Mandatory for:** All Satellite Operations
