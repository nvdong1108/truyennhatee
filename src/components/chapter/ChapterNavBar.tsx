'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import type { Chapter } from '@/lib/types';

interface ChapterNavBarProps {
  storySlug: string;
  storyTitle: string;
  chapters: Chapter[];
  currentChapter: number;
  prevChapter: number | null;
  nextChapter: number | null;
}

export default function ChapterNavBar({
  storySlug,
  storyTitle,
  chapters,
  currentChapter,
  prevChapter,
  nextChapter,
}: ChapterNavBarProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  const current = chapters.find((ch) => ch.chapterNumber === currentChapter);

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Prev */}
      {prevChapter ? (
        <Link
          href={`/story/${storySlug}/chapter/${prevChapter}`}
          className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl transition-colors shadow-sm shadow-teal-500/20 whitespace-nowrap"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          <span className="hidden sm:inline">Chương trước</span>
          <span className="sm:hidden">Trước</span>
        </Link>
      ) : (
        <span className="flex items-center gap-1.5 bg-gray-200 dark:bg-gray-700 text-gray-400 text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl cursor-not-allowed whitespace-nowrap">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          <span className="hidden sm:inline">Chương trước</span>
          <span className="sm:hidden">Trước</span>
        </span>
      )}

      {/* Chapter selector */}
      <div className="relative flex-1 min-w-0" ref={ref}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-teal-400 transition-colors"
        >
          <span className="truncate">{current?.title ?? `Chương ${currentChapter}`}</span>
          <svg className={`w-4 h-4 shrink-0 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 max-h-64 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl z-40">
            {chapters.map((ch) => (
              <Link
                key={ch.chapterNumber}
                href={`/story/${storySlug}/chapter/${ch.chapterNumber}`}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 text-sm transition-colors ${
                  ch.chapterNumber === currentChapter
                    ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                {ch.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Next */}
      {nextChapter ? (
        <Link
          href={`/story/${storySlug}/chapter/${nextChapter}`}
          className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl transition-colors shadow-sm shadow-teal-500/20 whitespace-nowrap"
        >
          <span className="hidden sm:inline">Chương sau</span>
          <span className="sm:hidden">Sau</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </Link>
      ) : (
        <span className="flex items-center gap-1.5 bg-gray-200 dark:bg-gray-700 text-gray-400 text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl cursor-not-allowed whitespace-nowrap">
          <span className="hidden sm:inline">Chương sau</span>
          <span className="sm:hidden">Sau</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </span>
      )}
    </div>
  );
}
