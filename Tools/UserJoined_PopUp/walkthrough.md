# Social Proof PopUp & Builder - Walkthrough

## Tổng Quan

Dự án cung cấp một công cụ tạo thông báo "Social Proof" (Bằng chứng xã hội) giúp tăng tỷ lệ chuyển đổi cho Landing Page. Bao gồm:

1.  **PopUp Engine:** Hiển thị thông báo "Người đang xem" và "Vừa mua hàng" xen kẽ.
2.  **UI Builder:** Giao diện trực quan để tùy chỉnh màu sắc, nội dung và hành vi, sau đó xuất mã nhúng.

## Cách Sử Dụng UI Builder

1.  Mở file `index.html` trên trình duyệt.
2.  **Giao \* **Visual (Giao diện):\*\*
    - Tùy chỉnh màu nền, màu chữ, màu highlight cho các con số/tên riêng.
    - Điều chỉnh bo góc, viền (độ dày, màu sắc). \* \*\*Padding:\*\* Điều chỉnh khoảng cách đệm bên trong PopUp.
3.  **Hành Vi (Behavior):**
    - **Animation Preview:** Nút Play/Pause để dừng hoặc chạy thử hiệu ứng.
    - **Kiểu Hiệu Ứng:** Chọn slide up, fade in, zoom, slide side.
    - **Tốc độ:** Chỉnh thời gian animation.
    - **Thời gian hiển thị:** Bao lâu popup sẽ biến mất.
    - **Độ trễ:** Khoảng nghỉ giữa các lần hiện popup.
    - **Số lượng người xem:** Khoảng random (Min-Max).
4.  **Content (Nội dung):**
    - **Position:** Vị trí hiển thị (4 góc màn hình).
    - **Avatar:** Tùy chọn hiển thị ảnh đại diện và link tới ảnh (hỗ trợ riêng Male/Female).
    - **Custom Names:** Nhập danh sách tên tùy chỉnh (hỗ trợ nhập riêng cho Nam/Nữ).

## 📦 Đóng Gói & Triển Khai (Deployment)

Để đóng gói bộ mã nguồn cho CDN (`cdn.vanced.media`), chạy file `package_cdn.bat`:

```bash
package_cdn.bat
```

1.  Nhập phiên bản (VD: `v1.0`).
2.  Script sẽ tự động tạo thư mục `cdn_dist/v1.0/` chứa đầy đủ các file cần thiết:
    - `ScriptGenerator.js`
    - `animation.js`
    - `Styles/style.css`
3.  Upload thư mục này lên CDN Server.

### 6. Chế Độ Preview

- **Static Mode (Paused):**
  - Hiển thị cùng lúc 2 mẫu PopUp (Viewer & Purchase) ở giữa màn hình preview.
  - Cho phép chỉnh sửa giao diện và xem kết quả ngay lập tức trên cả 2 mẫu.
- **Dynamic Mode (Play):**
  - Mô phỏng hiệu ứng xuất hiện thực tế.
  - PopUp sẽ chạy trong khung preview (canvas) thay vì toàn bộ màn hình.

5.  **Xuất Mã:**
    - Nhấn nút **"Get Code"**.
    - Copy đoạn mã trong hộp thoại hiện ra.

## Hướng Dẫn Tích Hợp (Export Code)

Đoạn mã xuất ra đã được tối ưu cho các trang HTML tĩnh (Landing Page) và sử dụng versioning (`v1.0`).

### Cấu trúc mã nhúng:

1.  **CSS:** Link tới file style trên CDN (`.../v1.0/Styles/style.css`).
2.  **Config:** Một thẻ `<script>` chứa biến `window.UserJoinedPopUpConfig` để lưu các thiết lập của bạn.
3.  **HTML:** Cấu trúc thẻ div của Popup.
4.  **Logic:** Import module `animation.js` và `ScriptGeneretor.js` để chạy tính năng.

### Ví dụ tích hợp:

Chỉ cần dán toàn bộ đoạn mã bạn copy được vào trước thẻ đóng `</body>` của file `index.html` trang Landing Page của bạn.

```html
<body>
  <!-- Nội dung trang web của bạn -->
  ...

  <!-- Dán mã PopUp vào đây -->
</body>
```

## File Structure

- `index.html`: Giao diện Builder.
- `PopUp_Preview.html`: Trang test riêng lẻ cho popup layout.
- `Styles/`: Chứa file SCSS/CSS.
- `animation.js`: Logic hiệu ứng.
- `ScriptGeneretor.js`: Logic random dữ liệu và điều khiển luồng.
- `builder_logic.js`: Logic cho UI Builder.
