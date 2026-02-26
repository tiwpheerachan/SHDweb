// frontend/src/pages/ServicesPage.tsx
import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { ArrowRight, CalendarClock, PackageSearch } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import GlassCard from "../components/GlassCard";

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

type ServiceRow = {
  key: string;
  title: string;
  desc: string;
  bullets: string[];
  href: string;
  icon: React.ReactNode;
  imageSrc: string; // kept for later, not used in card design
  tag?: string;
  ctaLabel?: string;
};

function LinkBtn({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold",
        "bg-slate-900 text-white",
        "shadow-[0_14px_50px_-28px_rgba(2,6,23,0.55)]",
        "transition hover:-translate-y-[1px] hover:bg-slate-950",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-[2px]" />
    </a>
  );
}

function GhostBtn({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold",
        "bg-white text-slate-900",
        "ring-1 ring-slate-200",
        "shadow-[0_12px_45px_-34px_rgba(2,6,23,0.35)]",
        "transition hover:-translate-y-[1px] hover:ring-slate-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-[2px]" />
    </a>
  );
}

/** ✅ NEW card design to match your screenshot */
function ServiceRowCard({ item }: { item: ServiceRow }) {
  const { t } = useTranslation();
  const external = item.href.startsWith("http");

  return (
    <GlassCard
      className={cn(
        "group relative overflow-hidden rounded-[18px] bg-white",
        "ring-1 ring-slate-200",
        "shadow-[0_14px_55px_-42px_rgba(2,6,23,0.28)]",
        "transition hover:-translate-y-[2px] hover:shadow-[0_18px_70px_-48px_rgba(2,6,23,0.36)]"
      )}
    >
      <div className="relative p-5 md:p-6">
        {/* top-right arrow */}
        <a
          href={item.href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className={cn(
            "absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full",
            "bg-white ring-1 ring-slate-200",
            "shadow-[0_12px_40px_-30px_rgba(2,6,23,0.25)]",
            "transition",
            "group-hover:bg-slate-900 group-hover:text-white"
          )}
          aria-label={`Open ${item.title}`}
        >
          <ArrowRight className="h-4 w-4" />
        </a>

        {/* title + desc (with right padding for arrow) */}
        <div className="pr-12">
          <h3 className="text-[15px] font-black text-slate-950 md:text-base">{item.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
        </div>

        {/* bullets (single line style, wrap if needed) */}
        {!!item.bullets?.length && (
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
            {item.bullets.slice(0, 3).map((b, i) => (
              <div key={i} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span className="leading-relaxed">{b}</span>
              </div>
            ))}
          </div>
        )}

        {/* bottom actions */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <LinkBtn href={item.href}>
            {item.ctaLabel || (t("services.card.primaryCta", { defaultValue: "เริ่มใช้งาน" }) as string)}
          </LinkBtn>
          <GhostBtn href="/contact">
            {(t("services.card.contactCta", { defaultValue: "ติดต่อเรา" }) as string)}
          </GhostBtn>
        </div>
      </div>
    </GlassCard>
  );
}

export default function ServicesPage() {
  const { t } = useTranslation();

  // =========================
  // ✅ i18n: Services rows
  // - keep design the same
  // - only replace hardcoded text with t(...)
  // =========================
  const services = useMemo<ServiceRow[]>(() => {
    const rows = t("services.items", { returnObjects: true, defaultValue: [] }) as any[];

    // fallback: if someone forgets to create services.items in locales,
    // keep old TH strings to avoid crash (design unchanged)
    const fallback: ServiceRow[] = [
      {
        key: "booking",
        title: "บริการติดตั้งกล้องติดรถยนต์ 70mai",
        desc: "จองคิวออนไลน์ เลือกสาขา/วัน/เวลา พร้อมช่างผู้เชี่ยวชาญดูแลแบบพรีเมียม",
        bullets: ["เลือกสาขา/วัน/เวลา ได้ทันที", "จัดการเลื่อนนัด/ยกเลิกได้", "ขั้นตอนชัดเจน โปร่งใส"],
        href: "https://booking.70mai.co.th/",
        icon: <CalendarClock className="h-3.5 w-3.5 text-slate-900" />,
        imageSrc: "/images/services/70mai-booking.jpg",
        tag: "Booking",
        ctaLabel: "จองคิว",
      },
      {
        key: "tracking",
        title: "ตรวจสอบสถานะงานซ่อม-เคลม",
        desc: "ติดตามสถานะงานซ่อม/เคลมแบบเรียลไทม์ ด้วยเลขอ้างอิงที่คุณมี",
        bullets: ["ดูสถานะแต่ละขั้นตอน", "มีรายละเอียดงานและการจัดส่ง", "ลดเวลาตามงาน/โทรถาม"],
        href: "https://sv.shd-technology.co.th/servicetracking.aspx",
        icon: <PackageSearch className="h-3.5 w-3.5 text-slate-900" />,
        imageSrc: "/images/services/service-tracking.jpg",
        tag: "Tracking",
        ctaLabel: "ตรวจสอบ",
      },
    ];

    if (!Array.isArray(rows) || rows.length === 0) return fallback;

    return rows.map((r: any) => {
      const iconName = String(r?.icon || "");
      const icon =
        iconName === "CalendarClock" ? (
          <CalendarClock className="h-3.5 w-3.5 text-slate-900" />
        ) : iconName === "PackageSearch" ? (
          <PackageSearch className="h-3.5 w-3.5 text-slate-900" />
        ) : (
          <ArrowRight className="h-3.5 w-3.5 text-slate-900" />
        );

      return {
        key: String(r?.key || ""),
        title: String(r?.title || ""),
        desc: String(r?.desc || ""),
        bullets: Array.isArray(r?.bullets) ? r.bullets.map((x: any) => String(x)) : [],
        href: String(r?.href || "/"),
        icon,
        imageSrc: String(r?.imageSrc || ""),
        tag: r?.tag ? String(r.tag) : undefined,
        ctaLabel: r?.ctaLabel ? String(r.ctaLabel) : undefined,
      } as ServiceRow;
    });
  }, [t]);

  return (
    <>
      <Helmet>
        <title>{(t("services.seo.title") as string) || "Services"} · SHD Technology</title>
        <meta
          name="description"
          content={(t("services.seo.description") as string) || "SHD Technology services"}
        />
      </Helmet>

      {/* ===== HERO (luxury minimal + animated gradient on MAIN TITLE) ===== */}
      <style>{`
        .heroGradText{
          background-image: linear-gradient(90deg,
            #0f172a,
            #2563eb,
            #7c3aed,
            #db2777,
            #0ea5e9,
            #0f172a
          );
          background-size: 320% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shdHeroGrad 7s ease-in-out infinite;
        }
        @keyframes shdHeroGrad{
          0%{ background-position: 0% 50%; }
          50%{ background-position: 100% 50%; }
          100%{ background-position: 0% 50%; }
        }

        .heroFrameGrad{
          background-image: linear-gradient(90deg,
            rgba(14,165,233,0.55),
            rgba(124,58,237,0.55),
            rgba(219,39,119,0.50),
            rgba(245,158,11,0.45),
            rgba(14,165,233,0.55)
          );
          background-size: 260% 100%;
          animation: shdFrameMove 9s ease-in-out infinite;
        }
        @keyframes shdFrameMove{
          0%{ background-position: 0% 50%; }
          50%{ background-position: 100% 50%; }
          100%{ background-position: 0% 50%; }
        }
      `}</style>

      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-slate-200/70" />

        <div className="mx-auto max-w-6xl px-4 pb-10 pt-12 md:pb-12 md:pt-14">
          <div className="grid items-center gap-8 md:grid-cols-12">
            {/* LEFT */}
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-slate-900 ring-1 ring-slate-200 shadow-[0_16px_60px_-46px_rgba(2,6,23,0.30)]">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {(t("services.hero.kicker", { defaultValue: "Premium Service" }) as string)}
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
                <span className="heroGradText">
                  {t("services.hero.title", { defaultValue: "บริการแบบครบวงจรที่ต่อยอดได้" })}
                </span>
              </h1>

              <p className="mt-3 max-w-xl text-base text-slate-600 md:text-lg">
                {t("services.hero.subtitle", {
                  defaultValue:
                    "จองคิวติดตั้ง 70mai • ติดตามงานซ่อม/เคลม • และการดูแลหลังการขาย — ทุกอย่างอยู่ในมาตรฐานเดียวกัน เพื่อประสบการณ์ที่ชัดเจนและพรีเมียม",
                })}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <LinkBtn href={(t("services.hero.ctaPrimary.href") as string) || "https://booking.70mai.co.th/"}>
                  {(t("services.hero.ctaPrimary.label", { defaultValue: "เริ่มจองคิว 70mai" }) as string)}
                </LinkBtn>
                <GhostBtn
                  href={
                    (t("services.hero.ctaSecondary.href") as string) ||
                    "https://sv.shd-technology.co.th/servicetracking.aspx"
                  }
                >
                  {(t("services.hero.ctaSecondary.label", { defaultValue: "ตรวจสอบงานซ่อม-เคลม" }) as string)}
                </GhostBtn>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {(
                  (t("services.hero.stats", {
                    returnObjects: true,
                    defaultValue: [
                      { k: "Support", v: "ทุกวัน 24 ชม." },
                      { k: "มาตรฐาน", v: "ตรวจสอบได้" },
                      { k: "บริการ", v: "ครบวงจร" },
                    ],
                  }) as any[]) || []
                )
                  .slice(0, 3)
                  .map((x, i) => (
                    <div
                      key={i}
                      className={cn(
                        "rounded-2xl bg-white p-4",
                        "ring-1 ring-slate-200",
                        "shadow-[0_16px_60px_-48px_rgba(2,6,23,0.28)]"
                      )}
                    >
                      <div className="text-xs font-extrabold text-slate-500">{String(x?.k ?? "")}</div>
                      <div className="mt-1 text-sm font-black text-slate-950">{String(x?.v ?? "")}</div>
                    </div>
                  ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="md:col-span-5">
              <div className="relative">
                <div className="heroFrameGrad absolute -inset-[2px] rounded-[30px] opacity-70 blur-[0.2px]" />
                <div className="heroFrameGrad absolute -inset-[1px] rounded-[30px] opacity-55" />

                <GlassCard
                  className={cn(
                    "relative overflow-hidden rounded-[28px] bg-white",
                    "ring-1 ring-slate-200",
                    "shadow-[0_22px_90px_-60px_rgba(2,6,23,0.35)]"
                  )}
                >
                  <div className="relative aspect-[6/3.8] overflow-hidden">
                    <img
                      src={(t("services.hero.imageSrc", { defaultValue: "/images/services/hero-card.jpg" }) as string)}
                      alt={(t("services.hero.imageAlt", { defaultValue: "SHD Services" }) as string)}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/18" />
                  </div>

                  <div className="p-5">
                    <div className="text-sm font-black text-slate-950">
                      {t("services.hero.cardTitle", { defaultValue: "Service Hub" })}
                    </div>
                    <div className="mt-2 text-sm text-slate-600">
                      {t("services.hero.cardDesc", {
                        defaultValue: "เข้าถึงบริการหลักทั้งหมดได้ทันที",
                      })}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <GhostBtn href={(t("services.hero.quick.0.href") as string) || "https://booking.70mai.co.th/"}>
                        {(t("services.hero.quick.0.label", { defaultValue: "จองคิว" }) as string)}
                      </GhostBtn>
                      <GhostBtn
                        href={
                          (t("services.hero.quick.1.href") as string) ||
                          "https://sv.shd-technology.co.th/servicetracking.aspx"
                        }
                      >
                        {(t("services.hero.quick.1.label", { defaultValue: "เช็คสถานะ" }) as string)}
                      </GhostBtn>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES (cards redesigned to match screenshot) ===== */}
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-2">
        <SectionHeader
          kicker={t("services.section.kicker", { defaultValue: "SERVICES" })}
          title={t("services.section.title", { defaultValue: "บริการหลัก" })}
          align="left"
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <ServiceRowCard key={s.key} item={s} />
          ))}
        </div>
      </section>
    </>
  );
}