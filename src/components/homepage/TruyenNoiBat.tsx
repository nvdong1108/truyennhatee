'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Story } from '@/lib/types';
import { getStoryCategoryById } from '@/data/storyCategories';

/* Tag color map */
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
  'Hải Tặc': 'bg-green-600',
};

function getTagColor(tag: string) {
  return TAG_COLORS[tag] || 'bg-gray-500';
}

interface Props {
  stories: Story[];
  isDark: boolean;
}

export default function TruyenNoiBat({ stories, isDark }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -350 : 350, behavior: 'smooth' });
  };

  const heading = isDark ? 'text-white' : 'text-gray-900';
  const cardBg = isDark
    ? 'bg-gray-800/80 border-gray-700 hover:border-teal-500'
    : 'bg-white border-gray-200 hover:border-teal-400 shadow-sm hover:shadow-md';
  const titleTxt = isDark ? 'text-gray-100 group-hover/c:text-teal-400' : 'text-gray-900 group-hover/c:text-teal-600';
  const arrowCls = isDark
    ? 'bg-gray-900 border-gray-700 text-gray-400 hover:bg-teal-500 hover:border-teal-500 hover:text-white'
    : 'bg-white border-gray-200 text-gray-500 hover:bg-teal-500 hover:border-teal-500 hover:text-white shadow';

  return (
    <section className="py-8">
      <div className="max-w-[1400px] mx-auto px-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="text-orange-500 text-xl">🔥</span>
            <div>
              <h2 className={`text-lg font-bold ${heading}`}>Truyện Nổi Bật</h2>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Khám phá những câu chuyện được yêu thích nhất</p>
            </div>
          </div>
          <Link href="/truyen-noi-bat" className={`text-sm font-medium text-teal-500 hover:text-teal-600 transition-colors`}>
            Tất cả →
          </Link>
        </div>

        {/* Slider */}
        <div className="relative group/slider">
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded-full border flex items-center justify-center transition-all opacity-0 group-hover/slider:opacity-100 ${arrowCls}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2" style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
            {stories.map((story) => {
              const tag = story.tags[0];
              return (
                <div key={story.id} className="flex-none w-[140px] md:w-[155px]" style={{ scrollSnapAlign: 'start' }}>
                  <Link href={`/story/${story.slug}`} className="group/c block">
                    <div className={`rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${cardBg}`}>
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image src={story.cover} alt={story.title} fill className="object-cover group-hover/c:scale-105 transition-transform duration-500" unoptimized />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        {/* Genre tag bottom-left */}
                        {tag && (
                          <span className={`absolute bottom-2 left-2 text-[10px] font-bold text-white px-2 py-0.5 rounded ${getTagColor(tag)}`}>
                            {tag}
                          </span>
                        )}
                        {/* Chapter count bottom-right */}
                        <div className="absolute bottom-2 right-2 flex items-center gap-0.5 bg-black/60 rounded px-1.5 py-0.5">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                          </svg>
                          <span className="text-white text-[10px] font-semibold">{story.latestChapter}</span>
                        </div>
                      </div>
                      <div className="p-2.5">
                        <h3 className={`text-xs font-semibold leading-snug line-clamp-2 transition-colors ${titleTxt}`}>
                          {story.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded-full border flex items-center justify-center transition-all opacity-0 group-hover/slider:opacity-100 ${arrowCls}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
