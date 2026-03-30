import Image from 'next/image';
import Link from 'next/link';
import type { Story, User } from '@/lib/types';
import { getStoryCategoryById } from '@/data/storyCategories';

interface ThongTinChiTietTruyenProps {
  story: Story;
  user: User | null;
  isStoryUnlocked: boolean;
  onOpenUnlock: () => void;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ThongTinChiTietTruyen({
  story,
  user,
  isStoryUnlocked,
  onOpenUnlock,
}: ThongTinChiTietTruyenProps) {
  const storyCategory = getStoryCategoryById(story.categoryId);
  const isCompleted = story.status === 'completed';

  return (
    <div className="rounded-2xl bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50 dark:from-gray-800/60 dark:via-gray-800/40 dark:to-gray-800/60 border border-teal-100 dark:border-gray-700 p-5 sm:p-8 mb-8">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        {/* ── Cover ── */}
        <div className="relative w-44 sm:w-52 aspect-[2/3] flex-shrink-0 mx-auto sm:mx-0 rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5">
          <Image
            src={story.cover}
            alt={story.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          {story.isAdult && (
            <span className="absolute top-2 right-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
              18+
            </span>
          )}
        </div>

        {/* ── Info ── */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
            {story.title}
          </h1>

          {/* Author */}
          {story.author && (
            <p className="flex items-center gap-1.5 text-sm text-teal-600 dark:text-teal-400 font-medium mb-3">
              <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              {story.author}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-3 mb-3">
            <StarRating rating={story.rating ?? 0} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {story.rating ?? '—'}
            </span>
            <span className="text-xs text-gray-400">
              / {story.ratingCount ?? 0} đánh giá
            </span>
          </div>

          {/* Login to rate */}
          {!user && (
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-xs text-teal-500 hover:text-teal-600 border border-teal-300 dark:border-teal-700 rounded-full px-3 py-1 mb-4 transition-colors"
            >
              ⭐ Đăng nhập để đánh giá
            </Link>
          )}

          {/* Stats row */}
          <div className="flex items-center flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              {(story.views ?? 0).toLocaleString('vi-VN')} lượt xem
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {(story.followers ?? 0).toLocaleString('vi-VN')} theo dõi
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              {story.chapters.length} chương
            </span>
          </div>

          {/* Translator */}
          {story.translator && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span className="text-gray-400">📝 Chuyển ngữ:</span>{' '}
              <span className="text-gray-700 dark:text-gray-200 font-medium">{story.translator}</span>
            </p>
          )}

          {/* Adult + Status row */}
          <div className="flex items-center flex-wrap gap-2 mb-4 text-sm">
            {story.isAdult && (
              <span className="flex items-center gap-1 text-rose-500">
                <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">18+</span>
                Nội dung người lớn
              </span>
            )}
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">Trạng thái</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              isCompleted
                ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400'
                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
            }`}>
              {isCompleted ? 'Hoàn thành' : 'Đang ra'}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700/60 border border-gray-200 dark:border-gray-600 px-3 py-1.5 rounded-full hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/story/${story.slug}/chapter/1`}
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-md shadow-teal-500/25"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
              Đọc Truyện
            </Link>

            <button className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 px-5 py-2.5 rounded-xl hover:border-rose-400 hover:text-rose-500 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              Yêu Thích
            </button>

            {user?.role === 'MEMBER' && !isStoryUnlocked && (
              <button
                onClick={onOpenUnlock}
                className="inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2.5 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-md shadow-orange-500/20"
              >
                💎 Mua Combo VIP
                <span className="bg-white/20 text-[10px] font-bold px-1.5 py-0.5 rounded ml-1">-6%</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
