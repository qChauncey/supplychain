"use client";
import PageHeader from "@/components/PageHeader";
import CodeBlock from "@/components/CodeBlock";
import SequenceDiagram from "@/components/SequenceDiagram";
import { useLanguage } from "@/contexts/LanguageContext";

const scenarioASteps = {
  zh: [
    {
      step: 1, title: "ATP 校验", subtitle: "Available-to-Promise",
      code: `// ATP 查询逻辑
可用库存 = 物理库存
        - 质检冻结库存
        - 其他渠道预占库存

// OMS 向 ERP 或全局库存池发起查询
POST /api/inventory/atp
{
  "skuCode": "iPhone15Pro-256G-Black",
  "warehouseScope": "ALL_RDC",
  "requestQty": 1
}`, lang: "javascript",
    },
    {
      step: 2, title: "拆单逻辑", subtitle: "Order Split",
      code: `// 主订单拆分
主订单 #ORD-20240101-88888
├── 子单 A: 手机 × 1
│   └── 状态: 有货可发 ✓
└── 子单 B: 定制刻字手机壳 × 1
    └── 状态: 缺货，转定制生产 ⏳

// 拆单后独立路由，独立履约`, lang: "bash",
    },
    {
      step: 3, title: "寻源算法", subtitle: "Sourcing Engine",
      code: `// 优先级路由逻辑
function sourcingEngine(order, address) {
  // P1: 时效优先 - 100km 内 RDC
  const nearbyRDC = findRDCWithin(address, 100km);
  if (nearbyRDC.hasStock) return nearbyRDC;

  // P2: 成本优先 - 同城门店
  const nearbyStore = findStoreWithin(address, 50km);
  const storeCost = calcShippingCost(nearbyStore);
  const rdcCost   = calcShippingCost(nearbyRDC);

  if (storeCost < rdcCost - 2) return nearbyStore;

  // 生成出库指令单 (DO)
  return generateDeliveryOrder(source, order);
}`, lang: "javascript",
    },
  ],
  en: [
    {
      step: 1, title: "ATP Check", subtitle: "Available-to-Promise",
      code: `// ATP query logic
availableQty = physicalStock
             - qualityHoldStock
             - otherChannelReserved

// OMS queries ERP or global inventory pool
POST /api/inventory/atp
{
  "skuCode": "iPhone15Pro-256G-Black",
  "warehouseScope": "ALL_RDC",
  "requestQty": 1
}`, lang: "javascript",
    },
    {
      step: 2, title: "Order Split", subtitle: "Order Split Logic",
      code: `// Parent order split
Order #ORD-20240101-88888
├── Sub-order A: Phone × 1
│   └── Status: In stock, ready to ship ✓
└── Sub-order B: Custom engraved case × 1
    └── Status: Out of stock, routed to custom production ⏳

// Each sub-order is independently routed and fulfilled`, lang: "bash",
    },
    {
      step: 3, title: "Sourcing Engine", subtitle: "Order Routing Algorithm",
      code: `// Priority-based routing logic
function sourcingEngine(order, address) {
  // P1: Speed first — RDC within 100 km
  const nearbyRDC = findRDCWithin(address, 100km);
  if (nearbyRDC.hasStock) return nearbyRDC;

  // P2: Cost first — same-city store
  const nearbyStore = findStoreWithin(address, 50km);
  const storeCost = calcShippingCost(nearbyStore);
  const rdcCost   = calcShippingCost(nearbyRDC);

  if (storeCost < rdcCost - 2) return nearbyStore; // saves $0.28

  // Generate Delivery Order (DO)
  return generateDeliveryOrder(source, order);
}`, lang: "javascript",
    },
  ],
};

const scenarioBSequence = {
  zh: [
    { from: "OMS", to: "SAP ERP", message: "下发交货单请求", detail: "Outbound Delivery Trigger" },
    { from: "SAP ERP", to: "Manhattan WMS", message: "IDoc: SHP_OBDLV_SAVE_REPLICA", detail: "物料编码 + 数量 + FEFO 批次要求", isKey: true },
    { from: "Manhattan WMS", to: "WCS/AGV", message: "波次下发 (Wave Release)", detail: "拣货任务分配至自动化设备" },
    { from: "WCS/AGV", to: "Manhattan WMS", message: "拣货完成确认", detail: "实际拣货数量回传" },
    { from: "Manhattan WMS", to: "SAP ERP", message: "IDoc: WHSCON (Warehouse Confirmation)", detail: "实际数量 + 包装箱体积", isKey: true },
    { from: "SAP ERP", to: "SAP ERP", message: "自动生成财务凭证", detail: "结转销货成本 COGS ← 财务联动", isSelf: true },
  ],
  en: [
    { from: "OMS", to: "SAP ERP", message: "Trigger Outbound Delivery", detail: "Delivery order request" },
    { from: "SAP ERP", to: "Manhattan WMS", message: "IDoc: SHP_OBDLV_SAVE_REPLICA", detail: "Material code + qty + FEFO batch requirement", isKey: true },
    { from: "Manhattan WMS", to: "WCS/AGV", message: "Wave Release", detail: "Pick tasks dispatched to automation" },
    { from: "WCS/AGV", to: "Manhattan WMS", message: "Pick Complete Confirmation", detail: "Actual picked quantity returned" },
    { from: "Manhattan WMS", to: "SAP ERP", message: "IDoc: WHSCON (Warehouse Confirmation)", detail: "Actual qty + carton volume", isKey: true },
    { from: "SAP ERP", to: "SAP ERP", message: "Auto-generate FI Document", detail: "Post Goods Issue → COGS entry", isSelf: true },
  ],
};

const pitfallText = {
  zh: "如果 WMS 将成千上万的单据合并成一个超大「波次」派发给工人，容易导致数据库表锁 (Table Lock) 或拣货拥堵。需要拆分为合理的波次大小（通常 50-200 单/波次）。",
  en: "If the WMS batches thousands of orders into one oversized wave, it risks database table locks and pick-path congestion. Waves should be capped at a sensible size — typically 50–200 orders per wave.",
};

const idocSample = `<!-- IDoc: WHSCON - Warehouse Confirmation Message -->
<IDOC BEGIN="1">
  <EDI_DC40>
    <TABNAM>EDI_DC40</TABNAM>
    <MANDT>100</MANDT>
    <IDOCTYP>WHSCON01</IDOCTYP>
    <MESTYP>WHSCON</MESTYP>
    <SNDPRT>LS</SNDPRT>
    <SNDPRN>MANHATTAN_WMS</SNDPRN>
    <RCVPRT>LS</RCVPRT>
    <RCVPRN>SAP_ERP_PRD</RCVPRN>
  </EDI_DC40>
  <E1EDL20>
    <VBELN>0080012345</VBELN>  <!-- Delivery number -->
    <LFART>LF</LFART>           <!-- Delivery type -->
    <WADAT>20240101</WADAT>     <!-- Actual goods issue date -->
    <E1EDL24>
      <POSNR>000010</POSNR>
      <MATNR>IPHONE15PRO-256-BLK</MATNR>
      <LFIMG>1.000</LFIMG>      <!-- Actual picked qty -->
      <VRKME>EA</VRKME>          <!-- Unit: each -->
      <CHARG>2024010188</CHARG>  <!-- Batch number -->
    </E1EDL24>
  </E1EDL20>
</IDOC>`;

export default function L3Page() {
  const { lang, t } = useLanguage();
  const l3 = t.l3;
  const steps = scenarioASteps[lang];
  const sequence = scenarioBSequence[lang];

  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <PageHeader level={l3.level} title={l3.title} en={l3.en} desc={l3.desc} color="#06b6d4" />

        {/* Scenario A */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.3)", color: "#06b6d4" }}>
              A
            </div>
            <div>
              <h2 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
                {lang === "zh" ? "OMS 智能寻源与拆单算法" : "OMS Intelligent Order Routing & Split"}
              </h2>
              <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>Order Routing Engine</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-8 max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            {lang === "zh"
              ? "当消费者在官网下单购买一部手机（有货）和一个定制刻字手机壳（缺货需定制）时，OMS 的内部运算逻辑："
              : "When a consumer places an order for a phone (in stock) and a custom-engraved case (out of stock, requires production), this is the OMS internal routing logic:"}
          </p>

          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.step} className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <div className="flex items-center gap-3 px-5 py-3"
                  style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border)" }}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: "rgba(6,182,212,0.15)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.3)" }}>
                    {step.step}
                  </span>
                  <div>
                    <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{step.title}</span>
                    <span className="text-xs ml-2 font-mono" style={{ color: "var(--text-muted)" }}>{step.subtitle}</span>
                  </div>
                </div>
                <CodeBlock code={step.code} lang={step.lang} />
              </div>
            ))}
          </div>
        </section>

        {/* Scenario B */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)", color: "#8b5cf6" }}>
              B
            </div>
            <div>
              <h2 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
                {lang === "zh" ? "SAP ERP 与 Manhattan WMS 出库握手" : "SAP ERP ↔ Manhattan WMS Outbound Handshake"}
              </h2>
              <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>EDI IDoc Standard Flow</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-8 max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            {lang === "zh"
              ? "当 OMS 决定从 RDC 仓库发货后，ERP 与 WMS 的系统级交互时序："
              : "After OMS routes the order to an RDC, this is the system-level interaction sequence between ERP and WMS:"}
          </p>

          <SequenceDiagram steps={sequence} />

          {/* Pitfall */}
          <div className="mt-6 p-5 rounded-xl flex gap-4"
            style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
            <span className="text-xl shrink-0">⚠️</span>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "#f59e0b" }}>{l3.pitfallLabel}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{pitfallText[lang]}</p>
            </div>
          </div>

          {/* IDoc sample */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-secondary)" }}>
              {l3.idocTitle}
            </h3>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2 px-5 py-2.5"
                style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border)" }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-60" />
                </div>
                <span className="text-xs font-mono ml-2" style={{ color: "var(--text-muted)" }}>WHSCON01.xml</span>
              </div>
              <CodeBlock code={idocSample} lang="xml" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
