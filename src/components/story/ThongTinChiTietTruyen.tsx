import Image from 'next/image';
import Link from 'next/link';
import type { Story, User } from '@/lib/types';

interface ThongTinChiTietTruyenProps {
  story: Story;
  user: User | null;
  isStoryUnlocked: boolean;
  onOpenUnlock: () => void;
}

export default function ThongTinChiTietTruyen({
  story,
  user,
  isStoryUnlocked,
  onOpenUnlock,
}: ThongTinChiTietTruyenProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 mb-8">
      <div className="relative w-48 h-64 flex-shrink-0 mx-auto sm:mx-0 rounded-xl overflow-hidden shadow-2xl">
        <Image
          src={story.cover}
          alt={story.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="flex-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{story.title}</h1>

        <div className="flex flex-wrap gap-2 mb-4">
          {story.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-4">{story.description}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{`📖 ${story.chapters.length} chương`}</span>
          <span>🔥 Đang ra</span>
        </div>

        {user?.role === 'MEMBER' && !isStoryUnlocked && (
          <div className="mt-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
            <p className="text-sm text-gray-400 mb-3">
              Mở khóa toàn bộ truyện với <strong className="text-amber-400">35,000 💎</strong>
            </p>
            <div className="flex gap-3">
              <button
                onClick={onOpenUnlock}
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
              >
                🔓 Mở Khóa Truyện
              </button>
              <span className="flex items-center text-xs text-gray-500">
                {`Số dư: ${user.gems.toLocaleString('vi-VN')} 💎`}
              </span>
            </div>
          </div>
        )}

        {isStoryUnlocked && user?.role !== 'VIP' && (
          <div className="mt-4 p-3 bg-green-900/20 border border-green-700/30 rounded-xl">
            <p className="text-sm text-green-400">✅ Đã mở khóa - Đọc tất cả chương!</p>
          </div>
        )}

        {user?.role === 'VIP' && (
          <div className="mt-4 p-3 bg-amber-900/20 border border-amber-700/30 rounded-xl">
            <p className="text-sm text-amber-400">👑 VIP - Đọc không giới hạn!</p>
          </div>
        )}

        {!user && (
          <div className="mt-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
            <p className="text-sm text-gray-400 mb-3">Đăng nhập để đọc và mở khóa truyện</p>
            <Link
              href="/register"
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors inline-block"
            >
              Đăng ký - Nhận 50,000 💎 miễn phí
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
