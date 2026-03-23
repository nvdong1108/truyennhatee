'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import GemDisplay from './GemDisplay';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-950 border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-500">📖</span>
            <span className="text-xl font-bold text-white">
              Truyện<span className="text-orange-500">Nhà</span>Tee
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-300 hover:text-orange-400 transition-colors text-sm font-medium">
              Trang Chủ
            </Link>
            <Link href="/?tag=Tu+tiên" className="text-gray-300 hover:text-orange-400 transition-colors text-sm font-medium">
              Tu Tiên
            </Link>
            <Link href="/?tag=Võ+thuật" className="text-gray-300 hover:text-orange-400 transition-colors text-sm font-medium">
              Võ Thuật
            </Link>
            <Link href="/?tag=Huyền+huyễn" className="text-gray-300 hover:text-orange-400 transition-colors text-sm font-medium">
              Huyền Huyễn
            </Link>
          </nav>

          {/* Auth area */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <GemDisplay gems={user.gems} role={user.role} />
                <Link
                  href="/profile"
                  className="text-sm text-gray-300 hover:text-orange-400 transition-colors font-medium"
                >
                  {user.username}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1.5 rounded-md transition-colors"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-gray-300 hover:text-orange-400 transition-colors font-medium"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-md transition-colors font-medium"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
