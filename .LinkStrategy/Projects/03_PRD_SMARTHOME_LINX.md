<div style="width: 100% !important; font-family: sans-serif !important; white-space: nowrap !important; line-height: 0 !important; background-color: transparent !important;">
  <!-- Khối Metadata -->
  <div style="display: inline-block !important; width: 50% !important; vertical-align: middle !important; white-space: normal !important; line-height: 1.5 !important; border: 1px solid #004d40 !important; border-radius: 4px !important; overflow: hidden !important; margin: 0 !important; background-color: #f1f8e9 !important;">
    <div style="background-color: #004d40 !important; color: white !important; padding: 4px 10px !important; font-weight: bold !important; font-size: 0.8em !important; border: none !important; margin: 0 !important;">Product Requirements Document</div>
    <div style="padding: 8px 2px !important; background-color: #f1f8e9 !important; font-size: 0.8em !important; color: #1b5e20 !important; border: none !important; margin-top: -1px !important;">
      <div style="margin-bottom: 4px !important; background-color: transparent !important; line-height: 0.8 !important;">
        <span style="display: inline-block !important; width: 120px !important; font-weight: bold !important; color: #43a047 !important; background-color: transparent !important;">Project Name:</span><span style="color: #004d40 !important; font-weight: bold !important; background-color: transparent !important;">LINX Home (Agentic OS)</span>
      </div>
      <div style="margin-bottom: 4px !important; background-color: transparent !important; line-height: 1.1 !important;">
        <span style="display: inline-block !important; width: 120px !important; font-weight: bold !important; color: #43a047 !important; background-color: transparent !important;">Product Owner:</span><span style="color: #1b5e20 !important; background-color: transparent !important;">Link Strategy</span>
      </div>
      <div style="margin-bottom: 0 !important; background-color: transparent !important; line-height: 1.1 !important;">
        <span style="display: inline-block !important; width: 120px !important; font-weight: bold !important; color: #43a047 !important; background-color: transparent !important;">Lead Architect:</span><span style="color: #1b5e20 !important; background-color: transparent !important;">Lê Đức Anh</span>
      </div>
    </div>
  </div><!-- QUAN TRỌNG: KHÔNG ĐỂ KHOẢNG TRẮNG Ở ĐÂY --><div style="display: inline-block !important; width: 54% !important; vertical-align: middle !important; text-align: right !important; white-space: normal !important; line-height: 1.5 !important; margin: 0 !important; background-color: transparent !important;">
    <!-- Khối Branding Badge -->
    <div style="display: inline-flex !important; align-items: center !important; background-color: #004d40 !important; padding: 8px 14px !important; border-radius: 4px !important; text-align: left !important; box-shadow: 0 2px 6px rgba(0,0,0,0.15) !important;">
      <img src="../Assets/LINK%20STRATEGY.png" width="32" height="32" alt="Link Strategy Logo" style="background-color: white !important; padding: 2px !important; border-radius: 50% !important; display: block !important; border: none !important; object-fit: contain !important;">
      <div style="margin-left: 12px !important; background-color: transparent !important;">
        <div style="font-size: 1.25em !important; font-weight: bold !important; letter-spacing: 1px !important; line-height: 1 !important; background-color: transparent !important;">
          <span style="color: white !important; background-color: transparent !important;">LINK</span> <span style="color: #FFB800 !important; background-color: transparent !important;">STRATEGY</span>
        </div>
        <div style="font-size: 0.65em !important; font-weight: bold !important; color: #cccccc !important; letter-spacing: 0.5px !important; line-height: 1 !important; background-color: transparent !important;">OPERATION SOLUTIONS DIVISION</div>
      </div>
    </div>
  </div>
</div>

**LINX Home** không phải là một hệ thống thiết bị thông minh rời rạc. Đây là một **Hệ điều hành AI (Agentic OS)** quản lý toàn bộ môi trường vật lý của gia đình, ưu tiên sự riêng tư tuyệt đối, khả năng phản ứng thời gian thực và trải nghiệm điều khiển tự nhiên qua ngôn ngữ.

LINX Home không chỉ quản lý thiết bị, an ninh và ngữ cảnh sinh hoạt, mà còn điều phối **dòng năng lượng** trong nhà theo thời gian thực. Hệ thống hướng tới mô hình **Resilient Circular Energy**: quan sát, ưu tiên, dịch chuyển và tái phân bổ năng lượng giữa các nguồn và tải tiêu thụ để giảm lãng phí, duy trì vận hành cho các hệ thống trọng yếu và tăng khả năng tự phục hồi của ngôi nhà khi có sự cố điện.

![LINX Home Agentic OS Architecture](../Assets/03_Architecture_LINX.png)

<!-- ```mermaid
graph LR
    subgraph DEVICES ["DEVICE LAYER"]
        T1["📸 Cameras & Sensors"]
        T2["🏠 Home Appliances"]
        T3["🚗 Mobility (EV/Car)"]
    end

    subgraph NETWORKS ["CONNECTIVITY"]
        N1["🌐 Matter / Thread"]
        N2["📦 T-Box Gateway"]
        N3["📶 WiFi 6E / LTE"]
    end

    subgraph MIDDLEWARE ["AGENTIC CORE"]
        M1["🧠 SLM & CV Models"]
        M2["⚙️ Decision Engine"]
        M3["💾 Private NVR / DB"]
    end

    subgraph APPS ["USER INTERFACE"]
        A1["🗣️ Voice Interaction"]
        A2["📱 Mobile Dashboards"]
        A3["☁️ Cloud Fleeting"]
    end

    %% Optimized Flow
    T2 <==> N2
    N2 <==> M2
    M2 <==> A2

    %% Styling
    style N2 fill:#27ae60,color:#fff
    style M2 fill:#2980b9,color:#fff
    style A2 fill:#d35400,color:#fff
``` -->
![1776353506398](image/03_PRD_SMARTHOME_LINX/1776353506398.png)
### 2. Giá trị cốt lõi (Value Propositions)

* **Privacy-First Intelligence**: Xử lý dữ liệu camera và giọng nói ngay tại Edge (T-Box), hạn chế tối đa việc đẩy dữ liệu nhạy cảm ra ngoài internet.
* **Intent-based Assistance**: Hỗ trợ điều khiển nhà dựa trên nhu cầu thực tế, chuyển từ việc bấm nút sang giao tiếp tự nhiên.
* **Proactive Security**: Cảnh báo sớm và gợi ý các biện pháp bảo vệ (như khóa cửa, bật đèn) khi phát hiện dấu hiệu bất thường.
* **Health-Aware Automation**: Tối ưu hóa môi trường sống hỗ trợ sức khỏe dựa trên dữ liệu môi trường và thể trạng người dùng.
* **Resilient Circular Energy**: Theo dõi, ưu tiên và tái phân bổ năng lượng giữa các nguồn và tải tiêu thụ để giảm lãng phí, tối ưu chi phí điện, đồng thời duy trì hoạt động của các hệ thống trọng yếu trong tình huống mất điện hoặc nguồn điện không ổn định.

---

## II. ĐỐI TƯỢNG NGƯỜI DÙNG & PERSONAS

| Người dùng             | Đặc điểm & Nhu cầu                                                                                                                |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| **Home Principal**  | Chủ biệt thự/Penthouse.`Ưu tiên: **An ninh tuyệt đối** & **Riêng tư**.`Tương tác: Hệ thống tự hiểu không cần App. |
| **Elderly/Guest**   | Người cao tuổi hoặc khách.`Cần: Giao diện giọng nói đơn giản,`hỗ trợ an toàn (Cảnh báo ngã).                       |
| **The Facilitator** | Quản gia/Người giúp việc.`Cần: Quyền truy cập tạm thời,`nhận hàng (Logistic) & vận hành thiết bị.                    |

---

## III. PRODUCT THESIS (CÁC LUẬN ĐIỂM SẢN PHẨM)

*Hệ thống LINX được xây dựng dựa trên 20 luận điểm cốt lõi nhằm giải quyết triệt để các nỗi đau (pain points) thực tế của phân khúc khách hàng cao cấp, chuyển đổi từ "Nhà thông minh" sang "Ngôi nhà có tri thức".*

---

### 1. 🛡️ Home Sovereignty (Chủ quyền ngôi nhà)

- **Vấn đề (Pain point):** Chủ nhà không tin tưởng hệ smart home vì sợ phụ thuộc cloud, lộ dữ liệu, bị vendor khóa hệ sinh thái.
- **Luận điểm (Thesis):** Ngôi nhà phải có chủ quyền dữ liệu, chủ quyền điều khiển và chủ quyền ra quyết định. LINX không chỉ là smart home, mà là lớp kiểm soát tối cao thuộc về gia chủ.
- **Đối tượng:** Chủ biệt thự/penthouse, khách hàng high-net-worth, người nhạy cảm với privacy.

### 2. ⚡ Autonomous Continuity (Vận hành tự quản)

- **Vấn đề (Pain point):** Khi mất mạng, mất điện, lỗi cloud hoặc chủ nhà đi vắng, hệ thống dễ “ngu” đi hoặc mất tác dụng.
- **Luận điểm (Thesis):** Ngôi nhà vẫn phải vận hành có trật tự khi hạ tầng suy giảm. Nhấn mạnh khả năng sống sót, fallback, offline-first và graceful degradation.
- **Đối tượng:** Chủ nhà cao cấp, villa xa trung tâm, nhà có nhiều hệ thống trọng yếu, người ưu tiên độ tin cậy.

### 3. 👨‍👩‍👧‍👦 Family Operating System (Hệ điều hành gia đình)

- **Vấn đề (Pain point):** Nhà có nhiều người, nhiều vai trò nhưng smart home thường chỉ phục vụ một user chính.
- **Luận điểm (Thesis):** Ngôi nhà là một hệ nhiều người dùng với quyền, sở thích và routine khác nhau. LINX phải hiểu cấu trúc gia đình chứ không chỉ hiểu thiết bị.
- **Đối tượng:** Gia đình nhiều thế hệ, nhà đông thành viên, nhà có quản gia/người giúp việc.

### 4. 👴 Aging-in-Place (An tâm cho người cao tuổi)

- **Vấn đề (Pain point):** Người già sống cùng gia đình nhưng ai cũng sợ rủi ro té ngã, bất thường, sống một mình không an toàn.
- **Luận điểm (Thesis):** Hỗ trợ người cao tuổi sống độc lập lâu hơn mà vẫn an toàn, kín đáo và có thể được gia đình theo dõi ở mức vừa đủ.
- **Đối tượng:** Gia đình có ông bà, người lớn tuổi sống một mình, dịch vụ chăm sóc cao cấp.

### 5. 👶 Care & Protection (Bảo vệ đối tượng yếu thế)

- **Vấn đề (Pain point):** Trẻ nhỏ và thú cưng thường gặp rủi ro ở hồ bơi, cầu thang, bếp, sân vườn.
- **Luận điểm (Thesis):** Nhà không chỉ phản ứng với trộm mà còn bảo vệ những đối tượng dễ tổn thương bên trong qua lớp "bảo vệ mềm" liên tục.
- **Đối tượng:** Gia đình có con nhỏ, gia đình nuôi thú cưng, nhà có không gian mở (hồ bơi/sân vườn).

### 6. ✨ Low-friction Luxury (Sự xa xỉ tinh tế)

- **Vấn đề (Pain point):** Người dùng muốn nhà tiện nghi hơn nhưng không muốn phải bấm app liên tục hoặc học quá nhiều automation.
- **Luận điểm (Thesis):** Sự xa xỉ nằm ở việc mọi thứ diễn ra trơn tru và vô hình. Nhà hiểu ý định sống hơn là chờ lệnh thủ công từ ứng dụng.
- **Đối tượng:** Chủ nhà cao cấp, người bận rộn, khách hàng yêu cầu trải nghiệm premium.

### 7. 🌿 Healthy Environment OS (Hệ điều hành môi trường sống)

- **Vấn đề (Pain point):** Nhà có điều hòa, đèn, quạt nhưng môi trường sống vẫn thiếu nhất quán, lúc tốt lúc tệ.
- **Luận điểm (Thesis):** Quản lý không khí, ánh sáng, nhịp sinh học và giấc ngủ như một hệ thống nhất quán để nâng cao chất lượng sống mỗi ngày.
- **Đối tượng:** Gia đình có trẻ nhỏ/người già, người quan tâm sức khỏe, nhà ở khu vực ô nhiễm.

### 8. 🔋 Energy Resilience & Orchestration (Tự chủ năng lượng)

- **Vấn đề (Pain point):** Điện năng bị tiêu hao lãng phí, mất điện gây gián đoạn, không rõ tải nào đang ngốn điện.
- **Luận điểm (Thesis):** Ngôi nhà không chỉ tiêu thụ mà phải hiểu, ưu tiên và tái phân bổ năng lượng để tiết kiệm và duy trì vận hành khi có sự cố.
- **Đối tượng:** Villa lớn, nhà có xe điện (EV)/năng lượng mặt trời, người quan tâm chi phí vận hành.

### 9. 💎 Asset Preservation (Bảo toàn tài sản)

- **Vấn đề (Pain point):** Thiết bị trong nhà hỏng dần, chạy kém, hao điện nhưng chủ nhà chỉ biết khi đã có sự cố nghiêm trọng.
- **Luận điểm (Thesis):** Bảo toàn giá trị tài sản vật lý bằng cách phát hiện bất thường sớm, nhắc bảo trì và tối ưu vòng đời thiết bị.
- **Đối tượng:** Chủ nhà có nhiều tài sản giá trị cao, biệt thự lớn, biệt thự nghỉ dưỡng (second home).

### 10. 🏠 Domestic Operations OS (Vận hành quản gia)

- **Vấn đề (Pain point):** Nhà đẹp, nhiều thiết bị đắt tiền nhưng vẫn phải phụ thuộc người giúp việc mới vận hành mượt.
- **Luận điểm (Thesis):** Ngôi nhà là một hệ vận hành có lịch trình, vai trò, quy tắc và checklist. Giải phóng chủ nhà khỏi các việc lặt vặt.
- **Đối tượng:** Nhà có quản gia, villa cao cấp, chủ nhà bận rộn ít trực tiếp quản lý.

### 11. 🍷 Hospitality Intelligence (Trí tuệ tiếp đón)

- **Vấn đề (Pain point):** Chủ nhà thường xuyên tiếp khách, có khách lưu trú nhưng việc chuyển trạng thái nhà còn thủ công.
- **Luận điểm (Thesis):** Nhà tự động chuyển chế độ theo tình huống: tiếp khách trang trọng, tiệc tùng, hoặc lưu trú riêng tư.
- **Đối tượng:** Chủ nhà thường xuyên giao thiệp, biệt thự nghỉ dưỡng, nhà có không gian tiệc.

### 12. 📦 Service Orchestration (Điều phối dịch vụ)

- **Vấn đề (Pain point):** Các việc như giao hàng, sửa chữa, chăm cây bị phân mảnh và khó kiểm soát an ninh.
- **Luận điểm (Thesis):** Nhà trở thành hub điều phối nhân sự và quyền truy cập tạm thời một cách an toàn và có lịch trình.
- **Đối tượng:** Nhà có nhiều nhân sự dịch vụ, chủ nhà bận rộn, villa nhiều hạng mục vận hành.

### 13. 🛠️ Legacy Retrofitting Intelligence (Thông minh cho nhà hiện hữu)

- **Vấn đề (Pain point):** Nhà cũ hoặc đã hoàn thiện nội thất rất khó nâng cấp thành smart home mà không đập đi làm lại.
- **Luận điểm (Thesis):** Mang logic thông minh vào nhà hiện hữu thông qua các giải pháp nâng cấp ít xâm lấn nhưng hiệu quả cao.
- **Đối tượng:** Chủ nhà hiện hữu muốn nâng cấp, nhà cải tạo, căn hộ cao cấp.

### 14. 🌪️ Climate Adaptation Home (Thích ứng khí hậu)

- **Vấn đề (Pain point):** Thời tiết nóng ẩm, bụi, mưa bão làm nhà vận hành kém ổn định và nhanh xuống cấp.
- **Luận điểm (Thesis):** Nhà chủ động thích ứng với điều kiện khí hậu thực tế để bảo vệ thiết bị, tài sản và duy trì sự thoải mái.
- **Đối tượng:** Nhà ở khu vực khắc nghiệt (nóng ẩm, ven biển), vùng hay mất điện.

### 15. 👤 Personal Territory Intelligence (Lãnh thổ cá nhân)

- **Vấn đề (Pain point):** Mỗi thành viên có nhịp sống riêng, nhưng hệ thống hiện tại thường áp một logic chung cho cả nhà.
- **Luận điểm (Thesis):** Hiểu “lãnh thổ vô hình” và thói quen của từng người để cá nhân hóa sâu sắc không gian sống.
- **Đối tượng:** Gia đình nhiều thế hệ, nhà nhiều phòng chức năng, người coi trọng sự riêng tư.

### 16. 🧠 Home Memory (Trí nhớ ngôi nhà)

- **Vấn đề (Pain point):** Smart home hiện tại không có trí nhớ dài hạn, không học được lịch sử và các mẫu bất thường.
- **Luận điểm (Thesis):** Cần một trí nhớ liên tục về hành vi, sự cố và routine để đưa ra phản ứng ngày càng chính xác và tinh tế hơn.
- **Đối tượng:** Người dùng dài hạn, hệ thống có nhiều kịch bản tự động hóa phức tạp.

### 17. 🌐 Digital Twin of the Home (Bản sao số của ngôi nhà)

- **Vấn đề (Pain point):** Chủ nhà không thật sự biết điều gì đang diễn ra trong nhà theo thời gian dài, chỉ thấy các cảnh báo rời rạc.
- **Luận điểm (Thesis):** Xây dựng mô hình mô phỏng trạng thái tổng thể để dự báo tác động và tối ưu hóa vận hành hạ tầng.
- **Đối tượng:** Nhà phức tạp, biệt thự lớn, khách hàng am hiểu công nghệ.

### 18. 📝 Domestic Compliance & Audit (Kiểm soát & Truy vết)

- **Vấn đề (Pain point):** Có nhiều lượt ra vào, tương tác với tài sản nhưng thiếu nhật ký tin cậy để truy vết khi cần.
- **Luận điểm (Thesis):** Mọi hành động quan trọng cần có lịch sử kiểm chứng được, đảm bảo tính minh bạch trong vận hành hộ gia đình.
- **Đối tượng:** Chủ biệt thự có nhiều nhân sự ra vào, gia đình có tài sản giá trị, nhà cho thuê cao cấp.

### 19. 🧘 Private Sanctuary (Nơi trú ẩn riêng tư)

- **Vấn đề (Pain point):** Nhà là nơi nghỉ ngơi nhưng thực tế lại ồn, nhiều kích thích và nhiều quyết định nhỏ gây mệt mỏi.
- **Luận điểm (Thesis):** Ngôi nhà là không gian phục hồi tinh thần, giảm nhiễu, giảm ma sát để trả lại sự tĩnh lặng cho chủ nhân.
- **Đối tượng:** Người làm việc áp lực cao, lãnh đạo doanh nghiệp, khách hàng ưu tiên wellness.

### 20. 🎎 Ritual-driven Living (Sống theo nghi thức)

- **Vấn đề (Pain point):** Smart home thường là tập hợp luật rời rạc, không hiểu các nghi thức sống lặp lại của con người.
- **Luận điểm (Thesis):** Hiểu các nghi thức (thức dậy, ăn tối, thiền, tập luyện) để điều phối không gian theo nhịp sống tự nhiên.
- **Đối tượng:** Gia đình có routine rõ ràng, người yêu thích nghệ thuật sống (lifestyle design).

---

## IV. YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENTS)

Các yêu cầu chức năng dưới đây được thiết kế để hiện thực hóa 20 luận điểm (Thesis) đã nêu, tạo thành một hệ sinh thái tính năng đồng nhất và thực tiễn.

### T1. Home Sovereignty (Chủ quyền ngôi nhà)

* **[F.T1.1] Edge AI Processing**: Mọi xử lý về ngôn ngữ tự nhiên (SLM), nhận diện khuôn mặt và phân tích hành vi phải thực hiện 100% tại LINX T-Box cục bộ.
* **[F.T1.2] Private Data Residency**: Dữ liệu video NVR và nhật ký sinh hoạt được lưu trữ mã hóa AES-256 tại ổ cứng nội bộ, không đồng bộ thô lên cloud vendor.
* **[F.T1.3] Local-only Biometrics**: Toàn bộ dữ liệu FaceID và vân tay được lưu trữ trong phân vùng an ninh (Secure Element) của phần cứng cục bộ, không bao giờ rời khỏi nhà.
* **[F.T1.4] Vendor Agnostic Control**: Khả năng điều khiển thiết bị qua LAN/Local API thay vì cloud-to-cloud bất cứ khi nào thiết bị hỗ trợ (Matter, Zigbee, Local Webhook).

### T2. Autonomous Continuity (Vận hành tự quản)

* **[F.T2.1] Offline Ops Logic**: Hệ thống tự duy trì các automation, an ninh và điều phối năng lượng ngay cả khi mất kết nối Internet hoàn toàn.
* **[F.T2.2] Self-Healing Power Transition**: Tự động chuyển đổi giữa lưới điện, pin lưu trữ hoặc xe điện (V2H) và thực hiện cắt tải không thiết yếu để bảo vệ hạ tầng.
* **[F.T2.3] Critical Mesh Failover**: Các nút AI Node (Camera, Cảm biến) tự động tạo mạng mesh dự phòng để truyền tin về trung tâm khi switch mạng chính gặp sự cố.
* **[F.T2.4] Local Voice Control (Offline)**: Agent hiểu và thực hiện các lệnh điều khiển thiết bị cơ bản trực tiếp qua voice mà không cần kết nối cloud LLM.

### T3. Family Operating System (Hệ điều hành gia đình)

* **[F.T3.1] Persona-based Context**: Agent nhận diện người đang hiện diện để áp dụng quyền hạn (Vd: Trẻ em không được điều chỉnh bếp/nhiệt độ quá cao).
* **[F.T3.2] Shared Space Conflict Resolution**: Sử dụng logic ưu tiên (người già/trẻ em) hoặc số đông để điều phối môi trường (nhẹ, nhạc, nhiệt độ) khi nhiều người cùng ở không gian chung.
* **[F.T3.3] Family Broadcast & Messaging**: Hỗ trợ gửi thông báo rảnh tay giữa các phòng ("Agent, gọi các con xuống ăn cơm") và hiển thị ghi chú gia đình trên các Smart Display.
* **[F.T3.4] Multi-user Routine Sync**: Tự động dời lịch dọn dẹp hoặc các automation ồn ào khi có thành viên đang họp hoặc đang ngủ trong phòng.

### T4. Aging-in-Place (An tâm cho người cao tuổi)

* **[F.T4.1] Non-Invasive Falls Monitoring**: Sử dụng cảm biến radar mmWave để phát hiện té ngã hoặc trạng thái bất động kéo dài mà không xâm phạm riêng tư bằng hình ảnh.
* **[F.T4.2] Health Adherence Support**: Agent nhắc lịch uống thuốc bằng giọng nói và yêu cầu xác nhận. Nếu không có phản hồi sau 3 lần nhắc, hệ thống sẽ gửi cảnh báo cho người thân.
* **[F.T4.3] Emergency Voice Trigger**: Nhận diện các câu lệnh khẩn cấp ("Cứu tôi với", "Giúp tôi") để ngay lập tức mở khóa cửa chính và gọi điện cho danh sách liên lạc khẩn cấp.
* **[F.T4.4] Gentle Night Path**: Tự động bật đèn dẫn hướng từ giường đến nhà vệ sinh với độ sáng cực thấp (2%) khi phát hiện người cao tuổi thức dậy vào ban đêm.

### T5. Care & Protection (Bảo vệ đối tượng yếu thế)

* **[F.T5.1] Dangerous Zone Guarding**: Cảnh báo tức thì qua loa và điện thoại nếu trẻ em hoặc thú cưng tiếp cận hồ bơi, cầu thang hoặc khu vực bếp đang hoạt động.
* **[F.T5.2] Virtual Fence (Outdoor)**: Thông báo ngay lập tức nếu thú cưng vượt khỏi ranh giới sân vườn được định nghĩa trên bản đồ số.
* **[F.T5.3] Sound Pattern Recognition**: Nhận diện tiếng la hét, kính vỡ hoặc tiếng báo động của thiết bị bên thứ 3 (như báo khói legacy) để Agent chủ động kiểm tra.
* **[F.T5.4] Kid-Safe Home Mode**: Tự động ngắt điện các ổ cắm thông minh tầm thấp và khóa các ngăn kéo chứa vật dụng nguy hiểm khi trẻ em ở một mình trong phòng.

### T6. Low-friction Luxury (Sự xa xỉ tinh tế)

* **[F.T6.1] Intent-based Interaction**: Agent hiểu các câu lệnh mơ hồ như "Tôi thấy hơi lạnh" hoặc "Chuẩn bị cho tôi đi làm" để tự điều phối hàng loạt thiết bị (nhiệt độ, cổng, đèn).
* **[F.T6.2] Contextual Memory**: Agent nhớ các lệnh gần đây để xử lý tiếp nối ("Tắt nó đi" sau khi vừa hỏi về trạng thái một chiếc đèn cụ thể).
* **[F.T6.3] Proactive Life Preparation**: Tự động nhắc chủ nhân mang ô nếu dự báo mưa ngay khi phát hiện họ đi giày và chuẩn bị rời nhà (FaceID tại cửa).
* **[F.T6.4] Car-Identity Entry**: Tự động mở cổng/gara dựa trên nhận diện biển số phối hợp với GPS điện thoại để đảm bảo tính an ninh và tiện lợi tối đa.

### T7. Healthy Environment OS (Hệ điều hành môi trường sống)

* **[F.T7.1] Circadian Lighting Orchestration**: Điều chỉnh nhiệt độ màu (CCT) và cường độ ánh sáng toàn nhà theo nhịp sinh học và độ ẩm/nhiệt độ môi trường.
* **[F.T7.2] Air Quality Recovery**: Tự động kích hoạt thông gió lấy khí tươi hoặc lọc khí chuyên sâu khi phát hiện nồng độ CO2, PM2.5 hoặc hợp chất hữu cơ dễ bay hơi (VOC) vượt ngưỡng.
* **[F.T7.3] Bio-adaptive Shading**: Điều chỉnh rèm cửa theo góc nắng để tối ưu ánh sáng tự nhiên nhưng không gây chói mắt và bảo vệ nội thất khỏi tia UV.
* **[F.T7.4] Humidity Intelligence**: Điều phối giữa máy bù ẩm, điều hòa và thông gió để duy trì độ ẩm lý tưởng cho da và hệ hô hấp (45-55%).

### T8. Energy Resilience & Orchestration (Tự chủ năng lượng)

* **[F.T8.1] Real-time Energy Telemetry**: Quan sát dòng điện tiêu thụ đến từng nhánh tải và phân loại thiết bị ngốn điện nhiều nhất theo thời gian thực.
* **[F.T8.2] Critical Load Prioritization**: Đảm bảo duy trì nguồn điện cho các thiết bị trọng yếu (T-Box, Camera, Tủ lạnh, Thiết bị y tế) khi nguồn dự phòng (Battery/EV) ở mức thấp.
* **[F.T8.3] Smart Load Shifting**: Tự động dời lịch vận hành các tải lớn (máy giặt, lọc hồ bơi, bơm nước) sang khung giờ điện rẻ hoặc khi nguồn mặt trời đang dư thừa.
* **[F.T8.4] V2H Logic Sync**: Tích hợp với xe điện để quản lý chu kỳ xả điện dự phòng cho nhà (Vehicle-to-Home) mà vẫn đảm bảo dung lượng tối thiểu cho xe di chuyển vào sáng hôm sau.

### T9. Asset Preservation (Bảo toàn tài sản)

* **[F.T9.1] Equipment Health Fingerprinting**: Giám sát mẫu hình tiêu thụ điện (Power Signature) của điều hòa, tủ lạnh để cảnh báo block máy yếu hoặc cần bảo trì trước khi hỏng.
* **[F.T9.2] Water Leak & Auto-Shutoff**: Tự động khóa van nước thông minh ngay lập tức khi phát hiện rò rỉ tại các đầu cảm biến ở sàn nhà, kho máy.
* **[F.T9.3] Predictive Air Filter Life**: Nhắc lịch thay lõi lọc khí/nước dựa trên tổng lượng không khí/nước đã thực tế xử lý thay vì chỉ đếm ngày.
* **[F.T9.4] Outdoor Asset Protection**: Tự động thu rèm cuốn, mái che và tắt hệ thống tưới khi vận tốc gió vượt ngưỡng an toàn cho thiết bị.

### T10. Domestic Operations OS (Vận hành quản gia)

* **[F.T10.1] Household Task Orchestrator**: Quản lý checklist dọn dẹp hàng ngày cho quản gia/giúp việc và thông báo trạng thái hoàn thành cho chủ nhà qua Agent.
* **[F.T10.2] Inventory Intelligence**: Theo dõi mức độ tiêu hao của các nhu yếu phẩm (trong kho đồ khô) dựa trên tần suất mở tủ/cảm biến weight và gợi ý danh sách mua sắm.
* **[F.T10.3] Maintenance Log Audit**: Ghi nhật ký mọi lần bảo trì thiết bị và dịch vụ trong nhà để dễ dàng truy xuất thông tin bảo hành sau này.

### T11. Hospitality Intelligence (Trí tuệ tiếp đón)

* **[F.T11.1] Guest Zone Confinement**: Chế độ tự động cấu hình các automation và quyền điều khiển chỉ trong các không gian khách được phép tiếp cận.
* **[F.T11.2] Temporary Digital Keys**: Cấp mã QR hoặc FaceID tạm thời cho khách ở lại và tự động thu hồi quyền sau khi khách checkout.
* **[F.T11.3] Hospitality Scene Orchestration**: Chuyển đổi toàn bộ nhà sang chế độ Tiệc (Party) với kịch bản ánh sáng động, nhạc đa vùng và tăng cường lọc khí tươi cho khu vực tập đông người.
* **[F.T11.4] Wi-Fi for Guest Sharing**: Hiển thị QR truy cập Wi-Fi khách trên màn hình Smart Display khi phát hiện có khách mới vào nhà.

### T12. Service Orchestration (Điều phối dịch vụ)

* **[F.T12.1] Unattended Logistics Hub**: Xác thực danh tính shipper qua Agent Voice/Face và điều phối việc giao nhận qua Smart Locker tích hợp camera xác nhận gói hàng.
* **[F.T12.2] Verified Access Management**: Cấp quyền mở cổng/mở cửa cho nhân viên dịch vụ theo lịch đặt trước và tự động kích hoạt ghi hình camera "High-Priority" trong suốt thời gian họ có mặt.
* **[F.T12.3] Remote Service Supervision**: Cho phép chủ nhà xem luồng camera theo dấu nhân sự dịch vụ và đàm thoại trực tiếp qua loa Agent khi phát hiện hành vi sai quy định.

### T13. Legacy Retrofitting Intelligence (Thông minh cho nhà hiện hữu)

* **[F.T13.1] Universal IR Learning**: T-Box học lệnh và điều khiển các thiết bị không thông minh (Điều hòa cũ, quạt, TV cũ) qua các node phát hồng ngoại rải rác.
* **[F.T13.2] Power-based State Detection**: Sử dụng Smart Plug đo điện năng để Agent biết trạng thái thực sự của các thiết bị "dumb" (Vd: Biết máy giặt đã giặt xong dù máy không có wifi).
* **[F.T13.3] RF/Zigbee Bridge**: Mang các thiết bị đời cũ (remotes, touch switches) vào hệ sinh thái quản lý tập trung của Agent qua các bộ chuyển đổi giao thức.

### T14. Climate Adaptation Home (Thích ứng khí hậu)

* **[F.T14.1] Adaptive Garden Hydration**: Tự động điều chỉnh lịch tưới cây dựa trên dữ liệu dự báo mưa địa phương và độ ẩm đất thực tế để tiết kiệm nước và bảo vệ rễ cây.
* **[F.T14.2] Storm Response Protocol**: Tự động chuyển toàn bộ hệ thống sang trạng thái "An toàn": Đóng mọi cửa kính, thu mái che, kiểm tra mức pin dự phòng và thông báo cho gia chủ.
* **[F.T14.3] Humidity-aware Comfort**: Trong những ngày nồm (độ ẩm cực cao), hệ thống tự động chạy chế độ dry và sưởi sàn để giữ nhà khô ráo, tránh mốc tài sản.

### T15. Personal Territory Intelligence (Lãnh thổ cá nhân)

* **[F.T15.1] Infinite Persona Sync**: Chào hỏi và áp dụng ngay lập tức cấu hình yêu thích (vị trí ghế sofa, nhiệt độ, playlist) khi thành viên riêng biệt bước vào phòng chức năng của họ.
* **[F.T15.2] Social Distance Automation**: Tự động giảm âm lượng nhạc ở các phòng lân cận khi phát hiện có thành viên đang làm việc/học tập cần sự yên tĩnh tuyệt đối.
* **[F.T15.3] Privacy Zones**: Tự động ngắt kết nối vật lý camera trong các phòng ngủ khi chủ nhân vào phòng (chế độ Privacy-shutter vật lý).

### T16. Home Memory (Trí nhớ ngôi nhà)

* **[F.T16.1] Continuous Drift Learning**: Nếu chủ nhà thường xuyên chỉnh tay điều hòa sau khi automation chạy, Agent sẽ hỏi: "Tôi thấy bạn thường chỉnh lên 26 độ vào lúc này, bạn có muốn tôi cập nhật automation không?".
* **[F.T16.2] Behavioral History Visualization**: Cho phép xem lại bản đồ nhiệt (Heatmap) về thói quen sử dụng nhà qua các tháng để gợi ý bố trí lại thiết bị tối ưu hơn.
* **[F.T16.3] Home Incident Memory**: Ghi nhớ các sự cố (như khu vực hay bị đọng nước, thiết bị hay mất kết nối) để Agent chủ động kiểm tra định kỳ các "điểm yếu" đó.

### T17. Digital Twin of the Home (Bản sao số của ngôi nhà)

* **[F.T17.1] Real-time 3D Operations**: Cung cấp giao diện 3D trực quan cho phép điều khiển thiết bị bằng cách tương tác trực tiếp trên mô hình nhà (Vd: Chạm vào cửa sổ trên 3D để đóng rèm thật).
* **[F.T17.2] Scenario Simulation**: Cho phép gia chủ "chạy thử" một kịch bản mới trên Digital Twin để xem dự báo về tiêu thụ điện và tác động ánh sáng trước khi áp dụng thực tế.
* **[F.T17.3] Environmental Heatmaps**: Hiển thị lớp phủ (overlay) về nhiệt độ, chất lượng không khí và cường độ wifi trên mô hình 3D để tìm các điểm mù.

### T18. Domestic Compliance & Audit (Kiểm soát & Truy vết)

* **[F.T18.1] Immutable Security Logs**: Ghi nhật ký vào phân vùng bảo vệ về mọi sự kiện mở cửa, thay đổi mã PIN, hoặc tắt camera – không ai (kể cả quản gia) có thể xóa được.
* **[F.T18.2] Asset Interaction Audit**: Cảnh báo và ghi hình khi có người (không phải gia chủ) tiếp cận hoặc tác động vào các khu vực chứa tài sản nhạy cảm (Két sắt, tủ rượu sưu tầm).
* **[F.T18.3] Privacy Compliance Report**: Hàng tuần Agent gửi báo cáo về việc dữ liệu cá nhân đã được sử dụng thế nào và yêu cầu xác nhận tiếp tục cấp quyền cho các tính năng AI.

### T19. Private Sanctuary (Nơi trú ẩn riêng tư)

* **[F.T19.1] Bio-feedback Recovery Mode**: Tự động đề xuất kịch bản "Phục hồi" (Mùi hương tinh dầu, nhạc sóng não, ánh sáng 2000K) khi đồng hồ thông minh báo mức stress của gia chủ cao liên tục trong 30 phút.
* **[F.T19.2] Distraction-Free Focused Mode**: Ngắt mọi thông báo loa/màn hình không khẩn cấp và kích hoạt mặt nạ âm thanh (Pink Noise) trong phòng làm việc khi chủ nhân kích hoạt chế độ tập trung.
* **[F.T19.3] Sleep Hygiene Orchestration**: Giảm dần nhiệt độ màn hình, tắt wifi công suất cao gần giường và điều chỉnh ánh sáng đỏ (low-blue-light) 1 giờ trước khi đi ngủ.

### T20. Ritual-driven Living (Sống theo nghi thức)

* **[F.T20.1] Ritual Sequence Management**: Hỗ trợ các chuỗi hành động phức tạp lặp lại như "Nghi thức trà chiều" (Chuẩn bị nước nóng đúng nhiệt độ, hạ rèm, mở nhạc Jazz nhẹ, bật thơm phòng).
* **[F.T20.2] Event-driven Atmosphere**: Tự động chuyển mode nhà theo lịch âm/dương (Vd: Chế độ Tết, Chế độ Giáng sinh, Chế độ Kỷ niệm ngày cưới) với các kịch bản trang trí ánh sáng đặc trưng.
* **[F.T20.3] Wellness Ritual Sync**: Phối hợp với các app thiền/tập luyện để chuẩn bị không gian phù hợp (thảm tập được chiếu sáng, nhiệt độ phòng hạ xuống 22 độ) ngay khi gia chủ mở app.

---

## V. YÊU CẦU KỸ THUẬT (TECHNICAL REQUIREMENTS)

### 1. Kiến trúc hệ thống

* **Core OS**: Chạy trên LINX T-Box (Edge Server).
* **LLM Engine**: Sử dụng Small Language Model (SLM) tối ưu hóa chạy cục bộ cho các tác vụ điều khiển; Cloud LLM chỉ dùng cho các truy vấn kiến thức rộng.
* **Connectivity**: Hỗ trợ chuẩn Matter, Zigbee 3.0, Thread và Wi-Fi 6.
* **Energy Telemetry Layer**: Hỗ trợ thu thập dữ liệu từ smart meter, circuit monitor, inverter, UPS, EV charger và battery interface để Agent có thể quan sát và điều phối dòng năng lượng theo thời gian thực.

### 2. Hiệu năng & Rào cản kỹ thuật

* **Latency**: Phản hồi lệnh voice nội bộ < 500ms. Kích hoạt kịch bản an ninh < 200ms.
* **Offline Capability**: 100% kịch bản an ninh and điều khiển cơ bản phải hoạt động khi mất internet.
* **Storage**: Dữ liệu video camera lưu trữ cục bộ (NVR tích hợp trong T-Box) với chuẩn mã hóa AES-256.
* **Energy Safety Boundary**: Các hành động điều phối năng lượng có ảnh hưởng tới tải công suất lớn, inverter, battery hoặc EV chỉ được thực thi khi thiết bị tích hợp hỗ trợ giao tiếp an toàn và policy cho phép; trong các trường hợp còn lại Agent chỉ dừng ở mức đề xuất.
* **Graceful Degradation**: Khi mất kết nối tới inverter, battery hoặc smart meter, hệ thống phải quay về chế độ vận hành an toàn mặc định thay vì tiếp tục ra quyết định dựa trên dữ liệu cũ.

---

## VI. HARDWARE SPECIFICATIONS (TIÊU CHUẨN THIẾT BỊ)

| Thành phần / Thiết bị                      | Chi tiết kỹ thuật & Linh kiện đề xuất / Yêu cầu tích hợp                                                                                                            |
| :--------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **LINX T-Box (Edge AI)**                 | NVIDIA Jetson Orin Nano/NX (20-100 TOPS), 16GB RAM, 2TB Storage.                                                                                                               |
| **AI Camera (Outdoor)**                  | Sony STARVIS 2 4K, 1/1.8" Sensor, F1.0, AI-at-edge (Person/Vehicle/Pet).                                                                                                       |
| **AI Camera (Indoor)**                   | 2K/4K Privacy-shutter, Built-in NPU for Pose & Fall detection.                                                                                                                 |
| **mmWave Radar Node**                    | 60GHz Frequency, Gesture recognition, Non-visual Vital sign monitoring.                                                                                                        |
| **Perimeter LiDAR**                      | Solid-state LiDAR, Field of View 120-180°, 3D Point-cloud for perimeter defense.                                                                                              |
| **Environment Sensor**                   | Bosch BME688 (IAQ, VOC, Pressure, Temp, Hum) tích hợp AI Gas detection.                                                                                                      |
| **Microphone Array**                     | 4-6 Mic MEMS Beamforming, Noise cancellation, Voice localization.                                                                                                              |
| **Smart Lock Interface**                 | Heavy-duty Motorized Deadbolt, NFC, FaceID (Local auth only).                                                                                                                  |
| **V2X Mobility Bridge**                  | Open-API (Tesla/Vinfast) hoặc Module 4G/5G ODB-II cho xe không có sẵn API.                                                                                                 |
| **Wearable Interface**                   | WatchOS/WearOS Partner App hoặc LINX Private Bio-band (Long battery).                                                                                                         |
| **Smart Pet Feeder**                     | WiFi/Matter connection, Built-in camera, Portion control (Agent-managed).                                                                                                      |
| **Smart Pet Collar**                     | GPS, Accelerometer (Activity tracking), Bluetooth LE for Home-sync.                                                                                                            |
| **Irrigation Controller**                | Matter-compatible, 4-8 zones, Integration with soil sensors & Rain machine.                                                                                                    |
| **Pool Safety Sensor**                   | Ultrasonic presence detection + pH/ORP/Temp chemistry monitor.                                                                                                                 |
| **Robot Mower Hub**                      | GPS-RTK guidance, Matter integration for yard-security cross-check.                                                                                                            |
| **Smart Delivery Locker**                | Weather-proof, Internal camera, Electronic latch, Agent-voice instructions.                                                                                                    |
| **Networking AP**                        | WiFi 6E/7 Tri-band, Mesh support, PoE+ powering for all AI Nodes.                                                                                                              |
| **4G/5G Failover Gateway**               | Industrial router với SIM dự phòng, duy trì kết nối Agent khi đứt cáp quang.                                                                                          |
| **System UPS (Dự phòng)**              | Bộ lưu điện cho T-Box và Network Hub (duy trì tối thiểu 4h khi mất điện).                                                                                           |
| **Energy Bridge (V2H)**                  | Inverter interface (Bi-directional) cho V2H (Vehicle-to-Home) support.                                                                                                         |
| **Smart Energy Meter / Circuit Monitor** | Đồng hồ điện thông minh hoặc bộ giám sát nhánh điện để đo mức tiêu thụ theo<br /> khu vực/tải và cung cấp dữ liệu telemetry cho Agent.                |
| **Battery / Inverter Interface**         | Kết nối tới hệ pin lưu trữ, inverter hybrid hoặc hệ điện mặt trời để Agent đọc trạng<br /> thái nguồn, dung lượng khả dụng và khả năng chuyển tải. |
| **Smart EV Charger Interface**           | Bộ sạc EV có API hoặc giao tiếp cục bộ để Agent có thể lên lịch sạc, giảm tải hoặc<br /> phối hợp với chính sách dự phòng năng lượng.               |
| **Lighting Controller**                  | DALI-2 hoặc Matter-over-Thread, hỗ trợ HCL (Circadian) và Strobe mode.                                                                                                     |
| **Climate Control Node**                 | Smart Thermostat hoặc AC IR Blaster để điều khiển HVAC/Điều hòa trung tâm.                                                                                           |
| **Voice Node (Multi-room)**              | Loa thông minh tích hợp màn hình (Smart Display) hoặc âm trần cho Agent hồi đáp.                                                                                    |
| **Physical Alert Node**                  | Còi hú (Siren) và đèn chớp (Strobe) vành đai cho kịch bản Tactical Response.                                                                                         |
| **Smart Plug & Meter**                   | Phích cắm thông minh đo điện năng cho các thiết bị cũ (Tủ lạnh, quạt cây) để Agent<br /> giám sát.                                                          |

---

## VII. CHIẾN LƯỢC KẾT NỐI THỐNG NHẤT (UNIFIED CONNECTIVITY STRATEGY)

Để tích hợp với các thiết bị sẵn có trong nhà khách hàng, LINX Home sử dụng mô hình "Hybrid Integration":

1. **Matter-Native Control**: Ưu tiên kết nối trực tiếp qua chuẩn **Matter (WiFi/Thread)** cho các thiết bị đời mới (TV Samsung/Sony/LG 2024+, Tủ lạnh thông minh). Đây là kết nối cục bộ, không độ trễ.
2. **Cloud-to-Cloud Bridge**: Đối với các hệ sinh thái đóng (Samsung SmartThings, LG ThinQ), T-Box đóng vai trò là "Middleware" gọi qua API chính hãng để điều khiển (TV, Tủ lạnh, Máy giặt).
3. **Hardware Retrofitting (Cải tạo phần cứng)**:
   * **Thiết bị không thông minh (Legacy)**: Dùng **AC IR Blaster** (đã nêu ở mục VI) để giả lập remote điều khiển điều hòa cũ, và **Smart Plug** để giám sát trạng thái bật/tắt của tủ lạnh/máy giặt cũ qua công suất tiêu thụ điện.
   * **HDMI-CEC**: Sử dụng cáp HDMI có hỗ trợ CEC để Agent tự động bật/tắt và chọn nguồn phát cho TV/Home Theater.
4. **Energy Integration Layer**:
   * **Telemetry-first**: Ưu tiên kết nối đọc dữ liệu từ đồng hồ điện, smart plug, UPS, inverter, battery hoặc EV charger trước khi tiến tới điều phối chủ động.
   * **Policy-based Control**: Chỉ cho phép Agent tác động tới nguồn điện, pin lưu trữ, tải công suất lớn hoặc lịch sạc khi thiết bị tích hợp hỗ trợ giao tiếp an toàn và có policy rõ ràng từ chủ nhà.
   * **Graceful Fallback**: Nếu mất dữ liệu năng lượng thời gian thực, Agent phải quay về chế độ khuyến nghị thay vì tự động điều khiển.

---

## VIII. TRẢI NGHIỆM NGƯỜI DÙNG (UX/UI PRINCIPLES)

1. **Invisible UI**: Ưu tiên tự động hóa và giọng nói. App di động chỉ dùng để thiết lập sâu hoặc xem lại lịch sử.
2. **Context-Aware**: Hệ thống phải biết ai đang ở trong phòng để kích hoạt profile cá nhân hóa.
3. **Human-in-the-control**: Các hành động tác động mạnh đến tài sản (mở khóa chính, thanh toán) cần xác nhận sinh trắc học cuối cùng từ Home Principal.
4. **Energy with Dignity**: Tối ưu năng lượng không được làm suy giảm trải nghiệm sống một cách đột ngột; mọi chế độ tiết kiệm hoặc dự phòng phải minh bạch, có thể giải thích và cho phép người dùng override.

---

## IX. CHỈ SỐ THÀNH CÔNG (KPIs)

* **Báo động giả (False Alarm Rate)**: < 1% (Phân biệt chính xác vật nuôi và lá cây).
* **Tỷ lệ hiểu lệnh Agent (Intent Recognition)**: > 95% với các câu lệnh điều hành nhà.
* **System Uptime**: 99.99% cho các chức năng an ninh cốt lõi.
* **User Retention**: 90% người dùng sử dụng Voice Agent hàng ngày thay vì dùng App.
* **Energy Visibility Coverage**: > 80% tải tiêu thụ chính trong nhà được Agent quan sát và phân loại theo nhóm/khu vực.
* **Critical Backup Continuity**: Duy trì hoạt động liên tục cho các tải trọng yếu theo cấu hình của chủ nhà trong tình huống mất điện.
* **Energy Waste Reduction**: Giảm tiêu thụ lãng phí ở các tải linh hoạt hoặc thiết bị hoạt động bất thường sau khi Agent học được mô hình sử dụng của ngôi nhà.

---

## X. LỘ TRÌNH PHÁT TRIỂN (PRODUCT ROADMAP)

* **V1.0 (MVP)**: Tập trung vào Security, Voice Control cơ bản (Cục bộ) và lớp quan sát năng lượng nền tảng cho các tải trọng yếu.
* **V1.5 (Wellness + Energy Policy)**: Tích hợp sâu với các cảm biến môi trường, Smart Lighting và các policy tiết kiệm điện / backup transition theo ngữ cảnh.
* **V2.0 (Predictive)**: AI hiểu thói quen (Pattern recognition) để tự đề xuất lịch trình vận hành tối ưu năng lượng, điều phối nguồn điện và duy trì khả năng tự phục hồi cho toàn bộ ngôi nhà.

---

<div style="width: 100% !important; border-top: 2px solid #004d40 !important; margin-top: 60px !important; padding-top: 15px !important; font-family: sans-serif !important; white-space: nowrap !important; line-height: 0 !important; background-color: transparent !important;">
  <div style="display: inline-block !important; width: 60% !important; text-align: left !important; vertical-align: middle !important; white-space: normal !important; line-height: 1.4 !important; font-size: 0.75em !important; color: #666666 !important; background-color: transparent !important;">
    <span>© 2026 <b style="color: #004d40 !important;">Link Strategy</b>. Standard PRD Framework.</span><br>
    <span><b>Document Type:</b> PRD | <b>Confidentiality:</b> Internal High</span>
  </div><!-- QUAN TRỌNG: KHÔNG ĐỂ KHOẢNG TRẮNG Ở ĐÂY --><div style="display: inline-block !important; width: 40% !important; text-align: right !important; vertical-align: middle !important; white-space: normal !important; line-height: 1.2 !important; background-color: transparent !important;">
    <div style="display: inline-flex !important; align-items: center !important; text-align: left !important; background-color: transparent !important;">
      <div style="text-align: right !important; margin-right: 10px !important; background-color: transparent !important;">
        <div style="font-size: 0.7em !important; font-weight: bold !important; color: #004d40 !important;">LINK STRATEGY</div>
        <div style="font-size: 0.6em !important; color: #999999 !important;">OPERATION SOLUTIONS</div>
      </div>
      <img src="../Assets/LINK%20STRATEGY.png" width="25" height="25" alt="Footer Logo" style="border-radius: 50%; border: 1px solid #eeeeee;">
    </div>
  </div>
</div>
