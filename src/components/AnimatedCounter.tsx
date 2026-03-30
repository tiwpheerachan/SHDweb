import React, { useEffect, useState } from "react";
import { useReveal } from "./useReveal";

type Props = {
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
};

/**
 * A number counter that animates from 0 to target value
 * when it scrolls into view. Includes a scale pop effect.
 */
export default function AnimatedCounter({
  to,
  duration = 1200,
  className = "",
  suffix = "",
  prefix = "",
}: Props) {
  const { ref, shown } = useReveal<HTMLDivElement>({ threshold: 0.3 });
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!shown || hasAnimated) return;
    setHasAnimated(true);

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, to, duration, hasAnimated]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: shown ? "scale(1)" : "scale(0.8)",
        opacity: shown ? 1 : 0,
        transition: "transform 0.6s cubic-bezier(.22,.61,.36,1), opacity 0.5s ease",
      }}
    >
      {prefix}{value}{suffix}
    </div>
  );
}
