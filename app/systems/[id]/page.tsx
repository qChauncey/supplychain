import { notFound } from "next/navigation";
import { SYSTEMS_MAP, SYSTEMS_LIST } from "@/lib/systemsData";
import SystemDetailClient from "@/components/systems/SystemDetailClient";

export function generateStaticParams() {
  return SYSTEMS_LIST.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sys = SYSTEMS_MAP[id];
  if (!sys) return {};
  return {
    title: `${sys.label} — ${sys.fullName.en} | Supply Chain Guide`,
    description: sys.overview.en.slice(0, 160),
  };
}

export default async function SystemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sys = SYSTEMS_MAP[id];
  if (!sys) notFound();

  return <SystemDetailClient system={sys} />;
}
