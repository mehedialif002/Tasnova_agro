"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return children;
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-forest-950">
      <header className="flex items-center justify-between border-b border-forest-700/60 px-5 py-4 md:px-8">
        <div className="flex items-center gap-6">
          <span className="font-display font-bold text-harvest-cream">Admin Panel</span>
          <nav className="flex gap-4 text-sm">
            <Link href="/admin/dashboard" className="text-harvest-cream/70 hover:text-harvest-gold">Orders</Link>
            <Link href="/admin/products" className="text-harvest-cream/70 hover:text-harvest-gold">Products</Link>
            <Link href="/admin/banners" className="text-harvest-cream/70 hover:text-harvest-gold">Banners</Link>
            <Link href="/admin/text-sections" className="text-harvest-cream/70 hover:text-harvest-gold">Text Sections</Link>
          </nav>
        </div>
        <button onClick={handleLogout} className="rounded-full border border-forest-700/60 px-4 py-1.5 text-sm text-harvest-cream hover:border-harvest-gold">
          Logout
        </button>
      </header>
      <main className="p-5 md:p-8">{children}</main>
    </div>
  );
}