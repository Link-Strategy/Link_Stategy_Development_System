---
name: ls-progress-manager
description: Specialized skill for managing project backlog and session transitions in the Brain tier. Orchestrates daily snapshots, task filtering, and strategic context preservation.
---

# LS-PROGRESS-MANAGER

Kỹ năng này giúp Brain quản lý chuỗi tiến độ dự án (Backlog) thông qua các Session Snapshots, đảm bảo tính liên tục của tri thức và minh bạch của task.

## 1. Backlog Management Standards (Tiêu chuẩn Quản trị)

Brain phải tuân thủ các quy tắc định dạng sau để script tự động hóa hoạt động chính xác:

### 1.1. Task & Phase Formatting
- **Task**: Luôn sử dụng format `- [ ] [Mã Task]: Tên task (Evidence: [link])`.
- **Phase**: Sử dụng Header cấp 3 `### Phase X: [Tên Phase]`.
- **Completion**: Khi một Phase hoàn thành, hãy thêm hậu tố `[COMPLETED]` vào tiêu đề. Script sẽ tự động ẩn phase này trong session tiếp theo.
- **Notes**: Các dòng ghi chú hoặc sub-task thụt lề ngay bên dưới task sẽ được bảo tồn tự động.
- **Stable Markers**: Không xóa các marker `<!-- *_START -->` và `<!-- *_END -->` trong snapshot. Đây là contract để script parse nội dung ổn định dù tiêu đề section thay đổi.

### 1.3. Linking & References (Liên kết tài liệu)
- **Task Spec**: Mỗi Phase hoặc nhóm task lớn nên có link dẫn tới `01_TASK_SPEC.md` tương ứng để đối chiếu DoD.
- **Evidence**: Link bằng chứng hoàn thành phải là link trực tiếp đến file/dòng code (ví dụ: `[x] Logic A ([path/to/file.py#L100](file:///...))`).
- **Snapshot SoT**: Các snapshot `.backlog/session-*.md` là Source of Truth cho tiến độ. Không lưu tiến độ chính ở file đơn lẻ ngoài `.backlog/`.

### 1.4. Conflict Resolution (Xử lý xung đột)
- **Reality vs Snapshot**: Nếu phát hiện codebase thực tế đã thay đổi so với Task List, Brain phải ưu tiên **thực tế codebase** và cập nhật lại Snapshot ngay lập tức.
- **User Instruction vs Target**: Nếu User ra lệnh mâu thuẫn với `1. Target` hiện tại, Brain phải:
    1. Yêu cầu xác nhận thay đổi mục tiêu.
    2. Cập nhật `Target` mới.
    3. Ghi rõ lý do thay đổi vào `Decision Log`.

### 1.5. Decision Log Management
Mục `4. Decision Log` không chỉ là log kỹ thuật, mà là **Nhật ký tri thức**:
- Phải ghi lại các "Giả định" (Assumptions) khi Spec bị thiếu thông tin.
- Phải ghi lại các thay đổi về kiến trúc (Architecture decisions).
- Phải ghi lại lý do tại sao một task bị hủy bỏ hoặc trì hoãn.

## 2. Tools & Scripts Usage

Kỹ năng này cung cấp công cụ tự động hóa chuyển giao session:

- **Script Path**: `.agents/skills/brain/ls-progress-manager/scripts/progress_manager.py`
- **Lệnh thực thi (Bootstrap)**: 
  ```powershell
  python .agents/skills/brain/ls-progress-manager/scripts/progress_manager.py --dir .backlog --bootstrap --summary "Tổng kết các việc đã xong và tồn đọng"
  ```
- **Force Transition**:
  ```powershell
  python .agents/skills/brain/ls-progress-manager/scripts/progress_manager.py --dir .backlog --transition --summary "Tổng kết các việc đã xong và tồn đọng"
  ```
- **Baseline**: Script chỉ nhận snapshot mới nhất trong `.backlog/` làm nguồn tiến độ. Nếu chưa có snapshot nào, phải tạo một snapshot baseline trước khi transition.
- **Integrity Gate**: Script chỉ ghi `SUCCESS` sau khi kiểm tra cấu trúc snapshot mới: marker contract đầy đủ, Task List không rỗng, phase completed không còn trong active, Decision Log có đúng một dòng Integrity Check và previous link hợp lệ.
- **Validate Only**:
  ```powershell
  python .agents/skills/brain/ls-progress-manager/scripts/progress_manager.py --dir .backlog --validate
  ```

## 3. Workflow Integration

Khi thực hiện quy trình [ls-workflow-session-snapshot](../../workflows/ls-workflow-session-snapshot.md), hãy sử dụng kỹ năng này để:
1. **Audit**: Rà soát các task `UNDONE` và `IN-PROGRESS` đối chiếu với codebase.
2. **Sync**: Cập nhật trạng thái snapshot cũ trước khi đóng phiên.
3. **Bootstrap**: Chạy script để lấy snapshot hôm nay hoặc tạo bối cảnh cho phiên làm việc mới.

---
**Status**: ACTIVE BRAIN SKILL
**Priority**: HIGH (For Backlog Operations)
