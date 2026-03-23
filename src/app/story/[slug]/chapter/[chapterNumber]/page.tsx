'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import LockOverlay from '@/components/LockOverlay';
import { getStoryBySlug, getChapter } from '@/lib/mockData';

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

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-400 transition-colors">Trang chủ</Link>
        <span className="mx-2">/</span>
        <Link href={`/story/${story.slug}`} className="hover:text-orange-400 transition-colors">
          {story.title}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-300">Chương {chapterNum}</span>
      </nav>

      {/* Chapter header */}
      <div className="text-center mb-10">
        <Link
          href={`/story/${story.slug}`}
          className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors"
        >
          {story.title}
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold text-white mt-2">{chapter.title}</h1>
      </div>

      {/* Navigation top */}
      <div className="flex justify-between items-center mb-8 gap-2">
        {prevChapter ? (
          <Link
            href={`/story/${story.slug}/chapter/${prevChapter}`}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm px-4 py-2 rounded-lg border border-gray-700 transition-all"
          >
            ← Chương trước
          </Link>
        ) : (
          <div />
        )}
        <Link
          href={`/story/${story.slug}`}
          className="text-gray-500 hover:text-orange-400 text-sm transition-colors"
        >
          📋 Mục lục
        </Link>
        {nextChapter ? (
          <Link
            href={`/story/${story.slug}/chapter/${nextChapter}`}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm px-4 py-2 rounded-lg border border-gray-700 transition-all"
          >
            Chương tiếp →
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Chapter content */}
      <div className="relative">
        <div
          className={`chapter-content ${isLocked ? 'max-h-96 overflow-hidden' : ''}`}
        >
          {chapter.content.split('\n\n').map((para: string, i: number) => (
            <p key={i} className="mb-6 text-gray-200 leading-8 first-letter:ml-8">
              {para}
            </p>
          ))}
        </div>

        {isLocked && (
          <LockOverlay
            storyTitle={story.title}
            storySlug={story.slug}
          />
        )}
      </div>

      {/* Navigation bottom (only for unlocked) */}
      {!isLocked && (
        <div className="flex justify-between items-center mt-12 gap-2 border-t border-gray-800 pt-8">
          {prevChapter ? (
            <Link
              href={`/story/${story.slug}/chapter/${prevChapter}`}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm px-4 py-2 rounded-lg border border-gray-700 transition-all"
            >
              ← Chương trước
            </Link>
          ) : (
            <div />
          )}
          <Link
            href={`/story/${story.slug}`}
            className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 text-sm px-4 py-2 rounded-lg border border-orange-500/30 transition-all"
          >
            📋 Mục lục
          </Link>
          {nextChapter ? (
            <Link
              href={`/story/${story.slug}/chapter/${nextChapter}`}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm px-4 py-2 rounded-lg border border-gray-700 transition-all"
            >
              Chương tiếp →
            </Link>
          ) : (
            <div className="text-center text-gray-500 text-sm">
              Hết chương mới nhất 🎉
            </div>
          )}
        </div>
      )}
    </div>
  );
}
