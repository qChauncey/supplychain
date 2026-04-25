interface SequenceStep {
  from: string;
  to: string;
  message: string;
  detail: string;
  isKey?: boolean;
  isSelf?: boolean;
}

const actors = ["OMS", "SAP ERP", "Manhattan WMS", "WCS/AGV"];
const actorColors: Record<string, string> = {
  "OMS":            "#6366f1",
  "SAP ERP":        "#3b82f6",
  "Manhattan WMS":  "#8b5cf6",
  "WCS/AGV":        "#f59e0b",
};

export default function SequenceDiagram({ steps }: { steps: SequenceStep[] }) {
  const colW = 160;
  const padding = 40;
  const totalW = actors.length * colW + padding * 2;
  const rowH = 72;
  const headerH = 56;
  const totalH = steps.length * rowH + headerH + 40;

  const actorX = (name: string) => {
    const idx = actors.indexOf(name);
    return padding + idx * colW + colW / 2;
  };

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}>
      <div className="overflow-x-auto">
        <svg width={totalW} height={totalH} style={{ display: "block", minWidth: totalW }}>
          {/* Actor headers */}
          {actors.map((actor) => {
            const x = actorX(actor);
            const color = actorColors[actor] ?? "#94a3b8";
            return (
              <g key={actor}>
                <rect x={x - 56} y={8} width={112} height={32} rx={6}
                  fill={`${color}14`} stroke={`${color}50`} strokeWidth="1" />
                <text x={x} y={29} textAnchor="middle" fontSize={10} fontWeight="700"
                  fontFamily="var(--font-geist-mono,monospace)" fill={color}>
                  {actor}
                </text>
                {/* Lifeline */}
                <line x1={x} y1={40} x2={x} y2={totalH - 20}
                  stroke={color} strokeWidth="1" strokeDasharray="4,3" opacity={0.2} />
              </g>
            );
          })}

          {/* Steps */}
          {steps.map((step, i) => {
            const y = headerH + i * rowH + rowH / 2;
            const fx = actorX(step.from);
            const tx = actorX(step.to);
            const color = actorColors[step.from] ?? "#94a3b8";
            const isSelf = step.isSelf || step.from === step.to;
            const isKey = step.isKey;

            return (
              <g key={i}>
                {/* Row bg */}
                {isKey && (
                  <rect x={padding - 8} y={y - rowH / 2 + 4} width={totalW - padding * 2 + 16}
                    height={rowH - 8} rx={4} fill={`${color}06`} stroke={`${color}20`} strokeWidth="1" />
                )}

                {/* Arrow */}
                {isSelf ? (
                  <g>
                    <path d={`M${fx} ${y - 8} L${fx + 32} ${y - 8} L${fx + 32} ${y + 8} L${fx} ${y + 8}`}
                      fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d={`M${fx + 5} ${y + 4} L${fx} ${y + 8} L${fx + 5} ${y + 12}`}
                      fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                ) : (
                  <g>
                    <line x1={fx} y1={y} x2={tx} y2={y}
                      stroke={color} strokeWidth={isKey ? 1.8 : 1.2}
                      strokeDasharray={step.isKey ? undefined : "5,3"} />
                    {tx > fx ? (
                      <path d={`M${tx - 7} ${y - 4} L${tx} ${y} L${tx - 7} ${y + 4}`}
                        fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
                    ) : (
                      <path d={`M${tx + 7} ${y - 4} L${tx} ${y} L${tx + 7} ${y + 4}`}
                        fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
                    )}
                  </g>
                )}

                {/* Message label */}
                <text
                  x={(isSelf ? fx + 36 : (fx + tx) / 2)}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize={9}
                  fontWeight={isKey ? "700" : "600"}
                  fontFamily="var(--font-geist-mono,monospace)"
                  fill={color}
                >
                  {step.message}
                </text>

                {/* Detail label */}
                <text
                  x={(isSelf ? fx + 36 : (fx + tx) / 2)}
                  y={y + 16}
                  textAnchor="middle"
                  fontSize={8}
                  fontFamily="var(--font-geist-sans,sans-serif)"
                  fill="#475569"
                >
                  {step.detail}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
