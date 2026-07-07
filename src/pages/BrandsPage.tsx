// src/pages/BrandsPage.tsx
import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search } from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import { CtaCharacters, FloatingMascot } from "@/components/ui/culture-chars";
import StaggerReveal from "../components/StaggerReveal";

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

type Category = "All" | "Smart Home" | "Audio" | "Mobility" | "Wearables" | "Lifestyle";

type Brand = {
  name: string;
  slug: string;
  tagline: string;
  img: string;
  category: Exclude<Category, "All">;
};

const BRANDS: Brand[] = [
  { name: "Xiaomi", slug: "xiaomi", tagline: "Smart ecosystem & lifestyle tech", img: "/images/brands/xiaomi.jpg", category: "Lifestyle" },
  { name: "Dreame", slug: "dreame", tagline: "Robot vacuums & cleaning tech", img: "/images/brands/dreame.jpg", category: "Smart Home" },
  { name: "70mai", slug: "70mai", tagline: "Dashcams & smart driving", img: "/images/brands/70mai.jpg", category: "Mobility" },
  { name: "Anker", slug: "anker", tagline: "Charging, power & innovation", img: "/images/brands/anker.jpg", category: "Lifestyle" },
  { name: "Soundcore", slug: "soundcore", tagline: "True wireless & speakers", img: "/images/brands/soundcore.jpg", category: "Audio" },
  { name: "Mova", slug: "mova", tagline: "Smart home appliances", img: "/images/brands/mova.jpg", category: "Smart Home" },
  { name: "Wanbo", slug: "wanbo", tagline: "Projectors & home theater", img: "/images/brands/wanbo.jpg", category: "Lifestyle" },
  { name: "Mibro", slug: "mibro", tagline: "Wearables & smartwatches", img: "/images/brands/mibro.jpg", category: "Wearables" },
  { name: "Jimmy", slug: "jimmy", tagline: "Cordless cleaning solutions", img: "/images/brands/jimmy.jpg", category: "Smart Home" },
  { name: "Levoit", slug: "levoit", tagline: "Air purifiers & healthy home", img: "/images/brands/levoit.jpg", category: "Smart Home" },
];

const CATEGORIES: Category[] = ["All", "Smart Home", "Audio", "Mobility", "Wearables", "Lifestyle"];

export default function BrandsPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Category>("All");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BRANDS.filter((b) => (cat === "All" ? true : b.category === cat)).filter((b) =>
      !q ? true : (b.name + b.tagline + b.category).toLowerCase().includes(q)
    );
  }, [query, cat]);

  return (
    <>
      <Helmet>
        <title>Brands · SHD Technology</title>
        <meta name="description" content="SHD's brand partnership matrix — Xiaomi, Dreame, 70mai, Anker and 20+ global consumer-electronics leaders." />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 pt-10 md:pt-16">
          <FloatingMascot src="char-yellow" size="w-12 md:w-16" className="right-[4%] top-20 md:top-24" r="-8deg" dur="5s" />
          <RevealOnScroll>
            <div className="chip-label">{t("pg.brands.chip")}</div>
            <h1 className="mt-6 max-w-4xl font-display text-[2.6rem] font-extrabold leading-[1.03] tracking-tight text-ink md:text-6xl">
              {t("pg.brands.heroPre")} <span className="hl-blue">{t("pg.brands.heroHl")}</span> {t("pg.brands.heroPost")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">{t("pg.brands.heroDesc")}</p>
          </RevealOnScroll>

          {/* search + filters */}
          <RevealOnScroll delay={80}>
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-3 ring-1 ring-ink/10 sm:max-w-md">
                <Search className="h-4 w-4 text-ink/40" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={(t("common.search") as string) || "Search brands"}
                  className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={cx(
                      "rounded-full px-4 py-1.5 text-sm font-semibold transition",
                      cat === c ? "bg-ink text-white" : "bg-white text-ink/65 ring-1 ring-ink/10 hover:text-ink"
                    )}
                  >
                    {(t(`pg.brands.categories.${c}`) as string) || c}
                  </button>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
        <StaggerReveal className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((b) => (
            <Link
              key={b.slug}
              to={`/brands/${b.slug}`}
              className="group block overflow-hidden rounded-3xl bg-white ring-1 ring-ink/[0.07] shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <div className="aspect-[5/4] overflow-hidden bg-paper">
                <img src={b.img} alt={b.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" draggable={false} />
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <div className="font-display text-lg font-extrabold text-ink">{b.name}</div>
                  <div className="text-xs text-ink/50">{b.tagline}</div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-ink/30 transition group-hover:text-brand" />
              </div>
            </Link>
          ))}
        </StaggerReveal>

        {shown.length === 0 && (
          <div className="py-16 text-center text-ink/50">{t("pg.brands.noResults")}</div>
        )}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 pb-16 md:pb-24">
        <RevealOnScroll>
          <div className="relative">
          <CtaCharacters />
          <div className="rounded-[2.5rem] bg-ink px-8 py-14 text-center text-white md:px-16">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight md:text-4xl">
              {t("pg.brands.ctaTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/60">{t("pg.brands.ctaDesc")}</p>
            <div className="mt-8">
              <Link to="/contact" className="btn bg-sun text-ink hover:-translate-y-0.5">
                {t("pg.cta.partner")} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
