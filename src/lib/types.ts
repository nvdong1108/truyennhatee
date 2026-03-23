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
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  cover: string;
  description: string;
  tags: string[];
  chapters: Chapter[];
  latestChapter: number;
}
