// src/pages/HomePage.tsx
import React from "react";
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

// Real platform awards from the SHD 2026 profile (Brand Excellence & Honors)
const AWARDS = Array.from({ length: 12 }, (_, i) => `/images/awards/award-${String(i + 1).padStart(2, "0")}.jpg`);

const BRAND_NAMES = ["Xiaomi", "Anker", "Dreame", "70mai", "Soundcore", "Mova", "Wanbo", "Mibro", "Jimmy", "Levoit"];

/* ============ Small primitives ============ */

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

  return (
    <>
      <Helmet>
        <title>SHD Technology — Brand localization & full-cycle growth across emerging markets</title>
        <meta
          name="description"
          content="Established in Shenzhen in 2013, SHD Technology helps consumer-electronics brands go from 0-1 market entry to 1-100 scale-up across Southeast Asia, Latin America and the Middle East."
        />
      </Helmet>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 pt-10 md:pt-16">
          {/* small cute floating mascot at the top */}
          <FloatingMascot src="char-orange" size="w-14 md:w-20" className="left-[46%] top-1 md:top-2" r="8deg" dur="4.5s" />
          <FloatingMascot src="char-green" size="w-10 md:w-14" className="right-[3%] top-0 md:-top-1" r="-10deg" dur="5.2s" delay="0.8s" />

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
            {/* Copy */}
            <RevealOnScroll>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-bold tracking-wide text-white">
                  <span className="h-2 w-2 rounded-full bg-sun" />
                  SHD TECHNOLOGY CO., LTD.
                </div>

                <h1 className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-ink md:text-6xl">
                  We build brands that{" "}
                  <span className="hl">win</span>
                  <br className="hidden md:block" /> in emerging markets.
                </h1>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/60 md:text-lg">
                  {t("home.hero.subtitle") ||
                    "Since 2013, SHD Technology has powered consumer-electronics brands from 0-1 market entry to 1-100 scale-up — with our own warehousing, after-sales network and OMO omnichannel operations across Southeast Asia and beyond."}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link to="/services" className="btn-primary">
                    {t("home.hero.ctaPrimary") || "Explore our services"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/about" className="btn-outline">
                    {t("home.hero.ctaSecondary") || "About SHD"}
                  </Link>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium text-ink/50">
                  <span>Est. 2013 · Shenzhen HQ</span>
                  <span className="hidden h-4 w-px bg-ink/15 sm:block" />
                  <span>20+ brand partners</span>
                  <span className="hidden h-4 w-px bg-ink/15 sm:block" />
                  <span>8 markets worldwide</span>
                </div>
              </div>
            </RevealOnScroll>

            {/* SHD brand illustration */}
            <RevealOnScroll delay={120}>
              <div className="relative">
                <div className="pointer-events-none absolute inset-4 -z-10 rounded-[40%] bg-gradient-to-tr from-brand/10 via-sun/10 to-transparent blur-3xl" />
                <img
                  src="/images/deck/hero-illustration.png"
                  alt="SHD — connecting brands with users across emerging markets"
                  className="w-full animate-float"
                  draggable={false}
                />
                {/* clean GMV pill */}
                <div className="absolute -bottom-2 right-2 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-white shadow-card md:right-6">
                  <span className="font-display text-lg font-extrabold text-sun">¥1.2B</span>
                  <span className="text-[11px] font-semibold leading-none text-white/70">2025 GMV<br />+288%</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ================= TRUSTED BY (logo slider + sparkles horizon) ================= */}
      <section className="relative mt-10 w-full overflow-hidden bg-ink pt-16 text-white">
        <div className="mx-auto w-full max-w-3xl px-4">
          <div className="text-center font-display text-2xl font-extrabold leading-tight tracking-tight md:text-4xl">
            <span className="text-brand-400">Trusted by category leaders.</span>
            <br />
            <span className="text-white">Powering brands across emerging markets.</span>
          </div>

          <div className="relative mt-9 h-[90px] w-full">
            <InfiniteSlider className="flex h-full w-full items-center" duration={32} gap={64}>
              {BRAND_NAMES.map((n) => (
                <div
                  key={n}
                  className="font-display text-2xl font-extrabold tracking-tight text-white/45 transition-colors hover:text-white md:text-3xl"
                >
                  {n}
                </div>
              ))}
            </InfiniteSlider>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-[200px]"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-[200px]"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>

        {/* sparkles horizon */}
        <div className="relative -mt-8 h-72 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] md:h-96">
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,var(--gradient-color),transparent_70%)] before:opacity-40" />
          <div className="absolute -left-1/2 top-1/2 z-10 aspect-[1/0.7] w-[200%] rounded-[100%] border-t border-white/20 bg-ink" />
          <Sparkles
            density={1000}
            color="#ffffff"
            size={1.4}
            className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          />
        </div>
      </section>

      {/* ================= STAT STRIP ================= */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-20">
        <RevealOnScroll>
          <div className="grid grid-cols-2 gap-y-10 rounded-4xl bg-paper p-8 md:grid-cols-4 md:p-12">
            <Stat value="13+" label="Years of expertise" />
            <Stat value="20+" label="Brand partnerships" />
            <Stat value="1,000+" label="Core stores managed" />
            <Stat value="500+" label="Team members" />
          </div>
        </RevealOnScroll>
      </section>

      {/* ================= FOUR-DIMENSIONAL EMPOWERMENT ================= */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-8 md:py-12">
        <RevealOnScroll>
          <div className="chip-label">01 · What we do</div>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
            A <span className="hl-blue">four-dimensional</span> empowerment model
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink/60">
            We help brands break into the market accurately — from positioning to daily user operations — backed by a self-built infrastructure system.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Target, title: "Brand Positioning", desc: "Sharp market positioning and localization strategy tuned to each region." },
            { icon: Radar, title: "Channel Penetration", desc: "1,000+ core stores and Key Account (KA) resources across online & offline." },
            { icon: Rocket, title: "Marketing Acceleration", desc: "A robust digital marketing matrix that drives measurable breakthroughs." },
            { icon: Users, title: "User Operation", desc: "Long-term user operations that turn first-year launches into category leaders." },
          ].map((c, i) => (
            <RevealOnScroll key={c.title} delay={i * 80}>
              <div className="card h-full p-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white">
                  <c.icon className="h-6 w-6" />
                </div>
                <div className="mt-5 font-display text-lg font-extrabold text-ink">{c.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{c.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ================= FULL-CYCLE + INFRASTRUCTURE ================= */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-20">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          {/* Full-cycle */}
          <RevealOnScroll>
            <div className="flex h-full flex-col justify-between rounded-4xl bg-ink p-8 text-white md:p-10">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Full-cycle solution</div>
                <h3 className="mt-4 font-display text-3xl font-extrabold leading-tight md:text-4xl">
                  From <span className="text-sun">0→1</span> market entry to{" "}
                  <span className="text-sun">1→100</span> scale-up
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
                  We guide enterprises through the entire journey of entering a new market and building durable, compounding growth.
                </p>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { k: "0→1", v: "Market Entry & Cold Start" },
                  { k: "1→100", v: "Scale-up & Rapid Growth" },
                  { k: "∞", v: "Overseas Expansion" },
                ].map((s) => (
                  <div key={s.k} className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                    <div className="font-display text-2xl font-extrabold text-sun">{s.k}</div>
                    <div className="mt-1 text-xs font-medium text-white/70">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Infrastructure */}
          <RevealOnScroll delay={100}>
            <div className="h-full rounded-4xl bg-white p-8 ring-1 ring-ink/[0.07] shadow-card md:p-10">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-ink/40">Self-built infrastructure</div>
              <h3 className="mt-4 font-display text-2xl font-extrabold text-ink md:text-3xl">
                Owned end-to-end, not outsourced
              </h3>
              <div className="mt-6 grid gap-4">
                {[
                  { icon: Warehouse, title: "Local warehousing & logistics", desc: "Our own regional network for speed and reliability." },
                  { icon: Wrench, title: "After-sales service centers", desc: "Dedicated local support that protects brand trust." },
                  { icon: RefreshCcw, title: "OMO omnichannel operations", desc: "A seamless Online-Merge-Offline operating system." },
                ].map((r) => (
                  <div key={r.title} className="flex items-start gap-4">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      <r.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-ink">{r.title}</div>
                      <div className="text-sm text-ink/55">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ================= EXPONENTIAL GROWTH (revenue chart) ================= */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-8 md:py-12">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <RevealOnScroll>
            <div>
              <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
                Exponential growth over the last 5 years
              </h2>
              <p className="mt-4 text-lg text-ink/60">
                Total revenue <span className="hl font-bold">¥1.2 billion</span> in 2025.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-4xl bg-brand p-6 text-white">
                  <div className="font-display text-4xl font-extrabold">288%</div>
                  <div className="mt-2 text-sm font-semibold text-white/80">Continuous Breakthroughs</div>
                  <div className="mt-1 text-xs text-white/60">Consecutive GMV growth (2021–2025)</div>
                </div>
                <div className="rounded-4xl bg-sun p-6 text-ink">
                  <div className="font-display text-4xl font-extrabold">1.2<span className="text-2xl">billion</span></div>
                  <div className="mt-2 text-sm font-semibold">Boundless Achievements</div>
                  <div className="mt-1 text-xs text-ink/60">2025 GMV ¥1.2B · 2024 GMV ¥800M+</div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <img
              src="/images/deck/revenue.png"
              alt="SHD revenue growth 2020–2025"
              className="w-full"
              draggable={false}
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* ================= GLOBAL COVERAGE (3D spinning globe) ================= */}
      <section className="relative overflow-hidden bg-ink text-white">
        {/* ambient glow */}
        <div className="pointer-events-none absolute right-[8%] top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-brand/30 blur-[110px]" />
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.05]" />

        <div className="relative mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-6">
            {/* Copy */}
            <RevealOnScroll>
              <div>
                <div className="chip-label bg-white text-ink">02 · Where we operate</div>
                <h2 className="mt-5 max-w-lg font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
                  Global coverage, <span className="hl">local depth</span>
                </h2>
                <p className="mt-4 max-w-md text-base text-white/60">
                  Headquartered in Shenzhen, operating across three fast-growing regions with local teams on the ground.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    { region: "Southeast Asia", markets: "Thailand · Philippines · Indonesia · Vietnam", dot: "bg-sun" },
                    { region: "Latin America", markets: "Brazil · Mexico", dot: "bg-brand-400" },
                    { region: "Middle East", markets: "Saudi Arabia · UAE", dot: "bg-white" },
                  ].map((r) => (
                    <div key={r.region} className="flex items-start gap-3">
                      <span className={cx("mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full", r.dot)} />
                      <div>
                        <div className="font-display font-extrabold">{r.region}</div>
                        <div className="text-sm text-white/55">{r.markets}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-6">
                  <div>
                    <div className="font-display text-3xl font-extrabold text-sun">8</div>
                    <div className="text-xs font-medium text-white/50">Markets worldwide</div>
                  </div>
                  <div className="h-10 w-px bg-white/15" />
                  <div>
                    <div className="font-display text-3xl font-extrabold text-sun">20+</div>
                    <div className="text-xs font-medium text-white/50">Brand partnerships</div>
                  </div>
                  <div className="h-10 w-px bg-white/15" />
                  <div>
                    <div className="font-display text-3xl font-extrabold text-sun">1</div>
                    <div className="text-xs font-medium text-white/50">HQ · Shenzhen</div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* 3D Globe */}
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
              <div className="chip-label">03 · Brand partners</div>
              <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
                A <span className="hl-blue">partnership matrix</span> of category leaders
              </h2>
              <p className="mt-4 max-w-2xl text-base text-ink/60">
                Strategic partnerships with Anker, Xiaomi, Dreame, 70mai and 20+ global consumer-electronics brands.
              </p>
            </div>
            <Link to="/brands" className="btn-outline shrink-0">
              View all brands <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </RevealOnScroll>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {BRANDS.map((b, i) => (
            <RevealOnScroll key={b.slug} delay={(i % 5) * 60}>
              <Link
                to={`/brands/${b.slug}`}
                className="group block overflow-hidden rounded-3xl bg-white ring-1 ring-ink/[0.07] shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <div className="aspect-[5/4] overflow-hidden bg-paper">
                  <img
                    src={b.img}
                    alt={b.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                    draggable={false}
                  />
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

      {/* ================= BRAND EXCELLENCE & HONORS (real platform awards) ================= */}
      <section className="relative overflow-hidden bg-brand py-16 text-white md:py-24">
        {/* laurel glow accents */}
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-sun/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <RevealOnScroll>
            <div className="text-center">
              <div className="inline-flex items-center gap-3">
                <span className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">SHD</span>
                <span className="h-8 w-px bg-white/40 md:h-11" />
                <span className="hl font-display text-3xl font-extrabold tracking-tight md:text-5xl">
                  Brand Excellence &amp; Honors
                </span>
              </div>
              <p className="mx-auto mt-5 max-w-2xl text-base text-white/75">
                Platform awards across Lazada, Shopee and Tokopedia — Best Seller, Rookie of the Year and category No.1
                honors won for our partner brands across Southeast Asia.
              </p>
              <div className="mt-4 text-sm font-medium text-white/50">Auto-scrolling · hover to pause</div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <Carousel className="mt-10" autoPlayMs={3200}>
              {AWARDS.map((src, i) => (
                <div
                  key={i}
                  data-card
                  className="w-[220px] shrink-0 snap-start self-start overflow-hidden rounded-[26px] bg-white/95 shadow-[0_26px_70px_-40px_rgba(0,0,0,0.6)] ring-1 ring-white/20 transition duration-300 hover:-translate-y-1 sm:w-[250px]"
                >
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
            <div className="chip-label bg-white text-ink">04 · Why SHD</div>
            <h2 className="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Why brands choose SHD as their <span className="text-sun">trusted partner</span>
            </h2>
          </RevealOnScroll>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Handshake,
                title: "Founder-led leadership",
                desc: "Direct founder involvement in strategic brand negotiations ensures agile, efficient execution — backed by a decade of Southeast Asia expertise.",
              },
              {
                icon: TrendingUp,
                title: "Proven track record",
                desc: "Our strategic partnership with Anker drove a 300% surge in sales, with managed brand GMV reaching industry-leading status within six months.",
              },
              {
                icon: ShieldCheck,
                title: "Soft-power advantages",
                desc: "Deep collaboration within the Xiaomi ecosystem and Anker global network, plus strategic alliances with Lazada and Shopee.",
              },
            ].map((c, i) => (
              <RevealOnScroll key={c.title} delay={i * 90}>
                <div className="h-full rounded-4xl bg-white/[0.05] p-8 ring-1 ring-white/10">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sun text-ink">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <div className="mt-5 font-display text-lg font-extrabold">{c.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{c.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-20 md:py-28">
        <RevealOnScroll>
          <div className="relative">
            {/* SHD culture characters bouncing around the CTA */}
            <CtaCharacters />

            <div className="relative overflow-hidden rounded-[2.5rem] bg-brand px-8 py-14 text-center text-white md:px-16 md:py-20">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-sun/20" />
              <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight md:text-5xl">
                Ready to launch and scale in emerging markets?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-white/75">
                Let's build your localization and growth roadmap together.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/contact" className="btn bg-white text-ink hover:-translate-y-0.5">
                  Talk to our team <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/brands" className="btn bg-transparent text-white ring-1 ring-white/40 hover:ring-white/70">
                  Explore brands
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
