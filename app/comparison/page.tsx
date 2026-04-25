import { comparisonData } from "@/lib/data";
import PageHeader from "@/components/PageHeader";

const industryColors: Record<string, { bg: string; border: string; text: string }> = {
  blue:  { bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.3)",  text: "#3b82f6" },
  green: { bg: "rgba(34,197,94,0.06)",   border: "rgba(34,197,94,0.25)",  text: "#22c55e" },
  amber: { bg: "rgba(245,158,11,0.06)",  border: "rgba(245,158,11,0.25)", text: "#f59e0b" },
};

const riskLevel = [
  { label: "超卖风险", value: "极高", color: "#ef4444" },
  { label: "全损风险", value: "极高", color: "#ef4444" },
  { label: "停线风险", value: "极高", color: "#ef4444" },
];

export default function ComparisonPage() {
  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <PageHeader
          level="参数"
          title="行业差异化对比参数表"
          en="Industry Comparison Parameters"
          desc="不同行业的供应链在缓冲策略、追踪维度、系统侧重点和致命风险上存在本质差异。本表可作为扩充行业场景的 JSON 数据结构构建基础。"
          color="#f59e0b"
        />

        {/* Main comparison table */}
        <section className="mb-16">
          <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--border)" }}>
            <table className="w-full text-xs border-collapse" style={{ minWidth: 640 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th className="text-left p-4 font-semibold w-36"
                    style={{ background: "var(--bg-card)", color: "var(--text-muted)" }}>
                    参数维度
                  </th>
                  {comparisonData.industries.map((ind) => {
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
                {comparisonData.dimensions.map((dim, di) => (
                  <tr key={dim}
                    style={{ borderBottom: "1px solid var(--border-subtle)" }}
                    className="transition-colors hover:bg-white/[0.01]">
                    <td className="p-4 font-semibold"
                      style={{ background: "var(--bg-card)", color: "var(--text-secondary)", borderRight: "1px solid var(--border)" }}>
                      {dim}
                    </td>
                    {comparisonData.industries.map((ind) => {
                      const c = industryColors[ind.color];
                      return (
                        <td key={ind.name} className="p-4 text-center leading-relaxed"
                          style={{
                            color: ind.highlight ? "var(--text-primary)" : "var(--text-secondary)",
                            background: ind.highlight ? `${c.bg.replace("0.08", "0.03")}` : "transparent",
                          }}>
                          {di === 3 ? (
                            <span className="inline-block px-2 py-1 rounded text-[10px] leading-snug"
                              style={{
                                background: "rgba(239,68,68,0.08)",
                                color: "#f87171",
                                border: "1px solid rgba(239,68,68,0.2)",
                              }}>
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
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-6"
            style={{ color: "var(--text-muted)" }}>
            致命异常风险对比 · Fatal Risk Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comparisonData.industries.map((ind) => {
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
                    <span className="font-semibold block mb-1" style={{ color: "#ef4444" }}>⚡ 致命风险</span>
                    {ind.values[3]}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* JSON data hint */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--text-muted)" }}>
            JSON 数据结构参考 · Data Structure Hint
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
{`{
  <span style="color:#c792ea">"industries"</span>: [
    {
      <span style="color:#c792ea">"name"</span>: <span style="color:#c3e88d">"消费电子"</span>,
      <span style="color:#c792ea">"buffer"</span>: <span style="color:#c3e88d">"RDC 成品仓库"</span>,
      <span style="color:#c792ea">"tracking"</span>: <span style="color:#c3e88d">"SN 序列号 (IMEI/MAC)"</span>,
      <span style="color:#c792ea">"systemFocus"</span>: <span style="color:#c3e88d">"OMS 高并发拆单路由"</span>,
      <span style="color:#c792ea">"fatalRisk"</span>: <span style="color:#c3e88d">"秒杀导致系统超卖超发"</span>
    },
    {
      <span style="color:#c792ea">"name"</span>: <span style="color:#c3e88d">"生鲜冷链"</span>,
      <span style="color:#c792ea">"buffer"</span>: <span style="color:#c3e88d">"极短，几乎不设缓冲"</span>,
      <span style="color:#c792ea">"tracking"</span>: <span style="color:#c3e88d">"批次号 (Batch) 与效期"</span>,
      <span style="color:#c792ea">"systemFocus"</span>: <span style="color:#c3e88d">"IoT 实时温湿度上报"</span>,
      <span style="color:#c792ea">"fatalRisk"</span>: <span style="color:#c3e88d">"制冷机组宕机导致全损"</span>
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
