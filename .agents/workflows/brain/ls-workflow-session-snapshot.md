---
description: "Quy trình quản lý chuỗi tiến độ hàng ngày trong thư mục .backlog/"
---

# LS-WORKFLOW-SESSION-SNAPSHOT

Quy trình này đảm bảo bối cảnh làm việc luôn được đồng bộ với thực tế codebase trước khi bắt đầu bất kỳ yêu cầu mới nào.

## Bước 1: Khởi động & Đồng bộ (Mandatory Bootstrap)

> [!IMPORTANT]
> Thực hiện bước này ngay khi nhận yêu cầu nếu snapshot hôm nay chưa tồn tại. Tuyệt đối không làm việc trên bối cảnh cũ.

1.  **Validate latest snapshot**:
    // turbo
    ```powershell
    python .agents/skills/brain/ls-progress-manager/scripts/progress_manager.py --dir .backlog --validate
    ```
    - Thư mục `.backlog/` là Source of Truth cho tiến độ phiên.
    - Nếu snapshot mới nhất không hợp lệ, dừng lại và sửa snapshot trước khi làm việc.

2.  **Audit & Sync trước khi chuyển giao**:
    -   **Audit (Pending Tasks)**: Brain tập trung rà soát thực tế codebase cho các task **chưa hoàn thành (`[ ]`, `[/]`)** của snapshot gần nhất.
        -   **Tiêu chí cập nhật**: Nếu phát hiện task đã được triển khai trong code, cập nhật trạng thái kèm bằng chứng.
        -   **Tiêu chí In Progress**: Ghi nhận blocker hoặc phần việc còn lại nếu có thay đổi so với log cũ.
    -   **Update Baseline**: Cập nhật trực tiếp vào snapshot cũ các trạng thái `[x]` hoặc `[/]` kèm bằng chứng.
    -   **Summarize**: Viết tổng kết "Completed Today" vào snapshot cũ (đây sẽ là nội dung của tệp Archive).
    -   Nếu `.backlog/` chưa có snapshot nào, cần khởi tạo baseline trong `.backlog/` trước. Nguồn tiến độ chỉ nằm trong `.backlog/`.

3.  **Bootstrap session hôm nay**:
    // turbo
    ```powershell
    python .agents/skills/brain/ls-progress-manager/scripts/progress_manager.py --dir .backlog --bootstrap
    ```
    - Nếu snapshot hôm nay đã tồn tại và hợp lệ, script trả về file đó.
    - Nếu snapshot hôm nay chưa tồn tại, script chuyển giao từ snapshot gần nhất sang hôm nay.

4.  **Xác minh Integrity (Gate)**:
    // turbo
    ```powershell
    python .agents/skills/brain/ls-progress-manager/scripts/progress_manager.py --dir .backlog --validate
    ```
    Gate này kiểm tra:
    - [ ] Các marker `<!-- *_START -->` và `<!-- *_END -->` bắt buộc vẫn tồn tại.
    - [ ] Dòng `Integrity Check: SUCCESS` có tồn tại.
    - [ ] Mục **Task List** đã loại bỏ các phase đã hoàn thành (Phase marked `[COMPLETED]`).
    - [ ] Mục **Decision Log** có đúng một dòng Integrity Check.

## Bước 2: Thực thi & Nhật ký phiên

- Thực hiện yêu cầu của người dùng trên nền tệp snapshot mới (`ACTIVE`).
- **Evidence-based Done**: Mỗi khi hoàn thành một task, Brain phải cập nhật ngay vào Task List kèm bằng chứng (ví dụ: `[x] Hoàn thành logic A (file path#L10-20)`).
- **Decision Log**: Ghi lại mọi quyết định quan trọng ảnh hưởng đến kiến trúc hoặc logic nghiệp vụ.

## Bước 3: Đóng phiên & Bàn giao (Pre-Archival)

> [!TIP]
> Sử dụng kỹ năng [ls-progress-manager](../../skills/brain/ls-progress-manager/SKILL.md) để đảm bảo định dạng task/phase chuẩn xác trước khi đóng phiên.

1.  **Kiểm kê**: Rà soát lại các task dở dang (`[/]`).
2.  **Summary**: Đảm bảo mục **Session Summary** phản ánh đúng các mốc quan trọng đạt được.
3.  **Risk Update**: Cập nhật các điểm nghẽn mới vào mục `5. Risk & Blocker Monitoring` theo chuẩn của skill.
4.  **Bàn giao**: Chuẩn bị sẵn sàng cho quy trình Bootstrap của phiên kế tiếp.

- Kiểm kê lại các task dở dang (`[/]`).
- Đảm bảo mục **Session Summary** phản ánh đúng các mốc quan trọng đạt được trong phiên này.
- Chuẩn bị sẵn sàng cho quy trình Bootstrap của phiên kế tiếp.

---

### Scripts & Tools Summary

| Công cụ | Lệnh thực thi |
| :--- | :--- |
| **Bootstrap** | `python .agents/skills/brain/ls-progress-manager/scripts/progress_manager.py --dir .backlog --bootstrap` |
| **Transition** | `python .agents/skills/brain/ls-progress-manager/scripts/progress_manager.py --dir .backlog --transition` |
| **Validate** | `python .agents/skills/brain/ls-progress-manager/scripts/progress_manager.py --dir .backlog --validate` |
| **Check** | `ls .backlog/session-*.md` |

---
**Command**: `/session-snapshot`

### Quy định liên quan
- [LS-RULE-BRAIN-GOVERNANCE](../rules/ls-rule-brain-governance.md)
