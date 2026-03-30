/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', '"Noto Sans Thai"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: "0 18px 70px -30px rgba(15,23,42,0.25)",
        glow: "0 22px 60px -28px rgba(79,70,229,0.45)",
        "card-hover": "0 32px 90px -30px rgba(15,23,42,0.28), 0 0 0 1px rgba(15,23,42,0.04)",
        "glow-brand": "0 0 30px rgba(79,70,229,0.15), 0 0 60px rgba(79,70,229,0.06)",
      },
      transitionDuration: {
        400: "400ms",
      },
      animation: {
        "float": "shdFloat 6s ease-in-out infinite",
        "float-slow": "shdFloat2 8s ease-in-out infinite",
        "pulse-soft": "shdPulse 4s ease-in-out infinite",
        "shimmer": "shdShimmer 3s linear infinite",
        "slide-up": "shdSlideInUp 0.7s cubic-bezier(.22,.61,.36,1) forwards",
        "slide-left": "shdSlideInLeft 0.7s cubic-bezier(.22,.61,.36,1) forwards",
        "slide-right": "shdSlideInRight 0.7s cubic-bezier(.22,.61,.36,1) forwards",
        "fade-in": "shdFadeIn 0.6s ease forwards",
        "scale-in": "shdScaleIn 0.5s cubic-bezier(.22,.61,.36,1) forwards",
        "bounce-in": "shdBounceIn 0.6s cubic-bezier(.22,.61,.36,1) forwards",
        "glow": "shdGlow 3s ease-in-out infinite",
        "spin-slow": "shdRotate 12s linear infinite",
        "grad-border": "shdGradBorder 6s ease infinite",
      },
      keyframes: {
        shdFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shdFloat2: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(-8px) rotate(1deg)" },
          "66%": { transform: "translateY(-4px) rotate(-0.5deg)" },
        },
        shdPulse: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        shdSlideInUp: {
          from: { opacity: "0", transform: "translateY(32px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shdSlideInLeft: {
          from: { opacity: "0", transform: "translateX(-32px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        shdSlideInRight: {
          from: { opacity: "0", transform: "translateX(32px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        shdFadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shdScaleIn: {
          from: { opacity: "0", transform: "scale(0.92)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shdShimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        shdBounceIn: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          "70%": { transform: "scale(0.97)" },
          "100%": { transform: "scale(1)" },
        },
        shdGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(79,70,229,0), 0 0 40px rgba(79,70,229,0)" },
          "50%": { boxShadow: "0 0 20px rgba(79,70,229,.15), 0 0 60px rgba(79,70,229,.08)" },
        },
        shdRotate: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        shdGradBorder: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};
