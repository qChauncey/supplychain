import { l3ScenarioA, l3ScenarioB } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import CodeBlock from "@/components/CodeBlock";
import SequenceDiagram from "@/components/SequenceDiagram";

export default function L3Page() {
  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <PageHeader
          level="L3"
          title="微观系统交互透视"
          en="Micro-level System Interaction"
          desc="真实的逻辑与报文格式参考。将本层作为双击系统节点后展开的底层时序面板数据源。"
          color="#06b6d4"
        />

        {/* Scenario A */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.3)", color: "#06b6d4" }}>
              A
            </div>
            <div>
              <h2 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>{l3ScenarioA.title}</h2>
              <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{l3ScenarioA.subtitle}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-8 max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            {l3ScenarioA.description}
          </p>

          <div className="space-y-6">
            {l3ScenarioA.steps.map((step) => (
              <div key={step.step} className="rounded-xl overflow-hidden"
                style={{ border: "1px solid var(--border)" }}>
                {/* Step header */}
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
                {/* Code */}
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
              <h2 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>{l3ScenarioB.title}</h2>
              <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{l3ScenarioB.subtitle}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-8 max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            {l3ScenarioB.description}
          </p>

          {/* Sequence diagram */}
          <SequenceDiagram steps={l3ScenarioB.sequence} />

          {/* Pitfall */}
          <div className="mt-6 p-5 rounded-xl flex gap-4"
            style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
            <span className="text-xl shrink-0">⚠️</span>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "#f59e0b" }}>{l3ScenarioB.pitfall.title}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{l3ScenarioB.pitfall.body}</p>
            </div>
          </div>

          {/* IDoc sample */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-secondary)" }}>
              IDoc 报文示例 · WHSCON Warehouse Confirmation
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
              <CodeBlock code={l3ScenarioB.idocSample} lang="xml" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
