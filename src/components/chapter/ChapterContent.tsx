import Link from 'next/link';
import type { Chapter, Story } from '@/lib/types';

interface ChapterContentProps {
  story: Story;
  chapter: Chapter;
  fontSize: number;
}

export default function ChapterContent({ story, chapter, fontSize }: ChapterContentProps) {
  const paragraphs = chapter.content.split('\n').filter((p) => p.trim());
  const wordCount = chapter.content.replace(/\s+/g, ' ').trim().split(' ').length;
  const publishDate = chapter.publishedAt
    ? new Date(chapter.publishedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : null;

  return (
    <article className="py-6 sm:py-8">
      {/* Chapter title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
        {chapter.title}
      </h1>

      {/* Story link */}
      <p className="text-center mb-4">
        <Link href={`/story/${story.slug}`} className="text-teal-600 dark:text-teal-400 hover:underline font-medium">
          {story.title}
        </Link>
      </p>

      {/* Meta row */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-gray-400 dark:text-gray-500 mb-2">
        {story.author && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {story.author}
          </span>
        )}
        {publishDate && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {publishDate}
          </span>
        )}
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          {(story.views ?? 0).toLocaleString('vi-VN')} lượt đọc
        </span>
      </div>

      {/* Word count */}
      <p className="text-center text-xs text-gray-400 dark:text-gray-500 mb-8">
        {wordCount.toLocaleString('vi-VN')} từ
      </p>

      {/* Separator */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-300 dark:via-teal-700 to-transparent" />
        <span className="text-teal-500">✦</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-300 dark:via-teal-700 to-transparent" />
      </div>

      {/* Chapter text */}
      <div
        className="prose dark:prose-invert prose-gray max-w-none leading-relaxed text-gray-700 dark:text-gray-300"
        style={{ fontSize: `${fontSize}px`, lineHeight: 1.9 }}
      >
        {paragraphs.map((p, i) => (
          <p key={i} className="mb-4 text-justify indent-8">
            {p}
          </p>
        ))}
      </div>

      {/* End separator */}
      <div className="flex items-center gap-3 mt-10">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-300 dark:via-teal-700 to-transparent" />
        <span className="text-gray-400 dark:text-gray-500 text-sm">— HẾT CHƯƠNG —</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-300 dark:via-teal-700 to-transparent" />
      </div>
    </article>
  );
}
