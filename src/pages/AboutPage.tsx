// src/pages/AboutPage.tsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Eye, HeartHandshake, ShieldCheck, Repeat, Leaf } from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import { CtaCharacters, FloatingMascot } from "@/components/ui/culture-chars";

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

const TIMELINE = [
  { year: "2013–2014", title: "Based in Shenzhen", desc: "Leveraging the potential of the Huaqiangbei consumer-electronics sector, our founding team established Shenzhen Hongdian Technology.", tone: "sun" },
  { year: "2016", title: "Offline channel expansion", desc: "Established a retail model in Bangkok.", tone: "brand" },
  { year: "2018", title: "Strategic brand enhancement", desc: "Pivoted from OEM to branded operations; yearly sales surpassed RMB 100 million.", tone: "brand" },
  { year: "2019", title: "Brand co-building model", desc: "Built a framework for brand co-construction, driven by high-potential brand selection and end-to-end empowerment.", tone: "brand" },
  { year: "2020", title: "Regional expansion", desc: "Rapid team growth across Shenzhen and Thailand, with the successful establishment of our Indonesia division.", tone: "brand" },
  { year: "2021", title: "Dreame & Philippines entry", desc: "Strategic partnership with Dreame; entered the Philippines and expanded coverage across Southeast Asia.", tone: "ink" },
  { year: "2022–2023", title: "Award-winning performance", desc: "Dreame vacuums ranked No.1 in various SEA markets; strategic alliance with 70mai achieved No.1 dashcam e-commerce sales.", tone: "ink" },
  { year: "2024", title: "Anker partnership & Brazil", desc: "Exclusive strategic partnership with Anker; established the Brazil team as regional revenue surpassed RMB 800 million.", tone: "ink" },
  { year: "2025", title: "Accelerating global expansion", desc: "In-depth cooperation with multiple brands drove consecutive GMV doubling — a second growth curve into LATAM and the Middle East.", tone: "ink" },
  { year: "Future", title: "Dual-engine strategy", desc: "Deepening penetration + globalization: fostering a multi-brand collaborative industrial ecosystem.", tone: "brand" },
];

const VALUES = [
  { icon: HeartHandshake, title: "Sincerity", desc: "Honest, transparent partnerships at every level." },
  { icon: ShieldCheck, title: "Mutual Success", desc: "Win-win collaboration and shared growth." },
  { icon: Repeat, title: "Accountability", desc: "Daring to take ownership and deliver." },
  { icon: Leaf, title: "Sustainable Growth", desc: "Long-term value creation over short-term wins." },
];

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>About · SHD Technology</title>
        <meta name="description" content="Established in Shenzhen in 2013, SHD Technology is a dedicated regional solutions partner specializing in brand localization across Southeast Asia and emerging markets." />
      </Helmet>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 pt-10 md:pt-16 pb-4">
          <FloatingMascot src="char-green" size="w-12 md:w-16" className="right-[4%] top-0 md:top-2" r="9deg" dur="4.8s" />
          <RevealOnScroll>
            <div className="chip-label">01 · About SHD</div>
            <h1 className="mt-6 max-w-4xl font-display text-[2.6rem] font-extrabold leading-[1.03] tracking-tight text-ink md:text-6xl">
              A regional solutions partner <span className="hl">planting deep roots</span> since 2013.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
              Established in Shenzhen in 2013, SHD Technology boasts over 13 years of expertise facilitating brand localization through a highly experienced cross-border team and an established end-to-end resource network.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============ INTRODUCTION ============ */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.15fr_.85fr] md:items-start">
          <RevealOnScroll>
            <div className="space-y-5 text-base leading-relaxed text-ink/70">
              <p>
                We specialize in the Southeast Asian market, providing comprehensive, full-cycle solutions for entering the market — guiding enterprises from <strong className="text-ink">initial 0–1 establishment to 1–100 scale-up growth</strong>.
              </p>
              <p>
                To help brands accurately break into the market, we rely on a self-built infrastructure system: our own local warehousing and logistics network, after-sales service centers, and a seamless <strong className="text-ink">OMO (Online-Merge-Offline)</strong> omnichannel operation. This is integrated with our experience managing <strong className="text-ink">1,000+ core stores</strong> and Key Account (KA) channel resources, alongside a robust digital marketing matrix.
              </p>
              <p>
                Through our four-dimensional empowerment model, we have enabled <strong className="text-ink">20+ consumer-electronics brands</strong> to achieve significant breakthroughs — a number of partners reaching the <strong className="text-ink">TOP 1</strong> position within their platform categories during their very first year.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-4xl">
                <img
                  src="/images/deck/intro-skyline.jpg"
                  alt="Shenzhen skyline"
                  className="h-44 w-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="rounded-4xl bg-brand p-6 text-white shadow-brand">
                <div className="font-display text-4xl font-extrabold">1,000+</div>
                <div className="mt-1 text-sm text-white/70">Core stores & KA channel resources managed</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-4xl bg-sun p-6 text-ink">
                  <div className="font-display text-3xl font-extrabold">20+</div>
                  <div className="mt-1 text-xs font-semibold">Consumer-electronics brands empowered</div>
                </div>
                <div className="rounded-4xl bg-ink p-6 text-white">
                  <div className="font-display text-3xl font-extrabold">TOP 1</div>
                  <div className="mt-1 text-xs font-semibold text-white/70">Category rank in first year</div>
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
              Company <span className="hl">Foundation</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base text-ink/60">
              The founding team accumulated deep industry experience in Shenzhen's Huaqiangbei district, breaking through the conventional low-end OEM model in 2018 to pivot toward branded operations.
            </p>
          </RevealOnScroll>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { n: 1, img: "/images/deck/foundation-1.jpg", title: "S / H / D", sub: "S: Based in Shenzhen · H: Building a Great Enterprise · D: Concentrating on Consumer Electronics" },
              { n: 2, img: "/images/deck/foundation-2.jpg", title: "Brand co-construction", sub: "TOP 10 in Southeast Asian category (Huami, 70mai)" },
              { n: 3, img: "/images/deck/foundation-3.jpg", title: "Creating long-term value for consumers", sub: "The win-win and shared-growth philosophy" },
            ].map((c, i) => (
              <RevealOnScroll key={c.n} delay={i * 90}>
                <div className="group relative h-[440px] overflow-hidden rounded-4xl bg-ink">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                    draggable={false}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                  <div className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white font-display text-lg font-extrabold text-ink">
                    {c.n}
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
          <div className="chip-label">02 · Business culture</div>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
            Our <span className="hl-blue">Mission</span> & <span className="hl">Vision</span>
          </h2>
        </RevealOnScroll>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <RevealOnScroll>
            <div className="flex h-full flex-col justify-between rounded-4xl bg-brand p-8 text-white md:p-10">
              <Sparkles className="h-8 w-8 text-sun" />
              <div className="mt-10">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Our Mission</div>
                <div className="mt-3 font-display text-2xl font-extrabold leading-snug md:text-3xl">
                  Connecting innovative technologies to enhance the lives of global users through innovation.
                </div>
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <div className="flex h-full flex-col justify-between rounded-4xl bg-sun p-8 text-ink md:p-10">
              <Eye className="h-8 w-8" />
              <div className="mt-10">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-ink/50">Our Vision</div>
                <div className="mt-3 font-display text-2xl font-extrabold leading-snug md:text-3xl">
                  To become a globally trusted and valuable new-retail brand.
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Values — aerial team photo with values overlay */}
        <RevealOnScroll>
          <div className="relative mt-5 overflow-hidden rounded-4xl bg-ink">
            <img
              src="/images/deck/values-team.jpg"
              alt="SHD team — setting sail together"
              className="h-full w-full object-cover"
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-12">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">SHD Values</div>
              <div className="mt-4 flex flex-col gap-2.5">
                {VALUES.map((v) => (
                  <div key={v.title} className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sun text-ink">
                      <v.icon className="h-4 w-4" />
                    </span>
                    <span className="font-display text-lg font-extrabold text-white md:text-2xl">{v.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ============ DEVELOPMENT HISTORY ============ */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
          <RevealOnScroll>
            <div className="chip-label bg-white text-ink">03 · Development history</div>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Tracing our path from <span className="text-sun">2013 to today</span>
            </h2>
          </RevealOnScroll>

          <div className="mt-12 grid gap-x-6">
            <ol className="relative border-l border-white/15 pl-6 md:pl-8">
              {TIMELINE.map((e, i) => (
                <RevealOnScroll key={e.year} delay={(i % 4) * 60}>
                  <li className="relative mb-9 last:mb-0">
                    <span
                      className={cx(
                        "absolute -left-[31px] md:-left-[39px] top-1 h-4 w-4 rounded-full ring-4 ring-ink",
                        e.tone === "sun" ? "bg-sun" : e.tone === "ink" ? "bg-white" : "bg-brand"
                      )}
                    />
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <span className="font-display text-lg font-extrabold text-sun">{e.year}</span>
                      <span className="font-display text-lg font-bold">{e.title}</span>
                    </div>
                    <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-white/60">{e.desc}</p>
                  </li>
                </RevealOnScroll>
              ))}
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
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight text-ink md:text-5xl">
              Building long-term value, together.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-ink/60">
              Rooted in a philosophy of win-win collaboration and shared growth.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="btn-primary">
                Get in touch <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/services" className="btn-outline">Our services</Link>
            </div>
          </div>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
