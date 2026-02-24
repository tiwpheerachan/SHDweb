// src/components/Navbar.tsx
import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Globe2 } from "lucide-react";
import LanguageSwitch from "./LanguageSwitch";

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

/**
 * ✅ FIX (คงเดิม 100% + ขยายโลโก้)
 * - Home + ยังไม่ scroll: โปร่งใสทับ hero (เหมือนเดิม)
 * - ✅ ปิด hover effect ทั้งหมด: เอาเม้าส์โดน navbar แล้ว "ต้องไม่เปลี่ยนสี/ไม่ขาว"
 * - Active link ตอน top: เป็นเส้นวง (ring) ไม่เติมพื้นขาว
 * - Scroll แล้ว/หน้าอื่น: เป็น glass pill แบบเดิม
 *
 * ✅ Update:
 * - Careers ลิ้งออกไปยัง http://careers.shd-technology.co.th (external link)
 */
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
      // ✅ external
      { to: CAREERS_URL, label: t("nav.careers"), external: true as const },
      { to: "/contact", label: t("nav.contact") },
    ],
    [t]
  );

  const isHome = location.pathname === "/";
  const isContactPage = location.pathname === "/contact";

  // ===== scroll =====
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ โหมดแบบ "คงเดิม 100%" (ไม่มี hover)
  // - non-home: glass always
  // - home:
  //    top: transparent
  //    scrolled: glass
  type Mode = "glass" | "top";
  const mode: Mode = !isHome ? "glass" : scrolled ? "glass" : "top";

  // header positioning
  const topHeroMode = isHome && mode === "top";

  // ===== mobile drawer =====
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // ===== styles =====
  const outerPad = "py-0.5 md:py-1";
  const floatingWrap = cn("mx-auto w-full max-w-6xl px-3 md:px-6", "pointer-events-none");

  const smoothPill = cn(
    "transition-[background-color,box-shadow,transform,backdrop-filter,border-color] duration-300 ease-out",
    "will-change-[transform,backdrop-filter,box-shadow]",
    "motion-reduce:transition-none motion-reduce:transform-none"
  );

  // ✅ glass ตอน scroll/หน้าอื่น
  const glassPill = cn(
    "backdrop-blur-2xl",
    "bg-white/58",
    "ring-1 ring-white/75",
    "shadow-[0_18px_70px_-42px_rgba(15,23,42,0.30)]"
  );

  const pillFrame = cn(
    "pointer-events-auto",
    "relative flex items-center justify-between gap-2 md:gap-4",
    "rounded-full",
    "px-2.5 py-1.5 md:px-3.5 md:py-2",
    smoothPill,
    mode === "glass" ? glassPill : "bg-transparent ring-0 shadow-none"
  );

  const desktopLinkBase = cn(
    "relative inline-flex items-center justify-center",
    "rounded-full",
    "px-3 py-1.5 md:px-4 md:py-2",
    "text-sm font-semibold select-none",
    "transition-[color,background-color,box-shadow,transform,border-color] duration-200 ease-out"
  );

  // ✅ Active ตอน top: เป็น ring ขาว (ไม่เติมพื้น)
  const desktopLinkClass = (isActive: boolean) =>
    cn(
      desktopLinkBase,
      mode === "glass"
        ? cn(
            "text-slate-700/90",
            "hover:bg-white/45 hover:ring-1 hover:ring-white/65",
            "hover:shadow-[0_18px_60px_-36px_rgba(79,70,229,0.16)]"
          )
        : cn(
            "text-slate-900/90",
            // top mode: hover ไม่ทำให้ขาวทึบ (ยังให้ feedback บางๆได้ แต่ไม่ fill)
            "hover:bg-white/0 hover:ring-1 hover:ring-white/35",
            "hover:backdrop-blur-xl"
          ),
      isActive &&
        (mode === "glass"
          ? "bg-white/62 text-slate-900 ring-1 ring-white/75 shadow-[0_20px_70px_-44px_rgba(79,70,229,0.16)]"
          : cn("bg-white/0 ring-1 ring-white/80 text-slate-900"))
    );

  const contactCtaClass = (m: Mode) =>
    cn(
      "inline-flex items-center justify-center rounded-full",
      "px-4 py-1.5 md:py-2",
      "text-sm font-semibold select-none",
      "transition-[background-color,box-shadow,transform,color,border-color] duration-200 ease-out",
      m === "glass"
        ? cn("bg-indigo-600 text-white hover:bg-indigo-700", "shadow-[0_18px_70px_-42px_rgba(79,70,229,0.45)]")
        : cn(
            // top: ไม่มีพื้นขาว
            "bg-white/0 text-slate-900/95",
            "ring-1 ring-white/35",
            "hover:ring-white/55 hover:backdrop-blur-xl"
          ),
      isContactPage && "opacity-60 pointer-events-none"
    );

  const iconBtn = (m: Mode) =>
    cn(
      "inline-flex items-center justify-center",
      "h-9 w-9 md:h-10 md:w-10 rounded-full",
      "transition-[background-color,box-shadow,transform,border-color] duration-200 ease-out",
      m === "glass"
        ? cn("bg-white/40 backdrop-blur-xl ring-1 ring-white/70", "hover:bg-white/55")
        : cn("bg-white/0", "ring-1 ring-white/30", "hover:ring-white/55 hover:backdrop-blur-xl")
    );

  const langLabel = (lng: string) => (lng === "th" ? "TH" : lng === "zh" ? "中文" : "EN");

  const setLang = async (lng: "th" | "en" | "zh") => {
    await i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  // ✅ wrapper ของ LanguageSwitch: top mode ไม่ทำพื้นขาว
  const langWrapClass = cn(
    "rounded-full p-1 transition-[background-color,box-shadow,border-color] duration-200 ease-out",
    mode === "glass"
      ? "bg-white/38 backdrop-blur-xl ring-1 ring-white/70"
      : "bg-white/0 ring-1 ring-white/30 hover:ring-white/55 backdrop-blur-xl"
  );

  return (
    <header className={cn("top-0 z-50 w-full", topHeroMode ? "absolute" : "sticky")}>
      {/* ✅ ไม่มี onMouseEnter/Leave แล้ว (คงเดิม 100%) */}
      <div className="relative">
        <div className={cn("containerX", outerPad)}>
          {/* glass mode ใช้ floating wrap ให้ดูเป็น pill ลอย */}
          <div className={mode === "glass" ? floatingWrap : ""}>
            <div className={pillFrame}>
              {/* Logo (✅ ขยายโลโก้) */}
              <NavLink to="/" className="relative flex items-center">
                <img
                  src="/images/logo.png"
                  alt="SHD"
                  // ✅ เดิม h-9 w-9 / md:h-10 md:w-10 -> เพิ่มให้ใหญ่ขึ้น
                  className="h-11 w-11 md:h-12 md:w-12 object-contain"
                  draggable={false}
                />
              </NavLink>

              {/* Desktop nav */}
              <nav className="relative hidden md:flex items-center gap-1">
                {links.map((l) => {
                  if ((l as any).external) {
                    // ✅ External Careers link — keep exact same styling (no active state)
                    return (
                      <a
                        key={l.to}
                        href={l.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={desktopLinkClass(false)}
                      >
                        {l.label}
                      </a>
                    );
                  }

                  return (
                    <NavLink key={l.to} to={l.to} className={({ isActive }) => desktopLinkClass(isActive)}>
                      {l.label}
                    </NavLink>
                  );
                })}
              </nav>

              {/* Right controls (desktop) */}
              <div className="relative hidden md:flex items-center gap-2">
                <div className={langWrapClass}>
                  <LanguageSwitch />
                </div>

                <NavLink to="/contact" className={contactCtaClass(mode)}>
                  {t("nav.contact")}
                </NavLink>
              </div>

              {/* Mobile (one-row only) */}
              <div className="relative flex items-center gap-2 md:hidden">
                <button
                  type="button"
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  className={iconBtn(mode)}
                  onClick={() => setMobileOpen((v) => !v)}
                >
                  {mobileOpen ? <X className="h-5 w-5 text-slate-800" /> : <Menu className="h-5 w-5 text-slate-800" />}
                </button>

                <div className="relative">
                  <button
                    type="button"
                    aria-label="Language"
                    className={iconBtn(mode)}
                    onClick={() => setLangOpen((v) => !v)}
                  >
                    <Globe2 className="h-5 w-5 text-slate-800" />
                  </button>

                  {langOpen ? (
                    <div
                      className={cn(
                        "absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-2xl",
                        "bg-white/75 backdrop-blur-2xl ring-1 ring-white/80",
                        "shadow-[0_22px_80px_-46px_rgba(15,23,42,0.35)]"
                      )}
                    >
                      {(["th", "en", "zh"] as const).map((lng) => {
                        const active = i18n.resolvedLanguage === lng || i18n.language === lng;
                        return (
                          <button
                            key={lng}
                            type="button"
                            onClick={() => setLang(lng)}
                            className={cn(
                              "w-full px-4 py-3 text-left text-sm font-semibold transition",
                              active ? "bg-indigo-600 text-white" : "text-slate-800 hover:bg-white/60"
                            )}
                          >
                            {langLabel(lng)}
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>

                <NavLink to="/contact" className={contactCtaClass(mode)}>
                  {t("nav.contact")}
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen ? (
          <div className="fixed inset-0 z-[60] md:hidden">
            <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />

            <div
              className={cn(
                "absolute left-1/2 top-3 w-[min(560px,calc(100%-24px))] -translate-x-1/2",
                "rounded-[28px] overflow-hidden",
                "bg-white/75 backdrop-blur-2xl ring-1 ring-white/80",
                "shadow-[0_26px_90px_-52px_rgba(15,23,42,0.45)]"
              )}
            >
              <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-3">
                  {/* ✅ ขยายโลโก้ใน drawer ด้วย */}
                  <img src="/images/logo.png" alt="SHD" className="h-12 w-12 object-contain" draggable={false} />
                  <div className="text-sm font-extrabold text-slate-900">{t("common.menu") || "Menu"}</div>
                </div>

                <button
                  type="button"
                  aria-label="Close menu"
                  className="h-10 w-10 rounded-full bg-white/55 ring-1 ring-white/70 flex items-center justify-center"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5 text-slate-800" />
                </button>
              </div>

              <div className="px-4 pb-4">
                <div className="grid grid-cols-2 gap-2">
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
                          className={cn(
                            "rounded-2xl px-4 py-3 text-sm font-semibold transition",
                            "ring-1 ring-white/70",
                            "bg-white/55 text-slate-800 hover:bg-white/75"
                          )}
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
                          "ring-1 ring-white/70",
                          active
                            ? "bg-indigo-600 text-white shadow-[0_18px_60px_-40px_rgba(79,70,229,0.45)]"
                            : "bg-white/55 text-slate-800 hover:bg-white/75"
                        )}
                      >
                        {l.label}
                      </NavLink>
                    );
                  })}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <NavLink
                    to="/contact"
                    className={cn(
                      "flex-1 rounded-2xl px-4 py-3 text-center text-sm font-extrabold",
                      "bg-indigo-600 text-white",
                      "shadow-[0_18px_60px_-40px_rgba(79,70,229,0.45)]"
                    )}
                  >
                    {t("nav.contact")}
                  </NavLink>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-semibold",
                      "bg-white/55 text-slate-800 ring-1 ring-white/70",
                      "hover:bg-white/75 transition"
                    )}
                  >
                    Top
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}