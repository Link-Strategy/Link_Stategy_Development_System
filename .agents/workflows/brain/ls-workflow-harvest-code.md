---
trigger: "on_demand"
description: "Brain workflow for harvesting verified code from a Hands/Satellite repository"
---

# LS-WORKFLOW-HARVEST-CODE

Quy trình này dùng cho **Brain Agent** khi thu hoạch code từ Hands/Satellite về Brain Project Workspace sau khi delivery đã qua gate.

## 1. Preflight Context

Agent phải đọc:

- `GEMINI.md`;
- `.agents/rules/ls-rule-gate-acceptance.md`;
- `.agents/workflows/ls-workflow-gitpush.md`;
- `docs/sync-linkage.md`;
- `active-hands.json`;
- `03_LOGS.md` và `02_DECISION_LOGS.md` trong Satellite path liên quan.

Không harvest theo lời báo miệng. Chỉ harvest khi có bằng chứng gate của latest Satellite `main` commit.

## 2. Resolve Satellite Path And Remote

Xác định:

- `project-path`: path kiến trúc của Satellite trong Brain Project Workspace;
- `remote_url`: lấy từ `active-hands.json` hoặc truyền bằng `--remote-url` nếu registry chưa có;
- `remote-branch`: mặc định là `main`.

Nếu không tìm thấy `remote_url`, dừng lại và cập nhật registry hoặc truyền `--remote-url`.

## 3. Verify Remote Gate

Điều kiện harvest chuẩn:

- latest commit trên Satellite `main` đã chạy GitHub Actions;
- workflow `verification-gate` PASS;
- commit đó là commit cần harvest.

CLI `pull-code` tự kiểm tra điều kiện này qua GitHub Actions. Không dùng `--skip-ci-check` trừ khi USER/Brain override rõ ràng.

## 4. Dry Run

Trước khi harvest thật, chạy dry-run:

```bash
npm run pull-code -- --project-path <ARCHITECTURE_PATH> --dry-run
```

Dry-run phải cho thấy tracked snapshot của Satellite commit sẽ được harvest. Snapshot có thể gồm:

- `01_TASK_SPEC.md`
- `02_DECISION_LOGS.md`
- `03_LOGS.md`
- `README.md`
- `package.json`
- `.env.example`
- `.gitignore`
- `src/`
- `tests/`
- `docs/`
- governance/runtime files nếu chúng là tracked files trong Satellite repo đã PASS gate

Không harvest `.git/` và không dựa vào file local/untracked trong Satellite folder. Nếu danh sách file không đúng phạm vi delivery, dừng lại và kiểm tra Satellite.

## 5. Harvest

Khi dry-run đúng và gate PASS, chạy:

```bash
npm run pull-code -- --project-path <ARCHITECTURE_PATH>
```

Workflow sẽ copy toàn bộ tracked files từ latest verified Satellite commit về đúng path trong Brain Project Workspace, bảo vệ `.git/` local nếu path đang là repo, và cập nhật `active-hands.json` với SHA, CI status và thời điểm harvest.

Sau khi harvest snapshot, workflow tải `GATE_REPORT.md` artifact từ GitHub Actions về:

```text
docs/audit/gate-reports/<SATELLITE_PATH>/<SHA>/
```

`GATE_REPORT.md` là report Phase 1 duy nhất. Không dùng thêm review report riêng trong Phase 1.

## 6. Post-Harvest Review

Sau khi harvest, Brain phải:

- kiểm tra diff tại Brain Project Workspace;
- tổng hợp quyết định, blocker, test evidence và bài học từ `02_DECISION_LOGS.md`, `03_LOGS.md`, `docs/`, `GATE_REPORT.md` artifact và commit đã harvest vào tài liệu dự án;
- ghi nhận asset candidate nếu có module/pattern đáng tái sử dụng;
- chỉ commit/push thay đổi Brain Project khi nội dung harvest đúng phạm vi.

---
**Status:** ACTIVE WORKFLOW  
**Owner:** Brain  
**Mandatory for:** Verified Satellite code harvest
