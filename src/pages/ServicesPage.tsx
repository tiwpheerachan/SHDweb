// src/pages/ServicesPage.tsx
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
import { CtaCharacters } from "@/components/ui/culture-chars";

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

const EMP_ICONS = [Target, Radar, Rocket, Users];
const STAGE_META = [
  { k: "0 → 1", tone: "ink" },
  { k: "1 → 100", tone: "brand" },
  { k: "∞", tone: "sun" },
];
const INFRA_ICONS = [Warehouse, Wrench, RefreshCcw, Store, Megaphone, LineChart];

export default function ServicesPage() {
  const { t } = useTranslation();
  const arr = <T,>(k: string) => (t(k, { returnObjects: true }) as T[]) || [];

  const stages = arr<{ title: string; desc: string }>("pg.services.stages");
  const emp = arr<{ title: string; desc: string }>("pg.services.emp");
  const infra = arr<{ title: string; desc: string }>("pg.services.infra");

  return (
    <>
      <Helmet>
        <title>Services · SHD Technology</title>
        <meta name="description" content={t("pg.services.heroDesc") as string} />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 pt-10 md:pt-16 pb-4">
          <RevealOnScroll>
            <div className="chip-label">{t("pg.services.chip")}</div>
            <h1 className="mt-6 max-w-4xl font-display text-[2.6rem] font-extrabold leading-[1.03] tracking-tight text-ink md:text-6xl">
              {t("pg.services.heroPre")} <span className="hl">{t("pg.services.heroHl")}</span> {t("pg.services.heroPost")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">{t("pg.services.heroDesc")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">{t("pg.cta.startProject")} <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/brands" className="btn-outline">{t("pg.cta.seeResults")}</Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* FULL-CYCLE STAGES */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-20">
        <RevealOnScroll>
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
            {t("pg.services.journeyPre")} <span className="hl-blue">{t("pg.services.journeyHl")}</span>
          </h2>
        </RevealOnScroll>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {stages.map((s, i) => {
            const meta = STAGE_META[i] || { k: "", tone: "ink" };
            return (
              <RevealOnScroll key={i} delay={i * 90}>
                <div
                  className={cx(
                    "h-full rounded-4xl p-8",
                    meta.tone === "ink" && "bg-ink text-white",
                    meta.tone === "brand" && "bg-brand text-white",
                    meta.tone === "sun" && "bg-sun text-ink"
                  )}
                >
                  <div className={cx("font-display text-5xl font-extrabold", meta.tone === "sun" ? "text-ink" : "text-sun")}>{meta.k}</div>
                  <div className="mt-5 font-display text-xl font-extrabold">{s.title}</div>
                  <p className={cx("mt-2 text-sm leading-relaxed", meta.tone === "sun" ? "text-ink/70" : "text-white/65")}>{s.desc}</p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      {/* FOUR-DIMENSIONAL EMPOWERMENT */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
          <RevealOnScroll>
            <div className="chip-label">{t("pg.services.empChip")}</div>
            <h2 className="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
              {t("pg.services.empTitle")}
            </h2>
          </RevealOnScroll>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {emp.map((c, i) => {
              const Icon = EMP_ICONS[i];
              return (
                <RevealOnScroll key={i} delay={i * 80}>
                  <div className="card h-full p-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="mt-5 font-display text-lg font-extrabold text-ink">{c.title}</div>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{c.desc}</p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
        <RevealOnScroll>
          <h2 className="max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
            {t("pg.services.infraPre")} <span className="hl">{t("pg.services.infraHl")}</span> {t("pg.services.infraPost")}
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink/60">{t("pg.services.infraDesc")}</p>
        </RevealOnScroll>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {infra.map((r, i) => {
            const Icon = INFRA_ICONS[i];
            return (
              <RevealOnScroll key={i} delay={(i % 3) * 80}>
                <div className="flex h-full items-start gap-4 rounded-4xl bg-white p-6 ring-1 ring-ink/[0.07] shadow-card">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-display font-extrabold text-ink">{r.title}</div>
                    <div className="mt-1 text-sm text-ink/55">{r.desc}</div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
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
                <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight md:text-5xl">{t("pg.services.ctaTitle")}</h2>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Link to="/contact" className="btn bg-white text-ink hover:-translate-y-0.5">{t("pg.cta.talk")} <ArrowRight className="h-4 w-4" /></Link>
                  <Link to="/about" className="btn bg-transparent text-white ring-1 ring-white/40 hover:ring-white/70">{t("pg.cta.aboutShd")}</Link>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
