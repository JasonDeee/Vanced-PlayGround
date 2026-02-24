# PopUp Social Proof & Trình tạo (Builder) - Kế hoạch triển khai

## Mô tả mục tiêu

Tạo một công cụ popup social proof có thể tùy biến và một UI builder để sinh mã popup. Công cụ sẽ hiển thị số lượng “Người đang xem” và thông báo “Mua gần đây” nhằm tăng tỉ lệ chuyển đổi (FOMO).

## Yêu cầu cần người dùng review

> [!IMPORTANT]
>
> - **Avatar:** Có tùy chọn Sử dụng Avatar cho thông báo mua hàng. Nếu không dùng, sẽ ẩn. Input sẽ chia làm 2 cột: Nam và Nữ (URL ảnh).
> - **Nội dung đơn giản:** Bỏ thông tin sản phẩm và địa điểm. Chỉ hiển thị chung chung "vừa đặt hàng thành công".
> - **Viewer PopUp:** Sẽ KHÔNG có Avatar/Icon.
> - **Preview Control:** Có nút Play/Pause animation (mặc định Pause).

## Các thay đổi đề xuất

### UI Builder & Logic - Phase 6

#### [MODIFY] [index.html](file:///c:/Users/JDBL/Documents/GitHub/Vanced-Landing-Elements/UserJoined_PopUp/index.html)

- **Behavior:** Thêm nút Toggle Play/Pause.
- **Content:**
  - Thêm Checkbox "Use Avatar".
  - Thêm 2 Textarea cho "Avatar URLs (Male)" và "Avatar URLs (Female)".
  - Chỉnh sửa logic hiển thị: Ẩn phần chọn sản phẩm/địa điểm (nếu có).

#### [MODIFY] [ScriptGeneretor.js](file:///c:/Users/JDBL/Documents/GitHub/Vanced-Landing-Elements/UserJoined_PopUp/ScriptGeneretor.js)

- **Logic:**
  - `startLoop()` -> Chuyển thành `play()` và `pause()`. Mặc định gọi `pause()`.
  - `updateContent()`:
    - **Viewer Mode:** Ẩn `vanced-popup-image`.
    - **Purchase Mode:**
      - Nếu "Use Avatar": Random chọn URL từ 2 list Nam/Nữ (hiện tại random chung). Hiển thị `vanced-popup-image`.
      - Nếu không: Ẩn `vanced-popup-image`.
      - Text: "{Name} vừa đặt hàng thành công".
- **State:** Thêm biến `isPlaying`.

#### [MODIFY] [builder_logic.js](file:///c:/Users/JDBL/Documents/GitHub/Vanced-Landing-Elements/UserJoined_PopUp/builder_logic.js)

- Liên kết các nút điều khiển mới với `ScriptGenerator`.
- Cập nhật logic `generateExportCode`.

### UI Builder - Phase 7 (Advanced Preview)

#### [MODIFY] [index.html](file:///c:/Users/JDBL/Documents/GitHub/Vanced-Landing-Elements/UserJoined_PopUp/index.html)

- **Layout:**
  - `main.builder-preview` sẽ có `position: relative`.
  - Thêm container `#static-preview-area` (Hidden khi Play, Visible khi Pause):
    - Chứa 2 bản copy của PopUp: 1 cái hiển thị Viewer Count, 1 cái hiển thị Purchase (có Avatar nếu bật).
    - Căn giữa màn hình (Flex/Grid center).
    - Các popup này sẽ có class đè để **không** nhận `position: fixed/absolute` từ style gốc, mà hiển thị dạng block tĩnh.
  - `#vanced-popup-container` (Animated):
    - Sẽ nhận style `position: absolute` thay vì `fixed` thông qua CSS override trong builder.

#### [MODIFY] [builder_logic.js](file:///c:/Users/JDBL/Documents/GitHub/Vanced-Landing-Elements/UserJoined_PopUp/builder_logic.js)

- **Style Binding:** Thay vì set property trực tiếp lên `#vanced-popup-container`, sẽ set lên `main.builder-preview` (hoặc `:root` nhưng scope trong builder) để tất cả popup con (static & animated) đều nhận được biến CSS (màu, border, radius...).
- **Play/Pause Toggle:**
  - Pause: Hiện `#static-preview-area`, Ẩn `#vanced-popup-container` (hoặc để logic animation ẩn nó).
  - Play: Ẩn `#static-preview-area`, Hiện `#vanced-popup-container`.

#### [MODIFY] [style.scss](file:///c:/Users/JDBL/Documents/GitHub/Vanced-Landing-Elements/UserJoined_PopUp/Styles/style.scss)

- (Không cần sửa file gốc để đảm bảo export vẫn đúng).
- Sẽ dùng style cục bộ trong `index.html` để override hành vi định vị trong màn hình Builder.

### Refinement - Phase 8

#### [MODIFY] [Styles/style.scss](file:///c:/Users/JDBL/Documents/GitHub/Vanced-Landing-Elements/UserJoined_PopUp/Styles/style.scss)

- Thêm biến `--vp-padding`.
- Áp dụng vào `.vanced-popup-container`.

#### [MODIFY] [index.html](file:///c:/Users/JDBL/Documents/GitHub/Vanced-Landing-Elements/UserJoined_PopUp/index.html)

- Thêm Slider cho Padding.

#### [MODIFY] [builder_logic.js](file:///c:/Users/JDBL/Documents/GitHub/Vanced-Landing-Elements/UserJoined_PopUp/builder_logic.js)

- Bind logic Padding.
- **Fix Bug:** Khi bấm Play, reset `style.opacity` và `style.pointerEvents` của container về rỗng để class `.active` có tác dụng.

### Refinement - Phase 9

#### [MODIFY] [index.html](file:///c:/Users/JDBL/Documents/GitHub/Vanced-Landing-Elements/UserJoined_PopUp/index.html)

- **Padding:** Chuyển từ Scale Slider sang 4 ô input (Top, Right, Bottom, Left) + Icon Link (Constrain).
- **Shadow:** Thêm section Shadow Control (Toggle, Offset X/Y, Blur, Color Pick w/ Alpha support).
- **Structure:** Xóa button close `.vanced-close-btn` khỏi static preview và template.

#### [MODIFY] [Styles/style.scss](file:///c:/Users/JDBL/Documents/GitHub/Vanced-Landing-Elements/UserJoined_PopUp/Styles/style.scss)

- Remove `.vanced-close-btn`.
- Remove default `--vp-shadow` value (make it dependent on JS injection or keep default purely).

#### [MODIFY] [builder_logic.js](file:///c:/Users/JDBL/Documents/GitHub/Vanced-Landing-Elements/UserJoined_PopUp/builder_logic.js)

- **Padding:** Logic xử lý input 4 chiều + Constrain mode.
- **Shadow:** Logic tạo chuỗi `box-shadow: X Y Blur Color`.
- **Close Button:** Update export code để không sinh ra nút close.

## Kế hoạch kiểm tra (Verification Plan)

### Kiểm thử thủ công

- **Play/Pause:** Bấm nút xem animation có dừng/chạy tiếp không.
- **Avatar:**
  - Bỏ chọn "Use Avatar" -> PopUp mua hàng không có ảnh.
  - Chọn "Use Avatar" -> PopUp mua hàng có ảnh random từ list.
- **Viewer:** PopUp người xem không có ảnh.
- **Nội dung:** Kiểm tra text chỉ còn "vừa đặt hàng thành công".
