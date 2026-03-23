'use client';

import { useState, useMemo } from 'react';
import StoryCard from '@/components/StoryCard';
import { STORIES } from '@/lib/mockData';

export default function HomePage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return STORIES;
    const q = search.toLowerCase();
    return STORIES.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        s.description.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero banner */}
      <div className="relative rounded-2xl overflow-hidden mb-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-700 p-8">
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            📚 Kho Truyện <span className="text-orange-500">Đỉnh Cao</span>
          </h1>
          <p className="text-gray-400 mb-6 max-w-lg">
            Đọc truyện tiên hiệp, võ hiệp, huyền huyễn hấp dẫn nhất. Cập nhật hàng ngày!
          </p>
          {/* Search */}
          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              placeholder="Tìm kiếm truyện..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-500 rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500 transition-colors text-sm"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
              Tìm
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-orange-500/5 to-transparent" />
      </div>

      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">
          {search ? `Kết quả tìm kiếm "${search}"` : '🔥 Truyện Nổi Bật'}
        </h2>
        <span className="text-sm text-gray-500">{filtered.length} truyện</span>
      </div>

      {/* Story grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg">Không tìm thấy truyện nào</p>
          <button onClick={() => setSearch('')} className="mt-4 text-orange-500 hover:text-orange-400 text-sm">
            Xem tất cả truyện
          </button>
        </div>
      )}
    </div>
  );
}
