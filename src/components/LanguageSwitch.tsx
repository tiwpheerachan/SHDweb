import React from "react";
import { useTranslation } from "react-i18next";
import { setLang } from "../i18n";

const langs = [
  { key: "th", label: "TH" },
  { key: "en", label: "EN" },
  { key: "zh", label: "中文" },
] as const;

export default function LanguageSwitch() {
  const { i18n } = useTranslation();
  return (
    <div className="glass rounded-full p-1 inline-flex items-center gap-1">
      {langs.map((l) => {
        const active = i18n.language === l.key;
        return (
          <button
            key={l.key}
            type="button"
            onClick={() => setLang(l.key)}
            className={[
              "rounded-full px-3 py-1 text-xs font-bold transition",
              active ? "bg-indigo-600 text-white shadow-glow" : "bg-white/0 text-slate-700 hover:bg-white/60",
            ].join(" ")}
            aria-pressed={active}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
