'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import UnlockModal from '@/components/UnlockModal';
import ThongTinChiTietTruyen from '@/components/story/ThongTinChiTietTruyen';
import StoryBreadcrumb from '@/components/story/StoryBreadcrumb';
import ChapterListSection from '@/components/story/ChapterListSection';
import { getStoryBySlug } from '@/lib/mockData';

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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <StoryBreadcrumb title={story.title} />

      <ThongTinChiTietTruyen
        story={story}
        user={user}
        isStoryUnlocked={isStoryUnlocked}
        onOpenUnlock={() => setShowUnlockModal(true)}
      />

      <ChapterListSection
        storyId={story.id}
        storySlug={story.slug}
        chapters={story.chapters}
        canReadChapter={canReadChapter}
      />

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
