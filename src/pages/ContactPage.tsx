// src/pages/ContactPage.tsx
import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Copy, ArrowUpRight, Check } from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import { CtaCharacters, FloatingMascot } from "@/components/ui/culture-chars";

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

type EmailItem = { title: string; desc: string; email: string; subject: string };

export default function ContactPage() {
  const { t } = useTranslation();

  const i18nEmails = (t("contact.emails", { returnObjects: true }) as EmailItem[]) || [];
  const emails: EmailItem[] = Array.isArray(i18nEmails) && i18nEmails.length
    ? i18nEmails
    : [
        { title: "General enquiries", desc: "Partnerships, media and everything else.", email: "the.dataverse@shd-technology.co.th", subject: "Enquiry — SHD Technology" },
        { title: "Brand partnerships", desc: "Bring your brand to emerging markets.", email: "the.dataverse@shd-technology.co.th", subject: "Brand partnership — SHD Technology" },
        { title: "Careers", desc: "Join our cross-border team.", email: "the.dataverse@shd-technology.co.th", subject: "Careers — SHD Technology" },
      ];

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

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 pt-10 md:pt-16">
          <FloatingMascot src="char-orange" size="w-12 md:w-16" className="right-[4%] top-0 md:top-2" r="8deg" dur="4.6s" />
          <RevealOnScroll>
            <div className="chip-label">Contact</div>
            <h1 className="mt-6 max-w-3xl font-display text-[2.6rem] font-extrabold leading-[1.03] tracking-tight text-ink md:text-6xl">
              Let's <span className="hl-blue">build</span> your growth story.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
              Tell us about your brand and target markets. Our cross-border team usually replies within one business day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={mailto(emails[0].email, emails[0].subject)} className="btn-primary">
                <Mail className="h-4 w-4" /> Email us
              </a>
              <a href={mapHref} target="_blank" rel="noreferrer" className="btn-outline">
                <MapPin className="h-4 w-4" /> Find us
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* EMAIL DIRECTORY */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-14 md:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {emails.map((item, i) => {
            const k = `email:${i}`;
            return (
              <RevealOnScroll key={k} delay={i * 80}>
                <div className="group flex h-full flex-col justify-between rounded-4xl bg-white p-7 ring-1 ring-ink/[0.07] shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover">
                  <div>
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="mt-4 font-display text-lg font-extrabold text-ink">{item.title}</div>
                    <div className="mt-1 text-sm text-ink/55">{item.desc}</div>
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <a href={mailto(item.email, item.subject)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-brand">
                      Send <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => copyText(k, item.email)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5 text-xs font-semibold text-ink/70 transition hover:text-ink"
                    >
                      {copied === k ? <Check className="h-3.5 w-3.5 text-brand" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied === k ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* PHONE + ADDRESS */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {phones.length > 0 && (
            <RevealOnScroll>
              <div className="h-full rounded-4xl bg-ink p-7 text-white">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <Phone className="h-5 w-5 text-sun" />
                </div>
                <div className="mt-4 font-display text-lg font-extrabold">Call us</div>
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
              <div className="mt-4 font-display text-lg font-extrabold">Headquarters</div>
              <div className="mt-3 max-w-md text-sm leading-relaxed text-ink/70">{address}</div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => copyText("address", address)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5"
                >
                  {copied === "address" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied === "address" ? "Copied" : "Copy address"}
                </button>
                <a href={mapHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink transition hover:-translate-y-0.5">
                  <MapPin className="h-3.5 w-3.5" /> Open map
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
