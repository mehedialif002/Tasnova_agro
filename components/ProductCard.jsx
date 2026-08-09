"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import ProductDetailModal from "./ProductDetailModal";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const [showDetail, setShowDetail] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();

  const handleBuyNow = () => {
    addItem(product);
    router.push("/checkout");
  };

  return (
    <>
      <div className="group flex w-full flex-col overflow-hidden rounded-2xl border border-grass-100 bg-white shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:ring-2 hover:ring-grass-200">
        {/* Image Container */}
        <button
          onClick={() => setShowDetail(true)}
          className="relative aspect-square w-full overflow-hidden bg-grass-50 focus:outline-none"
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-forest-600/40">No Image</div>
          )}
        </button>

        {/* Content Container */}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="line-clamp-1 font-display text-base font-bold text-forest-800">{product.name}</h3>
          <p className="line-clamp-2 text-sm text-forest-600/75">{product.description}</p>

          {/* Price & Action Buttons Group */}
          <div className="mt-auto flex flex-col gap-3 pt-3">
            {/* Price Info */}
            <div className="flex items-baseline gap-1">
              <span className="font-display text-xl font-extrabold text-grass-700">৳{product.price}</span>
              <span className="text-xs text-forest-600/60">/ {product.unit}</span>
            </div>

            {/* Buttons Layout: Mobile a block (vertical), Desktop a inline (horizontal) */}
            <div className="flex flex-col gap-2 xs:flex-row sm:flex-col xl:flex-row">
              <button
                onClick={() => addItem(product)}
                className="w-full rounded-full border-2 border-grass-200 px-3 py-2 text-xs font-bold text-grass-700 transition hover:bg-grass-50 hover:border-grass-500 xl:text-sm"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="btn-shimmer w-full rounded-full bg-grass-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-grass-700 hover:scale-[1.03] xl:text-sm"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDetail && <ProductDetailModal product={product} onClose={() => setShowDetail(false)} />}
    </>
  );
}