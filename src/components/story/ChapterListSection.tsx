'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Chapter } from '@/lib/types';

interface ChapterListSectionProps {
  storyId: string;
  storySlug: string;
  chapters: Chapter[];
  canReadChapter: (storyId: string, chapterNumber: number) => boolean;
}

export default function ChapterListSection({
  storyId,
  storySlug,
  chapters,
  canReadChapter,
}: ChapterListSectionProps) {
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    let list = chapters.filter((ch) =>
      ch.title.toLowerCase().includes(search.toLowerCase()),
    );
    if (!sortAsc) list = [...list].reverse();
    return list;
  }, [chapters, search, sortAsc]);

  return (
    <section className="mb-8">
      {/* Header row */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white">
          <span className="text-teal-500">📋</span> Danh Sách Chương
        </h2>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-3.5 h-3.5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth={2} />
                <path d="M14.5 14.5L19 19" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
              </svg>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm chương..."
              className="pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30 w-40 sm:w-52 transition-all"
            />
          </div>

          {/* Sort toggle */}
          <button
            onClick={() => setSortAsc((s) => !s)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-teal-400 transition-colors"
          >
            <span className="text-teal-400">🔃</span>
            Sắp xếp
          </button>
        </div>
      </div>

      {/* Chapter list */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
        {filtered.map((chapter) => {
          const locked = !canReadChapter(storyId, chapter.chapterNumber);
          const dateStr = chapter.publishedAt
            ? new Date(chapter.publishedAt).toLocaleDateString('vi-VN')
            : new Date(Date.now() - (chapters.length - chapter.chapterNumber) * 86_400_000).toLocaleDateString('vi-VN');

          if (locked) {
            return (
              <div
                key={chapter.chapterNumber}
                className="flex items-center justify-between py-3.5 px-4 bg-white dark:bg-gray-900/40 text-sm"
              >
                <span className="text-gray-400 dark:text-gray-500">{chapter.title}</span>
                <div className="flex items-center gap-4 text-xs text-gray-400 shrink-0">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                    {dateStr}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400">
                    🔒 Bị khóa
                  </span>
                </div>
              </div>
            );
          }

          return (
            <Link
              key={chapter.chapterNumber}
              href={`/story/${storySlug}/chapter/${chapter.chapterNumber}`}
              className="flex items-center justify-between py-3.5 px-4 bg-white dark:bg-gray-900/40 hover:bg-teal-50 dark:hover:bg-teal-900/10 text-sm transition-colors group"
            >
              <span className="text-gray-700 dark:text-gray-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {chapter.title}
              </span>
              <div className="flex items-center gap-4 text-xs text-gray-400 shrink-0">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                  {dateStr}
                </span>
                <span className="flex items-center gap-1 text-teal-500">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
                  Miễn phí
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
