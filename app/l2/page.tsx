"use client";
import Link from "next/link";
import { l2SystemNodes, l2Edges } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import SystemGraph from "@/components/SystemGraph";
import { useLanguage } from "@/contexts/LanguageContext";

const SYSTEM_ID_MAP: Record<string, string> = {
  ERP: "erp", OMS: "oms", WMS: "wms", TMS: "tms", SRM: "srm",
};

const nodeColorMap: Record<string, { bg: string; border: string; text: string }> = {
  blue:   { bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.35)",  text: "#3b82f6" },
  indigo: { bg: "rgba(99,102,241,0.08)",  border: "rgba(99,102,241,0.35)",  text: "#6366f1" },
  violet: { bg: "rgba(139,92,246,0.08)",  border: "rgba(139,92,246,0.35)",  text: "#8b5cf6" },
  purple: { bg: "rgba(168,85,247,0.08)",  border: "rgba(168,85,247,0.35)",  text: "#a855f7" },
  cyan:   { bg: "rgba(6,182,212,0.08)",   border: "rgba(6,182,212,0.35)",   text: "#06b6d4" },
};

const protocolColor: Record<string, string> = {
  "OData / RESTful API": "#3b82f6",
  "EDI / IDoc":          "#8b5cf6",
  "TCP/IP Sockets / MQTT": "#f59e0b",
  "EDI / Portal API":    "#06b6d4",
  "RESTful API":         "#3b82f6",
};

const nodeTranslations = {
  zh: [
    { label: "ERP", sublabel: "SAP S/4HANA", description: "绝对的数据主数据中心。负责财务总账、成本核算、采购订单管理。", role: "主数据中心" },
    { label: "OMS", sublabel: "IBM Sterling / 自研", description: "全渠道订单收口与智能路由分发。", role: "订单管理中台" },
    { label: "WMS", sublabel: "Manhattan Active / 极智嘉", description: "负责仓库内的一切物理动作（收发存）。", role: "仓储管理系统" },
    { label: "TMS", sublabel: "Oracle OTM", description: "负责与 FedEx, UPS, 顺丰等承运商系统对接。", role: "运输管理系统" },
    { label: "SRM", sublabel: "供应商关系管理", description: "采购端与供应商的协同平台。", role: "采购协同平台" },
  ],
  en: [
    { label: "ERP", sublabel: "SAP S/4HANA", description: "The absolute master data hub. Handles general ledger, cost accounting, and purchase order management.", role: "Master Data Hub" },
    { label: "OMS", sublabel: "IBM Sterling / Custom", description: "Omnichannel order intake and intelligent routing engine.", role: "Order Management" },
    { label: "WMS", sublabel: "Manhattan Active / Geek+", description: "Manages every physical movement inside the warehouse (receive, store, ship).", role: "Warehouse Mgmt" },
    { label: "TMS", sublabel: "Oracle OTM", description: "Integrates with carrier systems: FedEx, UPS, SF Express, etc.", role: "Transport Mgmt" },
    { label: "SRM", sublabel: "Supplier Relationship Mgmt", description: "Procurement-side collaboration platform connecting buyers with suppliers.", role: "Procurement Hub" },
  ],
};

const edgeTranslations = {
  zh: [
    { description: "高频实时同步订单状态与扣减逻辑库存", frequency: "实时" },
    { description: "非实时，以批次/单据为维度的传统且极其稳定的报文传输", frequency: "批量" },
    { description: "毫秒级硬件通信", frequency: "毫秒级" },
    { description: "采购订单与供应商协同", frequency: "准实时" },
    { description: "运单生成与追踪回传", frequency: "准实时" },
  ],
  en: [
    { description: "High-frequency real-time sync of order status and logical inventory deduction", frequency: "Real-time" },
    { description: "Non-real-time, batch-oriented document exchange — traditional but extremely stable", frequency: "Batch" },
    { description: "Millisecond-level hardware communication", frequency: "ms-level" },
    { description: "Purchase order creation and supplier collaboration", frequency: "Near real-time" },
    { description: "Shipment label generation and tracking callback", frequency: "Near real-time" },
  ],
};

export default function L2Page() {
  const { lang, t } = useLanguage();
  const l2 = t.l2;
  const nodes = nodeTranslations[lang];
  const edges = edgeTranslations[lang];

  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <PageHeader
          level={l2.level}
          title={l2.title}
          en={l2.en}
          desc={l2.desc}
          color="#6366f1"
        />

        {/* Interactive graph */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--text-muted)" }}>
            {l2.topoTitle}
          </h2>
          <SystemGraph />
        </section>

        {/* System nodes grid */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--text-muted)" }}>
            {l2.nodesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {l2SystemNodes.map((node, i) => {
              const c = nodeColorMap[node.color];
              const n = nodes[i];
              const sysId = SYSTEM_ID_MAP[n.label];
              return (
                <Link
                  key={node.id}
                  href={sysId ? `/systems/${sysId}` : "#"}
                  className="block p-5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: c.bg, border: `1px solid ${c.border}` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold font-mono" style={{ color: c.text }}>{n.label}</h3>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{n.sublabel}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-[10px] px-2 py-0.5 rounded font-medium"
                        style={{ background: "var(--bg-secondary)", color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }}
                      >
                        {n.role}
                      </span>
                      {sysId && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded"
                          style={{ background: `${c.text}15`, color: c.text, border: `1px solid ${c.text}30` }}>
                          →
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{n.description}</p>
                </Link>
              );
            })}

            {/* WCS node */}
            <Link href="/systems/wcs"
              className="block p-5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.25)" }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold font-mono" style={{ color: "#f59e0b" }}>WCS / PLC</h3>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    {lang === "zh" ? "仓库控制系统 / 可编程控制器" : "Warehouse Control System / PLC"}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded font-medium"
                    style={{ background: "var(--bg-secondary)", color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }}
                  >
                    {l2.wcsRole}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded"
                    style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.3)" }}>
                    →
                  </span>
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{l2.wcsDesc}</p>
            </Link>
          </div>
        </section>

        {/* Integration edges */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--text-muted)" }}>
            {l2.edgesTitle}
          </h2>
          <div className="space-y-3">
            {l2Edges.map((edge, i) => {
              const color = protocolColor[edge.protocol] ?? "#94a3b8";
              const e = edges[i];
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                >
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
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded shrink-0"
                    style={{ background: `${color}10`, color, border: `1px solid ${color}30` }}>
                    {edge.protocol}
                  </span>
                  <p className="text-xs flex-1 min-w-0" style={{ color: "var(--text-secondary)" }}>{e.description}</p>
                  <span className="text-[10px] shrink-0 px-2 py-0.5 rounded"
                    style={{ background: "var(--bg-secondary)", color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }}>
                    {e.frequency}
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
