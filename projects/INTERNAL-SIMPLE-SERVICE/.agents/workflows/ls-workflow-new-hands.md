---
trigger: "on_demand"
description: "Brain workflow for creating a Hands/Satellite repository"
---

# LS-WORKFLOW-NEW-HANDS

Quy trình này dùng cho **Brain Agent** khi giao một phần việc cho Hands. `new-hands` là public workflow name cho hành động init Satellite; logic bootstrap sử dụng cùng primitive với `init-satellite`.

## 1. Preflight Context

Agent phải đọc:

- Project Workspace context;
- `01_TASK_SPEC.md`;
- `02_DECISION_LOGS.md`;
- `03_LOGS.md`;
- `.agents/rules/*.md`;
- `docs/sync-linkage.md`;

Hands Workspace phải nằm trong Project Workspace và phải có path rõ ràng do Brain/workflow chỉ định.

## 2. Prepare Hands Workspace Path

Agent xác định path folder Hands/Satellite theo yêu cầu của Brain.

Ví dụ vị trí có thể là một path con bất kỳ trong Project Workspace:

```text
services/auth
app/module
workflow/importer
```

Không tự ép taxonomy folder. Path phải phản ánh cách Brain muốn tổ chức project.

## 3. Initialize Hands/Satellite Repository

Chạy `new-hands` trên folder Hands Workspace:

```bash
npm run new-hands -- --project-path "<hands-workspace-path>" --repo-name "<repo-name>"
```

`new-hands` sẽ bootstrap folder đó thành Satellite repo:

- thêm `.gitignore` chuẩn;
- sync governance/runtime;
- validate satellite layout;
- chặn Brain-only scripts trong `package.json`;
- stage bằng allowlist;
- commit initial governance;
- tạo GitHub remote bằng `gh`;
- push `main`.

## 4. Verify Hands Workspace

Agent kiểm tra:

- Hands Workspace có `GEMINI.md`;
- `.agents/`, `.github/`, `package.json`, `src/`, `tests/` tồn tại;
- `package.json` chỉ expose `verify-gate` và `ls-gitpush`;
- remote GitHub tồn tại;
- Project Workspace registry của Hands được cập nhật nếu workflow có registry;
- `npm run verify-gate -- --project-path "<hands-workspace-path>"` không fail vì governance/package/engine.

Nếu verify fail vì implementation chưa có test/code, ghi rõ đây là gap thi công, không phải lỗi init.

## 5. Handover To Hands

Hands nhận repo đã init và làm theo:

```text
LS-WORKFLOW-GITPUSH
```

Sau khi Hands push và GitHub Actions pass, Brain harvest bằng `pull-code` về đúng Hands Workspace path trong Project Workspace.

---
**Status:** ACTIVE WORKFLOW  
**Owner:** Brain  
**Mandatory for:** Hands/Satellite onboarding
