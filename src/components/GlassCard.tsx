import React from "react";

export default function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  /** Kept for backward compatibility — no longer used (mouse animations removed). */
  tilt?: boolean;
}) {
  return (
    <div
      className={
        "rounded-3xl bg-white ring-1 ring-ink/[0.07] shadow-card transition-all duration-300 hover:shadow-card-hover " +
        className
      }
    >
      {children}
    </div>
  );
}
