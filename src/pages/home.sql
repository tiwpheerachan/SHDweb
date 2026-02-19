// src/pages/HomePage.tsx
import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import GlassCard from "../components/GlassCard";
import SectionHeader from "../components/SectionHeader";
import { StatPills } from "../components/StatPills";

type AnyObj = Record<string, any>;

function asArray<T = any>(v: any): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

type BrandLink = {
  name: string;
  desc?: string;
  href: string;
  img: string; // /images/brands/xxx.jpg
  tag?: string;
};

export default function HomePage() {
  const { t } = useTranslation();

  // ✅ put file here: public/images/home/hero.jpg
  const HERO_BG = "/images/home/hero.jpg";

  const badges = asArray<string>(t("home.hero.badges", { returnFObjects: true } as any) as any) || [];
  const highlightsI18n = asArray<AnyObj>(t("home.highlights", { returnObjects: true }));
  const showcaseI18n = asArray<AnyObj>(t("home.showcase", { returnObjects: true }));

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

  const stats = [
    { k: t("home.hero.stats.0.k") || "Brands", v: t("home.hero.stats.0.v") || "10+" },
    { k: t("home.hero.stats.1.k") || "Countries", v: t("home.hero.stats.1.v") || "5+" },
    { k: t("home.hero.stats.2.k") || "Customers", v: t("home.hero.stats.2.v") || "500K+" },
  ];

  // ✅ NEW: Brand link cards
  const brandLinks: BrandLink[] = [
    {
      name: "70mai",
      desc: "Dashcam & Smart Car Accessories",
      href: "https://www.70mai.com/",
      img: "/images/brands/70mai.jpg",
      tag: "Official",
    },
    {
      name: "TOPTOY",
      desc: "Art toys & collectibles",
      href: "https://www.toptoplay.com/",
      img: "/images/brands/topttoy.jpg",
      tag: "Brand",
    },
    {
      name: "SHD Careers",
      desc: "Global hiring platform",
      href: "https://careers.shd-technology.co.th/",
      img: "/images/brands/careers.jpg",
      tag: "Careers",
    },
    {
      name: "eTax",
      desc: "Invoice / eTax request portal",
      href: "https://etax.shd-technology.co.th/",
      img: "/images/brands/etax.jpg",
      tag: "Service",
    },
  ];

  return (
    <>
      <Helmet>
        <title>{(t("home.seo.title") as string) || "Home"} · SHD Technology</title>
        <meta name="description" content={(t("home.seo.description") as string) || "SHD Corporate website"} />
      </Helmet>

      {/* ✅ แก้ช่องว่างขาวบนสุดที่มาจาก <main class="pt-8"> : ชดเชยเฉพาะหน้านี้ */}
      <div className="-mt-8 bg-white">
        {/* =========================
            HERO (ปรับตามที่ขอ)
            - “ล็อกขนาดพื้นหลัง” ให้คงที่มากขึ้น: ใช้ bg-fixed + กำหนด bg-size เป็น px
              (หมายเหตุ: browser zoom จะซูมทั้งหน้าเสมอ แต่แบบนี้จะ “คงสเกล” ตอน scroll/resize ได้ดีที่สุด)
            - ข้อความเป็นสีขาว
            - Badge “Light Mode” ตัวหนังสือขาว + กรอบไล่สีฟ้าๆ
            - รองรับมือถือ/เว็บสวยขึ้น
        ========================== */}
        <section className="relative">
          {/* Full-bleed wrapper */}
          <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <div className="relative min-h-[720px] md:min-h-[820px] w-full overflow-hidden">
              {/* ✅ Background (ล็อกสเกลมากขึ้น)
                  - mobile: bg-scroll (ป้องกัน iOS กระตุก)
                  - md+: bg-fixed
                  - กำหนดขนาดเป็น px เพื่อให้ “คงเดิม” มากขึ้น
              */}
              <div
                className={cx(
                  "absolute inset-0",
                  "bg-center bg-no-repeat",
                  "bg-[length:1600px_auto] md:bg-[length:1900px_auto]",
                  "bg-scroll md:bg-fixed"
                )}
                style={{ backgroundImage: `url(${HERO_BG || "/images/home/hero-bg.jpg"})` }}
                aria-hidden="true"
              />

              {/* ✅ Dark readability layer (ทำให้ตัวหนังสือขาวอ่านง่าย) */}
              {/* ✅ Soft cyan glow accents */}
              <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_20%_30%,rgba(34,211,238,.22),transparent_60%),radial-gradient(900px_420px_at_85%_25%,rgba(59,130,246,.22),transparent_60%),radial-gradient(900px_520px_at_50%_105%,rgba(99,102,241,.18),transparent_60%)]" />

              {/* ✅ Content */}
              <div className="relative">
                <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
                  {/* top spacing (เผื่อ Navbar ทับ hero) */}
                  <div className="pt-14 md:pt-16" />

                  {/* ========= TOP HERO TEXT ========= */}
                  <div className="mx-auto max-w-3xl text-center">
                    {/* ✅ Light Mode badge: ตัวหนังสือขาว + กรอบไล่สีฟ้า */}
                    <div className="inline-flex rounded-full p-[1px] bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 shadow-[0_18px_60px_-45px_rgba(34,211,238,.35)]">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/15 backdrop-blur-xl">
                        <span className="h-2 w-2 rounded-full bg-white" />
                        {(t("home.hero.badges.0") as string) || "Light Mode"}
                      </div>
                    </div>

                    {/* ✅ หัวข้อสีขาว + responsive ให้เหมาะมือถือ/เว็บ */}
                    <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                      {t("home.hero.title") || "SHD Technology — สร้างการเติบโตให้แบรนด์ในเอเชีย"}
                    </h1>

                    {/* ✅ subtitle สีขาวแบบนุ่ม */}
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
                      {t("home.hero.subtitle") ||
                        "แพลตฟอร์มและทีมงานที่เชื่อมกลยุทธ์ การขาย การตลาด และปฏิบัติการ เพื่อผลลัพธ์ที่วัดผลได้"}
                    </p>

                    {/* CTA */}
                    <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href="/services"
                        className={cx(
                          "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white",
                          "bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400",
                          "shadow-[0_22px_70px_-45px_rgba(34,211,238,.55)]",
                          "transition hover:brightness-110"
                        )}
                      >
                        {t("home.hero.ctaPrimary") || "ดูบริการ"}
                      </a>

                      <a
                        href="/careers"
                        className={cx(
                          "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white",
                          "bg-white/10 ring-1 ring-white/25 backdrop-blur-xl",
                          "transition hover:bg-white/14 hover:ring-white/35"
                        )}
                      >
                        {t("home.hero.ctaSecondary") || "ร่วมงานกับเรา"}
                      </a>
                    </div>
                  </div>

                  {/* ========= STAGE: 3-column layout (คงของเดิม) ========= */}
                  <div className="mt-12 md:mt-14">
                    <div className="mx-auto max-w-6xl px-4 md:px-6">
                      <div className="grid items-center gap-8 md:grid-cols-[1fr_2.6fr_1fr]">
                        {/* LEFT */}
                        <div className="hidden flex-col gap-8 md:flex">
                          <div className="aspect-[4/3] overflow-hidden rounded-[22px] ring-1 ring-white/15 bg-white/5 backdrop-blur-sm shadow-[0_26px_80px_-55px_rgba(0,0,0,.55)]">
                            <img src="/images/home/card-1.jpg" alt="Card 1" className="h-full w-full object-cover" draggable={false} />
                          </div>
                          <div className="aspect-[4/3] overflow-hidden rounded-[22px] ring-1 ring-white/15 bg-white/5 backdrop-blur-sm shadow-[0_26px_80px_-55px_rgba(0,0,0,.55)]">
                            <img src="/images/home/card-2.jpg" alt="Card 2" className="h-full w-full object-cover" draggable={false} />
                          </div>
                        </div>

                        {/* CENTER MOCK */}
                        <div className="relative">
                          <div className="overflow-hidden rounded-[28px] ring-1 ring-white/15 bg-white/5 backdrop-blur-sm shadow-[0_40px_130px_-65px_rgba(0,0,0,.65)]">
                            <div className="aspect-[16/9] md:aspect-[19/10]">
                              <img src="/images/home/mock.jpg" alt="Main mock" className="h-full w-full object-cover" draggable={false} />
                            </div>
                          </div>
                        </div>

                        {/* RIGHT */}
                        <div className="hidden flex-col gap-8 md:flex">
                          <div className="aspect-[4/3] overflow-hidden rounded-[22px] ring-1 ring-white/15 bg-white/5 backdrop-blur-sm shadow-[0_26px_80px_-55px_rgba(0,0,0,.55)]">
                            <img src="/images/home/card-3.jpg" alt="Card 3" className="h-full w-full object-cover" draggable={false} />
                          </div>
                          <div className="aspect-[4/3] overflow-hidden rounded-[22px] ring-1 ring-white/15 bg-white/5 backdrop-blur-sm shadow-[0_26px_80px_-55px_rgba(0,0,0,.55)]">
                            <img src="/images/home/card-4.jpg" alt="Card 4" className="h-full w-full object-cover" draggable={false} />
                          </div>
                        </div>
                      </div>

                      {/* Mobile cards */}
                      <div className="mt-8 grid gap-4 md:hidden">
                        {["card-1", "card-2", "card-3", "card-4"].map((k) => (
                          <div
                            key={k}
                            className="aspect-[16/9] overflow-hidden rounded-[20px] ring-1 ring-white/15 bg-white/5 backdrop-blur-sm shadow-[0_18px_60px_-45px_rgba(0,0,0,.55)]"
                          >
                            <img src={`/images/home/${k}.jpg`} alt={k} className="h-full w-full object-cover" draggable={false} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* bottom spacing */}
                  <div className="pb-16 md:pb-20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            NEW SECTION: Brand Link Cards
        ====================================================== */}
        <section className="bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6 pt-12">
            <SectionHeader
              kicker={t("home.sections.brands?.kicker") || "แบรนด์ของเรา"}
              title={t("home.sections.brands?.title") || "เว็บไซต์ของแต่ละแบรนด์"}
              desc={t("home.sections.brands?.desc") || "คลิกเพื่อไปยังเว็บไซต์/แพลตฟอร์มของแบรนด์นั้นๆ"}
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {brandLinks.map((b) => (
                <a
                  key={b.name}
                  href={b.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cx(
                    "group block overflow-hidden rounded-3xl",
                    "bg-white ring-1 ring-slate-200",
                    "shadow-[0_18px_60px_-45px_rgba(15,23,42,.22)]",
                    "transition hover:-translate-y-0.5 hover:shadow-[0_22px_70px_-46px_rgba(79,70,229,.22)]"
                  )}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={b.img}
                      alt={b.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      draggable={false}
                    />
                    <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                      {b.tag || "Link"}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-extrabold text-slate-900">{b.name}</div>
                        {b.desc ? <div className="mt-1 text-xs leading-relaxed text-slate-600">{b.desc}</div> : null}
                      </div>

                      <div
                        className={cx(
                          "mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full",
                          "bg-slate-900/0 ring-1 ring-slate-200",
                          "transition group-hover:bg-indigo-600 group-hover:ring-0"
                        )}
                        aria-hidden="true"
                      >
                        <span className="text-sm font-black text-slate-800 group-hover:text-white">↗</span>
                      </div>
                    </div>

                    <div className="mt-3 inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                      เปิดเว็บไซต์
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            Showcase
        ====================================================== */}
        <section className="bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6 pt-12">
            <SectionHeader
              kicker={t("home.sections.showcase.kicker") || "Capabilities"}
              title={t("home.sections.showcase.title") || "What we do"}
              desc={t("home.sections.showcase.desc") || "ครบเครื่องตั้งแต่กลยุทธ์ → execution"}
            />

            <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
              {showcase.map((s, idx) => (
                <GlassCard key={idx} className="p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">{s.title}</div>
                      <div className="mt-2 text-sm leading-relaxed text-slate-700">{s.desc}</div>
                    </div>
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-600 via-cyan-500 to-rose-400 opacity-90" />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {asArray<string>(s.tags).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-12">
            <div className="rounded-3xl bg-white ring-1 ring-slate-200 shadow-[0_18px_60px_-45px_rgba(15,23,42,.25)] p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-[1.2fr_.8fr] md:items-center">
                <div>
                  <div className="inline-flex items-center rounded-full bg-white px-4 py-2 text-xs font-extrabold text-slate-800 ring-1 ring-slate-200">
                    {t("home.final.kicker") || "Contact"}
                  </div>

                  <div className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                    {t("home.final.title") || "ติดต่อทีม SHD เพื่อความร่วมมือ"}
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                    {t("home.final.desc") || "พูดคุยเรื่องพาร์ทเนอร์ งานบริการ หรือคำถามเกี่ยวกับบริษัท"}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_22px_70px_-45px_rgba(79,70,229,.70)] transition hover:bg-indigo-700"
                    >
                      {t("home.final.ctaPrimary") || "ส่งข้อความ"}
                    </a>
                    <a
                      href="/about"
                      className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 transition hover:bg-slate-50"
                    >
                      {t("home.final.ctaSecondary") || "ดูงาน"}
                    </a>
                  </div>
                </div>

                <div className="grid gap-3">
                  {(asArray<string>(t("home.final.bullets", { returnObjects: true })).length
                    ? asArray<string>(t("home.final.bullets", { returnObjects: true }))
                    : ["Business & Partnership", "Services & Operations", "Careers & HR"]
                  ).map((x, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                      <div className="text-sm text-slate-800">{x}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
