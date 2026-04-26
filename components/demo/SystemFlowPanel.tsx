"use client";
import { SYSTEM_NODES_DEMO, SYSTEM_EDGES_DEMO, type DemoStep } from "@/lib/demoData";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props { step: DemoStep }

const NODE_W = 88;
const NODE_H = 44;
const SVG_W  = 640;
const SVG_H  = 440;

function nodeCenter(nodeId: string) {
  const n = SYSTEM_NODES_DEMO.find((n) => n.id === nodeId);
  if (!n) return { x: 0, y: 0 };
  return { x: n.x + NODE_W / 2, y: n.y + NODE_H / 2 };
}

export default function SystemFlowPanel({ step }: Props) {
  const { lang } = useLanguage();

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: step.color }} />
        <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
          {lang === "zh" ? "系统架构流 · 实时系统交互" : "System Architecture Flow · Live Interactions"}
        </span>
        {step.activeEdge && (
          <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded"
            style={{ background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30` }}>
            {SYSTEM_EDGES_DEMO.find((e) => e.id === step.activeEdge)?.label}
          </span>
        )}
      </div>

      {/* SVG diagram */}
      <div className="overflow-auto p-3">
        <svg
          viewBox={`-10 -10 ${SVG_W + 20} ${SVG_H + 20}`}
          width="100%"
          style={{ maxHeight: 440, display: "block" }}
        >
          {/* Edge paths */}
          {SYSTEM_EDGES_DEMO.map((edge) => {
            const from = nodeCenter(edge.from);
            const to   = nodeCenter(edge.to);
            const isActive = edge.id === step.activeEdge;
            const color = isActive ? step.color : edge.color;

            // Curve control point
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2 - 20;
            const path = `M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}`;

            return (
              <g key={edge.id}>
                {/* Glow for active edge */}
                {isActive && (
                  <path d={path} fill="none" stroke={color} strokeWidth="6" opacity="0.15" />
                )}

                {/* Main edge line */}
                <path
                  d={path}
                  fill="none"
                  stroke={color}
                  strokeWidth={isActive ? 2 : 1}
                  strokeDasharray={isActive ? "none" : "5,4"}
                  opacity={isActive ? 1 : 0.3}
                  style={{ transition: "all 0.4s ease" }}
                  markerEnd={`url(#arrow-${edge.id})`}
                />

                {/* Animated dash for active edge */}
                {isActive && (
                  <path d={path} fill="none" stroke={color} strokeWidth="2.5"
                    strokeDasharray="8,12" opacity="0.8">
                    <animate attributeName="stroke-dashoffset" from="0" to="-20"
                      dur="0.8s" repeatCount="indefinite" />
                  </path>
                )}

                {/* Arrow marker */}
                <defs>
                  <marker id={`arrow-${edge.id}`} markerWidth="6" markerHeight="6"
                    refX="3" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill={isActive ? step.color : color} opacity={isActive ? 1 : 0.35} />
                  </marker>
                </defs>

                {/* Protocol label */}
                <text x={midX} y={midY - 6} textAnchor="middle" fontSize={8}
                  fontFamily="var(--font-geist-mono,monospace)"
                  fill={isActive ? step.color : "var(--text-muted)"}
                  fontWeight={isActive ? "700" : "400"}
                  style={{ transition: "all 0.4s ease" }}>
                  {edge.label}
                </text>
              </g>
            );
          })}

          {/* System nodes */}
          {SYSTEM_NODES_DEMO.map((node) => {
            const isActive  = step.activeSystemNodes.includes(node.id);
            const color     = isActive ? step.color : node.color;
            const bgOpacity = isActive ? "0.15" : "0.05";
            const bdrColor  = isActive ? step.color : `${node.color}40`;

            return (
              <g key={node.id} style={{ transition: "all 0.4s ease" }}>
                {/* Pulsing ring for active node */}
                {isActive && (
                  <rect
                    x={node.x - 4} y={node.y - 4}
                    width={NODE_W + 8} height={NODE_H + 8}
                    rx={10} fill="none"
                    stroke={step.color} strokeWidth="1.5" opacity="0.5">
                    <animate attributeName="opacity" values="0.5;0.15;0.5" dur="1.4s" repeatCount="indefinite" />
                    <animate attributeName="stroke-width" values="1.5;2.5;1.5" dur="1.4s" repeatCount="indefinite" />
                  </rect>
                )}

                {/* Node box */}
                <rect
                  x={node.x} y={node.y}
                  width={NODE_W} height={NODE_H}
                  rx={8}
                  fill={`rgba(${isActive ? hexToRgb(step.color) : hexToRgb(node.color)},${bgOpacity})`}
                  stroke={bdrColor}
                  strokeWidth={isActive ? "1.8" : "1"}
                  style={{ transition: "all 0.4s ease" }}
                />

                {/* System name */}
                <text x={node.x + NODE_W / 2} y={node.y + 16}
                  textAnchor="middle" fontSize={13} fontWeight="700"
                  fontFamily="var(--font-geist-mono,monospace)"
                  fill={color}
                  style={{ transition: "fill 0.4s ease" }}>
                  {node.label}
                </text>

                {/* Sublabel */}
                <text x={node.x + NODE_W / 2} y={node.y + 31}
                  textAnchor="middle" fontSize={8}
                  fontFamily="var(--font-geist-sans,sans-serif)"
                  fill={isActive ? color : "var(--text-muted)"}
                  style={{ transition: "fill 0.4s ease" }}>
                  {node.sublabel}
                </text>

                {/* Active dot indicator */}
                {isActive && (
                  <circle cx={node.x + NODE_W - 8} cy={node.y + 8} r={4} fill={step.color}>
                    <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Active systems legend */}
      <div className="flex items-center gap-3 flex-wrap px-4 py-2 border-t text-[10px]"
        style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}>
        <span>{lang === "zh" ? "当前活跃系统:" : "Active systems:"}</span>
        {step.activeSystemNodes.map((id) => {
          const n = SYSTEM_NODES_DEMO.find((n) => n.id === id);
          return (
            <span key={id} className="px-2 py-0.5 rounded font-mono font-semibold"
              style={{ background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30` }}>
              {n?.label}
            </span>
          );
        })}
        {step.activeSystemNodes.length === 0 && (
          <span style={{ color: "var(--text-muted)" }}>{lang === "zh" ? "—（前端/消费者侧）" : "— (frontend / consumer side)"}</span>
        )}
      </div>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
