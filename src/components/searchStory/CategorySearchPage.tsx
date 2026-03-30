'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { Story, StoryCategory } from '@/lib/types';
import { STORY_CATEGORIES } from '@/data/storyCategories';
import CategoryBreadcrumb from './CategoryBreadcrumb';
import CategoryStoryCard from './CategoryStoryCard';

const SORT_OPTIONS = [
  { value: 'latest',   label: 'Mới nhất' },
  { value: 'oldest',   label: 'Cũ nhất' },
  { value: 'chapters', label: 'Nhiều chương nhất' },
  { value: 'alpha',    label: 'A → Z' },
];

const PAGE_SIZE = 24;

interface CategorySearchPageProps {
  category: StoryCategory;
  stories: Story[];
}

export default function CategorySearchPage({ category, stories }: CategorySearchPageProps) {
  const router = useRouter();
  const [sortBy, setSortBy]               = useState('latest');
  const [page, setPage]                   = useState(1);
  const [genreSearch, setGenreSearch]     = useState('');
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

  /* ── Sort ── */
  const sorted = useMemo(() => {
    const copy = [...stories];
    if (sortBy === 'oldest')   return copy.reverse();
    if (sortBy === 'chapters') return copy.sort((a, b) => b.latestChapter - a.latestChapter);
    if (sortBy === 'alpha')    return copy.sort((a, b) => a.title.localeCompare(b.title, 'vi'));
    return copy;
  }, [stories, sortBy]);

  /* ── Pagination ── */
  const total      = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const paged      = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const displayStart = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const displayEnd   = Math.min(page * PAGE_SIZE, total);

  /* ── Genre search ── */
  const filteredCategories = STORY_CATEGORIES.filter(
    (cat) =>
      cat.id !== category.id &&
      cat.name.toLowerCase().includes(genreSearch.toLowerCase()),
  );

  const handleGenreSelect = (cat: StoryCategory) => {
    router.push(cat.url);
    setGenreSearch('');
    setShowGenreDropdown(false);
  };

  /* ── Pagination range ── */
  const pageRange = (() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
    if (page >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', page - 1, page, page + 1, '...', totalPages];
  })();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <CategoryBreadcrumb categoryName={category.name} />

      {/* ── Category header ── */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center shrink-0 shadow-md shadow-teal-500/25">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Truyện {category.name}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {(category.count ?? total).toLocaleString('vi-VN')} truyện trong thể loại này
          </p>
        </div>
      </div>

      {/* ── Genre search bar ── */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          value={genreSearch}
          onChange={(e) => { setGenreSearch(e.target.value); setShowGenreDropdown(true); }}
          onFocus={() => setShowGenreDropdown(true)}
          onBlur={() => setTimeout(() => setShowGenreDropdown(false), 150)}
          placeholder="Tìm thể loại khác..."
          className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all"
        />

        {/* Dropdown results */}
        {showGenreDropdown && (genreSearch || filteredCategories.length > 0) && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-30 overflow-hidden">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <button
                  key={cat.id}
                  onMouseDown={() => handleGenreSelect(cat)}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center justify-between"
                >
                  <span>{cat.name}</span>
                  {cat.count && (
                    <span className="text-xs text-gray-400">
                      {cat.count.toLocaleString('vi-VN')} truyện
                    </span>
                  )}
                </button>
              ))
            ) : (
              <p className="px-4 py-3 text-sm text-gray-400">Không tìm thấy thể loại phù hợp</p>
            )}
          </div>
        )}
      </div>

      {/* ── Sort + count toolbar ── */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="w-1 h-4 bg-teal-500 rounded-full" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sắp xếp</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
              className="appearance-none pl-3 pr-8 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:border-teal-400 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Hiển thị{' '}
          <span className="font-semibold text-gray-700 dark:text-gray-200">{displayStart}–{displayEnd}</span>
          {' '}/ {' '}
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            {(category.count ?? total).toLocaleString('vi-VN')}
          </span>{' '}
          truyện
        </p>
      </div>

      {/* ── Story grid ── */}
      {paged.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-6">
          {paged.map((story) => (
            <CategoryStoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-gray-400 text-sm">Chưa có truyện nào trong thể loại này.</p>
          <a href="/the-loai" className="mt-3 inline-block text-sm text-teal-500 hover:underline">
            ← Xem tất cả thể loại
          </a>
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-10 flex-wrap">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-teal-400 hover:text-teal-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Trước
          </button>

          {pageRange.map((item, idx) =>
            item === '...' ? (
              <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 text-sm">…</span>
            ) : (
              <button
                key={item}
                onClick={() => setPage(Number(item))}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors border ${
                  page === item
                    ? 'bg-teal-500 border-teal-500 text-white shadow-sm shadow-teal-500/30'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-teal-400 hover:text-teal-500'
                }`}
              >
                {item}
              </button>
            ),
          )}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-teal-400 hover:text-teal-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Sau →
          </button>
        </div>
      )}
    </div>
  );
}
