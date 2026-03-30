'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Story } from '@/lib/types';

/* ── Tabs ── */
const TABS = ['Ngày', 'Tuần', 'Tháng', 'Năm', 'Tất cả'];

/* ── Mock translators ── */
interface Translator {
  id: string;
  name: string;
  level: number;
  points: string;
  storyCount: number;
  rank: number;
}

const TRANSLATORS: Translator[] = [
  { id: '1', name: 'tiểu mại', level: 4, points: '646.7K', storyCount: 39, rank: 1 },
  { id: '2', name: 'Cá Mắm Mới', level: 5, points: '183.2K', storyCount: 10, rank: 2 },
  { id: '3', name: 'Hạt Đậu', level: 10, points: '175.9K', storyCount: 2060, rank: 3 },
  { id: '4', name: 'Bà Bà', level: 25, points: '54.7K', storyCount: 18, rank: 4 },
  { id: '5', name: 'Ngọc Phăng Đào', level: 2, points: '39K', storyCount: 5, rank: 5 },
  { id: '6', name: 'Ashen', level: 3, points: '23.4K', storyCount: 12, rank: 6 },
];

const RANK_COLORS = [
  'bg-amber-400 text-white',   // #1
  'bg-gray-400 text-white',    // #2
  'bg-orange-600 text-white',  // #3
];

/* ── Number formatter ── */
function formatViews(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace('.0', '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace('.0', '')}K`;
  return n.toLocaleString('vi-VN');
}

interface Props {
  stories: Story[];
  isDark: boolean;
}

export default function BangXepHang({ stories, isDark }: Props) {
  const [tab, setTab] = useState('Tất cả');
  const [translatorTab, setTranslatorTab] = useState('Tất cả');

  const heading = isDark ? 'text-white' : 'text-gray-900';
  const cardBg = isDark ? 'bg-gray-900/60 border-gray-800' : 'bg-white border-gray-200 shadow-sm';
  const rowBorder = isDark ? 'border-gray-800' : 'border-gray-100';
  const metaTxt = isDark ? 'text-gray-500' : 'text-gray-400';
  const tagCls = isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500';
  const tabActive = 'bg-teal-500 text-white';
  const tabInactive = isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900';

  const sorted = [...stories].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 7);

  return (
    <section className="py-8">
      <div className="max-w-[1400px] mx-auto px-5">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left: Bảng Xếp Hạng */}
          <div className="flex-1">
            <div className={`rounded-xl border p-5 ${cardBg}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500 text-lg">🏆</span>
                  <h2 className={`text-lg font-bold ${heading}`}>Bảng Xếp Hạng</h2>
                </div>
                <Link href="/bang-xep-hang" className="text-xs text-teal-500 hover:text-teal-600 transition-colors">
                  Tất cả →
                </Link>
              </div>
              <p className={`text-xs mb-4 ${metaTxt}`}>Truyện được đọc nhiều nhất</p>

              {/* Tabs */}
              <div className="flex gap-1 mb-4">
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      tab === t ? tabActive : tabInactive
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* List */}
              <div className="space-y-0">
                {sorted.map((story, i) => (
                  <Link
                    key={story.id}
                    href={`/story/${story.slug}`}
                    className={`flex items-center gap-3 py-3 border-b last:border-0 ${rowBorder} group hover:bg-teal-500/5 transition-colors rounded-lg px-2`}
                  >
                    {/* Rank number */}
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      i < 3 ? RANK_COLORS[i] : isDark ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {i + 1}
                    </span>
                    {/* Cover */}
                    <div className="relative w-10 h-14 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                      <Image src={story.cover} alt={story.title} fill className="object-cover" unoptimized />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-sm font-semibold line-clamp-1 transition-colors ${
                        isDark ? 'text-white group-hover:text-teal-400' : 'text-gray-900 group-hover:text-teal-600'
                      }`}>
                        {story.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        {story.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className={`text-[10px] px-1.5 py-0.5 rounded ${tagCls}`}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    {/* Views */}
                    <div className="text-right shrink-0">
                      <span className={`text-sm font-bold ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
                        {formatViews(story.views ?? 0)}
                      </span>
                      <p className={`text-[10px] ${metaTxt}`}>lượt đọc</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Vinh Danh Dịch Giả */}
          <div className="flex-1">
            <div className={`rounded-xl border p-5 ${cardBg}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-violet-500 text-lg">👑</span>
                <h2 className={`text-lg font-bold ${heading}`}>Vinh Danh Dịch Giả</h2>
              </div>
              <p className={`text-xs mb-4 ${metaTxt}`}>Những dịch giả được yêu thích nhất</p>

              {/* Tabs */}
              <div className="flex gap-1 mb-4">
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTranslatorTab(t)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      translatorTab === t ? tabActive : tabInactive
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Grid 2x3 */}
              <div className="grid grid-cols-2 gap-4">
                {TRANSLATORS.map((tr) => (
                  <div key={tr.id} className={`relative rounded-xl border p-4 text-center ${
                    isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'
                  }`}>
                    {/* TOP badge */}
                    {tr.rank <= 3 && (
                      <span className={`absolute top-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded ${RANK_COLORS[tr.rank - 1]}`}>
                        TOP {tr.rank}
                      </span>
                    )}
                    {tr.rank > 3 && (
                      <span className={`absolute top-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded ${isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>
                        TOP {tr.rank}
                      </span>
                    )}
                    {/* Avatar */}
                    <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-teal-400 to-violet-500 flex items-center justify-center text-white text-xl font-bold mb-2">
                      {tr.name.charAt(0)}
                    </div>
                    <h4 className={`text-sm font-bold ${heading}`}>{tr.name}</h4>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <span className="text-[10px] bg-teal-500/20 text-teal-600 dark:text-teal-400 px-1.5 py-0.5 rounded font-medium">Lv.{tr.level}</span>
                      <span className={`text-[10px] ${metaTxt}`}>✦ {tr.points}</span>
                    </div>
                    <p className={`text-[10px] mt-1 ${metaTxt}`}>📚 {tr.storyCount} truyện</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
