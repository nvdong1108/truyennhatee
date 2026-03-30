import Link from 'next/link';
import type { Metadata } from 'next';
import { STORY_CATEGORIES } from '@/data/storyCategories';

export const metadata: Metadata = {
  title: 'Thể loại truyện - TruyệnNhàTee',
  description: 'Khám phá tất cả thể loại truyện: tu tiên, ngôn tình, kiếm hiệp, đô thị...',
};

const GENRE_ICONS: Record<string, string> = {
  'tu-tien':     '✨',
  'dau-khi':     '⚡',
  'than-dao':    '🌟',
  'huyen-huyen': '🔮',
  'vo-thuat':    '⚔️',
  'kiem-hiep':   '🗡️',
  'ngon-tinh':   '💕',
  'do-thi':      '🏙️',
};

export default function TheLoaiPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
          Tất cả thể loại
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {STORY_CATEGORIES.length} thể loại · Chọn thể loại để đọc truyện
        </p>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {STORY_CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={category.url}
            className="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/40 hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-md hover:shadow-teal-500/10 transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-xl shrink-0 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50 transition-colors">
              {GENRE_ICONS[category.id] ?? '📚'}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-gray-800 dark:text-gray-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors truncate">
                {category.name}
              </p>
              {category.count != null && (
                <p className="text-xs text-gray-400 mt-0.5">
                  {category.count.toLocaleString('vi-VN')} truyện
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Table view */}
      <div className="mt-10">
        <h2 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Danh sách chi tiết
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 text-sm">
          <table className="w-full min-w-[480px]">
            <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400">
              <tr>
                <th className="text-left px-4 py-3 font-semibold w-14">STT</th>
                <th className="text-left px-4 py-3 font-semibold">Tên thể loại</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Số truyện</th>
                <th className="text-left px-4 py-3 font-semibold">URL</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-transparent divide-y divide-gray-100 dark:divide-gray-700/60">
              {STORY_CATEGORIES.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{category.order}</td>
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100">
                    {GENRE_ICONS[category.id]} {category.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                    {category.count != null ? category.count.toLocaleString('vi-VN') : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={category.url}
                      className="text-teal-600 dark:text-teal-400 hover:text-teal-500 underline underline-offset-2 text-xs"
                    >
                      {category.url}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
