import Link from 'next/link';

interface CategoryBreadcrumbProps {
  categoryName: string;
}

export default function CategoryBreadcrumb({ categoryName }: CategoryBreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-teal-500 transition-colors"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h3a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h3a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        Trang chủ
      </Link>
      <svg
        className="w-3 h-3"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
      <Link href="/the-loai" className="hover:text-teal-500 transition-colors">
        Thể loại
      </Link>
      <svg
        className="w-3 h-3"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
      <span className="text-gray-700 dark:text-gray-300 font-medium lowercase">
        {categoryName}
      </span>
    </nav>
  );
}
