import React, { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Parallax speed: 0 = none, 0.1 = subtle, 0.3 = strong */
  speed?: number;
  /** Direction of parallax */
  direction?: "up" | "down";
};

/**
 * Wraps content in a parallax scroll container.
 * Content moves slower/faster than the scroll.
 */
export default function ParallaxSection({
  children,
  className = "",
  speed = 0.1,
  direction = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      // How far through the viewport is this element? 0 = top, 1 = bottom
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));
      const shift = (clampedProgress - 0.5) * speed * 120;
      setOffset(direction === "up" ? -shift : shift);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed, direction]);

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          transform: `translate3d(0, ${offset}px, 0)`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
