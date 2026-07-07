// src/pages/AboutPage.tsx
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Eye, HeartHandshake, ShieldCheck, Repeat, Leaf } from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import { CtaCharacters, FloatingMascot } from "@/components/ui/culture-chars";

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

const TIMELINE_META = [
  { year: "2013–2014", tone: "sun" },
  { year: "2016", tone: "brand" },
  { year: "2018", tone: "brand" },
  { year: "2019", tone: "brand" },
  { year: "2020", tone: "brand" },
  { year: "2021", tone: "ink" },
  { year: "2022–2023", tone: "ink" },
  { year: "2024", tone: "ink" },
  { year: "2025", tone: "ink" },
  { year: "Future", tone: "brand" },
];

const VALUE_ICONS = [HeartHandshake, ShieldCheck, Repeat, Leaf];
const FOUNDATION_IMGS = ["/images/deck/foundation-1.jpg", "/images/deck/foundation-2.jpg", "/images/deck/foundation-3.jpg"];

export default function AboutPage() {
  const { t } = useTranslation();
  const arr = <T,>(k: string) => (t(k, { returnObjects: true }) as T[]) || [];

  const foundation = arr<{ title: string; sub: string }>("pg.about.foundation");
  const values = arr<{ title: string; desc: string }>("pg.about.values");
  const timeline = arr<{ title: string; desc: string }>("pg.about.timeline");

  return (
    <>
      <Helmet>
        <title>About · SHD Technology</title>
        <meta name="description" content={t("pg.about.heroDesc") as string} />
      </Helmet>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 pt-10 md:pt-16 pb-4">
          <FloatingMascot src="char-green" size="w-12 md:w-16" className="right-[4%] top-20 md:top-24" r="9deg" dur="4.8s" />
          <RevealOnScroll>
            <div className="chip-label">{t("pg.about.chip")}</div>
            <h1 className="mt-6 max-w-4xl font-display text-[2.6rem] font-extrabold leading-[1.03] tracking-tight text-ink md:text-6xl">
              {t("pg.about.heroPre")} <span className="hl">{t("pg.about.heroHl")}</span> {t("pg.about.heroPost")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">{t("pg.about.heroDesc")}</p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ INTRODUCTION ============ */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.15fr_.85fr] md:items-start">
          <RevealOnScroll>
            <div className="space-y-5 text-base leading-relaxed text-ink/70">
              <p>{t("pg.about.intro1")}</p>
              <p>{t("pg.about.intro2")}</p>
              <p>{t("pg.about.intro3")}</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-4xl">
                <img src="/images/deck/intro-skyline.jpg" alt="Shenzhen skyline" className="h-44 w-full object-cover" draggable={false} />
              </div>
              <div className="rounded-4xl bg-brand p-6 text-white shadow-brand">
                <div className="font-display text-4xl font-extrabold">1,000+</div>
                <div className="mt-1 text-sm text-white/70">{t("pg.about.statStores")}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-4xl bg-sun p-6 text-ink">
                  <div className="font-display text-3xl font-extrabold">20+</div>
                  <div className="mt-1 text-xs font-semibold">{t("pg.about.statBrands")}</div>
                </div>
                <div className="rounded-4xl bg-ink p-6 text-white">
                  <div className="font-display text-3xl font-extrabold">TOP 1</div>
                  <div className="mt-1 text-xs font-semibold text-white/70">{t("pg.about.statTop1")}</div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ COMPANY FOUNDATION (S/H/D) ============ */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
          <RevealOnScroll>
            <h2 className="max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
              {t("pg.about.foundationPre")} <span className="hl">{t("pg.about.foundationHl")}</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base text-ink/60">{t("pg.about.foundationDesc")}</p>
          </RevealOnScroll>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {foundation.map((c, i) => (
              <RevealOnScroll key={i} delay={i * 90}>
                <div className="group relative h-[440px] overflow-hidden rounded-4xl bg-ink">
                  <img src={FOUNDATION_IMGS[i]} alt={c.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" draggable={false} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                  <div className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white font-display text-lg font-extrabold text-ink">
                    {i + 1}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <div className="font-display text-xl font-extrabold leading-snug">{c.title}</div>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{c.sub}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MISSION & VISION ============ */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
        <RevealOnScroll>
          <div className="chip-label">{t("pg.about.culture")}</div>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
            {t("pg.about.mvPre")} <span className="hl-blue">{t("pg.about.mvMission")}</span> {t("pg.about.mvAnd")} <span className="hl">{t("pg.about.mvVision")}</span>
          </h2>
        </RevealOnScroll>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <RevealOnScroll>
            <div className="flex h-full flex-col justify-between rounded-4xl bg-brand p-8 text-white md:p-10">
              <Sparkles className="h-8 w-8 text-sun" />
              <div className="mt-10">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">{t("pg.about.missionLabel")}</div>
                <div className="mt-3 font-display text-2xl font-extrabold leading-snug md:text-3xl">{t("pg.about.mission")}</div>
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <div className="flex h-full flex-col justify-between rounded-4xl bg-sun p-8 text-ink md:p-10">
              <Eye className="h-8 w-8" />
              <div className="mt-10">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-ink/50">{t("pg.about.visionLabel")}</div>
                <div className="mt-3 font-display text-2xl font-extrabold leading-snug md:text-3xl">{t("pg.about.vision")}</div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Values — aerial team photo with values overlay */}
        <RevealOnScroll>
          <div className="relative mt-5 overflow-hidden rounded-4xl bg-ink">
            <img src="/images/deck/values-team.jpg" alt="SHD team — setting sail together" className="h-full w-full object-cover" draggable={false} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-12">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">{t("pg.about.valuesLabel")}</div>
              <div className="mt-4 flex flex-col gap-2.5">
                {values.map((v, i) => {
                  const Icon = VALUE_ICONS[i];
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sun text-ink">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="font-display text-lg font-extrabold text-white md:text-2xl">{v.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ============ DEVELOPMENT HISTORY ============ */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
          <RevealOnScroll>
            <div className="chip-label bg-white text-ink">{t("pg.about.history")}</div>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              {t("pg.about.historyPre")} <span className="text-sun">{t("pg.about.historyHl")}</span>
            </h2>
          </RevealOnScroll>

          <div className="mt-12 grid gap-x-6">
            <ol className="relative border-l border-white/15 pl-6 md:pl-8">
              {timeline.map((e, i) => {
                const meta = TIMELINE_META[i] || { year: "", tone: "brand" };
                return (
                  <RevealOnScroll key={i} delay={(i % 4) * 60}>
                    <li className="relative mb-9 last:mb-0">
                      <span
                        className={cx(
                          "absolute -left-[31px] md:-left-[39px] top-1 h-4 w-4 rounded-full ring-4 ring-ink",
                          meta.tone === "sun" ? "bg-sun" : meta.tone === "ink" ? "bg-white" : "bg-brand"
                        )}
                      />
                      <div className="flex flex-wrap items-baseline gap-x-3">
                        <span className="font-display text-lg font-extrabold text-sun">{meta.year}</span>
                        <span className="font-display text-lg font-bold">{e.title}</span>
                      </div>
                      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-white/60">{e.desc}</p>
                    </li>
                  </RevealOnScroll>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
        <RevealOnScroll>
          <div className="relative">
            <CtaCharacters />
            <div className="rounded-[2.5rem] bg-paper px-8 py-14 text-center md:px-16">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight text-ink md:text-5xl">{t("pg.about.ctaTitle")}</h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-ink/60">{t("pg.about.ctaDesc")}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/contact" className="btn-primary">
                  {t("pg.cta.getInTouch")} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/services" className="btn-outline">{t("pg.cta.ourServices")}</Link>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
