import { l2SystemNodes, l2Edges } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import SystemGraph from "@/components/SystemGraph";

const nodeColorMap: Record<string, { bg: string; border: string; text: string }> = {
  blue:   { bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.35)",  text: "#3b82f6" },
  indigo: { bg: "rgba(99,102,241,0.08)",  border: "rgba(99,102,241,0.35)",  text: "#6366f1" },
  violet: { bg: "rgba(139,92,246,0.08)",  border: "rgba(139,92,246,0.35)",  text: "#8b5cf6" },
  purple: { bg: "rgba(168,85,247,0.08)",  border: "rgba(168,85,247,0.35)",  text: "#a855f7" },
  cyan:   { bg: "rgba(6,182,212,0.08)",   border: "rgba(6,182,212,0.35)",   text: "#06b6d4" },
};

const protocolBadge: Record<string, string> = {
  "OData / RESTful API": "#3b82f6",
  "EDI / IDoc":          "#8b5cf6",
  "TCP/IP Sockets / MQTT": "#f59e0b",
  "EDI / Portal API":    "#8b5cf6",
  "RESTful API":         "#3b82f6",
};

export default function L2Page() {
  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <PageHeader
          level="L2"
          title="系统架构流"
          en="System Architecture & Integration"
          desc="真实的跨国供应链是由数十个孤立的重型企业级软件拼接而成的。每个系统都有自己的技术债、集成协议和数据格式。"
          color="#6366f1"
        />

        {/* Interactive graph */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-6"
            style={{ color: "var(--text-muted)" }}>
            系统拓扑图 · System Topology
          </h2>
          <SystemGraph />
        </section>

        {/* System nodes grid */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-6"
            style={{ color: "var(--text-muted)" }}>
            核心系统图谱 · System Nodes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {l2SystemNodes.map((node) => {
              const c = nodeColorMap[node.color];
              return (
                <div key={node.id} className="p-5 rounded-xl transition-all hover:-translate-y-0.5"
                  style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold font-mono" style={{ color: c.text }}>{node.label}</h3>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{node.sublabel}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded font-medium"
                      style={{ background: "var(--bg-secondary)", color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }}>
                      {node.role}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{node.description}</p>
                </div>
              );
            })}

            {/* WCS node (referenced in edges but not in main list) */}
            <div className="p-5 rounded-xl" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.25)" }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold font-mono" style={{ color: "#f59e0b" }}>WCS / PLC</h3>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>仓库控制系统 / 可编程控制器</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded font-medium"
                  style={{ background: "var(--bg-secondary)", color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }}>
                  自动化层
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                AGV 搬运机器人、传送带、分拣机等自动化设备的控制核心，通过 TCP/IP 或 MQTT 与 WMS 实时通信。
              </p>
            </div>
          </div>
        </section>

        {/* Integration edges */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-6"
            style={{ color: "var(--text-muted)" }}>
            系统连线与集成协议 · Integration Edges
          </h2>
          <div className="space-y-3">
            {l2Edges.map((edge, i) => {
              const color = protocolBadge[edge.protocol] ?? "#94a3b8";
              return (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  {/* Systems */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold font-mono px-2 py-1 rounded"
                      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                      {edge.from}
                    </span>
                    <svg width="24" height="10" viewBox="0 0 24 10" fill="none">
                      <path d="M0 5 L18 5 M14 1 L18 5 L14 9" stroke={color} strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
                    </svg>
                    <span className="text-xs font-bold font-mono px-2 py-1 rounded"
                      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                      {edge.to}
                    </span>
                  </div>

                  {/* Protocol badge */}
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded shrink-0"
                    style={{ background: `${color}10`, color, border: `1px solid ${color}30` }}>
                    {edge.protocol}
                  </span>

                  {/* Description */}
                  <p className="text-xs flex-1 min-w-0" style={{ color: "var(--text-secondary)" }}>
                    {edge.description}
                  </p>

                  {/* Frequency */}
                  <span className="text-[10px] shrink-0 px-2 py-0.5 rounded"
                    style={{ background: "var(--bg-secondary)", color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }}>
                    {edge.frequency}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
