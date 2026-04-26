"use client";
import { useEffect, useRef } from "react";
import type { DemoStep } from "@/lib/demoData";
import type { Lang } from "@/lib/i18n";

interface LogEntry extends DemoStep {
  timestamp: string;
}

interface Props {
  logs: LogEntry[];
  lang: Lang;
  logTypeColors: Record<string, string>;
}

const LOG_ICONS: Record<string, string> = {
  request:  "→",
  response: "←",
  internal: "⚙",
  event:    "◆",
  warning:  "⚠",
  finance:  "¥",
};

const LOG_TYPE_LABELS: Record<string, { zh: string; en: string }> = {
  request:  { zh: "请求",   en: "REQUEST"  },
  response: { zh: "响应",   en: "RESPONSE" },
  internal: { zh: "内部",   en: "INTERNAL" },
  event:    { zh: "事件",   en: "EVENT"    },
  warning:  { zh: "警告",   en: "WARNING"  },
  finance:  { zh: "财务",   en: "FINANCE"  },
};

export default function EventLog({ logs, lang, logTypeColors }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs.length]);

  if (logs.length === 0) {
    return (
      <div className="rounded-xl p-6 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {lang === "zh" ? "点击「播放」开始模拟，事件日志将在此实时显示" : "Click \"Play\" to start the simulation. Events will appear here in real time."}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: "#ef4444", opacity: 0.7 }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "#f59e0b", opacity: 0.7 }} />
          <div className="w-2 h-2 rounded-full" style={{ background: "#22c55e", opacity: 0.7 }} />
        </div>
        <span className="text-xs font-semibold font-mono" style={{ color: "var(--text-secondary)" }}>
          system-event-log
        </span>
        <span className="ml-auto text-[10px] px-2 py-0.5 rounded"
          style={{ background: "rgba(34,197,94,0.08)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}>
          {logs.length} {lang === "zh" ? "条记录" : "entries"}
        </span>
      </div>

      <div className="overflow-y-auto font-mono text-[11px] leading-relaxed"
        style={{ maxHeight: 320, background: "#060a10" }}>
        {logs.map((entry, i) => {
          const color   = logTypeColors[entry.logType] ?? "#94a3b8";
          const icon    = LOG_ICONS[entry.logType] ?? "·";
          const typeLabel = LOG_TYPE_LABELS[entry.logType]?.[lang] ?? entry.logType;
          const isLast  = i === logs.length - 1;

          return (
            <div key={`${entry.id}-${i}`}
              className="border-b px-4 py-2.5 transition-colors"
              style={{
                borderColor: "rgba(30,45,69,0.5)",
                background: isLast ? `${entry.color}08` : "transparent",
              }}>
              {/* Log line */}
              <div className="flex items-baseline gap-2">
                <span style={{ color: "var(--text-muted)" }}>{entry.timestamp}</span>
                <span className="px-1.5 py-0 rounded text-[9px] font-bold"
                  style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>
                  {icon} {typeLabel}
                </span>
                <span style={{ color }}>
                  {lang === "zh" ? entry.log.zh : entry.log.en}
                </span>
              </div>

              {/* Payload (only for latest entry) */}
              {isLast && entry.payload && (
                <div className="mt-2 rounded-lg overflow-x-auto"
                  style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(59,130,246,0.1)" }}>
                  <pre className="p-3 text-[10px] leading-6 whitespace-pre overflow-x-auto"
                    style={{ color: "#94a3b8", margin: 0 }}>
                    {entry.payload}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
