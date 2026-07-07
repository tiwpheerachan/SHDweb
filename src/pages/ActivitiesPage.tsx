import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy, Users, Flag } from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import { CtaCharacters, FloatingMascot } from "@/components/ui/culture-chars";
import Carousel from "../components/Carousel";

const GALLERY_IMGS = [
  "/images/brands/promos/promo-1.jpg",
  "/images/about/achievements.jpg",
  "/images/brands/promos/promo-2.jpg",
  "/images/about/regions.jpg",
  "/images/brands/promos/promo-3.jpg",
  "/images/brands/promos/promo-4.jpg",
];

export default function ActivitiesPage() {
  const { t } = useTranslation();
  const arr = <T,>(k: string) => (t(k, { returnObjects: true }) as T[]) || [];
  const blocks = arr<{ title: string; desc: string }>("pg.activities.blocks");
  const captions = arr<string>("pg.activities.gallery");
  const stats = arr<{ k: string; v: string }>("pg.activities.stats");
  const gallery = GALLERY_IMGS.map((img, i) => ({ img, caption: captions[i] || "" }));

  return (
    <>
      <Helmet>
        <title>Activities · SHD Technology</title>
        <meta name="description" content="Life at SHD Technology — culture, milestones and the moments that shape our team." />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 pt-10 md:pt-16">
          <FloatingMascot src="char-yellow" size="w-12 md:w-16" className="right-[4%] top-20 md:top-24" r="9deg" dur="4.9s" />
          <RevealOnScroll>
            <div className="chip-label">{t("pg.activities.chip")}</div>
            <h1 className="mt-6 max-w-3xl font-display text-[2.6rem] font-extrabold leading-[1.03] tracking-tight text-ink md:text-6xl">
              {t("pg.activities.heroPre")} <span className="hl-blue">{t("pg.activities.heroHl")}</span>{t("pg.activities.heroPost")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">{t("pg.activities.heroDesc")}</p>
          </RevealOnScroll>
        </div>
      </section>

      {/* MOMENTS GALLERY (auto-slider) */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
        <RevealOnScroll>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink md:text-4xl">
              {t("pg.activities.momentsPre")} <span className="hl">{t("pg.activities.momentsHl")}</span>
            </h2>
            <div className="hidden text-sm font-medium text-ink/40 md:block">{t("pg.activities.autoScroll")}</div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={80}>
          <Carousel className="mt-8" autoPlayMs={4200}>
            {gallery.map((g, i) => (
              <figure
                key={i}
                data-card
                className="group relative w-[85%] shrink-0 snap-start overflow-hidden rounded-4xl bg-ink sm:w-[62%] lg:w-[46%]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={g.img}
                    alt={g.caption}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                    draggable={false}
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 font-display text-lg font-bold text-white">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </Carousel>
        </RevealOnScroll>
      </section>

      {/* BLOCKS */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-14 md:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {blocks.map((b, i) => {
            const Icon = [Users, Trophy, Flag][i % 3];
            return (
              <RevealOnScroll key={i} delay={i * 80}>
                <div className="card h-full p-7">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mt-5 font-display text-lg font-extrabold text-ink">{b.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{b.desc}</p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        <RevealOnScroll delay={120}>
          <div className="mt-5 rounded-4xl bg-brand p-8 text-white md:p-10">
            <div className="grid gap-6 md:grid-cols-3">
              {stats.map((s) => (
                <div key={s.k}>
                  <div className="font-display text-4xl font-extrabold text-sun">{s.k}</div>
                  <div className="mt-1 text-sm text-white/70">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={160}>
          <div className="mt-8 text-center">
            <Link to="/careers" className="btn-primary">
              {t("pg.cta.joinTeam")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
