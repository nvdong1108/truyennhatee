'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import UnlockModal from '@/components/UnlockModal';
import StoryBreadcrumb from '@/components/story/StoryBreadcrumb';
import ThongTinChiTietTruyen from '@/components/story/ThongTinChiTietTruyen';
import GioiThieuTruyen from '@/components/story/GioiThieuTruyen';
import ChapterListSection from '@/components/story/ChapterListSection';
import ThongTinNguoiDang from '@/components/story/ThongTinNguoiDang';
import TruyenLienQuan from '@/components/story/TruyenLienQuan';
import BinhLuan from '@/components/story/BinhLuan';
import { getStoryBySlug, STORIES } from '@/lib/mockData';
import { getStoryCategoryById } from '@/data/storyCategories';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function StoryPage({ params }: Props) {
  const { slug } = use(params);
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const { user, canReadChapter } = useAuth();
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const isStoryUnlocked =
    unlocked ||
    (user?.role === 'VIP') ||
    (user?.unlockedStoryIds?.includes(story.id) ?? false);

  const handleUnlockSuccess = () => {
    setUnlocked(true);
    setShowUnlockModal(false);
  };

  const storyCategory = getStoryCategoryById(story.categoryId);

  // Related stories — same category or fallback to all
  const relatedStories = STORIES.filter((s) => s.id !== story.id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
      <StoryBreadcrumb
        title={story.title}
        categoryName={storyCategory?.name}
        categoryUrl={storyCategory?.url}
        status={story.status}
      />

      <ThongTinChiTietTruyen
        story={story}
        user={user}
        isStoryUnlocked={isStoryUnlocked}
        onOpenUnlock={() => setShowUnlockModal(true)}
      />

      <GioiThieuTruyen description={story.description} />

      <ChapterListSection
        storyId={story.id}
        storySlug={story.slug}
        chapters={story.chapters}
        canReadChapter={canReadChapter}
      />

      <ThongTinNguoiDang story={story} />

      <TruyenLienQuan stories={relatedStories} />

      <BinhLuan user={user} />

      {showUnlockModal && (
        <UnlockModal
          storyId={story.id}
          storyTitle={story.title}
          onClose={() => setShowUnlockModal(false)}
          onSuccess={handleUnlockSuccess}
        />
      )}
    </div>
  );
}
