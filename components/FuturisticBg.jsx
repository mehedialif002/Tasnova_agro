// Shared fresh-farm backdrop: soft drifting color blobs, a faint "tended
// field" dot texture, and gently floating organic particles (leaves / seeds).
// Purely decorative — sits behind content with pointer-events disabled.

const PARTICLES = [
  { left: "7%", top: "20%", size: 30, delay: "0s", dur: "10s", kind: "leaf" },
  { left: "20%", top: "68%", size: 18, delay: "1.4s", dur: "12s", kind: "seed" },
  { left: "40%", top: "26%", size: 22, delay: "2.2s", dur: "9s", kind: "leaf" },
  { left: "58%", top: "74%", size: 34, delay: "0.6s", dur: "14s", kind: "leaf" },
  { left: "72%", top: "18%", size: 16, delay: "3s", dur: "11s", kind: "seed" },
  { left: "85%", top: "60%", size: 26, delay: "1.1s", dur: "12.5s", kind: "leaf" },
  { left: "92%", top: "36%", size: 20, delay: "2.6s", dur: "10s", kind: "seed" },
  { left: "13%", top: "84%", size: 24, delay: "0.9s", dur: "11s", kind: "leaf" },
];

function ParticleGlyph({ kind }) {
  if (kind === "leaf") {
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full text-grass-400" fill="currentColor">
        <path d="M12 2C7 6 4 11 4 16c0 4 3 6 8 6 0-6 2-11 8-14-3 0-5 1-6 2 0-3 0-6-2-8z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full text-harvest-gold" fill="currentColor">
      <ellipse cx="12" cy="12" rx="5" ry="9" transform="rotate(30 12 12)" />
    </svg>
  );
}

export default function FuturisticBg({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* soft drifting color blobs */}
      <div className="blob left-[-8%] top-[-12%] h-[42vh] w-[42vh] animate-blob bg-grass-300/45" />
      <div className="blob right-[-10%] top-[8%] h-[46vh] w-[46vh] animate-blob2 bg-harvest-gold/30" />
      <div className="blob bottom-[-18%] left-[32%] h-[38vh] w-[38vh] animate-blob bg-lime-400/30" />

      {/* tended-field dot texture */}
      <div className="absolute inset-0 field-grid" />

      {/* floating organic particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="particle animate-float-slow"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        >
          <span className="block h-full w-full animate-float" style={{ animationDelay: p.delay }}>
            <ParticleGlyph kind={p.kind} />
          </span>
        </span>
      ))}
    </div>
  );
}
