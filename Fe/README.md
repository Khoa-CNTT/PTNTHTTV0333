# Nền tảng họp trực tuyến tích hợp AI

Dự án này là một nền tảng họp trực tuyến được phát triển bằng Spring Boot và Angular, tích hợp các tính năng AI để nâng cao trải nghiệm người dùng.

## Các tính năng chính

- **Họp trực tuyến**: Tạo và tham gia các phòng họp trực tuyến với video và âm thanh chất lượng cao.
- **Tích hợp AI**:
  - Nhận diện giọng nói và chuyển đổi thành văn bản.
  - Tóm tắt nội dung cuộc họp tự động.
- **Quản lý người dùng**: Đăng ký, đăng nhập, và quản lý tài khoản.
- **Lịch sử cuộc họp**: Lưu trữ và xem lại nội dung các cuộc họp trước đó.

## Công nghệ sử dụng

- **Backend**: Spring Boot
- **Frontend**: Angular
- **Cơ sở dữ liệu**: MySQL
- **AI**: Tích hợp các API AI như Google Cloud Speech-to-Text, OpenAI GPT, hoặc các mô hình AI tùy chỉnh.

## Cách chạy dự án

### Yêu cầu hệ thống

- **Java**: Phiên bản 11 hoặc mới hơn.
- **Node.js**: Phiên bản 12 hoặc mới hơn.
- **Angular CLI**: Phiên bản 9.1.15 hoặc mới hơn.
- **MySQL**: Phiên bản 5.7 hoặc mới hơn.

### Hướng dẫn cài đặt

1. **Clone repository**:
   - ```bash
   - git clone <repository-url>
   - cd <repository-folder>

2. **Cấu hình cơ sở dữ liệu**:
    - Tạo một cơ sở dữ liệu MySQL.
    - Cập nhật thông tin kết nối trong file application.properties của Spring Boot.

3. **Chạy backend**:
   - Điều hướng đến thư mục backend:
     ```bash
     cd backend
     ```
   - Build và chạy ứng dụng:
     ```bash
     ./mvnw spring-boot:run
     ```

4. **Chạy frontend**:
   - Điều hướng đến thư mục frontend:
     ```bash
     cd frontend
     ```
   - Cài đặt các dependencies:
     ```bash
     npm install
     ```
   - Chạy ứng dụng Angular:
     ```bash
     ng serve
     ```

5. **Truy cập ứng dụng**:
   - Mở trình duyệt và truy cập: `http://localhost:4200`.

6. **Lưu ý**:
   - Đảm bảo rằng backend và frontend đều đang chạy để ứng dụng hoạt động đầy đủ.
   - Kiểm tra kết nối cơ sở dữ liệu MySQL trước khi chạy backend.