"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import type { SystemDetail } from "@/lib/systemsData";
import ModuleGraph from "./ModuleGraph";
import IntegrationMap from "./IntegrationMap";

const SEVERITY_COLORS = {
  critical: { bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.3)",  text: "#ef4444", label: { zh: "严重", en: "CRITICAL" } },
  high:     { bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.3)", text: "#f97316", label: { zh: "高",   en: "HIGH" } },
  medium:   { bg: "rgba(234,179,8,0.1)",  border: "rgba(234,179,8,0.3)",  text: "#eab308", label: { zh: "中",   en: "MED" } },
};

const DIR_ICONS: Record<string, string> = { in: "→", out: "←", bidirectional: "⇄" };
const DIR_LABELS = {
  in:            { zh: "接收", en: "Inbound" },
  out:           { zh: "发出", en: "Outbound" },
  bidirectional: { zh: "双向", en: "Bidirec." },
};

interface Props { system: SystemDetail }

export default function SystemDetailClient({ system: s }: Props) {
  const { lang } = useLanguage();
  const t = (b: { zh: string; en: string }) => b[lang];

  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-24 space-y-12">

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          <Link href="/l2" className="hover:underline" style={{ color: "var(--text-secondary)" }}>
            {lang === "zh" ? "L2 系统架构" : "L2 System Arch"}
          </Link>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>{s.label}</span>
        </div>

        {/* ── Hero ── */}
        <div className="rounded-2xl p-8 animate-fade-up"
          style={{ background: "var(--bg-card)", border: `1px solid ${s.color}30` }}>
          <div className="flex flex-wrap items-start gap-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-xl text-3xl shrink-0"
              style={{ background: `${s.color}15`, border: `1px solid ${s.color}40` }}>
              {s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{s.label}</h1>
                <span className="text-xs px-2 py-0.5 rounded font-mono"
                  style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}30` }}>
                  {t(s.category)}
                </span>
              </div>
              <p className="text-base font-medium mb-1" style={{ color: s.color }}>{t(s.fullName)}</p>
              <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>{s.vendor}</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{t(s.tagline)}</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{t(s.overview)}</p>
          </div>
        </div>

        {/* ── Key Metrics ── */}
        <section>
          <SectionHeading color={s.color} icon="📈"
            zh="关键性能指标" en="Key Performance Metrics" lang={lang} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {s.metrics.map((m) => (
              <div key={m.value} className="rounded-xl p-4"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <p className="text-2xl font-bold font-mono mb-1" style={{ color: s.color }}>{m.value}</p>
                <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--text-primary)" }}>{t(m.label)}</p>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-muted)" }}>{t(m.benchmark)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Core Modules ── */}
        <section>
          <SectionHeading color={s.color} icon="🧩"
            zh="核心功能模块" en="Core Functional Modules" lang={lang} />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
            {s.coreModules.map((m) => (
              <div key={m.id} className="rounded-xl p-5"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{m.icon}</span>
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{t(m.name)}</span>
                </div>
                <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--text-secondary)" }}>{t(m.desc)}</p>
                {m.tech && (
                  <p className="text-[10px] font-mono px-2 py-1 rounded inline-block"
                    style={{ background: `${s.color}10`, color: s.color, border: `1px solid ${s.color}20` }}>
                    {m.tech}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Module Flow Graph ── */}
        <section>
          <SectionHeading color={s.color} icon="🗺️"
            zh="模块关系图" en="Module Relationship Graph" lang={lang} />
          <div className="rounded-xl overflow-hidden mt-4"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <ModuleGraph nodes={s.moduleFlowNodes} edges={s.moduleFlowEdges} color={s.color} lang={lang} />
          </div>
        </section>

        {/* ── Architecture Points ── */}
        <section>
          <SectionHeading color={s.color} icon="🏗️"
            zh="架构设计要点" en="Architecture Design Notes" lang={lang} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {s.architecturePoints.map((ap, i) => (
              <div key={i} className="rounded-xl p-5"
                style={{ background: "var(--bg-card)", border: `1px solid ${s.color}20` }}>
                <h3 className="text-sm font-semibold mb-2" style={{ color: s.color }}>{t(ap.title)}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{t(ap.desc)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Integration Map ── */}
        <section>
          <SectionHeading color={s.color} icon="🔌"
            zh="系统集成关系" en="System Integration Map" lang={lang} />
          <div className="rounded-xl overflow-hidden mt-4"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <IntegrationMap points={s.integrationPoints} systemLabel={s.label} color={s.color} lang={lang} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            {s.integrationPoints.map((ip, i) => (
              <div key={i} className="rounded-lg p-4 flex gap-3"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="shrink-0 mt-0.5">
                  <span className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.25)" }}>
                    {DIR_ICONS[ip.direction]} {DIR_LABELS[ip.direction][lang]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{ip.system}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0 rounded"
                      style={{ background: "rgba(15,23,42,0.5)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                      {ip.protocol}
                    </span>
                    <span className="text-[10px] font-mono" style={{ color: s.color }}>{ip.message}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{t(ip.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Key Entities ── */}
        <section>
          <SectionHeading color={s.color} icon="🗄️"
            zh="核心数据实体" en="Key Data Entities" lang={lang} />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">
            {s.keyEntities.map((e) => (
              <div key={e.name} className="rounded-lg p-4"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <p className="text-xs font-bold font-mono mb-1.5" style={{ color: s.color }}>{e.name}</p>
                {e.table && (
                  <p className="text-[10px] font-mono mb-1" style={{ color: "var(--text-muted)" }}>{e.table}</p>
                )}
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{t(e.desc)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Pitfalls ── */}
        <section>
          <SectionHeading color="#ef4444" icon="⚠️"
            zh="常见陷阱与痛点" en="Common Pitfalls & Pain Points" lang={lang} />
          <div className="space-y-3 mt-4">
            {s.pitfalls.map((p, i) => {
              const sev = SEVERITY_COLORS[p.severity];
              return (
                <div key={i} className="rounded-xl p-5"
                  style={{ background: sev.bg, border: `1px solid ${sev.border}` }}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase"
                      style={{ background: `${sev.text}20`, color: sev.text, border: `1px solid ${sev.text}30` }}>
                      {sev.label[lang]}
                    </span>
                    <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{t(p.title)}</h3>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{t(p.desc)}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Back link ── */}
        <div className="pt-4 border-t" style={{ borderColor: "var(--border)" }}>
          <Link href="/l2" className="text-xs hover:underline" style={{ color: "var(--text-muted)" }}>
            ← {lang === "zh" ? "返回 L2 系统架构" : "Back to L2 System Architecture"}
          </Link>
        </div>

      </div>
    </div>
  );
}

function SectionHeading({
  color, icon, zh, en, lang,
}: { color: string; icon: string; zh: string; en: string; lang: "zh" | "en" }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-base">{icon}</span>
      <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
        {lang === "zh" ? zh : en}
      </h2>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg,${color}40,transparent)` }} />
    </div>
  );
}
