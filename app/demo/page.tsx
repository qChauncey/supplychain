import DemoController from "@/components/demo/DemoController";

export const metadata = {
  title: "订单全链路演示 | Order Flow Demo",
  description: "Interactive simulation of a DTC e-commerce order flowing through OMS, ERP, WMS, WCS, and TMS systems in real time.",
};

export default function DemoPage() {
  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        {/* Header */}
        <div className="mb-10 animate-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold px-2.5 py-1 rounded font-mono"
              style={{ background: "rgba(6,182,212,0.10)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.3)" }}>
              DEMO
            </span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,rgba(6,182,212,0.4),transparent)" }} />
          </div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            订单全链路实时演示
          </h1>
          <p className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>
            Order End-to-End Flow Simulation
          </p>
          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            模拟一笔真实订单从消费者下单到签收的完整旅程。业务流（实物流转）与系统流（各系统交互）实时同步映射，每个步骤对应真实的接口报文与系统逻辑。
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            Simulates a real order from consumer checkout to doorstep delivery. Business flow and system interactions stay synchronized at every step.
          </p>
        </div>

        <DemoController />
      </div>
    </div>
  );
}
