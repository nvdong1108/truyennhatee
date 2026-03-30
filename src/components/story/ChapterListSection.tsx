import ChapterListItem from '@/components/story/ChapterListItem';
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
  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-3">📋 Danh Sách Chương</h2>
      <div className="space-y-2">
        {chapters.map((chapter) => {
          const locked = !canReadChapter(storyId, chapter.chapterNumber);
          return (
            <ChapterListItem
              key={chapter.chapterNumber}
              chapter={chapter}
              storySlug={storySlug}
              isLocked={locked}
            />
          );
        })}
      </div>
    </div>
  );
}
