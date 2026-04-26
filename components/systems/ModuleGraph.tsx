"use client";
import type { ModuleFlowNode, ModuleFlowEdge } from "@/lib/systemsData";

interface Props {
  nodes: ModuleFlowNode[];
  edges: ModuleFlowEdge[];
  color: string;
  lang: "zh" | "en";
}

const NODE_W = 110;
const NODE_H = 36;
const PAD = 32;

function nodeCenter(n: ModuleFlowNode) {
  return { x: n.x + PAD + NODE_W / 2, y: n.y + PAD + NODE_H / 2 };
}

export default function ModuleGraph({ nodes, edges, color, lang }: Props) {
  const maxX = Math.max(...nodes.map((n) => n.x)) + PAD * 2 + NODE_W;
  const maxY = Math.max(...nodes.map((n) => n.y)) + PAD * 2 + NODE_H;
  const svgW = Math.max(maxX, 480);
  const svgH = Math.max(maxY, 200);

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        width="100%"
        style={{ minWidth: svgW, height: svgH, display: "block", background: "transparent" }}
      >
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={color} opacity="0.7" />
          </marker>
          <marker id="arrow-dashed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={color} opacity="0.35" />
          </marker>
        </defs>

        {/* Edges */}
        {edges.map((e, i) => {
          const from = nodeMap[e.from];
          const to   = nodeMap[e.to];
          if (!from || !to) return null;
          const fc = nodeCenter(from);
          const tc = nodeCenter(to);
          const mx = (fc.x + tc.x) / 2;
          const my = (fc.y + tc.y) / 2;
          const dashed = e.dashed;
          const lineColor = dashed ? `${color}55` : `${color}90`;
          const d = `M${fc.x},${fc.y} L${tc.x},${tc.y}`;
          return (
            <g key={i}>
              <path
                d={d}
                stroke={lineColor}
                strokeWidth={1.5}
                strokeDasharray={dashed ? "5,4" : undefined}
                fill="none"
                markerEnd={dashed ? "url(#arrow-dashed)" : "url(#arrow)"}
              />
              {e.label && (
                <text
                  x={mx}
                  y={my - 5}
                  textAnchor="middle"
                  fontSize={9}
                  fill={color}
                  opacity={0.7}
                  style={{ fontFamily: "monospace" }}
                >
                  {e.label[lang]}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((n) => {
          const x = n.x + PAD;
          const y = n.y + PAD;
          return (
            <g key={n.id}>
              <rect
                x={x} y={y}
                width={NODE_W} height={NODE_H}
                rx={8}
                fill={`${n.color}12`}
                stroke={`${n.color}50`}
                strokeWidth={1.5}
              />
              <text
                x={x + NODE_W / 2}
                y={y + NODE_H / 2 + 4}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                fill={n.color}
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                {n.label[lang]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
