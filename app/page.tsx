"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const hrefMap = ["/l1", "/l2", "/l3", "/comparison"];
const colorMap = [
  { color: "#3b82f6", glow: "rgba(59,130,246,0.10)" },
  { color: "#6366f1", glow: "rgba(99,102,241,0.10)" },
  { color: "#06b6d4", glow: "rgba(6,182,212,0.10)" },
  { color: "#f59e0b", glow: "rgba(245,158,11,0.10)" },
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20">

        {/* Hero */}
        <div className="max-w-3xl animate-fade-up">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{
              background: "rgba(59,130,246,0.08)",
              border: "1px solid rgba(59,130,246,0.2)",
              color: "#3b82f6",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block animate-pulse" />
            {t.site.badge}
          </div>

          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            {t.home.heroTitle1}
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#3b82f6,#6366f1,#06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t.home.heroTitle2}
            </span>
          </h1>

          <p className="text-base leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
            {t.site.description}
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {t.site.scenario}
          </p>
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap gap-10 mt-10 mb-16 pt-10 border-t"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          {(t.home.stats as { label: string; value: string }[]).map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Section cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(t.sections as { level: string; title: string; en: string; desc: string; tags: string[] }[]).map((s, i) => {
            const { color, glow } = colorMap[i];
            return (
              <Link
                key={hrefMap[i]}
                href={hrefMap[i]}
                className="group block p-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded"
                      style={{ background: glow, color, border: `1px solid ${color}40` }}
                    >
                      {s.level}
                    </span>
                    <div>
                      <h2 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{s.title}</h2>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{s.en}</p>
                    </div>
                  </div>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    style={{ color: "var(--text-muted)" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>

                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded font-mono"
                      style={{
                        background: "var(--bg-secondary)",
                        color: "var(--text-muted)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Usage note */}
        <div
          className="mt-8 p-5 rounded-xl text-xs leading-relaxed"
          style={{
            background: "rgba(59,130,246,0.04)",
            border: "1px solid rgba(59,130,246,0.12)",
            color: "var(--text-secondary)",
          }}
        >
          <span className="font-semibold" style={{ color: "#3b82f6" }}>{t.home.usageLabel}</span>
          {" "}{t.home.usageNote}
        </div>
      </div>
    </div>
  );
}
