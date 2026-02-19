import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SectionHeader from "../components/SectionHeader";
import GlassCard from "../components/GlassCard";

export default function ContactPage() {
  const { t } = useTranslation();

  const channels = (t("contact.channels", { returnObjects: true }) as Array<any>) || [];

  return (
    <>
      <Helmet>
        <title>{t("contact.seo.title")} · SHD Technology</title>
        <meta name="description" content={t("contact.seo.description")} />
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
          <div className="chip">{t("contact.hero.kicker")}</div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            {t("contact.hero.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            {t("contact.hero.desc")}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a className="btnPrimary" href="#form">
              {t("contact.hero.ctaPrimary")}
            </a>
            <a className="btn" href="/careers">
              {t("contact.hero.ctaSecondary")}
            </a>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader
          kicker={t("contact.section.kicker")}
          title={t("contact.section.title")}
          desc={t("contact.section.desc")}
        />

        <div className="mt-6 grid gap-4 md:grid-cols-3 md:gap-6">
          {channels.map((c, idx) => (
            <GlassCard key={idx} className="p-6 md:p-7">
              <div className="text-sm font-extrabold text-slate-900">{c.title}</div>
              <div className="mt-2 text-sm text-slate-600">{c.desc}</div>
              <div className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-xs font-extrabold text-white">
                {c.value}
              </div>
            </GlassCard>
          ))}
        </div>

        <div id="form" className="mt-6 card">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="text-sm font-extrabold text-slate-900">{t("contact.form.title")}</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t("contact.form.desc")}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(t("contact.form.tags", { returnObjects: true }) as string[]).map((x) => (
                  <span key={x} className="chip">
                    {x}
                  </span>
                ))}
              </div>
            </div>

            <form
              className="grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                alert(t("contact.form.mockSubmit"));
              }}
            >
              <label className="grid gap-1">
                <span className="text-xs font-bold text-slate-700">{t("contact.form.fields.name")}</span>
                <input className="h-11 rounded-2xl bg-white/80 px-4 ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-indigo-300" />
              </label>
              <label className="grid gap-1">
                <span className="text-xs font-bold text-slate-700">{t("contact.form.fields.email")}</span>
                <input className="h-11 rounded-2xl bg-white/80 px-4 ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-indigo-300" />
              </label>
              <label className="grid gap-1">
                <span className="text-xs font-bold text-slate-700">{t("contact.form.fields.message")}</span>
                <textarea className="min-h-[110px] rounded-2xl bg-white/80 p-4 ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-indigo-300" />
              </label>
              <button className="btnPrimary h-11" type="submit">
                {t("contact.form.submit")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
