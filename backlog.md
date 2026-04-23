# BACKLOG - LINK STRATEGY BASE PLATFORM

Tài liệu này chuyển các yêu cầu trong bộ blueprint hiện hành `.LinkStrategy/00_BLUEPRINT_Link Strategy.md`, `.LinkStrategy/01_SOP_LINK_STRATEGY.md`, `.LinkStrategy/02_FULL_SYSTEM_CONFIGURATION.md` và `.LinkStrategy/03_HANDOVER_SPEC.md` thành backlog hành động để triển khai base platform cho Software Production Engine.

## Mục Tiêu

Xây dựng một base platform có thể:

- Sinh project/module mới theo chuẩn Spec-First.
- Cấp phát handover package rõ ràng cho Hands/Freelancer.
- Ép mọi delivery đi qua verification gate.
- Tích lũy asset tái sử dụng sau mỗi vòng triển khai.
- Duy trì audit trail, daily log và knowledge continuity.
- Bảo vệ Brain sovereignty: architecture, acceptance criteria và asset library thuộc quyền kiểm soát của Link Strategy.

## Nguyên Tắc Ưu Tiên

1. System sovereignty trước delivery speed.
2. Verification-first trước báo cáo miệng.
3. Hardening potential trước bespoke implementation.
4. Auditability trước tiện lợi vận hành.
5. Automation dần dần, nhưng workflow phải rõ ngay từ đầu.

## Tình Trạng Rà Soát Repo

Ngày rà soát: 2026-04-23.

### Đã Có Trong Repo

- [x] Có các thư mục lõi: `.agents/`, `.LinkStrategy/`, `components/`, `projects/`, `scripts/`, `docs/`.
- [x] Có bộ blueprint hiện hành trong `.LinkStrategy/`: `00_BLUEPRINT_Link Strategy.md`, `01_SOP_LINK_STRATEGY.md`, `02_FULL_SYSTEM_CONFIGURATION.md`, `03_HANDOVER_SPEC.md`.
- [x] Có `README.md` ở root mô tả Master Monorepo, 4-plane architecture và quickstart tối thiểu.
- [x] Có `ASSET_INDEX.md` đã chuyển thành registry chuẩn có status `Active`, `Draft`, `Placeholder`, `Planned`.
- [x] Có `GEMINI.md`, đã hoàn thiện bootstrap order và strategic alignment.
- [x] Có `.gitignore` đã bảo vệ `.env`, secret, cache, build output và vẫn cho phép `.env.example`.
- [x] Có `.agents/templates/01_TASK_SPEC_TEMPLATE.md` với cấu trúc bám 5 Pillars/8 phần handover ở mức nền.
- [x] Có `.agents/templates/LOGS_TEMPLATE.md`, nhưng còn thiếu Commit Links, Risk và Handover Note.
- [x] Có `docs/blueprints/01_TASK_SPEC.md` cho task push repo lên GitHub.
- [x] Có root `LOGS.md` ghi nhận phiên làm việc trước.

### Đang Là Placeholder Hoặc Chưa Đạt Chuẩn

- [ ] Còn cần quyết định chính sách canonical version cho bộ blueprint: giữ `00/01/02/03` hay tạo alias/rename nếu `04/05/06` là chuẩn mới.
- [x] `.agents/rules/ls-rule-master-governance.md` đã hoàn thiện.
- [x] `.agents/workflows/ls-workflow-delivery-loop.md` đã hoàn thiện.
- [ ] `.agents/templates/02_QA_LOGS_TEMPLATE.md` đang rỗng.
- [ ] `components/ui/README.md` đang rỗng.
- [ ] `scripts/README.md` đang rỗng.
- [ ] Chưa có `scripts/new-project.ps1`.
- [ ] Chưa có `scripts/new-module.ps1`.
- [ ] Chưa có `scripts/verify-gate.ps1`.
- [ ] Chưa có scorecard template, hardening proposal template, security checklist, onboarding/offboarding checklist.
- [x] Đã có Git enforcement layer: PR template, CODEOWNERS, conventional commit policy.
- [ ] Chưa có branch protection checklist.

---

## Phase 1: Hardening & Enforcement
*Thiết lập hạ tầng cốt lõi, luật pháp và các chốt chặn bảo mật tuyệt đối trước khi mở repo.*

### 1.0.0 - Đồng bộ source-of-truth blueprint

- [x] Hành động: Xác nhận bộ blueprint hiện hành trong `.LinkStrategy/` là `00_BLUEPRINT_Link Strategy.md`, `01_SOP_LINK_STRATEGY.md`, `02_FULL_SYSTEM_CONFIGURATION.md`, `03_HANDOVER_SPEC.md`.
- [x] Hành động: Cập nhật toàn bộ tham chiếu nội bộ còn trỏ sang `04_SOP_LINK_STRATEGY.md`, `05_FULL_SYSTEM_CONFIGURATION.md`, `06_HANDOVER_SPEC.md`. (Đã sửa sơ đồ trong 02_FULL).
- [x] Hành động: Quyết định chính sách version tài liệu: giữ `00/01/02/03` làm chuẩn canonical hiện hành.
- [x] Hành động: Xác nhận việc di chuyển BRD/PRD cũ vào `.LinkStrategy/Projects/`.
- Đầu ra: Không còn link chết hoặc nhầm version tài liệu blueprint.
- DoD: `rg "04_SOP|05_FULL|06_HANDOVER"` không còn kết quả ngoài ghi chú migration có chủ đích.
- Ưu tiên: P0.

### 1.0.1 - Chuẩn hóa cấu trúc root repo

- [x] Hành động: Kiểm tra và xác nhận các thư mục lõi tồn tại: `.agents/`, `.LinkStrategy/`, `components/`, `projects/`, `scripts/`, `docs/`.
- [x] Hành động: Ghi rõ vai trò từng thư mục trong root `README.md` nếu file này chưa tồn tại.
- Đầu ra: Root repo có mô tả rõ đây là Master Monorepo của Brain.
- DoD: Người mới đọc root README hiểu được repo này dùng để quản trị production engine, không phải chỉ là một app đơn lẻ.
- Ưu tiên: P0.

### 1.0.2 - Tạo root README cho Master Monorepo

- [x] Hành động: Tạo `README.md` ở root.
- [x] Hành động: Mô tả 4-plane architecture: Control Plane, Communication Plane, Execution Plane, Audit Plane.
- [x] Hành động: Liên kết đến `ASSET_INDEX.md`, `GEMINI.md`, `.LinkStrategy/00_BLUEPRINT_Link Strategy.md`, `.LinkStrategy/01_SOP_LINK_STRATEGY.md`, `.LinkStrategy/02_FULL_SYSTEM_CONFIGURATION.md`, `.LinkStrategy/03_HANDOVER_SPEC.md`.
- Đầu ra: Entry point chính cho Brain, AI Agent và Hands.
- DoD: README có quickstart tối thiểu cho việc tạo project/module mới.
- Ưu tiên: P0.

### 1.0.3 - Chuẩn hóa `.gitignore`

- [x] Hành động: Kiểm tra `.gitignore`.
- [x] Hành động: Đảm bảo không commit `.env`, secret, local build artifacts, cache, node_modules, coverage output và temporary logs.
- Đầu ra: `.gitignore` bảo vệ secret và artifact rác.
- DoD: Có rule rõ cho `.env*`, trừ `.env.example`.
- Ưu tiên: P0.

### 1.1.0 - Đưa Strategic Blueprint vào governance layer

- [x] Hành động: Đăng ký `.LinkStrategy/00_BLUEPRINT_Link Strategy.md` trong `ASSET_INDEX.md` như `strategic-business-blueprint`.
- [x] Hành động: Cập nhật `GEMINI.md` bootstrap order để đọc Strategic Blueprint trước SOP/System/Handover khi task có tác động đến roadmap, offer, module hóa hoặc SaaS layer.
- [x] Hành động: Bổ sung rule: mọi hardening asset phải liên kết được với chiến lược `Pain -> Module -> Case Study -> Playbook -> SaaS`.
- Đầu ra: Backlog kỹ thuật không tách rời định hướng business blueprint.
- DoD: Agent/Brain biết khi nào phải tham chiếu blueprint chiến lược trước khi quyết định build/harden asset.
- Ưu tiên: P0.

### 1.1.1 - Hoàn thiện `ASSET_INDEX.md`

- [x] Hành động: Chuyển `ASSET_INDEX.md` thành registry chuẩn cho Rules, Skills, Tools, Workflows, Templates, Components và Datasets.
- [x] Hành động: Mỗi asset cần có các trường: name, type, path, owner, status, input, output, mandatory usage, related docs.
- [x] Hành động: Đánh dấu asset nào đang là placeholder.
- Đầu ra: Asset index có thể dùng làm điểm bootstrap đầu phiên cho AI Agent.
- DoD: Agent đọc `ASSET_INDEX.md` biết asset nào được dùng, dùng khi nào và nằm ở đâu.
- Ưu tiên: P0.

### 1.1.2 - Chuẩn hóa `GEMINI.md`

- [x] Hành động: Rà soát `GEMINI.md` để biến thành execution rule ngắn gọn, không mơ hồ.
- [x] Hành động: Thêm bootstrap order: đọc Constitution, đọc System Configuration, đọc Handover Spec, đọc Asset Index, đọc task spec.
- [x] Hành động: Thêm rule không tự viết lại logic nếu asset đã tồn tại.
- [x] Hành động: Thêm rule bắt buộc cập nhật `LOGS.md` sau phiên làm việc.
- Đầu ra: Rule file đủ dùng cho AI Agent trong workspace.
- DoD: `GEMINI.md` thể hiện rõ quyền quyết định của Brain và workflow Spec-First.
- Ưu tiên: P0.

### 1.1.3 - Đổi tên placeholder rule

- [x] Hành động: Đổi `.agents/rules/1.md` thành `.agents/rules/ls-rule-master-governance.md`.
- [x] Hành động: Điền nội dung rule gồm Brain sovereignty, Spec-First, Verification Gate, Hardening và Audit.
- Đầu ra: Rule đầu tiên có tên chuẩn `ls-rule-*`.
- DoD: Không còn file rule tên `1.md` không có ý nghĩa.
- Ưu tiên: P0.

### 1.1.4 - Đổi tên placeholder workflow

- [x] Hành động: Đổi `.agents/workflows/1.md` thành `.agents/workflows/ls-workflow-delivery-loop.md`.
- [x] Hành động: Mô tả SDLC 5 giai đoạn: Spec-First, Bidding & Isolation, Execution, Gate, Hardening.
- Đầu ra: Workflow đầu tiên có thể dùng làm chuẩn vận hành.
- DoD: Không còn workflow placeholder rỗng.
- Ưu tiên: P0.

### 1.3.1 - Tạo script sinh project mới

- [x] Hành động: Tạo `scripts/new-project.ps1`.
- [x] Hành động: Input gồm `client_id`, `project_name`, `project_type`.
- [x] Hành động: Output tạo thư mục `projects/[CLIENT_ID]-[PROJECT_NAME]/`.
- [x] Hành động: Copy templates vào `docs/blueprints/`.
- [x] Hành động: Tạo `src/`, `tests/`, `docs/`, `README.md`, `LOGS.md`.
- Đầu ra: Project mới được sinh nhất quán.
- DoD: Chạy một lệnh có thể tạo project skeleton đầy đủ.
- Ưu tiên: P0.

### 1.3.2 - Tạo script sinh module mới trong project

- [x] Hành động: Tạo `scripts/new-module.ps1`.
- [x] Hành động: Input gồm `project_path`, `module_name`, `module_type`.
- [x] Hành động: Output tạo module folder với `src/`, `tests/`, `docs/blueprints/`, README và local logs.
- Đầu ra: Module-based tasking rõ ràng.
- DoD: Có thể giao module độc lập cho Hands mà không lẫn với module khác.
- Ưu tiên: P0.

### 1.3.3 - Tạo `.env.example` template

- [ ] Hành động: Tạo template `.agents/templates/ENV_EXAMPLE_TEMPLATE`.
- [ ] Hành động: Script project factory copy thành `.env.example`.
- [ ] Hành động: Không bao giờ tạo `.env` thật.
- Đầu ra: Secret protocol rõ ràng.
- DoD: Project mới có hướng dẫn biến môi trường nhưng không chứa secret.
- Ưu tiên: P1.

### 1.3.4 - Tạo project mẫu

- [x] Hành động: Dùng project factory để tạo `projects/DEMO-BASE-PLATFORM`.
- [x] Hành động: Điền spec mẫu tối thiểu.
- [x] Hành động: Dùng project mẫu để kiểm tra template, logs và gate.
- Đầu ra: Reference implementation cho workflow.
- DoD: Người mới có thể học quy trình bằng cách đọc project mẫu.
- Ưu tiên: P1.

### 1.4.1 - Tạo `scripts/verify-gate.ps1`

- [x] Hành động: Tạo script chấm gate bán tự động.
- [x] Hành động: Kiểm tra tồn tại task spec, QA log, LOGS, README, tests folder, hardening proposal.
- [x] Hành động: Kiểm tra tồn tại blueprint alignment đối với module có tác động chiến lược.
- [x] Hành động: Nếu project có package/test command, chạy test tương ứng (Cơ bản).
- [x] Hành động: Xuất báo cáo Markdown hoặc JSON (Output terminal).
- Đầu ra: Gate đầu tiên chạy được trong local.
- DoD: Một module có thể được chấm pass/fail tối thiểu.
- Ưu tiên: P0.

### 1.4.2 - Tạo Scorecard format

- [x] Hành động: Tạo `.agents/templates/GATE_SCORECARD_TEMPLATE.md`.
- [x] Hành động: Ánh xạ đúng trọng số: Unit Test 30, Clean Code 20, Documentation 20, Hardening Ready 10, Security & Debt 20.
- [x] Hành động: Thêm payment logic: >=80 pass, 70-79 partial, <70 reject.
- [x] Hành động: Thêm phần không tính điểm nhưng bắt buộc review: strategic leverage, case-study potential, SaaS/module pathway.
- Đầu ra: Scorecard thống nhất với SOP.
- DoD: Brain có thể nghiệm thu bằng cùng một bảng điểm.
- Ưu tiên: P0.

### 1.4.3 - Tạo clean-code checklist

- [ ] Hành động: Tạo `.agents/templates/CLEAN_CODE_CHECKLIST_TEMPLATE.md`.
- [ ] Hành động: Bao gồm modularity, naming, duplication, error handling, tests, dependency usage.
- Đầu ra: Review kỹ thuật có checklist.
- DoD: Review không phụ thuộc cảm tính của từng người.
- Ưu tiên: P1.

### 1.4.4 - Chuẩn bị CI/CD gate về sau

- [ ] Hành động: Thiết kế file workflow mẫu nhưng chưa cần bật tự động nếu repo chưa có stack cụ thể.
- [ ] Hành động: Ghi rõ command contract: lint, test, coverage, security audit.
- [ ] Hành động: Tạo `.github/workflows/gate-template.yml` hoặc tài liệu CI gate contract nếu chưa bật GitHub Actions.
- [ ] Hành động: Chuẩn hóa output gate report: test result, coverage, lint, security scan, docs evidence, hardening evidence.
- Đầu ra: Có đường nâng cấp từ local gate sang CI gate.
- DoD: Khi có stack cụ thể, chỉ cần map command vào contract.
- Ưu tiên: P2.

### 1.4.5 - Tạo Git enforcement checklist

- [ ] Hành động: Tạo `.agents/templates/BRANCH_PROTECTION_CHECKLIST.md`.
- [ ] Hành động: Tạo `CODEOWNERS` hoặc `.github/CODEOWNERS` để thể hiện Brain ownership.
- [ ] Hành động: Tạo PR template bắt buộc tick spec, tests, docs, security, hardening proposal.
- [ ] Hành động: Tạo conventional commit policy và checklist kiểm tra commit message.
- [ ] Hành động: Ghi rõ no-force-push, required review, required status checks, protected main branch.
- Đầu ra: Brain sovereignty được enforce ở Git workflow, không chỉ trong tài liệu.
- DoD: Main branch có checklist bảo vệ merge và review trước khi Hands code thật.
- Ưu tiên: P0.

### 1.5.1 - Thiết lập Permission Matrix (Action vs Inquiry) (URGENT)

- [ ] Hành động: Tạo `.agents/rules/ls-rule-action-inquiry-lane.md`.
- [ ] Hành động: Phân loại hành động nhạy cảm của AI Agent/Hands.
- [ ] Hành động: Gắn rule phê duyệt (Approval Required) cho các hành động xâm lấn (Write/Delete/External).
- Đầu ra: Cơ chế bảo vệ hệ thống khỏi các hành động tự ý của Hands.
- DoD: Không có Action nào được thực thi nếu không nằm trong danh mục cho phép hoặc được Brain duyệt.
- Ưu tiên: P0 (Priority Bump from Phase 2).

### 1.5.2 - Thiết lập Security Automation Baseline (URGENT)

- [ ] Hành động: Tạo `.agents/templates/THREAT_MODEL_TEMPLATE.md`.
- [ ] Hành động: Tích hợp Dependency Scan và SAST baseline vào workflow.
- Đầu ra: Quy trình rà quét rủi ro tự động.
- DoD: Module rủi ro cao phải có bằng chứng quét bảo mật trước khi vào Gate.
- Ưu tiên: P1 (Priority Bump from Phase 2).

### 1.7.1 - Thiết kế satellite repo contract

- [x] Hành động: Tạo `docs/satellite-repo-contract.md`. (Đã tích hợp vào Sync Linkage).
- [x] Hành động: Mô tả cấu trúc satellite: `src/`, `tests/`, `docs/blueprints/`, `.cursorrules`, `README.md`.
- [x] Hành động: Mô tả file nào read-only từ Brain.
- Đầu ra: Contract rõ cho repo giao freelancer.
- DoD: Có thể tạo satellite thủ công hoặc tự động theo contract.
- Ưu tiên: P2.

### 1.7.2 - Thiết kế sync linkage

- [x] Hành động: Tạo `docs/sync-linkage.md`.
- [x] Hành động: Mô tả Push-to-Satellite và Pull-to-Master.
- [x] Hành động: Chỉ rõ conflict handling và quyền merge.
- Đầu ra: Cơ chế đồng bộ có thiết kế trước khi automation.
- DoD: Brain biết dữ liệu đi chiều nào, lúc nào, ai duyệt.
- Ưu tiên: P2.

### 1.7.3 - Tạo `.cursorrules` hoặc agent rules template cho satellite

- [x] Hành động: Tạo `.agents/templates/CURSORRULES_TEMPLATE`. (Đã tích hợp vào Project Factory).
- [x] Hành động: Nội dung ép đọc task spec, QA log, LOGS, asset index và rules.
- [x] Hành động: Tạo script đồng bộ tự động `push-rules-to-satellite.ps1` và `pull-code-from-satellite.ps1`.
- Đầu ra: Context injection cho Hands.
- DoD: Satellite mới có rule bootstrapping nhất quán và có cơ chế đồng bộ tự động.
- Ưu tiên: P1.

### 1.8.1 - Tạo secret management policy

- [x] Hành động: Tạo `.agents/rules/ls-rule-secret-management.md`.
- [x] Hành động: Cấm commit secret, cấm dùng production credential trong local/satellite.
- [x] Hành động: Quy định `.env.example`, secret manager và key revocation.
- Đầu ra: Secret protocol thành rule.
- DoD: Hands biết cách dùng biến môi trường mà không chạm secret thật.
- Ưu tiên: P0.

### 1.10.1 - Thiết lập GitHub repository controls

- [x] Hành động: Tạo `CODEOWNERS` để thể hiện Brain ownership.
- [ ] Hành động: Tạo checklist cấu hình branch protection cho `main`.
- [ ] Hành động: Yêu cầu PR review trước merge.
- [ ] Hành động: Yêu cầu status checks cho gate khi CI sẵn sàng.
- [ ] Hành động: Cấm force push vào branch chính.
- [ ] Hành động: Ghi rõ quyền merge chỉ thuộc Brain hoặc Brain Delegate.
- Đầu ra: Repository policy phản ánh Brain sovereignty.
- DoD: Có tài liệu hoặc checklist cấu hình GitHub để áp dụng trước khi mở repo cho Hands.
- Ưu tiên: P0.

### 1.10.2 - Thiết lập PR-based delivery workflow

- [x] Hành động: Tạo `.github/pull_request_template.md`.
- [ ] Hành động: Tạo `.github/ISSUE_TEMPLATE/task_spec.yml` hoặc Markdown task issue template.
- [ ] Hành động: Tạo rule mỗi PR phải link `01_TASK_SPEC.md`, `02_QA_LOGS.md`, test evidence và hardening proposal.
- [ ] Hành động: Tạo review checklist for Brain.
- Đầu ra: Delivery luôn đi qua PR có bằng chứng.
- DoD: Không có code vào main nếu thiếu spec/test/docs/security/hardening evidence.
- Ưu tiên: P0.

### 1.10.3 - Thiết lập conventional commit enforcement

- [x] Hành động: Tạo `.agents/rules/ls-rule-conventional-commits.md`.
- [x] Hành động: Định nghĩa commit types: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `harden`.
- [ ] Hành động: Tạo script hoặc checklist kiểm tra commit history trước nghiệm thu.
- Đầu ra: Git history đọc được để thay thế Hands trong 24h.
- DoD: PR có commit history đủ rõ cho AI/Brain hiểu tiến độ mà không cần họp.
- Ưu tiên: P1.

### 1.10.4 - Thiết lập delivery evidence archive

- [ ] Hành động: Tạo cấu trúc `docs/audit/gate-reports/`.
- [ ] Hành động: Tạo cấu trúc `docs/audit/review-reports/`.
- [ ] Hành động: Tạo cấu trúc `docs/audit/security-reports/`.
- [ ] Hành động: Quy định naming for evidence theo project/module/date.
- Đầu ra: Mọi nghiệm thu có nơi lưu bằng chứng.
- DoD: Brain có thể audit lại quyết định nghiệm thu sau này.
- Ưu tiên: P1.

### 1.10.5 - Thiết lập acceptance and payment decision record

- [ ] Hành động: Tạo `.agents/templates/PAYMENT_DECISION_RECORD_TEMPLATE.md`.
- [ ] Hành động: Liên kết scorecard với quyết định pass/partial/reject.
- [ ] Hành động: Ghi rõ reviewer, date, score, blockers, payout decision, remaining obligations.
- Đầu ra: Payment logic có audit trail.
- DoD: Không giải ngân nếu thiếu scorecard và payment decision record.
- Ưu tiên: P1.

---

## Phase 2: Standardization & Support
*Hoàn thiện tài liệu mẫu, hỗ trợ phát triển và quản trị tri thức.*

### 2.2.1 - Hoàn thiện `01_TASK_SPEC_TEMPLATE.md`

- [x] Hành động: Cập nhật template để bám đủ 5 Pillars trong SOP và 8 thành phần trong Handover Spec.
- [ ] Hành động: Tách rõ phần bắt buộc cho mọi task và phần chỉ áp dụng cho microservice.
- [ ] Hành động: Thêm checklist No Ambiguity: freelancer mới không cần hỏi quá 3 câu về business logic.
- [ ] Hành động: Thêm trường Strategic Blueprint Alignment: pain cụ thể, module hóa, case-study potential, playbook/SaaS potential.
- Đầu ra: Task spec template đủ làm hợp đồng triển khai.
- DoD: Một module mới có thể bắt đầu từ template này mà không cần tài liệu rời.
- Ưu tiên: P0.

### 2.2.2 - Hoàn thiện `02_QA_LOGS_TEMPLATE.md`

- [x] Hành động: Điền nội dung template hiện đang rỗng.
- [x] Hành động: Thêm cấu trúc: question, answer, decision, owner, date, impact area, status.
- [x] Hành động: Thêm rule: mọi trao đổi logic phải được ghi vào QA log, không chỉ chat ngoài.
- Đầu ra: QA log có thể dùng làm communication plane.
- DoD: Mỗi quyết định quan trọng có dấu vết trong file này.
- Ưu tiên: P0.

### 2.2.3 - Hoàn thiện `LOGS_TEMPLATE.md`

- [ ] Hành động: Chuẩn hóa daily log thành Done, Block, Next, Commit Links, Risk, Handover Note.
- [ ] Hành động: Thêm yêu cầu cập nhật cuối ngày hoặc cuối phiên.
- Đầu ra: Template phục vụ thay thế Hands trong 24h.
- DoD: Người mới đọc log biết đã xong gì, đang kẹt gì, bước tiếp theo là gì.
- Ưu tiên: P0.

### 2.2.4 - Tạo `HARDENING_PROPOSAL_TEMPLATE.md`

- [x] Hành động: Tạo template trong `.agents/templates/`.
- [x] Hành động: Thêm các mục: source module, reusable logic, abstraction plan, input/output, dependencies, security notes, documentation needed.
- Đầu ra: Mọi PR/milestone có format đề xuất asset hóa.
- DoD: Freelancer có thể đề xuất ít nhất 1 asset hardening theo chuẩn.
- Ưu tiên: P1.

### 2.2.5 - Tạo `DECISION_LOG_TEMPLATE.md`

- [ ] Hành động: Tạo template ghi architectural decision.
- [ ] Hành động: Thêm các mục: context, decision, alternatives, consequences, owner, approved by Brain, date.
- Đầu ra: Brain continuity không phụ thuộc trí nhớ cá nhân.
- DoD: Mọi thay đổi kiến trúc có thể ghi thành decision log.
- Ưu tiên: P1.

### 2.2.6 - Tạo `SECURITY_CHECKLIST_TEMPLATE.md`

- [ ] Hành động: Tạo checklist bảo mật cơ bản cho handover package.
- [ ] Hành động: Bao gồm secret handling, injection, XSS, auth, authorization, logging, dependency risk.
- Đầu ra: Checklist dùng trong Gate Scorecard.
- DoD: Security review không còn chỉ là nhận xét tự do.
- Ưu tiên: P1.

### 2.2.7 - Tạo `BLUEPRINT_ALIGNMENT_TEMPLATE.md`

- [ ] Hành động: Tạo template kiểm tra task/module có bám `00_BLUEPRINT_Link Strategy.md` hay không.
- [ ] Hành động: Bao gồm các trường: target pain, ICP, monetization layer, reusable module potential, case-study potential, SaaS pathway.
- [ ] Hành động: Liên kết template này vào `01_TASK_SPEC_TEMPLATE.md` hoặc dùng như phụ lục bắt buộc cho module chiến lược.
- Đầu ra: Mỗi module quan trọng đều có lý do chiến lược, không chỉ lý do kỹ thuật.
- DoD: Brain có thể loại bỏ task bespoke không tạo leverage dài hạn.
- Ưu tiên: P1.

### 2.2.8 - Tạo technical handover artefact templates

- [ ] Hành động: Tạo `.agents/templates/OPENAPI_TEMPLATE.yaml` hoặc `SERVICE_CONTRACT_TEMPLATE.md`.
- [ ] Hành động: Tạo `.agents/templates/DOCKER_COMPOSE_TEMPLATE.yml`.
- [ ] Hành động: Tạo `.agents/templates/MOCK_SERVER_SPEC_TEMPLATE.md`.
- [ ] Hành động: Tạo `.agents/templates/SEED_DATA_SPEC_TEMPLATE.md`.
- [ ] Hành động: Tạo `.agents/templates/DATA_SCHEMA_TEMPLATE.md` cho ERD/table/collection contract.
- [ ] Hành động: Tạo `.agents/templates/EVENT_CONTRACT_TEMPLATE.md` cho topic/queue/message schema.
- [ ] Hành động: Tạo `.agents/templates/ERROR_CODE_TABLE_TEMPLATE.md`.
- [ ] Hành động: Tạo `.agents/templates/OBSERVABILITY_TEMPLATE.md` với yêu cầu `trace_id`, structured logs và correlation.
- Đầu ra: Handover package có đủ artefact kỹ thuật theo `03_HANDOVER_SPEC.md`.
- DoD: Một service/module mới có thể nhận đủ API/schema/sandbox/mock/observability contract trước khi code.
- Ưu tiên: P0.

### 2.2.9 - Tạo communication and review templates

- [ ] Hành động: Tạo `.agents/templates/TASK_TICKET_TEMPLATE.md`.
- [ ] Hành động: Tạo `.agents/templates/PULL_REQUEST_TEMPLATE.md`.
- [ ] Hành động: Tạo `.agents/templates/REVIEW_REPORT_TEMPLATE.md`.
- [ ] Hành động: Tạo `.agents/templates/ACCEPTANCE_REPORT_TEMPLATE.md`.
- [ ] Hành động: Tạo `.agents/templates/CHANGE_REQUEST_TEMPLATE.md`.
- Đầu ra: Communication Plane không phụ thuộc chat rời hoặc ghi chú tự do.
- DoD: Mỗi task có ticket, mỗi PR có review checklist, mỗi nghiệm thu có acceptance report.
- Ưu tiên: P1.

### 2.5.1 - Hoàn thiện `components/ui/README.md`

- [x] Hành động: Mô tả vai trò `components/ui` là shared UI asset library.
- [x] Hành động: Thêm rule: frontend project phải ưu tiên dùng UI kit trước khi custom CSS.
- [x] Hành động: Thêm quy trình đề xuất component mới.
- [x] Hành động: Liên kết rule `ls-rule-ui-premium` sử dụng Glob trigger.
- Đầu ra: UI asset library có governance.
- DoD: README không còn rỗng, có bộ luật thẩm mỹ áp đặt qua Glob.
- Ưu tiên: P0.

### 2.5.2 - Xác định cấu trúc UI kit

- [ ] Hành động: Chọn cấu trúc tối thiểu: `components/ui/primitives`, `components/ui/patterns`, `components/ui/docs`, `components/ui/examples`.
- [ ] Hành động: Chưa cần implement nhiều component nếu chưa có stack frontend.
- Đầu ra: Nơi lưu UI asset rõ ràng.
- DoD: Component mới có vị trí lưu và rule phân loại.
- Ưu tiên: P1.

### 2.5.3 - Hoàn thiện `scripts/README.md`

- [ ] Hành động: Mô tả vai trò scripts là common infrastructure automation.
- [ ] Hành động: Liệt kê các script: new-project, new-module, verify-gate, hardening-register.
- Đầu ra: Scripts folder có catalog.
- DoD: Người mới biết chạy script nào cho việc gì.
- Ưu tiên: P0.

### 2.5.4 - Tạo hardening register script

- [ ] Hành động: Tạo `scripts/register-asset.ps1`.
- [ ] Hành động: Input gồm asset name, type, path, description, owner, status.
- [ ] Hành động: Cập nhật `ASSET_INDEX.md` hoặc tạo entry draft để Brain review.
- Đầu ra: Việc thêm asset không bị quên đăng ký.
- DoD: Asset mới luôn có dấu vết trong index.
- Ưu tiên: P2.

### 2.5.5 - Tạo cấu trúc `.agents/skills`

- [ ] Hành động: Thêm README cho `.agents/skills/`.
- [ ] Hành động: Quy định mỗi skill có `SKILL.md`, examples và acceptance.
- Đầu ra: Skill library có format.
- DoD: Skill mới có chuẩn đóng gói.
- Ưu tiên: P1.

### 2.5.6 - Tạo cấu trúc `.agents/tools`

- [ ] Hành động: Thêm README cho `.agents/tools/`.
- [ ] Hành động: Phân loại tool thành Inquiry Lane và Action Lane.
- [ ] Hành động: Tool ghi dữ liệu phải yêu cầu Brain approval hoặc gate rõ ràng.
- Đầu ra: Action vs Inquiry Lane được áp dụng ở cấp thư mục.
- DoD: Tool rủi ro cao không bị lẫn với tool chỉ đọc.
- Ưu tiên: P1.

### 2.6.1 - Tạo audit trail schema

- [ ] Hành động: Tạo `.agents/datasets/audit-trail.schema.json`.
- [ ] Hành động: Schema gồm timestamp, actor, agent_id, intent, action_type, impact_area, files_changed, command, result, hash_verification.
- Đầu ra: Chuẩn dữ liệu cho audit ledger.
- DoD: Mọi audit log sau này có schema thống nhất.
- Ưu tiên: P1.

### 2.6.2 - Tạo local audit log format

- [ ] Hành động: Tạo `docs/audit/README.md`.
- [ ] Hành động: Tạo folder `docs/audit/logs/`.
- [ ] Hành động: Quy định local Markdown/JSON audit trước khi có MCP/Supabase bridge.
- Đầu ra: Audit chạy được bằng file trước.
- DoD: Không bị phụ thuộc hạ tầng ngoài để bắt đầu audit discipline.
- Ưu tiên: P1.

### 2.6.3 - Tạo knowledge piece template

- [ ] Hành động: Tạo `.agents/templates/KNOWLEDGE_PIECE_TEMPLATE.md`.
- [ ] Hành động: Bao gồm problem, context, solution, reusable pattern, anti-pattern, source project, anonymization status.
- [ ] Hành động: Thêm trường strategic mapping: pain category, ICP, module family, SaaS potential.
- Đầu ra: Format để nạp tri thức vào vector KB sau này.
- DoD: Mỗi bài học kỹ thuật có thể chuyển thành knowledge piece.
- Ưu tiên: P2.

### 2.6.4 - Tạo exception log template

- [ ] Hành động: Tạo `.agents/templates/EXCEPTION_LOG_TEMPLATE.md`.
- [ ] Hành động: Ghi reason, scope, approver, expiry, rollback/normalization plan, post-exception audit.
- Đầu ra: Ngoại lệ có kiểm soát.
- DoD: Không có exception nào chỉ tồn tại trong chat.
- Ưu tiên: P1.

### 2.6.5 - Tạo daily harvesting workflow

- [ ] Hành động: Tạo `.agents/workflows/ls-workflow-daily-harvesting.md`.
- [ ] Hành động: Mô tả cách Brain đọc LOGS, commit, QA log để rút asset, risk và knowledge piece.
- Đầu ra: Knowledge governance thành workflow cụ thể.
- DoD: Cuối ngày biết phải harvest gì và lưu ở đâu.
- Ưu tiên: P2.

### 2.8.2 - Tạo offboarding checklist

- [ ] Hành động: Tạo `.agents/templates/OFFBOARDING_CHECKLIST_TEMPLATE.md`.
- [ ] Hành động: Bao gồm freeze access, revoke key, export evidence, final audit, payment decision.
- Đầu ra: Quy trình revoke 15 phút có checklist.
- DoD: Khi thay Hands, Brain không bỏ sót bước bảo mật.
- Ưu tiên: P1.

### 2.8.3 - Tạo onboarding checklist

- [ ] Hành động: Tạo `.agents/templates/ONBOARDING_CHECKLIST_TEMPLATE.md`.
- [ ] Hành động: Bao gồm spec reload, log sync, git history review, asset index review, sandbox run.
- Đầu ra: Quy trình onboard 24h có checklist.
- DoD: Người mới bắt đầu được mà không cần họp dài.
- Ưu tiên: P1.

### 2.8.5 - Tạo data privacy and anonymization checklist

- [ ] Hành động: Tạo `.agents/templates/DATA_PRIVACY_CHECKLIST_TEMPLATE.md`.
- [ ] Hành động: Bao gồm PII inventory, anonymization status, data retention, customer-specific hardcode, export restrictions.
- [ ] Hành động: Liên kết checklist này với knowledge harvesting và dataset governance.
- Đầu ra: Knowledge pieces và datasets không vô tình chứa dữ liệu nhạy cảm của khách hàng.
- DoD: Asset/knowledge piece chỉ được đưa vào kho chung khi có trạng thái anonymization rõ ràng.
- Ưu tiên: P1.

### 2.9.1 - Chạy pilot trên project mẫu

- [x] Hành động: Tạo project mẫu bằng `scripts/new-project.ps1`.
- [x] Hành động: Tạo module mẫu bằng `scripts/new-module.ps1`.
- [x] Hành động: Điền task spec, QA log, LOGS, README (đã test with placeholder detection).
- [x] Hành động: Chạy `scripts/verify-gate.ps1`.
- Đầu ra: Một vòng delivery giả lập đầy đủ.
- DoD: Base platform chứng minh được luồng từ Spec đến Gate.
- Ưu tiên: P1.

### 2.9.2 - Hardening sau pilot

- [ ] Hành động: Viết hardening proposal cho phần nào trong pilot có thể tái sử dụng.
- [ ] Hành động: Đăng ký asset vào `ASSET_INDEX.md`.
- [ ] Hành động: Cập nhật rules/templates nếu phát hiện lỗ hổng.
- Đầu ra: Pilot không chỉ demo mà tạo thêm asset.
- DoD: Ít nhất 1 asset hoặc template được cải thiện sau pilot.
- Ưu tiên: P1.

### 2.9.3 - Review constitution alignment

- [ ] Hành động: So sánh base platform với bộ blueprint nguồn `00/01/02/03`.
- [ ] Hành động: Đánh dấu phần đã tuân thủ, phần chưa có, phần cần automate sau.
- Đầu ra: Gap analysis ngắn.
- DoD: Brain biết roadmap tiếp theo dựa trên gap thật.
- Ưu tiên: P2.

---

## Backlog Thực Thi Ngay

- [x] Đồng bộ source-of-truth blueprint về bộ `.LinkStrategy/00/01/02/03`.
- [x] Quyết định chuẩn versioning 00-03 làm canonical.
- [x] Hoàn thiện Repository Baseline (Track 1.0).
- [x] Tạo root `README.md`.
- [x] Hoàn thiện `ASSET_INDEX.md`.
- [x] Tạo `scripts/verify-gate.ps1`.
- [x] Tạo `scripts/push-rules-to-satellite.ps1` (Force Sync).
- [x] Tạo `scripts/pull-code-from-satellite.ps1` (Harvesting).
- [x] Tạo `scripts/init-satellite.ps1` (Auto-Deployment).
- [x] Tạo `ls-rule-secret-management.md`.
- [x] Tạo `ls-rule-conventional-commits.md`.
- [x] Tạo `.LinkStrategy/04_SYNC_PROTOCOL.md`.
- [ ] Tạo Action vs Inquiry permission matrix (Task 1.5.1).
- [ ] Tạo PR Template & Branch Protection Checklist (Track 1.10).
- [ ] Tạo security automation baseline templates (Task 1.5.2).
- [x] Tạo project mẫu `projects/DEMO-BASE-PLATFORM`.
- [x] Chạy pilot verification gate.
- [x] Rà soát và cập nhật Backlog theo chuẩn 2-Phase Hierarchy.

## Definition Of Done Cho Base Platform V1

- [ ] Có thể tạo project mới bằng script.
- [ ] Có thể tạo module mới bằng script.
- [ ] Mỗi project/module mới có spec, QA log, daily log, README và test folder.
- [ ] Có scorecard nghiệm thu chuẩn.
- [ ] Có verification script tối thiểu.
- [ ] Có Git/PR enforcement checklist trước khi giao việc cho Hands.
- [ ] Có technical handover artefact templates cho service/module.
- [ ] Có Action vs Inquiry permission matrix.
- [ ] Có security automation baseline cho module rủi ro.
- [ ] Có rule governance, secret management và delivery workflow.
- [x] Có asset index đủ rõ để AI Agent bootstrap.
- [ ] Có strategic blueprint alignment trong task/gate đối với module chiến lược.
- [ ] Có UI/components và scripts README không rỗng.
- [ ] Có project mẫu chứng minh workflow.
- [ ] Có ít nhất một hardening proposal sau pilot.
