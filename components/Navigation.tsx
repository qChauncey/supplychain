"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/",           label: "概览",     en: "Overview" },
  { href: "/l1",         label: "L1 业务流", en: "Business Flow" },
  { href: "/l2",         label: "L2 系统架构", en: "System Architecture" },
  { href: "/l3",         label: "L3 微观交互", en: "Micro Interactions" },
  { href: "/comparison", label: "行业对比",  en: "Industry Comparison" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: "rgba(8,12,20,0.92)", borderColor: "var(--border)", backdropFilter: "blur(12px)" }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-7 h-7 rounded flex items-center justify-center text-sm font-bold"
            style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)", color: "#fff" }}>
            SC
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold leading-none" style={{ color: "var(--text-primary)" }}>
              供应链架构手册
            </p>
            <p className="text-[10px] leading-none mt-0.5" style={{ color: "var(--text-muted)" }}>
              Supply Chain Architecture
            </p>
          </div>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                style={{
                  color: active ? "#fff" : "var(--text-secondary)",
                  background: active ? "rgba(59,130,246,0.15)" : "transparent",
                  borderBottom: active ? "1px solid rgba(59,130,246,0.5)" : "1px solid transparent",
                }}
              >
                <span className="hidden md:inline">{item.label}</span>
                <span className="md:hidden">{item.en}</span>
              </Link>
            );
          })}
        </div>

        {/* Badge */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] px-2.5 py-1 rounded-full"
          style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", color: "var(--accent-blue)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse-dot inline-block" />
          DTC 全渠道架构参考
        </div>
      </div>
    </nav>
  );
}
