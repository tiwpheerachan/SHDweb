import { cn } from "@/lib/utils";

const SHADOW = "drop-shadow-[0_18px_30px_rgba(11,11,15,0.18)]";

type CharKey = "char-green" | "char-orange" | "char-yellow" | "char-red";

/** The four SHD culture characters bouncing around a CTA box (place inside a `relative` wrapper). */
export function CtaCharacters({ className }: { className?: string }) {
  const items: { src: CharKey; cls: string; r: string; d: string; dur: string }[] = [
    { src: "char-green", cls: "-top-10 -left-4 w-24 md:w-28", r: "-8deg", d: "0s", dur: "4.2s" },
    { src: "char-orange", cls: "-top-12 right-4 w-24 md:w-32", r: "9deg", d: "0.6s", dur: "3.6s" },
    { src: "char-yellow", cls: "-bottom-8 left-6 w-20 md:w-24", r: "7deg", d: "1.1s", dur: "4.6s" },
    { src: "char-red", cls: "-bottom-12 -right-3 w-24 md:w-28", r: "-7deg", d: "0.3s", dur: "3.9s" },
  ];
  return (
    <>
      {items.map((c) => (
        <img
          key={c.src}
          src={`/images/culture/${c.src}.png`}
          alt=""
          aria-hidden="true"
          draggable={false}
          className={cn("char-float pointer-events-none absolute z-20 hidden select-none md:block", SHADOW, c.cls, className)}
          style={{ ["--r" as any]: c.r, animationDelay: c.d, animationDuration: c.dur }}
        />
      ))}
    </>
  );
}

/** A single small floating SHD character — cute mascot accent. */
export function FloatingMascot({
  src = "char-orange",
  className,
  size = "w-16",
  r = "0deg",
  dur = "5s",
  delay = "0s",
}: {
  src?: CharKey;
  className?: string;
  size?: string;
  r?: string;
  dur?: string;
  delay?: string;
}) {
  return (
    <img
      src={`/images/culture/${src}.png`}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={cn("char-float pointer-events-none absolute z-20 select-none", SHADOW, size, className)}
      style={{ ["--r" as any]: r, animationDelay: delay, animationDuration: dur }}
    />
  );
}
