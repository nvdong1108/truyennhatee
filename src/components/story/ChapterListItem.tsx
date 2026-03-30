import Link from 'next/link';
import { Chapter } from '@/lib/types';

interface ChapterListItemProps {
  chapter: Chapter;
  storySlug: string;
  isLocked: boolean;
}

export default function ChapterListItem({ chapter, storySlug, isLocked }: ChapterListItemProps) {
  if (isLocked) {
    return (
      <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-gray-800/50 border border-gray-700/50 opacity-70">
        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-sm">🔒</span>
          <span className="text-gray-400 text-sm">{chapter.title}</span>
        </div>
        <span className="text-xs text-gray-500">Bị khóa</span>
      </div>
    );
  }

  return (
    <Link
      href={`/story/${storySlug}/chapter/${chapter.chapterNumber}`}
      className="flex items-center justify-between py-3 px-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-orange-500/50 hover:bg-gray-800 transition-all group"
    >
      <div className="flex items-center gap-3">
        <span className="text-orange-500 text-sm">📖</span>
        <span className="text-gray-200 text-sm group-hover:text-orange-400 transition-colors">
          {chapter.title}
        </span>
      </div>
      <span className="text-xs text-gray-500 group-hover:text-orange-500 transition-colors">→</span>
    </Link>
  );
}
