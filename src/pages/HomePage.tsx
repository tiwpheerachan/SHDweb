// src/pages/HomePage.tsx
import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import GlassCard from "../components/GlassCard";
import RevealOnScroll from "../components/RevealOnScroll";
import SectionHeader from "../components/SectionHeader";
import StaggerReveal from "../components/StaggerReveal";
import MagneticButton from "../components/MagneticButton";
import TextReveal from "../components/TextReveal";
import ParallaxSection from "../components/ParallaxSection";
import AnimatedCounter from "../components/AnimatedCounter";

type AnyObj = Record<string, any>;

function asArray<T = any>(v: any): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

// ✅ helper component: count 0 -> to
function CountTo({ to, className }: { to: number; className?: string }) {
  const [n, setN] = React.useState(0);

  React.useEffect(() => {
    let raf = 0;
    const start = performance.now();
    // ✅ ความเร็วกลางๆ (ไม่ช้าไม่เร็วเกิน) ~ 700ms
    const dur = 700;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.round(eased * to);
      setN(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);

  return (
    <div className={className}>
      <span
        className="
          bg-gradient-to-b
          from-[#f6e7b0]
          via-[#d7b85a]
          to-[#b48a22]
          bg-clip-text
          text-transparent
        "
      >
        {n}
      </span>
    </div>
  );
}

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

type BrandLink = {
  name: string;
  slug: string; // ✅ ใช้สำหรับลิ้งไปดีเทล /brands/:slug
  desc?: string;
  img: string;
  tag?: string;
};

export default function HomePage() {
  const { t } = useTranslation();

  const highlightsI18n = asArray<AnyObj>(t("home.highlights", { returnObjects: true } as any));
  const showcaseI18n = asArray<AnyObj>(t("home.showcase", { returnObjects: true } as any));

  const highlights = useMemo(
    () =>
      highlightsI18n.length
        ? highlightsI18n
        : [
            { title: "Brand & Distribution", desc: "ขยายแบรนด์ด้วยช่องทางที่เหมาะสม พร้อมระบบควบคุมคุณภาพ" },
            { title: "Commerce Operations", desc: "บริหารออเดอร์ คลัง การเงิน และบริการหลังบ้านแบบ end-to-end" },
            { title: "Data & Automation", desc: "ข้อมูลกลาง + ระบบอัตโนมัติ เพื่อการตัดสินใจที่เร็วและแม่นยำ" },
          ],
    [highlightsI18n]
  );

  const showcase = useMemo(
    () =>
      showcaseI18n.length
        ? showcaseI18n
        : [
            {
              title: "Performance Marketing",
              desc: "Creative + Performance + Measurement เพื่อผลลัพธ์ที่วัดผลได้",
              tags: ["Ads", "Creative", "Growth"],
            },
            {
              title: "Regional Expansion",
              desc: "ขยายตลาดหลายประเทศด้วยมาตรฐานเดียวกัน",
              tags: ["SEA", "Localization", "Scale"],
            },
            {
              title: "SOP & Quality",
              desc: "มาตรฐานการทำงานชัดเจน ตรวจสอบได้ และขยายทีมได้เร็ว",
              tags: ["Process", "Quality", "Enterprise"],
            },
            {
              title: "Partnerships",
              desc: "ร่วมมือกับแบรนด์/พาร์ทเนอร์เพื่อการเติบโตร่วมกัน",
              tags: ["Partner", "Co-Build", "Win-Win"],
            },
          ],
    [showcaseI18n]
  );

  // =========================
  // ✅ Brand Links (10 แบรนด์) — ลิ้งไป Brand Detail
  // route: /brands/:slug
  // =========================
  const brandLinks: BrandLink[] = [
    {
      name: "Anker",
      slug: "anker",
      desc: "Charging • Power • Innovation",
      img: "/images/brands/anker.jpg",
      tag: "Official",
    },
    {
      name: "Soundcore",
      slug: "soundcore",
      desc: "True Wireless • Speakers • Audio",
      img: "/images/brands/soundcore.jpg",
      tag: "Official",
    },
    {
      name: "Mova",
      slug: "mova",
      desc: "Smart devices for modern living",
      img: "/images/brands/mova.jpg",
      tag: "Official",
    },
    {
      name: "70mai",
      slug: "70mai",
      desc: "Dashcam & Smart Car Accessories",
      img: "/images/brands/70mai.jpg",
      tag: "Official",
    },
    {
      name: "Jimmy",
      slug: "jimmy",
      desc: "Vacuum • Cleaning solutions",
      img: "/images/brands/jimmy.jpg",
      tag: "Official",
    },
    {
      name: "Xiaomi",
      slug: "xiaomi",
      desc: "Smart ecosystem • Lifestyle tech",
      img: "/images/brands/xiaomi.jpg",
      tag: "Official",
    },
    {
      name: "Mibro",
      slug: "mibro",
      desc: "Wearables • Smartwatch",
      img: "/images/brands/mibro.jpg",
      tag: "Official",
    },
    {
      name: "Wanbo",
      slug: "wanbo",
      desc: "Projectors • Home theater",
      img: "/images/brands/wanbo.jpg",
      tag: "Official",
    },
    {
      name: "Dreame",
      slug: "dreame",
      desc: "Robot vacuum • Cleaning tech",
      img: "/images/brands/dreame.jpg",
      tag: "Official",
    },
    {
      name: "Levoit",
      slug: "levoit",
      desc: "Air purifier • Healthy home",
      img: "/images/brands/levoit.jpg",
      tag: "Official",
    },
  ];

  // =========================
  // ✅ Search + Filter (ต้องอยู่หลัง brandLinks)
  // =========================
  const [brandQuery, setBrandQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const brandFilters = ["All", "Official"];

  const brandLinksToShow = useMemo(() => {
    const q = brandQuery.trim().toLowerCase();

    return brandLinks
      .filter((b) => {
        if (brandFilter === "All") return true;
        return (b.tag || "").toLowerCase() === brandFilter.toLowerCase();
      })
      .filter((b) => {
        if (!q) return true;
        return (
          (b.name || "").toLowerCase().includes(q) ||
          (b.desc || "").toLowerCase().includes(q) ||
          (b.tag || "").toLowerCase().includes(q)
        );
      });
  }, [brandLinks, brandQuery, brandFilter]);

  return (
    <>
      <Helmet>
        <title>{(t("home.seo.title") as string) || "Home"} · SHD Technology</title>
        <meta name="description" content={(t("home.seo.description") as string) || "SHD Corporate website"} />
      </Helmet>

      {/* ✅ แก้ช่องว่างขาวบนสุดที่มาจาก <main class="pt-8"> : ชดเชยเฉพาะหน้านี้ */}
      <div className="-mt-8 bg-white">
        {/* =========================
            HERO (VIDEO + Gold/Black theme)
        ========================== */}
<section className="relative">
  {/* Full-bleed wrapper */}
  <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
    <div className="relative min-h-[780px] w-full overflow-hidden">
      {/* ✅ Background VIDEO */}
<video
  className="absolute inset-0 h-full w-full object-cover"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
>
  <source src="/videos/hero.mp4" type="video/mp4" />
</video>

      {/* ✅ NO background gradient overlay ✅
          แต่เพิ่ม "เส้นไล่สีบางๆ" ที่วิ่งผ่านเหมือนดาวตก + twinkle เบามาก (ไม่ทำพื้นหลังเป็นไล่สี) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* meteor lines */}
        <span
        />

        {/* subtle twinkle dots (น้อยมาก) */}
        <span
          className="absolute inset-0 opacity-[0.14] mix-blend-multiply"
          style={{
            animation: "shdTwinkle 7.5s ease-in-out infinite",
            background:
              "radial-gradient(circle at 18% 22%, rgba(184,137,44,.45) 0 1px, transparent 2px),\
               radial-gradient(circle at 62% 28%, rgba(215,184,90,.38) 0 1px, transparent 2px),\
               radial-gradient(circle at 42% 64%, rgba(199,154,46,.32) 0 1px, transparent 2px),\
               radial-gradient(circle at 78% 58%, rgba(184,137,44,.30) 0 1px, transparent 2px),\
               radial-gradient(circle at 26% 78%, rgba(215,184,90,.30) 0 1px, transparent 2px)",
          }}
        />
      </div>

      {/* ✅ Content */}
      <div className="relative">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          {/* ✅ ขยับทั้งส่วนลงมานิดหน่อย */}
          <div className="pt-16 md:pt-24" />

{/* ========= TOP HERO TEXT (DARK BG • WHITE TITLE • GOLD OUTLINES • PREMIUM PILLS) ========= */}

<RevealOnScroll delay={100}>
<div className="mx-auto max-w-3xl text-center">
  {/* ✅ Badge: dark glass + GOLD outline + shimmer */}
  <div className="inline-flex">
    <div
      className={cx(
        "group relative inline-flex items-center gap-2 rounded-full px-4 py-2",
        "text-xs font-semibold tracking-wide text-white",
        "bg-white/[0.06] backdrop-blur-xl",
        "ring-1 ring-[#d7b85a]/55",
        "shadow-[0_22px_70px_-56px_rgba(0,0,0,.85)]",
        "transition duration-300 hover:bg-white/[0.08] hover:ring-[#f6e7b0]/60"
      )}
    >
      {/* tiny gold dot */}
      <span className="relative h-2 w-2 rounded-full bg-[#d7b85a]">
        <span className="absolute -inset-1 rounded-full bg-[#f6e7b0]/70 blur-[2px]" />
      </span>

      <span className="relative z-[2]">
        {(t("home.hero.badges.0") as string) || "SHD THAILAND"}
      </span>

      {/* gold sweep on border */}
      <span
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute inset-0 rounded-full",
          "opacity-70",
          "[mask-image:linear-gradient(110deg,transparent,black,transparent)]",
          "[mask-size:240%_100%]",
          "animate-[shdGoldSweep_3.2s_linear_infinite]"
        )}
        style={{
          background:
            "radial-gradient(circle at 18% 45%, rgba(246,231,176,.85) 0 1.2px, transparent 2.8px),\
             radial-gradient(circle at 62% 62%, rgba(215,184,90,.75) 0 1.2px, transparent 2.8px),\
             radial-gradient(circle at 86% 44%, rgba(246,231,176,.95) 0 1.2px, transparent 2.8px)"
        }}
      />
    </div>
  </div>

  {/* ✅ Title: PURE WHITE + shimmer sparkle */}
  <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
    <span className="relative inline-block">
      {/* base white text */}
      <span className="relative z-[3] text-white">
        {t("home.hero.title") || "SHD Technology — สร้างการเติบโตให้แบรนด์ในเอเชีย"}
      </span>

      {/* sparkle sweep layer */}
      <span
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute inset-0 z-[2]",
          "[mask-image:linear-gradient(110deg,transparent,black,transparent)]",
          "[mask-size:260%_100%]",
          "animate-[shdTitleGoldWhiteSweep_2.9s_linear_infinite]"
        )}
        style={{
          background:
            "radial-gradient(circle at 18% 50%, rgba(255,255,255,.95) 0 1.1px, transparent 2.7px),\
             radial-gradient(circle at 42% 20%, rgba(255,255,255,.80) 0 1.1px, transparent 2.7px),\
             radial-gradient(circle at 70% 60%, rgba(255,255,255,.90) 0 1.1px, transparent 2.7px),\
             radial-gradient(circle at 88% 36%, rgba(255,255,255,.85) 0 1.1px, transparent 2.7px)"
        }}
      />
    </span>

    <style>{`
      @keyframes shdGoldSweep{
        0%{ -webkit-mask-position:-160% 0; mask-position:-160% 0; }
        100%{ -webkit-mask-position:160% 0; mask-position:160% 0; }
      }
      @keyframes shdTitleGoldWhiteSweep{
        0%{ -webkit-mask-position:-180% 0; mask-position:-180% 0; opacity:.65; }
        55%{ opacity:1; }
        100%{ -webkit-mask-position:180% 0; mask-position:180% 0; opacity:.55; }
      }
      @keyframes shdGoldBtnSweep{
        0%{ -webkit-mask-position:-170% 0; mask-position:-170% 0; }
        100%{ -webkit-mask-position:170% 0; mask-position:170% 0; }
      }
    `}</style>
  </h1>

{/* ✅ Subtitle: PURE WHITE */}
{/* ✅ Subtitle: GOLD GRADIENT LUXURY */}
<p
  className={cx(
    "mx-auto mt-4 max-w-2xl text-sm leading-relaxed md:text-base font-medium",
    "bg-gradient-to-r from-[#f6e7b0] via-[#ffd56a] to-[#f0c44c]",
    "bg-clip-text text-transparent"
  )}
  style={{
    textShadow: "0 8px 28px rgba(215,184,90,.25)",
  }}
>
  {t("home.hero.subtitle") ||
    "แพลตฟอร์มและทีมงานที่เชื่อมกลยุทธ์ การขาย การตลาด และปฏิบัติการ เพื่อผลลัพธ์ที่วัดผลได้"}
</p>

  {/* ✅ Buttons: GOLD outline pills + magnetic */}
  <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
    {/* Primary: WHITE pill + gold rim + premium shine */}
    <MagneticButton strength={0.25}>
    <a
      href="/services"
      className={cx(
        "group relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold",
        "text-slate-950",
        "bg-white",
        "ring-1 ring-[#d7b85a]/45",
        "shadow-[0_28px_90px_-60px_rgba(255,255,255,.72)]",
        "transition duration-300",
        "hover:-translate-y-0.5 hover:brightness-[1.03]",
        "active:translate-y-0"
      )}
    >
      {/* glossy top light */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full opacity-75"
        style={{
          background:
            "radial-gradient(140px 70px at 28% 18%, rgba(255,255,255,.95), transparent 62%),\
             radial-gradient(220px 110px at 70% 0%, rgba(246,231,176,.45), transparent 65%)"
        }}
      />
      {/* subtle gold sweep */}
      <span
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute inset-0 rounded-full opacity-55",
          "[mask-image:linear-gradient(110deg,transparent,black,transparent)]",
          "[mask-size:240%_100%]",
          "animate-[shdGoldBtnSweep_3.1s_linear_infinite]"
        )}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(215,184,90,.55), transparent)"
        }}
      />
      <span className="relative">
        {t("home.hero.ctaPrimary") || "ดูบริการ"}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#b8892c]/80 transition-all duration-300 group-hover:w-full" />
      </span>
    </a>
    </MagneticButton>

    {/* Secondary: DARK glass + GOLD outline */}
    <MagneticButton strength={0.25}>
    <a
      href="http://careers.shd-technology.co.th/"
      target="_blank"
      rel="noreferrer"
      className={cx(
        "group relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold",
        "text-white/92",
        "bg-white/[0.06] backdrop-blur-xl",
        "ring-1 ring-[#d7b85a]/55",
        "shadow-[0_18px_80px_-60px_rgba(0,0,0,.85)]",
        "transition duration-300",
        "hover:-translate-y-0.5 hover:bg-white/[0.085] hover:ring-[#f6e7b0]/65",
        "active:translate-y-0"
      )}
    >
      {/* inner glow */}
<span
  className={cx(
    "relative font-semibold",
    "bg-gradient-to-r from-[#f6e7b0] via-[#ffd56a] to-[#f0c44c]",
    "bg-clip-text text-transparent"
  )}
>
  {t("home.hero.ctaSecondary") || "ร่วมงานกับเรา"}
</span>
    </a>
    </MagneticButton>
  </div>
</div>
</RevealOnScroll>
          {/* ========= STAGE: รองรับ "กรอบเป็นวิดีโอ" + ไม่มี "กรอบ/ขอบ" (เหลือแค่รูป/วิดีโอ) ========= */}
          <RevealOnScroll delay={200}>
          <div className="mt-14">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <div className="grid items-stretch gap-4 md:grid-cols-[1fr_2.6fr_1fr]">
                {/* LEFT */}
                <div className="hidden md:flex flex-col gap-4">
                  <div className="aspect-[4/3] overflow-hidden rounded-[22px] bg-transparent">
                    <video
                      className="h-full w-full object-cover"
                      src="/videos/9+.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  </div>

                  {/* ✅ Card 2: VIDEO */}
                  <div className="aspect-[4/3] overflow-hidden rounded-[22px] bg-transparent">
                    <video
                      className="h-full w-full object-cover"
                      src="/videos/Untitled design (3).mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  </div>
                </div>

                {/* CENTER */}
                <div className="relative hidden md:block">
                  <div className="h-full overflow-hidden rounded-[28px] bg-transparent">
                    <video
                      className="h-full w-full object-cover"
                      src="/videos/hro.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  </div>
                </div>

                {/* RIGHT */}
                <div className="hidden md:flex flex-col gap-4">
                  <div className="aspect-[4/3] overflow-hidden rounded-[22px] bg-transparent">
                    <video
                      className="h-full w-full object-cover"
                      src="/videos/Untitled design (5).mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  </div>

                  <div className="aspect-[4/3] overflow-hidden rounded-[22px] bg-transparent">
                    <video
                      className="h-full w-full object-cover"
                      src="/videos/Gold.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  </div>
                </div>

                {/* Mobile stack */}
                <div className="grid gap-4 md:hidden">
                  {(["card-1", "hro-video", "mock", "card-3", "card-4"] as const).map((k) => (
                    <div
                      key={k}
                      className={cx(
                        "overflow-hidden rounded-[20px] bg-transparent",
                        k === "mock" ? "aspect-[16/10]" : "aspect-[16/9]"
                      )}
                    >
                      {k === "hro-video" ? (
                        <video
                          className="h-full w-full object-cover"
                          src="/videos/hro.mp4"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <img
                          src={k === "mock" ? "/images/home/mock.jpg" : `/images/home/${k}.jpg`}
                          alt={k}
                          className="h-full w-full object-cover"
                          draggable={false}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </RevealOnScroll>

          {/* bottom spacing */}
          <div className="pb-16 md:pb-20" />
        </div>
      </div>
    </div>
  </div>
</section>

        {/* =====================================================
            NEW SECTION: Brand Cards (ดีไซน์ตามรูป + 10 cards / 5 per row)
            ✅ Card กว้างขึ้นนิด (เพิ่ม max-w + ปรับ grid ให้การ์ดกว้างขึ้น)
            ✅ เลข 10 ทำเอฟเฟค count 0 → 10 (ความเร็วกลางๆ)
        ====================================================== */}
        <section className="bg-white section-glow">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-14">
            <RevealOnScroll>
            <div className="text-center">
              {/* ✅ Number count effect 0 -> 10 (scroll-triggered + pop) */}
              <AnimatedCounter
                to={10}
                duration={1200}
                className="text-[72px] leading-none font-extrabold tracking-tight md:text-[104px] bg-gradient-to-b from-[#f6e7b0] via-[#d7b85a] to-[#b48a22] bg-clip-text text-transparent"
              />

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                {(t("home.sections.brands.title") as string) || "แบรนด์ที่เราจัดจำหน่ายอย่างเป็นทางการ"}
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
                {(t("home.sections.brands.desc") as string) ||
                  "ค้นหาแบรนด์และกดเข้าไปดูรายละเอียด การรับประกัน และช่องทางบริการ"}
              </p>

              {/* Search (premium gold ring — less white, more "rich gold") */}
              <div className="mx-auto mt-6 w-full max-w-md">
                <div className="rounded-full p-[1px] bg-gradient-to-r from-[#C79A2E] via-[#D7B04A] to-[#9A6B12]">
                  <div className="flex items-center gap-2 rounded-full bg-white px-4 py-3 ring-1 ring-black/[0.03] shadow-[0_10px_30px_-22px_rgba(154,107,18,.28)] transition focus-within:shadow-[0_16px_44px_-28px_rgba(154,107,18,.42)]">
                    <span className="text-[#9A6B12] opacity-95">⌕</span>

                    <input
                      type="text"
                      value={brandQuery}
                      onChange={(e) => setBrandQuery(e.target.value)}
                      placeholder={(t("common.search") as string) || "Search"}
                      className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Chips */}
              <div className="mx-auto mt-5 flex max-w-5xl flex-wrap items-center justify-center gap-2">
                {brandFilters.map((x) => {
                  const active = brandFilter === x;
                  return (
                    <button
                      key={x}
                      type="button"
                      onClick={() => setBrandFilter(x)}
                      className={cx(
                        "rounded-full px-3 py-1 text-xs font-semibold transition",
                        active
                          ? "bg-slate-900 text-white"
                          : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                      )}
                    >
                      {x}
                    </button>
                  );
                })}
              </div>
            </div>
            </RevealOnScroll>

            {/* ✅ Cards: ปรับใหม่ให้ "รูปเยอะขึ้น / ขาวไม่ล้น / ข้อความเตี้ยลง" */}
            <StaggerReveal className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {brandLinksToShow.slice(0, 10).map((b) => (
                <Link
                  key={b.slug}
                  to={`/brands/${b.slug}`}
                  className={cx(
                    "group relative overflow-hidden rounded-[34px] bg-white",
                    "ring-1 ring-slate-200/80",
                    "shadow-[0_18px_60px_-45px_rgba(15,23,42,.18)]",
                    "transition duration-300",
                    "hover:-translate-y-0.5 hover:shadow-[0_22px_70px_-46px_rgba(15,23,42,.22)]"
                  )}
                >
                  {/* ✅ Top image: "ยาวขึ้น" (สูงขึ้นนิด) */}
                  <div className="relative aspect-[6/5.5] w-full overflow-hidden bg-slate-50">
                    <img
                      src={b.img}
                      alt={b.name}
                      className={cx("h-full w-full object-cover", "transition duration-500", "group-hover:scale-[1.04]")}
                      draggable={false}
                    />

                    {/* ✅ Top vignette เบาๆ ให้ดู premium แต่ไม่มืดจัด */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/0 to-transparent" />

                    {/* ✅ Bottom fade: ลด "ขาวล้น" (สั้นลง + จางลง + ไม่ทึบ) */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/80 via-white/35 to-transparent" />
                  </div>

                  {/* ✅ Content: ลดพื้นที่ข้อความ (compact) */}
                  <div className="relative px-5 pb-5 pt-3">
                    {/* ✅ ไล่ขาวแบบเนียน (ไม่ทึบ) */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/55 via-white/85 to-white" />

                    <div className="relative">
                      <div className="text-[17px] font-extrabold tracking-tight text-slate-900">{b.name}</div>

                      {/* ✅ desc 1 line -> ... */}
                      <div className="mt-1 text-[13px] leading-snug text-slate-600 overflow-hidden text-ellipsis whitespace-nowrap">
                        {b.desc ||
                          ((t("home.sections.brands.cardHint") as string) ||
                            "Official distributor • Warranty • Service")}
                      </div>

                      {/* ✅ bottom action: เตี้ยลง + เนียนขึ้น */}
                      <div className="mt-3 flex items-center gap-3">
                        <span
                          className={cx(
                            "inline-flex h-9 w-9 items-center justify-center rounded-full",
                            "bg-slate-100/80 ring-1 ring-slate-200",
                            "text-slate-800",
                            "transition",
                            "group-hover:bg-slate-900 group-hover:text-white group-hover:ring-slate-900"
                          )}
                          aria-hidden="true"
                        >
                          →
                        </span>

                        <span className="text-[13px] font-semibold text-slate-700 group-hover:underline">
                          {(t("common.open") as string) || "Open"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </StaggerReveal>
          </div>
        </section>
      </div>
    </>
  );
}