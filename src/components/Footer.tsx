import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Linkedin } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

export default function Footer() {
  const { t } = useTranslation();

  const links = useMemo(
    () => [
      { to: "/", label: t("nav.home") },
      { to: "/about", label: t("nav.about") },
      { to: "/brands", label: t("nav.brands") },
      { to: "/services", label: t("nav.services") },
      { to: "/activities", label: t("nav.activities") },
      { to: "/careers", label: t("nav.careers") },
      { to: "/contact", label: t("nav.contact") },
    ],
    [t]
  );

  const socials = useMemo<Array<{ key: string; label: string; href: string; src?: string; linkedin?: boolean }>>(
    () => [
      { key: "line", label: "LINE", href: "https://line.me/R/ti/p/@863efexq", src: "/images/social/line.png" },
      { key: "facebook", label: "Facebook", href: "https://www.facebook.com/shdtechnology", src: "/images/contact/facebook.png" },
      { key: "instagram", label: "Instagram", href: "https://www.instagram.com/shdtechnology", src: "/images/social/instagram.png" },
      { key: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@shdtechnology", src: "/images/contact/tiktok.png" },
      { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/shd-technology-co-th", linkedin: true },
    ],
    []
  );

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    if (!email || !email.includes("@")) return setStatus("error");
    setEmail("");
    setStatus("ok");
  }

  return (
    <footer className="mt-20 bg-ink text-white">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-16">
        <RevealOnScroll>
          <div className="grid gap-12 md:grid-cols-[1.2fr_.8fr] md:items-start">
            {/* LEFT */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <img src="/images/logo.png" alt="SHD Technology" className="h-12 w-12 object-contain" draggable={false} />
                <div>
                  <div className="font-display text-xl font-extrabold tracking-tight">SHD Technology</div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Co., Ltd.</div>
                </div>
              </div>

              <p className="max-w-md text-sm leading-relaxed text-white/60">
                {t("footer.tagline") ||
                  "A dedicated regional solutions partner. Since 2013 we drive brand localization and full-cycle growth across Southeast Asia, Latin America and the Middle East."}
              </p>

              {/* Newsletter */}
              <form onSubmit={onSubmit} className="max-w-md">
                <div className="text-sm font-semibold text-white">
                  {t("footer.newsletterTitle") || "Subscribe to our newsletter"}
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-full bg-white/[0.06] px-2 py-2 ring-1 ring-white/12 focus-within:ring-sun/60">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder={t("footer.emailPlaceholder") || "Your email address"}
                    className="w-full bg-transparent px-3 text-sm text-white placeholder:text-white/40 outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sun text-ink transition hover:brightness-105"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 min-h-[18px] text-xs">
                  {status === "ok" && <span className="text-sun">{t("footer.subscribed") || "Subscribed. Thank you!"}</span>}
                  {status === "error" && <span className="text-red-400">{t("footer.invalidEmail") || "Please enter a valid email."}</span>}
                </div>
              </form>

              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-white/12 transition hover:-translate-y-0.5 hover:ring-sun/60"
                    aria-label={s.label}
                    title={s.label}
                  >
                    {s.linkedin ? (
                      <span className="grid h-full w-full place-items-center bg-[#0A66C2]">
                        <Linkedin className="h-5 w-5 text-white" fill="white" />
                      </span>
                    ) : (
                      <img src={s.src} alt={s.label} className="h-full w-full object-cover" draggable={false} />
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Navigate</div>
                <div className="mt-4 grid gap-2.5">
                  {links.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      className="text-sm text-white/65 transition-colors hover:text-white"
                    >
                      {l.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Headquarters</div>
                <div className="mt-4 space-y-2 text-sm text-white/65">
                  <div>Shenzhen, China</div>
                  <div>Regional hubs · Thailand · Indonesia</div>
                  <div>the.dataverse@shd-technology.co.th</div>
                </div>
                <NavLink
                  to="/contact"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-sun px-5 py-2.5 text-sm font-bold text-ink transition hover:-translate-y-0.5"
                >
                  {t("footer.cta") || "Schedule a call"}
                  <ArrowRight className="h-4 w-4" />
                </NavLink>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="mt-14 h-px w-full bg-white/10" />

        <div className="mt-6 flex flex-col gap-3 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} SHD Technology Co., Ltd. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <NavLink to="/about" className="hover:text-white/80">{t("nav.about")}</NavLink>
            <NavLink to="/brands" className="hover:text-white/80">{t("nav.brands")}</NavLink>
            <NavLink to="/contact" className="hover:text-white/80">{t("nav.contact")}</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
