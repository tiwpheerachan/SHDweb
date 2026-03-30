import React, { useCallback, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Max tilt degrees (default 6) */
  maxTilt?: number;
  /** Glow follows mouse */
  glowEffect?: boolean;
};

/**
 * Card that tilts in 3D toward the mouse position.
 * Optional inner glow that follows cursor.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 6,
  glowEffect = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const tiltX = (y - 0.5) * -maxTilt;
        const tiltY = (x - 0.5) * maxTilt;

        el.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;

        if (glowEffect) {
          el.style.setProperty("--glow-x", `${x * 100}%`);
          el.style.setProperty("--glow-y", `${y * 100}%`);
        }
      });
    },
    [maxTilt, glowEffect]
  );

  const onLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    const el = ref.current;
    if (el) {
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`tilt-card ${glowEffect ? "glow-card" : ""} ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
