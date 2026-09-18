# PHÚ HỒ SỐ

Web app tĩnh mô phỏng cổng điều phối dịch vụ công cấp xã.

## Chạy thử
Có thể mở `index.html` bằng trình duyệt, nhưng do trình duyệt hạn chế `fetch()` file JSON khi mở trực tiếp, nên khuyến nghị chạy bằng Live Server hoặc một web server tĩnh.

Ví dụ VS Code:
1. Cài extension Live Server.
2. Mở thư mục dự án.
3. Chuột phải `index.html` → Open with Live Server.

## Đưa lên GitHub + Netlify
- Tạo repository mới trên GitHub.
- Upload toàn bộ thư mục.
- Trên Netlify chọn Add new project → Import an existing project → GitHub.
- Build command: để trống.
- Publish directory: `.`
- Deploy.

## Cập nhật dữ liệu
Chỉnh file `data/procedures.json`.

Mỗi thủ tục có:
- `name`: tên thủ tục
- `field`: lĩnh vực
- `category`: mã nhóm
- `keywords`: từ khóa người dân thường dùng
- `documents`: hồ sơ
- `agency`: cơ quan thực hiện
- `time`: thời gian
- `url`: đường dẫn hệ thống chính thức
- `quick`: `true` nếu muốn đưa lên nhóm “Tôi muốn...”

Lưu ý: dữ liệu mẫu chỉ phục vụ giao diện thử nghiệm. Trước khi vận hành chính thức cần thay bằng dữ liệu TTHC đã được kiểm tra và cập nhật từ nguồn có thẩm quyền.
