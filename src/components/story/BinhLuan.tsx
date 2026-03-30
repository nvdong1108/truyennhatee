import Link from 'next/link';
import type { User } from '@/lib/types';

interface BinhLuanProps {
  user: User | null;
}

export default function BinhLuan({ user }: BinhLuanProps) {
  return (
    <section>
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white mb-4">
        <span className="text-teal-500">💬</span> Bình Luận
        <span className="text-sm font-normal text-gray-400">(0)</span>
      </h2>

      {/* Comment box */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 p-5 mb-6">
        {user ? (
          <div>
            <textarea
              placeholder="Viết bình luận..."
              rows={3}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 p-3 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30 resize-none transition-all"
            />
            <div className="flex justify-end mt-2">
              <button className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
                Gửi bình luận
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-2">
            Vui lòng{' '}
            <Link href="/login" className="text-teal-500 hover:text-teal-600 font-medium underline underline-offset-2">
              đăng nhập
            </Link>{' '}
            để bình luận
          </p>
        )}
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center py-10 text-gray-400">
        <svg className="w-12 h-12 mb-3 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
        </p>
      </div>
    </section>
  );
}
