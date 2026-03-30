import React from "react";
import { useReveal } from "./useReveal";

type Props = {
  children: string;
  className?: string;
  /** Delay before animation starts (ms) */
  delay?: number;
  /** "word" splits by word, "char" by character */
  by?: "word" | "char";
  /** Stagger between items (ms) */
  stagger?: number;
};

/**
 * Reveals text word-by-word or character-by-character
 * with a staggered slide-up + fade animation.
 */
export default function TextReveal({
  children,
  className = "",
  delay = 0,
  by = "word",
  stagger = 40,
}: Props) {
  const { ref, shown } = useReveal<HTMLSpanElement>();

  const items = by === "word" ? children.split(" ") : children.split("");
  const separator = by === "word" ? "\u00A0" : "";

  return (
    <span ref={ref} className={`inline ${className}`} aria-label={children}>
      {items.map((item, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="inline-block"
            style={{
              transform: shown ? "translateY(0) rotate(0deg)" : "translateY(110%) rotate(3deg)",
              opacity: shown ? 1 : 0,
              transition: `transform 0.6s cubic-bezier(.22,.61,.36,1) ${delay + i * stagger}ms, opacity 0.5s ease ${delay + i * stagger}ms`,
              willChange: "transform, opacity",
            }}
          >
            {item}{separator}
          </span>
        </span>
      ))}
    </span>
  );
}
