# MODULE 6: RAINMAKER OPERATING SYSTEM (ROS) - VẬN HÀNH GỌI MƯA CHIẾN LƯỢC

## I. TỔNG QUAN (OVERVIEW)
Module 6 là giai đoạn Auditor chuyển từ người học sang **Builder-Operator** của Link Strategy. Nếu Module 5 xây hạ tầng marketing và database ban đầu, thì Module 6 hoàn thiện lớp vận hành thương mại để biến hạ tầng đó thành một **Rainmaker Operating System** chạy được với dữ liệu thật, workflow thật và pipeline thật.

Vì vậy, đây vừa là **chương trình đào tạo thực chiến**, vừa là **lộ trình hoàn thiện hệ thống Marketing & Sales chuyên nghiệp** của Link Strategy. Mỗi bài học trong module này phải tạo ra một cấu phần vận hành cụ thể: scoring logic, outreach workflow, offer engine, dashboard pipeline, và feedback loop tối ưu.

Module 6 không được đánh giá bằng mức độ hiểu lý thuyết. Tuy nhiên, module này cũng **không phải bài kiểm tra doanh thu ngắn hạn**. Mục tiêu của học viên trong 30 ngày đầu là tạo ra và vận hành được một **Minimum Viable Rainmaker Operating System (MV-ROS)** trên dữ liệu thật, có account thật, scoring thật, outreach thật, pipeline thật và vòng tối ưu thật ở mức đủ để học được từ thị trường.

---

## II. MỤC TIÊU HỆ THỐNG (SYSTEM OBJECTIVE)
Đến cuối Module 6, Auditor phải hoàn thiện và vận hành được **ROS v1** với các năng lực sau:

1. **Targeting:** Xác định đúng ICP, phân khúc ưu tiên và account đáng theo đuổi.
2. **Qualification:** Chấm điểm lead bằng logic kinh doanh thay vì cảm tính.
3. **Engagement:** Triển khai chuỗi tiếp cận đa kênh có quy tắc vào/ra rõ ràng.
4. **Monetization:** Thiết kế offer và cấu trúc deal dựa trên ROI, phạm vi can thiệp và xác suất triển khai.
5. **Pipeline Control:** Theo dõi conversion, velocity, forecast và điểm nghẽn của phễu.
6. **Optimization:** Học ngược từ kết quả win/loss để cải thiện hệ thống theo chu kỳ.

### 2.1. Điều kiện đầu vào Module 6 (Entry Criteria)
Auditor chỉ được bắt đầu Module 6 khi đã có tối thiểu các nền tảng sau từ các module trước:

1. **Hiểu Link Strategy Blueprint:** Nắm được các khái niệm cốt lõi: Software Graveyard, Business Graveyard Audit, Workflow Leakage, Shelfware Risk, Intervention Thesis.
2. **Có Lead Database v0:** Đã có cấu trúc dữ liệu khách hàng tiềm năng ban đầu từ Module 5, dù chưa hoàn chỉnh.
3. **Có Pain Library v0:** Đã có danh sách pain, dấu hiệu thất thoát, tín hiệu chuyển đổi số hoặc dấu hiệu phần mềm bị bỏ xó trong SME.
4. **Có Asset nền:** Có tối thiểu landing page draft, teaser audit draft hoặc checklist chẩn đoán để phục vụ outreach.
5. **Có năng lực AI Research cơ bản:** Biết dùng AI để tìm kiếm, tổng hợp, làm giàu account, phát hiện tín hiệu và tạo bản tóm tắt doanh nghiệp.
6. **Hiểu tư duy CRM/Pipeline cơ bản:** Nắm được stage, owner, next step, status, reason lost và follow-up discipline.

Nếu thiếu các điều kiện trên, Auditor phải quay lại hoàn thiện Module 5 trước khi vào Module 6.

### 2.2. Minimum Viable ROS trong 30 ngày
Trong 30 ngày đầu, mục tiêu không phải là xây một commercial machine hoàn hảo. Mục tiêu là xây được **MV-ROS** đủ chạy vòng thị trường đầu tiên.

30 ngày đầu phải được hiểu là **calibration phase**:

- Hiệu chỉnh cách Auditor nhìn thị trường theo logic của Link Strategy.
- Hiệu chỉnh chất lượng dữ liệu, scoring, message và offer.
- Tạo vòng phản hồi đầu tiên từ thị trường để biết cần sửa gì ở chu kỳ tiếp theo.

Học viên không bị đánh giá bằng việc phải chốt được doanh thu ngay. Học viên được đánh giá bằng việc có tạo ra được **nền móng đủ sạch, đủ rõ và đủ dùng** để hệ thống có thể tiếp tục vận hành tốt hơn ở vòng kế tiếp hay không.

MV-ROS bắt buộc có:

| Thành phần | Chuẩn tối thiểu |
|---|---|
| ICP | 01 ICP chính và 03 segment ưu tiên |
| Lead Database | 50 account thật, có thông tin cơ bản và nguồn tín hiệu |
| Scoring Engine | Công thức chấm điểm 100 điểm, phân loại Hot/Warm/Cold |
| Outreach System | 01 sequence 5 điểm chạm cho ít nhất 01 persona chính |
| Pipeline Tracker | Theo dõi được stage, owner, last touch, next step, reason lost |
| Offer Engine | 01 Intervention Offer hoặc Business Graveyard Audit Offer hoàn chỉnh |
| Dashboard | Theo dõi được conversion, stage progression, velocity cơ bản |
| Learning Loop | 01 Optimization Memo sau pilot |

### 2.3. Cadence triển khai 4 tuần
Module 6 được vận hành theo cadence 4 tuần:

| Tuần | Mục tiêu | Output bắt buộc |
|---|---|---|
| Tuần 1 | Targeting Foundation | ICP, segment, database schema, 50 account thô |
| Tuần 2 | Signal & Scoring | Account enrichment, scoring matrix, Hot/Warm/Cold list |
| Tuần 3 | Outreach Pilot | Sequence, message assets, outreach log cho 10-20 account |
| Tuần 4 | Offer & Optimization | Offer draft, pipeline dashboard, win/loss review, optimization memo |

Cadence này là nhịp triển khai định hướng, không phải áp lực sản xuất cứng. Nếu một gate chưa đạt chất lượng, Auditor được ưu tiên sửa logic và dữ liệu trước khi tăng sản lượng.

### 2.4. Review Gate bắt buộc
Founder hoặc Lead Auditor phải review sau từng gate:

1. **Gate 1 - ICP Gate:** ICP có đủ cụ thể, có pain rõ, có khả năng chi trả và đáng săn không?
2. **Gate 2 - Scoring Gate:** Account được chấm điểm dựa trên evidence hay cảm tính?
3. **Gate 3 - Outreach Gate:** Message có pain-led, persona-specific và gắn với tín hiệu thật không?
4. **Gate 4 - Offer Gate:** Offer có pain, ROI, scope, success criteria và next step rõ không?
5. **Gate 5 - Pipeline Gate:** Dashboard có đọc được điểm nghẽn và next action không?
6. **Gate 6 - Learning Gate:** Optimization Memo có dựa trên dữ liệu thật hay chỉ là nhận xét cảm tính?

Mục đích của các gate này là **giảm lỗi học sai ngay từ đầu**, không phải tăng áp lực kiểm tra. Review gate dùng để phát hiện lệch hướng sớm, hỗ trợ chỉnh lại logic và giữ cho học viên tập trung vào chất lượng nền móng.

---

## III. LỘ TRÌNH ĐÀO TẠO KIÊM XÂY DỰNG HỆ THỐNG (BUILD-AND-LEARN SYLLABUS)

### Giai đoạn 1: Thiết kế Hệ mục tiêu & Logic ưu tiên (Target Account System)
*   **Bài 1.1: Xác định ICP và vùng săn khả thi.** Chuẩn hóa chân dung doanh nghiệp mục tiêu theo ngành, quy mô, độ trưởng thành vận hành, dấu hiệu chuyển đổi số và khả năng chi trả.
*   **Bài 1.2: Phân tầng cơ hội.** Thiết kế ma trận ưu tiên `ICP Fit | Pain Severity | Timing | Dealability | Expansion Potential` để tránh theo đuổi các lead "đau nhưng không đáng bán".
*   **Bài 1.3: Xác định exclusion criteria.** Làm rõ nhóm account không nên theo đuổi: quá nhỏ, không có owner, không có urgency, không có khả năng chi trả, hoặc pain không phù hợp với năng lực can thiệp của LS.
*   **Output hệ thống:** Danh sách segment ưu tiên, tiêu chuẩn ICP, exclusion criteria và quy tắc phân loại `Tier 1 / Tier 2 / Tier 3`.
*   **Gate nghiệm thu:** Founder/Lead Auditor duyệt ICP trước khi Auditor được chuyển sang sourcing và scoring.

### Giai đoạn 2: Xây máy Chấm điểm & Chuẩn hóa tín hiệu (Signal and Scoring System)
*   **Bài 2.1: Chuẩn hóa tín hiệu đầu vào.** Xác định nguồn tín hiệu từ Module 5 và dữ liệu công khai: Jobs, News, Reviews, Hiring Signals, Leadership Signals, Tech Stack Signals, Growth/Decline Signals.
*   **Bài 2.2: Thiết kế Lead Scoring Engine.** Chấm điểm lead theo 5 biến cốt lõi: `ICP Fit`, `Pain Intensity`, `Urgency Window`, `Buying Readiness`, `Implementation Feasibility`.
*   **Bài 2.3: Thiết kế chuẩn Qualification.** Định nghĩa rõ `Suspect -> Prospect -> Qualified Prospect -> Opportunity` và điều kiện chuyển trạng thái.
*   **Bài 2.4: Chuẩn hóa Software Graveyard Signal.** Bổ sung các tín hiệu đặc thù của LS: phần mềm đã triển khai nhưng bị bỏ xó, workflow sống ngoài hệ thống, dữ liệu nằm trong Excel/Zalo, tuyển vị trí ERP/IT/Ops bất thường, review phàn nàn về quy trình, hoặc dấu hiệu công ty tăng trưởng nhanh hơn năng lực quản trị.
*   **Output hệ thống:** Bảng scoring, ngưỡng Hot/Warm/Cold, state definition, checklist qualification và signal taxonomy.

**Scoring framework tối thiểu:**

| Biến scoring | Điểm tối đa |
|---|---:|
| ICP Fit | 20 |
| Pain Intensity | 25 |
| Urgency Window | 20 |
| Buying Readiness | 20 |
| Implementation Feasibility | 15 |
| **Tổng** | **100** |

**Ngưỡng phân loại:**

| Loại account | Điểm | Hành động |
|---|---:|---|
| Hot | 75-100 | Outreach cá nhân hóa cao, Founder có thể tham gia |
| Warm | 50-74 | Nuôi dưỡng, sequence nhẹ, tiếp tục làm giàu dữ liệu |
| Cold | < 50 | Lưu database, chưa ưu tiên tiếp cận |

**Lead Database schema tối thiểu:**

| Nhóm field | Field bắt buộc |
|---|---|
| Account | Company Name, Website, Industry, Size, Location |
| Persona | Decision Maker, Role, Contact Channel, LinkedIn/Facebook nếu có |
| Signal | Trigger, Signal Type, Signal Source, Signal Date |
| Pain | Suspected Pain, Evidence, Confidence Level |
| Scoring | ICP Fit, Pain Intensity, Urgency, Buying Readiness, Feasibility, Total Score |
| Pipeline | Stage, Owner, Last Touch, Next Step, Next Touch Date |
| Outcome | Reply, Meeting, Qualified, Proposal, Won/Lost, Reason Lost |
| Learning | Objection, Insight, Messaging Note, Next Experiment |

*   **Gate nghiệm thu:** Không được chuyển sang outreach nếu account chưa có signal source, suspected pain và scoring rationale.

### Giai đoạn 3: Dựng Workflow Tiếp cận & Kỷ luật đa kênh (Outreach Workflow System)
*   **Bài 3.1: Thiết kế Sequencing theo persona.** Xây chuỗi 5 điểm chạm cho Founder, CEO, COO, Head of Ops hoặc Head of Finance với thông điệp và bằng chứng phù hợp từng vai trò.
*   **Bài 3.2: Thiết lập luật vận hành.** Quy định `entry criteria`, `exit criteria`, `waiting time`, `follow-up rule`, `recycle rule`, `stop rule` cho từng bước tiếp cận.
*   **Bài 3.3: Vận hành Asset Library.** Hoàn thiện thư viện Teaser Audit, Case Study, objection handling script, follow-up templates và CTA logic.
*   **Bài 3.4: Thiết lập Outreach Quality Gate.** Mọi outbound phải gắn với context thật của account, pain hypothesis, persona-specific message và CTA rõ ràng.
*   **Output hệ thống:** Bộ sequence chuẩn, thư viện asset outbound, SOP vận hành đa kênh, playbook chuyển bước và outreach quality checklist.

**Nguyên tắc chống spam:**

Không được gửi outreach nếu thiếu một trong các yếu tố sau:

1. Có context riêng của account.
2. Có pain hypothesis rõ.
3. Có nguồn tín hiệu hoặc lý do tiếp cận.
4. Có thông điệp phù hợp với persona.
5. Có CTA nhẹ, cụ thể và không ép bán quá sớm.

**Sequence tối thiểu 5 điểm chạm:**

| Touchpoint | Kênh | Mục tiêu |
|---|---|---|
| 1 | Email/LinkedIn/Zalo | Mở vấn đề bằng tín hiệu và pain hypothesis |
| 2 | Follow-up | Gửi checklist hoặc teaser audit |
| 3 | Social touch | Tương tác nhẹ hoặc bổ sung insight liên quan |
| 4 | Direct ask | Mời trao đổi ngắn hoặc audit review |
| 5 | Break-up / Recycle | Đóng vòng, xin permission để follow-up sau |

*   **Gate nghiệm thu:** Founder/Lead Auditor duyệt message đầu tiên trước khi Auditor được chạy outreach thật.

### Giai đoạn 4: Thiết kế Offer Engine & Logic tiền tệ hóa (Offer and Monetization System)
*   **Bài 4.1: Chuyển pain thành business case.** Xây framework lượng hóa baseline, thất thoát, khả năng phục hồi, time-to-value và phạm vi can thiệp.
*   **Bài 4.2: Thiết kế Intervention Offer theo ladder của LS.** Chuẩn hóa offer theo 3 tầng: `Business Graveyard Audit -> Recovery/Rationalization/New Build Pilot -> Recurring Governance/SaaS Layer`.
*   **Bài 4.3: Xây khung đàm phán.** Xác định buyer map, risk points, điều khoản khởi động, điều kiện thành công và logic xử lý phản đối.
*   **Bài 4.4: Chọn cấu trúc thương mại.** Phân biệt rõ offer type và commercial structure: Fixed Fee, Monthly Retainer, Success-share hoặc Hybrid.
*   **Output hệ thống:** Offer template, ROI calculator logic, proposal structure, negotiation checklist và commercial structure map.

**LS Offer Mapping bắt buộc:**

| Tầng LS | Offer chính | Vai trò |
|---|---|---|
| Clarity | Business Graveyard Audit Sprint | Bán chẩn đoán, pain map, software graveyard map, intervention thesis |
| Intervention | Recovery / Rationalization / New Build Pilot | Can thiệp để tạo kết quả vận hành kiểm chứng được |
| Commercialization | Productized Service / SaaS / Recurring Monitoring | Chuyển pattern đã thắng thành doanh thu định kỳ |

**Offer Brief tối thiểu phải có:**

1. Account context.
2. Pain được quan sát.
3. Baseline hoặc giả định thất thoát.
4. Business impact.
5. Intervention thesis.
6. Scope đề xuất.
7. Success criteria trong 30-90 ngày.
8. Pricing hoặc cấu trúc thương mại.
9. Risk và điều kiện triển khai.
10. Next step.

*   **Gate nghiệm thu:** Không được gửi offer/proposal nếu chưa có pain, business impact, scope và success criteria rõ.

### Giai đoạn 5: Hoàn thiện Dashboard Điều khiển phễu (Pipeline Control System)
*   **Bài 5.1: Chuẩn hóa các stage thương mại.** Thiết kế pipeline với stage definition rõ ràng từ `Targeted` đến `Closed Won / Closed Lost`.
*   **Bài 5.2: Thiết lập bộ chỉ số điều hành.** Theo dõi tối thiểu: `Reply Rate`, `Meeting Booked Rate`, `Qualified Opportunity Rate`, `Proposal Rate`, `Close Rate`, `Sales Cycle`, `Average Deal Size`, `Reason Lost`.
*   **Bài 5.3: Quản trị cơ hội và forecast.** Cách đọc dashboard để phát hiện nghẽn, forecast doanh thu và điều chỉnh năng lực sourcing, outreach hoặc offer.
*   **Bài 5.4: Phân biệt leading KPI, conversion KPI, revenue KPI và learning KPI.** Không đánh giá hệ thống chỉ bằng doanh thu sớm; phải đo cả tốc độ học thị trường.
*   **Output hệ thống:** Dashboard pipeline, định nghĩa stage, bộ KPI thương mại, learning KPI và quy tắc forecast cơ bản.

**Pipeline stage tối thiểu:**

| Stage | Điều kiện vào stage | Điều kiện ra stage |
|---|---|---|
| Targeted | Account nằm trong ICP/segment ưu tiên | Đã được làm giàu dữ liệu |
| Researched | Có signal, persona, suspected pain | Đã được chấm điểm |
| Prioritized | Được phân loại Hot/Warm/Cold | Được đưa vào sequence |
| Contacted | Đã gửi touchpoint đầu tiên | Có phản hồi hoặc đến bước follow-up |
| Engaged | Có reply/tương tác đáng kể | Book được meeting hoặc bị loại |
| Qualified | Có pain, urgency, authority hoặc path-to-authority | Chuyển proposal hoặc nurture |
| Proposal | Đã gửi offer/proposal | Won/Lost hoặc cần revision |
| Closed Won | Khách đồng ý triển khai | Chuyển sang delivery/onboarding |
| Closed Lost | Deal mất hoặc dừng | Ghi reason lost và learning |

**KPI phân tầng:**

| Nhóm KPI | Chỉ số |
|---|---|
| Leading KPI | Accounts researched, Hot accounts found, outreach sent, replies, meetings booked |
| Conversion KPI | Reply rate, meeting rate, qualification rate, proposal rate |
| Revenue KPI | Pipeline value, forecast, close rate, average deal size |
| Learning KPI | Reason lost, objection frequency, pain pattern frequency, message performance |

*   **Gate nghiệm thu:** Dashboard phải cho biết account đang ở stage nào, ai là owner, next step là gì và nghẽn ở đâu.

### Giai đoạn 6: Chạy Pilot thật & Tối ưu vòng lặp (Feedback and Optimization System)
*   **Bài 6.1: Pilot ROS trên account thật.** Chạy thử với danh sách account mục tiêu, ghi nhận đầy đủ tín hiệu, phản hồi và tiến triển deal.
*   **Bài 6.2: Win/Loss Review.** Phân tích vì sao account phản hồi, không phản hồi, tạo meeting, không tạo meeting, chốt được hoặc mất deal.
*   **Bài 6.3: Tối ưu hệ thống theo chu kỳ.** Cập nhật lại scoring, messaging, sequencing, offer framing và segmentation dựa trên dữ liệu thực chiến.
*   **Bài 6.4: Viết Optimization Memo.** Chốt lại hệ thống đang nghẽn ở đâu, giả thuyết nguyên nhân, thay đổi sẽ áp dụng và chỉ số cần theo dõi ở vòng tiếp theo.
*   **Output hệ thống:** Biên bản pilot, log win/loss, danh sách insight tối ưu, Optimization Memo và ROS v1 đã được hiệu chỉnh.

**Optimization Memo tối thiểu phải trả lời:**

1. ICP/segment nào phản hồi tốt nhất?
2. Tín hiệu nào dự báo tốt nhất khả năng có conversation?
3. Message nào có hiệu quả nhất?
4. Objection nào xuất hiện nhiều nhất?
5. Pipeline nghẽn ở stage nào?
6. Scoring có sai lệch gì so với thực tế?
7. Offer có đủ dễ hiểu và đủ đáng mua không?
8. Vòng tiếp theo sẽ sửa 3 điểm gì?

*   **Gate nghiệm thu:** Không công nhận hoàn thành Module 6 nếu Optimization Memo không dựa trên dữ liệu pilot thật.

---

## IV. KIẾN TRÚC ROS V1 PHẢI HOÀN THIỆN (REQUIRED SYSTEM COMPONENTS)
Đây là các cấu phần bắt buộc phải tồn tại sau khi học xong Module 6:

1. **ICP & Segmentation Layer:** Chân dung account mục tiêu và logic ưu tiên.
2. **Signal Capture Layer:** Danh mục tín hiệu thị trường và cách làm giàu dữ liệu.
3. **Scoring & Qualification Layer:** Công thức chấm điểm và tiêu chuẩn chuyển trạng thái.
4. **Outreach Execution Layer:** Sequence, message assets và SOP tiếp cận đa kênh.
5. **Offer Engineering Layer:** Template đề xuất, business case và logic định giá.
6. **Pipeline Control Layer:** Dashboard, stage definitions, KPI và forecast basics.
7. **Learning Loop Layer:** Cơ chế review win/loss và cập nhật hệ thống định kỳ.
8. **Template & Artifact Layer:** Bộ template bắt buộc để đảm bảo mọi Auditor tạo dữ liệu và tài sản theo cùng một chuẩn.

Các artifact tối thiểu phải tồn tại:

| Artifact | Mục đích |
|---|---|
| ICP Sheet | Khóa phân khúc mục tiêu và exclusion criteria |
| Lead Database | Lưu account, signal, pain, score, stage và learning |
| Scoring Matrix | Chấm điểm Hot/Warm/Cold nhất quán |
| Outreach Sequence Sheet | Quản lý touchpoint, message, CTA và status |
| Offer Brief | Chuyển pain thành business case và proposal |
| Pipeline Dashboard | Theo dõi conversion, stage, owner và next step |
| Win/Loss Log | Ghi lý do thắng/thua và insight |
| Optimization Memo | Cập nhật hệ thống sau mỗi vòng pilot |

---

## V. BỘ CÔNG CỤ SỬ DỤNG (TOOLBOX)
Học viên phải vận hành được bộ công cụ phục vụ cả đào tạo lẫn hệ thống thực chiến:

- **Dữ liệu & Pipeline:** Unified Lead Database (M5), Airtable / PostgreSQL / Google Sheets, CRM Pipeline Tracker.
- **Sourcing & Enrichment:** AI Search Agents, Scraper AI, Social Listening Tools, Apollo-style prospecting logic.
- **Outreach & Sales Assets:** LinkedIn / Zalo / Email workflow, Case Library, Teaser Audit templates, objection handling scripts.
- **Monetization:** ROI Calculator, Proposal/Pitch Deck Builder, Contract Templates, Intervention Charter.
- **Dashboard & Governance:** Funnel dashboard, win/loss log, forecast sheet, review cadence checklist.
- **Template Pack bắt buộc:** ICP Sheet, Lead Database Schema, Scoring Matrix, Outreach Sequence Sheet, Offer Brief, Pipeline Dashboard, Win/Loss Log, Optimization Memo.

Tool chỉ được xem là đạt nếu phục vụ được một artifact vận hành cụ thể. Không chấp nhận dùng tool chỉ để trình diễn hoặc tạo tài liệu rời rạc không đi vào ROS.

---

## VI. BÀI TẬP TỐT NGHIỆP MODULE 6 (GRADUATION PROJECT)

**Nhiệm vụ:** Hoàn thiện và chạy thử **Rainmaker Operating System v1** trên dữ liệu thật.

1. **Targeting System:** Xác định ít nhất 01 ICP rõ ràng và 03 segment ưu tiên.
2. **Qualified Pipeline:** Xây danh sách tối thiểu 50 account đã được làm giàu thông tin và chấm điểm theo scoring engine.
3. **Outreach Pilot:** Triển khai sequence hoàn chỉnh cho ít nhất 10 account mục tiêu với log trạng thái đầy đủ.
4. **Offer Engine:** Tạo ít nhất 01 bản Intervention Offer hoàn chỉnh dựa trên pain và business case thật.
5. **Pipeline Dashboard:** Theo dõi được stage progression, conversion, velocity và reason lost.
6. **Optimization Memo:** Viết bản review ngắn chỉ ra hệ thống đang nghẽn ở đâu và cần sửa gì trong vòng tiếp theo.

**Chuẩn số lượng khuyến nghị để hệ thống có dữ liệu học đủ tốt:**

| Chỉ tiêu | Tối thiểu | Khuyến nghị |
|---|---:|---:|
| Account researched | 50 | 100 |
| Account scored | 50 | 100 |
| Hot/Warm account | 15 | 30 |
| Account được outreach | 10 | 20 |
| Reply/interactions | 3 | 5+ |
| Discovery conversation | 1 | 2+ |
| Offer draft | 1 | 2 |
| Optimization Memo | 1 | 1 |

Các con số trên là **mức tham chiếu vận hành**, không phải quota cứng để gây áp lực cho học viên. Nếu chưa đạt mức khuyến nghị nhưng Auditor tạo ra được dữ liệu sạch, logic rõ, evidence đầy đủ và rút ra được insight đúng từ thị trường, module vẫn có thể được công nhận đạt yêu cầu ở mức nền móng.

### 6.1. Success Criteria for 30-Day Calibration Phase
Trong 30 ngày đầu, chuẩn thành công của Module 6 được chia thành 2 lớp:

**Auditor Outcomes**

- Auditor giải thích được Link Strategy đang săn loại pain nào.
- Auditor tự phân tích được một account dựa trên signal, evidence và pain hypothesis.
- Auditor giải thích được vì sao một account được xếp Hot/Warm/Cold.
- Auditor viết được outreach pain-led, không generic và có CTA phù hợp.
- Auditor chuyển được pain thành business case hoặc offer brief ở mức cơ bản.
- Auditor đọc được dashboard và chỉ ra được điểm nghẽn lớn nhất của vòng hiện tại.
- Auditor viết được optimization memo dựa trên dữ liệu pilot thật.

**System Outcomes**

- Có ICP v1 và segmentation logic đủ dùng.
- Có lead database với field rõ, signal source rõ và scoring rationale rõ.
- Có sequence đầu tiên, asset library nền và pipeline stage definition.
- Có ít nhất 01 offer brief hoặc intervention offer draft.
- Có dashboard đọc được stage, owner, next step và learning.
- Có win/loss log và vòng cập nhật hệ thống đầu tiên.

Module 6 được xem là thành công nếu hai lớp outcome này cùng xuất hiện ở mức vận hành được, ngay cả khi doanh thu chưa phát sinh trong 30 ngày đầu.

---

## VII. TIÊU CHUẨN NGHIỆM THU (DEFINITION OF DONE - DoD)
- [ ] Có tài liệu ICP, segmentation và logic ưu tiên account rõ ràng.
- [ ] Lead Database được chấm điểm bằng scoring framework nhất quán, không chấm cảm tính.
- [ ] Có sequence đa kênh, asset library và SOP chuyển bước cho từng giai đoạn tiếp cận.
- [ ] Có ít nhất 01 offer/proposal gắn với ROI, phạm vi can thiệp và cấu trúc thương mại cụ thể.
- [ ] Dashboard pipeline thể hiện được các KPI thương mại cốt lõi và lý do thắng/thua deal.
- [ ] Có pilot thực tế với account thật, dữ liệu thật và log vận hành đầy đủ.
- [ ] Auditor chứng minh được khả năng đọc dữ liệu, chẩn đoán điểm nghẽn và cập nhật ROS theo feedback loop.
- [ ] Có đầy đủ artifact bắt buộc: ICP Sheet, Lead Database, Scoring Matrix, Outreach Sequence, Offer Brief, Pipeline Dashboard, Win/Loss Log, Optimization Memo.
- [ ] Mọi account Hot/Warm đều có scoring rationale và evidence source.
- [ ] Mọi outreach thật đều vượt qua Outreach Quality Gate, không gửi message generic.
- [ ] Founder/Lead Auditor đã duyệt các gate quan trọng: ICP, scoring, outreach message, offer và optimization memo.

Lưu ý nghiệm thu:

- DoD ưu tiên **chất lượng logic, dữ liệu và khả năng học từ thị trường** hơn là sản lượng thuần túy.
- Học viên không bị đánh trượt chỉ vì chưa có deal trong 30 ngày đầu, nếu hệ thống đã hình thành đủ nền móng và có bằng chứng vận hành thật.
- Nếu sản lượng thấp nhưng evidence mạnh và insight đúng, Founder/Lead Auditor có thể công nhận hoàn thành ở mức `Foundation Pass`.

---

## VIII. KIỂM CHỨNG & NGHIỆM THU CUỐI (VERIFICATION GATE)
- [ ] Trình bày được toàn bộ kiến trúc ROS v1: từ Targeting đến Win/Loss Review.
- [ ] Demo được pipeline thật với stage, trạng thái, next step và owner rõ ràng.
- [ ] Giải thích được vì sao một account được xếp Hot/Warm/Cold dựa trên scoring logic.
- [ ] Chứng minh được sequence đã chạy có dữ liệu phản hồi, không chỉ là template tĩnh.
- [ ] Trình bày được ít nhất 01 business case chuyển từ pain sang offer thương mại cụ thể.
- [ ] Có bản tối ưu hóa sau pilot, chỉ rõ thay đổi nào sẽ áp dụng cho vòng vận hành tiếp theo.
- [ ] Chỉ ra được hệ thống hiện đang nghẽn ở đâu: targeting, scoring, message, channel, offer, qualification hay follow-up.
- [ ] Đề xuất được vòng thử nghiệm tiếp theo với giả thuyết rõ ràng, thay đổi cụ thể và KPI cần theo dõi.

Module 6 chỉ được công nhận hoàn thành khi Auditor không chỉ trình bày được ROS, mà còn **demo được một ROS đang chạy**: có dữ liệu thật, trạng thái thật, phản hồi thật, điểm nghẽn thật và kế hoạch tối ưu thật.
