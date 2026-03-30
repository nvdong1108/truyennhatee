'use client';

import { useState } from 'react';

interface GioiThieuTruyenProps {
  description: string;
}

export default function GioiThieuTruyen({ description }: GioiThieuTruyenProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = description.length > 200;

  return (
    <section className="mb-8">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white mb-4">
        <span className="text-teal-500">📖</span> Giới Thiệu Truyện
      </h2>

      <div className="relative">
        <div
          className={`text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line ${
            !expanded && isLong ? 'max-h-24 overflow-hidden' : ''
          }`}
        >
          {description}
        </div>

        {!expanded && isLong && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
        )}
      </div>

      {isLong && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 text-sm font-medium text-teal-500 hover:text-teal-600 transition-colors"
        >
          {expanded ? 'Thu gọn ↑' : 'Xem thêm →'}
        </button>
      )}
    </section>
  );
}
