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
- `.agents/workflows/ls-workflow-new-hand-folder.md`;
- `active-hands.json`;
- `01_TASK_SPEC.md`, `02_DECISION_LOGS.md`, `03_LOGS.md` trong Satellite nếu thay đổi governance có thể ảnh hưởng việc thi công.

Chỉ chạy workflow này với path Satellite rõ ràng trong Project Workspace. Không dùng để sửa nội dung implementation của Hands.

Xác định path kiến trúc của Satellite hoặc dùng `--all` để đồng bộ toàn bộ:

```text
<ARCHITECTURE_PATH> hoặc --all
```

Nếu path chưa tồn tại, tạo Satellite trước bằng một trong hai đường hợp lệ:

- trực tiếp: `npm run new-hands -- --project-path <ARCHITECTURE_PATH> --repo-name <REPO>`;
- staged: `.agents/workflows/ls-workflow-new-hand-folder.md` rồi `.agents/workflows/ls-workflow-init-satellite.md`.

Nếu không truyền path, hệ thống sẽ mặc định dùng `active-hands.json`.

## 3. Dry Run

Trước khi sync thật, chạy dry-run để xem các phần sẽ được copy/replace:

```bash
npm run push-rules -- --project-path <ARCHITECTURE_PATH> --dry-run
```

Nếu dry-run cho thấy thay đổi ngoài governance/runtime, dừng lại và kiểm tra path.

Khi dry-run đúng, chạy sync và push lên Satellite remote:

```bash
npm run push-rules -- --project-path <ARCHITECTURE_PATH> --git-push
# Hoặc cập nhật toàn bộ Hands trong registry (Yêu cầu thêm cờ --confirm):
npm run push-rules -- --all --confirm --git-push
```

Workflow này đồng bộ theo `slicing-profile.json` của Brain và task profile của Satellite. Scope mặc định có thể gồm:

- `.agents/rules/`
- `.agents/workflows/`
- `.agents/templates/`
- `.agents/tools/ls-engine/`
- `.github/`
- `src/core/`
- `src/components/ui/`
- `assets/` nếu có mapping và source tồn tại
- `01_TASK_SPEC.md` (Hợp đồng thi công)
- `GEMINI.md` dành cho Satellite
- package contract bắt buộc của Satellite

`02_DECISION_LOGS.md` và `03_LOGS.md` trong Satellite được bảo vệ khi đã tồn tại; Brain không overwrite log thi công của Hands trong lúc sync governance.

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
