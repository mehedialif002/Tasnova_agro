"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal — animates its children in when they scroll into view.
 * Uses scroll-position math (not IntersectionObserver) so it works reliably
 * everywhere, including headless/non-compositing contexts.
 *
 * dir: up | down | left | right | zoom | blur (direction it flies in from)
 * delay: ms of stagger
 * once: if false, re-animates every time it re-enters (used for story panels)
 * margin: 0..0.5 — how far into the viewport before it triggers
 */
export default function Reveal({
  as: Tag = "div",
  dir = "up",
  delay = 0,
  once = false,
  margin = 0.16,
  threshold, // accepted for API compatibility; not used by the scroll engine
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    let raf = 0;

    const check = () => {
      ticking = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // trigger once the element is meaningfully into the viewport (fly-in feel),
      // OR whenever it sits fully on screen (so at-rest / snapped content is never
      // left hidden — critical for above-the-fold CTAs).
      const inByMargin = r.top < vh * (1 - margin) && r.bottom > vh * margin;
      const fullyOnScreen = r.top >= -2 && r.bottom <= vh + 2;
      const visible = inByMargin || fullyOnScreen;
      setInView((prev) => {
        if (visible) return true;
        if (!once) return false;
        return prev;
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(check);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Staged initial checks: layout + scroll-snap can settle a few frames
    // after mount, and above-the-fold content gets no scroll event to retrigger.
    check();
    const rafId = requestAnimationFrame(check);
    const t1 = setTimeout(check, 80);
    const t2 = setTimeout(check, 260);
    const t3 = setTimeout(check, 700);
    // web fonts swap in and reflow text after mount — re-check once ready
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(check).catch(() => {});
    }

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [once, margin]);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${dir} ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
