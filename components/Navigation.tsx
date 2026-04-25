"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navigation() {
  const pathname = usePathname();
  const { lang, t, toggle } = useLanguage();

  const navItems = [
    { href: "/",           label: t.nav.overview },
    { href: "/l1",         label: t.nav.l1 },
    { href: "/l2",         label: t.nav.l2 },
    { href: "/l3",         label: t.nav.l3 },
    { href: "/comparison", label: t.nav.comparison },
  ];

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "rgba(8,12,20,0.92)",
        borderColor: "var(--border)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div
            className="w-7 h-7 rounded flex items-center justify-center text-sm font-bold"
            style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)", color: "#fff" }}
          >
            SC
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold leading-none" style={{ color: "var(--text-primary)" }}>
              {lang === "zh" ? "供应链架构手册" : "Supply Chain Guide"}
            </p>
            <p className="text-[10px] leading-none mt-0.5" style={{ color: "var(--text-muted)" }}>
              {lang === "zh" ? "Supply Chain Architecture" : "全球 DTC 供应链体系"}
            </p>
          </div>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-0.5 overflow-x-auto">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap"
                style={{
                  color: active ? "#fff" : "var(--text-secondary)",
                  background: active ? "rgba(59,130,246,0.15)" : "transparent",
                  borderBottom: active ? "1px solid rgba(59,130,246,0.5)" : "1px solid transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right side: badge + lang toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="hidden lg:flex items-center gap-2 text-[10px] px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(59,130,246,0.08)",
              border: "1px solid rgba(59,130,246,0.2)",
              color: "var(--accent-blue)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
            {t.nav.dtcBadge}
          </div>

          {/* Language toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
            aria-label="Toggle language"
          >
            <span style={{ opacity: lang === "zh" ? 1 : 0.4 }}>中</span>
            <span style={{ color: "var(--text-muted)" }}>/</span>
            <span style={{ opacity: lang === "en" ? 1 : 0.4 }}>EN</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
