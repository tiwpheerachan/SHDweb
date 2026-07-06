import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, Globe2, Rocket, HeartHandshake } from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import { CtaCharacters, FloatingMascot } from "@/components/ui/culture-chars";

const CAREERS_URL = "http://careers.shd-technology.co.th";

export default function CareersPage() {
  const { t } = useTranslation();
  const i18nBlocks = (t("careers.blocks", { returnObjects: true }) as Array<{ title: string; desc: string }>) || [];
  const blocks = Array.isArray(i18nBlocks) && i18nBlocks.length
    ? i18nBlocks
    : [
        { title: "Cross-border by design", desc: "Work across Shenzhen, Thailand, Indonesia and beyond with a truly global team." },
        { title: "Ownership from day one", desc: "Real responsibility, fast feedback loops, and room to lead brand launches." },
        { title: "Win-win culture", desc: "Sincerity, mutual success and sustainable growth guide how we work together." },
      ];

  return (
    <>
      <Helmet>
        <title>Careers · SHD Technology</title>
        <meta name="description" content="Join SHD Technology — build brands across emerging markets with a cross-border team." />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 pt-10 md:pt-16">
          <FloatingMascot src="char-red" size="w-12 md:w-16" className="right-[4%] top-0 md:top-2" r="-8deg" dur="4.7s" />
          <RevealOnScroll>
            <div className="chip-label">Careers</div>
            <h1 className="mt-6 max-w-3xl font-display text-[2.6rem] font-extrabold leading-[1.03] tracking-tight text-ink md:text-6xl">
              Grow your career where <span className="hl">brands go global</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
              We're a cross-border team turning ambitious brands into category leaders across Southeast Asia, Latin America and the Middle East.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={CAREERS_URL} target="_blank" rel="noreferrer" className="btn-primary">
                View open roles <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/contact" className="btn-outline">Contact us</Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CULTURE */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-14 md:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {blocks.map((b, i) => {
            const Icon = [Globe2, Rocket, HeartHandshake][i % 3];
            return (
              <RevealOnScroll key={i} delay={i * 80}>
                <div className="card h-full p-7">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white">
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
          <div className="relative mt-5">
          <CtaCharacters />
          <div className="flex flex-col items-start justify-between gap-6 rounded-4xl bg-sun p-8 text-ink md:flex-row md:items-center md:p-10">
            <div>
              <div className="font-display text-2xl font-extrabold">Ready to make an impact?</div>
              <p className="mt-2 max-w-xl text-sm text-ink/70">Explore our open positions and join the team building the next wave of global brands.</p>
            </div>
            <a href={CAREERS_URL} target="_blank" rel="noreferrer" className="btn bg-ink text-white hover:-translate-y-0.5 shrink-0">
              Browse jobs <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
