<div style="width: 100% !important; font-family: sans-serif !important; white-space: nowrap !important; line-height: 0 !important; background-color: transparent !important;">
  <!-- Khối Metadata -->
  <div style="display: inline-block !important; width: 50% !important; vertical-align: middle !important; white-space: normal !important; line-height: 1.5 !important; border: 1px solid #003366 !important; border-radius: 4px !important; overflow: hidden !important; margin: 0 !important; background-color: #f8f9fa !important;">
    <div style="background-color: #003366 !important; color: white !important; padding: 4px 10px !important; font-weight: bold !important; font-size: 0.8em !important; border: none !important; margin: 0 !important;">Production Engine Sync Protocol</div>
    <div style="padding: 8px 2px !important; background-color: #f8f9fa !important; font-size: 0.8em !important; color: #333333 !important; border: none !important; margin-top: -1px !important;">
      <div style="margin-bottom: 4px !important; background-color: transparent !important; line-height: 0.8 !important;">
        <span style="display: inline-block !important; width: 120px !important; font-weight: bold !important; color: #666666 !important; background-color: transparent !important;">Document:</span><span style="color: #003366 !important; font-weight: bold !important; background-color: transparent !important;">Master-Satellite Sync Protocol</span>
      </div>
      <div style="margin-bottom: 0 !important; background-color: transparent !important; line-height: 1.1 !important;">
        <span style="display: inline-block !important; width: 120px !important; font-weight: bold !important; color: #666666 !important; background-color: transparent !important;">Classification:</span><span style="color: #333333 !important; background-color: transparent !important;">Founder Confidential</span>
      </div>
    </div>
  </div><!-- QUAN TRỌNG: KHÔNG ĐỂ KHOẢNG TRẮNG Ở ĐÂY --><div style="display: inline-block !important; width: 54% !important; vertical-align: middle !important; text-align: right !important; white-space: normal !important; line-height: 1.5 !important; margin: 0 !important; background-color: transparent !important;">
    <!-- Khối Branding Badge -->
    <div style="display: inline-flex !important; align-items: center !important; background-color: #003366 !important; padding: 8px 14px !important; border-radius: 4px !important; text-align: left !important; box-shadow: 0 2px 6px rgba(0,0,0,0.15) !important;">
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

# 04. MASTER-SATELLITE SYNC PROTOCOL (MSP)

Tài liệu này xác lập các tiêu chuẩn kỹ thuật để duy trì sự đồng bộ hóa dữ liệu, đảm bảo chủ quyền kiến trúc (Brain Sovereignty) và khả năng thu hoạch tài sản (Asset Harvesting) giữa Master Monorepo và các Satellite Repos.

---

## I. SƠ ĐỒ VẬN HÀNH (OPERATIONAL FLOW)

```mermaid
sequenceDiagram
    participant B as Master Monorepo (Brain)
    participant S as Satellite Repo (Hands)
    participant G as Verification Gate

    Note over B: GIAI ĐOẠN KHỞI TẠO
    B->>B: run new-project.ps1 (Tạo phôi)
    B->>S: run init-satellite.ps1 (Tạo Repo & Đẩy Luật)
    
    Note over S: GIAI ĐOẠN THỰC THI (CODING)
    S->>S: Hands implement Src/Tests
    B-->>S: run push-rules.ps1 (Cập nhật luật nếu cần)
    
    Note over G: GIAI ĐOẠN NGHIÊM THU
    S->>G: run verify-gate.ps1 (Tự kiểm tra)
    S->>B: Create Pull Request (Kèm Gate Report)
    B->>G: Audit MD5 Integrity & Code Quality
    
    Note over B: GIAI ĐOẠN THU HOẠCH
    G-->>B: Pass Gate?
    B->>B: run pull-code-from-satellite.ps1
    B->>B: Harden Assets (Tích lũy tri thức)
```

---

## II. MÔ HÌNH ĐỒNG BỘ HAI CHIỀU (B-DIRECTIONAL SYNC)

Hệ thống vận hành dựa trên sự tách biệt tuyệt đối giữa không gian **Thiết kế (Master)** và không gian **Thực thi (Satellite)**.

### 1. Chiều Xuôi: Master ➔ Satellite (Luật pháp & Đặc tả)
*   **Mục đích:** Phân phối Rules, Workflows và Blueprints xuống các Satellite để định hướng AI Agent và Hands.
*   **Tài sản đồng bộ:** Thư mục `.agents/` và tệp `.cursorrules`.
*   **Giao thức:** `FORCE PUSH`. Master Monorepo là nguồn sự thật duy nhất (Single Source of Truth). Mọi thay đổi tại Satellite đối với các tài sản này sẽ bị ghi đè không điều kiện.

### 2. Chiều Ngược: Satellite ➔ Master (Code & Tài sản tri thức)
*   **Mục đích:** Thu hoạch mã nguồn sạch và nhật ký tri thức để tích lũy vào Monorepo.
*   **Danh mục thu hoạch (Harvesting List):** Quá trình thu hoạch chỉ giới hạn trong:
    *   `/src`: Toàn bộ logic nghiệp vụ đã qua kiểm thử.
    *   `/tests`: Toàn bộ kịch bản kiểm thử đảm bảo Coverage > 80%.
    *   `/docs`: Đặc tả module, Sơ đồ và tệp `LOGS.md`.
*   **Giao thức:** `SELECTIVE HARVESTING`. Sử dụng `git checkout [remote] -- [path]` để trích xuất dữ liệu, đảm bảo không kéo theo các tệp cấu hình rác hoặc luật lệ đã bị biến đổi tại Satellite.

---

## II. CƠ CHẾ BẢO VỆ TOÀN VẸN (GOVERNANCE PROTECTION)

Hệ thống áp dụng cơ chế bảo vệ "Bất biến" (Immutability) đối với luật pháp:

1.  **Integrity Fingerprinting (MD5 Hash):** 
    *   Mọi tệp chiến lược trong `.agents/rules/` được gán một "dấu vân tay" MD5 từ Master.
    *   `verify-gate.ps1` thực hiện quét đệ quy và đối chiếu Hash từng tệp.
    *   **Violation Penalty:** Sai lệch Hash = -30đ/tệp. Xóa tệp = -40đ/tệp. Xóa thư mục luật = 0đ (Hủy bỏ tư cách PR).
2.  **Permission Block:** Tệp `rules-protection.yml` tại Satellite sẽ chặn đứng mọi PR có thay đổi trong tầng Governance từ phía Hands.
3.  **Force Overwrite:** Master luôn giữ quyền ghi đè (`--force`) để xóa bỏ mọi nỗ lực sửa luật cục bộ của Hands mỗi khi có phiên đồng bộ mới.

---

## III. XỬ LÝ XUNG ĐỘT (CONFLICT RESOLUTION)

*   **Tầng Governance:** Master Monorepo luôn thắng. Xung đột tại thư mục `.agents/` sẽ được giải quyết bằng cách Ghi đè (Overwrite) từ Master.
*   **Tầng Source Code:** 
    *   Nếu phát hiện xung đột khi thu hoạch (Harvesting) ➔ Hands bắt buộc phải thực hiện `Rebase` hoặc `Merge` phiên bản Master mới nhất vào Satellite trước khi nộp lại PR.
    *   Mọi Code không vượt qua kiểm tra tính toàn vẹn (Integrity Check) sẽ bị từ chối tích hợp.

---

## III. CÔNG CỤ DỊCH VỤ (TOOLING)

Hệ thống cung cấp bộ công cụ tự động hóa tại thư mục `scripts/`:

*   **`init-satellite.ps1`**: Khởi tạo Git context, tạo Repository GitHub (via GH CLI), thiết lập chốt chặn PR và thực hiện Bootstrap Rule lần đầu.
*   **`push-rules-to-satellite.ps1`**: Thực hiện Force Sync luật Master ➔ Satellite (Auto-Commit & Push).
*   **`pull-code-from-satellite.ps1`**: Thực hiện Harvesting tài sản Satellite ➔ Master.
*   **`verify-gate.ps1`**: Kiểm tra tính toàn vẹn (Integrity Check) và tuân thủ luật pháp trước khi nghiệm thu.

---

## IV. QUY TRÌNH VẬN HÀNH CHUẨN (STANDARD WORKFLOW)

1.  **Giai đoạn Khởi tạo (Initialization):** Brain chạy `new-project` ➔ `init-satellite`. 
    *   *Kết quả:* Một Satellite Repo sạch sẽ, có đủ "thiết chế sắt" (CODEOWNERS, PR Template) được sinh ra trên GitHub.
2.  **Giai đoạn Điều hành (Governance):** Nếu Brain cập nhật Hiến pháp tổng ➔ Chạy `push-rules -GitPush`. 
    *   *Kết quả:* Luật mới được Force Sync ngay lập tức xuống đầu Hands.
3.  **Giai đoạn Nghiệm thu (Harvesting):** Hands nộp bài ➔ Brain chạy `verify-gate` (MD5 Hash Check) ➔ Nếu Pass, chạy `pull-code` để thu hoạch code về Monorepo.

---
**Status:** **OFFICIAL PROTOCOL v1.0**
**Priority:** **LEVEL 0 (BLOCKER)**
**Owner:** Link Strategy Brain Delegate
