import Image from "next/image";
import Reveal from "./Reveal";

/**
 * A full-screen story panel: a headline whose words fly in from their own
 * directions and settle, paired with a framed image beside it.
 *
 * words: [{ t: "আমরা", dir: "left", accent?: true }]
 * image: { src, alt }
 * imageSide: "left" | "right"
 */
export default function StatementPanel({
  index,
  kicker,
  words = [],
  sub,
  image,
  imageSide = "right",
}) {
  const imgLeft = imageSide === "left";

  const Text = (
    <div className={imgLeft ? "md:order-2" : "md:order-1"}>
      {kicker && (
        <Reveal dir="up" delay={0} className="kicker mb-7">
          {kicker}
        </Reveal>
      )}

      <h2 className="flex flex-wrap gap-x-[0.3em] gap-y-1 font-display text-4xl font-semibold leading-[1.04] tracking-tight md:text-7xl">
        {words.map((w, i) => (
          <Reveal
            as="span"
            key={i}
            dir={w.dir || "up"}
            delay={180 + i * 120}
            className={w.accent ? "accent-word" : ""}
          >
            {w.t}
          </Reveal>
        ))}
      </h2>

      {sub && (
        <Reveal
          dir="up"
          delay={180 + words.length * 120 + 120}
          className="mt-7 max-w-md text-lg leading-relaxed text-forest-800/70 md:text-xl"
        >
          {sub}
        </Reveal>
      )}
    </div>
  );

  const Picture = image ? (
    <Reveal
      dir={imgLeft ? "left" : "right"}
      delay={120}
      className={imgLeft ? "md:order-1" : "md:order-2"}
    >
      <div className="relative mx-auto max-w-md">
        {/* soft accent slab behind the photo */}
        <div
          className={`absolute -inset-3 -z-10 rounded-[2.2rem] bg-grass-100/70 ${
            imgLeft ? "-rotate-3" : "rotate-3"
          }`}
        />
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] shadow-[0_45px_90px_-35px_rgba(5,46,22,0.55)] ring-1 ring-black/5">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 90vw, 40vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/25 via-transparent to-transparent" />
        </div>
      </div>
    </Reveal>
  ) : null;

  return (
    <section
      className="snap-panel grain relative flex min-h-screen w-full items-center overflow-hidden px-6 py-24 md:px-16"
      aria-label={words.map((w) => w.t).join(" ")}
    >
      {index && (
        <span className="ghost-index absolute -top-4 right-2 text-[34vw] font-bold md:right-10 md:text-[22vw]">
          {index}
        </span>
      )}

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
        {Text}
        {Picture}
      </div>
    </section>
  );
}
