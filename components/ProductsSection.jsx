"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export default function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="products"
      className="snap-panel grain relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-6 py-24 md:px-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal dir="up" className="kicker mb-4">
              তাজা ফসল
            </Reveal>
            <Reveal
              as="h2"
              dir="left"
              delay={120}
              className="font-display text-4xl font-semibold tracking-tight text-forest-950 md:text-6xl"
            >
              আমাদের পণ্য
            </Reveal>
          </div>
          <Reveal
            dir="up"
            delay={220}
            className="max-w-xs text-sm leading-relaxed text-forest-800/60"
          >
            প্রতিটি পণ্য নিজেদের খামারে যত্নে তোলা — অর্ডারের পরই তাজা প্যাক করা হয়।
          </Reveal>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] animate-pulse rounded-2xl bg-black/5"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-forest-800/50">No products available</p>
        ) : (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {products.map((product, i) => (
              <Reveal key={product.id} dir="up" delay={i * 120} threshold={0.15}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
