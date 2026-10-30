"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { graphData, NodeData } from "@/data/graphData";
import { bayer8, waveField } from "@/lib/wave-field";

export default function GraphCanvas({
  onNodeSelect,
  paused = false,
}: {
  onNodeSelect: (node: NodeData | null) => void;
  paused?: boolean;
}) {
  const fgRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const clock = useRef({ time: 0, last: 0 });
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(true);
  const animated = !paused && !reduced && visible;
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(["me"]),
  );

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    const visibility = () => setVisible(!document.hidden);
    update(); visibility();
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => {
    if (visible && !paused) fgRef.current?.resumeAnimation();
    else fgRef.current?.pauseAnimation();
    clock.current.last = 0;
  }, [visible, animated, paused]);

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
    // Leave room for the larger dithered nodes and their fixed-size labels.
    fgRef.current?.d3Force("link")?.distance(80);
    fgRef.current?.d3Force("charge")?.strength(-180);

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
        fgRef.current.centerAt(node.x, node.y, reduced ? 0 : 700);
        // Zoom in deeper for detail nodes, otherwise maintain a moderate zoom for categories so it doesn't zoom out to empty space
        if (node.type === "detail") {
          fgRef.current.zoom(6, reduced ? 0 : 700);
        } else {
          fgRef.current.zoom(4.5, reduced ? 0 : 700);
        }
      }
      onNodeSelect(node);
    },
    [onNodeSelect, reduced],
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
        linkColor={() => "rgba(32, 56, 88, 0.3)"}
        linkWidth={1}
        linkLineDash={[1, 2]}
        linkDirectionalParticles={animated ? 1 : 0}
        linkDirectionalParticleColor={() => "#203858"}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleSpeed={.003}
        autoPauseRedraw={!animated}
        onRenderFramePre={() => {
          const now = performance.now();
          if (animated && clock.current.last) clock.current.time += Math.min(now - clock.current.last, 100) / 1000;
          clock.current.last = animated ? now : 0;
        }}
        enableNodeDrag={true}
        d3VelocityDecay={0.4}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.label;
          const fontSize = 12 / globalScale;

          const radius =
            node.type === "root" ? 15 : node.type === "category" ? 10 : 7;
          const pixel = Math.max(2 / globalScale, radius / 10);
          const t = clock.current.time;
          ctx.fillStyle = node.type === "root" ? "#203858"
            : node.type === "category" ? "#536985" : "#7a8797";
          for (let dy = -radius; dy <= radius; dy += pixel) {
            for (let dx = -radius; dx <= radius; dx += pixel) {
              const distance = Math.hypot(dx, dy) / radius;
              const field = waveField((node.x + dx) * .02, (node.y + dy) * .02, t * .6);
              const coverage = Math.max(0, Math.min(1, (1.05 - distance + (field - .5) * .15) / .45));
              if (coverage > bayer8(Math.floor(dx / pixel), Math.floor(dy / pixel))) {
                ctx.fillRect(node.x + dx, node.y + dy, pixel, pixel);
              }
            }
          }

          // Label styling
          ctx.font = `500 ${fontSize}px 'Geist Mono', monospace`;
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

          ctx.fillRect(rectX, rectY, rectW, rectH);

          // Text
          ctx.fillStyle = "#1a1a1a";
          ctx.fillText(label, node.x, rectY + rectH / 2);
        }}
        nodePointerAreaPaint={(node: any, color, ctx) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.type === "root" ? 15 : node.type === "category" ? 10 : 7, 0, Math.PI * 2);
          ctx.fill();
        }}
      />
    </div>
  );
}
