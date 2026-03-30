/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Cho phép dùng ảnh từ các domain ngoài (picsum dùng tạm, xóa khi có ảnh thật)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
      },
    ],
  },
};

export default nextConfig;
