"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";

export default function ProductDetailModal({ product, onClose }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white border border-gray-200" onClick={(e) => e.stopPropagation()}>
        <div className="relative aspect-video w-full bg-gray-100">
          {product.image ? (
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">No Image</div>
          )}
          <button onClick={onClose} className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-gray-700 hover:bg-white">✕</button>
        </div>

        <div className="space-y-3 p-5">
          <h2 className="font-display text-xl font-semibold text-gray-900">{product.name}</h2>
          <p className="text-sm text-gray-600">{product.description}</p>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="font-display text-2xl font-bold text-harvest-gold">৳{product.price}</span>
              <span className="ml-1 text-sm text-gray-500">{product.unit}</span>
            </div>
            <span className={`text-xs font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
              {product.stock > 0 ? `Stock: ${product.stock}` : "Out of stock"}
            </span>
          </div>

          <button
            onClick={() => { addItem(product); onClose(); }}
            disabled={product.stock <= 0}
            className="w-full rounded-full bg-harvest-gold px-4 py-3 font-semibold text-forest-950 transition hover:brightness-110 disabled:opacity-40"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}