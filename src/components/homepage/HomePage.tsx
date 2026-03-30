'use client';

import { useState } from 'react';
import { STORIES } from '@/lib/mockData';
import { BANNER_STORIES } from '@/data/bannerStories';
import { Story } from '@/lib/types';
import SiteHeader from '@/components/layout/SiteHeader';
import HeroBanner from './HeroBanner';
import StorySlider from './StorySlider';
import NewlyUpdated from './NewlyUpdated';
import AppFooter from '@/components/layout/AppFooter';

/** Repeats stories to fill `count` slots, each with a unique id. */
function padStories(source: Story[], count: number): Story[] {
  return Array.from({ length: count }, (_, i) => ({
    ...source[i % source.length],
    id: `${source[i % source.length].id}__pad${i}`,
  }));
}

const FEATURED_STORIES = padStories(STORIES, 8);
const PROMOTED_STORIES = padStories([...STORIES].reverse(), 8);
const UPDATED_STORIES  = padStories(STORIES, 12);

export default function HomePage() {
  /* Default to light mode to match the reference design */
  const [isDark, setIsDark] = useState(false);

  const pageBg  = isDark ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900';
  const divider = isDark ? 'border-gray-800/50' : 'border-gray-200';

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-300`}>
      <SiteHeader isDark={isDark} onToggleTheme={() => setIsDark((d) => !d)} />

      {/* Hero — no top border, blends into page */}
      <HeroBanner stories={BANNER_STORIES} />

      {/* Truyện Nổi Bật */}
      <div className={`border-t ${divider}`}>
        <StorySlider
          title="Truyện Nổi Bật"
          stories={FEATURED_STORIES}
          viewAllHref="/truyen-noi-bat"
          isDark={isDark}
        />
      </div>

      {/* Truyện Quảng Bá */}
      <div className={`border-t ${divider}`}>
        <StorySlider
          title="Truyện Quảng Bá"
          stories={PROMOTED_STORIES}
          viewAllHref="/truyen-quang-ba"
          isDark={isDark}
        />
      </div>

      {/* Truyện Mới Cập Nhật + Đánh giá thành viên */}
      <div className={`border-t ${divider}`}>
        <NewlyUpdated stories={UPDATED_STORIES} isDark={isDark} />
      </div>

      {/* Footer */}
      <div className={`border-t ${divider}`}>
        <AppFooter isDark={isDark} />
      </div>
    </div>
  );
}
