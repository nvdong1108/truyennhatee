'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BannerStory } from '@/data/bannerStories';

const INTERVAL = 5000;

const TAG_COLORS = [
  'bg-rose-500/90 text-white',
  'bg-slate-600/80 text-gray-100',
  'bg-cyan-500/90 text-white',
  'bg-violet-500/90 text-white',
  'bg-amber-500/90 text-white',
];

interface HeroBannerProps {
  stories: BannerStory[];
}

/* Icons */
function IcBook() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}
function IcHeart() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}
function IcStar() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
function IcPrev() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}
function IcNext() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function HeroBanner({ stories }: HeroBannerProps) {
  const [current, setCurrent]   = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [tick, setTick]         = useState(0); // key to restart dot progress animation

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setTick((t) => t + 1);
  }, []);

  const next = useCallback(() => goTo((current + 1) % stories.length), [current, goTo, stories.length]);
  const prev = useCallback(() => goTo((current - 1 + stories.length) % stories.length), [current, goTo, stories.length]);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next, isPaused]);

  if (stories.length === 0) return null;
  const story = stories[current];

  return (
    <section
      className="relative w-full overflow-hidden bg-gray-950"
      style={{ height: 'calc(100vh - 62px)', minHeight: '520px', maxHeight: '820px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Keyframe for dot progress ── */}
      <style>{`
        @keyframes dotFill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      {/* ── Background slides (fade) ── */}
      {stories.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image
            src={s.cover}
            alt={s.title}
            fill
            className="object-cover"
            style={{ objectPosition: '65% center' }}
            unoptimized
            priority={i === 0}
            onError={(e) => {
              // Fallback khi ảnh local chưa có — dùng placeholder picsum
              (e.currentTarget as HTMLImageElement).src =
                `https://picsum.photos/seed/${s.id}/1600/900`;
            }}
          />
        </div>
      ))}

      {/* ── Gradients (above images) ── */}
      {/* Left-to-transparent for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent" />
      {/* Bottom vignette */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-950/75 via-transparent to-transparent" />
      {/* Top vignette (mobile header readability) */}
      <div className="absolute top-0 inset-x-0 h-28 z-10 bg-gradient-to-b from-black/25 to-transparent" />

      {/* ── Slide content — bottom-left ── */}
      <div className="absolute inset-x-0 bottom-0 z-20 pb-16 px-6 sm:px-10 lg:px-14">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-[560px]">

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 drop-shadow-xl line-clamp-2">
              {story.title}
            </h2>

            {/* Rating + tags */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="flex items-center gap-1 bg-amber-400 text-gray-900 px-2.5 py-0.5 rounded-full text-sm font-black shadow">
                <IcStar />
                {story.rating.toFixed(1)}
              </span>
              {story.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={tag}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide shadow ${TAG_COLORS[i % TAG_COLORS.length]}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-6 max-w-[460px] drop-shadow">
              {story.description}
            </p>

            {/* CTA buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href={`/story/${story.slug}/chapter/1`}
                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-teal-500/30"
              >
                <IcBook />
                Đọc Ngay
              </Link>
              <button
                type="button"
                className="flex items-center gap-2 border border-white/40 hover:border-white text-white/80 hover:text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors bg-black/20 backdrop-blur-sm"
              >
                <IcHeart />
                Thích truyện
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── Navigation arrows ── */}
      <button
        onClick={prev}
        aria-label="Slide trước"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 hover:bg-teal-500/80 backdrop-blur-sm text-white flex items-center justify-center transition-colors border border-white/15"
      >
        <IcPrev />
      </button>
      <button
        onClick={next}
        aria-label="Slide tiếp"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 hover:bg-teal-500/80 backdrop-blur-sm text-white flex items-center justify-center transition-colors border border-white/15"
      >
        <IcNext />
      </button>

      {/* ── Dot pagination with progress fill ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2 items-center">
        {stories.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`relative overflow-hidden rounded-full transition-all duration-300 ${
              i === current
                ? 'w-8 h-2 bg-white/30'
                : 'w-2 h-2 bg-white/30 hover:bg-white/60'
            }`}
          >
            {i === current && (
              <span
                key={tick}
                className="absolute inset-0 rounded-full origin-left bg-teal-400"
                style={{
                  animationName: 'dotFill',
                  animationDuration: `${INTERVAL}ms`,
                  animationTimingFunction: 'linear',
                  animationFillMode: 'forwards',
                  animationPlayState: isPaused ? 'paused' : 'running',
                }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
