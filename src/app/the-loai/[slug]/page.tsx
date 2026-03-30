import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Story } from '@/lib/types';
import { STORY_CATEGORIES } from '@/data/storyCategories';
import { STORIES } from '@/lib/mockData';
import CategorySearchPage from '@/components/searchStory/CategorySearchPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = STORY_CATEGORIES.find((cat) => cat.id === slug);
  if (!category) return {};
  return {
    title: `Truyện ${category.name} - TruyệnNhàTee`,
    description: `Đọc truyện ${category.name} hay nhất tại TruyệnNhàTee`,
  };
}

/** Pad stories to fill the grid nicely for demo. */
function padStories(source: Story[], count: number): Story[] {
  if (source.length === 0) return [];
  return Array.from({ length: count }, (_, i) => ({
    ...source[i % source.length],
    id: `${source[i % source.length].id}__pad${i}`,
  }));
}

export default async function TheLoaiSlugPage({ params }: Props) {
  const { slug } = await params;
  const category = STORY_CATEGORIES.find((cat) => cat.id === slug);
  if (!category) notFound();

  const realStories = STORIES.filter((story) => story.categoryId === category.id);

  // Pad to 48 items for demo grid display — replace with real DB query later
  const stories = realStories.length > 0
    ? padStories(realStories, 48)
    : padStories(STORIES, 48);

  return <CategorySearchPage category={category} stories={stories} />;
}
