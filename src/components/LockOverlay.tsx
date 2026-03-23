'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { UNLOCK_COST } from '@/lib/auth';

interface LockOverlayProps {
  storyTitle: string;
  storySlug: string;
}

export default function LockOverlay({ storyTitle, storySlug }: LockOverlayProps) {
  const { user } = useAuth();

  if (!user) {
    // GUEST
    return (
      <div className="fixed inset-0 z-40 flex items-end justify-center pointer-events-none">
        <div className="pointer-events-auto w-full max-w-2xl mx-auto mb-0">
          <div
            className="relative bg-gradient-to-t from-gray-950 via-gray-950/95 to-transparent"
            style={{ height: '60vh' }}
          >
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <div className="mb-4">
                <span className="text-5xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Chương bị khóa</h3>
              <p className="text-gray-400 mb-6 text-sm">
                Đăng nhập để tiếp tục đọc <strong className="text-orange-400">{storyTitle}</strong>.<br />
                Thành viên mới nhận ngay <strong className="text-amber-400">50,000 💎</strong>
              </p>
              <div className="flex gap-3 justify-center">
                <Link
                  href="/register"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
                >
                  Đăng ký miễn phí
                </Link>
                <Link
                  href="/login"
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
                >
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MEMBER – show unlock prompt
  const hasEnoughGems = user.gems >= UNLOCK_COST;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center pointer-events-none">
      <div className="pointer-events-auto w-full max-w-2xl mx-auto mb-0">
        <div
          className="relative bg-gradient-to-t from-gray-950 via-gray-950/95 to-transparent"
          style={{ height: '60vh' }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
            <div className="mb-4">
              <span className="text-5xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Chương bị khóa</h3>
            {hasEnoughGems ? (
              <>
                <p className="text-gray-400 mb-2 text-sm">
                  Mở khóa toàn bộ <strong className="text-orange-400">{storyTitle}</strong>
                </p>
                <p className="text-amber-400 font-bold text-lg mb-6">
                  💎 {UNLOCK_COST.toLocaleString('vi-VN')} Ngọc
                </p>
                <p className="text-gray-500 text-xs mb-4">
                  Số dư hiện tại: {user.gems.toLocaleString('vi-VN')} 💎
                </p>
                <Link
                  href={`/story/${storySlug}`}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-2.5 rounded-lg transition-colors inline-block"
                >
                  Mở khóa ngay tại trang truyện
                </Link>
              </>
            ) : (
              <>
                <p className="text-gray-400 mb-2 text-sm">
                  Cần <strong className="text-amber-400">{UNLOCK_COST.toLocaleString('vi-VN')} 💎</strong> để mở khóa
                </p>
                <p className="text-red-400 text-xs mb-6">
                  Số dư: {user.gems.toLocaleString('vi-VN')} 💎 (thiếu {(UNLOCK_COST - user.gems).toLocaleString('vi-VN')} 💎)
                </p>
                <div className="flex gap-3 justify-center">
                  <Link
                    href="/profile"
                    className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
                  >
                    💎 Nạp Ngọc
                  </Link>
                  <Link
                    href={`/story/${storySlug}`}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold px-6 py-2.5 rounded-lg transition-colors"
                  >
                    Về trang truyện
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
