export type StepPhase =
  | "placement"
  | "atp"
  | "split"
  | "sourcing"
  | "erp_delivery"
  | "wms_wave"
  | "picking"
  | "packing"
  | "confirmation"
  | "shipping"
  | "transit"
  | "complete";

export type LogType = "request" | "response" | "internal" | "event" | "warning" | "finance";

export interface DemoStep {
  id: number;
  phase: StepPhase;
  color: string;

  title: { zh: string; en: string };
  desc:  { zh: string; en: string };

  // Business flow — which node is "active" + sub-order dots
  businessNode: string;          // main active node id
  orderDotPosition: number;      // 0–5 index across business nodes
  showSplit?: boolean;           // show A/B sub-order visual

  // System flow — which nodes pulse + which edge animates
  activeSystemNodes: string[];
  activeEdge?: string;           // edge id

  // Event log
  logType: LogType;
  log: { zh: string; en: string };
  payload?: string;              // code snippet shown in log

  durationMs: number;
}

export const ORDER_INFO = {
  orderId:  "ORD-20240101-88888",
  consumer: { name: "张三 / Zhang San", city: "上海 Shanghai", district: "徐汇区 Xujiahui" },
  items: [
    { sku: "IPHONE15PRO-256-BLK", name: { zh: "iPhone 15 Pro 256GB 黑色钛金", en: "iPhone 15 Pro 256GB Black Titanium" }, qty: 1, inStock: true },
    { sku: "CASE-CUSTOM-ENGRAVE", name: { zh: "定制刻字手机壳", en: "Custom Engraved Phone Case" },         qty: 1, inStock: false },
  ],
  rdc: { zh: "华东仓（上海浦东）", en: "East China RDC (Shanghai Pudong)" },
  distance: "45 km",
};

export const DEMO_STEPS: DemoStep[] = [
  // ── Phase 1: Order Placement ────────────────────────────────────────────
  {
    id: 1, phase: "placement", color: "#6366f1",
    title: { zh: "消费者在官网下单", en: "Consumer places order on website" },
    desc:  { zh: "用户将 iPhone 15 Pro（有货）和定制刻字手机壳（待定制）加入购物车并支付。", en: "User adds iPhone 15 Pro (in stock) and a custom-engraved case (made-to-order) to cart and checks out." },
    businessNode: "consumer", orderDotPosition: 0,
    activeSystemNodes: [],
    logType: "event",
    log: { zh: "官网接收到订单，生成待确认状态", en: "Website receives order — status: PENDING_CONFIRM" },
    payload: `POST /api/orders
{
  "orderId": "ORD-20240101-88888",
  "consumer": { "city": "上海", "district": "徐汇区" },
  "items": [
    { "sku": "IPHONE15PRO-256-BLK", "qty": 1 },
    { "sku": "CASE-CUSTOM-ENGRAVE", "qty": 1 }
  ]
}`,
    durationMs: 2800,
  },
  {
    id: 2, phase: "placement", color: "#6366f1",
    title: { zh: "OMS 接收并锁定订单", en: "OMS receives and locks order" },
    desc:  { zh: "OMS 全渠道订单中台接收订单，创建内部订单记录，状态变为 PROCESSING。", en: "OMS omnichannel hub ingests the order, creates an internal order record, status → PROCESSING." },
    businessNode: "consumer", orderDotPosition: 0,
    activeSystemNodes: ["oms"],
    logType: "internal",
    log: { zh: "OMS 创建主订单 #ORD-20240101-88888，状态: PROCESSING", en: "OMS created master order #ORD-20240101-88888, status: PROCESSING" },
    durationMs: 2000,
  },

  // ── Phase 2: ATP Check ──────────────────────────────────────────────────
  {
    id: 3, phase: "atp", color: "#3b82f6",
    title: { zh: "ATP 校验：查询手机库存", en: "ATP Check: query phone inventory" },
    desc:  { zh: "OMS 向 ERP 全局库存池发起可用量承诺查询，计算可用库存 = 物理库存 − 冻结库存 − 他渠道预占。", en: "OMS queries ERP for Available-to-Promise. Logic: available = physical stock − quality hold − other-channel reservations." },
    businessNode: "consumer", orderDotPosition: 0,
    activeSystemNodes: ["oms", "erp"], activeEdge: "oms-erp",
    logType: "request",
    log: { zh: "OMS → ERP: 查询 ATP [IPHONE15PRO-256-BLK]", en: "OMS → ERP: ATP query [IPHONE15PRO-256-BLK]" },
    payload: `GET /odata/v4/InventoryService/ATP
  ?sku=IPHONE15PRO-256-BLK
  &scope=ALL_RDC
  &requestQty=1`,
    durationMs: 2200,
  },
  {
    id: 4, phase: "atp", color: "#22c55e",
    title: { zh: "ATP 结果：手机有货 ✓", en: "ATP Result: phone in stock ✓" },
    desc:  { zh: "ERP 返回：华东仓可用量 = 3 件。OMS 预占该库存，完成承诺。", en: "ERP returns: East China RDC available = 3 units. OMS reserves the stock, promise confirmed." },
    businessNode: "consumer", orderDotPosition: 0,
    activeSystemNodes: ["erp", "oms"], activeEdge: "oms-erp",
    logType: "response",
    log: { zh: "ERP → OMS: ATP 可用量 = 3，预占成功", en: "ERP → OMS: ATP available = 3, reservation confirmed" },
    payload: `HTTP 200 OK
{
  "sku": "IPHONE15PRO-256-BLK",
  "availableQty": 3,
  "reservedQty": 1,
  "warehouse": "CN-HUA-DONG-RDC",
  "atp": true
}`,
    durationMs: 2200,
  },
  {
    id: 5, phase: "atp", color: "#f59e0b",
    title: { zh: "ATP 校验：查询定制壳库存", en: "ATP Check: query custom case inventory" },
    desc:  { zh: "OMS 对第二件商品（定制刻字手机壳）发起 ATP 查询。", en: "OMS queries ATP for the second item (custom-engraved case)." },
    businessNode: "consumer", orderDotPosition: 0,
    activeSystemNodes: ["oms", "erp"], activeEdge: "oms-erp",
    logType: "request",
    log: { zh: "OMS → ERP: 查询 ATP [CASE-CUSTOM-ENGRAVE]", en: "OMS → ERP: ATP query [CASE-CUSTOM-ENGRAVE]" },
    payload: `GET /odata/v4/InventoryService/ATP
  ?sku=CASE-CUSTOM-ENGRAVE
  &scope=ALL_RDC
  &requestQty=1`,
    durationMs: 2000,
  },
  {
    id: 6, phase: "atp", color: "#ef4444",
    title: { zh: "ATP 结果：定制壳缺货 ✗", en: "ATP Result: custom case out of stock ✗" },
    desc:  { zh: "ERP 返回：可用量 = 0，该 SKU 为定制生产件，需转入生产订单流程。", en: "ERP returns: available = 0. This SKU is make-to-order — routed to production order flow." },
    businessNode: "consumer", orderDotPosition: 0,
    activeSystemNodes: ["erp", "oms"], activeEdge: "oms-erp",
    logType: "warning",
    log: { zh: "ERP → OMS: ATP 可用量 = 0，转 BACKORDER", en: "ERP → OMS: ATP available = 0, routing to BACKORDER" },
    payload: `HTTP 200 OK
{
  "sku": "CASE-CUSTOM-ENGRAVE",
  "availableQty": 0,
  "atp": false,
  "suggestedAction": "MAKE_TO_ORDER",
  "estimatedLeadTime": "3 days"
}`,
    durationMs: 2200,
  },

  // ── Phase 3: Order Split ────────────────────────────────────────────────
  {
    id: 7, phase: "split", color: "#a855f7",
    title: { zh: "OMS 执行拆单", en: "OMS executes order split" },
    desc:  { zh: "主订单被拆分为：子单 A（手机，立即发货）和子单 B（定制壳，转生产）。两条履约轨道独立并行。", en: "Master order split into: Sub-order A (phone, ship immediately) and Sub-order B (custom case, routed to production). Two fulfillment tracks run in parallel." },
    businessNode: "consumer", orderDotPosition: 0, showSplit: true,
    activeSystemNodes: ["oms"],
    logType: "internal",
    log: { zh: "拆单完成: 子单A=手机(RDC发货) | 子单B=定制壳(生产)", en: "Split done: Sub-A=phone(RDC ship) | Sub-B=case(production)" },
    payload: `// OMS Split Logic
masterOrder.split([
  { id: "SUB-A", sku: "IPHONE15PRO", source: "RDC",        track: "STANDARD" },
  { id: "SUB-B", sku: "CASE-CUSTOM", source: "MTO_FACTORY", track: "MAKE_TO_ORDER" },
])`,
    durationMs: 2500,
  },

  // ── Phase 4: Sourcing ───────────────────────────────────────────────────
  {
    id: 8, phase: "sourcing", color: "#06b6d4",
    title: { zh: "寻源引擎运算（子单 A）", en: "Sourcing Engine runs (Sub-order A)" },
    desc:  { zh: "OMS 寻源引擎按优先级查找：① 100km 内有库存的 RDC → ② 同城门店（成本比较）。", en: "OMS sourcing engine evaluates: ① RDC within 100km with stock → ② same-city store (cost comparison)." },
    businessNode: "rdc", orderDotPosition: 3,
    activeSystemNodes: ["oms"],
    logType: "internal",
    log: { zh: "寻源: 华东仓 距离 45km，有货 ✓  门店发货成本高 ¥2，选 RDC", en: "Sourcing: East China RDC 45km away, in stock ✓  Store costs ¥2 more → select RDC" },
    payload: `sourcingEngine(subOrderA, address) {
  nearbyRDC = findRDC("上海", radius=100km) // → 华东仓 45km
  if (nearbyRDC.stock >= 1) return nearbyRDC  // ✓

  // store fallback (cost check skipped — RDC wins)
}
→ Selected: CN-HUA-DONG-RDC`,
    durationMs: 2800,
  },
  {
    id: 9, phase: "sourcing", color: "#06b6d4",
    title: { zh: "OMS 生成出库指令单", en: "OMS generates Delivery Order (DO)" },
    desc:  { zh: "寻源完成，OMS 向 ERP 发起创建交货单请求（Outbound Delivery），订单进入出库环节。", en: "Sourcing complete. OMS triggers ERP to create an Outbound Delivery. Order enters the outbound flow." },
    businessNode: "rdc", orderDotPosition: 3,
    activeSystemNodes: ["oms", "erp"], activeEdge: "oms-erp",
    logType: "request",
    log: { zh: "OMS → ERP: 创建交货单 DO-88888-A", en: "OMS → ERP: Create Outbound Delivery DO-88888-A" },
    durationMs: 2000,
  },

  // ── Phase 5: ERP → WMS ──────────────────────────────────────────────────
  {
    id: 10, phase: "erp_delivery", color: "#8b5cf6",
    title: { zh: "ERP 下发 IDoc 至 WMS", en: "ERP sends IDoc to WMS" },
    desc:  { zh: "SAP ERP 生成标准 IDoc 报文 SHP_OBDLV_SAVE_REPLICA，通过 EDI 通道推送至 Manhattan WMS。包含：物料编码、数量、FEFO 批次要求。", en: "SAP ERP generates standard IDoc SHP_OBDLV_SAVE_REPLICA and sends it via EDI to Manhattan WMS. Contains: material code, quantity, FEFO batch requirement." },
    businessNode: "rdc", orderDotPosition: 3,
    activeSystemNodes: ["erp", "wms"], activeEdge: "erp-wms",
    logType: "request",
    log: { zh: "ERP → WMS: IDoc SHP_OBDLV_SAVE_REPLICA 发送成功", en: "ERP → WMS: IDoc SHP_OBDLV_SAVE_REPLICA sent successfully" },
    payload: `<IDOC MESTYP="SHP_OBDLV_SAVE_REPLICA">
  <E1EDL20>
    <VBELN>0080012345</VBELN>
    <MATNR>IPHONE15PRO-256-BLK</MATNR>
    <LFIMG>1.000</LFIMG>  <!-- qty -->
    <CHARG>FEFO_BATCH_01</CHARG>
  </E1EDL20>
</IDOC>`,
    durationMs: 2500,
  },

  // ── Phase 6: WMS Wave ───────────────────────────────────────────────────
  {
    id: 11, phase: "wms_wave", color: "#8b5cf6",
    title: { zh: "WMS 创建波次任务", en: "WMS creates wave" },
    desc:  { zh: "WMS 接收 IDoc，将本次订单并入波次 #8823（共 3 个单据），生成拣货任务路径，分配给 AGV 设备。", en: "WMS receives IDoc, merges this order into wave #8823 (3 orders total), generates pick paths, and dispatches to AGV." },
    businessNode: "rdc", orderDotPosition: 3,
    activeSystemNodes: ["wms"],
    logType: "internal",
    log: { zh: "Wave #8823 创建，含 3 单，拣货路径优化完成", en: "Wave #8823 created, 3 orders, pick path optimized" },
    durationMs: 2200,
  },

  // ── Phase 7: Picking ────────────────────────────────────────────────────
  {
    id: 12, phase: "picking", color: "#f59e0b",
    title: { zh: "WMS → WCS：下发拣货指令", en: "WMS → WCS: dispatch pick task" },
    desc:  { zh: "WMS 通过 MQTT 协议向仓库控制系统（WCS）发送拣货指令，AGV-007 接收任务，导航至货架 B-23-4。", en: "WMS sends pick task to WCS via MQTT. AGV-007 receives the task and navigates to shelf B-23-4." },
    businessNode: "rdc", orderDotPosition: 3,
    activeSystemNodes: ["wms", "wcs"], activeEdge: "wms-wcs",
    logType: "request",
    log: { zh: "WMS → WCS: 拣货任务 → AGV-007，货架 B-23-4", en: "WMS → WCS: pick task → AGV-007, shelf B-23-4" },
    payload: `MQTT topic: wcs/task/pick
{
  "taskId": "PICK-88888-001",
  "agvId": "AGV-007",
  "location": "B-23-4",
  "sku": "IPHONE15PRO-256-BLK",
  "qty": 1,
  "batchId": "FEFO_BATCH_01"
}`,
    durationMs: 2500,
  },
  {
    id: 13, phase: "picking", color: "#f59e0b",
    title: { zh: "AGV 拣货完成，回传确认", en: "AGV pick complete, confirmation returned" },
    desc:  { zh: "AGV-007 完成拣货，扫描商品条码确认，通过 MQTT 回传实际拣货数量至 WMS。", en: "AGV-007 completes pick, scans barcode for confirmation, and reports actual quantity back to WMS via MQTT." },
    businessNode: "rdc", orderDotPosition: 3,
    activeSystemNodes: ["wcs", "wms"], activeEdge: "wms-wcs",
    logType: "response",
    log: { zh: "WCS → WMS: 拣货确认 qty=1，SN: IMEI-357841093456789", en: "WCS → WMS: pick confirmed qty=1, SN: IMEI-357841093456789" },
    durationMs: 2200,
  },

  // ── Phase 8: Packing ────────────────────────────────────────────────────
  {
    id: 14, phase: "packing", color: "#ec4899",
    title: { zh: "WMS 包装 & 打印面单", en: "WMS packs & prints shipping label" },
    desc:  { zh: "工人完成包装，WMS 触发 TMS 生成顺丰快递面单，包裹绑定 IMEI 序列号与运单号。", en: "Worker completes packaging. WMS triggers TMS to generate SF Express shipping label. Package is bound to IMEI serial and tracking number." },
    businessNode: "rdc", orderDotPosition: 3,
    activeSystemNodes: ["wms", "tms"], activeEdge: "tms-wms",
    logType: "internal",
    log: { zh: "包装完成，面单生成: SF-77420240101001", en: "Packed. Label generated: SF-77420240101001" },
    durationMs: 2200,
  },

  // ── Phase 9: WHSCON Confirmation ────────────────────────────────────────
  {
    id: 15, phase: "confirmation", color: "#3b82f6",
    title: { zh: "WMS 回传发货过账（WHSCON）", en: "WMS sends WHSCON confirmation to ERP" },
    desc:  { zh: "包裹出库扫描后，WMS 向 SAP ERP 发送 IDoc 报文 WHSCON，告知实际发货数量和箱体积。", en: "After out-door scan, WMS sends IDoc WHSCON to SAP ERP with actual shipped quantity and carton volume." },
    businessNode: "rdc", orderDotPosition: 3,
    activeSystemNodes: ["wms", "erp"], activeEdge: "erp-wms",
    logType: "response",
    log: { zh: "WMS → ERP: IDoc WHSCON，qty=1，箱: 16×8×8cm", en: "WMS → ERP: IDoc WHSCON, qty=1, carton: 16×8×8cm" },
    payload: `<IDOC MESTYP="WHSCON">
  <E1EDL20>
    <VBELN>0080012345</VBELN>
    <WADAT>20240101</WADAT>
    <LFIMG>1.000</LFIMG>
    <IMEI>357841093456789</IMEI>
    <VOL>1.024</VOL> <!-- dm³ -->
  </E1EDL20>
</IDOC>`,
    durationMs: 2800,
  },
  {
    id: 16, phase: "confirmation", color: "#22c55e",
    title: { zh: "ERP 自动触发财务过账", en: "ERP auto-posts financial document" },
    desc:  { zh: "SAP ERP 收到 WHSCON 的瞬间，后台自动生成财务凭证，结转销货成本（COGS），完成从库存到费用的科目转换。", en: "The instant SAP ERP receives WHSCON, it auto-generates a FI document, posts Cost of Goods Sold (COGS), completing the inventory-to-expense account transfer." },
    businessNode: "rdc", orderDotPosition: 3,
    activeSystemNodes: ["erp"],
    logType: "finance",
    log: { zh: "ERP 财务过账: DR 销货成本 ¥7,299 / CR 库存 ¥7,299", en: "ERP FI posting: DR COGS ¥7,299 / CR Inventory ¥7,299" },
    payload: `// Auto-generated FI Document
DR  500000 COGS            ¥7,299.00
  CR  130100 Finished Goods  ¥7,299.00

Reference: Delivery 0080012345
Posting date: 2024-01-01`,
    durationMs: 2500,
  },

  // ── Phase 10: Shipping & Transit ────────────────────────────────────────
  {
    id: 17, phase: "shipping", color: "#06b6d4",
    title: { zh: "顺丰揽件，包裹发出", en: "SF Express collects package, departs RDC" },
    desc:  { zh: "顺丰快递员完成揽件，TMS 更新运单状态为「已发出」，物理包裹离开华东仓，进入运输网络。", en: "SF Express courier collects the package. TMS updates shipment status to SHIPPED. Physical package leaves the East China RDC and enters the carrier network." },
    businessNode: "rdc", orderDotPosition: 3.5,
    activeSystemNodes: ["tms"],
    logType: "event",
    log: { zh: "包裹已发出: SF-77420240101001 | 预计 2h 送达", en: "Package shipped: SF-77420240101001 | ETA: 2 hours" },
    durationMs: 2500,
  },
  {
    id: 18, phase: "transit", color: "#a855f7",
    title: { zh: "包裹配送途中", en: "Package in transit" },
    desc:  { zh: "同城快递，45km 配送。TMS 实时追踪位置，OMS 同步推送物流状态给消费者。", en: "Same-city delivery, 45km route. TMS tracks location in real time. OMS pushes logistics updates to the consumer." },
    businessNode: "store", orderDotPosition: 4,
    activeSystemNodes: ["tms", "oms"],
    logType: "event",
    log: { zh: "运单追踪: 已到达徐汇区中转站，距收货地 3km", en: "Tracking update: arrived at Xujiahui transit hub, 3km from destination" },
    durationMs: 2500,
  },

  // ── Phase 11: Delivery Complete ─────────────────────────────────────────
  {
    id: 19, phase: "complete", color: "#22c55e",
    title: { zh: "消费者签收，订单完成 🎉", en: "Consumer signs, order complete 🎉" },
    desc:  { zh: "消费者签收包裹，快递员上传签收照片，TMS 回传签收状态，OMS 关闭子单 A，整单状态更新为 PARTIALLY_COMPLETE（子单 B 生产中）。", en: "Consumer signs for the package. Courier uploads proof of delivery. TMS reports back. OMS closes Sub-order A; master order status → PARTIALLY_COMPLETE (Sub-B in production)." },
    businessNode: "consumer", orderDotPosition: 5,
    activeSystemNodes: ["oms", "erp"], activeEdge: "oms-erp",
    logType: "event",
    log: { zh: "子单A已完成签收 ✓ | 子单B 定制壳预计 3 天后发货", en: "Sub-A delivered & signed ✓ | Sub-B custom case ships in ~3 days" },
    durationMs: 3000,
  },
];

export const BUSINESS_NODES = [
  { id: "suppliers", label: { zh: "供应商", en: "Suppliers" }, icon: "🏭", color: "#3b82f6" },
  { id: "oem",       label: { zh: "OEM 代工厂", en: "OEM Factory" }, icon: "⚙️", color: "#6366f1" },
  { id: "gdc",       label: { zh: "全球集散中心", en: "Global DC" }, icon: "🌐", color: "#8b5cf6" },
  { id: "rdc",       label: { zh: "区域配送中心", en: "Regional DC" }, icon: "🏪", color: "#a855f7" },
  { id: "store",     label: { zh: "直营门店", en: "Retail Store" }, icon: "🏬", color: "#ec4899" },
  { id: "consumer",  label: { zh: "消费者", en: "Consumer" }, icon: "👤", color: "#f43f5e" },
];

export const SYSTEM_NODES_DEMO = [
  { id: "erp",  label: "ERP",  sublabel: "SAP S/4HANA",    color: "#3b82f6", x: 280, y: 40  },
  { id: "oms",  label: "OMS",  sublabel: "Order Mgmt",     color: "#6366f1", x: 40,  y: 160 },
  { id: "wms",  label: "WMS",  sublabel: "Manhattan",      color: "#8b5cf6", x: 280, y: 200 },
  { id: "tms",  label: "TMS",  sublabel: "Oracle OTM",     color: "#a855f7", x: 520, y: 160 },
  { id: "srm",  label: "SRM",  sublabel: "Supplier Mgmt",  color: "#06b6d4", x: 40,  y: 40  },
  { id: "wcs",  label: "WCS",  sublabel: "Automation",     color: "#f59e0b", x: 280, y: 360 },
];

export const SYSTEM_EDGES_DEMO = [
  { id: "oms-erp",  from: "oms",  to: "erp",  label: "OData/REST",  color: "#6366f1" },
  { id: "erp-wms",  from: "erp",  to: "wms",  label: "EDI/IDoc",    color: "#8b5cf6" },
  { id: "wms-wcs",  from: "wms",  to: "wcs",  label: "MQTT/TCP",    color: "#f59e0b" },
  { id: "tms-wms",  from: "tms",  to: "wms",  label: "REST API",    color: "#a855f7" },
  { id: "srm-erp",  from: "srm",  to: "erp",  label: "EDI/Portal",  color: "#06b6d4" },
];
