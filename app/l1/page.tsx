"use client";
import { l1BusinessNodes, l1PainPoints } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import FlowArrow from "@/components/FlowArrow";
import { useLanguage } from "@/contexts/LanguageContext";

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  blue:   { bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.3)",  text: "#3b82f6" },
  indigo: { bg: "rgba(99,102,241,0.08)",  border: "rgba(99,102,241,0.3)",  text: "#6366f1" },
  violet: { bg: "rgba(139,92,246,0.08)",  border: "rgba(139,92,246,0.3)",  text: "#8b5cf6" },
  purple: { bg: "rgba(168,85,247,0.08)",  border: "rgba(168,85,247,0.3)",  text: "#a855f7" },
  pink:   { bg: "rgba(236,72,153,0.08)",  border: "rgba(236,72,153,0.3)",  text: "#ec4899" },
  rose:   { bg: "rgba(244,63,94,0.08)",   border: "rgba(244,63,94,0.3)",   text: "#f43f5e" },
};

const nodeTranslations = {
  zh: [
    { label: "Tier 1 / Tier 2 供应商", sublabel: "Suppliers", description: "提供芯片、屏幕、外壳等核心物料" },
    { label: "OEM 代工厂", sublabel: "Contract Manufacturer", description: "负责 PCBA 贴片与最终组装（如富士康）" },
    { label: "全球集散中心", sublabel: "Global DC", description: "靠近产地的超级枢纽" },
    { label: "区域配送中心", sublabel: "Regional DC", description: "靠近消费市场的仓库（华东仓、北美仓）" },
    { label: "直营门店", sublabel: "Retail Stores", description: "兼具展示与「前置仓 Micro-fulfillment」属性" },
    { label: "消费者", sublabel: "Consumer (DTC)", description: "DTC 直接触达终端用户" },
  ],
  en: [
    { label: "Tier 1 / Tier 2 Suppliers", sublabel: "Suppliers", description: "Chips, screens, enclosures and other core materials" },
    { label: "OEM / Contract Manufacturer", sublabel: "e.g. Foxconn", description: "Responsible for PCBA SMT and final assembly" },
    { label: "Global Distribution Center", sublabel: "GDC", description: "Super-hub located near manufacturing sites" },
    { label: "Regional Distribution Center", sublabel: "RDC", description: "Warehouses close to consumer markets (APAC, NA)" },
    { label: "Retail Stores", sublabel: "Direct Retail", description: "Dual-purpose: showroom + micro-fulfillment node" },
    { label: "Consumer", sublabel: "Consumer (DTC)", description: "DTC — brand reaches end customer directly" },
  ],
};

const painTranslations = {
  zh: [
    {
      title: "VMI",
      subtitle: "Vendor Managed Inventory",
      body: "供应商管理库存。物料在代工厂仓库里，但所有权仍属供应商，直到被拉上流水线才结算。",
      tag: "库存策略",
    },
    {
      title: "逆向物流",
      subtitle: "Reverse Logistics",
      body: "电子产品退货涉及极复杂的成色鉴定、翻新 (Refurbish) 或环保拆解，直接影响二次销售。",
      tag: "风险管理",
    },
  ],
  en: [
    {
      title: "VMI",
      subtitle: "Vendor Managed Inventory",
      body: "Supplier-managed inventory. Materials sit in the OEM warehouse but ownership stays with the supplier until pulled onto the production line.",
      tag: "Inventory Strategy",
    },
    {
      title: "Reverse Logistics",
      subtitle: "Returns & Refurbishment",
      body: "Electronics returns involve complex grading, refurbishment, or eco-friendly disassembly — directly impacting resale value.",
      tag: "Risk Management",
    },
  ],
};

export default function L1Page() {
  const { lang, t } = useLanguage();
  const l1 = t.l1;
  const nodes = nodeTranslations[lang];
  const pains = painTranslations[lang];

  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <PageHeader
          level={l1.level}
          title={l1.title}
          en={l1.en}
          desc={l1.desc}
          color="#3b82f6"
        />

        {/* Flow diagram */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-8" style={{ color: "var(--text-muted)" }}>
            {l1.flowTitle}
          </h2>

          {/* Desktop */}
          <div className="hidden lg:flex items-stretch gap-0">
            {l1BusinessNodes.map((node, i) => {
              const c = colorMap[node.color];
              const n = nodes[i];
              return (
                <div key={node.id} className="flex items-stretch">
                  <div
                    className="flex flex-col items-center p-5 rounded-xl w-44 transition-all hover:-translate-y-1"
                    style={{ background: c.bg, border: `1px solid ${c.border}` }}
                  >
                    <span className="text-2xl mb-2">{node.icon}</span>
                    <p className="text-xs font-bold text-center leading-tight mb-1" style={{ color: c.text }}>
                      {n.label}
                    </p>
                    <p className="text-[10px] text-center mb-2" style={{ color: "var(--text-muted)" }}>
                      {n.sublabel}
                    </p>
                    <p className="text-[10px] text-center leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {n.description}
                    </p>
                  </div>
                  {i < l1BusinessNodes.length - 1 && <FlowArrow color={c.text} />}
                </div>
              );
            })}
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex flex-col gap-3">
            {l1BusinessNodes.map((node, i) => {
              const c = colorMap[node.color];
              const n = nodes[i];
              return (
                <div key={node.id}>
                  <div
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ background: c.bg, border: `1px solid ${c.border}` }}
                  >
                    <span className="text-2xl shrink-0">{node.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold" style={{ color: c.text }}>{n.label}</p>
                      <p className="text-[10px] mb-0.5" style={{ color: "var(--text-muted)" }}>{n.sublabel}</p>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{n.description}</p>
                    </div>
                  </div>
                  {i < l1BusinessNodes.length - 1 && (
                    <div className="flex justify-center py-1">
                      <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
                        <path d="M7 0 L7 14 M3 10 L7 14 L11 10" stroke={c.text} strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* DTC value prop */}
        <section
          className="mb-16 p-6 rounded-xl"
          style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.12)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 rounded-full" style={{ background: "linear-gradient(180deg,#3b82f6,#6366f1)" }} />
            <div>
              <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{l1.dtcTitle}</h3>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{l1.dtcEn}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs" style={{ color: "var(--text-secondary)" }}>
            {(l1.dtcPoints as { icon: string; title: string; body: string }[]).map((pt) => (
              <div key={pt.title}>
                <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{pt.icon} {pt.title}</p>
                <p>{pt.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pain points */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--text-muted)" }}>
            {l1.painTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pains.map((pt) => (
              <div
                key={pt.title}
                className="p-6 rounded-xl"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{pt.title}</h3>
                    <p className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>{pt.subtitle}</p>
                  </div>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase"
                    style={{ background: "rgba(245,158,11,0.08)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}
                  >
                    {pt.tag}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{pt.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
