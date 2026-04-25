"use client";
import { useRef, useEffect } from "react";
import type { DemoStep } from "@/lib/demoData";
import type { Lang } from "@/lib/i18n";

interface Props {
  steps: DemoStep[];
  currentIndex: number;
  onSelect: (i: number) => void;
  lang: Lang;
}

const PHASE_LABELS: Record<string, { zh: string; en: string }> = {
  placement:    { zh: "下单",  en: "Order" },
  atp:          { zh: "ATP",   en: "ATP" },
  split:        { zh: "拆单",  en: "Split" },
  sourcing:     { zh: "寻源",  en: "Route" },
  erp_delivery: { zh: "ERP",   en: "ERP" },
  wms_wave:     { zh: "波次",  en: "Wave" },
  picking:      { zh: "拣货",  en: "Pick" },
  packing:      { zh: "打包",  en: "Pack" },
  confirmation: { zh: "过账",  en: "Confirm" },
  shipping:     { zh: "发出",  en: "Ship" },
  transit:      { zh: "途中",  en: "Transit" },
  complete:     { zh: "完成",  en: "Done" },
};

export default function StepTimeline({ steps, currentIndex, onSelect, lang }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef    = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [currentIndex]);

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
      <div className="px-4 py-2 border-b text-[10px] font-semibold uppercase tracking-widest"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
        {lang === "zh" ? "步骤时间轴 · 点击跳转" : "Step Timeline · Click to Jump"}
      </div>
      <div ref={containerRef} className="overflow-x-auto">
        <div className="flex items-end gap-0 p-3" style={{ minWidth: "max-content" }}>
          {steps.map((step, i) => {
            const isActive = i === currentIndex;
            const isPast   = i < currentIndex;
            const phaseLabel = PHASE_LABELS[step.phase]?.[lang] ?? step.phase;

            return (
              <div key={step.id} className="flex items-center">
                {/* Connector */}
                {i > 0 && (
                  <div className="w-3 h-px mx-0.5"
                    style={{ background: isPast || isActive ? step.color : "var(--border)", opacity: isPast ? 0.5 : 1 }} />
                )}

                {/* Step dot */}
                <button
                  ref={isActive ? activeRef : undefined}
                  onClick={() => onSelect(i)}
                  className="flex flex-col items-center gap-1 group"
                  style={{ minWidth: 48 }}
                >
                  <span className="text-[9px] font-mono transition-colors"
                    style={{ color: isActive ? step.color : isPast ? "var(--text-muted)" : "var(--border)" }}>
                    {phaseLabel}
                  </span>

                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: isActive ? step.color : isPast ? `${step.color}30` : "var(--bg-secondary)",
                      border: `1.5px solid ${isActive ? step.color : isPast ? `${step.color}50` : "var(--border)"}`,
                      transform: isActive ? "scale(1.25)" : "scale(1)",
                    }}
                  >
                    {isPast && !isActive && (
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5 L4.5 7.5 L8.5 2.5" stroke={step.color} strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>

                  <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity absolute mt-8 px-1.5 py-0.5 rounded z-10 pointer-events-none whitespace-nowrap"
                    style={{ background: "var(--bg-secondary)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                    {lang === "zh" ? step.title.zh.slice(0, 8) : step.title.en.slice(0, 16)}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
