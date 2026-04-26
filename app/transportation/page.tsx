"use client";
import { useLanguage } from "@/contexts/LanguageContext";

const TOPICS = [
  {
    icon: "🚢",
    color: "#3b82f6",
    title: { zh: "运输方式选择", en: "Mode Selection" },
    desc: { zh: "海运（FCL/LCL）、空运、铁路、公路的成本-时效-碳排放三维权衡。根据货值、重量、时效要求选择最优运输组合。", en: "Three-dimensional trade-off of cost, transit time, and carbon emissions across ocean (FCL/LCL), air, rail, and road. Select the optimal modal mix based on cargo value, weight, and SLA requirements." },
    tags: ["FCL / LCL", "空海联运", "碳足迹"],
  },
  {
    icon: "🤝",
    color: "#6366f1",
    title: { zh: "承运商管理", en: "Carrier Management" },
    desc: { zh: "承运商资质审核、合同运价谈判、服务水平协议（SLA）管理、绩效评估。维护多承运商策略，避免单一承运商依赖。", en: "Carrier qualification, contract rate negotiation, SLA management, and performance evaluation. Maintain multi-carrier strategy to avoid single-carrier dependency." },
    tags: ["运价合同", "SLA 管理", "承运商评级"],
  },
  {
    icon: "📍",
    color: "#8b5cf6",
    title: { zh: "实时可视化追踪", en: "Real-time Visibility" },
    desc: { zh: "通过 TMS + 承运商 API + IoT 设备实现货物全程可视化。关键事件（装船/清关/签收）自动推送，异常自动预警。", en: "Full shipment visibility via TMS + carrier APIs + IoT devices. Auto-push for key events (vessel loading/customs clearance/delivery), with automatic anomaly alerting." },
    tags: ["TMS 集成", "IoT 追踪", "ETA 预测"],
  },
  {
    icon: "🏛️",
    color: "#06b6d4",
    title: { zh: "报关与合规", en: "Customs & Compliance" },
    desc: { zh: "进出口申报、HS 编码管理、原产地证书、关税预测。跨境供应链需应对多国海关法规差异，AEO/C-TPAT 认证降低清关延误风险。", en: "Import/export filing, HS code management, certificate of origin, duty forecasting. Cross-border supply chains must navigate multi-country customs regulations; AEO/C-TPAT certification reduces customs delay risk." },
    tags: ["HS 编码", "AEO 认证", "关税管理"],
  },
  {
    icon: "📦",
    color: "#22c55e",
    title: { zh: "最后一公里", en: "Last-Mile Delivery" },
    desc: { zh: "消费端配送成本最高的环节，占总物流成本 40-50%。通过前置仓、众包配送、门店自提、路径优化算法降低单票成本。", en: "The highest-cost segment of consumer delivery, accounting for 40-50% of total logistics cost. Reduce per-parcel cost through micro-fulfillment, crowdsourced delivery, store pickup, and route optimization." },
    tags: ["前置仓", "路径优化", "众包配送"],
  },
  {
    icon: "♻️",
    color: "#f59e0b",
    title: { zh: "逆向物流", en: "Reverse Logistics" },
    desc: { zh: "退货、维修、翻新、报废处置的全链路管理。消费电子逆向物流需兼顾数据安全清除、残值最大化与环保合规三重目标。", en: "Full-chain management of returns, repairs, refurbishment, and disposal. Consumer electronics reverse logistics must balance data security erasure, residual value maximization, and environmental compliance." },
    tags: ["RMA 流程", "残值回收", "数据销毁"],
  },
];

const KEY_SYSTEMS = [
  { label: "TMS", desc: { zh: "运输管理系统：承运商管理、运单生成、运费结算、轨迹追踪，如 Oracle OTM、JDA TMS", en: "Transportation Mgmt System: carrier management, shipment creation, freight settlement, track & trace — e.g. Oracle OTM, JDA TMS" }, color: "#a855f7" },
  { label: "可视化平台", desc: { zh: "货物全程追踪平台：FourKites、Project44、货拉拉等，聚合多承运商数据提供统一视图", en: "Supply chain visibility platform: FourKites, Project44 — aggregate multi-carrier data into a unified tracking view" }, color: "#3b82f6" },
  { label: "报关系统", desc: { zh: "进出口申报与合规：单一窗口对接、HS 编码自动归类、关税预测与退税申请", en: "Customs filing & compliance: single-window integration, HS code auto-classification, duty forecasting and drawback filing" }, color: "#06b6d4" },
];

export default function TransportationPage() {
  const { lang } = useLanguage();

  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">

        {/* Header */}
        <div className="mb-12 animate-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold px-2.5 py-1 rounded font-mono"
              style={{ background: "rgba(168,85,247,0.10)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.3)" }}>
              TRANSPORTATION
            </span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,rgba(168,85,247,0.4),transparent)" }} />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            {lang === "zh" ? "运输管理" : "Transportation Management"}
          </h1>
          <p className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>
            {lang === "zh" ? "从运输方式选择到最后一公里的全链路物流管理" : "Full-chain logistics management from mode selection to last-mile delivery"}
          </p>
          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            {lang === "zh"
              ? "运输是供应链中成本最高、可视化最差的环节之一。通过 TMS 系统、实时追踪平台与智能路径优化，将运输从黑盒变成可管控的竞争优势，在成本、时效与碳排放之间实现动态平衡。"
              : "Transportation is one of the highest-cost and least-visible segments of the supply chain. TMS systems, real-time visibility platforms, and intelligent route optimization transform transport from a black box into a controllable competitive advantage — dynamically balancing cost, speed, and carbon emissions."}
          </p>
        </div>

        {/* Topic cards */}
        <section className="mb-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--text-muted)" }}>
            {lang === "zh" ? "核心管理职能" : "Core Management Functions"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {TOPICS.map((t) => (
              <div key={t.title.en} className="glass-card rounded-xl p-5"
                style={{ background: "var(--bg-card)", border: `1px solid ${t.color}20` }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{t.icon}</span>
                  <h3 className="text-sm font-semibold" style={{ color: t.color }}>{t.title[lang]}</h3>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>{t.desc[lang]}</p>
                <div className="flex flex-wrap gap-1.5">
                  {t.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded font-mono"
                      style={{ background: `${t.color}08`, color: t.color, border: `1px solid ${t.color}20` }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key systems */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--text-muted)" }}>
            {lang === "zh" ? "核心支撑系统" : "Key Systems"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {KEY_SYSTEMS.map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-5"
                style={{ background: "var(--bg-card)", border: `1px solid ${s.color}30` }}>
                <p className="text-lg font-bold font-mono mb-1" style={{ color: s.color }}>{s.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.desc[lang]}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
