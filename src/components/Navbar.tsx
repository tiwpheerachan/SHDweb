// src/components/Navbar.tsx
import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Globe2 } from "lucide-react";

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const CAREERS_URL = "http://careers.shd-technology.co.th";

  const links = useMemo(
    () => [
      { to: "/", label: t("nav.home") },
      { to: "/about", label: t("nav.about") },
      { to: "/brands", label: t("nav.brands") },
      { to: "/services", label: t("nav.services") },
      { to: CAREERS_URL, label: t("nav.careers"), external: true as const },
      { to: "/contact", label: t("nav.contact") },
    ],
    [t]
  );

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setLangOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const langLabel = (lng: string) => (lng === "th" ? "TH" : lng === "zh" ? "中文" : "EN");
  const setLang = async (lng: "th" | "en" | "zh") => {
    await i18n.changeLanguage(lng);
    setLangOpen(false);
  };
  const activeLang = i18n.resolvedLanguage || i18n.language || "en";

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative inline-flex items-center rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
      isActive ? "text-ink" : "text-ink/60 hover:text-ink"
    );

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className={cn("transition-all duration-300", scrolled ? "py-2" : "py-3")}>
        <div className="mx-auto w-full max-w-6xl px-3 md:px-6">
          <div
            className={cn(
              "flex items-center justify-between gap-2 rounded-full px-3 py-2 md:px-4",
              "bg-white/85 backdrop-blur-xl ring-1 ring-ink/[0.06]",
              scrolled ? "shadow-[0_18px_50px_-34px_rgba(11,11,15,0.35)]" : "shadow-none"
            )}
          >
            {/* Logo */}
            <NavLink to="/" className="flex items-center" aria-label="SHD Technology">
              <img
                src="/images/logo.png"
                alt="SHD Technology"
                className="h-7 w-auto md:h-8 object-contain"
                draggable={false}
              />
            </NavLink>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-0.5 md:flex">
              {links.map((l) =>
                (l as any).external ? (
                  <a
                    key={l.to}
                    href={l.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full px-3.5 py-2 text-sm font-semibold text-ink/60 transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                ) : (
                  <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"}>
                    {l.label}
                  </NavLink>
                )
              )}
            </nav>

            {/* Right controls */}
            <div className="hidden items-center gap-2 md:flex">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLangOpen((v) => !v)}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ink/70 ring-1 ring-ink/10 transition hover:text-ink hover:ring-ink/20"
                >
                  <Globe2 className="h-4 w-4" />
                  {langLabel(activeLang)}
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-12 z-50 w-36 overflow-hidden rounded-2xl bg-white shadow-[0_22px_60px_-30px_rgba(11,11,15,0.35)] ring-1 ring-ink/10">
                    {(["th", "en", "zh"] as const).map((lng) => {
                      const active = activeLang === lng;
                      return (
                        <button
                          key={lng}
                          type="button"
                          onClick={() => setLang(lng)}
                          className={cn(
                            "w-full px-4 py-2.5 text-left text-sm font-semibold transition",
                            active ? "bg-brand text-white" : "text-ink/80 hover:bg-paper"
                          )}
                        >
                          {langLabel(lng)}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <NavLink
                to="/contact"
                className="inline-flex items-center rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5"
              >
                {t("nav.contact")}
              </NavLink>
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                aria-label="Language"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-ink/10 text-ink"
                onClick={() => setLangOpen((v) => !v)}
              >
                <Globe2 className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white"
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              {langOpen && (
                <div className="absolute right-4 top-16 z-50 w-36 overflow-hidden rounded-2xl bg-white shadow-[0_22px_60px_-30px_rgba(11,11,15,0.35)] ring-1 ring-ink/10">
                  {(["th", "en", "zh"] as const).map((lng) => {
                    const active = activeLang === lng;
                    return (
                      <button
                        key={lng}
                        type="button"
                        onClick={() => setLang(lng)}
                        className={cn(
                          "w-full px-4 py-2.5 text-left text-sm font-semibold transition",
                          active ? "bg-brand text-white" : "text-ink/80 hover:bg-paper"
                        )}
                      >
                        {langLabel(lng)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-1/2 top-3 w-[min(560px,calc(100%-24px))] -translate-x-1/2 overflow-hidden rounded-[28px] bg-white shadow-[0_26px_80px_-40px_rgba(11,11,15,0.5)] ring-1 ring-ink/10">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                <img src="/images/logo.png" alt="SHD Technology" className="h-7 w-auto object-contain" draggable={false} />
              </div>
              <button
                type="button"
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 px-4 pb-4">
              {links.map((l) => {
                const isExternal = (l as any).external;
                const active = !isExternal && location.pathname === l.to;
                if (isExternal) {
                  return (
                    <a
                      key={l.to}
                      href={l.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-2xl bg-paper px-4 py-3 text-sm font-semibold text-ink"
                      onClick={() => setMobileOpen(false)}
                    >
                      {l.label}
                    </a>
                  );
                }
                return (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-semibold transition",
                      active ? "bg-brand text-white" : "bg-paper text-ink"
                    )}
                  >
                    {l.label}
                  </NavLink>
                );
              })}
              <NavLink
                to="/contact"
                className="col-span-2 rounded-2xl bg-ink px-4 py-3 text-center text-sm font-bold text-white"
              >
                {t("nav.contact")}
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
