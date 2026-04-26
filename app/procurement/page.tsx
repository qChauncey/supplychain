"use client";
import { useLanguage } from "@/contexts/LanguageContext";

const TOPICS = [
  {
    icon: "🔍",
    color: "#3b82f6",
    title: { zh: "战略寻源", en: "Strategic Sourcing" },
    desc: { zh: "供应商市场分析、RFQ/RFP 流程、TCO 全面成本核算、多源策略。识别单源风险，建立备选供应商池。", en: "Supplier market analysis, RFQ/RFP process, TCO costing, multi-source strategy. Identify single-source risk and build qualified supplier pools." },
    tags: ["RFQ / RFP", "TCO 分析", "供应商分层"],
  },
  {
    icon: "📋",
    color: "#6366f1",
    title: { zh: "采购执行", en: "Procurement Execution" },
    desc: { zh: "需求驱动的 PR→PO 流程，支持 MRP/Kanban 触发、框架协议调用、紧急采购快速通道。", en: "Demand-driven PR→PO process supporting MRP/Kanban triggers, blanket order call-offs, and emergency procurement fast lanes." },
    tags: ["PR → PO", "MRP 触发", "框架协议"],
  },
  {
    icon: "🤝",
    color: "#8b5cf6",
    title: { zh: "供应商协同", en: "Supplier Collaboration" },
    desc: { zh: "通过 SRM 平台实现 PO 确认/修改、ASN 发货通知、VMI 寄售库存协同、绩效记分卡实时共享。", en: "Via SRM platform: PO confirmation/amendment, ASN shipment notification, VMI consignment collaboration, real-time scorecard sharing." },
    tags: ["SRM Portal", "ASN / EDI", "VMI 寄售"],
  },
  {
    icon: "✅",
    color: "#06b6d4",
    title: { zh: "收货与质检", en: "Goods Receipt & QC" },
    desc: { zh: "WMS 扫码入库、三路匹配（PO/ASN/发票）自动校验、IQC 抽样检验、不合格品隔离与供应商索赔流程。", en: "WMS scan-based goods receipt, three-way match (PO/ASN/Invoice) auto-validation, IQC sampling, non-conformance isolation, and supplier claim process." },
    tags: ["三路匹配", "IQC 检验", "SCAR 流程"],
  },
  {
    icon: "💳",
    color: "#22c55e",
    title: { zh: "发票与付款", en: "Invoice & Payment" },
    desc: { zh: "ERP 自动三路匹配，差异自动路由审批，支持多币种与跨境付款，电子发票合规归档。", en: "ERP auto three-way match, discrepancy auto-routing for approval, multi-currency and cross-border payments, e-invoice compliance archiving." },
    tags: ["自动匹配", "多币种", "电子发票"],
  },
  {
    icon: "📊",
    color: "#f59e0b",
    title: { zh: "采购绩效管理", en: "Procurement Performance" },
    desc: { zh: "供应商 OTD、质量不良率、价格达成率、采购周期等 KPI 看板，驱动供应商年度评审与淘汰机制。", en: "Supplier OTD, defect rate, price achievement, and lead time KPI dashboards driving annual supplier review and qualification/disqualification." },
    tags: ["OTD / DPPM", "价格偏差", "年度评审"],
  },
];

const KEY_SYSTEMS = [
  { label: "SRM", desc: { zh: "供应商关系管理，覆盖准入、协同、绩效全周期", en: "Supplier Relationship Mgmt — onboarding, collaboration, performance" }, color: "#06b6d4" },
  { label: "ERP / MM", desc: { zh: "SAP MM 模块：PR/PO 管理、库存移动、发票校验", en: "SAP MM: PR/PO management, inventory movements, invoice verification" }, color: "#3b82f6" },
  { label: "EDI / B2B", desc: { zh: "大型供应商 EDI 直连（850/856/810），中小供应商 Portal", en: "Large supplier EDI direct (850/856/810); SME supplier Web Portal" }, color: "#8b5cf6" },
];

export default function ProcurementPage() {
  const { lang } = useLanguage();

  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">

        {/* Header */}
        <div className="mb-12 animate-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold px-2.5 py-1 rounded font-mono"
              style={{ background: "rgba(59,130,246,0.10)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.3)" }}>
              PROCUREMENT
            </span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,rgba(59,130,246,0.4),transparent)" }} />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            {lang === "zh" ? "采购管理" : "Procurement Management"}
          </h1>
          <p className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>
            {lang === "zh" ? "从战略寻源到付款结算的端到端采购体系" : "End-to-end procurement from strategic sourcing to payment settlement"}
          </p>
          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            {lang === "zh"
              ? "采购是供应链的上游起点，涵盖战略寻源、供应商管理、采购执行与财务结算四大核心领域。数字化采购通过 SRM、ERP（MM 模块）和 EDI 实现供应商协同自动化，将采购周期从数周压缩至数日。"
              : "Procurement is the upstream origin of the supply chain, spanning strategic sourcing, supplier management, execution, and financial settlement. Digital procurement via SRM, ERP (MM module), and EDI automates supplier collaboration, compressing procurement cycles from weeks to days."}
          </p>
        </div>

        {/* Topic cards */}
        <section className="mb-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--text-muted)" }}>
            {lang === "zh" ? "核心职能域" : "Core Function Areas"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {TOPICS.map((t) => (
              <div key={t.title.en} className="rounded-xl p-5"
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
              <div key={s.label} className="rounded-xl p-5"
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
