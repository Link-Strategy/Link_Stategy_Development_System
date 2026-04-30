---
trigger: "on_demand"
description: "Brain workflow for syncing governance, workflows, templates, engine, and shared assets to a Hands/Satellite repository"
---

# LS-WORKFLOW-PUSH-RULES

Quy trình này dùng cho **Brain Agent** khi cần cập nhật governance/runtime từ Brain Project Workspace xuống một Hands/Satellite repo đã được tạo.

## 1. Preflight Context

Agent phải đọc:

- `GEMINI.md`;
- `ASSET_INDEX.md`;
- `.agents/rules/*.md`;
- `.agents/workflows/ls-workflow-new-hands.md`;
- `docs/sync-linkage.md`;
- `active-hands.json`;
- `01_TASK_SPEC.md`, `02_DECISION_LOGS.md`, `03_LOGS.md` trong Satellite nếu thay đổi governance có thể ảnh hưởng việc thi công.

Chỉ chạy workflow này với path Satellite rõ ràng trong Project Workspace. Không dùng để sửa nội dung implementation của Hands.

Xác định path kiến trúc của Satellite hoặc dùng `--all` để đồng bộ toàn bộ:

```text
<ARCHITECTURE_PATH> hoặc --all
```

Nếu path chưa tồn tại, dùng `LS-WORKFLOW-NEW-HANDS` thay vì workflow này. Nếu không truyền path, hệ thống sẽ mặc định dùng `active-hands.json`.

## 3. Dry Run

Trước khi sync thật, chạy dry-run để xem các phần sẽ được copy/replace:

```bash
npm run push-rules -- --project-path <ARCHITECTURE_PATH> --dry-run
```

Nếu dry-run cho thấy thay đổi ngoài governance/runtime, dừng lại và kiểm tra path.

Khi dry-run đúng, chạy sync và push lên Satellite remote:

```bash
npm run push-rules -- --project-path <ARCHITECTURE_PATH> --git-push
# Hoặc cập nhật toàn bộ Hands trong registry:
npm run push-rules -- --all --git-push
```

Workflow này đồng bộ:

- `.agents/rules/`
- `.agents/workflows/`
- `.agents/templates/`
- `.agents/tools/ls-engine/`
- `.agents/skills/`
- `.github/`
- `components/ui/`
- `assets/`
- `01_TASK_SPEC.md` (Hợp đồng thi công)
- `02_DECISION_LOGS.md` & `03_LOGS.md` (Phản hồi/Nhật ký)
- `GEMINI.md` dành cho Satellite
- package contract bắt buộc của Satellite

## 5. Verify After Sync

Sau khi sync, kiểm tra:

- Git push thành công nếu có `--git-push`;
- Satellite vẫn giữ `verify-gate` và `ls-gitpush`;
- Satellite không expose Brain-only scripts;
- `npm run verify-gate -- --project-path <ARCHITECTURE_PATH>` không fail vì governance/package/engine.

Nếu verify fail vì implementation/test/spec chưa hoàn chỉnh, ghi rõ đó là gap thi công. Nếu fail vì governance/package/engine, sửa từ Brain Project hoặc Master rồi sync lại.

---
**Status:** ACTIVE WORKFLOW  
**Owner:** Brain  
**Mandatory for:** Satellite governance/runtime sync
