export type Role = 'GUEST' | 'MEMBER' | 'VIP';

export interface User {
  userId: string;
  username: string;
  email?: string;
  phone?: string;
  role: Role;
  gems: number;
  unlockedStoryIds: string[];
}

export interface Chapter {
  chapterNumber: number;
  title: string;
  content: string;
  /** ngày đăng chương — ISO string */
  publishedAt?: string;
  /** false = miễn phí (default), true = cần mở khóa */
  locked?: boolean;
}

export interface Story {
  id: string;
  slug: string;
  categoryId: string;
  title: string;
  cover: string;
  description: string;
  tags: string[];
  chapters: Chapter[];
  latestChapter: number;
  /** Tác giả / người đăng */
  author?: string;
  /** Chuyển ngữ */
  translator?: string;
  /** Trạng thái: 'ongoing' | 'completed' */
  status?: 'ongoing' | 'completed';
  /** Rating 1-5 */
  rating?: number;
  /** Tổng đánh giá */
  ratingCount?: number;
  /** Lượt xem */
  views?: number;
  /** Số người theo dõi */
  followers?: number;
  /** Nội dung 18+ */
  isAdult?: boolean;
}

export interface StoryCategory {
  id: string;
  order: number;
  name: string;
  url: string;
  /** Demo count — thay bằng query DB thật sau này */
  count?: number;
}
