// src/pages/AboutPage.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SectionHeader from "../components/SectionHeader";
import {
  Globe2,
  MapPinned,
  Trophy,
  Boxes,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

/* ===================== Reveal animation (no lib) ===================== */
function useReveal<T extends HTMLElement>(opts?: { once?: boolean; rootMargin?: string }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const v = entries.some((e) => e.isIntersecting);
        if (v) {
          setInView(true);
          if (opts?.once !== false) io.disconnect();
        } else if (opts?.once === false) {
          setInView(false);
        }
      },
      { rootMargin: opts?.rootMargin ?? "0px 0px -12% 0px", threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [opts?.once, opts?.rootMargin]);

  return { ref, inView };
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useReveal<HTMLDivElement>({ once: true, rootMargin: "0px 0px -14% 0px" });

  return (
    <div
      ref={ref}
      className={cn(
        "transform-gpu transition-all duration-700 ease-out will-change-[transform,opacity,filter]",
        inView ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-[2px]",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ===================== Theme tokens (match your site) ===================== */
const GOLD_FROM = "#fff3cc";
const GOLD_VIA = "#f6d26a";
const GOLD_TO = "#b8892c";

function GoldText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn("bg-gradient-to-r bg-clip-text text-transparent", className)}
      style={{ backgroundImage: `linear-gradient(90deg, ${GOLD_FROM}, ${GOLD_VIA}, ${GOLD_TO})` }}
    >
      {children}
    </span>
  );
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
        "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold",
        "bg-white text-slate-950",
        "shadow-[0_20px_70px_-52px_rgba(255,255,255,.55)]",
        "transition duration-300 hover:-translate-y-0.5 hover:brightness-[1.03] active:translate-y-0",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full opacity-70"
        style={{
          background: "radial-gradient(140px 70px at 30% 25%, rgba(255,255,255,.95), transparent 60%)",
        }}
      />
      <span className="relative">{children}</span>
      <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  );
}

function GoldOutlineBtn({
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
        "group relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-extrabold",
        "text-white/95",
        "bg-white/5 backdrop-blur-xl",
        "ring-1 shadow-[0_22px_80px_-60px_rgba(0,0,0,.85)]",
        "transition duration-300 hover:-translate-y-0.5",
        className
      )}
      style={{
        borderColor: "rgba(184,137,44,.55)",
        boxShadow: "0 22px 90px -70px rgba(184,137,44,.55)",
      }}
    >
      {/* shimmer border */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full opacity-70",
          "[mask-image:linear-gradient(110deg,transparent,black,transparent)]",
          "[mask-size:240%_100%]",
          "animate-[goldSweep_3.2s_linear_infinite]"
        )}
        style={{
          background:
            "radial-gradient(circle at 18% 40%, rgba(255,246,214,.9) 0 1.2px, transparent 2.9px),\
             radial-gradient(circle at 62% 65%, rgba(255,213,106,.9) 0 1.2px, transparent 2.9px),\
             radial-gradient(circle at 86% 44%, rgba(184,137,44,.95) 0 1.2px, transparent 2.9px)",
        }}
      />
      <span className="relative">{children}</span>

      <style>{`
        @keyframes goldSweep{
          0%{ mask-position:-140% 0; -webkit-mask-position:-140% 0; }
          100%{ mask-position:140% 0; -webkit-mask-position:140% 0; }
        }
      `}</style>
    </a>
  );
}

function IconCard({
  icon,
  title,
  desc,
  bullets,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  bullets?: string[];
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[28px] p-6",
        "bg-white/85 backdrop-blur",
        "ring-1 ring-slate-200/70",
        "shadow-[0_22px_90px_-60px_rgba(15,23,42,.18)]",
        "transition duration-300 hover:-translate-y-1"
      )}
      style={{ boxShadow: "0 22px 90px -68px rgba(184,137,44,.22)" }}
    >
      {/* gold glow corners */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div
          className="absolute -right-24 -top-24 h-56 w-56 rounded-full blur-2xl"
          style={{ background: "rgba(184,137,44,.14)" }}
        />
        <div
          className="absolute -left-24 -bottom-24 h-56 w-56 rounded-full blur-2xl"
          style={{ background: "rgba(246,210,106,.14)" }}
        />
      </div>

      <div className="relative">
        <div className="flex items-center gap-3">
          <div
            className={cn("grid h-12 w-12 place-items-center rounded-2xl text-white")}
            style={{
              background: `linear-gradient(135deg, ${GOLD_TO}, ${GOLD_VIA})`,
              boxShadow: "0 16px 55px -40px rgba(184,137,44,.75)",
            }}
          >
            {icon}
          </div>
          <div className="text-lg font-extrabold text-slate-900">{title}</div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-600">{desc}</p>

        {bullets?.length ? (
          <div className="mt-5 space-y-2">
            {bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color: GOLD_TO }} />
                <div>{b}</div>
              </div>
            ))}
          </div>
        ) : null}

        <div
          className="mt-6 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
          style={{ background: `linear-gradient(90deg, ${GOLD_FROM}, ${GOLD_VIA}, ${GOLD_TO})` }}
        />
      </div>
    </div>
  );
}

/* =========================
   Local component: VideoCard
   - Locks video size: 660 x 495
   - Clean luxury layout
========================= */
function VideoCard({
  src,
  poster,
  kicker,
  title,
  desc,
  align = "left",
}: {
  src: string;
  poster?: string;
  kicker: string;
  title: string;
  desc: string;
  align?: "left" | "right";
}) {
  const left = align === "left";

  return (
    <div
      className={[
        "group relative overflow-hidden rounded-[30px]",
        "bg-white/55 backdrop-blur-xl",
        "shadow-[0_30px_120px_-90px_rgba(15,23,42,.20)]",
        "ring-1 ring-slate-200/70",
      ].join(" ")}
    >
      {/* soft background */}
      <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(520px_220px_at_18%_18%,rgba(15,23,42,.05),transparent_70%)]" />

      <div className={["relative grid gap-8 p-6 md:p-8", "md:grid-cols-12", left ? "" : ""].join(" ")}>
        {/* Video */}
        <div className={["md:col-span-6", left ? "md:order-1" : "md:order-2"].join(" ")}>
          <div
            className={[
              "relative overflow-hidden rounded-[22px]",
              "shadow-[0_26px_90px_-70px_rgba(15,23,42,.28)]",
            ].join(" ")}
            style={{ width: 660, height: 251, maxWidth: "100%" }}
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={poster}
            >
              <source src={src} type="video/mp4" />
            </video>

            {/* subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

            {/* sheen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                maskImage: "linear-gradient(110deg, transparent, black, transparent)",
                WebkitMaskImage: "linear-gradient(110deg, transparent, black, transparent)",
                maskSize: "240% 100%",
                WebkitMaskSize: "240% 100%",
                animation: "sheen 5.5s linear infinite",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent)",
              }}
            />
          </div>
        </div>

        {/* Copy */}
        <div className={["md:col-span-6 flex items-center", left ? "md:order-2" : "md:order-1"].join(" ")}>
          <div className="w-full">
            <div className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-[11px] font-extrabold tracking-[0.22em] uppercase text-slate-700 ring-1 ring-slate-200/70">
              {kicker}
            </div>

            <div className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              {title}
            </div>

            <div className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
              {desc}
            </div>

            {/* micro detail line (no gradient) */}
            <div className="mt-7 h-px w-14 bg-slate-200" />

            {/* subtle motion */}
            <div className="mt-5 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full bg-slate-900/70"
                  style={{ animation: "softFloat 2.8s ease-in-out infinite" }}
                />
                {left ? "Global coverage overview" : "Key achievements snapshot"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageCard({
  src,
  kicker,
  title,
  desc,
  align = "left",
}: {
  src: string;
  kicker: string;
  title: string;
  desc: string;
  align?: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "grid items-center gap-10",
        "rounded-[32px] p-6 md:p-8",
        "bg-white/85 backdrop-blur",
        "ring-1 ring-slate-200/70",
        "shadow-[0_22px_90px_-60px_rgba(15,23,42,.16)]",
        "md:grid-cols-2"
      )}
      style={{ boxShadow: "0 22px 90px -70px rgba(184,137,44,.16)" }}
    >
      <div className={cn(align === "right" ? "md:order-2" : "md:order-1")}>
        <div className="text-xs font-extrabold tracking-[0.25em] uppercase text-slate-500">{kicker}</div>
        <div className="mt-3 text-2xl font-extrabold text-slate-900 md:text-3xl">{title}</div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">{desc}</p>
      </div>

      <div className={cn("relative overflow-hidden rounded-[26px]", align === "right" ? "md:order-1" : "md:order-2")}>
        <img src={src} alt={title} className="h-full w-full object-cover" draggable={false} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/22 via-transparent to-transparent" />
      </div>
    </div>
  );
}

export default function AboutPage() {
  const { t } = useTranslation();

  // ✅ pull from locale (th.json / en.json / zh.json) — design unchanged
  const whoStory = useMemo(() => (t("about.who.story", { returnObjects: true }) as string[]) || [], [t]);

  const whoHighlights = useMemo(
    () =>
      (t("about.who.highlights", { returnObjects: true }) as Array<{ title: string; desc: string }>) || [],
    [t]
  );

  const overviewCards = useMemo(
    () =>
      (t("about.overview.cards", { returnObjects: true }) as Array<{
        title: string;
        desc: string;
        bullets?: string[];
      }>) || [],
    [t]
  );

  const globalStrengths = useMemo(
    () =>
      (t("about.global.strengths", { returnObjects: true }) as Array<{
        title: string;
        desc: string;
        bullets?: string[];
      }>) || [],
    [t]
  );

  const omniOnlineItems = useMemo(
    () => (t("about.omnichannel.online.items", { returnObjects: true }) as string[]) || [],
    [t]
  );

  const omniOfflineItems = useMemo(
    () => (t("about.omnichannel.offline.items", { returnObjects: true }) as string[]) || [],
    [t]
  );

  const diffItems = useMemo(
    () =>
      (t("about.differentiators.items", { returnObjects: true }) as Array<{
        title: string;
        desc: string;
        bullets?: string[];
      }>) || [],
    [t]
  );

  const heroStats = useMemo(
    () => (t("about.hero.stats", { returnObjects: true }) as Array<{ k: string; v: string }>) || [],
    [t]
  );

  // NOTE: keep safe for future (if you add blocks section)
  const blocks = useMemo(() => (t("about.blocks", { returnObjects: true }) as Array<any>) || [], [t]);

  return (
    <>
      <Helmet>
        <title>{t("about.seo.title")} · SHD Technology</title>
        <meta name="description" content={t("about.seo.description")} />
      </Helmet>

      {/* ================= HERO VIDEO (dark luxury + gold • FULL FRAME) ================= */}
      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 md:px-6 pt-8 md:pt-10">
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-[36px]",
              "ring-1 shadow-[0_26px_120px_-70px_rgba(0,0,0,.90)]"
            )}
            style={{
              borderColor: "rgba(184,137,44,.45)",
              boxShadow: "0 28px 120px -78px rgba(0,0,0,.92), 0 30px 120px -88px rgba(184,137,44,.28)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[2]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,.12), transparent 18%),\
                   radial-gradient(1200px 520px at 20% 0%, rgba(184,137,44,.10), transparent 55%)",
                mixBlendMode: "screen",
              }}
            />

            <div className="relative aspect-[16/9]">
              <video
                className="absolute inset-0 z-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src="/videos/about-hero.mp4" type="video/mp4" />
              </video>

              <div className="absolute inset-0 z-[1] bg-black/35" />
              <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/10 via-black/20 to-black/75" />

              <div
                className="pointer-events-none absolute -inset-x-10 -inset-y-10 z-[1] opacity-70 blur-[28px]"
                style={{
                  background:
                    "radial-gradient(520px 240px at 18% 16%, rgba(184,137,44,.30), transparent 70%),\
                     radial-gradient(520px 240px at 78% 18%, rgba(246,210,106,.20), transparent 72%),\
                     radial-gradient(680px 280px at 50% 100%, rgba(0,0,0,.55), transparent 60%)",
                }}
              />

              <div className="absolute inset-x-0 bottom-0 z-[3] p-6 md:p-10 text-white">
                <Reveal>
                  <div
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-4 py-2",
                      "bg-white/7 backdrop-blur-xl",
                      "text-xs font-extrabold tracking-[0.22em] uppercase",
                      "ring-1"
                    )}
                    style={{ borderColor: "rgba(184,137,44,.55)" }}
                  >
                    <Sparkles className="h-4 w-4" style={{ color: GOLD_VIA }} />
                    <span className="text-white/90">{t("about.hero.kicker")}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute inset-0 rounded-full opacity-70",
                        "[mask-image:linear-gradient(110deg,transparent,black,transparent)]",
                        "[mask-size:240%_100%]",
                        "animate-[goldBadgeSweep_3.6s_linear_infinite]"
                      )}
                      style={{
                        background:
                          "radial-gradient(circle at 18% 55%, rgba(255,246,214,.95) 0 1.1px, transparent 2.7px),\
                           radial-gradient(circle at 70% 40%, rgba(255,213,106,.9) 0 1.1px, transparent 2.7px),\
                           radial-gradient(circle at 88% 52%, rgba(184,137,44,.95) 0 1.1px, transparent 2.7px)",
                      }}
                    />
                  </div>

                  <style>{`
                    @keyframes goldBadgeSweep{
                      0%{ mask-position:-140% 0; -webkit-mask-position:-140% 0; }
                      100%{ mask-position:140% 0; -webkit-mask-position:140% 0; }
                    }
                  `}</style>
                </Reveal>

                <Reveal delay={90}>
                  <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
                    <span className="relative inline-block">
                      <span
                        className={cn(
                          "relative z-[3] bg-gradient-to-r bg-clip-text text-transparent",
                          "from-[#fff6d6] via-[#ffd56a] to-[#b8892c]"
                        )}
                        style={{ textShadow: "0 26px 90px rgba(184,137,44,.22)" }}
                      >
                        {t("about.hero.title")}
                      </span>

                      <style>{`
                        @keyframes heroGoldTextSweep{
                          0%{ mask-position:-180% 0; -webkit-mask-position:-180% 0; }
                          100%{ mask-position:180% 0; -webkit-mask-position:180% 0; }
                        }
                      `}</style>
                    </span>
                  </h1>
                </Reveal>

                <Reveal delay={160}>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed md:text-lg">
                    <span className="text-white/86">{t("about.hero.desc")}</span>
                  </p>
                </Reveal>

                <Reveal delay={230}>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <PrimaryBtn href="#content">{t("about.hero.ctaPrimary")}</PrimaryBtn>
                    <GoldOutlineBtn href="/contact">{t("about.hero.ctaSecondary")}</GoldOutlineBtn>
                  </div>
                </Reveal>

                <Reveal delay={300}>
                  <div className="mt-9 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
                    {heroStats.map((s, i) => (
                      <div
                        key={i}
                        className={cn(
                          "rounded-2xl px-4 py-3",
                          "bg-white/7 backdrop-blur-xl",
                          "ring-1 ring-white/10",
                          "shadow-[0_22px_90px_-70px_rgba(0,0,0,.85)]"
                        )}
                        style={{ borderColor: "rgba(184,137,44,.22)" }}
                      >
                        <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/65">{s.k}</div>
                        <div className="mt-1 text-lg font-extrabold">
                          <GoldText>{s.v}</GoldText>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHO WE ARE (article story) ================= */}
      <section id="content" className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-start">
            <Reveal className="md:col-span-8">
              <div
                className={cn(
                  "relative overflow-hidden rounded-[32px] p-7 md:p-10",
                  "bg-white",
                  "ring-1 ring-slate-200/70",
                  "shadow-[0_26px_100px_-70px_rgba(15,23,42,.16)]"
                )}
                style={{ boxShadow: "0 26px 110px -78px rgba(184,137,44,.18)" }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl opacity-70"
                  style={{ background: "rgba(246,210,106,.18)" }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full blur-3xl opacity-60"
                  style={{ background: "rgba(184,137,44,.14)" }}
                />

                <div className="relative">
                  <div className="text-sm font-extrabold tracking-[0.22em] uppercase text-slate-500">
                    {t("about.who.title")}
                  </div>

                  <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">
                    <span className="bg-gradient-to-r from-[#111827] via-[#111827] to-[#b8892c] bg-clip-text text-transparent">
                      {t("about.who.subtitle")}
                    </span>
                  </h2>

                  <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
                    {whoStory.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  <div
                    className="mt-8 h-[2px] w-24"
                    style={{ background: `linear-gradient(90deg, ${GOLD_FROM}, ${GOLD_VIA}, ${GOLD_TO})` }}
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className="md:col-span-4">
              <div className="grid gap-4">
                {whoHighlights.map((x, i) => (
                  <div
                    key={i}
                    className={cn("rounded-[26px] p-5", "bg-slate-50", "ring-1 ring-slate-200/70")}
                    style={{ boxShadow: "0 18px 70px -60px rgba(184,137,44,.18)" }}
                  >
                    <div className="text-sm font-extrabold text-slate-900">{x.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-slate-600">{x.desc}</div>

                    <div
                      className="mt-4 h-px w-10"
                      style={{ background: `linear-gradient(90deg, ${GOLD_FROM}, ${GOLD_VIA}, ${GOLD_TO})` }}
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

{/* ================= ABOUT SHD (VIDEO bg • dark gold overlays • animated gradient divider) ================= */}
<section className="relative py-24 overflow-hidden bg-black">
  <style>{`
    @keyframes aboutGoldSweep{
      0%{ mask-position:-140% 0; -webkit-mask-position:-140% 0; }
      100%{ mask-position:140% 0; -webkit-mask-position:140% 0; }
    }
    @keyframes shdLineFlow{
      0%{ background-position: 0% 50%; }
      50%{ background-position: 100% 50%; }
      100%{ background-position: 0% 50%; }
    }
  `}</style>

<video
  className="absolute inset-0 z-0 h-full w-full object-cover"
  autoPlay
  muted
  loop
  playsInline
>
  <source src="/videos/360° (6).mp4" type="video/mp4" />
</video>

  {/* ✅ Dark overlay to ensure readability */}
  <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/55" />
  <div
    aria-hidden="true"
    className="absolute inset-0 -z-10"
    style={{
      background:
        "linear-gradient(to bottom, rgba(0,0,0,.35), rgba(0,0,0,.40), rgba(0,0,0,.70))",
    }}
  />

  {/* ✅ Gold glow layers (คง mood เดิม แต่ลอยบน video) */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -inset-x-24 -top-24 -z-10 h-[520px] opacity-70 blur-3xl"
    style={{
      background:
        "radial-gradient(520px 220px at 18% 18%, rgba(184,137,44,.28), transparent 70%),\
         radial-gradient(520px 220px at 78% 16%, rgba(246,210,106,.18), transparent 72%)",
    }}
  />
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -inset-x-24 -bottom-40 -z-10 h-[560px] opacity-60 blur-3xl"
    style={{
      background:
        "radial-gradient(620px 260px at 50% 70%, rgba(184,137,44,.14), transparent 70%),\
         radial-gradient(560px 260px at 20% 88%, rgba(255,246,214,.10), transparent 72%)",
    }}
  />

  <div className="relative mx-auto max-w-6xl px-6">
    <Reveal>
      <div className="text-center">
        {/* badge */}
        <div
          className={cn(
            "mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2",
            "bg-white/5 backdrop-blur-xl",
            "text-xs font-extrabold tracking-[0.22em] uppercase",
            "ring-1"
          )}
          style={{ borderColor: "rgba(184,137,44,.50)" }}
        >
          <span className="h-2 w-2 rounded-full" style={{ background: GOLD_VIA }} />
          <span className="text-white/85">{t("about.overview.kicker")}</span>

          {/* shimmer sweep */}
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 rounded-full opacity-70",
              "[mask-image:linear-gradient(110deg,transparent,black,transparent)]",
              "[mask-size:240%_100%]",
              "animate-[aboutGoldSweep_3.6s_linear_infinite]"
            )}
            style={{
              background:
                "radial-gradient(circle at 18% 55%, rgba(255,246,214,.95) 0 1.1px, transparent 2.7px),\
                 radial-gradient(circle at 70% 40%, rgba(255,213,106,.9) 0 1.1px, transparent 2.7px),\
                 radial-gradient(circle at 88% 52%, rgba(184,137,44,.95) 0 1.1px, transparent 2.7px)",
            }}
          />
        </div>

        <h2 className="mt-6 text-3xl font-extrabold md:text-4xl">
          <span className="text-white">{t("about.overview.title")}</span>
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed md:text-base">
          <span className="text-white/75">{t("about.overview.desc")}</span>
        </p>

        {/* ✅ divider line: ไล่สี + ไหลเรื่อยๆ + glow */}
        <div className="mx-auto mt-7 h-[2px] w-24">
          <div
            className={cn(
              "h-full w-full rounded-full",
              "bg-[length:240%_100%]",
              "animate-[shdLineFlow_3.2s_ease-in-out_infinite]"
            )}
            style={{
              backgroundImage: `linear-gradient(90deg, ${GOLD_FROM}, ${GOLD_VIA}, ${GOLD_TO}, ${GOLD_VIA}, ${GOLD_FROM})`,
              boxShadow: "0 0 18px rgba(246,210,106,.22)",
            }}
          />
        </div>
      </div>
    </Reveal>

    <div className="mt-14 grid gap-6 md:grid-cols-3">
      {overviewCards.slice(0, 3).map((c, i) => {
        const icon =
          i === 0 ? (
            <Globe2 className="h-6 w-6" />
          ) : i === 1 ? (
            <Boxes className="h-6 w-6" />
          ) : (
            <Trophy className="h-6 w-6" />
          );
        return (
          <Reveal key={i} delay={i * 90}>
            <IconCard icon={icon} title={c.title} desc={c.desc} bullets={c.bullets || []} />
          </Reveal>
        );
      })}
    </div>
  </div>
</section>

{/* ================= Regions + Achievements (video cards) ================= */}
<section className="bg-white py-24">
  <style>{`
    @keyframes softFloat {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
      100% { transform: translateY(0px); }
    }
    @keyframes sheen {
      0% { transform: translateX(-120%); opacity: 0; }
      20% { opacity: .35; }
      100% { transform: translateX(120%); opacity: 0; }
    }

    /* ✅ FIX: ลบ “กรอบสี่เหลี่ยมด้านนอก” ของ VideoCard (ถ้ามาจาก wrapper class) */
    .noOuterFrame {
      background: transparent !important;
      box-shadow: none !important;
      border: 0 !important;
      outline: 0 !important;
    }
  `}</style>

  <div className="mx-auto max-w-6xl px-6">
    <Reveal>
      <SectionHeader
        kicker={t("about.global.kicker")}
        title={
          <span className="inline-flex items-baseline gap-3">
            <span>{t("about.global.title")}</span>
          </span> as any
        }
      />
    </Reveal>

<div className="mt-14 space-y-10">

      {/* ========= Strength cards ========= */}
      <Reveal delay={180}>
        <div className="grid gap-6 md:grid-cols-3">
          {globalStrengths.slice(0, 3).map((s, i) => {
            const icon =
              i === 0 ? (
                <MapPinned className="h-6 w-6" />
              ) : i === 1 ? (
                <Trophy className="h-6 w-6" />
              ) : (
                <Sparkles className="h-6 w-6" />
              );

            return (
              <div
                key={i}
                className={[
                  "group relative overflow-hidden rounded-[26px]",
                  "bg-white/60 backdrop-blur-xl",
                  "shadow-[0_26px_90px_-70px_rgba(15,23,42,.18)]",
                  "ring-1 ring-slate-200/70",
                  "transition-all duration-500 hover:-translate-y-1",
                ].join(" ")}
              >
                <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(420px_180px_at_20%_15%,rgba(15,23,42,.06),transparent_70%)]" />
                <div className="relative p-6">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-[0_16px_40px_-22px_rgba(15,23,42,.45)]">
                    {icon}
                  </div>

                  <div className="mt-4 text-[15px] font-extrabold tracking-tight text-slate-900">
                    {s.title}
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-slate-600">
                    {s.desc}
                  </div>

                  {!!(s.bullets?.length) && (
                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      {s.bullets!.slice(0, 3).map((b: string, idx: number) => (
                        <li key={idx} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900/70" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </div>
  </div>
</section>

{/* ================= Omni-channel (VIDEO BG • no images • matches reference) ================= */}
<section className="relative overflow-hidden py-24">
  {/* ===== Background video ===== */}
  <div className="absolute inset-0">
    <video
      className="h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    >
      <source src="/videos/omni-bg.mp4" type="video/mp4" />
    </video>
  </div>

  {/* ===== Content ===== */}
  <div className="relative mx-auto max-w-6xl px-6">
    <Reveal>
      <div className="text-center">
        {/* pill badge */}
        <div
          className="mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2
                     bg-white/5 backdrop-blur-xl ring-1 ring-white/15"
        >
          <span className="h-2 w-2 rounded-full" style={{ background: GOLD_VIA }} />
          <span className="text-xs font-extrabold tracking-[0.22em] uppercase text-white/85">
            {t("about.omnichannel.kicker")}
          </span>
        </div>

        <h2 className="mt-6 text-3xl font-extrabold text-white md:text-5xl">
          {t("about.omnichannel.title")}
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
          {t("about.omnichannel.desc") ||
            "เครือข่ายช่องทางขายที่เชื่อม Online และ Offline ให้เติบโตแบบวัดผลได้"}
        </p>

        {/* gold underline */}
        <div
          className="mx-auto mt-6 h-[2px] w-24 rounded-full"
          style={{ background: `linear-gradient(90deg, ${GOLD_FROM}, ${GOLD_VIA}, ${GOLD_TO})` }}
        />
      </div>
    </Reveal>

    {/* ===== Cards ===== */}
    <div className="mt-14 grid gap-6 md:grid-cols-2">
      {/* ===== Online Card ===== */}
      <Reveal>
        <div
          className="overflow-hidden rounded-[36px] bg-[#D9DDE3] ring-1 ring-white/10
                     shadow-[0_30px_120px_-90px_rgba(0,0,0,.85)]"
        >
          <div className="p-8">
            <div className="flex items-start gap-4">
              {/* gold icon chip */}
              <div
                className="grid h-12 w-12 place-items-center rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${GOLD_TO}, ${GOLD_VIA})`,
                  boxShadow: "0 18px 60px -42px rgba(184,137,44,.75)",
                }}
              >
                <Globe2 className="h-6 w-6 text-white" />
              </div>

              <div className="flex-1">
                <div className="text-xs font-extrabold tracking-[0.22em] uppercase text-slate-700/70">
                  {t("about.omnichannel.online.label")}
                </div>
                <div className="mt-2 text-2xl font-extrabold text-slate-900">
                  {t("about.omnichannel.online.title")}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-700/80">
                  {t("about.omnichannel.online.desc") ||
                    "Marketplace + Performance ที่ขับเคลื่อนด้วยระบบและข้อมูล"}
                </p>

                {/* tiny divider */}
                <div
                  className="mt-5 h-[2px] w-16 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${GOLD_FROM}, ${GOLD_VIA}, ${GOLD_TO})` }}
                />
              </div>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-slate-800/90">
              {omniOnlineItems.map((x, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 grid h-5 w-5 place-items-center rounded-full bg-white/55 ring-1 ring-black/10"
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: GOLD_TO }} />
                  </span>
                  <span>{x}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ===== Offline Card ===== */}
      <Reveal delay={90}>
        <div
          className="overflow-hidden rounded-[36px] bg-[#D9DDE3] ring-1 ring-white/10
                     shadow-[0_30px_120px_-90px_rgba(0,0,0,.85)]"
        >
          <div className="p-8">
            <div className="flex items-start gap-4">
              <div
                className="grid h-12 w-12 place-items-center rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${GOLD_TO}, ${GOLD_VIA})`,
                  boxShadow: "0 18px 60px -42px rgba(184,137,44,.75)",
                }}
              >
                <Boxes className="h-6 w-6 text-white" />
              </div>

              <div className="flex-1">
                <div className="text-xs font-extrabold tracking-[0.22em] uppercase text-slate-700/70">
                  {t("about.omnichannel.offline.label")}
                </div>
                <div className="mt-2 text-2xl font-extrabold text-slate-900">
                  {t("about.omnichannel.offline.title")}
                </div>

                <div
                  className="mt-5 h-[2px] w-16 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${GOLD_FROM}, ${GOLD_VIA}, ${GOLD_TO})` }}
                />
              </div>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-slate-800/90">
              {omniOfflineItems.map((x, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 grid h-5 w-5 place-items-center rounded-full bg-white/55 ring-1 ring-black/10"
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: GOLD_VIA }} />
                  </span>
                  <span>{x}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </div>
</section>

      {/* ================= Differentiators ================= */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <SectionHeader kicker={t("about.differentiators.kicker")} title={t("about.differentiators.title")} />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {diffItems.slice(0, 3).map((it, i) => {
              const icon = i === 0 ? <Sparkles className="h-6 w-6" /> : i === 1 ? <Boxes className="h-6 w-6" /> : <Trophy className="h-6 w-6" />;
              return (
                <Reveal key={i} delay={i * 90}>
                  <IconCard icon={icon} title={it.title} desc={it.desc} bullets={it.bullets || []} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA (dark + gold accent) ================= */}
      <section className="bg-black py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h3 className="text-3xl font-extrabold">
              <GoldText>{t("about.cta.title")}</GoldText>
            </h3>
          </Reveal>

          <Reveal delay={90}>
            <p className="mt-4 text-white/80">{t("about.cta.desc")}</p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-8 flex items-center justify-center gap-3">
              <PrimaryBtn href="/contact">{t("about.cta.button")}</PrimaryBtn>
              <GoldOutlineBtn href="/services">{t("about.cta.secondary")}</GoldOutlineBtn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}