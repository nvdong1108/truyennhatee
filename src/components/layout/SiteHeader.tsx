'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { STORY_CATEGORIES } from '@/data/storyCategories';

export interface SiteHeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

/* ───────────── Icon atoms ───────────── */
function IcHome() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h3a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h3a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  );
}
function IcCheck() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  );
}
function IcList() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10" />
    </svg>
  );
}
function IcGrid() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}
function IcTrophy() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
}
function IcBell() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}
function IcSearch() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}
function IcSun() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  );
}
function IcMoon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}
function IcChevron() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

/* ───────────── Main component ───────────── */
export default function SiteHeader({ isDark, onToggleTheme }: SiteHeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  const [showGenre, setShowGenre] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef<HTMLDivElement>(null);
  const genreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setShowUserMenu(false);
      if (genreRef.current && !genreRef.current.contains(e.target as Node)) setShowGenre(false);
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  /* ── theme tokens ── */
  const navBg    = isDark ? 'bg-gray-950/95 border-gray-800/70' : 'bg-white/95 border-gray-200';
  const logoColor = isDark ? 'text-white' : 'text-gray-900';
  const iconBtn  = isDark ? 'text-gray-400 hover:text-teal-400 hover:bg-teal-500/10' : 'text-gray-500 hover:text-teal-600 hover:bg-teal-500/10';
  const dropBg   = isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200';
  const dropItem = isDark ? 'text-gray-300 hover:bg-teal-500/10 hover:text-teal-400' : 'text-gray-700 hover:bg-teal-50 hover:text-teal-600';

  const isActive = (href: string) => pathname === href;
  const navLink = (href: string, icon: React.ReactNode, label: string) => {
    const active = isActive(href);
    const base = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors';
    const cls = active
      ? `${base} ${isDark ? 'bg-teal-500/15 text-teal-400' : 'bg-teal-500/10 text-teal-600'}`
      : `${base} ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`;
    return (
      <Link href={href} className={cls}>
        {icon}
        {label}
      </Link>
    );
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${navBg} transition-colors duration-300`}>
      <div className="max-w-[1400px] mx-auto px-5 flex items-center h-[62px] gap-3">

        {/* ── Left nav ── */}
        <nav className="flex items-center gap-0.5 shrink-0">
          {navLink('/', <IcHome />, 'Trang chủ')}
          {navLink('/hoan-thanh', <IcCheck />, 'Hoàn thành')}
          <span className="hidden sm:contents">
            {navLink('/the-loai', <IcList />, 'Thể loại')}
          </span>
        </nav>

        {/* ── Logo center ── */}
        <Link href="/" className="flex-1 flex justify-center items-center select-none">
          <span className={`text-[22px] font-extrabold tracking-tight ${logoColor}`}>
            Truyện<span className="text-teal-500">Nhà</span>Tee
          </span>
        </Link>

        {/* ── Right controls ── */}
        <div className="flex items-center gap-1 shrink-0">

          {/* Genre dropdown */}
          <div className="relative hidden md:block" ref={genreRef}>
            <button
              onClick={() => setShowGenre((s) => !s)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                isDark
                  ? 'border-gray-700 text-gray-300 hover:border-teal-500/60 hover:text-teal-400 bg-gray-900/50'
                  : 'border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-600 bg-gray-50'
              }`}
            >
              <IcGrid />
              Thể loại
              <IcChevron />
            </button>
            {showGenre && (
              <div className={`absolute top-11 left-0 rounded-xl border shadow-xl w-36 py-1 z-50 ${dropBg}`}>
                {STORY_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => { router.push(category.url); setShowGenre(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${dropItem}`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Xếp hạng */}
          <Link
            href="/xep-hang"
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isDark ? 'text-gray-400 hover:text-teal-400 hover:bg-teal-500/10' : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
            }`}
          >
            <IcTrophy />
            Xếp hạng
          </Link>

          {/* Divider */}
          <span className={`hidden md:block w-px h-5 mx-1 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />

          {/* Bell */}
          <button className="p-2 rounded-lg transition-colors text-teal-500 hover:bg-teal-500/10" aria-label="Thông báo">
            <IcBell />
          </button>

          {/* Search */}
          <button
            onClick={() => setShowSearch((s) => !s)}
            className={`p-2 rounded-lg transition-colors ${iconBtn}`}
            aria-label="Tìm kiếm"
          >
            <IcSearch />
          </button>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg transition-colors ${iconBtn}`}
            aria-label="Đổi giao diện"
          >
            {isDark ? <IcSun /> : <IcMoon />}
          </button>

          {/* Auth */}
          {user ? (
            <div className="relative ml-1" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu((s) => !s)}
                className="w-8 h-8 rounded-full bg-teal-500 hover:bg-teal-600 flex items-center justify-center text-white text-sm font-bold transition-colors shadow"
              >
                {user.username.charAt(0).toUpperCase()}
              </button>
              {showUserMenu && (
                <div className={`absolute right-0 top-10 rounded-xl shadow-xl w-44 py-1 border z-50 ${dropBg}`}>
                  <p className="px-4 pt-2 pb-1 text-xs font-semibold text-teal-500 truncate">
                    {user.username}
                  </p>
                  <Link
                    href="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className={`block px-4 py-2.5 text-sm transition-colors ${dropItem}`}
                  >
                    Tài khoản
                  </Link>
                  <button
                    onClick={() => { logout(); setShowUserMenu(false); router.push('/'); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="ml-1 flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors shadow-md shadow-teal-500/25"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Đăng nhập
            </Link>
          )}
        </div>
      </div>

      {/* ── Expandable search bar ── */}
      {showSearch && (
        <div className={`border-t px-5 py-3 transition-colors ${isDark ? 'border-gray-800 bg-gray-950' : 'border-gray-100 bg-gray-50'}`}>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm truyện, tác giả..."
              className={`flex-1 border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-500 transition-colors ${
                isDark
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              Tìm
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
