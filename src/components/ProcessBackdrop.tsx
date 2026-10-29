"use client";

import { useEffect, useRef } from "react";
import { paintProcessGrid } from "@/lib/process-grid";
import { bayer8, publishWaveFrame } from "@/lib/wave-field";
import { createProcessDepth, drawProcessDepth } from "@/lib/process-depth";
import type { ReadingArea } from "@/lib/process-grid";

export type ProcessKind = "about" | "projects" | "blog" | "resume" | "detail" | "experience";

/** Quiet subpage language: drawing stock and a content-connected margin circuit. */
export default function ProcessBackdrop({ kind }: { kind: ProcessKind }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const surface = canvas.current;
    const page = surface?.parentElement;
    const context = surface?.getContext("2d");
    if (!surface || !page || !context) return;
    const stock = document.createElement("canvas");
    let depth: ReturnType<typeof createProcessDepth>;
    let depthReading: ReadingArea[] = [];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let width = innerWidth, height = innerHeight, pageHeight = 0;
    let items: { y: number; right: number; element: HTMLElement }[] = [];
    let raf = 0, elapsed = 0, previous = 0, lastPaint = 0;
    let disposed = false, dirty = true, needsMeasure = true;
    const quiet = kind === "detail" || kind === "experience" || kind === "resume";

    function measure() {
      if (disposed || !page!.isConnected) return;
      width = innerWidth; height = innerHeight;
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      surface!.width = width * ratio; surface!.height = height * ratio;
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      const bounds = page!.getBoundingClientRect();
      pageHeight = page!.scrollHeight;
      const content = page!.querySelector<HTMLElement>(".process-content")!;
      const areas = Array.from(content.querySelectorAll<HTMLElement>("h1, .page-intro, .prose, .process-about-profile, .process-about-foundation, .project-entry, .topic-filter, .process-resume-section, .process-post, .notes-index, .process-reading")).map(element => {
        const r = element.getBoundingClientRect();
        return { x: r.left - bounds.left, y: r.top - bounds.top, w: r.width, h: r.height };
      });
      paintProcessGrid(stock, width, pageHeight, areas);
      depth = createProcessDepth(width);
      depthReading = areas;
      items = Array.from(content.querySelectorAll<HTMLElement>("[data-process-item]")).map(element => {
        const r = element.getBoundingClientRect();
        return { y: r.top - bounds.top + Math.min(r.height / 2, 58), right: r.right - bounds.left, element };
      });
      needsMeasure = false;
    }
    function draw() {
      const ctx = context!;
      publishWaveFrame({ time: elapsed, left: 0, top: 0, width, height, pixelsWide: width / 3, pixelsHigh: height / 3, scale: 78, cellSize: 1 });
      ctx.clearRect(0, 0, width, height);
      const top = page!.getBoundingClientRect().top;
      if (depth) drawProcessDepth(ctx, depth, width, height, top, elapsed, reduced.matches, depthReading);
      ctx.save(); ctx.translate(0, top);
      ctx.globalAlpha = quiet ? .65 : 1; ctx.drawImage(stock, 0, 0); ctx.globalAlpha = 1;
      const narrow = width < 720;
      const rail = narrow ? width - 22 : Math.min(width - 50, (width + 1200) / 2 - 35);
      const end = Math.max(380, pageHeight - 55);
      ctx.strokeStyle = "#c8d2da"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(rail, 58); ctx.lineTo(rail, end); ctx.stroke();
      const progress = Math.max(58, Math.min(end, height * .58 - top));
      ctx.strokeStyle = "#6f879b";
      ctx.beginPath(); ctx.moveTo(rail, 58); ctx.lineTo(rail, progress); ctx.stroke();

      if (!quiet && !narrow) {
        // Each index has one small piece of process equipment; prose keeps its margin.
        const cy = 175, w = kind === "projects" ? 45 : 34, h = kind === "blog" ? 115 : 78;
        const p = new Path2D(); p.roundRect(rail - w / 2, cy - h / 2, w, h, w / 2);
        ctx.fillStyle = "#fbfaf8"; ctx.fill(p); ctx.save(); ctx.clip(p);
        for (let y = cy - h / 2; y < cy + h / 2; y += 3) for (let x = rail - w / 2; x < rail + w / 2; x += 3) {
          const density = .12 + .3 * (x - rail + w / 2) / w + .08 * Math.sin(y * .04 - elapsed * .35);
          if (bayer8(Math.floor(x / 3), Math.floor(y / 3)) < density) { ctx.fillStyle = "#9bafbf"; ctx.fillRect(x, y, 1.7, 1.7); }
        }
        ctx.restore(); ctx.strokeStyle = "#8ba0b1"; ctx.stroke(p);
        if (kind === "blog") for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(rail - 14, cy + i * 17); ctx.lineTo(rail + 14, cy + i * 17); ctx.stroke(); }
      }

      items.forEach(({ y, right, element }) => {
        if (y + top < -30 || y + top > height + 30) return;
        const active = element.matches(":hover, :focus-within");
        ctx.strokeStyle = active ? "#203858" : "#bac8d3";
        ctx.fillStyle = active ? "#203858" : "#9bafbf";
        if (kind !== "about" && !narrow && right + 18 < rail) {
          ctx.setLineDash(active ? [] : [2, 4]);
          ctx.beginPath(); ctx.moveTo(rail, y); ctx.lineTo(right + 15, y); ctx.stroke(); ctx.setLineDash([]);
          ctx.fillRect(right + 12, y - 2, 4, 4);
        }
        ctx.fillRect(rail - 2, y - 2, 4, 4);
      });
      if (!reduced.matches && !quiet) {
        ctx.fillStyle = "#58748a";
        for (let y = 58 + elapsed * 22 % 110; y < progress; y += 110) ctx.fillRect(rail - 1.5, y, 3, 3);
      }
      ctx.restore();
    }
    function tick(now: number) {
      if (disposed || document.hidden) { raf = 0; previous = 0; return; }
      if (previous && !reduced.matches) elapsed += Math.min(64, now - previous) / 1000;
      previous = now;
      if (needsMeasure) measure();
      if (dirty || (!quiet && !reduced.matches && now - lastPaint > 50)) { draw(); dirty = false; lastPaint = now; }
      raf = quiet || reduced.matches ? 0 : requestAnimationFrame(tick);
    }
    function requestDraw() { if (disposed) return; dirty = true; if (!raf && !document.hidden) raf = requestAnimationFrame(tick); }
    function resize() { needsMeasure = true; requestDraw(); }
    function visibility() { if (document.hidden) { cancelAnimationFrame(raf); raf = 0; previous = 0; } else requestDraw(); }
    const observer = new ResizeObserver(resize); observer.observe(page);
    const mutation = new MutationObserver(resize); mutation.observe(page.querySelector(".process-content")!, { childList: true, subtree: true });
    document.fonts.ready.then(resize);
    addEventListener("scroll", requestDraw, { passive: true }); addEventListener("resize", resize);
    page.addEventListener("pointerover", requestDraw); page.addEventListener("pointerout", requestDraw); page.addEventListener("focusin", requestDraw); page.addEventListener("focusout", requestDraw);
    reduced.addEventListener("change", requestDraw); document.addEventListener("visibilitychange", visibility);
    requestDraw();
    return () => { disposed = true; cancelAnimationFrame(raf); observer.disconnect(); mutation.disconnect(); removeEventListener("scroll", requestDraw); removeEventListener("resize", resize); page.removeEventListener("pointerover", requestDraw); page.removeEventListener("pointerout", requestDraw); page.removeEventListener("focusin", requestDraw); page.removeEventListener("focusout", requestDraw); reduced.removeEventListener("change", requestDraw); document.removeEventListener("visibilitychange", visibility); };
  }, [kind]);
  return <canvas ref={canvas} className="process-backdrop" aria-hidden="true" />;
}
