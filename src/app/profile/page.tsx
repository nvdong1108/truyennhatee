'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import GemDisplay from '@/components/GemDisplay';
import { STORIES } from '@/lib/mockData';
import { UNLOCK_COST } from '@/lib/auth';

export default function ProfilePage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    );
  }

  const unlockedStories = STORIES.filter((s) => user.unlockedStoryIds.includes(s.id));

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-white mb-8">Hồ Sơ Cá Nhân</h1>

      {/* User info card */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-2xl font-bold text-white">
            {user.username[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user.username}</h2>
            <div className="mt-1">
              <GemDisplay gems={user.gems} role={user.role} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-xl p-4">
            <p className="text-gray-500 text-xs mb-1">Loại tài khoản</p>
            <p className="text-white font-semibold">
              {user.role === 'VIP' ? '👑 VIP' : user.role === 'MEMBER' ? '👤 Thành Viên' : '🔓 Khách'}
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <p className="text-gray-500 text-xs mb-1">Số dư ngọc</p>
            <p className="text-amber-400 font-semibold">
              {user.role === 'VIP' ? '∞ Không giới hạn' : `💎 ${user.gems.toLocaleString('vi-VN')}`}
            </p>
          </div>
        </div>
      </div>

      {/* Nạp ngọc (mock) */}
      {user.role === 'MEMBER' && (
        <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-700/40 rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-bold text-amber-400 mb-2">💎 Nạp Ngọc</h3>
          <p className="text-gray-400 text-sm mb-4">
            Nạp ngọc để mở khóa truyện. Mỗi truyện chỉ cần{' '}
            <strong className="text-amber-400">{UNLOCK_COST.toLocaleString('vi-VN')} 💎</strong>
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { amount: 35000, price: '35.000đ', label: '⭐' },
              { amount: 100000, price: '90.000đ', label: '🔥' },
              { amount: 350000, price: '280.000đ', label: '👑' },
            ].map((pkg) => (
              <button
                key={pkg.amount}
                className="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-amber-500 rounded-xl p-3 text-center transition-all"
                onClick={() => alert('Tính năng nạp ngọc đang phát triển!')}
              >
                <p className="text-xl mb-1">{pkg.label}</p>
                <p className="text-amber-400 font-bold text-sm">{pkg.amount.toLocaleString('vi-VN')} 💎</p>
                <p className="text-gray-500 text-xs">{pkg.price}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Unlocked stories */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-bold text-white mb-4">
          📚 Truyện Đã Mở Khóa ({unlockedStories.length})
        </h3>
        {unlockedStories.length > 0 ? (
          <div className="space-y-3">
            {unlockedStories.map((story) => (
              <Link
                key={story.id}
                href={`/story/${story.slug}`}
                className="flex items-center gap-3 p-3 bg-gray-800 rounded-xl hover:bg-gray-750 hover:border-orange-500/50 border border-gray-700 transition-all"
              >
                <span className="text-2xl">📖</span>
                <div>
                  <p className="text-white font-medium text-sm">{story.title}</p>
                  <p className="text-gray-500 text-xs">{story.chapters.length} chương</p>
                </div>
                <span className="ml-auto text-orange-500 text-sm">→</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            Bạn chưa mở khóa truyện nào.{' '}
            <Link href="/" className="text-orange-400 hover:text-orange-300">
              Khám phá truyện
            </Link>
          </p>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-900/30 hover:bg-red-900/50 border border-red-800/40 text-red-400 font-semibold py-3 rounded-xl transition-colors"
      >
        Đăng Xuất
      </button>
    </div>
  );
}
