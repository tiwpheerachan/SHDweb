import React from "react";

export function StatPills({ items }: { items: Array<{ k: string; v: string }> }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      {items.map((it) => (
        <div key={it.k} className="chip">
          <span className="text-slate-500">{it.k}</span>
          <span className="font-extrabold text-slate-900">{it.v}</span>
        </div>
      ))}
    </div>
  );
}
