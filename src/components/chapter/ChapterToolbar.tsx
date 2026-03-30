'use client';

import { useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'sepia';

interface ChapterToolbarProps {
  onFontSizeChange?: (delta: number) => void;
  fontSize: number;
}

export default function ChapterToolbar({ onFontSizeChange, fontSize }: ChapterToolbarProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/50">
      {/* Left: tools */}
      <div className="flex items-center gap-1">
        {/* Decrease font */}
        <button
          onClick={() => onFontSizeChange?.(-2)}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          title="Thu nhỏ chữ"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zM8 11h6" />
          </svg>
        </button>

        {/* Font size indicator */}
        <span className="text-xs text-gray-400 dark:text-gray-500 w-8 text-center select-none">{fontSize}</span>

        {/* Increase font */}
        <button
          onClick={() => onFontSizeChange?.(2)}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          title="Phóng to chữ"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zM8 11h6M11 8v6" />
          </svg>
        </button>

        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />

        {/* Heart / Like */}
        <button
          onClick={() => setLiked((l) => !l)}
          className={`p-2 rounded-lg transition-colors ${
            liked
              ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          title="Yêu thích"
        >
          <svg className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        {/* Share */}
        <button
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          title="Chia sẻ"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>

      {/* Right: theme buttons */}
      <div className="flex items-center gap-1">
        <span className="text-xs text-gray-400 dark:text-gray-500 mr-1 hidden sm:inline">Giao diện</span>
        {/* These serve as visual toggles. Full theme switching requires ThemeContext which is outside scope. */}
        <button className="w-7 h-7 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white hover:border-teal-500 transition-colors" title="Sáng" />
        <button className="w-7 h-7 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-gray-800 hover:border-teal-500 transition-colors" title="Tối" />
        <button className="w-7 h-7 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-amber-50 hover:border-teal-500 transition-colors" title="Sepia" />
      </div>
    </div>
  );
}
