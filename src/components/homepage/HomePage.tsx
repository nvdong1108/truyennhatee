'use client';

import { useState } from 'react';
import { STORIES } from '@/lib/mockData';
import { BANNER_STORIES } from '@/data/bannerStories';
import { Story } from '@/lib/types';
import SiteHeader from '@/components/layout/SiteHeader';
import HeroBanner from './HeroBanner';
import TruyenNoiBat from './TruyenNoiBat';
import TruyenQuangBa from './TruyenQuangBa';
import TruyenMoiCapNhat from './TruyenMoiCapNhat';
import TruyenXuHuong from './TruyenXuHuong';
import BangXepHang from './BangXepHang';
import AppFooter from '@/components/layout/AppFooter';

/** Repeats stories to fill `count` slots, each with a unique id. */
function padStories(source: Story[], count: number): Story[] {
  return Array.from({ length: count }, (_, i) => ({
    ...source[i % source.length],
    id: `${source[i % source.length].id}__pad${i}`,
  }));
}

const FEATURED_STORIES  = padStories(STORIES, 8);
const PROMOTED_STORIES  = padStories([...STORIES].reverse(), 8);
const UPDATED_STORIES   = padStories(STORIES, 10);
const TRENDING_STORIES  = padStories(STORIES, 20);
const RANKING_STORIES   = padStories(STORIES, 10);

export default function HomePage() {
  const [isDark, setIsDark] = useState(false);

  const pageBg  = isDark ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900';

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-300`}>
      <SiteHeader isDark={isDark} onToggleTheme={() => setIsDark((d) => !d)} />

      <HeroBanner stories={BANNER_STORIES} />

      <TruyenNoiBat stories={FEATURED_STORIES} isDark={isDark} />

      <TruyenQuangBa stories={PROMOTED_STORIES} isDark={isDark} />

      <TruyenMoiCapNhat stories={UPDATED_STORIES} isDark={isDark} />

      <TruyenXuHuong stories={TRENDING_STORIES} isDark={isDark} />

      <BangXepHang stories={RANKING_STORIES} isDark={isDark} />

      <AppFooter isDark={isDark} />
    </div>
  );
}
