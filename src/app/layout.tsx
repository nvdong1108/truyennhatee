import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "TruyệnNhàTee - Đọc Truyện Online",
  description: "Đọc truyện tiên hiệp, võ hiệp, huyền huyễn online - TruyệnNhàTee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased bg-gray-950 text-gray-100 min-h-screen">
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <footer className="mt-16 border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
            <p>© 2024 TruyệnNhàTee. Tất cả nội dung chỉ mang tính chất giải trí.</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}

