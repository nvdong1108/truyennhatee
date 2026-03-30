'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Story } from '@/lib/types';
import { getStoryCategoryById } from '@/data/storyCategories';

/* ── Mock data ── */
const UPDATE_TIMES = [
  '3 phút trước', '12 phút trước', '25 phút trước', '1 giờ trước',
  '2 giờ trước', '4 giờ trước', '6 giờ trước', '7 giờ trước',
  '8 giờ trước', '10 giờ trước', '12 giờ trước', '1 ngày trước',
];

const CHAPTER_TITLES_POOL = [
  'Mau cầu cửu Kỹ sĩ Thiên ma ta',
  'Người phụ nữ trong phường là ai?',
  'Đệ chiến dài luận',
  'Cả sàng chung với anh ba vẫn có 7',
  'Anh đỹ cô vã nhẹ lau chon khác.',
  'Mười vẫn càng thú thần?',
  'Liếu Thiên Thần cùng dường binh lữ',
  'Ai không tưởng ẻm ai trong, người đó',
  'Con Thiên Thần của rừng già',
  'Anh cúi bách nguyệt quang, tôi đẹp khuynh đảo kinh thành',
];

interface Review {
  id: string;
  cover: string;
  storyTitle: string;
  author: string;
  rating: number;
  content: string;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    cover: 'https://picsum.photos/seed/review1/80/100',
    storyTitle: 'Cơn Mưa Hoa Nhài',
    author: 'Cà phê Mộc',
    rating: 5,
    content: 'Đang tuyệt mạnh chính kiểu nổi nhé ạ',
  },
  {
    id: '2',
    cover: 'https://picsum.photos/seed/review2/80/100',
    storyTitle: 'Lục Tổng Hãy Hôn, Tôi Cưới Luôn Tay(Full)',
    author: 'La Ximeo',
    rating: 5,
    content: 'Đọc yêu em thích kiểu nổi trải nhé ạ',
  },
  {
    id: '3',
    cover: 'https://picsum.photos/seed/review3/80/100',
    storyTitle: 'Trọng Sinh: Anh cười bạch nguyệt quang, tôi đẹp khuynh đảo kinh thành',
    author: 'Ashen',
    rating: 4,
    content: 'Truyện hay, nhân vật được xây dựng tốt',
  },
];

/* ── Stars ── */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3 h-3 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

/* ── Row item in "Mới Cập Nhật" ── */
function StoryUpdateRow({ story, index, isDark }: { story: Story; index: number; isDark: boolean }) {
  const titleCls = isDark ? 'text-white hover:text-teal-400' : 'text-gray-900 hover:text-teal-600';
  const chapterCls = isDark ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600';
  const timeCls = isDark ? 'text-gray-600' : 'text-gray-400';
  const borderCls = isDark ? 'border-gray-800' : 'border-gray-100';
  const tagCls = isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500';

  const chapterBase = story.latestChapter;
  const chapters = [
    { num: chapterBase, title: CHAPTER_TITLES_POOL[(index * 3) % CHAPTER_TITLES_POOL.length] },
    { num: chapterBase - 1, title: CHAPTER_TITLES_POOL[(index * 3 + 1) % CHAPTER_TITLES_POOL.length] },
    { num: chapterBase - 2, title: CHAPTER_TITLES_POOL[(index * 3 + 2) % CHAPTER_TITLES_POOL.length] },
  ];

  return (
    <div className={`py-3 border-b last:border-0 ${borderCls}`}>
      <div className="flex gap-3 items-start">
        <div className="relative w-10 h-14 shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
          <Image src={story.cover} alt={story.title} fill className="object-cover" unoptimized />
          <span className={`absolute bottom-0 left-0 right-0 text-center text-[8px] font-bold text-white py-0.5 ${
            index % 2 === 0 ? 'bg-rose-500' : 'bg-teal-500'
          }`}>
            {story.tags[0]?.slice(0, 6) || 'N/A'}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <Link href={`/story/${story.slug}`} className={`text-sm font-bold leading-tight line-clamp-1 transition-colors ${titleCls}`}>
            {story.title}
          </Link>
          <div className="mt-1 space-y-0.5">
            {chapters.map((ch) => (
              <div key={ch.num} className="flex items-center justify-between gap-2">
                <Link
                  href={`/story/${story.slug}/chapter/${ch.num}`}
                  className={`text-xs truncate flex-1 transition-colors ${chapterCls}`}
                >
                  Chương {ch.num}: {ch.title}
                </Link>
                <span className={`text-[10px] whitespace-nowrap ${timeCls}`}>
                  {UPDATE_TIMES[(index + ch.num) % UPDATE_TIMES.length]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
interface Props {
  stories: Story[];
  isDark: boolean;
}

export default function TruyenMoiCapNhat({ stories, isDark }: Props) {
  const heading = isDark ? 'text-white' : 'text-gray-900';
  const cardBg = isDark ? 'bg-gray-900/60 border-gray-800' : 'bg-white border-gray-200 shadow-sm';
  const reviewBg = isDark ? 'bg-gray-900/60 border-gray-800' : 'bg-white border-gray-200 shadow-sm';

  return (
    <section className="py-8">
      <div className="max-w-[1400px] mx-auto px-5">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Truyện Mới Cập Nhật */}
          <div className="flex-[6]">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-teal-500 text-lg">🔄</span>
              <h2 className={`text-lg font-bold ${heading}`}>Truyện Mới Cập Nhật</h2>
            </div>
            <div className={`rounded-xl border p-4 ${cardBg}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                {stories.map((story, i) => (
                  <StoryUpdateRow key={`${story.id}-${i}`} story={story} index={i} isDark={isDark} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Đánh Giá Truyện */}
          <div className="flex-[4] lg:min-w-[320px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-lg">⭐</span>
                <h2 className={`text-lg font-bold ${heading}`}>Đánh Giá Truyện</h2>
              </div>
            </div>
            <div className={`rounded-xl border p-4 space-y-4 ${reviewBg}`}>
              {MOCK_REVIEWS.map((review) => (
                <div key={review.id} className={`flex gap-3 pb-4 border-b last:border-0 last:pb-0 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                  <div className="relative w-16 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                    <Image src={review.cover} alt={review.storyTitle} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-bold line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{review.storyTitle}</h4>
                    <Stars rating={review.rating} />
                    <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      👤 {review.author}
                    </p>
                    <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{review.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
