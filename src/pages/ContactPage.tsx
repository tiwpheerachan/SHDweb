// src/pages/ContactPage.tsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SectionHeader from "../components/SectionHeader";
import GlassCard from "../components/GlassCard";

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function ContactPage() {
  const { t } = useTranslation();
  const channels = (t("contact.channels", { returnObjects: true }) as Array<any>) || [];

  return (
    <>
      <Helmet>
        <title>{t("contact.seo.title")} · SHD Technology</title>
        <meta name="description" content={t("contact.seo.description")} />
      </Helmet>

      {/* =========================
          HERO — CLEAN WHITE LUXURY
          - real images (no frames)
          - bright / stronger gradient title
          - faster animation
          - fix “broken/holes” gradient text (webkit + svg)
      ========================== */}
      <section className="bg-white">
        {/* local-only styles to avoid touching global css */}
        <style>{`
          @keyframes shdGradientFast {
            0%   { background-position: 0% 50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          /* Fix: gradient text holes on some browsers */
          .shd-gradient-text{
            -webkit-text-fill-color: transparent;
            -webkit-font-smoothing: antialiased;
            text-rendering: geometricPrecision;
          }
        `}</style>

        <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-10 md:py-14">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
            {/* LEFT: REAL VISUAL (no outer frame) */}
            <div className="relative">
              {/* main big image */}
              <img
                src="/images/hero/main.jpg" // ✅ เปลี่ยนเป็นรูปจริงของคุณ
                alt="SHD visual"
                className="w-full h-auto object-contain"
                draggable={false}
              />

              {/* floating small image (top-left) */}
              <img
                src="/images/hero/card-1.jpg" // ✅ เปลี่ยนรูป
                alt=""
                draggable={false}
                className={cx(
                  "pointer-events-none",
                  "absolute -left-2 -top-6 md:-left-6 md:-top-8",
                  "w-[120px] md:w-[150px]",
                  "rounded-2xl",
                  "shadow-[0_18px_45px_-30px_rgba(15,23,42,.28)]"
                )}
              />

              {/* floating gallery (bottom-right) */}
              <img
                src="/images/hero/card-2.jpg" // ✅ เปลี่ยนรูป
                alt=""
                draggable={false}
                className={cx(
                  "pointer-events-none",
                  "absolute -bottom-6 right-0 md:-bottom-8 md:right-2",
                  "w-[220px] md:w-[260px]",
                  "rounded-2xl",
                  "shadow-[0_20px_55px_-35px_rgba(15,23,42,.28)]"
                )}
              />
            </div>

            {/* RIGHT: COPY */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center rounded-full bg-white px-4 py-2 text-xs font-extrabold text-slate-800 ring-1 ring-slate-200">
                {t("contact.hero.kicker")}
              </div>

              {/* ✅ Stronger + brighter + faster gradient, and fixed rendering */}
              <h1
                className={cx(
                  "mt-5 text-4xl font-extrabold tracking-tight md:text-5xl leading-[1.06]",
                  // brighter / more vivid
                  "bg-gradient-to-r from-indigo-700 via-fuchsia-600 to-sky-500",
                  // make gradient feel more dynamic
                  "bg-[length:260%_260%] bg-clip-text text-transparent",
                  // fix holes
                  "antialiased shd-gradient-text",
                  // faster loop
                  "animate-[shdGradientFast_3.8s_ease-in-out_infinite]"
                )}
              >
                {t("contact.hero.title")}
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
                {t("contact.hero.desc")}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  className={cx(
                    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white",
                    "bg-slate-900",
                    "transition hover:bg-black"
                  )}
                  href="#form"
                >
                  {t("contact.hero.ctaPrimary")}
                </a>

                <a
                  className={cx(
                    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold",
                    "bg-white text-slate-900 ring-1 ring-slate-200",
                    "transition hover:bg-slate-50"
                  )}
                  href="/careers"
                >
                  {t("contact.hero.ctaSecondary")}
                </a>
              </div>

              {/* ✅ prevent showing i18n key when missing */}
              <div className="mt-6 text-xs font-semibold text-slate-500">
                {t("contact.hero.note", "We typically reply within 1–2 business days.")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CONTENT
      ========================== */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6 pb-14">
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
        </div>
      </section>
    </>
  );
}
