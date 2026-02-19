import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";

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

const socials = useMemo(
  () => [
    {
      key: "facebook",
      label: "Facebook",
      href: "https://facebook.com/yourpage", // เปลี่ยนเป็นลิงก์จริง
      src: "/images/social/facebook.png",
    },
    {
      key: "instagram",
      label: "Instagram",
      href: "https://instagram.com/yourpage",
      src: "/images/social/instagram.png",
    },
    {
      key: "line",
      label: "LINE",
      href: "https://line.me/ti/p/yourid",
      src: "/images/social/line.png",
    },
  ],
  []
);


  // ✅ อีเมลจะ “ส่งไปที่ info@... โดยไม่แสดงใน UI”
  // วิธี: ใช้ form submit ไปที่ endpoint ของคุณ หรือ service อย่าง Formspree / Netlify Forms
  // ตอนนี้ใส่เป็น placeholder action="#" ให้คุณไปผูก backend เอง
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");

    // TODO:
    // 1) เปลี่ยน URL เป็น endpoint ของคุณ เช่น "/api/newsletter"
    // 2) backend เป็นคนส่งเมลไป info@shd-technology.co.th
    //    (ฝั่ง UI จะไม่โชว์ info@... ตามที่ต้องการ)
    try {
      // ตัวอย่างเรียก API (คุณสร้างเอง)
      // const res = await fetch("/api/newsletter", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });
      // if (!res.ok) throw new Error("bad");

      // mock success:
      if (!email || !email.includes("@")) throw new Error("bad");
      setEmail("");
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  const linkClass =
    "text-sm text-slate-600 hover:text-slate-900 transition-colors";
  const activeLinkClass = "text-sm text-slate-900 font-semibold";

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="containerX py-14">
        {/* =========================
            TOP GRID (เหมือน ref แต่พื้นหลังขาว)
           ========================= */}
        <div className="grid gap-10 md:grid-cols-[1.25fr_.9fr] md:items-start">
          {/* LEFT: Newsletter + Social */}
          <div className="flex flex-col gap-6">
            {/* Logo area (พื้นที่สำหรับ logo บริษัท) */}
{/* Logo (ใหญ่ขึ้น / ไม่มีกรอบ) */}
<div className="flex items-center">
  <img
    src="/images/logo.png"
    alt="SHD Technology"
    className="h-16 w-16 object-contain md:h-20 md:w-20"
    loading="lazy"
    draggable={false}
  />
</div>


            {/* Newsletter text */}
            <div className="max-w-md">
              <div className="text-sm font-semibold text-slate-900">
                {t("footer.newsletterTitle") || "Subscribe to our newsletter"}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t("footer.newsletterDesc") ||
                  "Get updates, highlights, and exclusive news from SHD."}
              </p>
            </div>

            {/* Email input minimalist + arrow */}
            <form onSubmit={onSubmit} className="max-w-md">
              <label className="sr-only" htmlFor="footer-email">
                Email
              </label>

              <div
                className={cn(
                  "group flex items-center gap-3",
                  "rounded-2xl bg-white",
                  "ring-1 ring-slate-200",
                  "px-4 py-3",
                  "focus-within:ring-2 focus-within:ring-amber-300/60",
                  "transition"
                )}
              >
                <input
                  id="footer-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={t("footer.emailPlaceholder") || "Your email address"}
                  className={cn(
                    "w-full bg-transparent outline-none",
                    "text-sm text-slate-900 placeholder:text-slate-400"
                  )}
                />

                <button
                  type="submit"
                  className={cn(
                    "shrink-0 inline-flex items-center justify-center",
                    "h-10 w-10 rounded-full",
                    "ring-1 ring-amber-200/70",
                    "bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300",
                    "text-slate-900",
                    "shadow-[0_10px_30px_-18px_rgba(245,158,11,0.85)]",
                    "hover:brightness-[1.03] active:brightness-[0.98] transition"
                  )}
                  aria-label="Submit email"
                  title="Submit"
                >
                  {/* arrow icon (pure CSS) */}
                  <span className="block translate-x-[0.5px] text-[18px] leading-none">
                    →
                  </span>
                </button>
              </div>

              {/* status */}
              <div className="mt-2 min-h-[18px] text-xs">
                {status === "ok" && (
                  <span className="text-emerald-600">
                    {t("footer.subscribed") || "Subscribed. Thank you!"}
                  </span>
                )}
                {status === "error" && (
                  <span className="text-rose-600">
                    {t("footer.invalidEmail") || "Please enter a valid email."}
                  </span>
                )}
              </div>
            </form>

<div className="flex items-center gap-4">
  {socials.map((s) => (
    <a
      key={s.key}
      href={s.href}
      target="_blank"
      rel="noreferrer"
      className="group flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-slate-200 transition hover:ring-amber-300 hover:shadow-[0_12px_40px_-25px_rgba(245,158,11,0.7)]"
      aria-label={s.label}
      title={s.label}
    >
      <img
        src={s.src}
        alt={s.label}
        className="h-full w-full object-cover transition group-hover:scale-110"
        draggable={false}
      />
    </a>
  ))}
</div>

          </div>

          {/* RIGHT: CTA + Links */}
          <div className="flex flex-col gap-8 md:items-end">
            {/* CTA Button (ทองไล่สี) */}
            <div className="w-full md:w-auto">
              <NavLink
                to="/contact"
                className={cn(
                  "inline-flex items-center justify-center",
                  "h-11 px-5 rounded-full",
                  "text-sm font-semibold text-slate-900",
                  "bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300",
                  "ring-1 ring-amber-200/70",
                  "shadow-[0_18px_60px_-35px_rgba(245,158,11,0.85)]",
                  "hover:brightness-[1.03] active:brightness-[0.98] transition"
                )}
              >
                {t("footer.cta") || "Schedule a call"}
              </NavLink>
            </div>

            {/* Links columns */}
            <div className="grid w-full gap-8 sm:grid-cols-2 md:w-auto">
              <div>
                <div className="text-xs font-extrabold tracking-wide text-slate-900">
                  {t("common.section.title") || "Navigation"}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
                  {links.slice(0, 6).map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      className={({ isActive }) =>
                        cn(isActive ? activeLinkClass : linkClass)
                      }
                    >
                      {l.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-extrabold tracking-wide text-slate-900">
                  {t("footer.rights") || "Company"}
                </div>
                <div className="mt-3 grid gap-2">
                  {links.slice(6).map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      className={({ isActive }) =>
                        cn(isActive ? activeLinkClass : linkClass)
                      }
                    >
                      {l.label}
                    </NavLink>
                  ))}

                  <NavLink to="/brands" className={linkClass}>
                    {t("brands.hero.ctaPrimary") || "View brands"}
                  </NavLink>
                  <NavLink to="/careers" className={linkClass}>
                    {t("home.hero.ctaSecondary") || "Join our team"}
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider (บางๆ เรียบๆ) */}
        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* =========================
            BOTTOM ROW
           ========================= */}
        <div className="mt-6 flex flex-col gap-3 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} SHD Technology Co., Ltd.</div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <NavLink
              to="/contact"
              className="hover:text-slate-800 transition-colors"
            >
              {t("nav.contact")}
            </NavLink>
            <NavLink
              to="/about"
              className="hover:text-slate-800 transition-colors"
            >
              {t("nav.about")}
            </NavLink>
            <NavLink
              to="/careers"
              className="hover:text-slate-800 transition-colors"
            >
              {t("nav.careers")}
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
