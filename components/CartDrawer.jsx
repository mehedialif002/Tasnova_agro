"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";

export default function CartDrawer({ onClose }) {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalAmount = useCartStore((s) => s.totalAmount());

  return (
    // z-index বাড়িয়ে এবং backdrop-blur দিয়ে পুরো স্ক্রিন কভার করা হয়েছে
    <div className="fixed inset-0 z-[9999] flex justify-end bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        // h-screen এবং সঠিক ব্র্যান্ড কালার (bg-forest-950) ফিরিয়ে আনা হয়েছে
        className="relative flex h-screen w-full max-w-sm flex-col bg-forest-950 border-l border-forest-700/60 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-forest-700/60 p-4">
          <h2 className="font-display text-lg font-semibold text-harvest-cream">
            Your Cart
          </h2>
          <button onClick={onClose} className="p-1 text-harvest-cream/70 hover:text-harvest-cream text-xl">
            ✕
          </button>
        </div>

        {/* Cart Items Box */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-center text-harvest-cream/60 mt-10">Cart is empty</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3 border-b border-forest-700/30 pb-3">
                  {/* Image container */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-forest-800">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] text-harvest-cream/40">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-harvest-cream break-words">
                      {item.name}
                    </p>
                    <p className="text-xs text-harvest-cream/60">
                      ৳{item.price} {item.unit}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="h-6 w-6 flex items-center justify-center shrink-0 rounded-full border border-forest-700/60 text-harvest-cream hover:bg-forest-800 active:scale-95 transition-all"
                      >
                        −
                      </button>
                      <span className="text-sm text-harvest-cream px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="h-6 w-6 flex items-center justify-center shrink-0 rounded-full border border-forest-700/60 text-harvest-cream hover:bg-forest-800 active:scale-95 transition-all"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="ml-auto shrink-0 text-xs text-red-400 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer section */}
        {items.length > 0 && (
          <div className="border-t border-forest-700/60 p-4 space-y-3 bg-forest-950">
            <div className="flex justify-between text-harvest-cream">
              <span>Total</span>
              <span className="font-bold text-harvest-gold">৳{totalAmount}</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full rounded-full bg-harvest-gold px-4 py-3 text-center font-semibold text-forest-950 hover:brightness-110 transition-all"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}