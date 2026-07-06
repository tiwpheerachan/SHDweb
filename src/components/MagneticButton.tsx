import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Kept for backward compatibility — no longer used (mouse animations removed). */
  strength?: number;
};

/**
 * Static wrapper. The magnetic mouse-follow effect has been removed in favor of
 * a clean, static design. Kept as a component so existing imports keep working.
 */
export default function MagneticButton({ children, className = "" }: Props) {
  return <div className={"inline-block " + className}>{children}</div>;
}
