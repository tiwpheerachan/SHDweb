/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', '"Noto Sans Thai"', "system-ui", "-apple-system", "sans-serif"],
        display: ['"Archivo"', '"Inter"', '"Noto Sans Thai"', "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#0B0B0F",
          soft: "#16161C",
        },
        brand: {
          DEFAULT: "#3355FF",
          50: "#eef1ff",
          100: "#dee5ff",
          400: "#5b74ff",
          500: "#3355FF",
          600: "#2743e0",
          700: "#1f34bd",
        },
        sun: {
          DEFAULT: "#FFDE2E",
          300: "#ffe867",
          400: "#FFDE2E",
          500: "#f5cf00",
        },
        paper: "#F4F5F7",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 18px 60px -32px rgba(15,23,42,0.28)",
        card: "0 26px 80px -48px rgba(15,23,42,0.30)",
        "card-hover": "0 34px 90px -44px rgba(15,23,42,0.34)",
        brand: "0 24px 70px -34px rgba(51,85,255,0.55)",
      },
      transitionDuration: {
        400: "400ms",
      },
      animation: {
        "float": "shdFloat 7s ease-in-out infinite",
        "float-slow": "shdFloat2 9s ease-in-out infinite",
        "fade-in": "shdFadeIn 0.6s ease forwards",
        "slide-up": "shdSlideInUp 0.7s cubic-bezier(.22,.61,.36,1) forwards",
        "scale-in": "shdScaleIn 0.5s cubic-bezier(.22,.61,.36,1) forwards",
      },
      keyframes: {
        shdFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shdFloat2: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(1deg)" },
        },
        shdFadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shdSlideInUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shdScaleIn: {
          from: { opacity: "0", transform: "scale(0.94)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
