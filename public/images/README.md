# Thư mục hình ảnh — /public/images/

Tất cả hình ảnh tĩnh của website lưu tại đây.
Trong code, dùng đường dẫn bắt đầu từ `/images/...` (bỏ phần `public/`).

---

## 📁 banner/
Ảnh nền cho **Hero Banner** trang chủ (slider).

- Tỉ lệ khuyến nghị: **16:9** (ví dụ: 1600×900, 1920×1080)
- Định dạng: `.webp` (ưu tiên) hoặc `.jpg`
- Đặt tên theo slug truyện: `than-dao-dan-ton.webp`

Ví dụ dùng trong `bannerStories.ts`:
```ts
cover: '/images/banner/than-dao-dan-ton.webp'
```

---

## 📁 logo/
Logo website và các biến thể.

| File               | Mô tả                          |
|--------------------|--------------------------------|
| `logo.svg`         | Logo chính (full màu)          |
| `logo-white.svg`   | Logo trắng (dùng trên nền tối) |
| `logo-dark.svg`    | Logo tối (dùng trên nền sáng)  |
| `favicon.ico`      | Favicon (đặt ở `/public/` gốc) |

Ví dụ:
```tsx
<Image src="/images/logo/logo.svg" alt="Logo" width={120} height={40} />
```

---

## 📁 covers/
Ảnh bìa truyện (hiển thị trong card, trang chi tiết).

- Tỉ lệ khuyến nghị: **2:3** (dọc — ví dụ: 300×450, 400×600)
- Định dạng: `.webp` hoặc `.jpg`
- Đặt tên theo slug: `than-dao-dan-ton.webp`

Ví dụ dùng trong `mockData.ts`:
```ts
cover: '/images/covers/than-dao-dan-ton.webp'
```

---

## Quy ước đặt tên
- Dùng **chữ thường + dấu gạch ngang** (kebab-case): `ten-truyen.webp`
- Không dùng khoảng trắng, dấu tiếng Việt trong tên file
