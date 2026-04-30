---
trigger: "on_demand"
description: "Brain workflow for creating a new Project Workspace"
---

# LS-WORKFLOW-NEW-PROJECT

Quy trình này dùng cho **Brain Agent** khi bắt đầu một project mới. Mục tiêu là tạo Project Workspace do Brain quản lý, nằm ngoài Master/System Workspace hiện tại.

## 1. Preflight Context

Agent phải đọc:

- `ASSET_INDEX.md`
- `.agents/skills/ls-skill-engine-ops/SKILL.md`
- `.agents/rules/ls-rule-master-governance.md`
- `docs/sync-linkage.md`
- `active-projects.json`

Không tạo project mới bên trong Master/System Workspace trừ khi Brain yêu cầu rõ đó là fixture/test.

## 2. Resolve Project Workspace

Agent xác định thông tin project từ yêu cầu của Brain:

- `project-name`

Theo lifecycle mới, Project Workspace nên nằm cạnh Master/System Workspace bằng cách dùng `--base-path ..`.

```text
../<PROJECT_NAME>
```

Nếu Brain chỉ định folder cha khác, truyền folder đó vào `--base-path`.

## 3. Create Project Workspace

Chạy CLI hiện tại với đầy đủ tham số:

```bash
npm run new-project -- --project-name "<project-name>"
```

Mặc định command sẽ cố tạo GitHub repo bằng `gh repo create`, push initial commit và ghi `remote_url` vào `active-projects.json`.

Các biến thể hợp lệ:

- Dùng `--no-github` nếu chỉ muốn tạo local workspace.
- Dùng `--remote-url "<url>"` nếu GitHub repo đã tồn tại và chỉ cần ghi URL vào registry.
- Dùng `--repo-name "<name>"`, `--organization "<org>"`, `--public` để điều khiển repo GitHub được tạo.

Workflow kỳ vọng Project Workspace có:

- `docs/` rỗng để Brain tự tổ chức tài liệu dự án;
- rules/workflows/templates/tooling cần cho lifecycle;
- package scripts Brain-side;
- registry để theo dõi Hands Workspace.

## 4. Verify Project Workspace

Sau khi tạo, Agent kiểm tra:

- folder project tồn tại;
- `docs/` tồn tại và không bị ép theo template mặc định;
- package scripts cần cho Brain workflow tồn tại;
- project được ghi vào `active-projects.json` của Master nếu registry tồn tại;
- `remote_url` được ghi nếu GitHub repo được tạo hoặc `--remote-url` được truyền.

## 5. Next Step

Khi Brain giao việc cho Hands, dùng workflow:

```text
LS-WORKFLOW-NEW-HANDS
```

---
**Status:** ACTIVE WORKFLOW  
**Owner:** Brain  
**Mandatory for:** New Brain Project Workspace setup
