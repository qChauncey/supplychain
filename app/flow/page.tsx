"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const SUB_SECTIONS = [
  {
    href: "/flow/l1",
    level: "L1",
    color: "#3b82f6",
    title: { zh: "宏观业务流", en: "Business Flow" },
    desc: { zh: "DTC 模式下的核心业务节点流转：供应商 → 代工厂 → GDC → RDC → 门店 → 消费者", en: "Core node flow in DTC mode: Supplier → OEM → GDC → RDC → Store → Consumer" },
    tags: ["VMI", "逆向物流 / Reverse Logistics", "前置仓 / Micro-fulfillment"],
  },
  {
    href: "/flow/l2",
    level: "L2",
    color: "#6366f1",
    title: { zh: "系统架构流", en: "System Architecture" },
    desc: { zh: "跨国供应链由数十个孤立重型企业级软件拼接而成：ERP / OMS / WMS / TMS / SRM", en: "A cross-border supply chain stitched from dozens of isolated enterprise systems: ERP / OMS / WMS / TMS / SRM" },
    tags: ["SAP S/4HANA", "IDoc / EDI", "RESTful API"],
  },
  {
    href: "/flow/l3",
    level: "L3",
    color: "#8b5cf6",
    title: { zh: "微观系统交互", en: "Micro Interactions" },
    desc: { zh: "OMS 智能寻源拆单算法 + SAP ERP 与 WMS 的 IDoc 出库握手时序图", en: "OMS intelligent order routing & split + SAP ERP ↔ WMS IDoc outbound handshake sequence" },
    tags: ["ATP 校验", "SHP_OBDLV_SAVE_REPLICA", "WHSCON"],
  },
  {
    href: "/flow/comparison",
    level: "对比",
    color: "#06b6d4",
    title: { zh: "行业差异化对比", en: "Industry Comparison" },
    desc: { zh: "消费电子 vs 生鲜冷链 vs 汽车制造 JIT 的核心参数维度横向对比", en: "Consumer Electronics vs Fresh Cold Chain vs Automotive JIT — core parameter dimensions side-by-side" },
    tags: ["序列号追踪", "IoT 温湿度", "Kanban 拉动"],
  },
  {
    href: "/systems/erp",
    level: "系统",
    color: "#f59e0b",
    title: { zh: "企业系统详情", en: "System Deep Dives" },
    desc: { zh: "ERP / OMS / WMS / TMS / SRM / WCS 各系统的模块架构、集成协议、关键指标与典型陷阱", en: "Module architecture, integration protocols, KPIs, and pitfalls for ERP / OMS / WMS / TMS / SRM / WCS" },
    tags: ["6 套系统", "模块图", "集成关系"],
  },
  {
    href: "/flow/demo",
    level: "演示",
    color: "#22c55e",
    title: { zh: "订单全链路演示", en: "Order Flow Demo" },
    desc: { zh: "一笔真实订单从消费者下单到签收的完整旅程，业务流与系统流实时同步映射", en: "A real order's complete journey from consumer checkout to doorstep delivery, with business and system flows synchronized" },
    tags: ["19 步动画", "实时映射", "可交互"],
  },
];

export default function FlowPage() {
  const { lang } = useLanguage();

  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">

        {/* Header */}
        <div className="mb-12 animate-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold px-2.5 py-1 rounded font-mono"
              style={{ background: "rgba(99,102,241,0.10)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.3)" }}>
              SYSTEM FLOW
            </span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,rgba(99,102,241,0.4),transparent)" }} />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            {lang === "zh" ? "系统流程与架构" : "System Flow & Architecture"}
          </h1>
          <p className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>
            {lang === "zh" ? "以 DTC 消费电子场景为蓝本的系统级参考架构" : "System-level reference architecture based on a DTC consumer electronics scenario"}
          </p>
          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            {lang === "zh"
              ? "本模块以全球高端消费电子品牌（参考 Apple / Huawei）的全渠道直营供应链为蓝本，分 L1 业务流、L2 系统架构、L3 微观交互三个层级，呈现真实供应链系统的全貌。"
              : "This module uses a global premium consumer electronics brand (ref. Apple / Huawei) DTC supply chain as its reference scenario, presenting the full picture across L1 Business Flow, L2 System Architecture, and L3 Micro Interactions."}
          </p>
        </div>

        {/* Sub-section cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {SUB_SECTIONS.map((s) => (
            <Link key={s.href} href={s.href}
              className="group rounded-xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ background: "var(--bg-card)", border: `1px solid ${s.color}25` }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded font-mono"
                  style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}30` }}>
                  {s.level}
                </span>
                <span className="text-sm font-bold group-hover:underline" style={{ color: "var(--text-primary)" }}>
                  {s.title[lang]}
                </span>
              </div>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                {s.desc[lang]}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded font-mono"
                    style={{ background: `${s.color}08`, color: s.color, border: `1px solid ${s.color}20` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
