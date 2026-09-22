# Semrush Web Clone (Interactive Edition)

Dự án giao diện mô phỏng trang chủ chính thức của **Semrush** (https://www.semrush.com/) với đầy đủ các tính năng tương tác JavaScript hiện đại (Mega menu, Mobile drawer, Hero search & SEO overview modal, Toolkits accordion & slider, Stats counter, Resources swiper, Language selector...).

---

## 📋 Mục Lục
1. [Yêu Cầu Hệ Thống](#-yêu-cầu-hệ-thống)
2. [Hướng Dẫn Cài Đặt Node.js](#-hướng-dẫn-cài-đặt-nodejs)
   - [Cách 1: Tải trực tiếp từ trang chủ (Khuyên dùng)](#cách-1-tải-trực-tiếp-từ-trang-chủ-khuyên-dùng)
   - [Cách 2: Cài nhanh bằng lệnh qua Windows Terminal / PowerShell](#cách-2-cài-nhanh-bằng-lệnh-qua-windows-terminal--powershell)
   - [Kiểm tra cài đặt thành công](#kiểm-tra-cài-đặt-thành-công)
3. [Hướng Dẫn Khởi Chạy Dự Án (`npm start`)](#-hướng-dẫn-khởi-chạy-dự-án-npm-start)
4. [Cấu Trúc Thư Mục](#-cấu-trúc-thư-mục)
5. [Các Tính Năng Tương Tác](#-các-tính-năng-tương-tác)
6. [Xử Lý Lỗi Thường Gặp](#-xử-lý-lỗi-thường-gặp)

---

## 💻 Yêu Cầu Hệ Thống
- Hệ điều hành: Windows, macOS hoặc Linux.
- Đã cài đặt **Node.js** (phiên bản khuyến nghị: LTS v18 trở lên hoặc v20+).
- Trình duyệt web hiện đại (Google Chrome, Microsoft Edge, Firefox, Brave...).

---

## 🛠 Hướng Dẫn Cài Đặt Node.js

Nếu máy tính của bạn chưa có Node.js và npm, hãy chọn một trong hai cách dưới đây:

### Cách 1: Tải trực tiếp từ trang chủ (Khuyên dùng)
1. Truy cập trang web chính thức của Node.js: **[https://nodejs.org/](https://nodejs.org/)**
2. Nhấn nút tải về phiên bản **LTS (Recommended For Most Users)** (ví dụ: `v20.x.x` hoặc `v22.x.x`).
3. Mở file cài đặt `.msi` vừa tải về máy.
4. Nhấn **Next** liên tục theo hướng dẫn, giữ các tùy chọn mặc định, và chọn **Install**.
5. Sau khi quá trình cài đặt kết thúc, nhấn **Finish**.

### Cách 2: Cài nhanh bằng lệnh qua Windows Terminal / PowerShell
Mở **PowerShell** (hoặc Windows Terminal) với quyền Administrator và chạy lệnh:

```powershell
winget install OpenJS.NodeJS.LTS
```

---

### Kiểm Tra Cài Đặt Thành Công
Sau khi cài đặt xong, hãy mở một cửa sổ **PowerShell** hoặc **Command Prompt (cmd)** mới và gõ lệnh:

```powershell
node -v
npm -v
```

Nếu màn hình hiển thị số phiên bản (ví dụ `v20.17.0` và `10.8.2`), bạn đã cài đặt Node.js và npm thành công! 🎉

---

## 🚀 Hướng Dẫn Khởi Chạy Dự Án (`npm start`)

### Bước 1: Mở thư mục dự án trong Terminal
Mở **PowerShell** hoặc **Command Prompt** tại thư mục dự án (`e:\web`), hoặc mở VS Code / Cursor tại thư mục này rồi mở Terminal tích hợp (`Ctrl + ~`).

### Bước 2: Chạy lệnh khởi động
Gõ lệnh sau vào Terminal và nhấn **Enter**:

```powershell
npm start
```

*(Hoặc bạn cũng có thể chạy lệnh trực tiếp: `node server.js`)*

Màn hình Terminal sẽ hiển thị thông báo:
```text
======================================================
🚀 Semrush Clone server is running!
🔗 Local: http://localhost:3000
======================================================
```

### Bước 3: Mở trình duyệt web
- Mở trình duyệt bất kỳ (Chrome, Edge, Firefox...).
- Truy cập vào địa chỉ: **[http://localhost:3000](http://localhost:3000)**
- Để dừng server, nhấn tổ hợp phím `Ctrl + C` trong cửa sổ Terminal.

---

## 📁 Cấu Trúc Thư Mục

```text
e:\web\
│
├── index.html                  # File giao diện HTML chính của trang web Semrush
├── server.js                   # Web server HTTP tích hợp sẵn MIME types
├── package.json                # Cấu hình script npm start và thông tin dự án
├── README.md                   # Hướng dẫn chi tiết cài đặt và khởi chạy
│
├── js\
│   └── main.js                 # Toàn bộ mã nguồn logic tương tác JavaScript thuần
│
├── css\
│   └── custom.css              # Style bổ trợ cho modal SEO, hiệu ứng rung, cuộn slider
│
├── static\                     # File CSS gốc của giao diện Semrush
│   └── index.a673ed60737865578432.css
│
└── __static__\                 # Font chữ và CSS chia theo webpack module
    ├── fonts\
    └── webpack\
```

---

## ✨ Các Tính Năng Tương Tác

1. **Header Mega Menu (Desktop)**:
   - Di chuột (Hover) hoặc Click vào các mục *Product*, *Solutions*, *Resources* để mở mega dropdown popover.
   - Tự động đóng khi click ra ngoài hoặc bấm phím `Esc`.
2. **Mobile Drawer Navigation**:
   - Nút Burger mở menu dạng drawer trên mobile.
   - Hỗ trợ đi sâu vào danh mục con (drill-down submenus) và quay lại bằng nút **Back**.
3. **Hero Website Search & SEO Modal**:
   - Nhập tên miền (ví dụ: `apple.com`, `shopify.com`, `nike.com`) và nhấn **Get insights**.
   - Hiệu ứng rung báo lỗi nếu để trống.
   - Hiển thị hiệu ứng tải xoay vòng và mở **Modal xem trước phân tích SEO** chuẩn Semrush (Authority Score, Traffic, Backlinks, Ranking Keywords).
4. **Promo Cards Toggle**:
   - Chuyển đổi trạng thái mở rộng giữa thẻ *Semrush One* và *Ask AI (Semrush MCP)*.
5. **Toolkits Accordion & Slider**:
   - Bấm vào biểu tượng trigger của từng toolkit để mở rộng thẻ lên kích thước 720px hiển thị đầy đủ công cụ.
   - Bấm nút **Prev / Next** hoặc dùng chuột kéo rê để lướt slider.
6. **Stats Counter Animation**:
   - Số liệu thống kê (28B, 43T, 808M, 142, 317M+) tự động nhảy số khi người dùng cuộn đến phần Stats.
   - Rê chuột vào mục bất kỳ để đổi trạng thái highlight active.
7. **Resources Articles Carousel**:
   - Cuộn ngang danh sách các bài viết với nút Prev/Next và kéo chuột lướt.
8. **Footer Language Switcher & Accordion**:
   - Chọn ngôn ngữ và thu gọn/mở rộng menu footer trên màn hình nhỏ.

---

## ❓ Xử Lý Lỗi Thường Gặp

### 1. Lỗi `'npm' is not recognized as an internal or external command`
- **Nguyên nhân**: Máy tính chưa cài đặt Node.js hoặc chưa nhận biến môi trường (PATH).
- **Cách khắc phục**:
  1. Thực hiện cài đặt lại Node.js theo [Hướng dẫn ở phần trên](#-hướng-dẫn-cài-đặt-nodejs).
  2. Đóng toàn bộ cửa sổ PowerShell/Terminal và mở lại để hệ thống cập nhật PATH.

### 2. Cổng `3000` bị chiếm dụng (`EADDRINUSE: address already in use :::3000`)
- **Nguyên nhân**: Có một ứng dụng khác đang chạy trên cổng 3000.
- **Cách khắc phục**: Chạy server trên một cổng khác bằng cách đặt biến môi trường `PORT`:
  - Trong PowerShell:
    ```powershell
    $env:PORT=8080; npm start
    ```
    Sau đó truy cập vào: `http://localhost:8080`

### 3. Lỗi `Running Scripts is disabled on this system` (Execution Policy trên PowerShell)
- **Nguyên nhân**: Chính sách bảo mật của Windows hạn chế chạy script PowerShell.
- **Cách khắc phục**: Mở PowerShell với quyền Administrator và chạy lệnh:
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
  ```
  Nhấn `Y` để xác nhận, sau đó chạy lại `npm start`.
