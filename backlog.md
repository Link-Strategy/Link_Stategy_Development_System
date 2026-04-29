# NHẬT KÝ CÔNG VIỆC & LỘ TRÌNH PHÁT TRIỂN (BACKLOG)

Tài liệu này chuyển hóa các yêu cầu từ bộ Blueprint hiện hành thành danh sách hành động cụ thể để triển khai Cỗ máy sản xuất phần mềm Link Strategy.

## Mục Tiêu Vận Hành

Xây dựng một hệ thống có thể:

- Sinh dự án và module mới nhất quán theo chuẩn Spec-First.
- Cấp phát gói bàn giao (Handover Package) đầy đủ cho freelancer.
- Nghiệm thu dựa trên kết quả thực tế qua các chốt chặn kỹ thuật (Verification Gate).
- Tích lũy tài sản tri thức (Hardening) sau mỗi vòng triển khai.
- Duy trì nhật ký vận hành (Logs) và tính liên tục của tri thức.
- Bảo vệ chủ quyền của Brain đối với kiến trúc và thư viện tài sản.

## Nguyên Tắc Ưu Tiên

1. Chủ quyền hệ thống ưu tiên hơn tốc độ bàn giao.
2. Kiểm chứng thực tế ưu tiên hơn báo cáo miệng.
3. Khả năng đóng gói tài sản ưu tiên hơn triển khai rời rạc.
4. Khả năng đối soát ưu tiên hơn sự tiện lợi nhất thời.
5. Tự động hóa lộ trình thực thi ngay từ đầu.

## LỘ TRÌNH PHÁT TRIỂN

Hệ thống Link Strategy phát triển theo 3 giai đoạn hội tụ để chuyển dịch từ "Dịch vụ" sang "Cỗ máy":

### Giai đoạn 1: Hardening & Enforcement (0 - 6 tháng) - [TRẠNG THÁI: 100% HOÀN THÀNH]
*   **Mục tiêu:** Xây dựng "Bộ khung thép". Đồng bộ hóa Hiến pháp và các chốt chặn thực thi.
*   **Trọng tâm:** Master-Satellite Sync, Governance Enforcement, `ls-gitpush` Integrity, Asset Registry.
*   **Key Milestone:** Hệ thống hạ tầng, bảo mật và quy trình bàn giao đã được "Bọc thép" hoàn toàn.

### Giai đoạn 2: Scale & Production (6 - 18 tháng) - [TRẠNG THÁI: ĐANG TRIỂN KHAI]
*   **Mục tiêu:** Vận hành thực địa diện rộng. Auditor chẩn đoán và Dev thi công module hàng loạt.
*   **Trọng tâm:** Auditor Capability Engine, UI Component Library, Automated Gate Scorecard.
*   **Key Milestone:** 10 dự án SME chạy trên cùng một quy trình chuẩn.

### Giai đoạn 3: Ecosystem & SaaS (18 tháng+)
*   **Mục tiêu:** Thương mại hóa tài sản thành SaaS đại trà.
*   **Trọng tâm:** Productization Engine, Subscription Management, Multi-tenant Architecture.
*   **Key Milestone:** Ra mắt sản phẩm SaaS đầu tiên được thị trường hấp thụ.


## Phase 1: Hardening & Enforcement
*Thiết lập hạ tầng cốt lõi, luật pháp và các chốt chặn bảo mật tuyệt đối trước khi mở repo.*

### 1.0.0 - Chuẩn hóa Nguồn chân lý Blueprint

- [x] Hành động: Xác lập bộ Blueprint hiện hành (`00, 01, 02, 03`) làm nguồn SSOT duy nhất.
- [x] Hành động: Đảm bảo toàn bộ tham chiếu nội bộ trỏ đúng về bộ tài liệu Blueprint hiện hành.
- [x] Hành động: Duy trì chính sách phiên bản Blueprint tập trung tại thư mục `.LinkStrategy/`.
- [x] Hành động: Chuyển các tài liệu dự án cũ vào khu vực lưu trữ riêng biệt.
- **Tiêu chuẩn đạt chuẩn:** Hệ thống tài liệu nhất quán, không có liên kết hỏng hoặc sai phiên bản.

### 1.0.1 - Thiết lập Repository Baseline (Thư mục, Gitignore, README)

- [x] Hành động: Chuẩn hóa cấu trúc thư mục lõi (`.agents/`, `.LinkStrategy/`, `components/`, `projects/`, `scripts/`, `docs/`).
- [x] Hành động: Cấu hình `.gitignore` bảo mật, chặn secret và build artifacts nhưng cho phép `.env.example`.
- [x] Hành động: Hoàn thiện `README.md` tại root mô tả 4-plane architecture và liên kết SSOT đến các tài liệu Blueprint.
- **Tiêu chuẩn đạt chuẩn:** Root repo sạch, an toàn và có đầy đủ chỉ dẫn vận hành cho Brain & Agent.

### 1.1.0 - Thiết lập Khung Quản trị Master (Index, Rules, Workflows)

- [x] Hành động: Tích hợp Chiến lược kinh doanh (`00_BLUEPRINT`) vào `ASSET_INDEX.md` và `GEMINI.md`.
- [x] Hành động: Chuẩn hóa `ASSET_INDEX.md` thành registry quản trị tài sản (Rules, Skills, Tools...).
- [x] Hành động: Hoàn thiện `GEMINI.md` với Bootstrap Order và các quy tắc thực thi dứt khoát.
- [x] Hành động: Thiết lập Luật quản trị Master (`ls-rule-master-governance.md`) và Quy trình bàn giao Master (`ls-workflow-delivery-loop.md`).
- **Tiêu chuẩn đạt chuẩn:** Bộ khung quản trị sẵn sàng, đảm bảo tính nhất quán giữa Chiến lược - Tài sản - Quy trình.

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

- [x] Hành động: Tạo template `.agents/templates/ENV_EXAMPLE_TEMPLATE`.
- [x] Hành động: Script project factory copy thành `.env.example`.
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

### 1.4.2 - Nghiệm thu dựa trên Bằng chứng thực thi (Evidence-based)

- [x] Hành động: Xác lập cơ chế nghiệm thu dựa trên bằng chứng thực tế ghi nhận trong `LOGS.md`.
- [x] Hành động: Duy trì các tiêu chuẩn bắt buộc: Kiểm thử (Tests) vượt qua 100%, Mã nguồn sạch, Bảo mật được đảm bảo.
- [x] Hành động: Tích hợp việc giải ngân vào dấu xác nhận Hash trực tiếp trong Log dự án sau khi vượt qua Verification Gate.
- **Tiêu chuẩn đạt chuẩn:** Mọi quyết định nghiệm thu đều dựa trên bằng chứng thực tế và có đối soát trong Logs.



### 1.4.4 - Chuẩn bị CI/CD gate về sau
- [x] Hành động: Thiết kế file workflow mẫu cho GitHub Actions (`.agents/templates/verify-gate.yml`).
- [x] Hành động: Ghi rõ command contract: lint, test, coverage, security audit.
- [x] Hành động: Chuẩn hóa output gate report: test result, coverage, lint, security scan, docs evidence, hardening evidence.
- Đầu ra: Có đường nâng cấp từ local gate sang CI gate.
- DoD: Khi có stack cụ thể, chỉ cần map command vào contract.
- Ưu tiên: P2.

### 1.4.5 - Tạo Git enforcement checklist

- [x] Hành động: Tạo `.agents/templates/BRANCH_PROTECTION_CHECKLIST.md`.
- [x] Hành động: Tạo `CODEOWNERS` hoặc `.github/CODEOWNERS` để thể hiện Brain ownership.
- [x] Hành động: Tạo PR template bắt buộc tick spec, tests, docs, security, hardening proposal.
- [x] Hành động: Thiết lập cơ chế kiểm tra Commit (Rule-based).
- [x] Hành động: Ghi rõ no-force-push, required review, required status checks, protected main branch.
- Đầu ra: Brain sovereignty được enforce ở Git workflow, không chỉ trong tài liệu.
- DoD: Main branch có checklist bảo vệ merge và review trước khi Hands code thật.
- Ưu tiên: P0.

### 1.5.1 - Thiết lập Permission Matrix (Action vs Inquiry) (URGENT)
- [x] Hành động: Tạo `.agents/rules/ls-rule-master-governance.md` (Enforced No-Manual-Push).
- [x] Hành động: Tạo script `ls-gitpush.ps1` làm cổng kiểm soát duy nhất (Action Lane Gate).
- [x] Hành động: Thiết lập cơ chế **Integrity Hash** (Dấu vân tay code) chống sửa code lén.
- [x] Hành động: Cưỡng chế chốt chặn PR tại GitHub Action (Chặn push thủ công).
- Đầu ra: Cơ chế bảo vệ hệ thống tuyệt đối khỏi các hành động tự ý của Hands.
- DoD: Không có PR nào được merge nếu thiếu báo cáo Agent Review và mã Hash không khớp.
- Ưu tiên: P0 (Hardened & Enforced).



### 1.7.1 - Thiết lập satellite repo contract
- [x] Hành động: Tạo `docs/satellite-repo-contract.md`. (Đã tích hợp vào Sync Linkage).
- [x] Hành động: Mô tả cấu trúc satellite: `src/`, `tests/`, `docs/blueprints/`, `GEMINI.md`, `README.md`. (Đã tích hợp vào Sync Linkage).
- [x] Hành động: Mô tả file nào read-only từ Brain.
- Đầu ra: Contract rõ cho repo giao freelancer.
- DoD: Có thể tạo satellite thủ công hoặc tự động theo contract.
- Ưu tiên: P0 (Hardened).

### 1.7.2 - Thiết thiết kế sync linkage & Safe Push
- [x] Hành động: Tạo `docs/sync-linkage.md`.
- [x] Hành động: Mô tả Push-to-Satellite và Pull-to-Master.
- [x] Hành động: Chỉ rõ conflict handling và quyền merge.
- [x] Hành động: Triển khai `--force-with-lease` và `rebase` để bảo vệ code Hands.
- Đầu ra: Cơ chế đồng bộ có thiết kế và an toàn dữ liệu.
- DoD: Brain biết dữ liệu đi chiều nào, lúc nào, ai duyệt.
- Ưu tiên: P0 (Hardened).

### 1.7.3 - Tạo `GEMINI.md` hoặc agent rules template cho satellite
- [x] Hành động: Tạo `GEMINI.md` template. (Đã tích hợp vào Project Factory).
- [x] Hành động: Nội dung ép đọc task spec, QA log, LOGS, asset index và rules.
- [x] Hành động: Tạo script đồng bộ tự động `push-rules-to-satellite.ps1` và `pull-code-from-satellite.ps1`.
- [x] Hành động: Triển khai cơ chế auto-registry vào `active-projects.json`.
- Đầu ra: Context injection và registry tự động.
- DoD: Satellite mới có rule bootstrapping nhất quán và có cơ chế đồng bộ tự động.
- Ưu tiên: P0 (Hardened).



### 1.10.1 - Thiết lập GitHub repository controls

- [x] Hành động: Tạo `CODEOWNERS` để thể hiện Brain ownership.
- [x] Hành động: Tạo checklist cấu hình branch protection cho `main`.
- [x] Hành động: Yêu cầu PR review trước merge.
- [x] Hành động: Yêu cầu status checks cho gate khi CI sẵn sàng.
- [x] Hành động: Cấm force push vào branch chính.
- [x] Hành động: Ghi rõ quyền merge chỉ thuộc Brain hoặc Brain Delegate.
- Đầu ra: Repository policy phản ánh Brain sovereignty.
- DoD: Có tài liệu hoặc checklist cấu hình GitHub để áp dụng trước khi mở repo cho Hands.
- Ưu tiên: P0.

### 1.10.2 - Thiết lập PR-based delivery workflow

- [x] Hành động: Tạo `.github/pull_request_template.md`.
- [x] Hành động: Tạo `.github/ISSUE_TEMPLATE/task_spec.yml` (Task specification issue template).
- [x] Hành động: Thiết lập rule mỗi PR phải link bằng chứng thực thi và hardening proposal.
- Đầu ra: Delivery luôn đi qua PR có bằng chứng.
- DoD: Không có code vào main nếu thiếu spec/test/docs/security/hardening evidence.
- Ưu tiên: P0.

### 1.10.3 - Thiết lập conventional commit enforcement

- [x] Hành động: Tạo `.agents/rules/ls-rule-conventional-commits.md`.
- [x] Hành động: Định nghĩa commit types: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `harden`.
- [x] Hành động: Thiết lập cơ chế kiểm tra commit history (Rule-based via Agent Review).
- Đầu ra: Git history đọc được để thay thế Hands trong 24h.
- DoD: PR có commit history đủ rõ cho AI/Brain hiểu tiến độ mà không cần họp.
- Ưu tiên: P1.





---

## Phase 2: Standardization & Support
*Hoàn thiện tài liệu mẫu, hỗ trợ phát triển và quản trị tri thức.*

### 2.1.0 - Hardening Security & Enforcement (Strategic Deferral from Phase 1)

#### 1.5.2 - Thiết lập Security Automation Baseline
- [ ] Hành động: Tạo `.agents/templates/THREAT_MODEL_TEMPLATE.md`.
- [ ] Hành động: Tích hợp Dependency Scan và SAST baseline vào workflow.
- Đầu ra: Quy trình rà quét rủi ro tự động.
- DoD: Module rủi ro cao phải có bằng chứng quét bảo mật trước khi vào Gate.
- Ưu tiên: P1.

#### 1.8.1 - Thực thi Secret Management Protocol
- [x] Hành động: Tạo `.agents/rules/ls-rule-secret-management.md`.
- [ ] Hành động: Đảm bảo mọi Hands (Freelancer) đều tuân thủ việc không bao giờ chạm vào Secret thật thông qua các buổi In-boarding.
- [ ] Hành động: Quy định `.env.example`, secret manager và key revocation trong môi trường satellite.
- Đầu ra: Secret protocol được thực thi triệt để.

### 2.1.1 - Quality & Audit Standardization (Strategic Deferral from Phase 1)

#### 1.4.3 - Tạo clean-code checklist
- [ ] Hành động: Tạo `.agents/templates/CLEAN_CODE_CHECKLIST_TEMPLATE.md`.
- [ ] Hành động: Bao gồm modularity, naming, duplication, error handling, tests, dependency usage.
- Đầu ra: Review kỹ thuật có checklist thống nhất.

#### 1.10.4 - Thiết lập delivery evidence archive
- [ ] Hành động: Tạo cấu trúc `docs/audit/gate-reports/`.
- [ ] Hành động: Tạo cấu trúc `docs/audit/review-reports/`.
- [ ] Hành động: Tạo cấu trúc `docs/audit/security-reports/`.
- [ ] Hành động: Quy định naming for evidence theo project/module/date.

#### 1.10.5 - Quy trình Phê duyệt và Giải ngân dựa trên Log
- [ ] Hành động: Thiết lập cơ chế ghi nhận quyết định phê duyệt trực tiếp vào `LOGS.md` dự án.
- [ ] Hành động: Sử dụng bằng chứng trong Log để làm căn cứ giải ngân thay vì các biểu mẫu rời rạc.
- [ ] Hành động: Ghi nhận mã Hash phê duyệt cuối cùng để đảm bảo tính đối soát.

### 2.1.3 - Skill Activation & Integration (NEW)
*Kích hoạt các bộ kỹ năng đã có sẵn trong .agents/skills/ vào quy trình sản xuất hàng loạt.*

- [ ] Hành động: Tích hợp `prompt-engineering-patterns` vào quy trình Review của AI Agent để tối ưu hóa câu lệnh.
- [ ] Hành động: Thiết lập kịch bản mẫu sử dụng `nodejs-backend-patterns` cho các module API.
- [ ] Hành động: Áp dụng `python-design-patterns` vào các task xử lý dữ liệu/AI.
- [ ] Hành động: Đồng bộ `react-state-management` và `tailwind-design-system` vào `ls-skill-ui-kit`.
- Đầu ra: Tăng 200% năng suất nhờ tái sử dụng tài sản kỹ năng có sẵn.
- DoD: Mỗi skill có ít nhất 1 dự án mẫu (Demo) áp dụng thành công.


#### 2.1.2 - Brain Review Support (Moved from Phase 1)
- [ ] Hành động: Tạo Review Checklist chuẩn cho Brain để tối ưu hóa việc duyệt bài.
- [ ] Hành động: Thiết lập các tiêu chuẩn phản hồi nhanh (Quick feedback loop) cho Hands.



### 2.2.1 - Hoàn thiện bộ Handover & Technical Artefact Templates

- [x] Hành động: Cập nhật `01_TASK_SPEC_TEMPLATE.md` bám sát 5 Pillars và 8 thành phần Handover.
- [x] Hành động: Tích hợp chuẩn OpenAPI, Data Schema và Handover Guide cho Hands.
- [ ] Hành động: Bổ sung templates cho Docker Compose, Mock Server, Seed Data và Event/Observability contracts.
- **Tiêu chuẩn đạt chuẩn:** Gói bàn giao (Handover Package) đầy đủ các cấu phần kỹ thuật để Hands có thể thi công ngay.

### 2.2.2 - Hoàn thiện bộ Communication & Review Plane Templates

- [x] Hành động: Hoàn thiện `02_QA_LOGS_TEMPLATE.md` cho việc trao đổi logic.
- [ ] Hành động: Chuẩn hóa `LOGS_TEMPLATE.md` (Done/Block/Next) và `DECISION_LOG_TEMPLATE.md` (Kiến trúc).
- [ ] Hành động: Tạo bộ template giao tiếp: Task Ticket, Pull Request, Review Report và Acceptance Report.
- **Tiêu chuẩn đạt chuẩn:** Mọi trao đổi và quyết định đều được văn bản hóa đồng bộ, không phụ thuộc chat rời.

### 2.2.3 - Hoàn thiện bộ Security & Strategic Alignment Templates

- [x] Hành động: Tạo `HARDENING_PROPOSAL_TEMPLATE.md` để đóng gói tài sản tri thức.
- [ ] Hành động: Tạo `SECURITY_CHECKLIST_TEMPLATE.md` và `BLUEPRINT_ALIGNMENT_TEMPLATE.md`.
- **Tiêu chuẩn đạt chuẩn:** Mọi dự án đều được kiểm tra tính bảo mật và mức độ bám sát chiến lược kinh doanh.

### 2.5.1 - Hoàn thiện `components/ui/README.md`

- [x] Hành động: Mô tả vai trò `components/ui` là shared UI asset library.
- [x] Hành động: Thêm rule: frontend project phải ưu tiên dùng UI kit trước khi custom CSS.
- [x] Hành động: Thêm quy trình đề xuất component mới.
- [x] Hành động: Liên kết rule `ls-rule-ui-premium` sử dụng Glob trigger.
- Đầu ra: UI asset library có governance.
- DoD: Tài liệu README đầy đủ và tích hợp các quy tắc thẩm mỹ tự động.
- Ưu tiên: P0.

### 2.5.2 - Xác định cấu trúc UI kit

- [ ] Hành động: Chọn cấu trúc tối thiểu: `components/ui/primitives`, `components/ui/patterns`, `components/ui/docs`, `components/ui/examples`.
- [ ] Hành động: Chưa cần implement nhiều component nếu chưa có stack frontend.
- Đầu ra: Nơi lưu UI asset rõ ràng.
- DoD: Component mới có vị trí lưu và rule phân loại.
- Ưu tiên: P1.

### 2.5.3 - Hoàn thiện `scripts/README.md`

- [x] Hành động: Hoàn thiện `scripts/README.md`.
- [x] Hành động: Liệt kê các script: new-project, new-module, verify-gate, hardening-register. (Đóng gói trong Skill Engine Ops).
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

### 2.7.0 - Auditor Capability Training (Hardening) (COMPLETE)

- [x] Hành động: Khởi tạo cấu trúc đào tạo tại `.LinkStrategy/Training/auditor/`.
- [x] Hành động: Xây dựng 06 Module đào tạo Auditor (Research, Productivity, Forensics, Architecture, Infrastructure, Rainmaking).
- [x] Hành động: Hoàn thiện Handbook Templates cho Auditor (Account Thesis, Pain Map, Problem Classification, Intervention Thesis).
- [x] Hành động: Đăng ký tài sản đào tạo vào `ASSET_INDEX.md`.
- Đầu ra: Hệ thống đào tạo Auditor sẵn sàng thực thi.
- DoD: Có đầy đủ curriculum và templates cho từng module đào tạo.
- Ưu tiên: P0.

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


