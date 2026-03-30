'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Story } from '@/lib/types';
import { getStoryCategoryById } from '@/data/storyCategories';

interface TruyenLienQuanProps {
  stories: Story[];
  title?: string;
}

export default function TruyenLienQuan({ stories, title }: TruyenLienQuanProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' });
  };

  if (stories.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white mb-4">
        <span className="text-teal-500">📚</span> {title ?? 'Truyện Liên Quan'}
      </h2>

      <div className="relative group/slider">
        {/* Scroll arrows */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg text-gray-500 hover:text-teal-500 hover:border-teal-400 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg text-gray-500 hover:text-teal-500 hover:border-teal-400 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {stories.map((story, idx) => {
            const category = getStoryCategoryById(story.categoryId);
            return (
              <Link
                key={`${story.id}-${idx}`}
                href={`/story/${story.slug}`}
                className="group flex-shrink-0 w-28 sm:w-32 snap-start"
              >
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-sm bg-gray-100 dark:bg-gray-800 mb-2">
                  <Image
                    src={story.cover}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="128px"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <span className="absolute top-1.5 left-1.5 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                    FULL
                  </span>
                  <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 bg-black/60 rounded px-1 py-0.5">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    <span className="text-white text-[9px] font-semibold">{story.latestChapter}</span>
                  </div>
                </div>

                {/* Tag */}
                {category && (
                  <span className="inline-block text-[10px] font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-1.5 py-0.5 rounded-full mb-0.5 leading-tight">
                    {category.name}
                  </span>
                )}

                <h3 className="text-xs font-medium text-gray-700 dark:text-gray-200 leading-snug line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {story.title}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
