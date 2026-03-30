import Image from 'next/image';
import Link from 'next/link';
import { Story } from '@/lib/types';

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <Link href={`/story/${story.slug}`} className="group block">
      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
        {/* Cover */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={story.cover}
            alt={story.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
          <div className="absolute bottom-2 left-2 right-2">
            <span className="text-xs text-orange-400 font-medium">
              Chương {story.latestChapter}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 group-hover:text-orange-400 transition-colors mb-2">
            {story.title}
          </h3>
          <div className="flex flex-wrap gap-1">
            {story.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
