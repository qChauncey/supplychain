"use client";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";

const industryColors: Record<string, { bg: string; border: string; text: string }> = {
  blue:  { bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.3)",  text: "#3b82f6" },
  green: { bg: "rgba(34,197,94,0.06)",   border: "rgba(34,197,94,0.25)",  text: "#22c55e" },
  amber: { bg: "rgba(245,158,11,0.06)",  border: "rgba(245,158,11,0.25)", text: "#f59e0b" },
};

const tableData = {
  zh: {
    dimensions: ["主要缓冲点", "关键追踪维度", "系统交互重点", "致命异常风险"],
    industries: [
      {
        name: "消费电子", subtitle: "本文蓝本", icon: "📱", color: "blue", highlight: true,
        values: ["成品仓库 (RDC)", "SN 序列号 (IMEI/MAC)", "OMS 高并发拆单路由", "热门新品秒杀导致的系统超卖超发"],
      },
      {
        name: "生鲜冷链", subtitle: "备选扩充", icon: "🥦", color: "green", highlight: false,
        values: ["极短，几乎不设缓冲", "批次号 (Batch) 与效期", "IoT 平台实时温湿度上报", "运输途中制冷机组宕机导致全损"],
      },
      {
        name: "汽车制造 JIT", subtitle: "备选扩充", icon: "🚗", color: "amber", highlight: false,
        values: ["供应商线边仓 (VMI)", "零件号 (Part Number)", "ERP MRP 运算与供应商 Kanban 拉动", "某个小零件缺货导致整条总装线停工"],
      },
    ],
    jsonSample: `{
  "industries": [
    {
      "name": "消费电子",
      "buffer": "RDC 成品仓库",
      "tracking": "SN 序列号 (IMEI/MAC)",
      "systemFocus": "OMS 高并发拆单路由",
      "fatalRisk": "秒杀导致系统超卖超发"
    },
    {
      "name": "生鲜冷链",
      "buffer": "极短，几乎不设缓冲",
      "tracking": "批次号 (Batch) 与效期",
      "systemFocus": "IoT 实时温湿度上报",
      "fatalRisk": "制冷机组宕机导致全损"
    }
  ]
}`,
  },
  en: {
    dimensions: ["Primary Buffer Point", "Key Tracking Dimension", "System Focus", "Fatal Risk"],
    industries: [
      {
        name: "Consumer Electronics", subtitle: "This guide's scenario", icon: "📱", color: "blue", highlight: true,
        values: ["Finished goods warehouse (RDC)", "Serial number (IMEI / MAC)", "OMS high-concurrency order routing & split", "Flash-sale-induced oversell / over-shipment"],
      },
      {
        name: "Fresh Cold Chain", subtitle: "Optional extension", icon: "🥦", color: "green", highlight: false,
        values: ["Minimal — almost no buffer", "Batch number & expiry date", "IoT platform real-time temp/humidity reporting", "Refrigeration unit failure causing total loss in transit"],
      },
      {
        name: "Automotive JIT", subtitle: "Optional extension", icon: "🚗", color: "amber", highlight: false,
        values: ["Supplier lineside VMI warehouse", "Part number (PN)", "ERP MRP calculation & supplier Kanban pull", "One missing small part halts the entire assembly line"],
      },
    ],
    jsonSample: `{
  "industries": [
    {
      "name": "Consumer Electronics",
      "buffer": "RDC finished goods warehouse",
      "tracking": "Serial number (IMEI/MAC)",
      "systemFocus": "OMS high-concurrency order routing",
      "fatalRisk": "Flash sale oversell / over-shipment"
    },
    {
      "name": "Fresh Cold Chain",
      "buffer": "Minimal — almost no buffer",
      "tracking": "Batch number & expiry date",
      "systemFocus": "IoT real-time temp/humidity reporting",
      "fatalRisk": "Refrigeration failure → total cargo loss"
    }
  ]
}`,
  },
};

export default function ComparisonPage() {
  const { lang, t } = useLanguage();
  const comp = t.comparison;
  const data = tableData[lang];

  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <PageHeader level={comp.level} title={comp.title} en={comp.en} desc={comp.desc} color="#f59e0b" />

        {/* Main comparison table */}
        <section className="mb-16">
          <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--border)" }}>
            <table className="w-full text-xs border-collapse" style={{ minWidth: 640 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th className="text-left p-4 font-semibold w-40"
                    style={{ background: "var(--bg-card)", color: "var(--text-muted)" }}>
                    {lang === "zh" ? "参数维度" : "Dimension"}
                  </th>
                  {data.industries.map((ind) => {
                    const c = industryColors[ind.color];
                    return (
                      <th key={ind.name} className="text-center p-4 font-semibold"
                        style={{ background: ind.highlight ? c.bg : "var(--bg-card)" }}>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg">{ind.icon}</span>
                          <span style={{ color: ind.highlight ? c.text : "var(--text-primary)" }}>{ind.name}</span>
                          <span className="text-[10px] font-normal px-2 py-0.5 rounded"
                            style={{
                              background: ind.highlight ? `${c.text}20` : "var(--bg-secondary)",
                              color: ind.highlight ? c.text : "var(--text-muted)",
                              border: `1px solid ${ind.highlight ? `${c.text}30` : "var(--border-subtle)"}`,
                            }}>
                            {ind.subtitle}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data.dimensions.map((dim, di) => (
                  <tr key={dim} style={{ borderBottom: "1px solid var(--border-subtle)" }}
                    className="transition-colors hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold"
                      style={{ background: "var(--bg-card)", color: "var(--text-secondary)", borderRight: "1px solid var(--border)" }}>
                      {dim}
                    </td>
                    {data.industries.map((ind) => {
                      const c = industryColors[ind.color];
                      return (
                        <td key={ind.name} className="p-4 text-center leading-relaxed"
                          style={{
                            color: ind.highlight ? "var(--text-primary)" : "var(--text-secondary)",
                            background: ind.highlight ? `${c.bg.replace("0.08", "0.03")}` : "transparent",
                          }}>
                          {di === 3 ? (
                            <span className="inline-block px-2 py-1 rounded text-[10px] leading-snug"
                              style={{ background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                              {ind.values[di]}
                            </span>
                          ) : di === 1 ? (
                            <span className="font-mono font-semibold" style={{ color: c.text }}>
                              {ind.values[di]}
                            </span>
                          ) : (
                            ind.values[di]
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Risk cards */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--text-muted)" }}>
            {comp.tableTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.industries.map((ind) => {
              const c = industryColors[ind.color];
              return (
                <div key={ind.name} className="p-5 rounded-xl"
                  style={{ background: "var(--bg-card)", border: `1px solid ${ind.highlight ? c.border : "var(--border)"}` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{ind.icon}</span>
                    <div>
                      <p className="font-bold text-sm" style={{ color: ind.highlight ? c.text : "var(--text-primary)" }}>{ind.name}</p>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{ind.subtitle}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg text-xs leading-relaxed"
                    style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", color: "#fca5a5" }}>
                    <span className="font-semibold block mb-1" style={{ color: "#ef4444" }}>{comp.riskLabel}</span>
                    {ind.values[3]}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* JSON hint */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
            {comp.jsonTitle}
          </h2>
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 px-5 py-2.5"
              style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border)" }}>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444", opacity: 0.6 }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b", opacity: 0.6 }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e", opacity: 0.6 }} />
              </div>
              <span className="text-xs font-mono ml-2" style={{ color: "var(--text-muted)" }}>industry-comparison.json</span>
            </div>
            <div style={{ background: "#080c14" }}>
              <pre className="p-5 text-xs leading-7 overflow-x-auto" style={{ color: "var(--text-secondary)", margin: 0 }}>
                {data.jsonSample}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
