"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "./CartDrawer";

export default function CartButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => setMounted(true), []);

  return (
    <>
      <button onClick={() => setOpen(true)} className="relative rounded-full border-2 border-grass-200 bg-white p-2 text-forest-800 transition hover:border-grass-500" aria-label="Open cart">
        🛒
        {mounted && totalItems > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-grass-600 text-xs font-bold text-white">
            {totalItems}
          </span>
        )}
      </button>

      {open && <CartDrawer onClose={() => setOpen(false)} />}
    </>
  );
}