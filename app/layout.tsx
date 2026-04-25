import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "全球供应链架构手册 | Supply Chain Architecture",
  description:
    "面向供应链系统架构师与全栈开发者的系统级可视化参考资料。全球高端消费电子品牌 DTC 供应链体系。",
  keywords: ["supply chain", "ERP", "OMS", "WMS", "SAP", "DTC", "架构"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <Navigation />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
