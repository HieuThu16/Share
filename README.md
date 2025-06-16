# Blog Cá Nhân - Chia sẻ kiến thức

Một trang web blog cá nhân để chia sẻ kiến thức từ YouTube và review sách.

## Tính năng

- ✅ Hiển thị danh sách video YouTube đã học
- ✅ Hiển thị danh sách review sách
- ✅ Thêm video YouTube mới (môi trường dev)
- ✅ Thêm review sách mới (môi trường dev)
- ✅ Xem chi tiết video/sách
- ✅ Responsive design
- ✅ Lưu dữ liệu vào file JSON

## Cách sử dụng

### Hệ thống lưu dữ liệu tự động

1. **Thêm dữ liệu mới**: Nhấn nút "➕ Thêm video" hoặc "➕ Thêm review sách"
2. **Điền form**: Nhập đầy đủ thông tin vào form
3. **Lưu tự động**: Nhấn "Lưu" - dữ liệu sẽ được lưu trực tiếp vào file JSON trên server
4. **Hiển thị ngay**: Dữ liệu mới sẽ hiển thị ngay lập tức cho tất cả người dùng

### Tính năng đặc biệt

- **Combobox tác giả thông minh**: Gõ tên tác giả, hệ thống sẽ gợi ý từ danh sách có sẵn
- **Lưu tác giả mới**: Khi nhập tác giả mới, tên sẽ được lưu vào danh sách cho lần sau
- **Thông báo real-time**: Hiển thị thông báo khi lưu thành công hoặc có lỗi
- **Fallback system**: Nếu không lưu được lên server, sẽ lưu tạm vào localStorage

## Cấu trúc thư mục

```
/
├── index.html          # Trang chính
├── css/
│   └── styles.css      # CSS styles
├── js/
│   └── main.js         # JavaScript logic
├── api/
│   └── save-data.js    # API endpoint để lưu dữ liệu
├── data/
│   ├── content.js      # Dữ liệu mẫu
│   ├── youtube.json    # Dữ liệu video YouTube
│   └── books.json      # Dữ liệu review sách
├── package.json        # Dependencies
├── vercel.json         # Cấu hình Vercel
└── README.md           # Hướng dẫn
```

## Cách thêm dữ liệu mới

### Thêm video YouTube

1. Trong môi trường dev: Sử dụng form thêm video
2. Trong production: Cập nhật file `data/youtube.json` với format:

```json
{
  "id": 123,
  "title": "Tiêu đề video",
  "author": "Tên channel",
  "duration": "10:30",
  "publishDate": "1 ngày trước",
  "url": "https://youtube.com/watch?v=...",
  "thumbnail": "URL ảnh thumbnail",
  "summary": "Tóm tắt ngắn",
  "coreContent": "Nội dung cốt lõi",
  "personalShare": "Chia sẻ cá nhân",
  "dateAdded": "2025-01-11T10:00:00.000Z"
}
```

### Thêm review sách

1. Trong môi trường dev: Sử dụng form thêm sách
2. Trong production: Cập nhật file `data/books.json` với format:

```json
{
  "id": 123,
  "title": "Tên sách",
  "author": "Tác giả",
  "rating": 5,
  "summary": "Tóm tắt sách",
  "review": "Review chi tiết",
  "coverImage": "URL ảnh bìa",
  "dateAdded": "2025-01-11T10:00:00.000Z"
}
```

## Deploy lên Vercel

1. Push code lên GitHub repository
2. Kết nối repository với Vercel
3. Deploy tự động
4. Dữ liệu sẽ được đọc từ file JSON

## Công nghệ sử dụng

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Vercel Serverless Functions (Node.js)
- **Database**: File JSON (lưu trực tiếp trên server)
- **Deployment**: Vercel

## Lưu ý kỹ thuật

- Dữ liệu được lưu trực tiếp vào file JSON trên server thông qua API
- Hệ thống có fallback về localStorage nếu API không hoạt động
- Tác giả được lưu riêng trong localStorage để gợi ý cho lần sau
- Responsive design, hoạt động tốt trên mobile và desktop
