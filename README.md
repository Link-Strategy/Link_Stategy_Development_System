# Hệ Thống Phát Triển Link Strategy

Repository này là **Master Monorepo do Brain kiểm soát** cho cỗ máy sản xuất phần mềm Link Strategy. Đây không phải một repo ứng dụng đơn lẻ. Vai trò của repo là lưu doctrine vận hành, tài sản tái sử dụng, script tự động hóa, workspace dự án và hồ sơ quản trị để sản xuất phần mềm theo vòng lặp **Spec-First** có thể lặp lại.

## Vai Trò Repository (Tầng MASTER)

Master Monorepo bảo vệ chủ quyền hệ thống của Link Strategy và là "The Root" của toàn bộ hệ sinh thái:

- **Master:** Nắm giữ bộ gen hệ thống (DNA), Engine, và Registry tổng (`active-projects.json`).
- **Brain (Project):** Được Master sinh ra để điều phối một dự án cụ thể, quản lý Satellite riêng qua `active-hands.json`.
- **Hands (Satellite):** Được Brain sinh ra để thi công module dựa trên Spec-First.
- **Sovereignty:** Tri thức tái sử dụng phải được harden từ Hands -> Brain -> Master.

## Cấu Trúc Gốc

| Đường dẫn | Vai trò |
| --- | --- |
| `.agents/` | Tài sản thực thi cho AI: rules, workflows, templates, skills, tools, datasets và ngữ cảnh tự động hóa. |
| `.LinkStrategy/` | Tài liệu quản trị Founder/Brain, hiến pháp vận hành, cấu hình hệ thống và chuẩn bàn giao. |
| `components/` | Component sản xuất dùng chung và tài sản triển khai tái sử dụng, gồm UI library. |
| `docs/` | Tài liệu làm việc, blueprint, ghi chú audit, tham chiếu vận hành và hồ sơ cấp dự án. |
| `projects/` | Workspace dự án client hoặc nội bộ được sinh và quản trị bởi production engine. |
| `scripts/` | Script hạ tầng và workflow dùng chung cho tạo dự án, gate verification và đăng ký asset. |
| `ASSET_INDEX.md` | Registry và điểm bootstrap để tìm rules, skills, tools, templates và shared assets. |
| `GEMINI.md` | Luật thực thi đang hoạt động cho AI Agent trong workspace này. |
| `backlog.md` | Backlog triển khai Base Platform. |

## Tài Liệu Vận Hành

Đọc các file này trước khi thay đổi cấu trúc platform hoặc luật delivery:

- [.LinkStrategy/00_BLUEPRINT_Link Strategy.md](<.LinkStrategy/00_BLUEPRINT_Link Strategy.md>)
- [.LinkStrategy/01_SOP_LINK_STRATEGY.md](.LinkStrategy/01_SOP_LINK_STRATEGY.md)
- [.LinkStrategy/02_FULL_SYSTEM_CONFIGURATION.md](.LinkStrategy/02_FULL_SYSTEM_CONFIGURATION.md)
- [.LinkStrategy/03_HANDOVER_SPEC.md](.LinkStrategy/03_HANDOVER_SPEC.md)
- [ASSET_INDEX.md](ASSET_INDEX.md)
- [GEMINI.md](GEMINI.md)

## Kiến Trúc 4 Plane

| Plane | Mục đích | Vị trí chính |
| --- | --- | --- |
| Control Plane | Định nghĩa luật, workflow, doctrine và quyền nghiệm thu. | `.LinkStrategy/`, `.agents/rules/`, `.agents/workflows/`, `GEMINI.md` |
| Communication Plane | Ghi tài liệu dự án, spec, quyết định, ghi chú bàn giao và tiến độ thi công. | `docs/`, Hands/Satellite `01_TASK_SPEC.md`, `02_DECISION_LOGS.md`, `03_LOGS.md` |
| Execution Plane | Cung cấp skills, tools, scripts, project workspaces và shared components. | `.agents/skills/`, `.agents/tools/`, `scripts/`, `projects/`, `components/` |
| Audit Plane | Lưu bằng chứng review, gate result, decision log và ledger tương lai. | `docs/audit/`, `.agents/datasets/`, scorecards, gate reports |

## Mô Hình Làm Việc

Repository vận hành theo vòng lặp hardened của Link Strategy:

1. **Spec-First:** mọi task bắt đầu từ blueprint/đặc tả bằng văn bản.
2. **Isolation:** thi công được cô lập theo project/module/Hands workspace.
3. **Execution Visibility:** tiến độ được theo dõi qua commit và log.
4. **Verification Gate:** delivery phải vượt qua kiểm tra khách quan; Brain chỉ harvest commit Satellite đã pass CI.
5. **Hardening:** logic, pattern và workflow có thể tái sử dụng được trích xuất thành asset.

## Năng Lực Hệ Thống Hiện Tại

Hệ thống Link Strategy đã hoàn thiện các cơ chế cốt lõi để vận hành tự động:

- **3-Tier Hierarchy:** Chuẩn hóa Hiến pháp GEMINI và quyền hạn cho Master, Brain và Hands.
- **DNA Transmission:** `ASSET_INDEX.md` được truyền thẳng từ Master xuống Brain để duy trì tính nhất quán tri thức.
- **Batch Push Rules:** Hỗ trợ đồng bộ hàng loạt DNA, Spec và Assets từ Brain xuống toàn bộ Satellite trong `active-hands.json` chỉ bằng một lệnh.
- **Verification Gate:** Chốt chặn kỹ thuật tự động kiểm tra tính toàn vẹn của Rules và Engine tại local và CI.
- **Spec-Driven Delivery:** Brain sở hữu và đẩy Spec xuống Hands; Hands thực thi và nộp bằng chứng qua Logs.

## Lệnh Vận Hành Nhanh

Base Platform dùng Node.js engine qua các lệnh:

```bash
npm run new-project   # Master: Tạo Brain Project mới
npm run new-hands     # Brain: Tạo Satellite/Hands mới trong dự án
npm run new-module    # Brain: Tạo module nhỏ trong dự án
npm run verify-gate   # Master/Brain/Hands: Kiểm tra chốt chặn kỹ thuật
npm run push-rules    # Brain: Ép DNA, Spec và Assets xuống Hands (hỗ trợ --all)
npm run pull-code     # Brain: Thu hoạch code từ Hands sau khi PASS gate
npm run ls-gitpush    # Hands: Bàn giao bài làm cho Brain
```

## Tạo Brain Project Workspace

Lệnh chuẩn:

```bash
npm run new-project -- --project-name "<PROJECT_NAME>"
```

Mặc định `new-project` sẽ cố tạo GitHub repo bằng `gh repo create`, push initial commit và lưu `remote_url` vào `active-projects.json`. Nếu chỉ muốn tạo local workspace, thêm `--no-github`. Nếu repo đã có sẵn, truyền `--remote-url "<URL>"` để registry lưu URL đó.

Kết quả mặc định:

```text
../<PROJECT_NAME>/
|-- .agents/
|   |-- rules/
|   |-- workflows/
|   |-- templates/
|   |-- tools/ls-engine/
|   `-- skills/
|-- .github/
|-- assets/
|-- components/ui/
|-- docs/
|-- .env.example
|-- active-hands.json
|-- GEMINI.md
|-- package.json
`-- README.md
```

### File Bàn Giao Khi `new-project`

Gói Brain Project được sinh ra để Brain có thể quản lý dự án độc lập:

| File/thư mục | Mục đích bàn giao |
| --- | --- |
| `GEMINI.md` | Hiến pháp vận hành riêng cho Brain Project. |
| `docs/` | Kho tài liệu dự án do Brain tự do xác định cấu trúc, tên file và nội dung. Không sinh template mặc định. |
| `.env.example` | Mẫu biến môi trường không chứa secret thật. |
| `README.md` | Hướng dẫn vận hành nhanh cho Brain Project. |
| `package.json` | Command surface cho Brain: `new-hands`, `push-rules`, `pull-code`, `verify-gate`, `self-test`. |
| `active-hands.json` | Registry theo dõi các Hands/Satellite repo của project. |
| `active-projects.json` | Registry tại Master được cập nhật với `path` và `remote_url` của Brain Project. |
| `.agents/rules/` | Bộ luật bắt buộc cho governance, gate, handover, commit và secret. |
| `.agents/workflows/` | Workflow chuẩn cho tạo project, onboarding Hands, sync và delivery. |
| `.agents/templates/` | Template spec, decision logs, logs, env, gate và GitHub workflow. |
| `.agents/tools/ls-engine/` | Engine Node.js dùng để chạy automation trong project. |
| `.agents/skills/` | Skill assets được đồng bộ từ Master. |
| `.github/` | CODEOWNERS, PR template, issue template và GitHub Actions gate. |
| `components/ui/` | UI kit/shared component asset để project ưu tiên tái sử dụng. |
| `assets/` | Khu vực chứa tài sản dự án. |

Việc cần làm ngay sau khi tạo project:

1. Brain tự xác định cấu trúc tài liệu cần lưu trong `docs/`.
2. Khi cần giao việc thi công, chọn path kiến trúc cho Hands/Satellite rồi chạy `npm run new-hands`.

## Tạo Hands/Satellite Workspace

Tên workflow thường được gọi là `new-hand`, nhưng command hiện hành trong `package.json` là `new-hands`.

`new-hands` nhận path kiến trúc do Brain chọn và tự tạo folder nếu path đó chưa tồn tại:

```bash
npm run new-hands -- --project-path "./services/<NAME>" --repo-name "<REPO_NAME>"
```

Sau khi bootstrap thành công, kết quả tối thiểu trong Hands/Satellite repo:

```text
services/<NAME>/
|-- .agents/
|   |-- rules/
|   |-- workflows/
|   |-- templates/
|   `-- tools/ls-engine/
|-- .github/
|-- src/
|-- tests/
|-- .env.example
|-- .gitignore
|-- 01_TASK_SPEC.md
|-- 02_DECISION_LOGS.md
|-- 03_LOGS.md
|-- GEMINI.md
|-- package.json
`-- README.md
```

### File Bàn Giao Khi `new-hands`

Gói Hands/Satellite được sinh ra để Hands có thể thi công, kiểm chứng và nộp bài:

| File/thư mục | Mục đích bàn giao |
| --- | --- |
| `GEMINI.md` | Hiến pháp dành riêng cho AI Hands/Satellite Agent. |
| `01_TASK_SPEC.md` | Spec thi công mà Hands phải bám sát. Nếu Brain đã có spec riêng, cần đồng bộ nội dung trước khi giao. |
| `02_DECISION_LOGS.md` | Nơi Hands ghi câu hỏi, đề xuất và quyết định đã được Brain chốt. |
| `03_LOGS.md` | Nhật ký thi công, bằng chứng chạy test/gate và blocker. |
| `README.md` | Mô tả repo Satellite và hướng dẫn bắt đầu. |
| `package.json` | Chỉ expose lệnh Hands được phép dùng: `verify-gate` và `ls-gitpush`. |
| `.env.example` | Mẫu cấu hình môi trường, không chứa secret thật. |
| `.gitignore` | Chặn secret, dependency/build artifacts và report sinh tự động. |
| `.agents/rules/` | Luật thi công bắt buộc được Brain/Master đồng bộ xuống. |
| `.agents/workflows/` | Workflow nộp bài, gate và sync rules. |
| `.agents/templates/` | Template cần thiết cho log/spec/gate trong Satellite. |
| `.agents/tools/ls-engine/` | Engine để Hands chạy `verify-gate` và `ls-gitpush`. |
| `.github/CODEOWNERS` | Khai báo quyền sở hữu/review của Brain. |
| `.github/pull_request_template.md` | Checklist PR và bằng chứng delivery. |
| `.github/ISSUE_TEMPLATE/task_spec.yml` | Issue template cho task/spec. |
| `.github/workflows/verify-gate.yml` | GitHub Actions kiểm tra delivery gate. |
| `.github/workflows/rules-protection.yml` | GitHub Actions bảo vệ rule/governance assets. |
| `src/` | Nơi Hands triển khai code. |
| `tests/` | Nơi Hands viết và chạy test. |

Sau khi `new-hands` chạy xong, workflow sẽ:

1. Tạo folder `--project-path` nếu chưa có.
2. Khởi tạo Git repo nếu chưa có.
3. Tạo `src/` và `tests/` bên trong Hands/Satellite repo nếu chưa có.
4. Đồng bộ governance/runtime từ Brain Project xuống Satellite.
5. Validate layout bắt buộc.
6. Commit initial governance.
7. Tạo hoặc dùng GitHub remote `origin`.
8. Push branch `main`.
9. Ghi thông tin Hands vào `active-hands.json` của Brain Project.

## Tạo Module Workspace

Lệnh chuẩn:

```bash
npm run new-module -- --project-path "<PROJECT_PATH>" --module-name "<MODULE_NAME>"
```

Kết quả:

```text
<PROJECT_PATH>/
|-- src/
|   `-- <MODULE_NAME>/
|       `-- README.md
`-- docs/
    `-- blueprints/
        `-- <MODULE_NAME>/
            `-- 01_TASK_SPEC.md
```

Module phải đủ nhỏ để có thể thi công, review và thay Hands độc lập trong vòng 24 giờ.

## Trạng Thái Platform Hiện Tại

Repo hiện đã có cấu trúc nền, tài liệu quản trị ban đầu và Node.js automation cho project factory, satellite onboarding, gate verification, rule sync, code harvest và safe delivery. Các phần chuẩn hóa sâu hơn vẫn tiếp tục được theo dõi trong [backlog.md](backlog.md).
