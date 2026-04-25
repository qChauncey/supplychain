export type Lang = "zh" | "en";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Translations = Record<string, any>;

export const translations: Record<Lang, Translations> = {
  zh: {
    site: {
      title: "全球供应链架构手册",
      badge: "系统级架构参考 · 全渠道 DTC 供应链",
      description:
        "面向供应链系统架构师与全栈开发者的系统级可视化底层参考资料。场景蓝本：全球高端消费电子品牌（参考 Apple / Huawei）的全渠道 DTC 供应链体系。",
      scenario: "场景蓝本：全球高端消费电子品牌（参考 Apple / Huawei）全渠道直营供应链体系",
    },
    nav: {
      overview: "概览",
      l1: "L1 业务流",
      l2: "L2 系统架构",
      l3: "L3 微观交互",
      comparison: "行业对比",
      demo: "🎬 案例演示",
      dtcBadge: "DTC 全渠道架构参考",
    },
    home: {
      heroTitle1: "全球电子制造",
      heroTitle2: "DTC 供应链架构手册",
      usageNote:
        "在使用前端可视化图表库时，请将 L2 系统架构 作为画布宏观网络图的数据源，将 L3 微观交互 作为双击某个特定系统后展开的底层时序和说明面板的数据源。",
      usageLabel: "使用建议：",
      stats: [
        { label: "系统层级", value: "3 层" },
        { label: "核心业务节点", value: "6 个" },
        { label: "企业级系统", value: "5 套" },
        { label: "集成协议", value: "4 类" },
      ],
    },
    sections: [
      {
        level: "L1",
        title: "宏观业务流",
        en: "Business Flow",
        desc: "DTC 模式下的核心业务节点流转：供应商 → 代工厂 → GDC → RDC → 门店 → 消费者",
        tags: ["VMI", "逆向物流", "前置仓"],
      },
      {
        level: "L2",
        title: "系统架构流",
        en: "System Architecture",
        desc: "跨国供应链由数十个孤立重型企业级软件拼接而成：ERP / OMS / WMS / TMS / SRM",
        tags: ["SAP S/4HANA", "IDoc / EDI", "RESTful API"],
      },
      {
        level: "L3",
        title: "微观系统交互",
        en: "Micro Interactions",
        desc: "OMS 智能寻源拆单算法 + SAP ERP 与 WMS 的 IDoc 出库握手时序图",
        tags: ["ATP 校验", "SHP_OBDLV_SAVE_REPLICA", "WHSCON"],
      },
      {
        level: "参数",
        title: "行业差异化对比",
        en: "Industry Comparison",
        desc: "消费电子 vs 生鲜冷链 vs 汽车制造 JIT 的核心参数维度横向对比",
        tags: ["序列号追踪", "IoT 温湿度", "Kanban 拉动"],
      },
    ],
    l1: {
      level: "L1",
      title: "宏观业务流",
      en: "Business Flow — DTC Mode",
      desc: "在传统分销的基础上，DTC 模式极大地压缩了中间环节，要求极高的业务敏捷度。核心节点从上游供应商直达终端消费者。",
      flowTitle: "核心业务节点流 · Business Nodes Flow",
      dtcTitle: "DTC 模式核心价值",
      dtcEn: "Direct-to-Consumer Value Proposition",
      dtcPoints: [
        {
          icon: "🔗",
          title: "缩短链路",
          body: "去除传统经销商层级，品牌直接触达消费者，利润率提升 15~25%",
        },
        {
          icon: "📊",
          title: "数据直达",
          body: "自有订单数据，精准洞察用户行为，驱动产品与库存决策",
        },
        {
          icon: "⚡",
          title: "极速响应",
          body: "通过前置仓与门店履约，实现最快 2 小时达的服务承诺",
        },
      ],
      painTitle: "关键业务痛点 · Pain Points",
    },
    l2: {
      level: "L2",
      title: "系统架构流",
      en: "System Architecture & Integration",
      desc: "真实的跨国供应链是由数十个孤立的重型企业级软件拼接而成的。每个系统都有自己的技术债、集成协议和数据格式。",
      topoTitle: "系统拓扑图 · System Topology",
      nodesTitle: "核心系统图谱 · System Nodes",
      edgesTitle: "系统连线与集成协议 · Integration Edges",
      wcsDesc:
        "AGV 搬运机器人、传送带、分拣机等自动化设备的控制核心，通过 TCP/IP 或 MQTT 与 WMS 实时通信。",
      wcsRole: "自动化层",
    },
    l3: {
      level: "L3",
      title: "微观系统交互透视",
      en: "Micro-level System Interaction",
      desc: "真实的逻辑与报文格式参考。将本层作为双击系统节点后展开的底层时序面板数据源。",
      idocTitle: "IDoc 报文示例 · WHSCON Warehouse Confirmation",
      pitfallLabel: "痛点陷阱",
    },
    comparison: {
      level: "参数",
      title: "行业差异化对比参数表",
      en: "Industry Comparison Parameters",
      desc: "不同行业的供应链在缓冲策略、追踪维度、系统侧重点和致命风险上存在本质差异。本表可作为扩充行业场景的 JSON 数据结构构建基础。",
      tableTitle: "致命异常风险对比 · Fatal Risk Analysis",
      jsonTitle: "JSON 数据结构参考 · Data Structure Hint",
      riskLabel: "⚡ 致命风险",
    },
  },

  en: {
    site: {
      title: "Supply Chain Architecture Guide",
      badge: "System-Level Architecture Reference · Omnichannel DTC Supply Chain",
      description:
        "A system-level visual reference for supply chain architects and full-stack developers. Scenario: a global premium consumer electronics brand (ref. Apple / Huawei) DTC omnichannel supply chain.",
      scenario: "Scenario: Global premium consumer electronics brand (ref. Apple / Huawei) DTC direct retail supply chain",
    },
    nav: {
      overview: "Overview",
      l1: "L1 Business Flow",
      l2: "L2 System Arch",
      l3: "L3 Micro Interactions",
      comparison: "Industry Comparison",
      demo: "🎬 Live Demo",
      dtcBadge: "DTC Omnichannel Architecture",
    },
    home: {
      heroTitle1: "Global Electronics Manufacturing",
      heroTitle2: "DTC Supply Chain Architecture Guide",
      usageNote:
        "When using front-end visualization libraries, use the L2 System Architecture as the data source for the macro network graph canvas, and use L3 Micro Interactions as the data source for the sequence/detail panel that expands when clicking a specific system node.",
      usageLabel: "Usage tip:",
      stats: [
        { label: "System Layers", value: "3" },
        { label: "Core Business Nodes", value: "6" },
        { label: "Enterprise Systems", value: "5" },
        { label: "Integration Protocols", value: "4" },
      ],
    },
    sections: [
      {
        level: "L1",
        title: "Business Flow",
        en: "Macro Business Flow",
        desc: "Core node flow in DTC mode: Supplier → OEM → GDC → RDC → Store → Consumer",
        tags: ["VMI", "Reverse Logistics", "Micro-fulfillment"],
      },
      {
        level: "L2",
        title: "System Architecture",
        en: "Architecture & Integration",
        desc: "A cross-border supply chain is stitched together from dozens of isolated enterprise systems: ERP / OMS / WMS / TMS / SRM",
        tags: ["SAP S/4HANA", "IDoc / EDI", "RESTful API"],
      },
      {
        level: "L3",
        title: "Micro Interactions",
        en: "System-level Interactions",
        desc: "OMS intelligent order routing & split algorithm + SAP ERP ↔ WMS IDoc outbound handshake sequence",
        tags: ["ATP Check", "SHP_OBDLV_SAVE_REPLICA", "WHSCON"],
      },
      {
        level: "Params",
        title: "Industry Comparison",
        en: "Cross-Industry Parameters",
        desc: "Consumer Electronics vs Fresh Cold Chain vs Automotive JIT — core parameter dimensions side-by-side",
        tags: ["Serial Tracking", "IoT Temp/Humidity", "Kanban Pull"],
      },
    ],
    l1: {
      level: "L1",
      title: "Business Flow",
      en: "Business Flow — DTC Mode",
      desc: "DTC mode dramatically compresses the distribution chain compared to traditional retail, demanding high business agility. Core nodes run from upstream suppliers directly to end consumers.",
      flowTitle: "Core Business Node Flow",
      dtcTitle: "DTC Core Value Proposition",
      dtcEn: "Direct-to-Consumer Value Proposition",
      dtcPoints: [
        {
          icon: "🔗",
          title: "Shorter Chain",
          body: "Eliminate distributor tiers. Brand reaches consumers directly, improving margin by 15–25%.",
        },
        {
          icon: "📊",
          title: "First-party Data",
          body: "Own your order data. Drive precise product and inventory decisions from real user behavior.",
        },
        {
          icon: "⚡",
          title: "Ultra-fast Fulfillment",
          body: "Micro-fulfillment stores and forward warehouses enable same-day or 2-hour delivery SLAs.",
        },
      ],
      painTitle: "Key Business Pain Points",
    },
    l2: {
      level: "L2",
      title: "System Architecture",
      en: "System Architecture & Integration",
      desc: "A real cross-border supply chain is stitched together from dozens of isolated, heavyweight enterprise software systems — each with its own technical debt, integration protocol, and data format.",
      topoTitle: "System Topology",
      nodesTitle: "Core System Map",
      edgesTitle: "Integration Edges & Protocols",
      wcsDesc:
        "Control core for automated equipment — AGV robots, conveyors, sorters — communicating with WMS in real time via TCP/IP or MQTT.",
      wcsRole: "Automation Layer",
    },
    l3: {
      level: "L3",
      title: "Micro-level System Interactions",
      en: "Micro-level System Interaction",
      desc: "Real logic and message format reference. Use this layer as the data source for the sequence/detail panel that expands when clicking a specific system node.",
      idocTitle: "IDoc Message Sample · WHSCON Warehouse Confirmation",
      pitfallLabel: "Pitfall Warning",
    },
    comparison: {
      level: "Params",
      title: "Industry Comparison Parameters",
      en: "Cross-Industry Parameter Table",
      desc: "Supply chains differ fundamentally across industries in buffer strategy, tracking dimensions, system focus, and fatal risks. This table serves as the JSON data structure foundation for extending industry scenarios.",
      tableTitle: "Fatal Risk Analysis",
      jsonTitle: "JSON Data Structure Reference",
      riskLabel: "⚡ Fatal Risk",
    },
  },
};
