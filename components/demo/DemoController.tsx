"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { DEMO_STEPS, ORDER_INFO, type DemoStep } from "@/lib/demoData";
import { useLanguage } from "@/contexts/LanguageContext";
import BusinessFlowPanel from "./BusinessFlowPanel";
import SystemFlowPanel from "./SystemFlowPanel";
import EventLog from "./EventLog";
import StepTimeline from "./StepTimeline";

const LOG_TYPE_COLORS: Record<string, string> = {
  request:  "#3b82f6",
  response: "#22c55e",
  internal: "#8b5cf6",
  event:    "#06b6d4",
  warning:  "#f59e0b",
  finance:  "#ec4899",
};

export default function DemoController() {
  const { lang } = useLanguage();
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying]     = useState(false);
  const [speed, setSpeed]         = useState(1);
  const [logs, setLogs]           = useState<(DemoStep & { timestamp: string })[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentStep = DEMO_STEPS[stepIndex];

  const appendLog = useCallback((step: DemoStep) => {
    setLogs((prev) => [
      ...prev,
      { ...step, timestamp: new Date().toLocaleTimeString("zh-CN", { hour12: false }) },
    ].slice(-40));
  }, []);

  const goToStep = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(idx, DEMO_STEPS.length - 1));
    setStepIndex(clamped);
    appendLog(DEMO_STEPS[clamped]);
  }, [appendLog]);

  // Auto-advance
  useEffect(() => {
    if (!playing) return;
    const ms = currentStep.durationMs / speed;
    timerRef.current = setTimeout(() => {
      if (stepIndex < DEMO_STEPS.length - 1) {
        goToStep(stepIndex + 1);
      } else {
        setPlaying(false);
      }
    }, ms);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [playing, stepIndex, speed, currentStep.durationMs, goToStep]);

  const handlePlay = () => {
    if (stepIndex === DEMO_STEPS.length - 1) {
      setStepIndex(0);
      setLogs([]);
    }
    setPlaying(true);
    appendLog(DEMO_STEPS[stepIndex === DEMO_STEPS.length - 1 ? 0 : stepIndex]);
  };

  const handleReset = () => {
    setPlaying(false);
    setStepIndex(0);
    setLogs([]);
  };

  const progress = ((stepIndex + 1) / DEMO_STEPS.length) * 100;

  return (
    <div className="space-y-4">
      {/* Order info banner */}
      <div className="p-4 rounded-xl flex flex-wrap items-center gap-4 text-xs"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <div>
          <p className="text-[10px] mb-0.5" style={{ color: "var(--text-muted)" }}>
            {lang === "zh" ? "订单号" : "Order ID"}
          </p>
          <p className="font-mono font-bold" style={{ color: "var(--text-primary)" }}>{ORDER_INFO.orderId}</p>
        </div>
        <div className="h-8 w-px" style={{ background: "var(--border)" }} />
        <div>
          <p className="text-[10px] mb-0.5" style={{ color: "var(--text-muted)" }}>
            {lang === "zh" ? "收货人" : "Recipient"}
          </p>
          <p style={{ color: "var(--text-secondary)" }}>{ORDER_INFO.consumer.name} · {ORDER_INFO.consumer.city}</p>
        </div>
        <div className="h-8 w-px" style={{ background: "var(--border)" }} />
        {ORDER_INFO.items.map((item) => (
          <div key={item.sku}>
            <p className="text-[10px] mb-0.5 font-mono" style={{ color: "var(--text-muted)" }}>{item.sku}</p>
            <div className="flex items-center gap-1.5">
              <p style={{ color: "var(--text-secondary)" }}>{item.name[lang]}</p>
              <span className="text-[10px] px-1.5 py-0.5 rounded"
                style={{
                  background: item.inStock ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                  color: item.inStock ? "#22c55e" : "#ef4444",
                  border: `1px solid ${item.inStock ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
                }}>
                {item.inStock
                  ? (lang === "zh" ? "有货" : "In Stock")
                  : (lang === "zh" ? "定制" : "MTO")}
              </span>
            </div>
          </div>
        ))}
        <div className="ml-auto hidden sm:block">
          <p className="text-[10px] mb-0.5" style={{ color: "var(--text-muted)" }}>
            {lang === "zh" ? "发货仓" : "Ship from"}
          </p>
          <p style={{ color: "var(--text-secondary)" }}>{ORDER_INFO.rdc[lang]} · {ORDER_INFO.distance}</p>
        </div>
      </div>

      {/* Dual panels */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <BusinessFlowPanel step={currentStep} />
        <SystemFlowPanel  step={currentStep} />
      </div>

      {/* Mapping connector bar */}
      <div className="flex items-center gap-3 p-3 rounded-xl text-xs"
        style={{ background: `${currentStep.color}08`, border: `1px solid ${currentStep.color}20` }}>
        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: currentStep.color }} />
        <span className="font-semibold" style={{ color: currentStep.color }}>
          {lang === "zh" ? currentStep.title.zh : currentStep.title.en}
        </span>
        <span style={{ color: "var(--text-muted)" }}>→</span>
        <span style={{ color: "var(--text-secondary)" }}>
          {lang === "zh" ? currentStep.desc.zh : currentStep.desc.en}
        </span>
        <span className="ml-auto shrink-0 font-mono text-[10px]"
          style={{ color: "var(--text-muted)" }}>
          {lang === "zh" ? `步骤 ${stepIndex + 1} / ${DEMO_STEPS.length}` : `Step ${stepIndex + 1} / ${DEMO_STEPS.length}`}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${progress}%`, background: `linear-gradient(90deg,${currentStep.color},${currentStep.color}88)` }} />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Rewind */}
        <button onClick={() => { setPlaying(false); goToStep(stepIndex - 1); }}
          disabled={stepIndex === 0}
          className="px-3 py-2 rounded-lg text-xs font-medium transition-all disabled:opacity-30"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
          ← {lang === "zh" ? "上一步" : "Prev"}
        </button>

        {/* Play/Pause */}
        {playing ? (
          <button onClick={() => setPlaying(false)}
            className="px-5 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{ background: currentStep.color, color: "#fff", border: `1px solid ${currentStep.color}` }}>
            ⏸ {lang === "zh" ? "暂停" : "Pause"}
          </button>
        ) : (
          <button onClick={handlePlay}
            className="px-5 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{ background: currentStep.color, color: "#fff", border: `1px solid ${currentStep.color}` }}>
            ▶ {lang === "zh" ? (stepIndex === DEMO_STEPS.length - 1 ? "重新播放" : "播放") : (stepIndex === DEMO_STEPS.length - 1 ? "Replay" : "Play")}
          </button>
        )}

        {/* Forward */}
        <button onClick={() => { setPlaying(false); goToStep(stepIndex + 1); }}
          disabled={stepIndex === DEMO_STEPS.length - 1}
          className="px-3 py-2 rounded-lg text-xs font-medium transition-all disabled:opacity-30"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
          {lang === "zh" ? "下一步" : "Next"} →
        </button>

        {/* Speed */}
        <div className="flex items-center gap-1 ml-2">
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {lang === "zh" ? "速度" : "Speed"}
          </span>
          {[0.5, 1, 2, 3].map((s) => (
            <button key={s} onClick={() => setSpeed(s)}
              className="px-2 py-1 rounded text-[10px] font-mono transition-all"
              style={{
                background: speed === s ? `${currentStep.color}20` : "var(--bg-secondary)",
                color: speed === s ? currentStep.color : "var(--text-muted)",
                border: `1px solid ${speed === s ? `${currentStep.color}40` : "var(--border-subtle)"}`,
              }}>
              {s}×
            </button>
          ))}
        </div>

        {/* Reset */}
        <button onClick={handleReset}
          className="ml-auto px-3 py-2 rounded-lg text-xs transition-all"
          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
          ↺ {lang === "zh" ? "重置" : "Reset"}
        </button>
      </div>

      {/* Step timeline */}
      <StepTimeline
        steps={DEMO_STEPS}
        currentIndex={stepIndex}
        onSelect={(i) => { setPlaying(false); goToStep(i); }}
        lang={lang}
      />

      {/* Event log */}
      <EventLog logs={logs} lang={lang} logTypeColors={LOG_TYPE_COLORS} />
    </div>
  );
}
