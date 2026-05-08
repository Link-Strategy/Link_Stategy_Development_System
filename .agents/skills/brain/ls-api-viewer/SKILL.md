---
name: ls-api-viewer
description: Specialized API documentation viewer for the Brain tier. Orchestrates Swagger/Redoc UI for sovereign contracts with dynamic service resolution. Use when you need to preview or review the API specification of any service in the project.
---

# API Viewer (ls-api-viewer)

Kỹ năng chuyên biệt dành cho Brain Tier để hiển thị và kiểm tra tài liệu API từ các Hợp đồng (Sovereign Contracts).

## When to Use This Skill

- Khi cần xem nhanh tài liệu API của một service bất kỳ (Identity, Dispatch, v.v.).
- Khi cần kiểm tra cấu trúc Request/Response và các JSON Examples trong môi trường tương tác.
- Khi cần cung cấp link preview API cho các Hands Agent tham chiếu.

## 1. Chạy Swagger/Redoc UI linh động

Công cụ này tự động ánh xạ tên service vào các file đặc tả OpenAPI (.yaml) trong dự án.

### Lệnh: `npm run docs <SERVICE_NAME>`

**Cách sử dụng:**
```bash
# Xem tài liệu Identity Service
npm run docs identity

# Xem tài liệu Dispatch Service
npm run docs dispatch
```

**Cơ chế hoạt động:**
- **Dynamic Resolution**: Tự động tìm file tại `assets/contracts/api/${SERVICE_NAME}-api.yaml`.
- **Auto-discovery**: Nếu chạy không tham số, tool sẽ liệt kê các API khả dụng.
- **Clickable Link**: In link `http://127.0.0.1:8080` trực tiếp ra terminal để user click nhanh.
- **Auto-open Browser**: Cố gắng bật trình duyệt mặc định khi khởi chạy (Best effort).
- **Engine**: Sử dụng `redoc-cli` với tính năng hot-reload.
