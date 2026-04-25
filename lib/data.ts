export const siteConfig = {
  title: "全球供应链架构手册",
  subtitle: "全球电子制造与 DTC 零售供应链：架构设计与系统交互全手册",
  description:
    "面向供应链系统架构师与全栈开发者的系统级可视化底层参考资料。场景蓝本：全球高端消费电子品牌 (参考 Apple / Huawei) 的全渠道 DTC 供应链体系。",
};

export const l1BusinessNodes = [
  {
    id: "suppliers",
    label: "Tier 1 / Tier 2 供应商",
    sublabel: "Suppliers",
    description: "提供芯片、屏幕、外壳等核心物料",
    icon: "🏭",
    color: "blue",
    x: 0,
    y: 0,
  },
  {
    id: "oem",
    label: "OEM 代工厂",
    sublabel: "Contract Manufacturer",
    description: "负责 PCBA 贴片与最终组装（如富士康）",
    icon: "⚙️",
    color: "indigo",
    x: 1,
    y: 0,
  },
  {
    id: "gdc",
    label: "全球集散中心",
    sublabel: "Global DC",
    description: "靠近产地的超级枢纽",
    icon: "🌐",
    color: "violet",
    x: 2,
    y: 0,
  },
  {
    id: "rdc",
    label: "区域配送中心",
    sublabel: "Regional DC",
    description: "靠近消费市场的仓库（华东仓、北美仓）",
    icon: "🏪",
    color: "purple",
    x: 3,
    y: 0,
  },
  {
    id: "store",
    label: "直营门店",
    sublabel: "Retail Stores",
    description: "兼具展示与「前置仓 Micro-fulfillment」属性",
    icon: "🏬",
    color: "pink",
    x: 4,
    y: 0,
  },
  {
    id: "consumer",
    label: "消费者",
    sublabel: "Consumer (DTC)",
    description: "DTC 直接触达终端用户",
    icon: "👤",
    color: "rose",
    x: 5,
    y: 0,
  },
];

export const l1PainPoints = [
  {
    id: "vmi",
    title: "VMI",
    subtitle: "Vendor Managed Inventory",
    body: "供应商管理库存。物料在代工厂仓库里，但所有权仍属供应商，直到被拉上流水线才结算。",
    tag: "库存策略",
  },
  {
    id: "reverse",
    title: "逆向物流",
    subtitle: "Reverse Logistics",
    body: "电子产品退货涉及极复杂的成色鉴定、翻新 (Refurbish) 或环保拆解，直接影响二次销售。",
    tag: "风险管理",
  },
];

export const l2SystemNodes = [
  {
    id: "erp",
    label: "ERP",
    sublabel: "SAP S/4HANA",
    description: "绝对的数据主数据中心。负责财务总账、成本核算、采购订单管理。",
    role: "主数据中心",
    color: "blue",
  },
  {
    id: "oms",
    label: "OMS",
    sublabel: "IBM Sterling / 自研",
    description: "全渠道订单收口与智能路由分发。",
    role: "订单管理中台",
    color: "indigo",
  },
  {
    id: "wms",
    label: "WMS",
    sublabel: "Manhattan Active / 极智嘉",
    description: "负责仓库内的一切物理动作（收发存）。",
    role: "仓储管理系统",
    color: "violet",
  },
  {
    id: "tms",
    label: "TMS",
    sublabel: "Oracle OTM",
    description: "负责与 FedEx, UPS, 顺丰等承运商系统对接。",
    role: "运输管理系统",
    color: "purple",
  },
  {
    id: "srm",
    label: "SRM",
    sublabel: "供应商关系管理",
    description: "采购端与供应商的协同平台。",
    role: "采购协同平台",
    color: "cyan",
  },
];

export const l2Edges = [
  {
    from: "oms",
    to: "erp",
    protocol: "OData / RESTful API",
    description: "高频实时同步订单状态与扣减逻辑库存",
    frequency: "实时",
  },
  {
    from: "erp",
    to: "wms",
    protocol: "EDI / IDoc",
    description: "非实时，以批次/单据为维度的传统且极其稳定的报文传输",
    frequency: "批量",
  },
  {
    from: "wms",
    to: "wcs",
    protocol: "TCP/IP Sockets / MQTT",
    description: "毫秒级硬件通信",
    frequency: "毫秒级",
  },
  {
    from: "srm",
    to: "erp",
    protocol: "EDI / Portal API",
    description: "采购订单与供应商协同",
    frequency: "准实时",
  },
  {
    from: "tms",
    to: "wms",
    protocol: "RESTful API",
    description: "运单生成与追踪回传",
    frequency: "准实时",
  },
];

export const l3ScenarioA = {
  title: "OMS 智能寻源与拆单算法",
  subtitle: "Order Routing Engine",
  description:
    "当消费者在官网下单购买一部手机（有货）和一个定制刻字手机壳（缺货需定制）时，OMS 的内部运算逻辑：",
  steps: [
    {
      step: 1,
      title: "ATP 校验",
      subtitle: "Available-to-Promise",
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
}`,
      lang: "javascript",
    },
    {
      step: 2,
      title: "拆单逻辑",
      subtitle: "Order Split",
      code: `// 主订单拆分
主订单 #ORD-20240101-88888
├── 子单 A: 手机 × 1
│   └── 状态: 有货可发 ✓
└── 子单 B: 定制刻字手机壳 × 1
    └── 状态: 缺货，转定制生产 ⏳

// 拆单后独立路由，独立履约`,
      lang: "bash",
    },
    {
      step: 3,
      title: "寻源算法",
      subtitle: "Sourcing Engine",
      code: `// 优先级路由逻辑
function sourcingEngine(order, address) {
  // P1: 时效优先 - 100km 内 RDC
  const nearbyRDC = findRDCWithin(address, 100km);
  if (nearbyRDC.hasStock) return nearbyRDC;

  // P2: 成本优先 - 同城门店
  const nearbyStore = findStoreWithin(address, 50km);
  const storeCost = calcShippingCost(nearbyStore);
  const rdcCost   = calcShippingCost(nearbyRDC);

  if (storeCost < rdcCost - 2) return nearbyStore; // 省 2元触发

  // 生成出库指令单 (DO)
  return generateDeliveryOrder(source, order);
}`,
      lang: "javascript",
    },
  ],
};

export const l3ScenarioB = {
  title: "SAP ERP 与 Manhattan WMS 出库握手",
  subtitle: "EDI IDoc Standard Flow",
  description:
    "当 OMS 决定从 RDC 仓库发货后，ERP 与 WMS 的系统级交互时序：",
  sequence: [
    {
      from: "OMS",
      to: "SAP ERP",
      message: "下发交货单请求",
      detail: "Outbound Delivery Trigger",
    },
    {
      from: "SAP ERP",
      to: "Manhattan WMS",
      message: "IDoc: SHP_OBDLV_SAVE_REPLICA",
      detail: "物料编码 + 数量 + FEFO 批次要求",
      isKey: true,
    },
    {
      from: "Manhattan WMS",
      to: "WCS/AGV",
      message: "波次下发 (Wave Release)",
      detail: "拣货任务分配至自动化设备",
    },
    {
      from: "WCS/AGV",
      to: "Manhattan WMS",
      message: "拣货完成确认",
      detail: "实际拣货数量回传",
    },
    {
      from: "Manhattan WMS",
      to: "SAP ERP",
      message: "IDoc: WHSCON (Warehouse Confirmation)",
      detail: "实际数量 + 包装箱体积",
      isKey: true,
    },
    {
      from: "SAP ERP",
      to: "SAP ERP",
      message: "自动生成财务凭证",
      detail: "结转销货成本 COGS ← 财务联动",
      isSelf: true,
    },
  ],
  pitfall: {
    title: "痛点陷阱",
    body: "如果 WMS 将成千上万的单据合并成一个超大「波次」派发给工人，容易导致数据库表锁 (Table Lock) 或拣货拥堵。需要拆分为合理的波次大小（通常 50-200 单/波次）。",
  },
  idocSample: `<!-- IDoc: WHSCON - 出库确认报文示例 -->
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
    <VBELN>0080012345</VBELN>  <!-- 交货单号 -->
    <LFART>LF</LFART>           <!-- 交货类型 -->
    <WADAT>20240101</WADAT>     <!-- 实际发货日期 -->
    <E1EDL24>
      <POSNR>000010</POSNR>
      <MATNR>IPHONE15PRO-256-BLK</MATNR>
      <LFIMG>1.000</LFIMG>      <!-- 实际拣货数量 -->
      <VRKME>EA</VRKME>          <!-- 单位: 件 -->
      <CHARG>2024010188</CHARG>  <!-- 批次号 -->
    </E1EDL24>
  </E1EDL20>
</IDOC>`,
};

export const comparisonData = {
  dimensions: [
    "主要缓冲点",
    "关键追踪维度",
    "系统交互重点",
    "致命异常风险",
  ],
  industries: [
    {
      name: "消费电子",
      subtitle: "本文蓝本",
      icon: "📱",
      color: "blue",
      highlight: true,
      values: [
        "成品仓库 (RDC)",
        "SN 序列号 (IMEI/MAC)",
        "OMS 高并发拆单路由",
        "热门新品秒杀导致的系统超卖超发",
      ],
    },
    {
      name: "生鲜冷链",
      subtitle: "备选扩充",
      icon: "🥦",
      color: "green",
      highlight: false,
      values: [
        "极短，几乎不设缓冲",
        "批次号 (Batch) 与效期",
        "IoT 平台实时温湿度上报",
        "运输途中制冷机组宕机导致全损",
      ],
    },
    {
      name: "汽车制造 JIT",
      subtitle: "备选扩充",
      icon: "🚗",
      color: "amber",
      highlight: false,
      values: [
        "供应商线边仓 (VMI)",
        "零件号 (Part Number)",
        "ERP MRP 运算与供应商 Kanban 拉动",
        "某个小零件缺货导致整条总装线停工",
      ],
    },
  ],
};
