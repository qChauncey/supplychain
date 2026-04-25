interface PageHeaderProps {
  level: string;
  title: string;
  en: string;
  desc: string;
  color: string;
}

export default function PageHeader({ level, title, en, desc, color }: PageHeaderProps) {
  return (
    <div className="mb-12 animate-fade-up">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-bold px-2.5 py-1 rounded"
          style={{
            background: `${color}15`,
            color,
            border: `1px solid ${color}40`,
            fontFamily: "var(--font-geist-mono)",
          }}>
          {level}
        </span>
        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg,${color}40,transparent)` }} />
      </div>
      <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>{title}</h1>
      <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>{en}</p>
      <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>{desc}</p>
    </div>
  );
}
