'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Story } from '@/lib/types';

const TAG_COLORS: Record<string, string> = {
  'Tu tiên': 'bg-purple-500',
  'Luyện đan': 'bg-orange-500',
  'Huyền huyễn': 'bg-blue-500',
  'Mạnh mẽ': 'bg-red-500',
  'Đấu khí': 'bg-rose-500',
  'Võ thuật': 'bg-cyan-500',
  'Hào hùng': 'bg-amber-500',
  'Thần đạo': 'bg-violet-500',
  'Kiếm hiệp': 'bg-emerald-500',
  'Ngôn tình': 'bg-pink-500',
  'Đô thị': 'bg-teal-500',
};

function getTagColor(tag: string) {
  return TAG_COLORS[tag] || 'bg-gray-500';
}

const ITEMS_PER_PAGE = 10;

interface Props {
  stories: Story[];
  isDark: boolean;
}

export default function TruyenXuHuong({ stories, isDark }: Props) {
  const totalPages = Math.max(1, Math.ceil(stories.length / ITEMS_PER_PAGE));
  const [page, setPage] = useState(0);
  const paged = stories.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  const heading = isDark ? 'text-white' : 'text-gray-900';
  const cardBg = isDark
    ? 'bg-gray-800/80 border-gray-700 hover:border-teal-500'
    : 'bg-white border-gray-200 hover:border-teal-400 shadow-sm hover:shadow-md';
  const titleTxt = isDark ? 'text-gray-100 group-hover/c:text-teal-400' : 'text-gray-900 group-hover/c:text-teal-600';
  const metaTxt = isDark ? 'text-gray-500' : 'text-gray-400';
  const tagCls = isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600';
  const pageBtnActive = 'bg-teal-500 text-white';
  const pageBtn = isDark
    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
    : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-400';

  return (
    <section className="py-8">
      <div className="max-w-[1400px] mx-auto px-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="text-rose-500 text-xl">📈</span>
            <div>
              <h2 className={`text-lg font-bold ${heading}`}>Truyện Đang Xu Hướng</h2>
              <p className={`text-xs ${metaTxt}`}>{stories.length} truyện được đề xuất bởi Cộng Đồng</p>
            </div>
          </div>
          <Link href="/truyen-xu-huong" className="text-sm font-medium text-teal-500 hover:text-teal-600 transition-colors">
            Xem tất cả →
          </Link>
        </div>

        {/* Grid 5 cols x 2 rows */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {paged.map((story, i) => {
            const num = page * ITEMS_PER_PAGE + i + 1;
            const tag = story.tags[0];
            return (
              <Link key={story.id} href={`/story/${story.slug}`} className="group/c block">
                <div className={`rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${cardBg}`}>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image src={story.cover} alt={story.title} fill className="object-cover group-hover/c:scale-105 transition-transform duration-500" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Number badge */}
                    <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      #{String(num).padStart(2, '0')}
                    </span>
                    {/* Tag */}
                    {tag && (
                      <span className={`absolute bottom-2 left-2 text-[10px] font-bold text-white px-2 py-0.5 rounded ${getTagColor(tag)}`}>
                        {tag}
                      </span>
                    )}
                    {/* Chapters */}
                    <div className="absolute bottom-2 right-2 flex items-center gap-0.5 bg-black/60 rounded px-1.5 py-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      <span className="text-white text-[10px] font-semibold">{story.latestChapter}</span>
                    </div>
                  </div>
                  <div className="p-2.5">
                    <h3 className={`text-xs font-semibold leading-snug line-clamp-2 transition-colors mb-1 ${titleTxt}`}>
                      {story.title}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${tagCls}`}>{tag}</span>
                      <span className={`text-[10px] ${metaTxt}`}>C.{story.latestChapter}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className={`text-xs px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40 ${pageBtn}`}
            >
              ← Trước
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`text-xs w-8 h-8 rounded-lg font-medium transition-colors ${
                  i === page ? pageBtnActive : pageBtn
                }`}
              >
                {i + 1}
              </button>
            ))}
            <span className={`text-xs ${metaTxt}`}># Trang</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className={`text-xs px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40 ${pageBtn}`}
            >
              Sau →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
