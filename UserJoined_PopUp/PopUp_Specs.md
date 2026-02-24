# Mô Tả Dự Án: Social Proof PopUp & Builder

## 1. Tổng Quan

Dự án này nhằm mục đích tạo ra một công cụ "Social Proof" (Bằng chứng xã hội) giúp tăng tỷ lệ chuyển đổi trên các trang Landing Page. Công cụ này sẽ hiển thị các thông báo ảo để tạo hiệu ứng đám đông (FOMO), ví dụ như số lượng người đang xem hoặc các đơn hàng vừa được đặt.

Ngoài ra, dự án còn bao gồm một **Trình Tạo Giao Diện (UI Builder)** cho phép người dùng không biết code có thể tự thiết kế lại giao diện PopUp, tùy chỉnh hành vi và xuất bản mã nguồn để nhúng vào website của họ.

## 2. Tính Năng Chi Tiết

### A. PopUp Hiển Thị (Client-Side Script)

Hai loại thông báo chính sẽ xuất hiện xen kẽ nhau:

1.  **Thông báo "Người đang xem"**:
    - Hiển thị: "Hiện đang có **XX** người đang xem sản phẩm này".
    - Logic: Số lượng người (XX) sẽ là một con số ngẫu nhiên trong khoảng xác định (ví dụ: từ 15 đến 50) để tạo cảm giác chân thực.
2.  **Thông báo "Vừa mua hàng"**:
    - Hiển thị: "**Nguyễn Văn A** vừa đặt mua thành công **Sản phẩm X**".
    - Logic: Tên khách hàng và địa điểm có thể được lấy ngẫu nhiên từ một danh sách dữ liệu có sẵn (fake data) để tạo sự đa dạng.
3.  **Cơ chế hoạt động**:
    - Các thông báo xuất hiện lần lượt, đan xen nhau.
    - Có thời gian chờ (delay) giữa các lần xuất hiện để không gây rối mắt.
    - Hiệu ứng xuất hiện/biến mất mượt mà (Fade in, Slide up...).

### B. Trình Tạo & Tùy Chỉnh (UI Builder)

Một trang web đơn cho phép người dùng cấu hình PopUp:

1.  **Giao diện Kéo & Thả (Drag & Drop)**:
    - Cho phép sắp xếp vị trí hình ảnh, tiêu đề, nội dung trong thẻ PopUp.
2.  **Tùy chỉnh Giao Diện (Visual Editor)**:
    - Thay đổi màu sắc, font chữ, kích thước, bo góc, đổ bóng.
    - Thay đổi vị trí xuất hiện trên màn hình (Góc trái dưới, phải trên...).
3.  **Cấu hình Hành Vi (Behavior Logic)**:
    - Slider điều chỉnh tốc độ xuất hiện.
    - Cài đặt khoảng thời gian chờ (Delay).
    - Cài đặt khoảng số lượng "Người xem ảo".
    - Nhập danh sách tên/sản phẩm mẫu để random.
4.  **Đóng Gói & Xuất Bản (Export)**:
    - Nút "Get Code" để sinh ra một đoạn mã JavaScript/CSS nhỏ gọn.
    - Người dùng chỉ cần copy-paste đoạn mã này vào thẻ `<body>` hoặc `<head>` của trang Landing Page là có thể sử dụng ngay.

## 3. Câu Hỏi Cần Làm Rõ (Questions)

Để hoàn thiện sản phẩm tốt nhất, tôi cần bạn cung cấp thêm một số thông tin:

1.  **Dữ liệu ảo (Fake Data)**: Bạn có muốn tôi tạo sẵn một bộ dữ liệu tên người Việt Nam và địa điểm phổ biến không? Hay người dùng sẽ tự nhập danh sách này trong UI Builder?
    > Người dùng sẽ tự nhập danh sách này trong UI Builder. Nhưng mặc định bạn vẫn cứ tạo một danh sách tên và địa điểm ngẫu nhiên để hiển thị gợi ý tại input và tại màn hình preview trong Builder.
2.  **Nền tảng mục tiêu**: Landing Page của bạn thường chạy trên nền tảng nào (WordPress, Shopify, HTML tĩnh, Ladipage...)? Điều này giúp tôi tối ưu cách đóng gói code.
    > hãy đóng gói code tối ưu cho HTML tĩnh nhé
3.  **Lưu trữ cấu hình**: Khi người dùng tạo xong popup, bạn muốn họ tải file về hay lưu cấu hình trên trình duyệt (Local Storage) để lần sau vào sửa tiếp?
    > Sau khi đóng gói, người dùng sẽ nhận dược một đoạn code vài thẻ html. Các thẻ gồm import css, 1 đoạn script #1 để append các thẻ html cho popup và để chứa các tham số custom của popup, 1 đoạn script #2 để chạy logic và hiệu ứng của popup.
4.  **Mức độ phức tạp Drag & Drop**: Bạn muốn kéo thả tự do (pixel perfect) hay kéo thả theo các khối (block/grid) định sẵn cho dễ căn chỉnh?
    > Trước mắt không cần drag & drop, chỉ cần các thanh trượt, checkbox, ratio, v.v. để chỉnh thông số cơ bản là được. Ví dụ: Bo viền, enable stroke (border solid), độ dày stroke, màu stroke, transition duration v.v. bạn có toàn quyền quyết định lựa chọn thêm các thông số phù hơpk

## 4. Kế Hoạch Triển Khai Sơ Bộ

1.  **Step 1**: Xây dựng HTML/CSS mẫu cho PopUp đẹp mắt (Glassmorphism, Gradient...).
2.  **Step 2**: Viết Javascript logic để random số liệu và chạy thông báo xen kẽ.
3.  **Step 3**: Xây dựng UI Builder (thanh công cụ bên trái, màn hình chính preview, thanh properties bên phải).
4.  **Step 4**: Viết tính năng "Export Code" để đóng gói logic thành file chạy được ở bất kỳ đâu.
    > Đồng ý

> Important bổ sung: Logic Animate In/Out của popup sẽ được kiểm soát bởi việc add/remove class 'active' vào thẻ popup.
> Tính năng animate cutstom của PopUp cũng sẽ triển khai sẵn một vài dạng animation, vài smoothing behaviour để người dùng lựa chọn.
