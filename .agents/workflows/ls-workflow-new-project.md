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

- `client-id`
- `project-name`
- `project-type`

Theo lifecycle mới, Project Workspace nên nằm cạnh Master/System Workspace bằng cách dùng `--base-path ..`.

```text
../<CLIENT_ID>-<PROJECT_NAME>
```

Nếu Brain chỉ định folder cha khác, truyền folder đó vào `--base-path`.

## 3. Create Project Workspace

Chạy CLI hiện tại với đầy đủ tham số:

```bash
npm run new-project -- --client-id "<client-id>" --project-name "<project-name>" --project-type "<project-type>" --base-path ".."
```

Workflow kỳ vọng Project Workspace có:

- spec/log/docs để Brain quản lý project;
- rules/workflows/templates/tooling cần cho lifecycle;
- package scripts Brain-side;
- registry để theo dõi Hands Workspace.

Nếu Brain yêu cầu Project Workspace có GitHub repo riêng ngay ở bước này, Agent tạo repo sau khi skeleton đã được tạo và cập nhật `active-projects.json` bằng remote URL.

## 4. Verify Project Workspace

Sau khi tạo, Agent kiểm tra:

- folder project tồn tại;
- `01_TASK_SPEC.md`, `02_DECISION_LOGS.md`, `03_LOGS.md` tồn tại;
- package scripts cần cho Brain workflow tồn tại;
- project được ghi vào `active-projects.json` của Master nếu registry tồn tại;
- remote GitHub đã được cấu hình nếu workflow đã tạo repo ở bước này.

## 5. Next Step

Khi Brain giao việc cho Hands, dùng workflow:

```text
LS-WORKFLOW-NEW-HANDS
```

---
**Status:** ACTIVE WORKFLOW  
**Owner:** Brain  
**Mandatory for:** New Brain Project Workspace setup
