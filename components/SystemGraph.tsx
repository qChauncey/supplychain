"use client";
import { useCallback } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  type Connection,
  type Node,
  type Edge,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const initialNodes: Node[] = [
  {
    id: "erp",
    position: { x: 340, y: 80 },
    data: { label: "SAP ERP\nS/4HANA" },
    style: {
      background: "rgba(59,130,246,0.12)",
      border: "1px solid rgba(59,130,246,0.4)",
      color: "#3b82f6",
      borderRadius: "10px",
      padding: "12px 18px",
      fontSize: "12px",
      fontWeight: "700",
      fontFamily: "var(--font-geist-mono, monospace)",
      whiteSpace: "pre-line",
      textAlign: "center",
      minWidth: "120px",
    },
  },
  {
    id: "oms",
    position: { x: 80, y: 240 },
    data: { label: "OMS\n订单管理中台" },
    style: {
      background: "rgba(99,102,241,0.12)",
      border: "1px solid rgba(99,102,241,0.4)",
      color: "#6366f1",
      borderRadius: "10px",
      padding: "12px 18px",
      fontSize: "12px",
      fontWeight: "700",
      fontFamily: "var(--font-geist-mono, monospace)",
      whiteSpace: "pre-line",
      textAlign: "center",
      minWidth: "120px",
    },
  },
  {
    id: "wms",
    position: { x: 340, y: 280 },
    data: { label: "WMS\n仓储管理系统" },
    style: {
      background: "rgba(139,92,246,0.12)",
      border: "1px solid rgba(139,92,246,0.4)",
      color: "#8b5cf6",
      borderRadius: "10px",
      padding: "12px 18px",
      fontSize: "12px",
      fontWeight: "700",
      fontFamily: "var(--font-geist-mono, monospace)",
      whiteSpace: "pre-line",
      textAlign: "center",
      minWidth: "120px",
    },
  },
  {
    id: "tms",
    position: { x: 600, y: 240 },
    data: { label: "TMS\n运输管理系统" },
    style: {
      background: "rgba(168,85,247,0.12)",
      border: "1px solid rgba(168,85,247,0.4)",
      color: "#a855f7",
      borderRadius: "10px",
      padding: "12px 18px",
      fontSize: "12px",
      fontWeight: "700",
      fontFamily: "var(--font-geist-mono, monospace)",
      whiteSpace: "pre-line",
      textAlign: "center",
      minWidth: "120px",
    },
  },
  {
    id: "srm",
    position: { x: 80, y: 80 },
    data: { label: "SRM\n供应商管理" },
    style: {
      background: "rgba(6,182,212,0.10)",
      border: "1px solid rgba(6,182,212,0.35)",
      color: "#06b6d4",
      borderRadius: "10px",
      padding: "12px 18px",
      fontSize: "12px",
      fontWeight: "700",
      fontFamily: "var(--font-geist-mono, monospace)",
      whiteSpace: "pre-line",
      textAlign: "center",
      minWidth: "120px",
    },
  },
  {
    id: "wcs",
    position: { x: 340, y: 460 },
    data: { label: "WCS / PLC\n自动化设备" },
    style: {
      background: "rgba(245,158,11,0.08)",
      border: "1px solid rgba(245,158,11,0.3)",
      color: "#f59e0b",
      borderRadius: "10px",
      padding: "12px 18px",
      fontSize: "12px",
      fontWeight: "700",
      fontFamily: "var(--font-geist-mono, monospace)",
      whiteSpace: "pre-line",
      textAlign: "center",
      minWidth: "120px",
    },
  },
];

const edgeStyle = (color: string) => ({
  stroke: color,
  strokeWidth: 1.5,
  strokeDasharray: "5,3",
});

const initialEdges: Edge[] = [
  {
    id: "oms-erp",
    source: "oms",
    target: "erp",
    label: "OData / REST",
    labelStyle: { fill: "#6366f1", fontSize: 9, fontFamily: "monospace", fontWeight: 600 },
    labelBgStyle: { fill: "rgba(15,25,36,0.9)" },
    style: edgeStyle("#6366f1"),
    markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
    animated: true,
  },
  {
    id: "erp-wms",
    source: "erp",
    target: "wms",
    label: "EDI / IDoc",
    labelStyle: { fill: "#8b5cf6", fontSize: 9, fontFamily: "monospace", fontWeight: 600 },
    labelBgStyle: { fill: "rgba(15,25,36,0.9)" },
    style: edgeStyle("#8b5cf6"),
    markerEnd: { type: MarkerType.ArrowClosed, color: "#8b5cf6" },
  },
  {
    id: "wms-erp",
    source: "wms",
    target: "erp",
    label: "WHSCON",
    labelStyle: { fill: "#8b5cf6", fontSize: 9, fontFamily: "monospace", fontWeight: 600 },
    labelBgStyle: { fill: "rgba(15,25,36,0.9)" },
    style: { ...edgeStyle("#8b5cf6"), strokeDasharray: undefined },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#8b5cf6" },
  },
  {
    id: "wms-wcs",
    source: "wms",
    target: "wcs",
    label: "MQTT / TCP",
    labelStyle: { fill: "#f59e0b", fontSize: 9, fontFamily: "monospace", fontWeight: 600 },
    labelBgStyle: { fill: "rgba(15,25,36,0.9)" },
    style: edgeStyle("#f59e0b"),
    markerEnd: { type: MarkerType.ArrowClosed, color: "#f59e0b" },
    animated: true,
  },
  {
    id: "srm-erp",
    source: "srm",
    target: "erp",
    label: "EDI / Portal",
    labelStyle: { fill: "#06b6d4", fontSize: 9, fontFamily: "monospace", fontWeight: 600 },
    labelBgStyle: { fill: "rgba(15,25,36,0.9)" },
    style: edgeStyle("#06b6d4"),
    markerEnd: { type: MarkerType.ArrowClosed, color: "#06b6d4" },
  },
  {
    id: "tms-wms",
    source: "tms",
    target: "wms",
    label: "REST API",
    labelStyle: { fill: "#a855f7", fontSize: 9, fontFamily: "monospace", fontWeight: 600 },
    labelBgStyle: { fill: "rgba(15,25,36,0.9)" },
    style: edgeStyle("#a855f7"),
    markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7" },
  },
];

export default function SystemGraph() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="rounded-xl overflow-hidden"
      style={{ height: 560, background: "var(--bg-card)", border: "1px solid var(--border)" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-right"
        colorMode="dark"
      >
        <Controls
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
          }}
        />
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="rgba(59,130,246,0.12)"
        />
      </ReactFlow>
    </div>
  );
}
