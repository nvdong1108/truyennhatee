'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Story } from '@/lib/types';

interface StorySliderProps {
  title: string;
  stories: Story[];
  viewAllHref: string;
  isDark: boolean;
}

export default function StorySlider({ title, stories, viewAllHref, isDark }: StorySliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -350 : 350, behavior: 'smooth' });
  };

  /* ── theme tokens ── */
  const sectionBg  = isDark ? '' : '';
  const heading    = isDark ? 'text-white' : 'text-gray-900';
  const cardBg     = isDark
    ? 'bg-gray-800/80 border-gray-700 hover:border-teal-500'
    : 'bg-white border-gray-200 hover:border-teal-400 shadow-sm hover:shadow-teal-100';
  const titleTxt   = isDark ? 'text-gray-100 group-hover/c:text-teal-400' : 'text-gray-900 group-hover/c:text-teal-600';
  const tagCls     = isDark ? 'bg-gray-700/80 text-gray-400' : 'bg-gray-100 text-gray-500';
  const viewAllCls = isDark
    ? 'border-gray-700 text-gray-400 hover:text-teal-400 hover:border-teal-500'
    : 'border-gray-200 text-gray-500 hover:text-teal-600 hover:border-teal-400 bg-white';
  const arrowCls   = isDark
    ? 'bg-gray-900 border-gray-700 text-gray-400 hover:bg-teal-500 hover:border-teal-500 hover:text-white'
    : 'bg-white border-gray-200 text-gray-500 hover:bg-teal-500 hover:border-teal-500 hover:text-white shadow';

  return (
    <section className={`py-8 ${sectionBg}`}>
      <div className="max-w-[1400px] mx-auto px-5">

        {/* Section header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="w-1 h-6 bg-teal-500 rounded-full" />
            <h2 className={`text-lg font-bold ${heading}`}>{title}</h2>
          </div>
          <Link href={viewAllHref} className={`text-sm font-medium px-4 py-1.5 rounded-lg border transition-colors ${viewAllCls}`}>
            Xem tất cả →
          </Link>
        </div>

        {/* Slider wrapper */}
        <div className="relative group/slider">

          {/* Left arrow */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-8 -translate-x-4 z-10 w-9 h-9 rounded-full border flex items-center justify-center transition-all opacity-0 group-hover/slider:opacity-100 ${arrowCls}`}
            aria-label="Cuộn trái"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Card row */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {stories.map((story) => (
              <div key={story.id} className="flex-none w-[140px] md:w-[158px]" style={{ scrollSnapAlign: 'start' }}>
                <Link href={`/story/${story.slug}`} className="group/c block">
                  <div className={`rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${cardBg}`}>

                    {/* Cover */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={story.cover}
                        alt={story.title}
                        fill
                        className="object-cover group-hover/c:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2">
                        <span className="text-xs text-teal-300 font-semibold bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">
                          C.{story.latestChapter}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-2.5">
                      <h3 className={`text-xs font-semibold leading-snug line-clamp-2 transition-colors mb-1.5 ${titleTxt}`}>
                        {story.title}
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {story.tags.slice(0, 1).map((tag) => (
                          <span key={tag} className={`text-xs px-1.5 py-0.5 rounded-full ${tagCls}`}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-8 translate-x-4 z-10 w-9 h-9 rounded-full border flex items-center justify-center transition-all opacity-0 group-hover/slider:opacity-100 ${arrowCls}`}
            aria-label="Cuộn phải"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
