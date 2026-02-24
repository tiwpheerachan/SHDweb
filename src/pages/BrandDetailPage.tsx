// src/pages/BrandDetailPage.tsx
import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import GlassCard from "../components/GlassCard";

type BrandContacts = {
  shopee?: string;
  lazada?: string;
  tiktok?: string;
  facebook?: string;
  lineoa?: string;
};

type Brand = {
  name: string;
  slug: string;
  tagline: string;
  img: string; // /images/brands/<slug>.jpg
  category: string;
  isOfficial: boolean;
  website?: string;
  highlights: string[];
  about: string;
  contacts?: BrandContacts;
};

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

type ContactKey = "shopee" | "lazada" | "tiktok" | "facebook" | "lineoa";

const CONTACT_ORDER: Array<{ key: ContactKey; label: string }> = [
  { key: "shopee", label: "Shopee" },
  { key: "lazada", label: "Lazada" },
  { key: "tiktok", label: "TikTok" },
  { key: "facebook", label: "Facebook" },
  { key: "lineoa", label: "LINE OA" },
];

// ✅ รองรับทั้ง .png และ .png.png (จากรูปของคุณไฟล์เป็น *.png.png)
const CONTACT_ICON_CANDIDATES: Record<ContactKey, string[]> = {
  shopee: ["/images/contact/shopee.png", "/images/contact/shopee.png"],
  lazada: ["/images/contact/lazada.png", "/images/contact/lazada.png"],
  tiktok: ["/images/contact/tiktok.png", "/images/contact/tiktok.png"],
  facebook: ["/images/contact/facebook.png", "/images/contact/facebook.png"],
  lineoa: ["/images/contact/lineoa.png", "/images/contact/lineoa.png"],
};

function normalizeHref(h?: string) {
  const v = (h ?? "").trim();
  return v.length ? v : undefined;
}

function ContactIcon({
  label,
  href,
  candidates,
}: {
  label: string;
  href?: string;
  candidates: string[];
}) {
  const realHref = normalizeHref(href);
  const disabled = !realHref;

  const [idx, setIdx] = useState(0);
  const src = candidates[Math.min(idx, candidates.length - 1)];

  return (
    <a
      href={realHref || "#"}
      target={disabled ? undefined : "_blank"}
      rel={disabled ? undefined : "noreferrer"}
      aria-label={label}
      title={disabled ? `${label} (ยังไม่ใส่ลิงก์)` : label}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      className={cx(
        "group relative flex h-12 w-12 items-center justify-center rounded-full",
        // ✅ ไม่มี bg-white เพื่อลดความรู้สึก “ฝ้า”
        // ✅ overflow-hidden กันขอบ/มุมแตก
        "bg-transparent ring-1 ring-slate-200 overflow-hidden",
        "shadow-[0_14px_44px_-30px_rgba(15,23,42,.35)]",
        "transition",
        disabled
          ? "opacity-55 cursor-not-allowed grayscale-[18%] saturate-[0.9]"
          : "hover:-translate-y-0.5 hover:ring-amber-300 hover:shadow-[0_22px_70px_-50px_rgba(245,158,11,.55)]"
      )}
    >
      {/* glow เฉพาะตอน enabled */}
      {!disabled && (
        <span
          className="pointer-events-none absolute -inset-3 rounded-full opacity-0 blur-xl transition duration-300 group-hover:opacity-100"
          style={{
            background: "radial-gradient(18px 18px at 50% 50%, rgba(245,158,11,.35), transparent 70%)",
          }}
        />
      )}

      {/* ✅ รูปเต็มวงกลม / ไม่ใส่ overlay ใดๆ ทับรูป */}
      <img
        src={src}
        alt={label}
        draggable={false}
        className={cx(
          "h-full w-full rounded-full object-cover",
          "transition duration-300",
          disabled ? "" : "group-hover:scale-[1.06]"
        )}
        onError={() => {
          if (idx < candidates.length - 1) setIdx((x) => x + 1);
        }}
      />
    </a>
  );
}

// ✅ ใส่ลิงก์ “แยกตามแบรนด์” ตรงนี้เลย (แต่ละช่องไม่เหมือนกัน)
const BRANDS: Brand[] = [
  {
    name: "Anker",
    slug: "anker",
    tagline: "Charging • Power • Innovation",
    img: "/images/brands/anker.jpg",
    category: "Lifestyle",
    isOfficial: true,
    website: "https://www.anker.com/",
    about:
      "แบรนด์เทคโนโลยีชั้นนำด้านอุปกรณ์ชาร์จ พาวเวอร์แบงก์ และอุปกรณ์เสริมที่เน้นคุณภาพ ความปลอดภัย และการใช้งานจริงในชีวิตประจำวัน",
    highlights: ["Power & Charging", "Quality & Safety", "Everyday Tech"],
    contacts: {
      shopee: "https://shopee.co.th/your-anker-store",
      lazada: "https://www.lazada.co.th/shop/your-anker-store",
      tiktok: "https://www.tiktok.com/@your_anker",
      facebook: "https://www.facebook.com/your.anker",
      lineoa: "https://lin.ee/youranker",
    },
  },
  {
    name: "Soundcore",
    slug: "soundcore",
    tagline: "True Wireless • Speakers • Audio",
    img: "/images/brands/soundcore.jpg",
    category: "Audio",
    isOfficial: true,
    website: "https://www.soundcore.com/",
    about:
      "แบรนด์เครื่องเสียงจาก Anker โดดเด่นด้านหูฟังไร้สาย ลำโพง และเทคโนโลยีเสียงที่บาลานซ์ทั้งคุณภาพและความคุ้มค่า",
    highlights: ["TWS & Headphones", "Speakers", "Great Value Audio"],
    contacts: {
      shopee: "https://shopee.co.th/your-soundcore-store",
      lazada: "https://www.lazada.co.th/shop/your-soundcore-store",
      tiktok: "https://www.tiktok.com/@your_soundcore",
      facebook: "https://www.facebook.com/your.soundcore",
      lineoa: "https://lin.ee/yoursoundcore",
    },
  },
  {
    name: "Mova",
    slug: "mova",
    tagline: "Smart devices for modern living",
    img: "/images/brands/mova.jpg",
    category: "Smart Home",
    isOfficial: true,
    about: "โซลูชันสมาร์ทโฮมที่ออกแบบให้ใช้งานง่าย ดีไซน์สวย และตอบโจทย์ไลฟ์สไตล์ยุคใหม่",
    highlights: ["Smart Living", "Modern Design", "Easy to Use"],
    contacts: {
      shopee: "https://shopee.co.th/your-mova-store",
      lazada: "https://www.lazada.co.th/shop/your-mova-store",
      tiktok: "https://www.tiktok.com/@your_mova",
      facebook: "https://www.facebook.com/your.mova",
      lineoa: "https://lin.ee/yourmova",
    },
  },
  {
    name: "70mai",
    slug: "70mai",
    tagline: "Dashcam • Car accessories",
    img: "/images/brands/70mai.jpg",
    category: "Mobility",
    isOfficial: true,
    website: "https://www.70mai.com/",
    about:
      "แบรนด์กล้องติดรถยนต์และอุปกรณ์สำหรับรถยนต์ ที่เน้นฟีเจอร์ความปลอดภัย ภาพคมชัด และความน่าเชื่อถือในการใช้งานจริง",
    highlights: ["Dashcam", "Car Safety", "Smart Accessories"],
    contacts: {
      shopee: "https://shopee.co.th/your-70mai-store",
      lazada: "https://www.lazada.co.th/shop/your-70mai-store",
      tiktok: "https://www.tiktok.com/@your_70mai",
      facebook: "https://www.facebook.com/your.70mai",
      lineoa: "https://lin.ee/your70mai",
    },
  },
  {
    name: "Jimmy",
    slug: "jimmy",
    tagline: "Vacuum • Cleaning solutions",
    img: "/images/brands/jimmy.jpg",
    category: "Cleaning",
    isOfficial: true,
    about: "อุปกรณ์ทำความสะอาดและเครื่องดูดฝุ่นที่เน้นพลังดูด การกรองฝุ่น และประสบการณ์ใช้งานที่สะดวก",
    highlights: ["Vacuum", "Cleaning Tools", "Home Care"],
    contacts: {
      shopee: "https://shopee.co.th/your-jimmy-store",
      lazada: "https://www.lazada.co.th/shop/your-jimmy-store",
      tiktok: "https://www.tiktok.com/@your_jimmy",
      facebook: "https://www.facebook.com/your.jimmy",
      lineoa: "https://lin.ee/yourjimmy",
    },
  },
  {
    name: "Xiaomi",
    slug: "xiaomi",
    tagline: "Smart ecosystem • Lifestyle tech",
    img: "/images/brands/xiaomi.jpg",
    category: "Smart Home",
    isOfficial: true,
    website: "https://www.mi.com/",
    about:
      "แบรนด์เทคโนโลยีและสมาร์ทดีไวซ์ที่มีระบบนิเวศหลากหลาย ครอบคลุมตั้งแต่สมาร์ทโฮมถึงไลฟ์สไตล์",
    highlights: ["Smart Ecosystem", "Connected Devices", "Lifestyle Tech"],
    contacts: {
      shopee: "https://shopee.co.th/your-xiaomi-store",
      lazada: "https://www.lazada.co.th/shop/your-xiaomi-store",
      tiktok: "https://www.tiktok.com/@your_xiaomi",
      facebook: "https://www.facebook.com/your.xiaomi",
      lineoa: "https://lin.ee/yourxiaomi",
    },
  },
  {
    name: "Mibro",
    slug: "mibro",
    tagline: "Wearables • Smartwatch",
    img: "/images/brands/mibro.jpg",
    category: "Lifestyle",
    isOfficial: true,
    about:
      "อุปกรณ์สวมใส่และสมาร์ทวอทช์ที่โฟกัสการติดตามสุขภาพ ฟีเจอร์กีฬา และดีไซน์ที่ใช้งานได้ทุกวัน",
    highlights: ["Wearables", "Health Tracking", "Sport Features"],
    contacts: {
      shopee: "https://shopee.co.th/your-mibro-store",
      lazada: "https://www.lazada.co.th/shop/your-mibro-store",
      tiktok: "https://www.tiktok.com/@your_mibro",
      facebook: "https://www.facebook.com/your.mibro",
      lineoa: "https://lin.ee/yourmibro",
    },
  },
  {
    name: "Wanbo",
    slug: "wanbo",
    tagline: "Projectors • Home theater",
    img: "/images/brands/wanbo.jpg",
    category: "Projector",
    isOfficial: true,
    about: "โปรเจกเตอร์สำหรับบ้านและความบันเทิงที่เน้นภาพคม ความสว่างเหมาะสม และติดตั้งง่าย",
    highlights: ["Home Projector", "Easy Setup", "Entertainment"],
    contacts: {
      shopee: "https://shopee.co.th/your-wanbo-store",
      lazada: "https://www.lazada.co.th/shop/your-wanbo-store",
      tiktok: "https://www.tiktok.com/@your_wanbo",
      facebook: "https://www.facebook.com/your.wanbo",
      lineoa: "https://lin.ee/yourwanbo",
    },
  },
  {
    name: "Dreame",
    slug: "dreame",
    tagline: "Robot vacuum • Cleaning tech",
    img: "/images/brands/dreame.jpg",
    category: "Cleaning",
    isOfficial: true,
    about:
      "เทคโนโลยีทำความสะอาดระดับพรีเมียม ทั้งหุ่นยนต์ดูดฝุ่นและอุปกรณ์ทำความสะอาดที่เน้นประสิทธิภาพและดีไซน์",
    highlights: ["Robot Vacuum", "Premium Cleaning", "Smart Features"],
    contacts: {
      shopee: "https://shopee.co.th/your-dreame-store",
      lazada: "https://www.lazada.co.th/shop/your-dreame-store",
      tiktok: "https://www.tiktok.com/@your_dreame",
      facebook: "https://www.facebook.com/your.dreame",
      lineoa: "https://lin.ee/yourdreame",
    },
  },
  {
    name: "Levoit",
    slug: "levoit",
    tagline: "Air purifier • Healthy home",
    img: "/images/brands/levoit.jpg",
    category: "Air",
    isOfficial: true,
    about:
      "โซลูชันเพื่ออากาศที่ดีขึ้นในบ้าน เช่น เครื่องฟอกอากาศและอุปกรณ์ดูแลสุขภาพที่เน้นมาตรฐานและความสบายใจ",
    highlights: ["Air Purifier", "Healthy Home", "Trusted Standards"],
    contacts: {
      shopee: "https://shopee.co.th/your-levoit-store",
      lazada: "https://www.lazada.co.th/shop/your-levoit-store",
      tiktok: "https://www.tiktok.com/@your_levoit",
      facebook: "https://www.facebook.com/your.levoit",
      lineoa: "https://lin.ee/yourlevoit",
    },
  },
];

export default function BrandDetailPage() {
  const { slug } = useParams();

  const brand = useMemo(() => BRANDS.find((b) => b.slug === slug), [slug]);

  if (!brand) {
    return (
      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-14">
          <div className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
            <div className="text-sm font-extrabold text-slate-900">ไม่พบแบรนด์</div>
            <div className="mt-2 text-sm text-slate-600">ลิงก์อาจไม่ถูกต้อง หรือแบรนด์นี้ยังไม่ถูกเพิ่ม</div>
            <div className="mt-6">
              <Link
                to="/brands"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white"
              >
                ← กลับไปหน้า Brands
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const contacts = brand.contacts || {};

  return (
    <>
      <Helmet>
        <title>{brand.name} · SHD Technology</title>
        <meta name="description" content={`${brand.name} — ${brand.tagline}`} />
      </Helmet>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-12 md:py-14">
          {/* top nav */}
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/brands"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 transition"
            >
              ← Back
            </Link>

            <div
              className={cx(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold text-white",
                brand.isOfficial ? "bg-emerald-600" : "bg-slate-900"
              )}
            >
              {brand.isOfficial ? "Official Distributor" : "Brand"}
            </div>
          </div>

          {/* ✅ ล็อคกรอบรูป: ไม่ให้แกว่งตามเนื้อหา */}
          <div className="mt-6 grid gap-6 md:grid-cols-[1.25fr_.75fr] md:items-start">
            <div className="md:self-start w-full shrink-0">
              <div className="relative overflow-hidden rounded-[30px] ring-1 ring-slate-200 shadow-[0_26px_100px_-70px_rgba(15,23,42,0.35)]">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img src={brand.img} alt={brand.name} className="h-full w-full object-cover" draggable={false} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
                  <div
                    className="absolute inset-0 opacity-[0.16]"
                    style={{
                      background:
                        "radial-gradient(700px 420px at 15% 0%, rgba(245,158,11,.55), transparent 60%)," +
                        "radial-gradient(700px 420px at 90% 30%, rgba(99,102,241,.35), transparent 65%)",
                    }}
                  />
                  <div className="absolute left-6 bottom-6">
                    <div className="inline-flex rounded-full p-[1px] bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300 shadow-[0_18px_70px_-50px_rgba(245,158,11,.55)]">
                      <div className="rounded-full bg-black/30 px-3 py-1 text-xs font-extrabold text-white ring-1 ring-white/15 backdrop-blur">
                        {brand.category}
                      </div>
                    </div>

                    <div className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">{brand.name}</div>
                    <div className="mt-1 text-sm text-white/85">{brand.tagline}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* right info */}
            <GlassCard className="p-6 md:p-7">
              <div className="text-xs font-extrabold text-slate-600">About</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{brand.about}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {brand.highlights.map((x) => (
                  <span
                    key={x}
                    className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200"
                  >
                    {x}
                  </span>
                ))}
              </div>

              {/* Contacts */}
              <div className="mt-6">
                <div className="text-xs font-extrabold text-slate-600">Contacts</div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {CONTACT_ORDER.map((c) => (
                    <ContactIcon
                      key={c.key}
                      label={c.label}
                      href={(contacts as any)[c.key]}
                      candidates={CONTACT_ICON_CANDIDATES[c.key]}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {brand.website ? (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-slate-900
                               bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300
                               ring-1 ring-amber-200/70
                               shadow-[0_18px_70px_-48px_rgba(245,158,11,.70)]
                               transition hover:-translate-y-0.5 hover:brightness-[1.03] active:translate-y-0"
                  >
                    Open Official Site ↗
                  </a>
                ) : null}

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 transition hover:bg-slate-50"
                >
                  Contact SHD
                </Link>
              </div>
            </GlassCard>
          </div>

          {/* other brands */}
          <div className="mt-10">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-extrabold text-slate-900">Other brands</div>
              <Link to="/brands" className="text-sm font-semibold text-slate-700 hover:text-slate-900 hover:underline">
                View all →
              </Link>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {BRANDS.filter((b) => b.slug !== brand.slug)
                .slice(0, 5)
                .map((b) => (
                  <Link
                    key={b.slug}
                    to={`/brands/${b.slug}`}
                    className={cx(
                      "group overflow-hidden rounded-3xl bg-white",
                      "ring-1 ring-slate-200",
                      "shadow-[0_18px_60px_-45px_rgba(15,23,42,.18)]",
                      "transition hover:-translate-y-0.5 hover:shadow-[0_22px_70px_-46px_rgba(15,23,42,.22)]"
                    )}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50">
                      <img
                        src={b.img}
                        alt={b.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        draggable={false}
                      />

                      {/* ✅ ไล่สีขาวจากด้านล่างรูป */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/85 via-white/35 to-transparent" />
                      {/* ✅ vignette เบาๆ ด้านบน */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/18 via-black/0 to-transparent opacity-70" />
                    </div>

                    <div className="p-4">
                      <div className="text-sm font-extrabold text-slate-900">{b.name}</div>
                      <div className="mt-1 text-xs text-slate-500">{b.category}</div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}