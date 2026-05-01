---
trigger: "on_demand"
description: "Brain workflow for harvesting verified code from a Hands/Satellite repository"
---

# LS-WORKFLOW-HARVEST-CODE

Quy trình này dùng cho **Brain Agent** khi thu hoạch code từ Hands/Satellite về Brain Project Workspace sau khi delivery đã qua gate.

## 1. Preflight Context

Agent phải đọc:

- `GEMINI.md`;
- `ASSET_INDEX.md`;
- `.agents/rules/*.md`;
- `.agents/workflows/ls-workflow-new-hand-folder.md`;
- `active-hands.json`;
- `01_TASK_SPEC.md`, `02_DECISION_LOGS.md`, `03_LOGS.md` trong Satellite nếu thay đổi governance có thể ảnh hưởng việc thi công.

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
- workflow `Link Strategy CI Suite` PASS;
- commit đó là commit cần harvest.

CLI `pull-code` tự kiểm tra điều kiện này qua GitHub Actions. Đồng thời, Engine sẽ tự thực hiện một bài **Verify Gate (Brain-side)** ngay tại chỗ để đảm bảo Hands không hack Engine local. Không dùng `--skip-ci-check` trừ khi USER/Brain override rõ ràng.

## 4. Dry Run

Trước khi harvest thật, chạy dry-run:

```bash
npm run pull-code -- --project-path <ARCHITECTURE_PATH> --dry-run
```

Dry-run phải cho thấy scope harvest theo `slicing-profile.json` của Satellite. Mỗi mapping có dạng:

```text
<source trong Satellite> -> <target trong Brain Project>
```

Dry-run sẽ báo rõ source thiếu hoặc mapping không an toàn. Không harvest `.git/`, governance/runtime (`.agents/`, `.github/`, `GEMINI.md`, `ASSET_INDEX.md`) hoặc vùng Brain-protected như `src/core/` và `src/components/ui/`. Nếu danh sách mapping không đúng phạm vi delivery, dừng lại và sửa `slicing-profile.json` trước.

## 5. Harvest

Khi dry-run đúng và gate PASS, chạy:

```bash
npm run pull-code -- --project-path <ARCHITECTURE_PATH>
```

Workflow sẽ copy đúng các mapping harvest từ latest verified Satellite commit về Brain Project Workspace, prune file stale trong target directory của mapping, và cập nhật `active-hands.json` với SHA, CI status và thời điểm harvest.

Harvest thật sẽ fail closed nếu:

- mapping còn placeholder chưa được thay bằng path thật;
- source khai báo không tồn tại trong Satellite commit;
- nhiều mapping trỏ cùng một target;
- target đụng vùng Brain-protected.

Sau khi harvest, workflow tải `GATE_REPORT.md` artifact từ GitHub Actions về:

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
