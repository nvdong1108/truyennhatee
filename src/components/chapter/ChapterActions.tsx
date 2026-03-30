'use client';

export default function ChapterActions() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-6">
      {/* Ủng hộ tác giả */}
      <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-sm shadow-teal-500/20">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Ủng hộ tác giả
      </button>

      {/* Chia sẻ */}
      <button className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Chia sẻ
      </button>

      {/* Báo lỗi */}
      <button className="flex items-center gap-2 border border-amber-300 dark:border-amber-600 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Báo lỗi
      </button>
    </div>
  );
}
