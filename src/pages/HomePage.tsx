// src/pages/HomePage.tsx
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Target,
  Radar,
  Rocket,
  Users,
  Warehouse,
  Wrench,
  RefreshCcw,
  ShieldCheck,
  TrendingUp,
  Handshake,
} from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import Carousel from "../components/Carousel";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Sparkles } from "@/components/ui/sparkles";
import { Globe } from "@/components/ui/globe";
import { CtaCharacters, FloatingMascot } from "@/components/ui/culture-chars";

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

const AWARDS = Array.from({ length: 12 }, (_, i) => `/images/awards/award-${String(i + 1).padStart(2, "0")}.jpg`);
const BRAND_LOGOS = [
  { name: "Xiaomi", src: "/images/brand-logos/xiaomi.png" },
  { name: "Anker", src: "/images/brand-logos/anker.png" },
  { name: "Dreame", src: "/images/brand-logos/dreame.png" },
  { name: "70mai", src: "/images/brand-logos/70mai.png" },
  { name: "Soundcore", src: "/images/brand-logos/soundcore.png" },
  { name: "Mova", src: "/images/brand-logos/mova.png" },
  { name: "Wanbo", src: "/images/brand-logos/wanbo.png" },
  { name: "Mibro", src: "/images/brand-logos/mibro.png" },
  { name: "Jimmy", src: "/images/brand-logos/jimmy.png" },
  { name: "Levoit", src: "/images/brand-logos/levoit.png" },
  { name: "Maimo", src: "/images/brand-logos/maimo.png" },
];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">{value}</div>
      <div className="mt-2 text-sm font-medium text-ink/55">{label}</div>
    </div>
  );
}

const BRANDS = [
  { name: "Xiaomi", slug: "xiaomi", img: "/images/brands/xiaomi.jpg", tag: "Smart ecosystem" },
  { name: "Dreame", slug: "dreame", img: "/images/brands/dreame.jpg", tag: "Cleaning tech" },
  { name: "70mai", slug: "70mai", img: "/images/brands/70mai.jpg", tag: "Smart driving" },
  { name: "Anker", slug: "anker", img: "/images/brands/anker.jpg", tag: "Charging & power" },
  { name: "Mova", slug: "mova", img: "/images/brands/mova.jpg", tag: "Home appliances" },
  { name: "Wanbo", slug: "wanbo", img: "/images/brands/wanbo.jpg", tag: "Projectors" },
  { name: "Soundcore", slug: "soundcore", img: "/images/brands/soundcore.jpg", tag: "Audio" },
  { name: "Mibro", slug: "mibro", img: "/images/brands/mibro.jpg", tag: "Wearables" },
  { name: "Jimmy", slug: "jimmy", img: "/images/brands/jimmy.jpg", tag: "Cleaning" },
  { name: "Levoit", slug: "levoit", img: "/images/brands/levoit.jpg", tag: "Healthy home" },
];

export default function HomePage() {
  const { t } = useTranslation();
  const arr = <T,>(k: string) => (t(k, { returnObjects: true }) as T[]) || [];

  const emp = arr<{ t: string; d: string }>("pg.home.emp");
  const empIcons = [Target, Radar, Rocket, Users];
  const stages = arr<{ k: string; v: string }>("pg.home.stages");
  const infraItems = arr<{ t: string; d: string }>("pg.home.infraItems");
  const infraIcons = [Warehouse, Wrench, RefreshCcw];
  const regions = arr<{ r: string; m: string }>("pg.home.regions");
  const regionDots = ["bg-sun", "bg-brand-400", "bg-white"];
  const why = arr<{ t: string; d: string }>("pg.home.why");
  const whyIcons = [Handshake, TrendingUp, ShieldCheck];

  return (
    <>
      <Helmet>
        <title>SHD Technology — Brand localization & full-cycle growth across emerging markets</title>
        <meta name="description" content={t("pg.home.subtitle") as string} />
      </Helmet>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="blob-drift absolute -left-24 top-8 h-72 w-72 rounded-full bg-brand/[0.12] blur-3xl" />
          <div className="blob-drift-slow absolute right-0 top-44 h-80 w-80 rounded-full bg-sun/20 blur-3xl" />
          <div className="blob-drift absolute left-1/3 -top-10 h-64 w-64 rounded-full bg-brand/[0.08] blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 pt-10 md:pt-16">
          <FloatingMascot src="char-orange" size="w-14 md:w-20" className="left-[45%] top-20 md:top-24" r="8deg" dur="4.5s" />
          <FloatingMascot src="char-green" size="w-10 md:w-14" className="right-[3%] top-16 md:top-20" r="-10deg" dur="5.2s" delay="0.8s" />

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <RevealOnScroll>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-bold tracking-wide text-white">
                  <span className="h-2 w-2 rounded-full bg-sun" />
                  {t("pg.home.badge")}
                </div>

                <h1 className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-ink md:text-6xl">
                  {t("pg.home.heroT1")} <span className="hl">{t("pg.home.heroWin")}</span>
                  <br className="hidden md:block" /> {t("pg.home.heroT2")}
                </h1>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/60 md:text-lg">{t("pg.home.subtitle")}</p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link to="/services" className="btn-primary">
                    {t("pg.cta.ourServices")} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/about" className="btn-outline">{t("pg.cta.aboutShd")}</Link>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium text-ink/50">
                  <span>{t("pg.home.est")}</span>
                  <span className="hidden h-4 w-px bg-ink/15 sm:block" />
                  <span>{t("pg.home.partners")}</span>
                  <span className="hidden h-4 w-px bg-ink/15 sm:block" />
                  <span>{t("pg.home.markets")}</span>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={120}>
              <div className="relative">
                <div className="pointer-events-none absolute inset-4 -z-10 rounded-[40%] bg-gradient-to-tr from-brand/10 via-sun/10 to-transparent blur-3xl" />
                <img src="/images/deck/hero-illustration.png" alt="SHD" className="w-full animate-float" draggable={false} />
                <div className="absolute -bottom-2 right-2 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-white shadow-card md:right-6">
                  <span className="font-display text-lg font-extrabold text-sun">¥1.2B</span>
                  <span className="text-[11px] font-semibold leading-none text-white/70">2025 GMV<br />+288%</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ================= TRUSTED BY ================= */}
      <section className="relative mt-10 w-full overflow-hidden bg-ink pt-16 text-white">
        <div className="mx-auto w-full max-w-3xl px-4">
          <div className="text-center font-display text-2xl font-extrabold leading-tight tracking-tight md:text-4xl">
            <span className="text-brand-400">{t("pg.home.trusted")}</span>
          </div>

          <div className="relative mt-9 h-[90px] w-full">
            <InfiniteSlider className="flex h-full w-full items-center" duration={32} gap={72}>
              {BRAND_LOGOS.map((b) => (
                <img
                  key={b.name}
                  src={b.src}
                  alt={b.name}
                  className="h-6 w-auto shrink-0 object-contain opacity-45 transition-opacity duration-300 hover:opacity-100 md:h-8"
                  draggable={false}
                />
              ))}
            </InfiniteSlider>
            <ProgressiveBlur className="pointer-events-none absolute left-0 top-0 h-full w-[200px]" direction="left" blurIntensity={1} />
            <ProgressiveBlur className="pointer-events-none absolute right-0 top-0 h-full w-[200px]" direction="right" blurIntensity={1} />
          </div>
        </div>

        <div className="relative -mt-8 h-72 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] md:h-96">
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,var(--gradient-color),transparent_70%)] before:opacity-40" />
          <div className="absolute -left-1/2 top-1/2 z-10 aspect-[1/0.7] w-[200%] rounded-[100%] border-t border-white/20 bg-ink" />
          <Sparkles density={1000} color="#ffffff" size={1.4} className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]" />
        </div>
      </section>

      {/* ================= STAT STRIP ================= */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-20">
        <RevealOnScroll>
          <div className="grid grid-cols-2 gap-y-10 rounded-4xl bg-paper p-8 md:grid-cols-4 md:p-12">
            <Stat value="13+" label={t("pg.home.statYears") as string} />
            <Stat value="20+" label={t("pg.home.statBrands") as string} />
            <Stat value="1,000+" label={t("pg.home.statStores") as string} />
            <Stat value="500+" label={t("pg.home.statTeam") as string} />
          </div>
        </RevealOnScroll>
      </section>

      {/* ================= FOUR-DIMENSIONAL EMPOWERMENT ================= */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-14 md:py-20">
        <RevealOnScroll>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="chip-label">{t("pg.home.whatWeDo")}</div>
              <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
                {t("pg.home.empPre")} <span className="hl-blue">{t("pg.home.empHl")}</span> {t("pg.home.empPost")}
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-ink/60 md:pb-1.5 md:text-right">{t("pg.home.empDesc")}</p>
          </div>
        </RevealOnScroll>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {emp.map((c, i) => {
            const Icon = empIcons[i];
            const accent = [
              { box: "bg-brand text-white", num: "text-brand/10", bar: "bg-brand" },
              { box: "bg-sun text-ink", num: "text-sun/25", bar: "bg-sun" },
              { box: "bg-ink text-white", num: "text-ink/[0.07]", bar: "bg-ink" },
              { box: "bg-brand-400 text-white", num: "text-brand-400/15", bar: "bg-brand-400" },
            ][i];
            return (
              <RevealOnScroll key={i} delay={i * 80}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-[26px] bg-white p-6 ring-1 ring-ink/[0.07] shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
                  <span className={cx("pointer-events-none absolute -right-1 -top-4 select-none font-display text-[5.5rem] font-extrabold leading-none tracking-tighter", accent.num)}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className={cx("relative inline-flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-105", accent.box)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="relative mt-5 font-display text-lg font-extrabold leading-snug text-ink">{c.t}</div>
                  <p className="relative mt-2 flex-1 text-sm leading-relaxed text-ink/60">{c.d}</p>
                  <span className={cx("mt-6 h-1 w-9 rounded-full transition-all duration-500 group-hover:w-full", accent.bar)} />
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      {/* ================= FULL-CYCLE + INFRASTRUCTURE ================= */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-20">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <RevealOnScroll>
            <div className="flex h-full flex-col justify-between rounded-4xl bg-ink p-8 text-white md:p-10">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">{t("pg.home.fullCycle")}</div>
                <h3 className="mt-4 font-display text-3xl font-extrabold leading-tight md:text-4xl">{t("pg.home.fullTitle")}</h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">{t("pg.home.fullDesc")}</p>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {stages.map((s) => (
                  <div key={s.k} className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                    <div className="font-display text-2xl font-extrabold text-sun">{s.k}</div>
                    <div className="mt-1 text-xs font-medium text-white/70">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div className="h-full rounded-4xl bg-white p-8 ring-1 ring-ink/[0.07] shadow-card md:p-10">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-ink/40">{t("pg.home.infra")}</div>
              <h3 className="mt-4 font-display text-2xl font-extrabold text-ink md:text-3xl">{t("pg.home.infraTitle")}</h3>
              <div className="mt-6 grid gap-4">
                {infraItems.map((r, i) => {
                  const Icon = infraIcons[i];
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-ink">{r.t}</div>
                        <div className="text-sm text-ink/55">{r.d}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ================= EXPONENTIAL GROWTH ================= */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-8 md:py-12">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <RevealOnScroll>
            <div>
              <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">{t("pg.home.growthTitle")}</h2>
              <p className="mt-4 text-lg text-ink/60">
                {t("pg.home.growthRev")} <span className="hl font-bold">{t("pg.home.growthRevHl")}</span> {t("pg.home.growthRevPost")}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-4xl bg-brand p-6 text-white">
                  <div className="font-display text-4xl font-extrabold">288%</div>
                  <div className="mt-2 text-sm font-semibold text-white/80">{t("pg.home.contBreak")}</div>
                  <div className="mt-1 text-xs text-white/60">{t("pg.home.contBreakDesc")}</div>
                </div>
                <div className="rounded-4xl bg-sun p-6 text-ink">
                  <div className="font-display text-4xl font-extrabold">1.2<span className="text-2xl">billion</span></div>
                  <div className="mt-2 text-sm font-semibold">{t("pg.home.boundless")}</div>
                  <div className="mt-1 text-xs text-ink/60">{t("pg.home.boundlessDesc")}</div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <img src="/images/deck/revenue.png" alt="SHD revenue growth 2020–2025" className="w-full" draggable={false} />
          </RevealOnScroll>
        </div>
      </section>

      {/* ================= GLOBAL COVERAGE ================= */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute right-[8%] top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-brand/30 blur-[110px]" />
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.05]" />

        <div className="relative mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-6">
            <RevealOnScroll>
              <div>
                <div className="chip-label bg-white text-ink">{t("pg.home.whereWeOperate")}</div>
                <h2 className="mt-5 max-w-lg font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
                  {t("pg.home.coveragePre")} <span className="hl">{t("pg.home.coverageHl")}</span>
                </h2>
                <p className="mt-4 max-w-md text-base text-white/60">{t("pg.home.coverageDesc")}</p>

                <div className="mt-8 space-y-4">
                  {regions.map((r, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className={cx("mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full", regionDots[i])} />
                      <div>
                        <div className="font-display font-extrabold">{r.r}</div>
                        <div className="text-sm text-white/55">{r.m}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-6">
                  <div>
                    <div className="font-display text-3xl font-extrabold text-sun">8</div>
                    <div className="text-xs font-medium text-white/50">{t("pg.home.marketsWorldwide")}</div>
                  </div>
                  <div className="h-10 w-px bg-white/15" />
                  <div>
                    <div className="font-display text-3xl font-extrabold text-sun">20+</div>
                    <div className="text-xs font-medium text-white/50">{t("pg.home.brandPartnerships")}</div>
                  </div>
                  <div className="h-10 w-px bg-white/15" />
                  <div>
                    <div className="font-display text-3xl font-extrabold text-sun">1</div>
                    <div className="text-xs font-medium text-white/50">{t("pg.home.hqShenzhen")}</div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={120}>
              <Globe />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ================= BRAND MATRIX ================= */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
        <RevealOnScroll>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="chip-label">{t("pg.home.brandPartners")}</div>
              <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
                {t("pg.home.matrixPre")} <span className="hl-blue">{t("pg.home.matrixHl")}</span> {t("pg.home.matrixPost")}
              </h2>
              <p className="mt-4 max-w-2xl text-base text-ink/60">{t("pg.home.matrixDesc")}</p>
            </div>
            <Link to="/brands" className="btn-outline shrink-0">
              {t("pg.cta.viewAll")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </RevealOnScroll>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {BRANDS.map((b, i) => (
            <RevealOnScroll key={b.slug} delay={(i % 5) * 60}>
              <Link to={`/brands/${b.slug}`} className="group block overflow-hidden rounded-3xl bg-white ring-1 ring-ink/[0.07] shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
                <div className="aspect-[5/4] overflow-hidden bg-paper">
                  <img src={b.img} alt={b.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" draggable={false} />
                </div>
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div>
                    <div className="font-display font-extrabold text-ink">{b.name}</div>
                    <div className="text-xs text-ink/50">{b.tag}</div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-ink/30 transition group-hover:text-brand" />
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ================= BRAND EXCELLENCE & HONORS ================= */}
      <section className="relative overflow-hidden bg-brand py-16 text-white md:py-24">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-sun/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <RevealOnScroll>
            <div className="text-center">
              <div className="inline-flex items-center gap-3">
                <span className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">SHD</span>
                <span className="h-8 w-px bg-white/40 md:h-11" />
                <span className="hl font-display text-3xl font-extrabold tracking-tight md:text-5xl">{t("pg.home.excellence")}</span>
              </div>
              <p className="mx-auto mt-5 max-w-2xl text-base text-white/75">{t("pg.home.awardsDesc")}</p>
              <div className="mt-4 text-sm font-medium text-white/50">{t("pg.home.autoScroll")}</div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <Carousel className="mt-10" autoPlayMs={3200}>
              {AWARDS.map((src, i) => (
                <div key={i} data-card className="w-[220px] shrink-0 snap-start self-start overflow-hidden rounded-[26px] bg-white/95 shadow-[0_26px_70px_-40px_rgba(0,0,0,0.6)] ring-1 ring-white/20 transition duration-300 hover:-translate-y-1 sm:w-[250px]">
                  <img src={src} alt={`SHD platform award ${i + 1}`} className="block w-full" draggable={false} />
                </div>
              ))}
            </Carousel>
          </RevealOnScroll>
        </div>
      </section>

      {/* ================= WHY CHOOSE SHD ================= */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
          <RevealOnScroll>
            <div className="chip-label bg-white text-ink">{t("pg.home.whyShd")}</div>
            <h2 className="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              {t("pg.home.whyPre")} <span className="text-sun">{t("pg.home.whyHl")}</span>
            </h2>
          </RevealOnScroll>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {why.map((c, i) => {
              const Icon = whyIcons[i];
              return (
                <RevealOnScroll key={i} delay={i * 90}>
                  <div className="h-full rounded-4xl bg-white/[0.05] p-8 ring-1 ring-white/10">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sun text-ink">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="mt-5 font-display text-lg font-extrabold">{c.t}</div>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{c.d}</p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-20 md:py-28">
        <RevealOnScroll>
          <div className="relative">
            <CtaCharacters />
            <div className="relative overflow-hidden rounded-[2.5rem] bg-brand px-8 py-14 text-center text-white md:px-16 md:py-20">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-sun/20" />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight md:text-5xl">{t("pg.home.ctaTitle")}</h2>
                <p className="mx-auto mt-5 max-w-xl text-base text-white/75">{t("pg.home.ctaDesc")}</p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Link to="/contact" className="btn bg-white text-ink hover:-translate-y-0.5">
                    {t("pg.cta.talk")} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/brands" className="btn bg-transparent text-white ring-1 ring-white/40 hover:ring-white/70">
                    {t("pg.cta.explore")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
