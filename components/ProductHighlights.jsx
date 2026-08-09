const products = [
  {
    name: "Khamar-fresh Shobji",
    desc: "Prottidin khamar theke tola, kono bishakto rasayon chara.",
  },
  {
    name: "Deshi Murgi o Dim",
    desc: "Free-range, khantite palon kora — bishudhho o posti-samporno.",
  },
  {
    name: "Organic Fol-Mul",
    desc: "Mowshumi fol, gach theke shikri porjonto shorashori.",
  },
];

export default function ProductHighlights() {
  return (
    <section id="products" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <div className="mb-10 max-w-2xl">
        <p className="mb-2 font-body text-sm uppercase tracking-[0.2em] text-harvest-gold">
          Ki paben
        </p>
        <h2 className="font-display text-3xl font-semibold text-harvest-cream md:text-4xl">
          Amader product
        </h2>
      </div>

      <div className="leaf-divider mb-10" />

      <div className="grid gap-6 md:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.name}
            className="rounded-2xl border border-forest-700/60 bg-forest-900/60 p-6 transition hover:border-harvest-gold/60"
          >
            <h3 className="font-display text-xl font-semibold text-harvest-cream">
              {p.name}
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-harvest-cream/70">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
