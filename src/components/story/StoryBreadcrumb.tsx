import Link from 'next/link';

interface StoryBreadcrumbProps {
  title: string;
  categoryName?: string;
  categoryUrl?: string;
  status?: 'ongoing' | 'completed';
}

export default function StoryBreadcrumb({ title, categoryName, categoryUrl, status }: StoryBreadcrumbProps) {
  const chevron = (
    <svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );

  return (
    <nav className="flex items-center flex-wrap gap-1.5 text-sm mb-6">
      <Link href="/" className="flex items-center gap-1 text-gray-500 hover:text-teal-500 transition-colors">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h3a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h3a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        Trang chủ
      </Link>

      {categoryName && categoryUrl && (
        <>
          {chevron}
          <Link href={categoryUrl} className="text-gray-500 hover:text-teal-500 transition-colors">
            {categoryName}
          </Link>
        </>
      )}

      {status === 'completed' && (
        <>
          {chevron}
          <Link href="/hoan-thanh" className="text-gray-500 hover:text-teal-500 transition-colors">
            Hoàn thành
          </Link>
        </>
      )}

      {chevron}
      <span className="text-teal-600 dark:text-teal-400 font-medium">{title}</span>
    </nav>
  );
}
