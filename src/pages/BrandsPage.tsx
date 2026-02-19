// src/pages/BrandsPage.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import GlassCard from "../components/GlassCard";
import { StatPills } from "../components/StatPills";

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

type Brand = {
  name: string;
  slug: string;
  tagline: string;
  img: string;
  category: "All" | "Lifestyle" | "Smart Home" | "Audio" | "Cleaning" | "Mobility" | "Projector" | "Air";
  isOfficial: boolean;
};

type Banner = {
  img: string; // wide image
  href: string; // link destination
  alt: string;
};

type PromoCard = {
  id: string;
  title: string;
  badge?: string;
  subtitle?: string;
  lines: string[];
  priceLabel?: string;
  price?: string;
  img: string; // full-bleed image
  buyHref: string;
  learnHref: string;
};

export default function BrandsPage() {
  const { t } = useTranslation();

  // =========================
  // ✅ Data: 10 brands
  // =========================
  const brands: Brand[] = [
    {
      name: "Anker",
      slug: "anker",
      tagline: "Charging • Power • Innovation",
      img: "/images/brands/anker.jpg",
      category: "Lifestyle",
      isOfficial: true,
    },
    {
      name: "Soundcore",
      slug: "soundcore",
      tagline: "True Wireless • Speakers • Audio",
      img: "/images/brands/soundcore.jpg",
      category: "Audio",
      isOfficial: true,
    },
    {
      name: "Mova",
      slug: "mova",
      tagline: "Smart devices for modern living",
      img: "/images/brands/mova.jpg",
      category: "Smart Home",
      isOfficial: true,
    },
    {
      name: "70mai",
      slug: "70mai",
      tagline: "Dashcam • Car accessories",
      img: "/images/brands/70mai.jpg",
      category: "Mobility",
      isOfficial: true,
    },
    {
      name: "Jimmy",
      slug: "jimmy",
      tagline: "Vacuum • Cleaning solutions",
      img: "/images/brands/jimmy.jpg",
      category: "Cleaning",
      isOfficial: true,
    },
    {
      name: "Xiaomi",
      slug: "xiaomi",
      tagline: "Smart ecosystem • Lifestyle tech",
      img: "/images/brands/xiaomi.jpg",
      category: "Smart Home",
      isOfficial: true,
    },
    {
      name: "Mibro",
      slug: "mibro",
      tagline: "Wearables • Smartwatch",
      img: "/images/brands/mibro.jpg",
      category: "Lifestyle",
      isOfficial: true,
    },
    {
      name: "Wanbo",
      slug: "wanbo",
      tagline: "Projectors • Home theater",
      img: "/images/brands/wanbo.jpg",
      category: "Projector",
      isOfficial: true,
    },
    {
      name: "Dreame",
      slug: "dreame",
      tagline: "Robot vacuum • Cleaning tech",
      img: "/images/brands/dreame.jpg",
      category: "Cleaning",
      isOfficial: true,
    },
    {
      name: "Levoit",
      slug: "levoit",
      tagline: "Air purifier • Healthy home",
      img: "/images/brands/levoit.jpg",
      category: "Air",
      isOfficial: true,
    },
  ];

  // =========================
  // ✅ Banners: 3 wide images (center carousel like reference)
  // =========================
  const banners: Banner[] = [
    {
      img: "/images/brands/banners/banner-1.jpg",
      href: "/contact",
      alt: "Become a partner with SHD",
    },
    {
      img: "/images/brands/banners/banner-2.jpg",
      href: "/services",
      alt: "Omni-channel distribution & after-sales support",
    },
    {
      img: "/images/brands/banners/banner-3.jpg",
      href: "/about",
      alt: "SHD Technology — About us",
    },
  ];

  // =========================
  // ✅ NEW: Promo cards (mi.com-like) — 4 cards
  // =========================
// =========================
// ✅ NEW: Promo cards (mi.com-like) — 4 cards (Buttons only)
// =========================
const promoCards: PromoCard[] = [
  {
    id: "promo-1",
    title: "REDMI Note 15 Pro+",
    badge: "5G",
    subtitle: "แกร่งแบบ Titan",
    lines: ['จอ AMOLED สุดคมชัดขนาด 6.83"', "กล้อง 200MP รุ่นใหม่ ถ่ายชัดทุกมุมมอง"],
    priceLabel: "ตั้งแต่",
    price: "฿13,990.00",
    // ✅ ใช้ path ให้ตรงกับของจริงใน public/images/brands/promos/
    img: "/images/brands/promos/promo-1.jpg",
    buyHref: "https://www.mi.com/th/product/redmi-note-15-pro-plus-5g/",
    learnHref: "https://www.mi.com/th/product/redmi-note-15-pro-plus-5g/",
  },
  {
    id: "promo-2",
    title: "Xiaomi Smart Home",
    badge: "NEW",
    subtitle: "ยกระดับบ้านให้สมาร์ทขึ้น",
    lines: ["ควบคุมง่ายผ่านแอป", "เชื่อมต่อระบบนิเวศได้ครบ"],
    img: "/images/brands/promos/promo-2.jpg",
    buyHref: "https://www.mi.com/th/",
    learnHref: "https://www.mi.com/th/",
  },
  {
    id: "promo-3",
    title: "70mai Dashcam Series",
    badge: "HOT",
    subtitle: "ความปลอดภัยที่ไว้ใจได้",
    lines: ["คมชัดทั้งกลางวัน/กลางคืน", "ฟีเจอร์ช่วยขับขี่ครบ"],
    img: "/images/brands/promos/promo-3.jpg",
    buyHref: "https://www.70mai.com/",
    learnHref: "/brands/70mai",
  },
  {
    id: "promo-4",
    title: "Dreame Cleaning Premium",
    badge: "PRO",
    subtitle: "ทำความสะอาดแบบพรีเมียม",
    lines: ["พลังดูดสูง ทำความสะอาดลึก", "ระบบอัจฉริยะช่วยวางแผน"],
    img: "/images/brands/promos/promo-4.jpg",
    buyHref: "https://www.dreametech.com/",
    learnHref: "/brands/dreame",
  },
];

  // =========================
  // ✅ UI State: search + chips
  // =========================
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Brand["category"]>("All");

  const filters: Brand["category"][] = ["All", "Lifestyle", "Smart Home", "Audio", "Cleaning", "Mobility", "Projector", "Air"];

  const shown = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return brands
      .filter((b) => (filter === "All" ? true : b.category === filter))
      .filter((b) => {
        if (!qq) return true;
        return b.name.toLowerCase().includes(qq) || b.tagline.toLowerCase().includes(qq) || b.category.toLowerCase().includes(qq);
      });
  }, [brands, q, filter]);

  const officialCount = useMemo(() => brands.filter((b) => b.isOfficial).length, [brands]);

  // =========================
  // ✅ Banner carousel logic (snap + dots + auto slide)
  // =========================
  const railRef = useRef<HTMLDivElement | null>(null);
  const pauseRef = useRef(false);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      for (let i = 0; i < el.children.length; i++) {
        const node = el.children[i] as HTMLElement;
        const nodeCenter = node.offsetLeft + node.clientWidth / 2;
        const d = Math.abs(nodeCenter - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      setBannerIndex(best);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (pauseRef.current) return;
      const el = railRef.current;
      if (!el) return;

      const next = (bannerIndex + 1) % banners.length;
      const target = el.children[next] as HTMLElement | undefined;
      if (!target) return;

      target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }, 3500);

    return () => window.clearInterval(timer);
  }, [bannerIndex, banners.length]);

  // =========================
  // ✅ NEW: Promo slider logic (auto + dots + arrows)
  // =========================
  const promoPauseRef = useRef(false);
  const [promoIndex, setPromoIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (promoPauseRef.current) return;
      setPromoIndex((v) => (v + 1) % promoCards.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [promoCards.length]);

  return (
    <>
      <Helmet>
        <title>{(t("brands.seo.title") as string) || "Brands"} · SHD Technology</title>
        <meta name="description" content={(t("brands.seo.description") as string) || "Official distributor brands by SHD Technology"} />
      </Helmet>
      
{/* =========================
    NEW: Promo cards (mi.com-like)
    - ✅ ไม่มีคำอธิบาย (ตัด title/subtitle)
    - ✅ มีแค่ 2 ปุ่ม: ซื้อตอนนี้ / เรียนรู้เพิ่มเติม
    - ✅ ขยับปุ่มลงต่ำ
========================== */}
<section className="bg-white">
  <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-10">
    <div
      className="relative"
      onMouseEnter={() => (promoPauseRef.current = true)}
      onMouseLeave={() => (promoPauseRef.current = false)}
      onTouchStart={() => (promoPauseRef.current = true)}
      onTouchEnd={() => (promoPauseRef.current = false)}
    >
      {/* arrows */}
      <button
        type="button"
        onClick={() => setPromoIndex((v) => (v - 1 + promoCards.length) % promoCards.length)}
        className={cx(
          "hidden md:inline-flex",
          "absolute left-3 top-1/2 z-20 -translate-y-1/2",
          "h-10 w-10 items-center justify-center rounded-full",
          "bg-white/80 backdrop-blur ring-1 ring-slate-200",
          "text-slate-700 transition hover:bg-white"
        )}
        aria-label="Previous"
      >
        ←
      </button>

      <button
        type="button"
        onClick={() => setPromoIndex((v) => (v + 1) % promoCards.length)}
        className={cx(
          "hidden md:inline-flex",
          "absolute right-3 top-1/2 z-20 -translate-y-1/2",
          "h-10 w-10 items-center justify-center rounded-full",
          "bg-white/80 backdrop-blur ring-1 ring-slate-200",
          "text-slate-700 transition hover:bg-white"
        )}
        aria-label="Next"
      >
        →
      </button>

      {/* track */}
      <div className="overflow-hidden rounded-[28px] ring-1 ring-slate-200/80 bg-white">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(.2,.9,.2,1)]"
          style={{ transform: `translateX(-${promoIndex * 100}%)` }}
        >
          {promoCards.map((c) => (
            <div key={c.id} className="w-full flex-none">
<div className="relative min-h-[380px] md:min-h-[420px] lg:min-h-[460px]">
  {/* full image */}
  <img
    src={c.img}
    alt={c.title}
    className="absolute inset-0 h-full w-full object-cover"
    draggable={false}
  />

  {/* ✅ buttons overlay (bottom-right) */}
  <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20 flex flex-wrap items-center justify-end gap-3">
    <a
      href={c.buyHref}
      target="_blank"
      rel="noreferrer"
      className={cx(
        "inline-flex items-center justify-center rounded-full",
        "px-6 py-3 text-sm font-semibold",
        "bg-slate-900 text-white",
        "transition hover:bg-black"
      )}
    >
      ซื้อตอนนี้
    </a>

    <a
      href={c.learnHref}
      target="_blank"
      rel="noreferrer"
      className={cx(
        "inline-flex items-center justify-center rounded-full",
        "px-6 py-3 text-sm font-semibold",
        "bg-white/85 backdrop-blur",
        "ring-1 ring-slate-200",
        "text-slate-900",
        "transition hover:bg-white"
      )}
    >
      เรียนรู้เพิ่มเติม <span className="ml-1">›</span>
    </a>
  </div>
</div>

              </div>
          ))}
        </div>
      </div>

      {/* dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {promoCards.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setPromoIndex(i)}
            className={cx(
              "h-1.5 w-1.5 rounded-full transition-all duration-300",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
              i === promoIndex
                ? "bg-amber-400 ring-1 ring-amber-400/90 scale-[1.08]"
                : "bg-slate-200/75 ring-1 ring-slate-300/70 opacity-80 hover:opacity-100"
            )}
            aria-label={`Go to promo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  </div>
</section>

      {/* =========================
          HERO (Home-like)
      ========================== */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-12 md:py-14">
          <div className="text-center">
            {/* Big number (ตามสไตล์ Home section) */}
            <div className="text-[72px] leading-none font-extrabold tracking-tight md:text-[108px]">
              <span className="bg-gradient-to-b from-sky-500 to-indigo-600 bg-clip-text text-transparent">{String(brands.length)}</span>
            </div>

            {/* ✅ เปลี่ยนจาก “หัวข้อใหญ่บนสุดแบบเดิม” -> ให้เป็น Search focus */}
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              {t("brands.hero.title") || "ค้นหาแบรนด์ที่คุณสนใจ"}
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              {t("brands.hero.desc") ||
                "SHD Technology เป็นผู้จัดจำหน่ายอย่างเป็นทางการ (Official Distributor) สำหรับแบรนด์เทคโนโลยีชั้นนำในเอเชีย"}
            </p>

            {/* Search pill (เหมือนหน้า reference) */}
            <div className="mx-auto mt-7 w-full max-w-md">
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-3 ring-1 ring-slate-200">
                <span className="text-slate-500">⌕</span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={(t("common.search") as string) || "Search brand..."}
                  className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-500 outline-none"
                />
              </div>
            </div>

            {/* Chips filters */}
            <div className="mx-auto mt-5 flex max-w-5xl flex-wrap items-center justify-center gap-2">
              {filters.map((x) => {
                const active = filter === x;
                return (
                  <button
                    key={x}
                    type="button"
                    onClick={() => setFilter(x)}
                    className={cx(
                      "rounded-full px-3 py-1 text-xs font-semibold transition",
                      active ? "bg-slate-900 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                    )}
                  >
                    {x}
                  </button>
                );
              })}
            </div>

            {/* Stat pills (คง vibe เดิม) */}
            <div className="mt-8 flex justify-center">
              <StatPills
                items={[
                  { k: t("brands.stats.0.k") || "Brands", v: String(brands.length) },
                  { k: t("brands.stats.1.k") || "Official Distributor", v: String(officialCount) },
                  { k: t("brands.stats.2.k") || "Categories", v: String(filters.length - 1) },
                ]}
              />
            </div>
          </div>
        </div>
      </section>


      {/* =========================
          Brand cards grid (คงเดิม)
      ========================== */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-12">
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {shown.map((b) => (
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
                <div className="relative aspect-[6/5.5] w-full overflow-hidden bg-slate-50">
                  <img
                    src={b.img}
                    alt={b.name}
                    className={cx("h-full w-full object-cover", "transition duration-500", "group-hover:scale-[1.04]")}
                    draggable={false}
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/0 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/80 via-white/35 to-transparent" />

                  <div
                    className={cx(
                      "absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-extrabold text-white shadow",
                      b.isOfficial ? "bg-emerald-600" : "bg-slate-900"
                    )}
                  >
                    <span className="inline-block h-2 w-2 rounded-full bg-white/90" />
                    {b.isOfficial ? (t("brands.badge.official") || "Official") : (t("brands.badge.brand") || "Brand")}
                  </div>
                </div>

                <div className="relative px-5 pb-5 pt-3">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/55 via-white/85 to-white" />

                  <div className="relative">
                    <div className="text-[17px] font-extrabold tracking-tight text-slate-900">{b.name}</div>

                    <div className="mt-1 text-[12px] font-semibold text-slate-500">{b.category}</div>

                    <div className="mt-2 text-[13px] leading-snug text-slate-600 overflow-hidden text-ellipsis whitespace-nowrap">
                      {b.tagline}
                    </div>

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
                        {t("brands.card.open") || "ดูข้อมูลแบรนด์"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* =========================
              Centered carousel banners (like reference)
              ✅ ลบเงา “กรอบใหญ่” และ “การ์ดรูป”
          ========================== */}
          <div className="mt-10">
            <div className="px-1">
            </div>
            <div
              className={cx("mt-4 relative", "rounded-[22px]")}
              onMouseEnter={() => (pauseRef.current = true)}
              onMouseLeave={() => (pauseRef.current = false)}
              onTouchStart={() => (pauseRef.current = true)}
              onTouchEnd={() => (pauseRef.current = false)}
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white via-white/70 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white via-white/70 to-transparent z-10" />
            </div>
          </div>

          {/* Empty state */}
          {shown.length === 0 ? (
            <div className="mt-10 text-center">
              <div className="mx-auto max-w-lg rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
                <div className="text-sm font-extrabold text-slate-900">{t("brands.empty.title") || "ไม่พบแบรนด์"}</div>
                <div className="mt-2 text-sm text-slate-600">{t("brands.empty.desc") || "ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่ใหม่"}</div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
