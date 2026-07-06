// src/pages/ServicesPage.tsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Target,
  Radar,
  Rocket,
  Users,
  Warehouse,
  Wrench,
  RefreshCcw,
  Megaphone,
  LineChart,
  Store,
} from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import { CtaCharacters, FloatingMascot } from "@/components/ui/culture-chars";

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

const EMPOWERMENT = [
  { icon: Target, title: "Brand Positioning", desc: "Localized positioning, product selection and pricing strategy tailored to each market's golden window of opportunity." },
  { icon: Radar, title: "Channel Penetration", desc: "Access to 1,000+ core stores, Key Account (KA) resources and marketplace flagship operations." },
  { icon: Rocket, title: "Marketing Acceleration", desc: "A robust digital marketing matrix — content, performance and creator ecosystems that drive breakthroughs." },
  { icon: Users, title: "User Operation", desc: "CRM, community and after-sales operations that compound loyalty and lifetime value." },
];

export default function ServicesPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Services · SHD Technology</title>
        <meta name="description" content="Full-cycle brand localization: four-dimensional empowerment, self-built infrastructure, and 0-1 to 1-100 growth across emerging markets." />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 pt-10 md:pt-16 pb-4">
          <RevealOnScroll>
            <div className="chip-label">Services</div>
            <h1 className="mt-6 max-w-4xl font-display text-[2.6rem] font-extrabold leading-[1.03] tracking-tight text-ink md:text-6xl">
              Full-cycle solutions for <span className="hl">market entry</span> & scale-up.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
              One partner, end-to-end: from the first shipment to category leadership. We combine a four-dimensional empowerment model with a self-built operational backbone.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Start a project <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/brands" className="btn-outline">See the results</Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* FULL-CYCLE STAGES */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-20">
        <RevealOnScroll>
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
            The growth journey, <span className="hl-blue">end to end</span>
          </h2>
        </RevealOnScroll>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { k: "0 → 1", title: "Market Entry & Cold Start", desc: "Market research, brand localization, channel setup, compliance and first-mile logistics.", tone: "ink" },
            { k: "1 → 100", title: "Scale-up & Rapid Growth", desc: "Omnichannel expansion, marketing acceleration and data-driven operations to seize category share.", tone: "brand" },
            { k: "∞", title: "Overseas Expansion", desc: "Replicating the playbook across regions — SEA, LATAM and the Middle East.", tone: "sun" },
          ].map((s, i) => (
            <RevealOnScroll key={s.k} delay={i * 90}>
              <div
                className={cx(
                  "h-full rounded-4xl p-8",
                  s.tone === "ink" && "bg-ink text-white",
                  s.tone === "brand" && "bg-brand text-white",
                  s.tone === "sun" && "bg-sun text-ink"
                )}
              >
                <div className={cx("font-display text-5xl font-extrabold", s.tone === "sun" ? "text-ink" : "text-sun")}>{s.k}</div>
                <div className="mt-5 font-display text-xl font-extrabold">{s.title}</div>
                <p className={cx("mt-2 text-sm leading-relaxed", s.tone === "sun" ? "text-ink/70" : "text-white/65")}>{s.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* FOUR-DIMENSIONAL EMPOWERMENT */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
          <RevealOnScroll>
            <div className="chip-label">Four-dimensional empowerment</div>
            <h2 className="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
              Positioning · Penetration · Acceleration · Operation
            </h2>
          </RevealOnScroll>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {EMPOWERMENT.map((c, i) => (
              <RevealOnScroll key={c.title} delay={i * 80}>
                <div className="card h-full p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <div className="mt-5 font-display text-lg font-extrabold text-ink">{c.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{c.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
        <RevealOnScroll>
          <h2 className="max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
            A <span className="hl">self-built</span> operational backbone
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink/60">
            We own the infrastructure that most partners outsource — so quality, speed and brand trust stay in our hands.
          </p>
        </RevealOnScroll>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Warehouse, title: "Warehousing & logistics", desc: "Owned local networks for fast, reliable regional fulfillment." },
            { icon: Wrench, title: "After-sales service centers", desc: "Dedicated local support and repair to protect the brand." },
            { icon: RefreshCcw, title: "OMO omnichannel system", desc: "A seamless Online-Merge-Offline operating platform." },
            { icon: Store, title: "Retail & KA channels", desc: "1,000+ core stores and Key Account relationships." },
            { icon: Megaphone, title: "Digital marketing matrix", desc: "Content, performance ads and creator ecosystems at scale." },
            { icon: LineChart, title: "Data & operations", desc: "Analytics-driven decisions across the full funnel." },
          ].map((r, i) => (
            <RevealOnScroll key={r.title} delay={(i % 3) * 80}>
              <div className="flex h-full items-start gap-4 rounded-4xl bg-white p-6 ring-1 ring-ink/[0.07] shadow-card">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink text-white">
                  <r.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display font-extrabold text-ink">{r.title}</div>
                  <div className="mt-1 text-sm text-ink/55">{r.desc}</div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 pb-16 md:pb-24">
        <RevealOnScroll>
          <div className="relative">
          <CtaCharacters />
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand px-8 py-14 text-center text-white md:px-16">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight md:text-5xl">
                Let's map your market-entry playbook.
              </h2>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/contact" className="btn bg-white text-ink hover:-translate-y-0.5">Talk to our team <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/about" className="btn bg-transparent text-white ring-1 ring-white/40 hover:ring-white/70">About SHD</Link>
              </div>
            </div>
          </div>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
