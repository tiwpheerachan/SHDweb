import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Kept for backward compatibility — no longer used (mouse animations removed). */
  maxTilt?: number;
  glowEffect?: boolean;
};

/**
 * Static card wrapper. The 3D mouse-tilt / cursor-glow effect has been removed
 * in favor of a clean, static design. Kept so existing imports keep working.
 */
export default function TiltCard({ children, className = "" }: Props) {
  return (
    <div className={"transition-all duration-300 hover:-translate-y-0.5 " + className}>
      {children}
    </div>
  );
}
