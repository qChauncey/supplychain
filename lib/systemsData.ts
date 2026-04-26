export interface BiText { zh: string; en: string }

export interface SystemModule {
  id: string
  name: BiText
  desc: BiText
  icon: string
  tech?: string
}

export interface DataEntity {
  name: string
  table?: string
  desc: BiText
}

export interface IntegrationPoint {
  system: string
  direction: "in" | "out" | "bidirectional"
  protocol: string
  message: string
  desc: BiText
}

export interface Metric {
  label: BiText
  value: string
  benchmark: BiText
}

export interface Pitfall {
  title: BiText
  desc: BiText
  severity: "critical" | "high" | "medium"
}

export interface ArchPoint {
  title: BiText
  desc: BiText
}

export interface ModuleFlowNode {
  id: string
  label: BiText
  x: number
  y: number
  color: string
}

export interface ModuleFlowEdge {
  from: string
  to: string
  label?: BiText
  dashed?: boolean
}

export interface SystemDetail {
  id: string
  label: string
  fullName: BiText
  vendor: string
  category: BiText
  color: string
  icon: string
  tagline: BiText
  overview: BiText
  coreModules: SystemModule[]
  architecturePoints: ArchPoint[]
  keyEntities: DataEntity[]
  integrationPoints: IntegrationPoint[]
  metrics: Metric[]
  pitfalls: Pitfall[]
  moduleFlowNodes: ModuleFlowNode[]
  moduleFlowEdges: ModuleFlowEdge[]
}

// ─────────────────────────────────────────────
// ERP — SAP S/4HANA
// ─────────────────────────────────────────────
const erp: SystemDetail = {
  id: "erp",
  label: "ERP",
  fullName: { zh: "企业资源计划", en: "Enterprise Resource Planning" },
  vendor: "SAP S/4HANA",
  category: { zh: "主数据与财务核心", en: "Master Data & Finance Core" },
  color: "#3b82f6",
  icon: "🏛️",
  tagline: {
    zh: "供应链的「神经中枢」——所有业务数据的黄金来源与财务结算引擎",
    en: "The nervous system of the supply chain — golden source of all business data and financial settlement engine",
  },
  overview: {
    zh: "SAP S/4HANA 是整个供应链体系的绝对数据权威。所有物料主数据、供应商主数据、客户主数据均在此定义，财务总账、成本核算、采购订单、销售订单均以此为中心流转。在 DTC 电子制造场景下，ERP 负责：① 向 OMS 提供实时可用库存承诺（ATP）；② 接收 WMS 的发货确认并自动触发财务过账（COGS）；③ 通过 SRM 管理与 Tier 1/Tier 2 供应商的采购协同。",
    en: "SAP S/4HANA is the absolute data authority across the entire supply chain. All material master data, vendor master data, and customer master data are defined here. General ledger, cost accounting, purchase orders, and sales orders all revolve around it. In the DTC electronics scenario, ERP is responsible for: ① providing real-time ATP inventory commitments to OMS; ② receiving WMS shipment confirmations and auto-triggering financial postings (COGS); ③ managing procurement collaboration with Tier 1/Tier 2 suppliers via SRM.",
  },
  coreModules: [
    {
      id: "fi",
      name: { zh: "FI — 财务会计", en: "FI — Financial Accounting" },
      desc: { zh: "总账、应收/应付、资产会计。每笔出库过账自动生成凭证，支撑月结与审计。", en: "General ledger, AR/AP, asset accounting. Every goods issue auto-generates FI documents, supporting month-end close and audit." },
      icon: "📒",
    },
    {
      id: "co",
      name: { zh: "CO — 管理会计", en: "CO — Controlling" },
      desc: { zh: "成本中心、利润中心、产品成本核算（COPA）。计算每个 SKU 的实际 COGS 与毛利。", en: "Cost center, profit center, product cost accounting (COPA). Calculates actual COGS and gross margin per SKU." },
      icon: "📊",
    },
    {
      id: "mm",
      name: { zh: "MM — 物料管理", en: "MM — Materials Management" },
      desc: { zh: "采购（PR→PO→GR）、库存管理（货物移动类型）、发票校验（三路匹配）。", en: "Procurement (PR→PO→GR), inventory management (movement types), invoice verification (3-way match)." },
      icon: "📦",
    },
    {
      id: "sd",
      name: { zh: "SD — 销售与分销", en: "SD — Sales & Distribution" },
      desc: { zh: "销售订单、交货单（Outbound Delivery）、开票。OMS 路由完成后触发 SD 交货单创建。", en: "Sales orders, outbound deliveries, billing. OMS routing triggers SD delivery creation." },
      icon: "🛒",
    },
    {
      id: "ewm",
      name: { zh: "EWM — 扩展仓库管理", en: "EWM — Extended Warehouse Management" },
      desc: { zh: "SAP 自有 WMS 模块，通过 IDoc 与外部 Manhattan WMS 交互，管理仓库物理操作。", en: "SAP's own WMS module. Communicates with external Manhattan WMS via IDoc to manage physical warehouse operations." },
      icon: "🏪",
    },
    {
      id: "btp",
      name: { zh: "BTP — 业务技术平台", en: "BTP — Business Technology Platform" },
      desc: { zh: "集成中间件（PI/PO → Integration Suite）、API 管理、低代码扩展，连接 SAP 与外部系统。", en: "Integration middleware (PI/PO → Integration Suite), API management, low-code extensions connecting SAP to external systems." },
      icon: "☁️",
    },
  ],
  architecturePoints: [
    {
      title: { zh: "Universal Journal (ACDOCA)", en: "Universal Journal (ACDOCA)" },
      desc: { zh: "S/4HANA 将原本分散在 FI、CO、ML 等多张表的会计数据合并为单一 ACDOCA 表，消除数据冗余，实现实时财务报告。任何库存移动瞬间在 ACDOCA 中产生记录。", en: "S/4HANA consolidates accounting data from FI, CO, ML and other tables into a single ACDOCA table, eliminating redundancy and enabling real-time financial reporting. Any inventory movement instantly creates a record in ACDOCA." },
    },
    {
      title: { zh: "HANA 内存计算", en: "HANA In-Memory Computing" },
      desc: { zh: "列式存储 + 内存计算支持对海量事务数据的实时分析，ATP 库存查询从原来的分钟级缩短到毫秒级，支撑 OMS 高并发下单场景。", en: "Columnar storage + in-memory computing enables real-time analytics on massive transactional data. ATP queries drop from minutes to milliseconds, supporting OMS high-concurrency order scenarios." },
    },
    {
      title: { zh: "IDoc 消息框架", en: "IDoc Messaging Framework" },
      desc: { zh: "标准化的电子数据交换格式。SAP 通过 qRFC 队列保证消息有序、可靠地传递至 WMS/SRM 等外部系统，即使对方宕机也不丢失。", en: "Standardized electronic data interchange format. SAP uses qRFC queues to guarantee ordered, reliable message delivery to WMS/SRM and other external systems — even when the target is down." },
    },
    {
      title: { zh: "Fiori UX + 角色分离", en: "Fiori UX + Role Separation" },
      desc: { zh: "基于 OData API 的响应式前端，按角色（采购员、仓库主管、财务）展示不同视图，同一数据多端实时同步。", en: "OData API-powered responsive frontend with role-based views (buyer, warehouse supervisor, finance). Same data synced in real time across all clients." },
    },
  ],
  keyEntities: [
    { name: "Material Master", table: "MARA / MARD", desc: { zh: "物料主数据，含 SKU 编码、描述、重量、存储条件、工厂级库存量。", en: "Material master data: SKU code, description, weight, storage conditions, plant-level stock." } },
    { name: "Vendor Master", table: "LFA1 / LFB1", desc: { zh: "供应商主数据，含付款条款、银行账户、采购组织分配。", en: "Vendor master: payment terms, bank account, purchasing organization assignment." } },
    { name: "Purchase Order", table: "EKKO / EKPO", desc: { zh: "采购订单头（EKKO）与行（EKPO），含价格、数量、交货日期、工厂。", en: "PO header (EKKO) and line items (EKPO): price, quantity, delivery date, plant." } },
    { name: "Outbound Delivery", table: "LIKP / LIPS", desc: { zh: "SD 交货单，触发点为 OMS 路由完成。LIPS 行项目含拣货数量与批次。", en: "SD outbound delivery, triggered after OMS routing. LIPS line items contain pick quantity and batch." } },
    { name: "FI Document", table: "BKPF / BSEG", desc: { zh: "财务凭证，每笔货物移动（发货过账 PGI）自动生成，记录 COGS 结转。", en: "Financial document auto-generated on every goods movement (Post Goods Issue). Records COGS transfer." } },
    { name: "IDoc Record", table: "EDIDC / EDID4", desc: { zh: "EDI 文档控制记录，追踪每条 IDoc 的处理状态（处理中/成功/错误）。", en: "EDI document control record tracking each IDoc's processing status (processing / success / error)." } },
  ],
  integrationPoints: [
    { system: "OMS", direction: "bidirectional", protocol: "OData / REST", message: "ATP Query + DO Trigger", desc: { zh: "OMS 实时查询库存可用量；OMS 路由完成后触发 SD 交货单创建", en: "OMS queries real-time ATP; OMS triggers SD outbound delivery after routing" } },
    { system: "WMS", direction: "bidirectional", protocol: "EDI / IDoc", message: "SHP_OBDLV_SAVE_REPLICA / WHSCON", desc: { zh: "ERP 下发出库指令；WMS 回传实际发货数量触发财务过账", en: "ERP sends outbound delivery; WMS returns actual shipped quantity to trigger financial posting" } },
    { system: "SRM", direction: "bidirectional", protocol: "EDI / Portal API", message: "ORDERS / ORDRSP / INVOIC", desc: { zh: "ERP 发送采购订单；SRM 回传供应商确认与发票", en: "ERP sends purchase orders; SRM returns supplier acknowledgments and invoices" } },
    { system: "TMS", direction: "in", protocol: "REST API", message: "Freight Cost Posting", desc: { zh: "TMS 将运费实际结算数据回传 ERP 进行费用科目记账", en: "TMS posts actual freight settlement data back to ERP for expense account recording" } },
  ],
  metrics: [
    { label: { zh: "财务月结时间", en: "Month-End Close Time" }, value: "< 2 天", benchmark: { zh: "行业标杆：S/4HANA 实时账本，无需传统对账", en: "Benchmark: S/4HANA real-time ledger eliminates traditional reconciliation" } },
    { label: { zh: "IDoc 日处理量", en: "Daily IDoc Volume" }, value: "100K+", benchmark: { zh: "峰值大促期间可达 500K+/天，qRFC 队列保障不丢失", en: "Peak during promotions: 500K+/day; qRFC queues guarantee no message loss" } },
    { label: { zh: "ATP 查询响应时间", en: "ATP Query Response Time" }, value: "< 50ms", benchmark: { zh: "HANA 内存计算，支撑 OMS 5000 TPS 并发查询", en: "HANA in-memory compute supports OMS 5,000 TPS concurrent queries" } },
    { label: { zh: "库存账实准确率", en: "Inventory Accuracy" }, value: "> 99.5%", benchmark: { zh: "WMS 实物 + ERP 账面双向核对，系统性差异 < 0.5%", en: "WMS physical + ERP book dual-check; systematic variance < 0.5%" } },
  ],
  pitfalls: [
    { title: { zh: "qRFC 队列积压", en: "qRFC Queue Backlog" }, desc: { zh: "大促期间 IDoc 发送速率超过 WMS 处理能力，qRFC 队列堆积，WMS 收单延迟数小时。需监控 SMQ2 事务码并设置队列告警阈值。", en: "During promotions, IDoc send rate exceeds WMS processing capacity, causing qRFC queue buildup and WMS receipt delays of hours. Monitor transaction SMQ2 and set queue alert thresholds." }, severity: "critical" },
    { title: { zh: "MM 月末关账顺序错误", en: "MM Period-End Close Sequence Error" }, desc: { zh: "MM 关账必须先于 FI，否则跨期货物移动产生差异。常见于多工厂、多会计期间并行关账场景。", en: "MM close must precede FI close; otherwise cross-period goods movements create variances. Common in multi-plant, multi-period parallel close scenarios." }, severity: "high" },
    { title: { zh: "物料主数据不一致", en: "Material Master Data Inconsistency" }, desc: { zh: "OMS 或 WMS 使用与 ERP 不同的 SKU 编码体系，导致 IDoc 物料匹配失败，出库指令无法执行。需建立主数据治理（MDG）流程。", en: "OMS or WMS uses a different SKU coding system than ERP, causing IDoc material matching failures and inability to execute outbound instructions. Master Data Governance (MDG) process is required." }, severity: "high" },
  ],
  moduleFlowNodes: [
    { id: "mm", label: { zh: "MM 物料管理", en: "MM Materials Mgmt" }, x: 40,  y: 40,  color: "#3b82f6" },
    { id: "sd", label: { zh: "SD 销售分销", en: "SD Sales & Dist." }, x: 260, y: 40,  color: "#6366f1" },
    { id: "fi", label: { zh: "FI 财务会计", en: "FI Finance" },       x: 150, y: 160, color: "#8b5cf6" },
    { id: "co", label: { zh: "CO 管理会计", en: "CO Controlling" },    x: 150, y: 280, color: "#a855f7" },
    { id: "ewm",label: { zh: "EWM 仓库管理", en: "EWM Warehouse" },   x: 40,  y: 160, color: "#06b6d4" },
    { id: "btp",label: { zh: "BTP 集成平台", en: "BTP Integration" }, x: 260, y: 160, color: "#f59e0b" },
  ],
  moduleFlowEdges: [
    { from: "mm", to: "fi",  label: { zh: "货物移动", en: "Goods Movement" } },
    { from: "sd", to: "fi",  label: { zh: "销售过账", en: "Revenue Posting" } },
    { from: "fi", to: "co",  label: { zh: "成本分配", en: "Cost Allocation" } },
    { from: "ewm",to: "fi",  label: { zh: "PGI 过账", en: "PGI Posting" } },
    { from: "btp",to: "fi",  label: { zh: "外部凭证", en: "External Docs" }, dashed: true },
    { from: "mm", to: "ewm", label: { zh: "库存指令", en: "Stock Instruction" } },
  ],
}

// ─────────────────────────────────────────────
// OMS — Order Management System
// ─────────────────────────────────────────────
const oms: SystemDetail = {
  id: "oms",
  label: "OMS",
  fullName: { zh: "订单管理系统", en: "Order Management System" },
  vendor: "IBM Sterling / 自研微服务",
  category: { zh: "全渠道订单中台", en: "Omnichannel Order Hub" },
  color: "#6366f1",
  icon: "🎯",
  tagline: {
    zh: "全渠道订单的「智能调度中心」——接收、校验、拆分、路由，驱动每一笔订单精准履约",
    en: "The intelligent dispatch center for omnichannel orders — receive, validate, split, route, and drive precise fulfillment for every order",
  },
  overview: {
    zh: "OMS 是消费者与后端供应链系统之间的核心枢纽。它负责统一接收来自官网、APP、门店 POS、第三方平台（天猫/京东）的所有订单，对每笔订单执行 ATP 库存承诺校验、智能拆单与多维度寻源路由，最终生成出库指令单（Delivery Order）下发至 WMS。在 DTC 电子品牌场景下，OMS 还需处理大促峰值（5,000+ TPS）、定制商品的特殊履约流程，以及全渠道退换货的逆向物流编排。",
    en: "OMS is the core hub between consumers and back-end supply chain systems. It unifies orders from the website, app, store POS, and third-party platforms (Tmall/JD), executes ATP inventory commitment checks, intelligent order splitting, and multi-dimensional sourcing routing for each order, finally generating Delivery Orders to WMS. In the DTC electronics brand scenario, OMS must also handle peak traffic (5,000+ TPS), special fulfillment for custom items, and reverse logistics orchestration for omnichannel returns.",
  },
  coreModules: [
    { id: "intake",   name: { zh: "全渠道订单接入", en: "Omnichannel Order Intake" },    desc: { zh: "统一接收官网、APP、POS、平台电商订单，标准化为内部订单格式，幂等去重处理。", en: "Unified ingestion from website, app, POS, and e-commerce platforms. Normalized to internal order format with idempotent deduplication." }, icon: "📥" },
    { id: "atp",      name: { zh: "ATP 库存承诺引擎", en: "ATP Commitment Engine" },      desc: { zh: "实时查询 ERP/全局库存池，计算可用量并执行预占，保障承诺库存不超卖。", en: "Real-time query of ERP/global inventory pool. Calculates available quantity and executes reservations to prevent overselling." }, icon: "🔒" },
    { id: "split",    name: { zh: "智能拆单引擎", en: "Intelligent Order Split Engine" }, desc: { zh: "识别混合订单（有货+缺货/定制），自动拆分为多条独立履约轨道，各自路由。", en: "Detects mixed orders (in-stock + backorder/custom). Auto-splits into independent fulfillment tracks, each routed separately." }, icon: "✂️" },
    { id: "routing",  name: { zh: "寻源路由引擎", en: "Sourcing & Routing Engine" },     desc: { zh: "多维度规则引擎：时效优先（距离）→ 成本优先（运费比较）→ 库存优先（RDC/门店/GDC）。", en: "Multi-dimensional rule engine: speed first (distance) → cost first (freight comparison) → inventory first (RDC/Store/GDC)." }, icon: "🗺️" },
    { id: "do",       name: { zh: "出库指令管理", en: "Delivery Order Management" },      desc: { zh: "生成并下发 DO 至对应仓库 WMS，跟踪 DO 状态（待拣货/拣货中/已发出/已签收）。", en: "Generates and dispatches DOs to the corresponding warehouse WMS. Tracks DO status (pending / picking / shipped / delivered)." }, icon: "📋" },
    { id: "reverse",  name: { zh: "逆向物流编排", en: "Reverse Logistics Orchestration" }, desc: { zh: "受理退换货申请，自动触发 RMA 流程，协调仓库验收、财务退款与库存回库。", en: "Accepts return/exchange requests. Auto-triggers RMA process, coordinates warehouse acceptance, financial refund, and inventory return." }, icon: "↩️" },
  ],
  architecturePoints: [
    { title: { zh: "事件驱动状态机", en: "Event-Driven State Machine" }, desc: { zh: "订单全生命周期由事件驱动（Kafka/RocketMQ）：CREATED → CONFIRMED → SPLITTING → ROUTED → FULFILLING → SHIPPED → DELIVERED。每次状态转换发布事件，下游系统订阅响应，解耦异步。", en: "Order lifecycle driven by events (Kafka/RocketMQ): CREATED→CONFIRMED→SPLITTING→ROUTED→FULFILLING→SHIPPED→DELIVERED. Each transition publishes an event; downstream systems subscribe and respond asynchronously." } },
    { title: { zh: "分布式库存预占", en: "Distributed Inventory Reservation" }, desc: { zh: "采用乐观锁 + Redis 原子操作实现高并发预占，避免超卖。大促场景引入令牌桶限流和本地缓存库存快照，减少对 ERP 的直接压力。", en: "Optimistic locking + Redis atomic operations for high-concurrency reservation to prevent overselling. Peak scenarios use token bucket rate limiting and local inventory cache snapshots to reduce direct ERP load." } },
    { title: { zh: "幂等 API 设计", en: "Idempotent API Design" }, desc: { zh: "所有订单接入接口均基于 idempotency-key 设计，网络超时重试不产生重复订单。内部服务调用同样遵循幂等原则，保障分布式事务一致性。", en: "All order intake APIs use idempotency-key design; network timeout retries never produce duplicate orders. Internal service calls also follow idempotency principles to ensure distributed transaction consistency." } },
    { title: { zh: "规则引擎可配置化", en: "Configurable Rule Engine" }, desc: { zh: "寻源规则通过业务规则引擎（Drools/自研）配置，运营人员可在控制台实时调整优先级（如节假日切换为门店履约优先），无需发版。", en: "Sourcing rules configured via business rule engine (Drools/custom). Operations staff can adjust priorities in real time from the console (e.g., switch to store-first fulfillment on holidays) without deployment." } },
  ],
  keyEntities: [
    { name: "Master Order",      desc: { zh: "消费者主订单，含收货信息、支付记录、子单列表。", en: "Consumer master order containing shipping info, payment record, and sub-order list." } },
    { name: "Sub-Order",         desc: { zh: "履约最小单元，一个发货来源对应一个子单，独立路由与跟踪。", en: "Minimum fulfillment unit. One shipment source = one sub-order; independently routed and tracked." } },
    { name: "Inventory Reservation", desc: { zh: "库存预占记录，绑定子单与仓库库位，防止并发超卖。", en: "Inventory reservation record binding sub-order to warehouse slot, preventing concurrent overselling." } },
    { name: "Delivery Order (DO)", desc: { zh: "下发至 WMS 的出库指令，含物料、数量、发货截止时间。", en: "Outbound instruction sent to WMS containing material, quantity, and shipment deadline." } },
    { name: "RMA (Return Merchandise Auth.)", desc: { zh: "退货授权单，触发逆向物流流程与财务退款指令。", en: "Return authorization triggering reverse logistics flow and financial refund instruction." } },
  ],
  integrationPoints: [
    { system: "ERP", direction: "bidirectional", protocol: "OData / REST", message: "ATP Query + DO Trigger", desc: { zh: "查询库存可用量；路由完成后触发 ERP 创建 SD 交货单", en: "Query ATP availability; trigger ERP to create SD outbound delivery after routing" } },
    { system: "WMS", direction: "out", protocol: "REST / Message Queue", message: "Delivery Order (DO)", desc: { zh: "将出库指令单推送至目标仓库 WMS，并订阅 WMS 状态回调", en: "Push Delivery Order to target warehouse WMS and subscribe to WMS status callbacks" } },
    { system: "TMS", direction: "bidirectional", protocol: "REST API", message: "Shipment Tracking Feed", desc: { zh: "接收 TMS 运单追踪状态，推送物流通知给消费者", en: "Receive TMS shipment tracking status and push logistics notifications to consumers" } },
    { system: "渠道平台", direction: "in", protocol: "OpenAPI / Webhook", message: "Order Payload", desc: { zh: "统一接收天猫/京东/官网/POS 的订单报文并标准化", en: "Unified receipt and normalization of order payloads from Tmall/JD/website/POS" } },
  ],
  metrics: [
    { label: { zh: "下单端到端响应", en: "Order End-to-End Response" }, value: "< 500ms (P99)", benchmark: { zh: "含 ATP 查询、预占、路由全链路，消费者无感知等待", en: "Includes ATP query, reservation, full routing — imperceptible wait for consumers" } },
    { label: { zh: "峰值下单 TPS",   en: "Peak Order TPS" },          value: "5,000 TPS",     benchmark: { zh: "双11大促实测，结合限流与本地缓存实现水平扩展", en: "Measured during 11.11 peak using rate limiting + local cache for horizontal scaling" } },
    { label: { zh: "拆单准确率",     en: "Order Split Accuracy" },     value: "> 99.99%",      benchmark: { zh: "拆单规则覆盖 200+ 商品组合场景，A/B 测试验证", en: "Split rules cover 200+ item combination scenarios, verified by A/B testing" } },
    { label: { zh: "逆向物流处理时效", en: "Reverse Logistics SLA" },  value: "< 4h",          benchmark: { zh: "从消费者提交退货申请到仓库收到 RMA 指令", en: "From consumer submitting return request to warehouse receiving RMA instruction" } },
  ],
  pitfalls: [
    { title: { zh: "分布式超卖", en: "Distributed Overselling" }, desc: { zh: "Redis 单点故障或网络分区导致库存预占失效，多个 OMS 实例同时预占同一库存，产生超卖。需引入分布式锁（Redlock）或降级为悲观锁。", en: "Redis single-point failure or network partition invalidates inventory reservation, causing multiple OMS instances to reserve the same stock simultaneously. Introduce distributed lock (Redlock) or fall back to pessimistic lock." }, severity: "critical" },
    { title: { zh: "子单状态不同步", en: "Sub-order Status Desync" }, desc: { zh: "WMS 回调延迟或丢失导致 OMS 子单状态卡在「履约中」，消费者查询物流无进展。需实现幂等重试 + 定时对账机制。", en: "WMS callback delay or loss causes OMS sub-order status stuck at 'fulfilling'. Consumer tracking shows no progress. Implement idempotent retry + scheduled reconciliation." }, severity: "high" },
    { title: { zh: "拆单后地址错误", en: "Address Error After Split" }, desc: { zh: "大促高并发下拆单逻辑复用同一收货地址对象，并发修改导致子单 B 使用了子单 A 的地址。需对地址对象做深拷贝隔离。", en: "Under high concurrency, split logic reuses the same address object; concurrent modification causes sub-order B to use sub-order A's address. Deep-copy address objects for isolation." }, severity: "high" },
  ],
  moduleFlowNodes: [
    { id: "intake",  label: { zh: "订单接入",   en: "Order Intake" },   x: 140, y: 20,  color: "#6366f1" },
    { id: "atp",     label: { zh: "ATP 校验",   en: "ATP Check" },      x: 20,  y: 130, color: "#3b82f6" },
    { id: "split",   label: { zh: "拆单引擎",   en: "Split Engine" },   x: 260, y: 130, color: "#8b5cf6" },
    { id: "routing", label: { zh: "寻源路由",   en: "Sourcing" },       x: 140, y: 240, color: "#a855f7" },
    { id: "do",      label: { zh: "出库指令",   en: "DO Dispatch" },    x: 20,  y: 340, color: "#06b6d4" },
    { id: "reverse", label: { zh: "逆向物流",   en: "Reverse" },        x: 260, y: 340, color: "#f59e0b" },
  ],
  moduleFlowEdges: [
    { from: "intake",  to: "atp",     label: { zh: "库存校验", en: "Stock Check" } },
    { from: "intake",  to: "split",   label: { zh: "组合识别", en: "Mix Detect" } },
    { from: "atp",     to: "routing", label: { zh: "承诺通过", en: "ATP Pass" } },
    { from: "split",   to: "routing", label: { zh: "子单路由", en: "Sub-order Route" } },
    { from: "routing", to: "do",      label: { zh: "生成 DO", en: "Gen DO" } },
    { from: "do",      to: "reverse", label: { zh: "退货触发", en: "Return Trigger" }, dashed: true },
  ],
}

// ─────────────────────────────────────────────
// WMS — Warehouse Management System
// ─────────────────────────────────────────────
const wms: SystemDetail = {
  id: "wms",
  label: "WMS",
  fullName: { zh: "仓储管理系统", en: "Warehouse Management System" },
  vendor: "Manhattan Active Omni",
  category: { zh: "仓库物理操作核心", en: "Physical Warehouse Operations Core" },
  color: "#8b5cf6",
  icon: "🏭",
  tagline: {
    zh: "仓库的「大脑与神经」——将数字指令翻译为每一次精准的物理搬运动作",
    en: "The brain and nervous system of the warehouse — translating digital instructions into every precise physical movement",
  },
  overview: {
    zh: "WMS 管控仓库内发生的一切物理动作：货物收入（Inbound）、上架（Putaway）、波次计划（Wave）、拣货（Picking）、打包（Packing）与出库（Shipping）。它是 ERP 与仓库自动化设备（AGV/传送带/分拣机）之间的关键翻译层：向上通过 IDoc 接受 ERP 的出库指令，向下通过 MQTT/TCP 驱动 WCS 控制物理设备。在电子制造 DTC 场景下，WMS 还需严格执行 IMEI 序列号绑定、FEFO 批次管理，确保每件设备的全链路可溯源。",
    en: "WMS controls every physical action in the warehouse: inbound receiving, putaway, wave planning, picking, packing, and shipping. It is the critical translation layer between ERP and warehouse automation equipment (AGV/conveyors/sorters): receiving outbound instructions from ERP via IDoc from above, and driving WCS to control physical equipment via MQTT/TCP from below. In the DTC electronics scenario, WMS must also enforce IMEI serial number binding and FEFO batch management to ensure full traceability for every device.",
  },
  coreModules: [
    { id: "inbound",  name: { zh: "入库管理", en: "Inbound Management" },         desc: { zh: "ASN 预约收货、卸车、验收（数量/质量）、贴 LPN 标签、上架路径指引。", en: "ASN pre-arrival booking, unloading, receiving (quantity/quality), LPN labeling, putaway path guidance." }, icon: "📥" },
    { id: "wave",     name: { zh: "波次计划", en: "Wave Planning" },               desc: { zh: "按截止时间、区域密度、人力资源分批释放订单，生成最优拣货路径，控制单波次规模（50-200单）避免 DB 锁。", en: "Batch-release orders by deadline, zone density, and labor capacity. Generates optimal pick paths. Controls wave size (50-200 orders) to avoid DB locks." }, icon: "🌊" },
    { id: "picking",  name: { zh: "拣货执行", en: "Pick Execution" },              desc: { zh: "支持区域拣（Zone）、集群拣（Cluster）、货到人（GTP/AGV）多模式，扫描确认防错。", en: "Supports zone picking, cluster picking, and goods-to-person (GTP/AGV) modes. Scan-to-confirm error prevention." }, icon: "🤖" },
    { id: "packing",  name: { zh: "打包发运", en: "Pack & Ship" },                 desc: { zh: "自动推荐包装规格（减少空泡率）、触发 TMS 生成面单、绑定 IMEI 与运单号、出库扫描触发 WHSCON。", en: "Auto-recommends packaging size (reducing void fill), triggers TMS label generation, binds IMEI to tracking number, out-door scan triggers WHSCON." }, icon: "📦" },
    { id: "inventory",name: { zh: "库存控制", en: "Inventory Control" },           desc: { zh: "实时库存账本（LPN 级）、循环盘点、FEFO/FIFO 执行、质检冻结与解冻、序列号全程追踪。", en: "Real-time inventory ledger (LPN level), cycle counting, FEFO/FIFO enforcement, quality hold/release, serial number end-to-end tracking." }, icon: "🗂️" },
    { id: "labor",    name: { zh: "劳动力管理", en: "Labor Management" },          desc: { zh: "工人任务交织（Task Interleaving）、作业计时、生产力看板，优化人机协同效率。", en: "Worker task interleaving, time-motion tracking, productivity dashboard, optimizing human-robot collaboration efficiency." }, icon: "👷" },
    { id: "slotting", name: { zh: "库位优化", en: "Slotting Optimization" },       desc: { zh: "按 SKU 出库频率（ABC 分级）动态调整货位，将高频商品分配至黄金拣货区，减少行走距离。", en: "Dynamically adjusts slot assignments based on SKU outbound frequency (ABC classification). Assigns high-velocity items to golden pick zones to minimize travel distance." }, icon: "📍" },
  ],
  architecturePoints: [
    { title: { zh: "LPN 驱动的实时库存模型", en: "LPN-Driven Real-Time Inventory Model" }, desc: { zh: "每个物理容器（箱/托盘）绑定一个 LPN（License Plate Number）。库存移动以 LPN 为最小单位，每次扫描实时更新账本，无批处理延迟，ERP 与 WMS 库存始终一致。", en: "Every physical container (carton/pallet) is bound to an LPN. Inventory movements use LPN as the minimum unit; every scan updates the ledger in real time with no batch delay, keeping ERP and WMS inventory always consistent." } },
    { title: { zh: "任务交织（Task Interleaving）", en: "Task Interleaving" }, desc: { zh: "WMS 智能调度同一工人或 AGV 在完成拣货任务的归途中顺道执行补货任务，消除空行程，提升设备利用率 20-30%。", en: "WMS intelligently dispatches the same worker or AGV to perform replenishment tasks on the return trip after completing a pick task, eliminating empty travel and boosting equipment utilization by 20-30%." } },
    { title: { zh: "双向 IDoc 握手保障", en: "Bidirectional IDoc Handshake Guarantee" }, desc: { zh: "收到 ERP 的 SHP_OBDLV_SAVE_REPLICA 后，WMS 立即回送 ACK；出库完成后发送 WHSCON。双向确认机制确保任何一端重启后可从断点续传，不重不漏。", en: "Upon receiving SHP_OBDLV_SAVE_REPLICA from ERP, WMS immediately sends ACK; after outbound completion, sends WHSCON. The bidirectional confirmation ensures resumability from the exact breakpoint after any restart — no duplicates, no misses." } },
    { title: { zh: "FEFO + 序列号双重管控", en: "FEFO + Serial Number Dual Control" }, desc: { zh: "电子产品需同时满足先到期先出（FEFO，针对电池批次）和 IMEI 序列号逐件追踪，WMS 在拣货时强制执行并拒绝违规扫描。", en: "Electronics require both FEFO (First Expired First Out, for battery batches) and IMEI serial number unit-level tracking. WMS enforces both at pick time and rejects non-compliant scans." } },
  ],
  keyEntities: [
    { name: "LPN", desc: { zh: "License Plate Number，物理容器标识，库存移动的最小追踪单位。", en: "License Plate Number: physical container identifier and minimum tracking unit for inventory movements." } },
    { name: "Wave", desc: { zh: "波次，一批被同时释放并计划拣货的订单集合，含优化后的拣货路径。", en: "A batch of orders simultaneously released and planned for picking, containing optimized pick paths." } },
    { name: "Task", desc: { zh: "原子操作指令：拣取/放置/移动/盘点，分配给工人或 AGV 执行。", en: "Atomic operation instruction: pick/put/move/count, assigned to a worker or AGV for execution." } },
    { name: "Location", desc: { zh: "库位，仓库存储空间的最小单元，含巷道、层、位信息（如 A-03-02-1）。", en: "Storage location: the smallest storage unit in the warehouse, with aisle, level, and bay info (e.g., A-03-02-1)." } },
    { name: "Batch/Lot", desc: { zh: "批次，用于 FEFO 管理，含生产日期、有效期、质检状态。", en: "Batch/lot for FEFO management, containing production date, expiry date, and QC status." } },
  ],
  integrationPoints: [
    { system: "ERP", direction: "bidirectional", protocol: "EDI / IDoc", message: "SHP_OBDLV_SAVE_REPLICA / WHSCON", desc: { zh: "接收出库指令；回传实际出库数量触发 ERP 财务过账", en: "Receive outbound delivery instruction; return actual shipped quantity to trigger ERP financial posting" } },
    { system: "WCS", direction: "bidirectional", protocol: "MQTT / TCP Socket", message: "Task Dispatch / Completion ACK", desc: { zh: "下发拣货任务给 AGV/传送带；接收设备完成确认", en: "Dispatch pick tasks to AGVs/conveyors; receive device completion confirmations" } },
    { system: "TMS", direction: "out", protocol: "REST API", message: "Label Request / Manifest", desc: { zh: "请求承运商面单；发送舱单数据", en: "Request carrier shipping label; send manifesting data" } },
    { system: "OMS", direction: "bidirectional", protocol: "REST / MQ", message: "DO Receive / Status Callback", desc: { zh: "接收 OMS 出库指令单；回调出库状态更新", en: "Receive OMS Delivery Orders; callback outbound status updates" } },
  ],
  metrics: [
    { label: { zh: "波次计划耗时",   en: "Wave Planning Duration" }, value: "< 30s",      benchmark: { zh: "10,000 单并发计划，含路径优化", en: "10,000 concurrent orders with path optimization" } },
    { label: { zh: "拣货准确率",     en: "Pick Accuracy" },          value: "> 99.98%",   benchmark: { zh: "扫描确认 + IMEI 绑定双重防错", en: "Scan-confirm + IMEI binding dual error prevention" } },
    { label: { zh: "出库扫描确认率", en: "Outbound Scan Rate" },      value: "100%",       benchmark: { zh: "强制要求，低于 100% 触发系统告警", en: "Mandatory; below 100% triggers system alert" } },
    { label: { zh: "AGV 任务利用率", en: "AGV Task Utilization" },    value: "> 85%",      benchmark: { zh: "任务交织策略消除空行程", en: "Task interleaving strategy eliminates empty travel" } },
  ],
  pitfalls: [
    { title: { zh: "超大波次导致 DB 表锁", en: "Oversized Wave Causes DB Table Lock" }, desc: { zh: "单波次超过 2,000 单时，波次计划 SQL 对 Task 表做全表更新，产生排他锁，阻塞其他读写操作，系统响应时间从秒级升至分钟级。需将波次上限设置为 200 单并监控锁等待时间。", en: "When a single wave exceeds 2,000 orders, the wave planning SQL performs a full-table update on the Task table, creating exclusive locks that block other read/write operations, pushing system response from seconds to minutes. Cap wave size at 200 orders and monitor lock wait times." }, severity: "critical" },
    { title: { zh: "FEFO 违规导致监管风险", en: "FEFO Violation Creates Regulatory Risk" }, desc: { zh: "拣货工人绕过 WMS 系统手动拣取非 FEFO 批次，导致临近过期电池批次滞留仓库，引发产品质量与监管合规风险。需强制扫描确认且系统拒绝非 FEFO 批次扫描。", en: "Workers manually picking non-FEFO batches outside the WMS system causes near-expired battery batches to remain in the warehouse, creating product quality and regulatory compliance risks. Enforce scan confirmation and system rejection of non-FEFO batch scans." }, severity: "high" },
    { title: { zh: "LPN 标签脱落导致库存盲区", en: "LPN Label Loss Creates Inventory Blind Spot" }, desc: { zh: "LPN 条码标签在搬运中脱落或污损，导致该容器从系统视图中消失（\"幽灵库存\"），实物存在但账面为零，影响 ATP 准确性。需定期触发异常 LPN 扫描巡查任务。", en: "LPN barcode label falling off or damaged during handling causes the container to disappear from system view ('ghost inventory'). Physical stock exists but book shows zero, affecting ATP accuracy. Schedule regular anomalous LPN scanning patrol tasks." }, severity: "medium" },
  ],
  moduleFlowNodes: [
    { id: "inbound",   label: { zh: "入库收货",   en: "Inbound" },      x: 20,  y: 20,  color: "#06b6d4" },
    { id: "inventory", label: { zh: "库存管理",   en: "Inventory" },    x: 200, y: 20,  color: "#3b82f6" },
    { id: "wave",      label: { zh: "波次计划",   en: "Wave Plan" },    x: 20,  y: 150, color: "#8b5cf6" },
    { id: "picking",   label: { zh: "拣货执行",   en: "Picking" },      x: 200, y: 150, color: "#a855f7" },
    { id: "packing",   label: { zh: "打包发运",   en: "Pack & Ship" },  x: 110, y: 270, color: "#ec4899" },
    { id: "slotting",  label: { zh: "库位优化",   en: "Slotting" },     x: 340, y: 150, color: "#f59e0b" },
  ],
  moduleFlowEdges: [
    { from: "inbound",   to: "inventory", label: { zh: "上架入账", en: "Putaway" } },
    { from: "inventory", to: "wave",      label: { zh: "订单释放", en: "Order Release" } },
    { from: "wave",      to: "picking",   label: { zh: "任务下发", en: "Task Dispatch" } },
    { from: "picking",   to: "packing",   label: { zh: "拣完交接", en: "Pick→Pack" } },
    { from: "inventory", to: "slotting",  label: { zh: "频率分析", en: "Velocity Analysis" }, dashed: true },
    { from: "slotting",  to: "wave",      label: { zh: "优化路径", en: "Optimize Path" }, dashed: true },
  ],
}

// ─────────────────────────────────────────────
// TMS — Transportation Management System
// ─────────────────────────────────────────────
const tms: SystemDetail = {
  id: "tms",
  label: "TMS",
  fullName: { zh: "运输管理系统", en: "Transportation Management System" },
  vendor: "Oracle OTM (Global Trade Management)",
  category: { zh: "承运商对接与运费管控", en: "Carrier Integration & Freight Cost Control" },
  color: "#a855f7",
  icon: "🚚",
  tagline: {
    zh: "从仓库到消费者最后一公里的「调度指挥官」——运费最优、时效承诺、全程可视",
    en: "The dispatch commander for the last mile from warehouse to consumer — optimal freight, SLA commitment, end-to-end visibility",
  },
  overview: {
    zh: "TMS 负责将仓库打包完成的货物高效、低成本地送达消费者手中。其核心职能包括：① 对接顺丰、京东物流、菜鸟、FedEx、UPS 等多家承运商 API，实时询价并选择最优方案；② 生成电子面单（Shipping Label）并回传 WMS 打印；③ 全程追踪货物位置，主动推送异常告警（延误/破损/签收失败）；④ 完成运费对账，与 ERP 对接结算。在 DTC 场景下，TMS 还需处理同城速递（2h达）、跨境清关单证等特殊需求。",
    en: "TMS efficiently and cost-effectively delivers goods from the packed warehouse to consumers. Core functions: ① Integrating with SF Express, JD Logistics, Cainiao, FedEx, UPS and other carrier APIs for real-time rate shopping and optimal carrier selection; ② Generating electronic shipping labels and returning them to WMS for printing; ③ End-to-end cargo tracking with proactive exception alerts (delay/damage/failed delivery); ④ Freight reconciliation integrated with ERP settlement. In the DTC scenario, TMS also handles same-city express (2-hour delivery), cross-border customs documentation, and other special requirements.",
  },
  coreModules: [
    { id: "carrier",   name: { zh: "承运商管理", en: "Carrier Management" },      desc: { zh: "维护多承运商合同运价、服务时效 SLA、覆盖区域，支持按业务场景动态切换首选承运商。", en: "Maintains multi-carrier contract rates, service SLAs, and coverage zones. Supports dynamic switching of preferred carrier by business scenario." }, icon: "🤝" },
    { id: "rate",      name: { zh: "实时询价引擎", en: "Real-Time Rate Engine" },  desc: { zh: "并发调用多家承运商 API 获取实时报价，按时效/成本/碳排放多维度排序，自动选优。", en: "Concurrently calls multiple carrier APIs for real-time quotes, ranks by SLA/cost/carbon emissions, and auto-selects the optimal option." }, icon: "💰" },
    { id: "label",     name: { zh: "面单生成", en: "Label Generation" },           desc: { zh: "对接承运商标准面单格式（顺丰/FedEx/UPS），生成含条码、二维码、地址的标准标签并回传 WMS 打印站。", en: "Integrates with carrier standard label formats (SF/FedEx/UPS). Generates standard labels with barcode, QR code, and address, returned to WMS print stations." }, icon: "🏷️" },
    { id: "track",     name: { zh: "全程追踪", en: "End-to-End Tracking" },       desc: { zh: "聚合各承运商追踪事件（揽件/在途/派件/签收），统一推送至 OMS 和消费者通知服务。", en: "Aggregates carrier tracking events (pickup/in-transit/out-for-delivery/delivered). Unified push to OMS and consumer notification service." }, icon: "📍" },
    { id: "exception", name: { zh: "异常管理", en: "Exception Management" },       desc: { zh: "SLA 违约预警、包裹损坏/丢失处理、未妥投重派，自动触发客服工单创建。", en: "SLA breach early warning, package damage/loss handling, failed delivery re-dispatch. Auto-triggers customer service ticket creation." }, icon: "⚠️" },
    { id: "settle",    name: { zh: "运费结算", en: "Freight Settlement" },         desc: { zh: "承运商账单自动校验（与 TMS 计费模型比对），差异自动标注，通过 ERP 完成付款指令。", en: "Auto-validates carrier invoices against TMS billing model, auto-flags discrepancies, and processes payment instructions through ERP." }, icon: "🧾" },
  ],
  architecturePoints: [
    { title: { zh: "承运商 API 适配层", en: "Carrier API Adapter Layer" }, desc: { zh: "每家承运商 API 规范不同（REST/SOAP/EDI），TMS 通过统一适配层屏蔽差异，上层业务逻辑只感知标准化的「运单对象」，新增承运商只需开发一个适配器插件。", en: "Each carrier has different API specs (REST/SOAP/EDI). TMS uses a unified adapter layer to abstract the differences. Business logic only sees standardized 'shipment objects'; adding a new carrier only requires one adapter plugin." } },
    { title: { zh: "末端配送差异化策略", en: "Last-Mile Differentiation Strategy" }, desc: { zh: "同城订单路由至即时物流（顺丰同城/达达）实现 2h 达；跨省订单路由标准快递；跨境订单触发清关单证生成（CO、发票、装箱单）并选择有报关资质的承运商。", en: "Same-city orders route to instant delivery (SF City/Dada) for 2-hour SLA; inter-provincial orders route to standard express; cross-border orders trigger customs document generation (CO, invoice, packing list) and select licensed customs brokers." } },
    { title: { zh: "运费可视化管控", en: "Freight Cost Visibility & Control" }, desc: { zh: "每笔运单的实际运费与预算运费实时比对，生成承运商绩效报告（准时率/损坏率/运价偏差），为年度合同谈判提供数据支撑。", en: "Actual freight vs. budgeted freight compared in real time per shipment. Carrier performance reports (on-time rate/damage rate/rate deviation) generated to support annual contract negotiations." } },
  ],
  keyEntities: [
    { name: "Shipment",        desc: { zh: "运单，一次物理运输的最小计费单位，绑定面单号、承运商、实际重量/体积。", en: "Shipment: minimum billing unit for one physical transport, bound to tracking number, carrier, actual weight/volume." } },
    { name: "Carrier Rate",    desc: { zh: "承运商运价记录，含首重/续重价格、区域附加费、燃油附加费有效期。", en: "Carrier rate record containing base/continuation weight pricing, zone surcharges, and fuel surcharge validity." } },
    { name: "Shipping Label",  desc: { zh: "电子面单，含运单号条码、发收件地址、服务类型、条形码供扫描追踪。", en: "Electronic shipping label containing tracking number barcode, sender/recipient addresses, service type, and barcode for scan tracking." } },
    { name: "Tracking Event",  desc: { zh: "追踪事件记录，承运商推送的每个物流节点扫描记录（揽件/到仓/派件/签收）。", en: "Tracking event record: each logistics node scan pushed by carrier (pickup/hub arrival/out-for-delivery/delivered)." } },
    { name: "Freight Invoice", desc: { zh: "承运商账单，TMS 自动执行三路匹配（运单/计费明细/账单），差异超阈值转人工审核。", en: "Carrier invoice: TMS auto-executes 3-way match (shipment/billing detail/invoice). Variances above threshold route to manual review." } },
  ],
  integrationPoints: [
    { system: "WMS",      direction: "bidirectional", protocol: "REST API",      message: "Label Request / Manifest",       desc: { zh: "WMS 请求面单生成；TMS 返回标签数据供打印", en: "WMS requests label generation; TMS returns label data for printing" } },
    { system: "OMS",      direction: "out",           protocol: "Webhook / MQ",  message: "Tracking Status Push",           desc: { zh: "实时推送货物追踪状态至 OMS，触发消费者通知", en: "Real-time push of tracking status to OMS, triggering consumer notifications" } },
    { system: "ERP",      direction: "bidirectional", protocol: "REST / EDI",    message: "Freight Cost / Invoice Posting", desc: { zh: "将实际运费过账至 ERP 成本中心；接收付款指令", en: "Post actual freight to ERP cost center; receive payment instructions" } },
    { system: "承运商 API", direction: "bidirectional", protocol: "REST/SOAP/EDI", message: "Rate / Label / Track",          desc: { zh: "实时询价、面单申请、追踪事件订阅", en: "Real-time rate query, label application, tracking event subscription" } },
  ],
  metrics: [
    { label: { zh: "面单生成时间",   en: "Label Generation Time" }, value: "< 2s",    benchmark: { zh: "含承运商 API 调用，P99 响应时间", en: "Including carrier API call, P99 response time" } },
    { label: { zh: "准时履约率 OTD", en: "On-Time Delivery Rate" }, value: "> 98%",   benchmark: { zh: "同城 2h 达 SLA 履约率", en: "Same-city 2-hour delivery SLA fulfillment rate" } },
    { label: { zh: "运费对账差异率", en: "Freight Reconciliation Variance" }, value: "< 0.5%", benchmark: { zh: "自动三路匹配，差异超 0.5% 转人工", en: "Auto 3-way match; variance >0.5% routes to manual" } },
    { label: { zh: "追踪事件延迟",   en: "Tracking Event Latency" }, value: "< 5min", benchmark: { zh: "承运商扫描到消费者可见的端到端延迟", en: "End-to-end latency from carrier scan to consumer visibility" } },
  ],
  pitfalls: [
    { title: { zh: "面单重复打印导致一票多发", en: "Duplicate Label Printing → Multiple Shipments" }, desc: { zh: "WMS 打印站网络超时重试导致同一运单号打印多张面单，不同箱子贴同一面单出库，承运商系统判重导致部分包裹被拒收。需在 TMS 层实现面单幂等保护，同一 DO 只生成一次运单号。", en: "WMS print station network timeout retries cause multiple prints of the same tracking number. Different boxes with identical labels cause carrier system deduplication to reject some packages. Implement label idempotency in TMS: one tracking number per DO." }, severity: "critical" },
    { title: { zh: "承运商 API 宕机无降级方案", en: "No Fallback When Carrier API Goes Down" }, desc: { zh: "单一承运商 API 故障时系统无法生成面单，仓库出库流程完全中断。需设计承运商降级策略：主承运商超时自动切换备选承运商，并支持离线预生成面单（牺牲运价最优换取可用性）。", en: "When a single carrier API fails, the system cannot generate labels, completely blocking the warehouse outbound flow. Design carrier fallback strategy: auto-switch to backup carrier on primary timeout, and support offline pre-generated labels (sacrificing rate optimization for availability)." }, severity: "critical" },
  ],
  moduleFlowNodes: [
    { id: "rate",      label: { zh: "实时询价",   en: "Rate Shopping" },   x: 20,  y: 30,  color: "#a855f7" },
    { id: "label",     label: { zh: "面单生成",   en: "Label Gen" },       x: 220, y: 30,  color: "#8b5cf6" },
    { id: "dispatch",  label: { zh: "运单派发",   en: "Dispatch" },        x: 120, y: 140, color: "#6366f1" },
    { id: "track",     label: { zh: "全程追踪",   en: "Tracking" },        x: 20,  y: 250, color: "#3b82f6" },
    { id: "exception", label: { zh: "异常处理",   en: "Exception Mgmt" }, x: 220, y: 250, color: "#f59e0b" },
    { id: "settle",    label: { zh: "运费结算",   en: "Settlement" },      x: 120, y: 360, color: "#22c55e" },
  ],
  moduleFlowEdges: [
    { from: "rate",      to: "label",     label: { zh: "选定承运商", en: "Carrier Selected" } },
    { from: "label",     to: "dispatch",  label: { zh: "面单就绪", en: "Label Ready" } },
    { from: "dispatch",  to: "track",     label: { zh: "发出追踪", en: "Start Tracking" } },
    { from: "track",     to: "exception", label: { zh: "异常告警", en: "Exception Alert" }, dashed: true },
    { from: "track",     to: "settle",    label: { zh: "签收确认", en: "POD Confirm" } },
    { from: "exception", to: "settle",    label: { zh: "索赔处理", en: "Claim" }, dashed: true },
  ],
}

// ─────────────────────────────────────────────
// SRM — Supplier Relationship Management
// ─────────────────────────────────────────────
const srm: SystemDetail = {
  id: "srm",
  label: "SRM",
  fullName: { zh: "供应商关系管理系统", en: "Supplier Relationship Management" },
  vendor: "SAP Ariba / 自研供应商门户",
  category: { zh: "采购协同与供应商治理", en: "Procurement Collaboration & Supplier Governance" },
  color: "#06b6d4",
  icon: "🤝",
  tagline: {
    zh: "将数十家芯片/屏幕/外壳供应商纳入统一协同平台——从准入到付款，全程数字化",
    en: "Bringing dozens of chip/display/enclosure suppliers into a unified collaboration platform — digitized from onboarding to payment",
  },
  overview: {
    zh: "SRM 是企业与上游供应商协同的数字化枢纽。在消费电子 DTC 场景下，品牌方需要管理 Tier 1（芯片/屏幕/基带）和 Tier 2（PCB/外壳/包材）数十家供应商，协调采购预测共享、VMI 库存管理、订单确认、发货通知（ASN）和对账付款。SRM 将原本通过邮件/Excel 进行的供应商沟通转化为结构化的电子交互，大幅降低沟通成本并提升供应链可视性。",
    en: "SRM is the digital hub for enterprise-supplier collaboration. In the DTC electronics scenario, the brand manages Tier 1 (chip/display/baseband) and Tier 2 (PCB/enclosure/packaging) suppliers — dozens in total — coordinating demand forecast sharing, VMI inventory management, order acknowledgment, advance shipping notices (ASN), and invoice reconciliation. SRM transforms supplier communication from email/Excel into structured electronic interaction, dramatically reducing communication costs and improving supply chain visibility.",
  },
  coreModules: [
    { id: "onboard",   name: { zh: "供应商准入管理", en: "Supplier Onboarding" },      desc: { zh: "资质审核、合规文件上传、银行账户验证、采购组织分配，新供应商平均准入周期从 3 周缩短至 5 天。", en: "Qualification review, compliance document upload, bank account verification, purchasing org assignment. Average new supplier onboarding reduced from 3 weeks to 5 days." }, icon: "🆕" },
    { id: "po",        name: { zh: "采购订单协同", en: "PO Collaboration" },           desc: { zh: "ERP 生成 PO 后自动推送至 SRM 供应商门户，供应商确认/修改/拒绝，变更历史全程留痕。", en: "PO auto-pushed to SRM supplier portal after ERP creation. Supplier confirms/modifies/rejects; full change history preserved." }, icon: "📋" },
    { id: "vmi",       name: { zh: "VMI 寄售库存", en: "VMI Consignment" },           desc: { zh: "供应商实时查看代工厂仓库的物料库存水位，低于补货点自动触发送货，所有权转移在物料上线时结算。", en: "Suppliers view real-time material stock levels at OEM warehouses. Auto-triggers replenishment below reorder point. Ownership transfers at material line-start." }, icon: "📦" },
    { id: "asn",       name: { zh: "发货通知 ASN", en: "Advance Ship Notice (ASN)" }, desc: { zh: "供应商发货前提交 ASN（含批次、数量、预计到厂时间），WMS 据此安排卸货月台与收货资源。", en: "Suppliers submit ASN before shipping (including batch, quantity, estimated arrival). WMS uses ASN to schedule unloading docks and receiving resources." }, icon: "📬" },
    { id: "scorecard", name: { zh: "供应商绩效考核", en: "Supplier Scorecard" },       desc: { zh: "自动统计准时交货率（OTD）、质量合格率、发票准确率，生成季度绩效报告，驱动战略供应商分级。", en: "Auto-calculates OTD, quality pass rate, and invoice accuracy. Generates quarterly performance reports to drive strategic supplier tiering." }, icon: "📊" },
    { id: "invoice",   name: { zh: "对账与付款", en: "Invoice & Payment" },           desc: { zh: "供应商上传发票后，系统执行三路匹配（PO/GR/Invoice），差异自动标注，通过 ERP FI 模块完成付款。", en: "After supplier uploads invoice, system executes 3-way match (PO/GR/Invoice), auto-flags discrepancies, and completes payment through ERP FI module." }, icon: "💳" },
  ],
  architecturePoints: [
    { title: { zh: "EDI + Portal 双轨并行", en: "EDI + Portal Dual-Track" }, desc: { zh: "大型 Tier 1 供应商（如台积电、三星）采用 EDI（850/856/810 报文）实现系统对系统自动化；中小供应商通过 Web Portal 人工操作。两种方式统一接入 SRM 后端，数据标准一致。", en: "Large Tier 1 suppliers (e.g., TSMC, Samsung) use EDI (850/856/810 messages) for system-to-system automation. SME suppliers use the Web Portal for manual operations. Both feed into the same SRM backend with consistent data standards." } },
    { title: { zh: "VMI 库存所有权追踪", en: "VMI Inventory Ownership Tracking" }, desc: { zh: "VMI 模式下同一物料在仓库中同时存在「供应商所有」和「已结算」两种状态。SRM 与 ERP 联动，在物料被拉上生产线的瞬间触发所有权转移与应付账款计提，精确到批次级别。", en: "Under VMI, the same material in the warehouse simultaneously has 'supplier-owned' and 'settled' states. SRM and ERP are linked to trigger ownership transfer and AP accrual the instant material is pulled to the production line, accurate to batch level." } },
    { title: { zh: "需求信号共享", en: "Demand Signal Sharing" }, desc: { zh: "OMS 的销售预测经 ERP MRP 运算后生成需求计划，SRM 将滚动 12 周需求预测开放给关键供应商，减少供应商备货盲目性，缩短物料响应周期。", en: "Sales forecasts from OMS flow through ERP MRP to generate demand plans. SRM shares rolling 12-week demand forecasts with key suppliers, reducing supplier stock blindness and shortening material response cycles." } },
  ],
  keyEntities: [
    { name: "Supplier Master",   desc: { zh: "供应商主数据，含资质等级、付款条款、负责采购员、绩效历史。", en: "Supplier master data: qualification tier, payment terms, responsible buyer, performance history." } },
    { name: "Purchase Order",    desc: { zh: "采购订单，SRM 是供应商视角的 PO 协作界面，数据主体在 ERP MM。", en: "Purchase order: SRM is the supplier-facing PO collaboration interface; data master resides in ERP MM." } },
    { name: "ASN",               desc: { zh: "预先发货通知，供应商主动推送，驱动 WMS 收货准备与入库计划。", en: "Advance Ship Notice: proactively pushed by supplier, driving WMS receiving preparation and inbound planning." } },
    { name: "VMI Replenishment", desc: { zh: "VMI 补货指令，由 SRM 根据库存水位自动生成并推送给供应商。", en: "VMI replenishment instruction auto-generated by SRM based on stock level and pushed to supplier." } },
    { name: "Scorecard",         desc: { zh: "季度绩效评分卡，驱动供应商分级（战略/优选/合格/待整改）。", en: "Quarterly performance scorecard driving supplier tiering (strategic/preferred/qualified/at-risk)." } },
  ],
  integrationPoints: [
    { system: "ERP", direction: "bidirectional", protocol: "EDI / OData", message: "PO / GR / Invoice", desc: { zh: "SRM 从 ERP 获取 PO 并将供应商确认/发票回写 ERP 触发付款", en: "SRM fetches PO from ERP and writes supplier confirmations/invoices back to trigger payment" } },
    { system: "WMS", direction: "out",           protocol: "REST / EDI",  message: "ASN → Inbound Plan",   desc: { zh: "供应商 ASN 同步至 WMS 生成入库计划与月台预约", en: "Supplier ASN synced to WMS to generate inbound plan and dock appointment" } },
    { system: "供应商系统", direction: "bidirectional", protocol: "EDI (850/856/810) / Web Portal", message: "PO/ASN/Invoice", desc: { zh: "大型供应商 EDI 直连；中小供应商 Portal 手动操作", en: "Large suppliers via direct EDI; SME suppliers via manual Portal" } },
  ],
  metrics: [
    { label: { zh: "供应商准入周期",   en: "Supplier Onboarding Cycle" }, value: "< 5 天",  benchmark: { zh: "从申请到首单可下，含资质审核与系统配置", en: "From application to first PO, including qualification review and system setup" } },
    { label: { zh: "VMI 库存周转率",  en: "VMI Inventory Turns" },       value: "> 12×/年", benchmark: { zh: "消费电子行业 VMI 最佳实践：12-16 次/年", en: "Electronics industry VMI best practice: 12-16 turns/year" } },
    { label: { zh: "供应商准时交货率", en: "Supplier OTD" },              value: "> 95%",    benchmark: { zh: "关键 Tier 1 供应商 KPI，低于 90% 触发预警", en: "Key Tier 1 supplier KPI; below 90% triggers escalation" } },
    { label: { zh: "发票三路匹配率",  en: "Invoice 3-Way Match Rate" },  value: "> 98%",    benchmark: { zh: "自动匹配成功率，低于阈值人工审核成本大幅上升", en: "Auto-match success rate; below threshold causes significant manual review cost" } },
  ],
  pitfalls: [
    { title: { zh: "VMI 库存所有权争议", en: "VMI Inventory Ownership Dispute" }, desc: { zh: "物料在 VMI 仓库中损耗（潮湿/撞损）时，供应商与品牌方对损失承担方存在争议。需在合同中明确 VMI 存放条件与损耗赔偿条款，并在 SRM 中记录入库时的质检照片。", en: "When materials in the VMI warehouse are damaged (moisture/impact), suppliers and the brand dispute liability. Clarify VMI storage conditions and damage compensation terms in contracts, and record QC photos at receipt in SRM." }, severity: "high" },
    { title: { zh: "中小供应商 EDI 对接成本", en: "SME Supplier EDI Integration Cost" }, desc: { zh: "中小供应商缺乏 EDI 能力，强制要求 EDI 会导致其退出供应链。需提供轻量级 Portal 和 Excel 模板作为降级方案，同时推动关键节点（ASN/发票）的逐步电子化。", en: "SME suppliers lack EDI capability; forcing EDI may cause them to exit the supply chain. Provide lightweight Portal and Excel templates as fallback while gradually pushing key touchpoints (ASN/invoice) toward digitization." }, severity: "medium" },
  ],
  moduleFlowNodes: [
    { id: "onboard",   label: { zh: "供应商准入",   en: "Onboarding" },    x: 20,  y: 20,  color: "#06b6d4" },
    { id: "po",        label: { zh: "PO 协同",     en: "PO Collab" },     x: 220, y: 20,  color: "#3b82f6" },
    { id: "vmi",       label: { zh: "VMI 寄售",    en: "VMI" },           x: 20,  y: 150, color: "#8b5cf6" },
    { id: "asn",       label: { zh: "ASN 发货",    en: "ASN" },           x: 220, y: 150, color: "#a855f7" },
    { id: "invoice",   label: { zh: "对账付款",    en: "Invoice/Pay" },   x: 120, y: 270, color: "#22c55e" },
    { id: "scorecard", label: { zh: "绩效考核",    en: "Scorecard" },     x: 320, y: 270, color: "#f59e0b" },
  ],
  moduleFlowEdges: [
    { from: "onboard",   to: "po",        label: { zh: "准入完成", en: "Approved" } },
    { from: "po",        to: "asn",       label: { zh: "PO 确认", en: "PO Confirmed" } },
    { from: "vmi",       to: "po",        label: { zh: "补货触发", en: "Replenish" } },
    { from: "asn",       to: "invoice",   label: { zh: "收货确认", en: "GR Confirmed" } },
    { from: "invoice",   to: "scorecard", label: { zh: "结算数据", en: "Settlement Data" }, dashed: true },
    { from: "po",        to: "scorecard", label: { zh: "OTD 追踪", en: "OTD Track" }, dashed: true },
  ],
}

const wcs: SystemDetail = {
  id: "wcs",
  label: "WCS/PLC",
  fullName: { zh: "仓储控制系统 / 可编程逻辑控制器", en: "Warehouse Control System / PLC" },
  vendor: "Siemens / Rockwell / Honeywell Intelligrated / KION Dematic",
  category: { zh: "自动化控制层", en: "Automation Control Layer" },
  color: "#f59e0b",
  icon: "⚙",
  tagline: {
    zh: "物理世界的神经系统：把 WMS 的「软」指令转化为输送带、AGV、分拣机的「硬」动作",
    en: "The nervous system of the physical warehouse: translates WMS soft instructions into hard actions for conveyors, AGVs, and sorters",
  },
  overview: {
    zh: "WCS（仓储控制系统）是 WMS 与物理自动化设备之间的实时控制中间件。它接收 WMS 下发的任务指令，经由 PLC 梯形图逻辑将其转化为具体的机电控制信号——驱动 AGV 搬运、传送带分流、高速分拣机落格。在消费电子 GDC 场景下，WCS 每秒处理数百条设备状态上报，确保在 100,000+ SKU 的大库中实现 99.99% 的分拣正确率与 <50ms 的指令响应延迟。",
    en: "WCS (Warehouse Control System) is the real-time control middleware between WMS and physical automation equipment. It receives task instructions from WMS and, through PLC ladder logic, translates them into concrete electromechanical control signals — driving AGV transport, conveyor diversion, and high-speed sorter bin assignments. In a consumer electronics GDC scenario, WCS processes hundreds of device status reports per second, ensuring 99.99% sort accuracy and <50ms command response latency across a 100,000+ SKU warehouse.",
  },
  coreModules: [
    { id: "agv",      name: { zh: "AGV 调度引擎",       en: "AGV Dispatch Engine" },         icon: "🤖", desc: { zh: "实时路径规划与冲突消解，分配最优 AGV 执行搬运任务；支持 100+ 台 AGV 同场协同", en: "Real-time path planning and conflict resolution; assigns optimal AGV for each transport task; supports 100+ concurrent AGVs" }, tech: "A* / Dijkstra, 分布式锁, 心跳检测" },
    { id: "conveyor", name: { zh: "传送带 / 输送线控制", en: "Conveyor Line Control" },         icon: "⚡", desc: { zh: "通过 PLC I/O 控制分流挡板、光幕传感器、速度变频；实现包裹自动扫码分流", en: "Controls divert gates, light curtains, and VFD speed via PLC I/O; enables automatic barcode-scan divert routing of parcels" }, tech: "Siemens S7-1500 PLC, PROFINET, 梯形图 / FBD" },
    { id: "sorter",   name: { zh: "高速分拣机控制",       en: "High-speed Sorter Control" },    icon: "🔀", desc: { zh: "交叉带分拣机 / 摆轮分拣机的落格指令下发；与 WMS 格口地图实时同步，支持动态格口重分配", en: "Issues slot assignment instructions to cross-belt and wheel sorters; syncs with WMS chute map in real time; supports dynamic slot reassignment" }, tech: "Vanderlande / Dematic SDK, EtherNet/IP" },
    { id: "scada",    name: { zh: "SCADA 监控大屏",      en: "SCADA Monitoring Dashboard" },   icon: "📊", desc: { zh: "可视化展示全库设备运行状态、吞吐率、故障告警；历史数据归档供产能规划分析", en: "Visualizes all equipment operational status, throughput, and fault alerts across the warehouse; archives historical data for capacity planning" }, tech: "Wonderware / Ignition SCADA, InfluxDB, Grafana" },
    { id: "plc",      name: { zh: "PLC 梯形图 / FBD 程序", en: "PLC Ladder / FBD Program" },  icon: "🔌", desc: { zh: "硬实时控制逻辑，扫描周期 1-10ms；控制电机启停、传感器读取、安全联锁（急停/光栅）", en: "Hard real-time control logic with 1-10ms scan cycle; controls motor start/stop, sensor reads, safety interlocks (E-stop/light curtain)" }, tech: "IEC 61131-3 (LD / FBD / ST), TIA Portal" },
    { id: "mfc",      name: { zh: "MFC 物料流控制器",     en: "MFC — Material Flow Controller" }, icon: "🗺️", desc: { zh: "WCS 上层编排模块：把 WMS 任务分解为设备动作序列，管理多段输送线的协调与缓冲区调度", en: "Upper orchestration layer of WCS: decomposes WMS tasks into device action sequences; manages multi-segment conveyor coordination and buffer zone scheduling" }, tech: "Java / C++ 中间件, OPC-UA, MQTT Broker" },
  ],
  architecturePoints: [
    {
      title: { zh: "两层控制架构", en: "Two-tier Control Architecture" },
      desc: { zh: "上层 MFC（软件）负责任务调度与路径规划；下层 PLC（硬件）负责毫秒级实时 I/O 控制。两层通过 OPC-UA 或专有协议桥接，清晰分离调度逻辑与硬件控制逻辑。", en: "Upper MFC (software) handles task scheduling and path planning; lower PLC (hardware) handles millisecond real-time I/O control. The two tiers are bridged via OPC-UA or proprietary protocol, cleanly separating scheduling logic from hardware control logic." },
    },
    {
      title: { zh: "硬实时 vs 软实时", en: "Hard Real-time vs Soft Real-time" },
      desc: { zh: "PLC 运行 IEC 61131-3 硬实时程序（1-10ms 扫描周期），不可被操作系统调度打断。WCS 上层软件运行于 Linux/Windows，属软实时（50-200ms 响应）。安全联锁（急停/光栅触发）必须在硬实时层处理，不得依赖网络通信。", en: "PLCs run IEC 61131-3 hard real-time programs (1-10ms scan cycle) and cannot be preempted by OS scheduling. Upper WCS software runs on Linux/Windows as soft real-time (50-200ms response). Safety interlocks (E-stop/light curtain triggers) must be handled at the hard real-time layer; they must not rely on network communication." },
    },
    {
      title: { zh: "MQTT 设备遥测总线", en: "MQTT Device Telemetry Bus" },
      desc: { zh: "AGV、扫描枪、传感器通过 MQTT 上报状态（位置/电量/错误码），WCS Broker 聚合后推送至 WMS 和 SCADA。MQTT QoS 1 确保关键状态不丢失，同时保持低带宽开销。", en: "AGVs, scanners, and sensors report status (position/battery/error code) via MQTT; WCS Broker aggregates and pushes to WMS and SCADA. MQTT QoS 1 ensures critical status events are not lost while maintaining low bandwidth overhead." },
    },
    {
      title: { zh: "冗余与故障转移", en: "Redundancy and Failover" },
      desc: { zh: "核心 PLC 采用主备热冗余（CPU 冗余模块），切换时间 <100ms。AGV 调度引擎部署双活节点，通过 ZooKeeper 选主。网络采用环形 PROFINET / EtherNet/IP，任意单点断线不影响全局。", en: "Core PLCs use hot-standby CPU redundancy with <100ms switchover. AGV dispatch engine runs active-active nodes with ZooKeeper-based leader election. Network uses ring PROFINET/EtherNet/IP topology so any single link failure does not affect the whole system." },
    },
  ],
  keyEntities: [
    { name: "TaskInstruction", desc: { zh: "WMS → WCS 搬运任务：起点 LPN、终点格口、优先级、时限", en: "WMS → WCS transport task: source LPN, destination chute, priority, deadline" } },
    { name: "AGVStatus",       desc: { zh: "AGV 实时状态：位置坐标、当前任务、电量、错误码", en: "AGV real-time state: position coordinates, current task, battery level, error code" } },
    { name: "ConveyorEvent",   desc: { zh: "传送带事件：包裹到达扫描点、分流触发、拥堵告警", en: "Conveyor event: parcel arrival at scan point, divert trigger, jam alert" } },
    { name: "PLCDataBlock",    desc: { zh: "PLC 数据块：I/O 点位状态表、电机运行参数、安全状态字", en: "PLC data block: I/O point status table, motor operating parameters, safety status word" } },
    { name: "SorterChuteMap",  desc: { zh: "分拣机格口地图：格口号 → 目的地仓位/路由规则，实时从 WMS 同步", en: "Sorter chute map: chute number → destination location/routing rule, synced from WMS in real time" } },
    { name: "AlarmRecord",     desc: { zh: "故障告警记录：设备 ID、告警类型、触发时间、处理状态", en: "Fault alarm record: device ID, alarm type, trigger time, handling status" } },
  ],
  integrationPoints: [
    { system: "WMS", direction: "in",  protocol: "TCP/IP Socket / OPC-UA / REST", message: "TaskInstruction", desc: { zh: "WMS 下发搬运任务与分拣指令，WCS 回报任务完成状态与设备异常", en: "WMS sends transport tasks and sort instructions; WCS reports task completion status and device anomalies" } },
    { system: "ERP", direction: "out", protocol: "WMS → ERP (间接)",              message: "GR/GI Confirmation", desc: { zh: "WCS 完成物理操作后通知 WMS，WMS 再触发 ERP 过账（WCS 不直接对接 ERP）", en: "WCS notifies WMS upon physical completion; WMS then triggers ERP posting (WCS does not directly interface with ERP)" } },
    { system: "SCADA", direction: "out", protocol: "OPC-UA / MQTT",               message: "设备遥测 / 告警", desc: { zh: "将 PLC 实时数据推送至 SCADA 监控平台，供大屏可视化与历史归档", en: "Pushes PLC real-time data to SCADA monitoring platform for dashboard visualization and historical archiving" } },
    { system: "AGV 集群", direction: "bidirectional", protocol: "MQTT / Wi-Fi 5GHz", message: "任务 / 状态", desc: { zh: "WCS 通过 MQTT 下发任务给 AGV Fleet Manager，接收 AGV 位置与状态回报", en: "WCS dispatches tasks to AGV Fleet Manager via MQTT and receives AGV position and status reports" } },
  ],
  metrics: [
    { label: { zh: "指令响应延迟",    en: "Command Response Latency" },  value: "< 50ms",     benchmark: { zh: "从 WMS 任务下发到 AGV/传送带动作触发的端到端延迟", en: "End-to-end latency from WMS task dispatch to AGV/conveyor action trigger" } },
    { label: { zh: "AGV 调度效率",    en: "AGV Scheduling Efficiency" }, value: "> 85%",      benchmark: { zh: "AGV 有效搬运时间占比（排除等待/充电/故障），行业优秀水平", en: "AGV productive transport time ratio (excluding waiting/charging/fault); industry best practice" } },
    { label: { zh: "分拣正确率",      en: "Sort Accuracy" },             value: "99.99%",     benchmark: { zh: "高速交叉带分拣机格口准确率，<0.01% 错格触发人工复核", en: "High-speed cross-belt sorter chute accuracy; <0.01% misroute triggers manual recheck" } },
    { label: { zh: "设备 OEE",        en: "Equipment OEE" },             value: "> 90%",      benchmark: { zh: "传送线综合设备效率（可用率×性能率×质量率），消费电子 GDC 基准", en: "Overall Equipment Effectiveness of conveyor lines (availability × performance × quality); consumer electronics GDC benchmark" } },
  ],
  pitfalls: [
    {
      title: { zh: "WMS 与 WCS 任务状态不同步", en: "WMS-WCS Task State Desync" },
      desc: { zh: "WCS 完成物理搬运但 TCP 回报丢包，导致 WMS 认为任务仍在进行中，重复下发任务造成 AGV 路径冲突。必须在 WCS 侧实现幂等任务接收与带重试的 ACK 机制，同时 WMS 设置超时自动查询 WCS 状态接口。", en: "WCS completes physical transport but TCP acknowledgment is lost; WMS believes the task is still in progress and re-dispatches, causing AGV path conflicts. Implement idempotent task reception and ACK-with-retry on the WCS side; WMS must also have timeout-triggered automatic status query to WCS." },
      severity: "high",
    },
    {
      title: { zh: "PLC 程序升级导致生产停线", en: "PLC Program Upgrade Causing Line Stoppage" },
      desc: { zh: "PLC 梯形图更新需要停机下载程序，在高峰期操作会导致整条输送线停止。需建立严格的变更窗口（凌晨低峰），并在测试 PLC 上充分验证后再推到生产设备。部分 Siemens S7-1500 支持在线程序热替换（Online Change），应优先利用。", en: "PLC ladder program updates require stopping the controller to download the program; performing this during peak hours halts the entire conveyor line. Establish strict change windows (early morning low-peak) and fully validate on a test PLC before pushing to production. Some Siemens S7-1500 units support online hot-swap (Online Change) — prioritize using this feature." },
      severity: "medium",
    },
  ],
  moduleFlowNodes: [
    { id: "wms_task",   label: { zh: "WMS 任务",    en: "WMS Task" },      x: 20,  y: 80,  color: "#3b82f6" },
    { id: "mfc",        label: { zh: "MFC 编排",    en: "MFC Orch." },     x: 200, y: 80,  color: "#f59e0b" },
    { id: "agv",        label: { zh: "AGV 调度",    en: "AGV Dispatch" },  x: 120, y: 0,   color: "#f59e0b" },
    { id: "conveyor",   label: { zh: "传送带控制",  en: "Conveyor Ctrl" }, x: 120, y: 160, color: "#f59e0b" },
    { id: "plc",        label: { zh: "PLC 硬件",    en: "PLC Hardware" },  x: 320, y: 80,  color: "#ef4444" },
    { id: "scada",      label: { zh: "SCADA 监控",  en: "SCADA Monitor" }, x: 440, y: 80,  color: "#8b5cf6" },
  ],
  moduleFlowEdges: [
    { from: "wms_task", to: "mfc",      label: { zh: "任务下发",  en: "Task Dispatch" } },
    { from: "mfc",      to: "agv",      label: { zh: "AGV 调度",  en: "AGV Route" } },
    { from: "mfc",      to: "conveyor", label: { zh: "分流指令",  en: "Divert Cmd" } },
    { from: "agv",      to: "plc",      label: { zh: "I/O 信号",  en: "I/O Signal" } },
    { from: "conveyor", to: "plc",      label: { zh: "I/O 信号",  en: "I/O Signal" } },
    { from: "plc",      to: "scada",    label: { zh: "遥测上报",  en: "Telemetry" }, dashed: true },
    { from: "plc",      to: "mfc",      label: { zh: "状态回报",  en: "Status ACK" }, dashed: true },
  ],
}

export const SYSTEMS_MAP: Record<string, SystemDetail> = { erp, oms, wms, tms, srm, wcs };
export const SYSTEMS_LIST: SystemDetail[] = Object.values(SYSTEMS_MAP);
