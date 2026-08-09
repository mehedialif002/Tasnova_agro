"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import FormattedText from "./FormattedText";
import Reveal from "./Reveal";

// images cycled beside each awareness section
const SIDE_IMAGES = [
  { src: "/products/farm-chicken.jpg", alt: "খামারের মুরগি" },
  { src: "/products/egg.jpg", alt: "খামারের ডিম" },
  { src: "/products/milk.jpg", alt: "খামারের দুধ" },
];

export default function TextSectionsList() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch("/api/text-sections")
      .then((res) => res.json())
      .then((data) => setSections(data.sections || []));
  }, []);

  if (sections.length === 0) return null;

  return (
    <>
      {sections.map((section, i) => {
        const flip = i % 2 === 1; // alternate image side
        const img = SIDE_IMAGES[i % SIDE_IMAGES.length];
        return (
          <section
            key={section.id}
            id={i === 0 ? "why-us" : undefined}
            className="snap-panel grain relative flex min-h-screen w-full items-center overflow-hidden px-6 py-24 md:px-16"
          >
            <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
              {/* image */}
              <Reveal
                dir={flip ? "right" : "left"}
                delay={120}
                className={flip ? "md:order-2" : "md:order-1"}
              >
                <div className="relative mx-auto max-w-md">
                  <div
                    className={`absolute -inset-3 -z-10 rounded-[2.2rem] bg-grass-100/70 ${
                      flip ? "rotate-3" : "-rotate-3"
                    }`}
                  />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] shadow-[0_45px_90px_-35px_rgba(5,46,22,0.55)] ring-1 ring-black/5">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 90vw, 40vw"
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/25 via-transparent to-transparent" />
                  </div>
                </div>
              </Reveal>

              {/* text */}
              <div className={flip ? "md:order-1" : "md:order-2"}>
                <Reveal dir="up" className="kicker mb-6">
                  সচেতনতা / {String(i + 1).padStart(2, "0")}
                </Reveal>
                <Reveal
                  as="h3"
                  dir={flip ? "left" : "right"}
                  delay={120}
                  className="font-display text-3xl font-semibold leading-tight tracking-tight text-forest-950 md:text-5xl"
                >
                  {section.title}
                </Reveal>
                <Reveal
                  dir="up"
                  delay={260}
                  className="mt-6 border-l-2 border-grass-300 pl-6 text-lg leading-relaxed text-forest-800/80"
                >
                  <span className="whitespace-pre-line">
                    <FormattedText text={section.content} />
                  </span>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
