import React from "react";

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
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {kicker ? (
        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold tracking-wide text-slate-700 ring-1 ring-slate-200 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-indigo-600" />
          {kicker}
        </div>
      ) : null}

      <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
        {title}
      </h2>

      {desc ? (
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
          {desc}
        </p>
      ) : null}
    </div>
  );
}
