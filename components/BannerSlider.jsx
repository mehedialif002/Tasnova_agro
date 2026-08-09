"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

// Ei array-e apnar banner images likhun. Chaile prottekta banner-ke
// ekta link-o dite paren (offer page, product page, ityadi).
const banners = [
  { src: "/banners/banner1.jpg", alt: "Offer 1", href: "#order" },
  { src: "/banners/banner2.jpg", alt: "Offer 2", href: "#order" },
  { src: "/banners/banner3.jpg", alt: "Offer 3", href: "#order" },
];

const AUTOPLAY_MS = 4500;

export default function BannerSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (paused || banners.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  const goTo = (i) => setIndex((i + banners.length) % banners.length);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) goTo(index - 1);
    if (diff < -50) goTo(index + 1);
    touchStartX.current = null;
  };

  if (banners.length === 0) return null;

  return (
    <section
      aria-label="Offers"
      className="snap-panel grain relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-6 py-24 md:px-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto mb-10 w-full max-w-6xl">
        <Reveal dir="up" className="kicker mb-4">
          অফার
        </Reveal>
        <Reveal
          as="h2"
          dir="left"
          delay={120}
          className="font-display text-4xl font-semibold tracking-tight text-forest-950 md:text-6xl"
        >
          চলতি মাসের বিশেষ ছাড়
        </Reveal>
      </div>
      <div
        className="mx-auto w-full max-w-6xl group relative overflow-hidden rounded-3xl border border-black/5 bg-white p-1.5 shadow-[0_30px_60px_-25px_rgba(5,46,22,0.35)]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex overflow-hidden rounded-[20px] transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {banners.map((b) => (
            <a // এখানে < চিহ্নটি যোগ করে ঠিক করা হয়েছে
              key={b.src}
              href={b.href}
              className="relative aspect-[16/6] w-full flex-shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.src}
                alt={b.alt}
                className="h-full w-full object-cover"
              />
            </a>
          ))}
        </div>

        {banners.length > 1 && (
          <>
            <button
              onClick={() => goTo(index - 1)}
              aria-label="Previous banner"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-forest-800 shadow-soft ring-1 ring-grass-100 backdrop-blur hover:bg-white hover:text-grass-700"
            >
              ‹
            </button>
            <button
              onClick={() => goTo(index + 1)}
              aria-label="Next banner"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-forest-800 shadow-soft ring-1 ring-grass-100 backdrop-blur hover:bg-white hover:text-grass-700"
            >
              ›
            </button>
          </>
        )}
      </div>

      {banners.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {banners.map((b, i) => (
            <button
              key={b.src}
              onClick={() => goTo(i)}
              aria-label={`Banner ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-grass-600"
                  : "w-2 bg-grass-200 hover:bg-grass-300"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}