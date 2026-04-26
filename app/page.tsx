"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const TOP_SECTIONS = [
  {
    href: "/procurement",
    color: "#3b82f6", glow: "rgba(59,130,246,0.10)",
    level: { zh: "采购", en: "Procurement" },
    title: { zh: "采购管理", en: "Procurement Management" },
    desc: { zh: "从战略寻源到付款结算的端到端采购体系：供应商管理、PO 协同、三路匹配", en: "End-to-end procurement from strategic sourcing to payment: supplier management, PO collaboration, three-way match" },
    tags: ["SRM", "RFQ / PO", "EDI / VMI"],
  },
  {
    href: "/planning",
    color: "#6366f1", glow: "rgba(99,102,241,0.10)",
    level: { zh: "计划", en: "Planning" },
    title: { zh: "供应链计划", en: "Supply Chain Planning" },
    desc: { zh: "需求预测、MRP/MPS、S&OP、库存计划与仓网布局优化", en: "Demand forecasting, MRP/MPS, S&OP, inventory planning, and warehouse network optimization" },
    tags: ["APS / IBP", "S&OP", "安全库存 / Safety Stock"],
  },
  {
    href: "/flow",
    color: "#8b5cf6", glow: "rgba(139,92,246,0.10)",
    level: { zh: "系统", en: "System Flow" },
    title: { zh: "系统流程与架构", en: "System Flow & Architecture" },
    desc: { zh: "L1 业务流 / L2 系统架构 / L3 微观交互 — 以 DTC 消费电子为蓝本的系统级参考架构", en: "L1 Business Flow / L2 System Architecture / L3 Micro Interactions — system-level reference architecture based on a DTC consumer electronics scenario" },
    tags: ["ERP / OMS / WMS", "IDoc / EDI", "ATP / 寻源路由"],
  },
  {
    href: "/transportation",
    color: "#a855f7", glow: "rgba(168,85,247,0.10)",
    level: { zh: "运输", en: "Transport" },
    title: { zh: "运输管理", en: "Transportation Management" },
    desc: { zh: "运输方式选择、承运商管理、实时可视化追踪、报关合规与最后一公里交付", en: "Mode selection, carrier management, real-time visibility tracking, customs compliance, and last-mile delivery" },
    tags: ["TMS", "FCL / LCL", "最后一公里 / Last Mile"],
  },
];

export default function HomePage() {
  const { lang, t } = useLanguage();

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
          {TOP_SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group glass-card block p-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "var(--bg-card)", border: `1px solid ${s.color}20` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ background: s.glow, color: s.color, border: `1px solid ${s.color}40` }}
                  >
                    {s.level[lang]}
                  </span>
                  <h2 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{s.title[lang]}</h2>
                </div>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  style={{ color: "var(--text-muted)" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>{s.desc[lang]}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded font-mono"
                    style={{ background: s.glow, color: s.color, border: `1px solid ${s.color}20` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
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
