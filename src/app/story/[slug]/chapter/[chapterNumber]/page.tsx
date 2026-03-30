'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import LockOverlay from '@/components/LockOverlay';
import { getStoryBySlug, getChapter, STORIES } from '@/lib/mockData';
import ChapterNavBar from '@/components/chapter/ChapterNavBar';
import ChapterToolbar from '@/components/chapter/ChapterToolbar';
import ChapterContent from '@/components/chapter/ChapterContent';
import ChapterActions from '@/components/chapter/ChapterActions';
import TruyenLienQuan from '@/components/story/TruyenLienQuan';

interface Props {
  params: Promise<{ slug: string; chapterNumber: string }>;
}

export default function ChapterPage({ params }: Props) {
  const { slug, chapterNumber } = use(params);
  const chapterNum = parseInt(chapterNumber, 10);
  if (isNaN(chapterNum)) notFound();

  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const chapter = getChapter(slug, chapterNum);
  if (!chapter) notFound();

  const { canReadChapter } = useAuth();
  const isLocked = !canReadChapter(story.id, chapterNum);

  const prevChapter = chapterNum > 1 ? chapterNum - 1 : null;
  const nextChapter = chapterNum < story.chapters.length ? chapterNum + 1 : null;

  const [fontSize, setFontSize] = useState(18);
  const handleFontSize = (delta: number) => setFontSize((s) => Math.max(12, Math.min(28, s + delta)));

  const relatedStories = STORIES.filter((s) => s.id !== story.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-5 flex-wrap">
        <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
          Trang chủ
        </Link>
        <svg className="w-3 h-3 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <Link href={`/story/${story.slug}`} className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors truncate max-w-[200px]">
          {story.title}
        </Link>
        <svg className="w-3 h-3 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-400 dark:text-gray-500">Chương {chapterNum}</span>
      </nav>

      {/* Navigation top */}
      <ChapterNavBar
        storySlug={story.slug}
        storyTitle={story.title}
        chapters={story.chapters}
        currentChapter={chapterNum}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
      />

      {/* Toolbar */}
      <div className="mt-4">
        <ChapterToolbar fontSize={fontSize} onFontSizeChange={handleFontSize} />
      </div>

      {/* Chapter content */}
      <div className="relative">
        <div className={isLocked ? 'max-h-96 overflow-hidden' : ''}>
          <ChapterContent story={story} chapter={chapter} fontSize={fontSize} />
        </div>

        {isLocked && (
          <LockOverlay storyTitle={story.title} storySlug={story.slug} />
        )}
      </div>

      {/* Bottom section (only for unlocked) */}
      {!isLocked && (
        <>
          {/* Action buttons */}
          <ChapterActions />

          {/* Navigation bottom */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <ChapterNavBar
              storySlug={story.slug}
              storyTitle={story.title}
              chapters={story.chapters}
              currentChapter={chapterNum}
              prevChapter={prevChapter}
              nextChapter={nextChapter}
            />
          </div>

          {/* Related stories */}
          <div className="mt-10">
            <TruyenLienQuan stories={relatedStories} title="Truyện hợp gu để đọc tiếp" />
          </div>
        </>
      )}
    </div>
  );
}
