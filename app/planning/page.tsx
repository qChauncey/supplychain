"use client";
import { useLanguage } from "@/contexts/LanguageContext";

const TOPICS = [
  {
    icon: "📈",
    color: "#3b82f6",
    title: { zh: "需求计划", en: "Demand Planning" },
    desc: { zh: "基于历史销售、市场情报、促销计划的统计预测，结合业务判断修正，生成 SKU 级需求预测。驱动下游库存与生产计划。", en: "Statistical forecasting based on historical sales, market intelligence, and promotion calendars; refined by business judgment to generate SKU-level demand forecasts that drive downstream inventory and production plans." },
    tags: ["统计预测", "Demand Sensing", "促销计划"],
  },
  {
    icon: "🏭",
    color: "#6366f1",
    title: { zh: "供应计划 / MRP", en: "Supply Planning / MRP" },
    desc: { zh: "基于需求预测与库存水位运行 MRP/MPS，输出物料需求计划与生产工单，平衡产能约束与交货承诺。", en: "Run MRP/MPS from demand forecasts and inventory levels to output material requirements and production orders, balancing capacity constraints against delivery commitments." },
    tags: ["MRP / MPS", "产能约束", "CTP 承诺"],
  },
  {
    icon: "⚖️",
    color: "#8b5cf6",
    title: { zh: "销售与运营计划 (S&OP)", en: "Sales & Operations Planning" },
    desc: { zh: "月度跨职能流程，对齐销售预测、供应能力、库存目标与财务预算。平衡需求侧拉动与供应侧推动，形成一致的运营计划。", en: "Monthly cross-functional process aligning sales forecasts, supply capacity, inventory targets, and financial budgets. Balances demand-pull and supply-push into a single operational plan." },
    tags: ["月度 S&OP", "跨职能对齐", "IBP 集成"],
  },
  {
    icon: "📦",
    color: "#06b6d4",
    title: { zh: "库存计划", en: "Inventory Planning" },
    desc: { zh: "基于服务水平目标、需求波动、补货周期计算安全库存。多级库存优化（GDC/RDC/门店），平衡资金占用与断货风险。", en: "Calculate safety stock based on service level targets, demand variability, and replenishment lead times. Multi-echelon optimization (GDC/RDC/Store) balancing working capital against stockout risk." },
    tags: ["安全库存", "多级优化", "ABC / XYZ"],
  },
  {
    icon: "🔄",
    color: "#22c55e",
    title: { zh: "补货计划", en: "Replenishment Planning" },
    desc: { zh: "基于再订货点（ROP）或 Min/Max 策略，自动触发 RDC 向 GDC 补货、门店向 RDC 补货请求。支持 VMI 供应商看板触发。", en: "Auto-trigger RDC→GDC and store→RDC replenishment based on reorder point (ROP) or Min/Max policies. Supports VMI supplier Kanban triggers." },
    tags:["ROP / Min-Max", "Kanban 触发", "VMI 联动"],
  },
  {
    icon: "🌐",
    color: "#f59e0b",
    title: { zh: "网络规划", en: "Network Planning" },
    desc: { zh: "仓网选址优化、配送半径分析、RDC 服务范围划分。结合运输成本、时效要求与土地成本，输出长期仓网布局策略。", en: "Warehouse network site optimization, delivery radius analysis, and RDC service zone assignment. Combines freight cost, SLA requirements, and real estate costs to output long-term network design strategy." },
    tags: ["网络优化", "选址模型", "服务圈划分"],
  },
];

const KEY_SYSTEMS = [
  { label: "APS", desc: { zh: "高级计划与排程系统：约束感知的 MRP / 产能平衡，如 SAP IBP、Kinaxis RapidResponse", en: "Advanced Planning & Scheduling: constraint-aware MRP and capacity balancing, e.g. SAP IBP, Kinaxis RapidResponse" }, color: "#3b82f6" },
  { label: "ERP / PP", desc: { zh: "SAP PP 模块：MRP 运行、生产工单管理、物料需求清单（BOM）", en: "SAP PP module: MRP run, production order management, bill of materials" }, color: "#6366f1" },
  { label: "BI / Analytics", desc: { zh: "需求预测分析、库存健康看板、计划 KPI 监控（预测准确率 MAPE / 偏差 Bias）", en: "Demand forecast analytics, inventory health dashboard, planning KPI monitoring (MAPE / forecast bias)" }, color: "#8b5cf6" },
];

export default function PlanningPage() {
  const { lang } = useLanguage();

  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">

        {/* Header */}
        <div className="mb-12 animate-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold px-2.5 py-1 rounded font-mono"
              style={{ background: "rgba(99,102,241,0.10)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.3)" }}>
              PLANNING
            </span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,rgba(99,102,241,0.4),transparent)" }} />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            {lang === "zh" ? "供应链计划" : "Supply Chain Planning"}
          </h1>
          <p className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>
            {lang === "zh" ? "从需求预测到网络优化的全周期计划体系" : "Full-cycle planning from demand forecasting to network optimization"}
          </p>
          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            {lang === "zh"
              ? "供应链计划是连接市场需求与供应能力的核心枢纽。通过 S&OP 流程对齐跨职能目标，借助 APS 系统实现约束感知的精准计划，将需求预测误差对库存水平和服务水平的影响降至最低。"
              : "Supply chain planning is the core hub connecting market demand with supply capability. The S&OP process aligns cross-functional goals; APS systems deliver constraint-aware precision planning, minimizing the impact of forecast error on inventory levels and service levels."}
          </p>
        </div>

        {/* Topic cards */}
        <section className="mb-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--text-muted)" }}>
            {lang === "zh" ? "核心计划职能" : "Core Planning Functions"}
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
