import React, { useCallback, useRef } from "react";

export default function GlassCard({
  children,
  className = "",
  tilt = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Enable 3D tilt on hover */
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!tilt) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * -5;
      const tiltY = (x - 0.5) * 5;
      el.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`;
      el.style.setProperty("--glow-x", `${x * 100}%`);
      el.style.setProperty("--glow-y", `${y * 100}%`);
    },
    [tilt]
  );

  const onLeave = useCallback(() => {
    if (!tilt) return;
    const el = ref.current;
    if (el) {
      el.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)";
    }
  }, [tilt]);

  return (
    <div
      ref={ref}
      className={
        "glass rounded-3xl transition-all duration-400 ease-out hover:shadow-card-hover " +
        (tilt ? "glow-card " : "") +
        className
      }
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={tilt ? { willChange: "transform", transformStyle: "preserve-3d" } : undefined}
    >
      {children}
    </div>
  );
}
