// src/pages/ContactPage.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Copy, ArrowUpRight } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import GlassCard from "../components/GlassCard";
import MagneticButton from "../components/MagneticButton";
import TiltCard from "../components/TiltCard";

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

type EmailItem = {
  title: string;
  desc: string;
  email: string;
  subject: string;
  highlight?: boolean;
  icon: string;
};

type RevealOpts = {
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
};

function useReveal<T extends HTMLElement>(opts: RevealOpts = {}) {
  const { rootMargin = "0px 0px -12% 0px", threshold = 0.12, once = true } = opts;
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shown && once) return;

    // Reduce motion support
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { root: null, rootMargin, threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold, once, shown]);

  return { ref, shown };
}

export default function ContactPage() {
  const { t } = useTranslation();

  /* =========================
     Data from i18n
  ========================== */
  const emails = (t("contact.emails", { returnObjects: true }) || []) as EmailItem[];

  const phones =
    (t("contact.phoneSection.numbers", {
      returnObjects: true,
    }) as string[]) || [];

  const address = t("contact.addressSection.value") as string;

  const mailto = (email: string, subject: string) => `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  const mapHref = useMemo(
    () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
    [address]
  );

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 1200);
    } catch {
      // fallback: do nothing (avoid breaking UX)
      setCopiedKey(null);
    }
  };

  const HERO_IMG = "/images/contact/hero.jpg";

  // Reveal hooks
  const heroRv = useReveal<HTMLDivElement>({ rootMargin: "0px 0px -18% 0px", threshold: 0.15, once: true });
  const dirRv = useReveal<HTMLDivElement>({ rootMargin: "0px 0px -14% 0px", threshold: 0.12, once: true });
  const infoRv = useReveal<HTMLDivElement>({ rootMargin: "0px 0px -14% 0px", threshold: 0.12, once: true });

  return (
    <>
      <Helmet>
        <title>{t("contact.seo.title")} · SHD Technology</title>
        <meta name="description" content={t("contact.seo.description")} />
      </Helmet>

      {/* =========================
          Page-level micro animations (scoped)
      ========================== */}
      <style>{`
        @media (prefers-reduced-motion: reduce){
          .rv, .rv2 { opacity: 1 !important; transform: none !important; transition: none !important; }
          .floaty { animation: none !important; }
          .shine { animation: none !important; }
        }

        @keyframes shdShine {
          0% { transform: translateX(-120%) rotate(8deg); opacity: 0; }
          20% { opacity: .35; }
          100% { transform: translateX(140%) rotate(8deg); opacity: 0; }
        }

        @keyframes shdFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }

        /* reveal base */
        .rv{
          opacity: 0;
          transform: translateY(14px);
          transition: opacity .65s ease, transform .65s ease;
          will-change: opacity, transform;
        }
        .rv.is-in{
          opacity: 1;
          transform: translateY(0);
        }
        /* slightly stronger for hero */
        .rv2{
          opacity: 0;
          transform: translateY(18px);
          transition: opacity .75s ease, transform .75s ease;
          will-change: opacity, transform;
        }
        .rv2.is-in{
          opacity: 1;
          transform: translateY(0);
        }

        /* tasteful hover */
        .lift{
          transition: transform .35s ease, box-shadow .35s ease;
          will-change: transform;
        }
        .lift:hover{
          transform: translateY(-3px);
        }

        /* hero sheen */
        .shine::after{
          content: "";
          position: absolute;
          inset: -40% -60%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent);
          transform: translateX(-120%) rotate(8deg);
          animation: shdShine 7.5s ease-in-out infinite;
          pointer-events: none;
        }

        .floaty{
          animation: shdFloat 6.5s ease-in-out infinite;
        }

        /* keyboard focus */
        .focusRing:focus-visible{
          outline: none;
          box-shadow: 0 0 0 3px rgba(251,191,36,.35);
          border-radius: 9999px;
        }
      `}</style>

      {/* ========================= HERO ========================= */}
      <section className="bg-white pt-10 md:pt-12">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <div
            ref={heroRv.ref}
            className={cx(
              "rv2",
              heroRv.shown && "is-in",
              "relative overflow-hidden ring-1 ring-slate-200/70",
              "shadow-[0_30px_110px_-80px_rgba(15,23,42,.22)]"
            )}
            style={{ borderRadius: 22 }}
          >
            <div className="relative min-h-[420px]">
              <img src={HERO_IMG} alt={t("contact.hero.title")} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/10" />

              {/* subtle sheen layer */}
              <div className="absolute inset-0 shine" />

              <div className="absolute inset-0 z-10 flex items-end">
                <div className="w-full px-6 pb-6 md:px-8 md:pb-8">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[11px] font-extrabold text-white backdrop-blur">
                        {t("contact.hero.kicker")}
                      </div>

                      <h1 className="mt-3 text-xl font-extrabold text-white md:text-3xl">{t("contact.hero.title")}</h1>

                      <p className="mt-2 text-sm text-white/80 md:text-base">{t("contact.hero.desc")}</p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3">
                      <MagneticButton strength={0.2}>
                      <a
                        href={mailto(t("contact.hero.ctaPrimary.email"), t("contact.hero.ctaPrimary.subject"))}
                        className={cx(
                          "focusRing",
                          "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold",
                          "bg-amber-400 text-slate-900",
                          "transition hover:brightness-[.98]"
                        )}
                      >
                        <Mail className="h-4 w-4" />
                        {t("contact.hero.ctaPrimary.label")}
                      </a>
                      </MagneticButton>

                      <MagneticButton strength={0.2}>
                      <a
                        href={`tel:${t("contact.hero.ctaPhone.value")}`}
                        className={cx(
                          "focusRing",
                          "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold",
                          "border border-white/55 bg-white/10 text-white backdrop-blur",
                          "transition hover:bg-white/15"
                        )}
                      >
                        <Phone className="h-4 w-4" />
                        {t("contact.hero.ctaPhone.label")}
                      </a>
                      </MagneticButton>

                      <MagneticButton strength={0.2}>
                      <a
                        href={mapHref}
                        target="_blank"
                        rel="noreferrer"
                        className={cx(
                          "focusRing",
                          "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold",
                          "border border-white/55 bg-white/10 text-white backdrop-blur",
                          "transition hover:bg-white/15"
                        )}
                      >
                        <MapPin className="h-4 w-4" />
                        {t("contact.hero.ctaMap.label")}
                      </a>
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* tiny bottom divider */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================= EMAIL DIRECTORY ========================= */}
      <section className="bg-white pb-28 pt-10">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div ref={dirRv.ref} className={cx("rv", dirRv.shown && "is-in")}>
            <SectionHeader kicker={t("contact.directory.kicker")} title={t("contact.directory.title")} />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {emails.map((item, i) => {
              const k = `email:${item.email}`;
              return (
                <a
                  key={item.email}
                  href={mailto(item.email, item.subject)}
                  className={cx(
                    "group block rounded-[26px]",
                    "focus:outline-none",
                    "rv",
                    dirRv.shown && "is-in",
                    "lift"
                  )}
                  style={{ transitionDelay: dirRv.shown ? `${60 + i * 55}ms` : "0ms" }}
                >
                  <GlassCard tilt className="relative p-7 bg-white/60 backdrop-blur-2xl ring-1 ring-slate-200">
                    {/* subtle floating icon (very light) */}
                    <div className="absolute right-6 top-6 hidden md:block floaty opacity-[.08]">
                      <Mail className="h-10 w-10" />
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[16px] font-semibold text-slate-900">{item.title}</div>
                        <div className="mt-1 text-sm text-slate-600">{item.desc}</div>
                      </div>

                      <span
                        className={cx(
                          "inline-flex h-9 w-9 items-center justify-center rounded-full",
                          "text-slate-400 transition",
                          "group-hover:text-slate-900"
                        )}
                        aria-hidden="true"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-3">
                      <div className="min-w-0 truncate text-sm text-slate-500">{item.email}</div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          copyText(k, item.email);
                        }}
                        className={cx(
                          "focusRing",
                          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold",
                          "bg-white/80 ring-1 ring-slate-200 text-slate-800 backdrop-blur",
                          "transition hover:bg-white"
                        )}
                      >
                        <Copy className="h-3.5 w-3.5" />
                        {copiedKey === k ? t("contact.copy.success") : t("contact.copy.default")}
                      </button>
                    </div>
                  </GlassCard>
                </a>
              );
            })}
          </div>

          {/* ================= PHONE + ADDRESS ================= */}
          <div ref={infoRv.ref} className={cx("mt-12 grid gap-6 md:grid-cols-2 rv", infoRv.shown && "is-in")}>
            <GlassCard tilt className="p-7 bg-white/60 backdrop-blur-2xl ring-1 ring-slate-200">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[16px] font-semibold text-slate-900">{t("contact.phoneSection.title")}</div>
                  <div className="mt-1 text-sm text-slate-600">{t("contact.phoneSection.desc")}</div>
                </div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 ring-1 ring-slate-200 text-slate-700">
                  <Phone className="h-4 w-4" />
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {phones.map((phone, i) => {
                  const key = `phone:${phone}`;
                  return (
                    <div
                      key={phone}
                      className={cx("flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 ring-1 ring-slate-200")}
                      style={{ transitionDelay: infoRv.shown ? `${60 + i * 40}ms` : "0ms" }}
                    >
                      <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-sm font-semibold text-slate-900">
                        {phone}
                      </a>
                      <button
                        type="button"
                        onClick={() => copyText(key, phone)}
                        className={cx(
                          "focusRing",
                          "text-xs font-semibold text-slate-700",
                          "transition hover:text-slate-900"
                        )}
                      >
                        {copiedKey === key ? t("contact.copy.success") : t("contact.copy.default")}
                      </button>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            <GlassCard tilt className="p-7 bg-white/60 backdrop-blur-2xl ring-1 ring-slate-200">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[16px] font-semibold text-slate-900">{t("contact.addressSection.title")}</div>
                  <div className="mt-1 text-sm text-slate-600">{t("contact.addressSection.desc")}</div>
                </div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 ring-1 ring-slate-200 text-slate-700">
                  <MapPin className="h-4 w-4" />
                </span>
              </div>

              <div className="mt-6 text-sm leading-relaxed text-slate-700">{address}</div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => copyText("address", address)}
                  className={cx(
                    "focusRing",
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold",
                    "bg-white/80 ring-1 ring-slate-200 text-slate-800 backdrop-blur",
                    "transition hover:bg-white"
                  )}
                >
                  <Copy className="h-4 w-4" />
                  {copiedKey === "address" ? t("contact.copy.success") : t("contact.addressSection.copy")}
                </button>

                <a
                  href={mailto(t("contact.hero.ctaPrimary.email"), t("contact.hero.ctaPrimary.subject"))}
                  className={cx(
                    "focusRing",
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold",
                    "bg-white/80 ring-1 ring-slate-200 text-slate-800 backdrop-blur",
                    "transition hover:bg-white"
                  )}
                >
                  <Mail className="h-4 w-4" />
                  {t("contact.addressSection.emailCta")}
                </a>

                <a
                  href={mapHref}
                  target="_blank"
                  rel="noreferrer"
                  className={cx(
                    "focusRing",
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold",
                    "bg-white/80 ring-1 ring-slate-200 text-slate-800 backdrop-blur",
                    "transition hover:bg-white"
                  )}
                >
                  <MapPin className="h-4 w-4" />
                  {t("contact.addressSection.cta")}
                </a>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </>
  );
}