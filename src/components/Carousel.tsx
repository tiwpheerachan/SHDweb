import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Smart, native-feeling carousel built on CSS scroll-snap.
 * - Auto-plays (pauses on hover / when the user is interacting)
 * - Loops back to the start when it reaches the end
 * - Touch, trackpad and arrow-button navigation all work
 * Each child must carry `data-card` and be a shrink-0 snap item.
 */
export default function Carousel({
  children,
  className = "",
  autoPlayMs = 4200,
  arrows = true,
}: {
  children: React.ReactNode;
  className?: string;
  autoPlayMs?: number;
  arrows?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const step = useCallback((dir: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = 20;
    const amount = card ? card.offsetWidth + gap : el.clientWidth * 0.85;
    const maxLeft = el.scrollWidth - el.clientWidth;
    const atEnd = el.scrollLeft >= maxLeft - 8;
    const atStart = el.scrollLeft <= 8;

    let target = el.scrollLeft + dir * amount;
    if (dir > 0 && atEnd) target = 0;
    else if (dir < 0 && atStart) target = maxLeft;

    el.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (paused) return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;
    const id = window.setInterval(() => step(1), autoPlayMs);
    return () => window.clearInterval(id);
  }, [paused, autoPlayMs, step]);

  return (
    <div
      className={"group/carousel relative " + className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div
        ref={ref}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-1"
      >
        {children}
      </div>

      {arrows && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => step(-1)}
            className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-card ring-1 ring-ink/10 backdrop-blur transition hover:scale-105 md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => step(1)}
            className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-card ring-1 ring-ink/10 backdrop-blur transition hover:scale-105 md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}
