"use client";
import type { IntegrationPoint } from "@/lib/systemsData";

interface Props {
  points: IntegrationPoint[];
  systemLabel: string;
  color: string;
  lang: "zh" | "en";
}

const DIR_COLORS: Record<string, string> = {
  in:            "#3b82f6",
  out:           "#22c55e",
  bidirectional: "#a855f7",
};

const CENTER_X = 220;
const CENTER_Y = 110;
const CENTER_R  = 42;

export default function IntegrationMap({ points, systemLabel, color, lang }: Props) {
  const count   = points.length;
  const radius  = Math.max(130, count * 28);
  const svgW    = CENTER_X * 2;
  const svgH    = CENTER_Y + radius + 48;

  return (
    <div className="overflow-x-auto px-2 py-4">
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        width="100%"
        style={{ minWidth: svgW, height: svgH, display: "block", background: "transparent" }}
      >
        <defs>
          {["in", "out", "bidirectional"].map((dir) => (
            <marker
              key={dir}
              id={`imap-arrow-${dir}`}
              markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"
            >
              <path d="M0,0 L0,6 L6,3 z" fill={DIR_COLORS[dir]} opacity="0.8" />
            </marker>
          ))}
        </defs>

        {/* Center node — the system itself */}
        <circle cx={CENTER_X} cy={CENTER_Y} r={CENTER_R}
          fill={`${color}15`} stroke={`${color}60`} strokeWidth={2} />
        <text x={CENTER_X} y={CENTER_Y + 5} textAnchor="middle"
          fontSize={13} fontWeight={700} fill={color}
          style={{ fontFamily: "system-ui, sans-serif" }}>
          {systemLabel}
        </text>

        {/* Satellite nodes */}
        {points.map((pt, i) => {
          const angle  = (2 * Math.PI * i) / count - Math.PI / 2;
          const sx = CENTER_X + radius * Math.cos(angle);
          const sy = CENTER_Y + radius * Math.sin(angle);
          const dirColor = DIR_COLORS[pt.direction] ?? color;

          // Line endpoints — stop at node border
          const nodeR = 34;
          const dx  = sx - CENTER_X;
          const dy  = sy - CENTER_Y;
          const dist = Math.hypot(dx, dy);
          const lx1 = CENTER_X + (dx / dist) * (CENTER_R + 6);
          const ly1 = CENTER_Y + (dy / dist) * (CENTER_R + 6);
          const lx2 = sx       - (dx / dist) * (nodeR + 6);
          const ly2 = sy       - (dy / dist) * (nodeR + 6);

          const lineD =
            pt.direction === "in"
              ? `M${lx2},${ly2} L${lx1},${ly1}`
              : pt.direction === "out"
              ? `M${lx1},${ly1} L${lx2},${ly2}`
              : `M${lx1},${ly1} L${lx2},${ly2}`;

          return (
            <g key={i}>
              {/* Connecting line */}
              <path d={lineD}
                stroke={`${dirColor}70`} strokeWidth={1.5} fill="none"
                markerEnd={`url(#imap-arrow-${pt.direction})`}
                strokeDasharray={pt.direction === "bidirectional" ? "4,3" : undefined}
              />
              {pt.direction === "bidirectional" && (
                <path d={`M${lx2},${ly2} L${lx1},${ly1}`}
                  stroke={`${dirColor}70`} strokeWidth={1.5} fill="none"
                  markerEnd={`url(#imap-arrow-${pt.direction})`}
                  strokeDasharray="4,3"
                />
              )}

              {/* Satellite node */}
              <circle cx={sx} cy={sy} r={nodeR}
                fill={`${dirColor}10`} stroke={`${dirColor}45`} strokeWidth={1.5} />
              <text x={sx} y={sy + 4} textAnchor="middle"
                fontSize={10} fontWeight={600} fill={dirColor}
                style={{ fontFamily: "system-ui, sans-serif" }}>
                {pt.system.length > 10 ? pt.system.slice(0, 10) + "…" : pt.system}
              </text>

              {/* Protocol label midpoint */}
              <text
                x={(lx1 + lx2) / 2}
                y={(ly1 + ly2) / 2 - 5}
                textAnchor="middle"
                fontSize={8.5}
                fill={dirColor}
                opacity={0.65}
                style={{ fontFamily: "monospace" }}
              >
                {pt.protocol.split(" / ")[0]}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-2 text-[10px]"
        style={{ color: "var(--text-muted)" }}>
        {[
          { dir: "in", zh: "接收", en: "Inbound" },
          { dir: "out", zh: "发出", en: "Outbound" },
          { dir: "bidirectional", zh: "双向", en: "Bidirec." },
        ].map(({ dir, zh, en }) => (
          <div key={dir} className="flex items-center gap-1.5">
            <div className="w-3 h-0.5" style={{ background: DIR_COLORS[dir] }} />
            <span>{lang === "zh" ? zh : en}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
