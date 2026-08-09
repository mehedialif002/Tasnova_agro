import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer id="order" className="snap-panel relative flex min-h-screen flex-col justify-center overflow-hidden bg-forest-950 px-5 py-14 md:px-8">
      {/* subtle top accent line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-grass-500 via-lime-400 to-harvest-gold" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[60%] -translate-x-1/2 rounded-full bg-grass-500/15 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand section */}
          <div>
            <h3 className="font-display text-lg font-bold text-harvest-cream">
              {siteConfig.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-harvest-cream/70">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Quick Links section */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-grass-300">
              Quick Links
            </h4>
            <nav className="mt-3 flex flex-col gap-2">
              {siteConfig.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-harvest-cream/70 transition hover:text-grass-300"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact section */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-grass-300">
              Contact
            </h4>
            <div className="mt-3 flex flex-col gap-2">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-grass-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-grass-500"
              >
                💬 WhatsApp-e message korun
              </a>
            </div>
          </div>
        </div>

        <div className="leaf-divider my-8" />

        <p className="text-center text-sm text-harvest-cream/60">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
