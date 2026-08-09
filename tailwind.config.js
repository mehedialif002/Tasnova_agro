/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ---------- Fresh "living farm" palette ----------
        // Airy base tones
        cream: "#FBFDF8", // barely-green paper white — page base
        mint: "#EDF7EE", // soft mint — alternating section wash
        // Vibrant grass greens (brand primary)
        grass: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E", // vivid primary
          600: "#16A34A", // buttons
          700: "#15803D",
        },
        // Deep forest for high-contrast text
        forest: {
          950: "#052E16",
          900: "#0B3D22",
          800: "#14532D", // headings
          700: "#166534",
          600: "#1F7A45",
        },
        lime: {
          400: "#A3E635",
          500: "#84CC16",
        },
        // Warm harvest accents (sun / wheat)
        harvest: {
          amber: "#F59E0B",
          gold: "#FBBF24",
          light: "#FEF3C7",
          cream: "#FEFAF0",
        },
        soil: "#5B4A38",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(20,83,45,0.18)",
        lift: "0 20px 45px -18px rgba(20,83,45,0.28)",
        glow: "0 0 0 4px rgba(34,197,94,0.12)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(10deg)" },
        },
        floatSlow: {
          "0%,100%": { transform: "translateY(0) translateX(0)" },
          "33%": { transform: "translateY(-26px) translateX(14px)" },
          "66%": { transform: "translateY(14px) translateX(-12px)" },
        },
        blob: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(4%,-6%) scale(1.15)" },
        },
        blob2: {
          "0%,100%": { transform: "translate(0,0) scale(1.1)" },
          "50%": { transform: "translate(-6%,5%) scale(0.92)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%,100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.12)", opacity: "0.7" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(26px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollDot: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "40%": { opacity: "1" },
          "80%,100%": { transform: "translateY(14px)", opacity: "0" },
        },
        spinSlow: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "floatSlow 13s ease-in-out infinite",
        blob: "blob 18s ease-in-out infinite",
        blob2: "blob2 22s ease-in-out infinite",
        shimmer: "shimmer 3.5s linear infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 26s linear infinite",
        "scroll-dot": "scrollDot 1.8s ease-in-out infinite",
        "spin-slow": "spinSlow 26s linear infinite",
      },
    },
  },
  plugins: [],
};
