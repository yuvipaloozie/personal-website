"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { graphData, NodeData } from "@/data/graphData";

export default function GraphCanvas({
  onNodeSelect,
}: {
  onNodeSelect: (node: NodeData | null) => void;
}) {
  const fgRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(["me"]),
  );

  // Filter nodes and links based on expanded state
  const visibleNodes = graphData.nodes.filter((node) => {
    if (node.id === "me") return true;
    // Visible if it's connected to an expanded node (or 'me' which is always expanded)
    return graphData.links.some(
      (link) =>
        ((typeof link.source === "object"
          ? (link.source as any).id
          : link.source) === "me" &&
          (typeof link.target === "object"
            ? (link.target as any).id
            : link.target) === node.id) ||
        (expandedNodes.has(
          typeof link.source === "object"
            ? (link.source as any).id
            : link.source,
        ) &&
          (typeof link.target === "object"
            ? (link.target as any).id
            : link.target) === node.id),
    );
  });

  const visibleLinks = graphData.links.filter((link) => {
    const sourceId =
      typeof link.source === "object" ? (link.source as any).id : link.source;
    const targetId =
      typeof link.target === "object" ? (link.target as any).id : link.target;
    return (
      visibleNodes.some((n) => n.id === sourceId) &&
      visibleNodes.some((n) => n.id === targetId)
    );
  });

  const graphDataFiltered = { nodes: visibleNodes, links: visibleLinks };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    const timer = setTimeout(() => {
      if (fgRef.current) {
        fgRef.current.zoomToFit(0, 80);
        fgRef.current.zoom(Math.min(fgRef.current.zoom(), 2), 0);
      }
    }, 1500);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  const handleNodeClick = useCallback(
    (node: any) => {
      if (node.type === "category") {
        setExpandedNodes((prev) => {
          const next = new Set(prev);
          if (next.has(node.id)) {
            next.delete(node.id);
          } else {
            next.add(node.id);
          }
          return next;
        });
      }

      if (fgRef.current) {
        fgRef.current.centerAt(node.x, node.y, 1000);
        // Zoom in deeper for detail nodes, otherwise maintain a moderate zoom for categories so it doesn't zoom out to empty space
        if (node.type === "detail") {
          fgRef.current.zoom(6, 1000);
        } else {
          fgRef.current.zoom(4.5, 1000);
        }
      }
      onNodeSelect(node);
    },
    [onNodeSelect],
  );

  const handleBackgroundClick = useCallback(() => {
    if (fgRef.current) {
      fgRef.current.zoomToFit(0, 80);
      fgRef.current.zoom(Math.min(fgRef.current.zoom(), 2), 0);
    }
    onNodeSelect(null);
  }, [onNodeSelect]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
      }}
    >
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphDataFiltered}
        nodeLabel="label"
        onNodeClick={handleNodeClick}
        onBackgroundClick={handleBackgroundClick}
        linkColor={() => "rgba(77, 112, 137, 0.35)"}
        linkWidth={1}
        enableNodeDrag={true}
        d3VelocityDecay={0.4}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.label;
          const fontSize = 12 / globalScale;

          // Draw elegant node with subtle glow
          const radius =
            node.type === "root" ? 15 : node.type === "category" ? 10 : 7;

          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);

          // Industrial blue palette
          if (node.type === "root") {
            ctx.fillStyle = "#1b628f";
            ctx.shadowColor = "rgba(27, 98, 143, 0.3)";
            ctx.shadowBlur = 15;
          } else if (node.type === "category") {
            ctx.fillStyle = "rgba(27, 98, 143, 0.6)";
            ctx.shadowBlur = 0;
          } else {
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.shadowBlur = 0;
          }

          ctx.fill();
          ctx.shadowBlur = 0; // Reset shadow

          // Label styling
          ctx.font = `700 ${fontSize}px 'Instrument Sans', sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          // Minimalist label background
          const textWidth = ctx.measureText(label).width;
          const bgPadding = 4 / globalScale;
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          const rectW = textWidth + bgPadding * 2;
          const rectH = fontSize + bgPadding * 2;
          const rectX = node.x - rectW / 2;
          const rectY = node.y + radius + 5;

          // Rounded rect for label
          const r = 4 / globalScale;
          ctx.beginPath();
          ctx.roundRect(rectX, rectY, rectW, rectH, r);
          ctx.fill();

          // Text
          ctx.fillStyle = "#1a1a1a";
          ctx.fillText(label, node.x, rectY + rectH / 2);
        }}
      />
    </div>
  );
}
