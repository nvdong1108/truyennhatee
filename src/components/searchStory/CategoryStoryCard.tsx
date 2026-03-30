import Image from 'next/image';
import Link from 'next/link';
import type { Story } from '@/lib/types';

interface CategoryStoryCardProps {
  story: Story;
}

export default function CategoryStoryCard({ story }: CategoryStoryCardProps) {
  const firstTag = story.tags[0] ?? null;

  return (
    <Link href={`/story/${story.slug}`} className="group block">
      {/* Cover image */}
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-sm bg-gray-100 dark:bg-gray-800">
        <Image
          src={story.cover}
          alt={story.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 16vw"
          unoptimized
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* FULL badge — top left */}
        <span className="absolute top-2 left-2 bg-black/75 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wide leading-none">
          FULL
        </span>

        {/* Chapter count — top right */}
        <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-black/60 rounded-md px-1.5 py-0.5">
          <svg className="w-3 h-3 text-white shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
          <span className="text-white text-[10px] font-semibold leading-none">
            {story.latestChapter}
          </span>
        </div>
      </div>

      {/* Tag + title */}
      <div className="mt-2 space-y-1">
        {firstTag && (
          <span className="inline-block text-[11px] font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2 py-0.5 rounded-full leading-tight">
            {firstTag}
          </span>
        )}
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100 leading-snug line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          {story.title}
        </h3>
      </div>
    </Link>
  );
}
