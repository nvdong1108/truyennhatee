import Image from 'next/image';
import Link from 'next/link';
import { Story } from '@/lib/types';

/* ── Mock review data ── */
interface Review {
  id: string;
  username: string;
  storyTitle: string;
  rating: number;
  content: string;
  timeAgo: string;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    username: 'Ngọc Bảo',
    storyTitle: 'Thần Đạo Đan Tôn',
    rating: 5,
    content: 'Truyện rất hay! Tình tiết lôi cuốn, nhân vật chính được xây dựng rất tốt, mỗi chương đều có điểm nhấn riêng.',
    timeAgo: '2 giờ trước',
  },
  {
    id: '2',
    username: 'Minh Tuấn',
    storyTitle: 'Đấu Phá Thương Khung',
    rating: 4,
    content: 'Cốt truyện hấp dẫn, dịch thuật mượt mà. Rất đáng đọc cho ai thích thể loại đấu khí hào hùng!',
    timeAgo: '5 giờ trước',
  },
  {
    id: '3',
    username: 'Thanh Hương',
    storyTitle: 'Vô Thượng Thần Đế',
    rating: 5,
    content: 'Đọc xong không dứt ra được. Chờ update tiếp theo mà háo hức quá, đỉnh của chóp!',
    timeAgo: '1 ngày trước',
  },
  {
    id: '4',
    username: 'Gia Bảo',
    storyTitle: 'Thần Đạo Đan Tôn',
    rating: 4,
    content: 'Phần hành động căng thẳng, thế giới xây dựng rất công phu. Mong tác giả ra nhiều chương hơn.',
    timeAgo: '2 ngày trước',
  },
  {
    id: '5',
    username: 'Hải Linh',
    storyTitle: 'Đấu Phá Thương Khung',
    rating: 5,
    content: 'Nhân vật phụ cũng được xây dựng rất tốt. Đọc 1 lèo từ chương 1 đến cuối!',
    timeAgo: '3 ngày trước',
  },
];

const UPDATE_TIMES = [
  '3 phút trước', '12 phút trước', '25 phút trước', '1 giờ trước',
  '2 giờ trước', '4 giờ trước', '6 giờ trước', '8 giờ trước',
  '12 giờ trước', '1 ngày trước', '1 ngày trước', '2 ngày trước',
];

/* ── Star rating atom ── */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3 h-3 ${i < rating ? 'text-amber-400' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

/* ── Review card ── */
function ReviewCard({ review, isDark }: { review: Review; isDark: boolean }) {
  const divider = isDark ? 'border-gray-800' : 'border-gray-100';
  const nameCls  = isDark ? 'text-gray-200' : 'text-gray-800';
  const bodyCls  = isDark ? 'text-gray-400' : 'text-gray-600';
  const timeCls  = isDark ? 'text-gray-600' : 'text-gray-400';

  return (
    <div className={`pb-4 mb-4 border-b last:border-0 last:pb-0 last:mb-0 ${divider}`}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {review.username.charAt(0)}
          </div>
          <span className={`text-xs font-semibold ${nameCls}`}>{review.username}</span>
        </div>
        <Stars rating={review.rating} />
      </div>
      <p className="text-xs text-teal-500 mb-1 font-medium truncate">{review.storyTitle}</p>
      <p className={`text-xs leading-relaxed line-clamp-2 ${bodyCls}`}>{review.content}</p>
      <p className={`text-xs mt-1.5 ${timeCls}`}>{review.timeAgo}</p>
    </div>
  );
}

/* ── Updated story row item ── */
function StoryRow({ story, index, isDark }: { story: Story; index: number; isDark: boolean }) {
  const titleCls = isDark ? 'text-white group-hover:text-teal-400' : 'text-gray-900 group-hover:text-teal-600';
  const tagCls   = isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500';
  const timeCls  = isDark ? 'text-gray-600' : 'text-gray-400';

  return (
    <Link href={`/story/${story.slug}`} className="group flex gap-3 items-start p-2.5 rounded-xl hover:bg-teal-500/5 transition-colors">
      <div className="relative w-11 shrink-0 rounded-lg overflow-hidden" style={{ height: '58px' }}>
        <Image src={story.cover} alt={story.title} fill className="object-cover" unoptimized />
      </div>
      <div className="flex-1 min-w-0 py-0.5">
        <h4 className={`text-sm font-semibold leading-tight truncate transition-colors ${titleCls}`}>
          {story.title}
        </h4>
        <p className="text-xs text-teal-500 mt-0.5 font-medium">Chương {story.latestChapter}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs px-1.5 py-0.5 rounded ${tagCls}`}>{story.tags[0]}</span>
          <span className={`text-xs ${timeCls}`}>{UPDATE_TIMES[index % UPDATE_TIMES.length]}</span>
        </div>
      </div>
    </Link>
  );
}

/* ── Main component ── */
interface NewlyUpdatedProps {
  stories: Story[];
  isDark: boolean;
}

export default function NewlyUpdated({ stories, isDark }: NewlyUpdatedProps) {
  const heading    = isDark ? 'text-white' : 'text-gray-900';
  const reviewBox  = isDark ? 'bg-gray-900/60 border-gray-800' : 'bg-white border-gray-200 shadow-sm';
  const viewAllCls = isDark
    ? 'border-gray-700 text-gray-400 hover:text-teal-400 hover:border-teal-500'
    : 'border-gray-200 text-gray-500 hover:text-teal-600 hover:border-teal-400';

  return (
    <section className="py-8">
      <div className="max-w-[1400px] mx-auto px-5">

        {/* Section header */}
        <div className="flex items-center gap-3 mb-5">
          <span className="w-1 h-6 bg-teal-500 rounded-full" />
          <h2 className={`text-lg font-bold ${heading}`}>Truyện Mới Cập Nhật</h2>
        </div>

        {/* 70 / 30 split */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* 70% – story list */}
          <div className="flex-[7]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5">
              {stories.map((story, i) => (
                <StoryRow key={`${story.id}-${i}`} story={story} index={i} isDark={isDark} />
              ))}
            </div>
          </div>

          {/* 30% – reviews */}
          <div className="flex-[3] lg:min-w-[260px]">
            <div className={`rounded-2xl border p-4 ${reviewBox}`}>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h3 className={`text-sm font-bold ${heading}`}>Đánh giá từ độc giả</h3>
              </div>
              {MOCK_REVIEWS.map((r) => (
                <ReviewCard key={r.id} review={r} isDark={isDark} />
              ))}
              <Link
                href="/danh-gia"
                className={`block text-center text-xs font-medium mt-3 py-2 rounded-lg border transition-colors ${viewAllCls}`}
              >
                Xem tất cả đánh giá →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
