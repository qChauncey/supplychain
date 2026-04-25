import Link from "next/link";
import { siteConfig } from "@/lib/data";

const sections = [
  {
    href: "/l1",
    level: "L1",
    title: "宏观业务流",
    en: "Business Flow",
    desc: "DTC 模式下的核心业务节点流转：供应商 → 代工厂 → GDC → RDC → 门店 → 消费者",
    tags: ["VMI", "逆向物流", "前置仓"],
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.10)",
  },
  {
    href: "/l2",
    level: "L2",
    title: "系统架构流",
    en: "System Architecture",
    desc: "跨国供应链由数十个孤立重型企业级软件拼接而成：ERP / OMS / WMS / TMS / SRM",
    tags: ["SAP S/4HANA", "IDoc / EDI", "RESTful API"],
    color: "#6366f1",
    glow: "rgba(99,102,241,0.10)",
  },
  {
    href: "/l3",
    level: "L3",
    title: "微观系统交互",
    en: "Micro Interactions",
    desc: "OMS 智能寻源拆单算法 + SAP ERP 与 WMS 的 IDoc 出库握手时序图",
    tags: ["ATP 校验", "SHP_OBDLV_SAVE_REPLICA", "WHSCON"],
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.10)",
  },
  {
    href: "/comparison",
    level: "参数",
    title: "行业差异化对比",
    en: "Industry Comparison",
    desc: "消费电子 vs 生鲜冷链 vs 汽车制造 JIT 的核心参数维度横向对比",
    tags: ["序列号追踪", "IoT 温湿度", "Kanban 拉动"],
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.10)",
  },
];

const stats = [
  { label: "系统层级", value: "3 层" },
  { label: "核心业务节点", value: "6 个" },
  { label: "企业级系统", value: "5 套" },
  { label: "集成协议", value: "4 类" },
];

export default function HomePage() {
  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20">

        {/* Hero */}
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", color: "#3b82f6" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block animate-pulse" />
            系统级架构参考 · 全渠道 DTC 供应链
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-5"
            style={{ color: "var(--text-primary)" }}>
            全球电子制造
            <br />
            <span style={{
              background: "linear-gradient(135deg,#3b82f6,#6366f1,#06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              DTC 供应链架构手册
            </span>
          </h1>

          <p className="text-base leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
            {siteConfig.description}
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            场景蓝本：全球高端消费电子品牌（参考 Apple / Huawei）全渠道直营供应链体系
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-10 mt-10 mb-16 pt-10 border-t" style={{ borderColor: "var(--border-subtle)" }}>
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Section cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((s, i) => (
            <Link key={s.href} href={s.href}
              className="group block p-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                animationDelay: `${i * 80}ms`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ background: s.glow, color: s.color, border: `1px solid ${s.color}40` }}>
                    {s.level}
                  </span>
                  <div>
                    <h2 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{s.title}</h2>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{s.en}</p>
                  </div>
                </div>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  style={{ color: "var(--text-muted)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>

              <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>

              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded font-mono"
                    style={{ background: "var(--bg-secondary)", color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Usage note */}
        <div className="mt-8 p-5 rounded-xl text-xs leading-relaxed"
          style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.12)", color: "var(--text-secondary)" }}>
          <span className="font-semibold" style={{ color: "#3b82f6" }}>使用建议：</span>
          {" "}在使用前端可视化图表库时，请将 <strong style={{ color: "var(--text-primary)" }}>L2 系统架构</strong> 作为画布宏观网络图的数据源，将 <strong style={{ color: "var(--text-primary)" }}>L3 微观交互</strong> 作为双击某个特定系统后展开的底层时序和说明面板的数据源。
        </div>
      </div>
    </div>
  );
}
