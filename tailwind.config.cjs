/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 18px 70px -30px rgba(15,23,42,0.25)",
        glow: "0 22px 60px -28px rgba(79,70,229,0.45)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
