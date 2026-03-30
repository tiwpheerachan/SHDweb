import React from "react";
import { useReveal } from "./useReveal";

export default function SectionHeader({
  kicker,
  title,
  desc,
  align = "left",
}: {
  kicker?: string;
  title: string;
  desc?: string;
  align?: "left" | "center";
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={align === "center" ? "text-center" : "text-left"}>
      {kicker ? (
        <div
          className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold tracking-wide text-slate-700 ring-1 ring-slate-200 backdrop-blur transition-all duration-500 hover:ring-indigo-200 hover:shadow-glow-brand"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.6s cubic-bezier(.22,.61,.36,1)",
          }}
        >
          <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse-soft" />
          {kicker}
        </div>
      ) : null}

      <h2
        className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(20px)",
          filter: shown ? "blur(0)" : "blur(4px)",
          transition: "all 0.7s cubic-bezier(.22,.61,.36,1) 100ms",
        }}
      >
        {title}
      </h2>

      {desc ? (
        <p
          className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(.22,.61,.36,1) 200ms",
          }}
        >
          {desc}
        </p>
      ) : null}
    </div>
  );
}
