import React from "react";
import { useReveal } from "./useReveal";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale" | "blur";
  distance?: number;
};

export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 36,
}: Props) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  const transforms: Record<string, string> = {
    up: `translate3d(0, ${distance}px, 0)`,
    left: `translate3d(-${distance}px, 0, 0)`,
    right: `translate3d(${distance}px, 0, 0)`,
    scale: "scale(0.92)",
    blur: "translate3d(0, 12px, 0)",
  };

  const baseStyle: React.CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? "translate3d(0,0,0) scale(1)" : transforms[direction],
    filter: shown ? "blur(0px)" : (direction === "blur" ? "blur(8px)" : "blur(3px)"),
    transition: [
      `opacity 0.7s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
      `transform 0.7s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
      `filter 0.7s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
    ].join(", "),
    willChange: "opacity, transform, filter",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={baseStyle}
    >
      {children}
    </div>
  );
}
