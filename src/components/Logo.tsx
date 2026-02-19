import React from "react";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={"inline-flex items-center gap-3 " + className}>
      <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-indigo-600 via-cyan-500 to-rose-400 shadow-glow" />
      <div className="leading-tight">
        <div className="text-sm font-extrabold tracking-tight text-slate-900">SHD Technology</div>
        <div className="text-xs font-semibold text-slate-600">Corporate</div>
      </div>
    </div>
  );
}
