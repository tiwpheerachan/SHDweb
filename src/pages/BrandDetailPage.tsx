// src/pages/BrandDetailPage.tsx
import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import GlassCard from "../components/GlassCard";

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
};

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function BrandDetailPage() {
  const { slug } = useParams();

  const brands: Brand[] = [
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
    },
    {
      name: "Mova",
      slug: "mova",
      tagline: "Smart devices for modern living",
      img: "/images/brands/mova.jpg",
      category: "Smart Home",
      isOfficial: true,
      about:
        "โซลูชันสมาร์ทโฮมที่ออกแบบให้ใช้งานง่าย ดีไซน์สวย และตอบโจทย์ไลฟ์สไตล์ยุคใหม่",
      highlights: ["Smart Living", "Modern Design", "Easy to Use"],
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
    },
    {
      name: "Jimmy",
      slug: "jimmy",
      tagline: "Vacuum • Cleaning solutions",
      img: "/images/brands/jimmy.jpg",
      category: "Cleaning",
      isOfficial: true,
      about:
        "อุปกรณ์ทำความสะอาดและเครื่องดูดฝุ่นที่เน้นพลังดูด การกรองฝุ่น และประสบการณ์ใช้งานที่สะดวก",
      highlights: ["Vacuum", "Cleaning Tools", "Home Care"],
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
    },
    {
      name: "Wanbo",
      slug: "wanbo",
      tagline: "Projectors • Home theater",
      img: "/images/brands/wanbo.jpg",
      category: "Projector",
      isOfficial: true,
      about:
        "โปรเจกเตอร์สำหรับบ้านและความบันเทิงที่เน้นภาพคม ความสว่างเหมาะสม และติดตั้งง่าย",
      highlights: ["Home Projector", "Easy Setup", "Entertainment"],
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
    },
  ];

  const brand = useMemo(() => brands.find((b) => b.slug === slug), [brands, slug]);

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

          {/* hero card */}
          <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_.8fr] md:items-stretch">
            <div className="overflow-hidden rounded-[28px] ring-1 ring-slate-200 shadow-[0_18px_70px_-52px_rgba(15,23,42,0.22)]">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img src={brand.img} alt={brand.name} className="h-full w-full object-cover" draggable={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
                <div className="absolute left-5 bottom-5">
                  <div className="text-2xl font-extrabold text-white md:text-3xl">{brand.name}</div>
                  <div className="mt-1 text-sm text-white/85">{brand.tagline}</div>
                </div>
              </div>
            </div>

            <GlassCard className="p-6 md:p-7">
              <div className="text-xs font-extrabold text-slate-600">Category</div>
              <div className="mt-1 text-lg font-extrabold text-slate-900">{brand.category}</div>

              <div className="mt-4 text-xs font-extrabold text-slate-600">About</div>
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

              <div className="mt-6 flex flex-wrap gap-3">
                {brand.website ? (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_22px_70px_-45px_rgba(79,70,229,.55)] transition hover:bg-indigo-700"
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

          {/* related grid (optional) */}
          <div className="mt-10">
            <div className="text-sm font-extrabold text-slate-900">Other brands</div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {brands
                .filter((b) => b.slug !== brand.slug)
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
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={b.img}
                        alt={b.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        draggable={false}
                      />
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
