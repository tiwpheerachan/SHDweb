import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SectionHeader from "../components/SectionHeader";

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

function PrimaryBtn({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        "bg-white px-6 py-3 text-sm font-bold text-black",
        "transition hover:scale-[1.03] active:scale-[0.99]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
        className
      )}
    >
      {children}
    </a>
  );
}

function GhostBtn({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        "border border-white/60 px-6 py-3 text-sm font-bold text-white",
        "transition hover:bg-white hover:text-black",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
        className
      )}
    >
      {children}
    </a>
  );
}

export default function AboutPage() {
  const { t } = useTranslation();

  const blocks = useMemo(
    () => (t("about.blocks", { returnObjects: true }) as Array<any>) || [],
    [t]
  );

  return (
    <>
      <Helmet>
        <title>{t("about.seo.title")} · SHD Technology</title>
        <meta name="description" content={t("about.seo.description")} />
      </Helmet>

      {/* ================= HERO VIDEO (bounded width) ================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 pt-10">
          <div className="relative w-full overflow-hidden">
            <div className="relative aspect-video">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/about-hero.mp4" type="video/mp4" />
              </video>

              {/* overlay */}
              <div className="absolute inset-0 bg-black/35" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/55" />

              {/* copy */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 text-white">
                <div className="text-xs font-bold tracking-[0.25em] uppercase text-white/80">
                  {t("about.hero.kicker")}
                </div>

                <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
                  {t("about.hero.title")}
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 md:text-lg">
                  {t("about.hero.desc")}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <PrimaryBtn href="#content">{t("about.hero.ctaPrimary")}</PrimaryBtn>
                  <GhostBtn href="/contact">{t("about.hero.ctaSecondary")}</GhostBtn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMPANY INTRO ================= */}
      <section id="content" className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            kicker={t("about.section1.kicker")}
            title={t("about.section1.title")}
            desc={t("about.section1.desc")}
          />

          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {blocks.map((b, idx) => (
              <div key={idx} className="group">
                <div className="text-2xl font-bold text-slate-900">{b.title}</div>

                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {b.desc}
                </p>

                <div className="mt-6 h-[2px] w-0 bg-gradient-to-r from-indigo-600 to-cyan-500 transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MISSION / VISION / VALUES ================= */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          {/* ✅ you said this kicker is good */}
          <div className="text-sm font-bold tracking-[0.25em] uppercase text-slate-500">
            {t("about.mission.kicker")}
          </div>

          <h2 className="mt-6 text-4xl font-extrabold text-slate-900">
            {t("about.mission.title")}
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {t("about.mission.desc")}
          </p>

          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <div className="text-left md:text-center">
              <div className="text-2xl font-bold text-slate-900">
                {t("about.vision.title")}
              </div>
              <p className="mt-4 text-slate-600">{t("about.vision.desc")}</p>
            </div>

            <div className="text-left md:text-center">
              <div className="text-2xl font-bold text-slate-900">
                {t("about.values.title")}
              </div>
              <p className="mt-4 text-slate-600">{t("about.values.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-black py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <h3 className="text-3xl font-bold">{t("about.cta.title")}</h3>

          <p className="mt-4 text-white/80">{t("about.cta.desc")}</p>

          <div className="mt-8">
            <a
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center rounded-full",
                "bg-white px-8 py-4 text-sm font-bold text-black",
                "transition hover:scale-105 active:scale-[0.99]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              )}
            >
              {t("about.cta.button")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}