'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Story } from '@/lib/types';

const TAG_COLORS = [
  'bg-rose-500/90',
  'bg-cyan-500/90',
  'bg-violet-500/90',
  'bg-amber-500/90',
  'bg-emerald-500/90',
];

interface Props {
  stories: Story[];
  isDark: boolean;
}

const ITEMS_PER_PAGE = 4;

export default function TruyenQuangBa({ stories, isDark }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(stories.length / ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);

  const scrollToPage = useCallback((page: number) => {
    if (!scrollRef.current) return;
    const child = scrollRef.current.children[page * ITEMS_PER_PAGE] as HTMLElement | undefined;
    if (child) {
      scrollRef.current.scrollTo({ left: child.offsetLeft - scrollRef.current.offsetLeft, behavior: 'smooth' });
    }
    setCurrentPage(page);
  }, []);

  /* auto‑play */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((p) => {
        const next = (p + 1) % totalPages;
        scrollToPage(next);
        return next;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [totalPages, scrollToPage]);

  const heading = isDark ? 'text-white' : 'text-gray-900';
  const cardBg = isDark
    ? 'bg-gray-800/80 border-gray-700 hover:border-teal-500'
    : 'bg-white border-gray-200 hover:border-teal-400 shadow-sm hover:shadow-md';
  const titleTxt = isDark ? 'text-gray-100 group-hover/c:text-teal-400' : 'text-gray-900 group-hover/c:text-teal-600';
  const metaTxt = isDark ? 'text-gray-400' : 'text-gray-500';

  return (
    <section className="py-8">
      <div className="max-w-[1400px] mx-auto px-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="text-blue-500 text-xl">📢</span>
            <div>
              <h2 className={`text-lg font-bold ${heading}`}>Truyện Quảng Bá</h2>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Khám phá những tác phẩm được đề xuất đặc biệt</p>
            </div>
          </div>
          <Link href="/truyen-quang-ba" className="text-sm font-medium text-teal-500 hover:text-teal-600 transition-colors">
            Tất cả →
          </Link>
        </div>

        {/* Slider */}
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide pb-2" style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
          {stories.map((story, i) => (
            <div key={story.id} className="flex-none w-[240px] md:w-[260px]" style={{ scrollSnapAlign: 'start' }}>
              <Link href={`/story/${story.slug}`} className="group/c block">
                <div className={`rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${cardBg}`}>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image src={story.cover} alt={story.title} fill className="object-cover group-hover/c:scale-105 transition-transform duration-500" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    {/* Tags overlay */}
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      {story.tags.slice(0, 2).map((tag, j) => (
                        <span key={tag} className={`text-[10px] font-bold text-white px-2 py-0.5 rounded ${TAG_COLORS[j % TAG_COLORS.length]}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Chapter count */}
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 rounded px-1.5 py-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      <span className="text-white text-[10px] font-semibold">{story.latestChapter} chương</span>
                    </div>
                    {/* Author on cover */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-[9px] font-bold">
                        {(story.author || 'A').charAt(0)}
                      </div>
                      <span className="text-white text-[10px] font-medium drop-shadow">{story.author || 'Ẩn danh'}</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className={`text-sm font-semibold leading-snug line-clamp-2 transition-colors mb-1 ${titleTxt}`}>
                      {story.title}
                    </h3>
                    <p className={`text-xs line-clamp-2 ${metaTxt}`}>{story.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToPage(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentPage
                    ? 'bg-teal-500 w-6'
                    : isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
