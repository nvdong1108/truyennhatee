import Link from 'next/link';

interface StoryBreadcrumbProps {
  title: string;
}

export default function StoryBreadcrumb({ title }: StoryBreadcrumbProps) {
  return (
    <nav className="text-sm text-gray-500 mb-6">
      <Link href="/" className="hover:text-orange-400 transition-colors">
        Trang chủ
      </Link>
      <span className="mx-2">/</span>
      <span className="text-gray-300">{title}</span>
    </nav>
  );
}
