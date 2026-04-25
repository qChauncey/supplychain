import { l1BusinessNodes, l1PainPoints } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import FlowArrow from "@/components/FlowArrow";

const colorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  blue:   { bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.3)",  text: "#3b82f6",  dot: "#3b82f6" },
  indigo: { bg: "rgba(99,102,241,0.08)",  border: "rgba(99,102,241,0.3)",  text: "#6366f1",  dot: "#6366f1" },
  violet: { bg: "rgba(139,92,246,0.08)",  border: "rgba(139,92,246,0.3)",  text: "#8b5cf6",  dot: "#8b5cf6" },
  purple: { bg: "rgba(168,85,247,0.08)",  border: "rgba(168,85,247,0.3)",  text: "#a855f7",  dot: "#a855f7" },
  pink:   { bg: "rgba(236,72,153,0.08)",  border: "rgba(236,72,153,0.3)",  text: "#ec4899",  dot: "#ec4899" },
  rose:   { bg: "rgba(244,63,94,0.08)",   border: "rgba(244,63,94,0.3)",   text: "#f43f5e",  dot: "#f43f5e" },
};

export default function L1Page() {
  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <PageHeader
          level="L1"
          title="宏观业务流"
          en="Business Flow — DTC Mode"
          desc="在传统分销的基础上，DTC 模式极大地压缩了中间环节，要求极高的业务敏捷度。核心节点从上游供应商直达终端消费者。"
          color="#3b82f6"
        />

        {/* Flow diagram */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-8"
            style={{ color: "var(--text-muted)" }}>
            核心业务节点流 · Business Nodes Flow
          </h2>

          {/* Desktop horizontal flow */}
          <div className="hidden lg:flex items-stretch gap-0">
            {l1BusinessNodes.map((node, i) => {
              const c = colorMap[node.color];
              return (
                <div key={node.id} className="flex items-stretch">
                  <div className="flex flex-col items-center p-5 rounded-xl w-44 transition-all hover:-translate-y-1"
                    style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                    <span className="text-2xl mb-2">{node.icon}</span>
                    <p className="text-xs font-bold text-center leading-tight mb-1" style={{ color: c.text }}>
                      {node.label}
                    </p>
                    <p className="text-[10px] text-center mb-2" style={{ color: "var(--text-muted)" }}>
                      {node.sublabel}
                    </p>
                    <p className="text-[10px] text-center leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {node.description}
                    </p>
                  </div>
                  {i < l1BusinessNodes.length - 1 && <FlowArrow color={c.text} />}
                </div>
              );
            })}
          </div>

          {/* Mobile vertical flow */}
          <div className="lg:hidden flex flex-col gap-3">
            {l1BusinessNodes.map((node, i) => {
              const c = colorMap[node.color];
              return (
                <div key={node.id}>
                  <div className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                    <span className="text-2xl shrink-0">{node.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold" style={{ color: c.text }}>{node.label}</p>
                      <p className="text-[10px] mb-0.5" style={{ color: "var(--text-muted)" }}>{node.sublabel}</p>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{node.description}</p>
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
        <section className="mb-16 p-6 rounded-xl"
          style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.12)" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 rounded-full" style={{ background: "linear-gradient(180deg,#3b82f6,#6366f1)" }} />
            <div>
              <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>DTC 模式核心价值</h3>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Direct-to-Consumer Value Proposition</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs" style={{ color: "var(--text-secondary)" }}>
            <div>
              <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>🔗 缩短链路</p>
              <p>去除传统经销商层级，品牌直接触达消费者，利润率提升 15~25%</p>
            </div>
            <div>
              <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>📊 数据直达</p>
              <p>自有订单数据，精准洞察用户行为，驱动产品与库存决策</p>
            </div>
            <div>
              <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>⚡ 极速响应</p>
              <p>通过前置仓与门店履约，实现最快 2 小时达的服务承诺</p>
            </div>
          </div>
        </section>

        {/* Pain points */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-6"
            style={{ color: "var(--text-muted)" }}>
            关键业务痛点 · Pain Points
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {l1PainPoints.map((pt) => (
              <div key={pt.id} className="p-6 rounded-xl"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{pt.title}</h3>
                    <p className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>{pt.subtitle}</p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase"
                    style={{ background: "rgba(245,158,11,0.08)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>
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
