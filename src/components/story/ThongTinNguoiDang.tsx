import Image from 'next/image';
import type { Story } from '@/lib/types';

interface ThongTinNguoiDangProps {
  story: Story;
}

export default function ThongTinNguoiDang({ story }: ThongTinNguoiDangProps) {
  const authorName = story.translator ?? story.author ?? 'Ẩn danh';

  return (
    <section className="rounded-2xl bg-gradient-to-br from-teal-50/50 to-sky-50/50 dark:from-gray-800/40 dark:to-gray-800/30 border border-teal-100 dark:border-gray-700 p-6 mb-8">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white mb-5">
        <span className="text-teal-500">👤</span> Thông Tin Người Đăng
      </h2>

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-teal-200 dark:ring-teal-700 shrink-0">
          <Image
            src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(authorName)}`}
            alt={authorName}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Name + badge */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-gray-800 dark:text-white text-base">{authorName}</span>
            <svg className="w-4 h-4 text-teal-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400 mb-3">
            <span>📚 10 truyện đã đăng</span>
            <span>👥 5 người theo dõi</span>
            <span>📅 Tham gia: 17/03/2026</span>
          </div>

          {/* Level */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-gray-500 dark:text-gray-400">Level 1</span>
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden max-w-48">
              <div className="h-full bg-teal-400 rounded-full" style={{ width: '0%' }} />
            </div>
            <span className="text-xs text-gray-400">0% (0/100 XP)</span>
          </div>

          {/* Follow button */}
          <button className="inline-flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors shadow-sm shadow-teal-500/20">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Theo dõi
          </button>
        </div>
      </div>
    </section>
  );
}
