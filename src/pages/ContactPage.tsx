// src/pages/ContactPage.tsx
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Copy, ArrowUpRight, Check, Linkedin, Clock, Globe2, ShieldCheck } from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

const PRIMARY_EMAIL = "the.dataverse@shd-technology.co.th";

type EmailItem = { title: string; desc: string; email: string; subject: string };
type Social = { name: string; platform: string; url: string; img?: string; linkedin?: boolean };

const SOCIALS: Social[] = [
  { name: "Apply for work", platform: "LINE Official", url: "https://line.me/R/ti/p/@863efexq", img: "/images/social/line.png" },
  { name: "SHD — Technology Career", platform: "Facebook", url: "https://www.facebook.com/profile.php?id=61590556547239&locale=th_TH", img: "/images/contact/facebook.png" },
  { name: "SHD Space — Life at SHD", platform: "Facebook", url: "https://www.facebook.com/shdtechnology", img: "/images/contact/facebook.png" },
  { name: "SHD Space — Life at SHD", platform: "Instagram", url: "https://www.instagram.com/shdtechnology", img: "/images/social/instagram.png" },
  { name: "SHD เทคไปเรื่อย", platform: "TikTok", url: "https://www.tiktok.com/@shdtechnology", img: "/images/contact/tiktok.png" },
  { name: "SHD Technology Thailand", platform: "LinkedIn", url: "https://www.linkedin.com/company/shd-technology-co-th", linkedin: true },
];

function SocialIcon({ s, size = "h-11 w-11" }: { s: Social; size?: string }) {
  if (s.linkedin) {
    return (
      <span className={cx("grid shrink-0 place-items-center rounded-full bg-[#0A66C2]", size)}>
        <Linkedin className="h-5 w-5 text-white" fill="white" />
      </span>
    );
  }
  return (
    <span className={cx("grid shrink-0 place-items-center overflow-hidden rounded-full ring-1 ring-ink/[0.06]", size)}>
      <img src={s.img} alt="" aria-hidden="true" className="h-full w-full object-cover" draggable={false} />
    </span>
  );
}

export default function ContactPage() {
  const { t } = useTranslation();

  const EMAIL_SUBJECTS = [
    "Enquiry — SHD Technology",
    "Brand partnership — SHD Technology",
    "Careers — SHD Technology",
  ];
  const i18nEmails = (t("pg.contact.emails", { returnObjects: true }) as Array<{ title: string; desc: string }>) || [];
  const emails: EmailItem[] = (Array.isArray(i18nEmails) ? i18nEmails : []).map((e, i) => ({
    title: e.title,
    desc: e.desc,
    email: PRIMARY_EMAIL,
    subject: EMAIL_SUBJECTS[i] || EMAIL_SUBJECTS[0],
  }));

  const trust = (t("pg.contact.trust", { returnObjects: true }) as Array<{ title: string; desc: string }>) || [];
  const trustIcons = [Clock, Globe2, ShieldCheck];

  const phones = ((t("contact.phoneSection.numbers", { returnObjects: true }) as string[]) || []).filter(Boolean);
  const address = (t("contact.addressSection.value") as string) || "Shenzhen, China · Regional hubs in Thailand & Indonesia";

  const mailto = (email: string, subject: string) => `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  const mapHref = useMemo(() => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, [address]);

  const [copied, setCopied] = useState<string | null>(null);
  const copyText = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      setCopied(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact · SHD Technology</title>
        <meta name="description" content="Get in touch with SHD Technology — brand localization and full-cycle growth across emerging markets." />
      </Helmet>

      {/* ============ HERO + FOLLOW ============ */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/[0.1] blur-3xl" />
          <div className="absolute right-[8%] top-40 h-80 w-80 rounded-full bg-sun/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 md:px-6 pt-10 md:pt-16 pb-16 md:pb-24">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            {/* LEFT — copy + trust */}
            <RevealOnScroll>
              <div className="lg:pt-4">
                <div className="chip-label">{t("pg.contact.chip")}</div>
                <h1 className="mt-6 max-w-lg font-display text-[2.6rem] font-extrabold leading-[1.03] tracking-tight text-ink md:text-6xl">
                  {t("pg.contact.heroPre")} <span className="hl-blue">{t("pg.contact.heroHl")}</span> {t("pg.contact.heroPost")}
                </h1>
                <p className="mt-6 max-w-md text-base leading-relaxed text-ink/60 md:text-lg">{t("pg.contact.heroDesc")}</p>

                <div className="mt-9 grid gap-4 sm:max-w-md">
                  {trust.map((r, i) => {
                    const Icon = trustIcons[i];
                    return (
                      <div key={i} className="flex items-start gap-3.5">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="font-semibold text-ink">{r.title}</div>
                          <div className="text-sm text-ink/55">{r.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => copyText("hero-email", PRIMARY_EMAIL)}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/10 transition hover:-translate-y-0.5 hover:ring-ink/20"
                  >
                    {copied === "hero-email" ? <Check className="h-4 w-4 text-brand" /> : <Mail className="h-4 w-4 text-brand" />}
                    {copied === "hero-email" ? (t("pg.contact.copied") as string) : PRIMARY_EMAIL}
                  </button>
                  <a href={mapHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/10 transition hover:-translate-y-0.5 hover:ring-ink/20">
                    <MapPin className="h-4 w-4 text-brand" /> {t("pg.contact.shenzhenHq")}
                  </a>
                </div>
              </div>
            </RevealOnScroll>

            {/* RIGHT — Follow SHD directory */}
            <RevealOnScroll delay={120}>
              <div className="overflow-hidden rounded-[2rem] bg-white ring-1 ring-ink/[0.07] shadow-[0_40px_100px_-55px_rgba(11,11,15,0.3)]">
                <div className="relative overflow-hidden bg-gradient-to-br from-brand to-brand-700 px-7 py-8 text-white">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
                  <div className="pointer-events-none absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-sun/20" />
                  <div className="relative">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em]">
                      {t("pg.contact.followShd")}
                    </div>
                    <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">@SHDTechnology</h2>
                    <p className="mt-1.5 text-sm text-white/75">{t("pg.contact.followDesc")}</p>
                  </div>
                </div>

                <div className="grid gap-2 p-4 sm:p-5">
                  {SOCIALS.map((s, i) => (
                    <a
                      key={i}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3.5 rounded-2xl bg-paper p-2.5 pr-4 ring-1 ring-transparent transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:ring-ink/[0.08] hover:shadow-card"
                    >
                      <SocialIcon s={s} />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-ink">{s.name}</div>
                        <div className="text-xs text-ink/50">{s.platform}</div>
                      </div>
                      <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-ink/25 transition group-hover:text-brand" />
                    </a>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============ DIRECT CHANNELS ============ */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
          <RevealOnScroll>
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
              {t("pg.contact.directPre")} <span className="hl">{t("pg.contact.directHl")}</span>{t("pg.contact.directPost")}
            </h2>
            <p className="mt-3 max-w-xl text-base text-ink/60">{t("pg.contact.directDesc")}</p>
          </RevealOnScroll>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {emails.map((item, i) => (
              <RevealOnScroll key={i} delay={i * 80}>
                <div className="group flex h-full flex-col justify-between rounded-4xl bg-white p-7 ring-1 ring-ink/[0.07] shadow-card transition hover:-translate-y-1 hover:shadow-card-hover">
                  <div>
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="mt-4 font-display text-lg font-extrabold text-ink">{item.title}</div>
                    <div className="mt-1 text-sm text-ink/55">{item.desc}</div>
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <a href={mailto(item.email, item.subject)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-brand">
                      {t("pg.contact.send")} <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => copyText(`email:${i}`, item.email)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5 text-xs font-semibold text-ink/70 transition hover:text-ink"
                    >
                      {copied === `email:${i}` ? <Check className="h-3.5 w-3.5 text-brand" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied === `email:${i}` ? (t("pg.contact.copied") as string) : (t("pg.contact.copy") as string)}
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {phones.length > 0 && (
              <RevealOnScroll>
                <div className="h-full rounded-4xl bg-ink p-7 text-white">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                    <Phone className="h-5 w-5 text-sun" />
                  </div>
                  <div className="mt-4 font-display text-lg font-extrabold">{t("pg.contact.callUs")}</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {phones.map((p) => (
                      <a key={p} href={`tel:${p.replace(/\s+/g, "")}`} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15">
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            )}

            <RevealOnScroll delay={80}>
              <div className={cx("h-full rounded-4xl bg-sun p-7 text-ink", phones.length === 0 && "md:col-span-2")}>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-ink/10">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display text-lg font-extrabold">{t("pg.contact.hq")}</div>
                <div className="mt-3 max-w-md text-sm leading-relaxed text-ink/70">{address}</div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => copyText("address", address)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5"
                  >
                    {copied === "address" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied === "address" ? (t("pg.contact.copied") as string) : (t("pg.contact.copyAddress") as string)}
                  </button>
                  <a href={mapHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink transition hover:-translate-y-0.5">
                    <MapPin className="h-3.5 w-3.5" /> {t("pg.contact.openMap")}
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============ GLOBAL PRESENCE ============ */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink text-white">
            <img src="/images/deck/map.jpg" alt="SHD global presence" className="absolute inset-0 h-full w-full object-cover opacity-[0.22]" draggable={false} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
            <div className="relative grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">{t("pg.contact.globalPresence")}</div>
                <h2 className="mt-3 max-w-lg font-display text-3xl font-extrabold leading-tight md:text-4xl">
                  {t("pg.contact.presencePre")} <span className="text-sun">{t("pg.contact.presenceHl")}</span>{t("pg.contact.presencePost")}
                </h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Thailand", "Philippines", "Indonesia", "Vietnam", "Brazil", "Mexico", "Saudi Arabia", "UAE"].map((m) => (
                    <span key={m} className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold">{m}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-8 md:flex-col md:gap-6">
                <div>
                  <div className="font-display text-4xl font-extrabold text-sun">HQ</div>
                  <div className="text-sm text-white/60">{t("pg.contact.hqCity")}</div>
                </div>
                <div>
                  <div className="font-display text-4xl font-extrabold text-sun">3</div>
                  <div className="text-sm text-white/60">{t("pg.contact.regionsWorldwide")}</div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
