"use client";
import { BUSINESS_NODES, type DemoStep } from "@/lib/demoData";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  step: DemoStep;
}

const NODE_W = 80;
const NODE_H = 72;
const GAP    = 44;
const TOTAL_W = BUSINESS_NODES.length * NODE_W + (BUSINESS_NODES.length - 1) * GAP;
const CY     = 80;

function nodeX(i: number) {
  return i * (NODE_W + GAP) + NODE_W / 2;
}

export default function BusinessFlowPanel({ step }: Props) {
  const { lang } = useLanguage();

  const activeIndex  = BUSINESS_NODES.findIndex((n) => n.id === step.businessNode);
  const dotX         = step.orderDotPosition * (NODE_W + GAP) + NODE_W / 2;
  const dotFrac      = step.orderDotPosition - Math.floor(step.orderDotPosition);
  const isMoving     = dotFrac > 0.05 && dotFrac < 0.95;

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: step.color }} />
        <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
          {lang === "zh" ? "业务流 · 实物流转" : "Business Flow · Physical Movement"}
        </span>
        <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded"
          style={{ background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30` }}>
          {lang === "zh" ? step.title.zh.slice(0, 12) : step.title.en.slice(0, 20)}
        </span>
      </div>

      {/* SVG flow */}
      <div className="overflow-x-auto p-4">
        <svg width={TOTAL_W + 8} height={NODE_H + 48} style={{ display: "block", minWidth: TOTAL_W }}>
          {/* Connector line */}
          <line x1={nodeX(0)} y1={CY} x2={nodeX(BUSINESS_NODES.length - 1)} y2={CY}
            stroke="var(--border)" strokeWidth="1.5" strokeDasharray="5,3" />

          {/* Progress fill */}
          <line
            x1={nodeX(0)} y1={CY}
            x2={Math.min(dotX, nodeX(BUSINESS_NODES.length - 1))} y2={CY}
            stroke={step.color} strokeWidth="2" opacity="0.5"
            style={{ transition: "all 0.6s ease" }}
          />

          {/* Nodes */}
          {BUSINESS_NODES.map((node, i) => {
            const x     = nodeX(i);
            const isAct = i === activeIndex;
            const isPast = i < Math.floor(step.orderDotPosition) ||
              (i === Math.floor(step.orderDotPosition) && dotFrac > 0.5);

            return (
              <g key={node.id} style={{ transition: "all 0.5s ease" }}>
                {/* Glow ring for active */}
                {isAct && (
                  <circle cx={x} cy={CY} r={28}
                    fill={`${step.color}10`} stroke={step.color} strokeWidth="1.5"
                    opacity="0.6">
                    <animate attributeName="r" values="26;30;26" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* Node circle */}
                <circle cx={x} cy={CY} r={22}
                  fill={isAct ? `${step.color}20` : isPast ? `${node.color}12` : "var(--bg-secondary)"}
                  stroke={isAct ? step.color : isPast ? `${node.color}60` : "var(--border)"}
                  strokeWidth={isAct ? "2" : "1.5"}
                  style={{ transition: "all 0.5s ease" }}
                />

                {/* Icon */}
                <text x={x} y={CY + 1} textAnchor="middle" dominantBaseline="middle" fontSize={16}>
                  {node.icon}
                </text>

                {/* Checkmark for completed nodes */}
                {isPast && !isAct && (
                  <text x={x + 14} y={CY - 14} textAnchor="middle" fontSize={10}>✓</text>
                )}

                {/* Label */}
                <text x={x} y={CY + 34} textAnchor="middle" fontSize={9} fontWeight={isAct ? "700" : "400"}
                  fontFamily="var(--font-geist-sans,sans-serif)"
                  fill={isAct ? step.color : "var(--text-muted)"}>
                  {node.label[lang]}
                </text>
              </g>
            );
          })}

          {/* Order dot (package icon) — sub-A */}
          <g style={{ transition: "all 0.8s cubic-bezier(0.4,0,0.2,1)" }}>
            <circle cx={dotX} cy={CY} r={8}
              fill={step.color} opacity="0.95">
              {isMoving && (
                <animate attributeName="cy" values={`${CY};${CY - 6};${CY}`} dur="0.6s" repeatCount="indefinite" />
              )}
            </circle>
            <text x={dotX} y={CY + 1} textAnchor="middle" dominantBaseline="middle" fontSize={9}>
              📦
            </text>
          </g>

          {/* Sub-order split indicators */}
          {step.showSplit && (
            <g>
              <circle cx={dotX - 14} cy={CY - 18} r={6} fill="#6366f1" opacity="0.9" />
              <text x={dotX - 14} y={CY - 18} textAnchor="middle" dominantBaseline="middle" fontSize={7} fill="white">A</text>

              <circle cx={dotX + 14} cy={CY - 18} r={6} fill="#ef4444" opacity="0.9" />
              <text x={dotX + 14} y={CY - 18} textAnchor="middle" dominantBaseline="middle" fontSize={7} fill="white">B</text>
            </g>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-4 py-2 border-t text-[10px]" style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-500 text-center text-[7px] text-white leading-3">A</span>
          {lang === "zh" ? "子单A · 手机" : "Sub-A · Phone"}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500 text-center text-[7px] text-white leading-3">B</span>
          {lang === "zh" ? "子单B · 定制壳（生产中）" : "Sub-B · Custom Case (in production)"}
        </span>
        <span className="ml-auto">
          {lang === "zh" ? "华东仓 → 上海徐汇 45km" : "East China RDC → Shanghai Xujiahui 45km"}
        </span>
      </div>
    </div>
  );
}
