import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SectionHeader from "../components/SectionHeader";
import GlassCard from "../components/GlassCard";
import { StatPills } from "../components/StatPills";

export default function ServicesPage() {
  const { t } = useTranslation();

  const blocks = (t("services.blocks", { returnObjects: true }) as Array<any>) || [];

  return (
    <>
      <Helmet>
        <title>{t("services.seo.title")} · SHD Technology</title>
        <meta name="description" content={t("services.seo.description")} />
      </Helmet>

      <section className="relative overflow-hidden rounded-[32px] bg-white/70 ring-1 ring-slate-200 shadow-soft">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(800px 420px at 20% 0%, rgba(79,70,229,.18), transparent 60%)," +
              "radial-gradient(700px 420px at 90% 20%, rgba(6,182,212,.16), transparent 60%)," +
              "radial-gradient(700px 520px at 60% 110%, rgba(251,113,133,.12), transparent 65%)",
          }}
        />
        <div className="relative p-7 md:p-10">
          <div className="chip">{t("services.hero.kicker")}</div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            {t("services.hero.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            {t("services.hero.desc")}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a className="btnPrimary" href="#content">
              {t("services.hero.ctaPrimary")}
            </a>
            <a className="btn" href="/contact">
              {t("services.hero.ctaSecondary")}
            </a>
          </div>

          <StatPills
            items={[
              { k: t("common.stats.0.k"), v: t("common.stats.0.v") },
              { k: t("common.stats.1.k"), v: t("common.stats.1.v") },
              { k: t("common.stats.2.k"), v: t("common.stats.2.v") },
            ]}
          />
        </div>
      </section>

      <section id="content" className="mt-10">
        <SectionHeader
          kicker={t("common.section.kicker")}
          title={t("common.section.title")}
          desc={t("common.section.desc")}
        />

        <div className="mt-6 grid gap-4 md:grid-cols-3 md:gap-6">
          {blocks.map((b, idx) => (
            <GlassCard key={idx} className="p-6 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="text-sm font-extrabold text-slate-900">{b.title}</div>
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-600 via-cyan-500 to-rose-400 opacity-90" />
              </div>
              <div className="mt-3 text-sm leading-relaxed text-slate-600">{b.desc}</div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-6 card">
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <div>
              <div className="text-sm font-extrabold text-slate-900">{t("common.promise.title")}</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t("common.promise.desc")}</p>
            </div>
            <div className="grid gap-2">
              {(t("common.promise.bullets", { returnObjects: true }) as string[]).map((x, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                  <div className="text-sm text-slate-700">{x}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
