import Image from "next/image";
import CartButton from "./CartButton";
import { siteConfig } from "@/lib/site-config";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-grass-100 bg-cream/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:px-6">
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt={`${siteConfig.name} logo`}
            width={64}
            height={64}
            className="rounded-full object-cover ring-2 ring-grass-200"
            priority
          />
          <span className="font-display text-lg font-bold tracking-wide text-forest-800">
            {siteConfig.name}
          </span>
        </a>

        <nav className="hidden gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative font-body text-sm font-semibold text-forest-700 transition hover:text-grass-600 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-grass-500 after:transition-all hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CartButton />
          <a
            href="#order"
            className="btn-shimmer rounded-full bg-grass-600 px-4 py-2 font-body text-sm font-bold text-white shadow-soft transition hover:bg-grass-700 hover:scale-[1.03]"
          >
            Order Now
          </a>
        </div>
      </div>
    </header>
  );
}