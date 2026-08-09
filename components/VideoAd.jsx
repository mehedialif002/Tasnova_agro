"use client";

import { useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import Reveal from "./Reveal";

export default function VideoAd() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      id="top"
      className="snap-panel relative flex min-h-screen w-full items-center overflow-hidden bg-forest-950"
    >
      {/* full-bleed film */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/ads/ad.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* cinematic scrims */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-950/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-forest-950/40" />

      {/* copy */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-16">
        <div className="max-w-2xl">
          <Reveal dir="up" delay={100} className="kicker !text-[color:#c9e8d3] mb-7">
            {siteConfig.name}
          </Reveal>

          <h1 className="font-display text-[2.7rem] font-semibold leading-[1.05] tracking-tight text-[color:var(--paper)] md:text-7xl">
            <Reveal as="span" dir="left" delay={200} className="block">
              খামারের বিশুদ্ধতা,
            </Reveal>
            <Reveal as="span" dir="right" delay={340} className="block">
              সরাসরি আপনার{" "}
              <span className="text-[color:#9fe0b8]">রান্নাঘরে।</span>
            </Reveal>
          </h1>

          <Reveal
            dir="up"
            delay={520}
            className="mt-7 max-w-xl text-base leading-relaxed text-[color:var(--paper)]/75 md:text-lg"
          >
            {siteConfig.tagline}
          </Reveal>

          <Reveal dir="up" delay={660} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#products"
              className="btn-shimmer rounded-full bg-[color:var(--paper)] px-8 py-3.5 font-body text-sm font-bold text-forest-950 transition hover:scale-[1.03]"
            >
              পণ্য দেখুন
            </a>
            <a
              href="#order"
              className="rounded-full border border-[color:var(--paper)]/40 px-8 py-3.5 font-body text-sm font-semibold text-[color:var(--paper)] transition hover:border-[color:var(--paper)]"
            >
              অর্ডার করুন
            </a>
          </Reveal>
        </div>
      </div>

      {/* play / pause */}
      <button
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute bottom-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20"
      >
        {playing ? (
          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
            <rect x="3" y="2" width="4" height="12" />
            <rect x="9" y="2" width="4" height="12" />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
            <polygon points="4,2 14,8 4,14" />
          </svg>
        )}
      </button>

      {/* scroll cue */}
      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[color:var(--paper)]/70">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em]">
          স্ক্রল করুন
        </span>
        <span className="animate-bob text-lg leading-none">↓</span>
      </div>
    </section>
  );
}
