interface AppFooterProps {
  isDark?: boolean;
}

const READER_LINKS = [
  { label: 'Thể loại', href: '/the-loai' },
  { label: 'Bảng xếp hạng', href: '/xep-hang' },
  { label: 'Tìm kiếm', href: '/search' },
  { label: 'Tủ truyện', href: '/thu-vien' },
  { label: 'Lịch sử đọc', href: '/lich-su-doc' },
  { label: 'Thông báo', href: '/thong-bao' },
];

const AUTHOR_LINKS = [
  { label: 'Đăng truyện mới', href: '/form-dang-truyen' },
  { label: 'Quản lý truyện', href: '/quan-ly-truyen' },
  { label: 'Doanh thu', href: '/doanh-thu' },
  { label: 'Quảng bá', href: '/quang-ba' },
  { label: 'Hướng dẫn', href: '/huong-dan' },
];

import Link from 'next/link';

export default function AppFooter({ isDark = false }: AppFooterProps) {
  const bg      = isDark ? 'bg-gray-950 text-gray-400' : 'bg-gray-50 text-gray-500';
  const border  = isDark ? 'border-gray-800' : 'border-gray-200';
  const title   = isDark ? 'text-gray-200' : 'text-gray-800';
  const link    = isDark
    ? 'text-gray-400 hover:text-teal-400 transition-colors'
    : 'text-gray-500 hover:text-teal-600 transition-colors';
  const social  = isDark
    ? 'w-8 h-8 rounded-full bg-gray-800 hover:bg-teal-500/20 flex items-center justify-center text-gray-400 hover:text-teal-400 transition-colors'
    : 'w-8 h-8 rounded-full bg-gray-200 hover:bg-teal-100 flex items-center justify-center text-gray-500 hover:text-teal-600 transition-colors';
  const bottomBg = isDark ? 'bg-gray-900/60 border-gray-800' : 'bg-white border-gray-200';

  return (
    <footer className={`${bg}`}>
      {/* ── Main columns ── */}
      <div className={`max-w-[1400px] mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b ${border}`}>

        {/* Brand */}
        <div className="lg:col-span-2">
          <Link href="/" className={`inline-block text-xl font-extrabold tracking-tight mb-3 ${title}`}>
            Truyện<span className="text-teal-500">Nhà</span>Tee
          </Link>
          <p className="text-sm leading-relaxed mb-4 max-w-sm">
            Nền tảng đọc truyện online, tối ưu trải nghiệm đọc và cộng đồng tác giả.
          </p>
          {/* Contact */}
          <a
            href="mailto:truyennhatee@gmail.com"
            className={`flex items-center gap-2 text-sm mb-4 w-fit ${link}`}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            truyennhatee@gmail.com
          </a>
          {/* Social */}
          <div className="flex items-center gap-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={social}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={social}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Độc giả */}
        <div>
          <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${title}`}>Độc Giả</h3>
          <ul className="space-y-2.5">
            {READER_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={`text-sm ${link}`}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Tác giả */}
        <div>
          <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${title}`}>Tác Giả</h3>
          <ul className="space-y-2.5">
            {AUTHOR_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={`text-sm ${link}`}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className={`border-t ${bottomBg}`}>
        <div className="max-w-[1400px] mx-auto px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
            <span>© 2026 TruyệnNhàTee.</span>
            <span className="hidden sm:inline text-gray-400">•</span>
            <a href="/lien-he" className={link}>Liên hệ</a>
            <span className="text-gray-400">•</span>
            <a href="/phan-hoi" className={link}>Phản hồi</a>
          </div>
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
            <a href="/huong-dan" className={link}>Điều khoản</a>
            <span className="text-gray-400">•</span>
            <a href="/chinh-sach-bao-mat" className={link}>Bảo mật</a>
            <span className="text-gray-400">•</span>
            <a href="/huong-dan" className={link}>Quy định</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
