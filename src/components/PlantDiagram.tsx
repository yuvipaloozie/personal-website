"use client";

import { useEffect, useRef } from "react";
import { bayer8, publishWaveFrame } from "@/lib/wave-field";
import { paintProcessGrid } from "@/lib/process-grid";
import { createProcessDepth, drawProcessDepth } from "@/lib/process-depth";
import type { ReadingArea } from "@/lib/process-grid";

type Point = [number, number];

/** Original, deliberately abstract process geometry; not an operating P&ID. */
export default function PlantDiagram() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const surface = canvas.current;
    const page = surface?.parentElement;
    const ctx = surface?.getContext("2d");
    if (!surface || !page || !ctx) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = 0;
    let elapsed = 0;
    let lastPaint = 0;
    let width = innerWidth;
    let height = innerHeight;
    let stages: number[] = [];
    let dirty = true;
    let disposed = false;
    let activeOutput = "";
    let outputs: { id: string; x: number; y: number }[] = [];
    const drawingStock = document.createElement("canvas");
    let depth: ReturnType<typeof createProcessDepth>;
    let depthReading: ReadingArea[] = [];

    function measure() {
      if (disposed || !page!.isConnected) return;
      const sections = ["feed", "conditioning", "reaction", "separation", "feedback"].map(id => page!.querySelector<HTMLElement>(`#${id}`));
      if (sections.some(section => !section)) return;
      width = innerWidth;
      height = innerHeight;
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      surface!.width = width * ratio;
      surface!.height = height * ratio;
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
      stages = sections.map(section => section!.getBoundingClientRect().top - page!.getBoundingClientRect().top);
      const scale = width <= 900 ? 1 : Math.min(width / 1200, 1);
      const left = width <= 900 ? 0 : (width - 1200 * scale) / 2;
      const origin = page!.getBoundingClientRect();
      depth = createProcessDepth(width);
      depthReading = Array.from(page!.querySelectorAll<HTMLElement>(".plant-copy, .plant-close, .affiliation-logos")).map(element => {
        const r = element.getBoundingClientRect();
        return { x: r.left - origin.left, y: r.top - origin.top, w: r.width, h: r.height };
      });
      outputs = Array.from(page!.querySelectorAll<HTMLElement>("[data-process-output]")).map(link => {
        const rect = link.getBoundingClientRect();
        return { id: link.dataset.processOutput!, x: (rect.left - origin.left - left) / scale, y: (rect.top - origin.top + rect.height / 2) / scale };
      });
      // Cache the engineering paper once per layout, not on the animation clock.
      const reading = Array.from(page!.querySelectorAll<HTMLElement>(".plant-copy, .plant-close, .affiliation-logos")).map(element => {
        const rect = element.getBoundingClientRect();
        return { x: (rect.left - origin.left - left) / scale, y: (rect.top - origin.top) / scale, w: rect.width / scale, h: rect.height / scale };
      });
      paintProcessGrid(drawingStock, width <= 900 ? width : 1200, page!.scrollHeight / scale, reading);
      dirty = true;
    }

    function line(points: Point[], color: string, thickness = 1.4, dash: number[] = []) {
      ctx!.beginPath();
      points.forEach(([x, y], i) => i ? ctx!.lineTo(x, y) : ctx!.moveTo(x, y));
      ctx!.strokeStyle = color;
      ctx!.lineWidth = thickness;
      ctx!.lineJoin = "round";
      ctx!.setLineDash(dash);
      ctx!.stroke();
      ctx!.setLineDash([]);
    }

    function draw(time: number) {
      const context = ctx!;
      publishWaveFrame({ time, left: 0, top: 0, width, height, pixelsWide: width / 3, pixelsHigh: height / 3, scale: 78, cellSize: 1 });
      context.clearRect(0, 0, width, height);
      const top = page!.getBoundingClientRect().top;
      if (depth) drawProcessDepth(context, depth, width, height, top, time, preference.matches, depthReading);
      const mobile = width <= 900;
      const tablet = mobile && width >= 720;
      const scale = mobile ? 1 : Math.min(width / 1200, 1);
      const left = mobile ? 0 : (width - 1200 * scale) / 2;
      context.save();
      context.translate(left, top);
      context.scale(scale, scale);
      context.drawImage(drawingStock, 0, 0);
      const stage = stages.map(y => y / scale);
      const feed = 310;
      const heat = stage[1] + 310;
      const reaction = stage[2] + 340;
      const separation = stage[3] + 300;
      const outlet = stage[4] + 230;
      const spine = tablet ? width - 110 : mobile ? width - 27 : 885;
      const reactorX = mobile ? spine : 300;
      const firstTurn = stage[2] - 35;
      const secondTurn = stage[3] - 35;
      const points: Point[] = [[spine, 70], [spine, feed], [spine, heat], [spine, firstTurn], [reactorX, firstTurn], [reactorX, reaction], [reactorX, secondTurn], [spine, secondTurn], [spine, separation], [spine, outlet]];
      line(points, "#bbc6ce", mobile ? 1.4 : 2);
      const progressY = Math.max(70, Math.min(outlet, (height * .62 - top) / scale));
      const lengths = [0];
      for (let i = 1; i < points.length; i++) lengths.push(lengths[i - 1] + Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]));
      const anchors = [0, 1, 2, 5, 8, 9];
      let revealed = lengths[lengths.length - 1];
      for (let i = 1; i < anchors.length; i++) {
        const a = anchors[i - 1], b = anchors[i];
        if (progressY <= points[b][1]) {
          const fraction = (progressY - points[a][1]) / (points[b][1] - points[a][1]);
          revealed = lengths[a] + Math.max(0, fraction) * (lengths[b] - lengths[a]);
          break;
        }
      }
      function atDistance(distance: number): Point {
        for (let i = 1; i < lengths.length; i++) {
          if (distance <= lengths[i]) {
            const f = (distance - lengths[i - 1]) / (lengths[i] - lengths[i - 1] || 1);
            return [points[i - 1][0] + (points[i][0] - points[i - 1][0]) * f, points[i - 1][1] + (points[i][1] - points[i - 1][1]) * f];
          }
        }
        return points[points.length - 1];
      }
      const active = points.filter((_, i) => lengths[i] <= revealed);
      active.push(atDistance(revealed));
      if (active.length > 1) line(active, "#203858", mobile ? 2 : 2.5);

      // A recycle line closes the narrative, while instrument signals use dashes.
      if (!mobile) {
        line([[spine, outlet], [1165, outlet], [1165, 125], [spine, 125]], "#b0bcc5", 1.2, [5, 6]);
        context.fillStyle = "#667987";
        context.font = '14px "Instrument Sans", sans-serif';
        context.save(); context.translate(1188, heat); context.rotate(-Math.PI / 2); context.fillText("Learning / feedback", 0, 0); context.restore();
      }

      function equipment(path: Path2D, bounds: number[], seed: number) {
        const [x, y, w, h] = bounds;
        // Skip equipment outside the viewport; no offscreen stipple work.
        if ((y + h) * scale + top < -30 || y * scale + top > height + 30) return;
        if (!mobile) {
          context.fillStyle = "#cad4dc";
          for (let py = y - 50; py < y + h + 50; py += 4) {
            for (let px = x - 50; px < x + w + 50; px += 4) {
              const distance = Math.hypot((px - x - w / 2) / (w * .68), (py - y - h / 2) / (h * .65));
              if (distance > .85 && distance < 1.4 && bayer8(px / 4, py / 4) < (1.4 - distance) * .14) context.fillRect(px, py, 1.5, 1.5);
            }
          }
        }
        context.save();
        context.fillStyle = "#fbfaf8";
        context.fill(path);
        context.clip(path);
        const cell = mobile ? 3 : 3.5;
        for (let py = y; py < y + h; py += cell) {
          for (let px = x; px < x + w; px += cell) {
            const nx = (px - x) / w;
            const ny = (py - y) / h;
            const wave = .5 + .5 * Math.sin(nx * 4 + ny * 5 - time * .42 + seed);
            const shade = .06 + .36 * nx * nx + .20 * wave + .12 * ny;
            if (bayer8(Math.floor(px / cell), Math.floor(py / cell)) < shade) {
              context.fillStyle = nx > .7 ? "#71899d" : "#a1b1bd";
              context.fillRect(px, py, cell * .64, cell * .64);
            }
          }
        }
        context.restore();
        context.strokeStyle = "#587084";
        context.lineWidth = mobile ? 1.2 : 1.6;
        context.stroke(path);
      }

      function vessel(x: number, y: number, w: number, h: number, seed: number) {
        const p = new Path2D();
        p.roundRect(x - w / 2, y - h / 2, w, h, [w / 2, w / 2, w / 2, w / 2]);
        equipment(p, [x - w / 2, y - h / 2, w, h], seed);
      }
      function label(text: string, x: number, y: number) {
        if (mobile) return;
        context.fillStyle = "#536a7d";
        context.font = '14px "Instrument Sans", sans-serif';
        context.fillText(text, x, y);
      }
      function valve(x: number, y: number) {
        line([[x - 9, y - 9], [x + 9, y + 9], [x + 9, y - 9], [x - 9, y + 9], [x - 9, y - 9]], "#587084");
      }

      const w = tablet ? 92 : mobile ? 32 : 178;
      const h = tablet ? 170 : mobile ? 95 : 245;
      vessel(spine, feed, w, h, 1);
      if (!mobile) {
        line([[spine - 62, feed + h / 2 - 5], [spine - 62, feed + 146]], "#8b9eac");
        line([[spine + 62, feed + h / 2 - 5], [spine + 62, feed + 146]], "#8b9eac");
        line([[spine - 76, feed + 146], [spine - 48, feed + 146]], "#8b9eac");
        line([[spine + 48, feed + 146], [spine + 76, feed + 146]], "#8b9eac");
        label("Chemical engineering", spine - 150, feed - 154);
        label("Physical systems", spine + 112, feed + 4);
      }
      valve(spine, feed + h / 2 + 52);

      const exchanger = new Path2D();
      const hx = tablet ? 48 : mobile ? 19 : 102;
      const hy = tablet ? 65 : mobile ? 52 : 102;
      exchanger.ellipse(spine, heat, hx, hy, 0, 0, Math.PI * 2);
      equipment(exchanger, [spine - hx, heat - hy, hx * 2, hy * 2], 3);
      if (tablet) line([[spine - 30, heat - 35], [spine + 30, heat - 35], [spine - 30, heat], [spine + 30, heat + 35], [spine - 30, heat + 35]], "#7890a3", 1.2);
      if (!mobile) {
        line([[spine - 70, heat - 65], [spine + 50, heat - 65], [spine - 50, heat - 20], [spine + 50, heat + 20], [spine - 50, heat + 65], [spine + 70, heat + 65]], "#7890a3", 1.4);
        line([[spine - 170, heat - 25], [spine - 100, heat - 25]], "#a2b0bb");
        line([[spine + 100, heat + 25], [spine + 170, heat + 25]], "#a2b0bb");
        label("Automation / measurement", spine + 24, heat - 135);
        label("Process signals", spine + 124, heat - 62);
      }

      vessel(reactorX, reaction, tablet ? 108 : mobile ? 38 : 210, tablet ? 195 : mobile ? 120 : 280, 5);
      if (tablet) {
        line([[reactorX, reaction - 120], [reactorX, reaction + 40]], "#587084", 1.3);
        line([[reactorX - 24, reaction + 20], [reactorX + 24, reaction + 35], [reactorX + 24, reaction + 20], [reactorX - 24, reaction + 35]], "#587084", 1.2);
      }
      if (!mobile) {
        line([[reactorX, reaction - 175], [reactorX, reaction + 62]], "#587084", 1.8);
        line([[reactorX - 50, reaction + 36], [reactorX + 50, reaction + 60], [reactorX + 50, reaction + 36], [reactorX - 50, reaction + 60]], "#587084");
        line([[reactorX - 120, reaction - 60], [reactorX - 120, reaction + 100], [reactorX - 70, reaction + 152]], "#a6b5c0", 1.3);
        line([[reactorX + 120, reaction - 60], [reactorX + 120, reaction + 100], [reactorX + 70, reaction + 152]], "#a6b5c0", 1.3);
        label("Applied machine learning", reactorX - 205, reaction - 205);
        // A measured signal returns to the process, rather than ornamental wiring.
        line([[reactorX + 105, reaction - 75], [reactorX + 175, reaction - 75], [reactorX + 175, reaction - 255], [reactorX, reaction - 255], [reactorX, reaction - 175]], "#8ea1b0", 1, [4, 5]);
        const instrument = new Path2D(); instrument.arc(reactorX + 175, reaction - 175, 21, 0, Math.PI * 2);
        context.fillStyle = "#fbfaf8"; context.fill(instrument); context.strokeStyle = "#8ea1b0"; context.stroke(instrument);
        context.fillStyle = "#536a7d"; context.font = '12px "Instrument Sans", sans-serif'; context.fillText("ML", reactorX + 166, reaction - 171);
      }

      // The actual projects are outputs, with matching symbols and ordinary links.
      function outputMark(id: string, x: number, y: number, ink: string) {
        context.fillStyle = "#fbfaf8"; context.fillRect(x - 13, y - 13, 26, 26);
        context.fillStyle = ink;
        if (id === "p_psm") {
          line([[x - 7, y - 5], [x + 7, y - 5], [x, y + 7], [x - 7, y - 5]], ink, 1);
          [[-7, -5], [7, -5], [0, 7]].forEach(([dx, dy]) => context.fillRect(x + dx - 2, y + dy - 2, 4, 4));
        } else if (id === "p_yield") {
          line([[x - 9, y + 3], [x - 4, y + 3], [x, y - 7], [x + 4, y + 5], [x + 9, y - 1]], ink, 1.5);
        } else {
          [[-6, -6], [-2, -6], [2, -2], [-6, -2], [-2, 2], [6, 6], [6, 2]].forEach(([dx, dy]) => context.fillRect(x + dx, y + dy, 3, 3));
        }
      }
      outputs.forEach((output, index) => {
        const selected = activeOutput === output.id;
        const ink = selected ? "#203858" : "#8a9faf";
        if (!mobile) {
          const sourceY = reaction + (index - 1) * 50;
          const elbow = reactorX + 180 + index * 24;
          const branch: Point[] = [[reactorX + 105, sourceY], [elbow, sourceY], [elbow, output.y], [output.x - 16, output.y]];
          line(branch, ink, selected ? 2 : 1.2, selected ? [] : [2, 4]);
          outputMark(output.id, output.x - 45, output.y, ink);
          if (selected && !preference.matches) {
            const phase = .5 + .5 * Math.sin(time * 2.4);
            context.fillStyle = ink;
            context.fillRect(reactorX + 108 + phase * 40, sourceY - 2, 4, 4);
          }
        } else outputMark(output.id, spine, output.y, ink);
      });

      vessel(spine, separation, tablet ? 80 : mobile ? 34 : 138, tablet ? 215 : mobile ? 130 : 310, 7);
      if (tablet) for (let i = -3; i <= 3; i++) line([[spine - 33, separation + i * 23], [spine + 33, separation + i * 23]], "#9bafbe", 1);
      if (!mobile) {
        for (let i = -3; i <= 3; i++) line([[spine - 60, separation + i * 30], [spine + 60, separation + i * 30]], "#9bafbe", 1);
        line([[spine + 69, separation - 75], [spine + 155, separation - 75], [spine + 155, separation + 160], [spine, separation + 160]], "#a3b1bc");
        label("Writing / shared methods", spine + 20, separation - 190);
      }
      valve(spine, outlet - 50);
      line([[spine - 8, outlet - 12], [spine, outlet], [spine + 8, outlet - 12]], "#203858", 2);

      // Dithered packets travel only through the part revealed by scrolling.
      if (!preference.matches) {
        const total = lengths[lengths.length - 1];
        for (let d = (time * 35) % 90; d < total; d += 90) {
          if (d > revealed) break;
          const [x, y] = atDistance(d);
          context.fillStyle = "#203858";
          context.fillRect(x - 2, y - 2, 4, 4);
          context.fillStyle = "#a2b4c2";
          context.fillRect(x + 3, y + 3, 2, 2);
        }
      }
      context.restore();
    }

    function tick(now: number) {
      if (disposed) return;
      if (document.hidden) { frame = 0; previous = 0; return; }
      if (previous && !preference.matches) elapsed += Math.min(now - previous, 64) / 1000;
      previous = now;
      if (dirty || (!preference.matches && now - lastPaint > 40)) { draw(elapsed); dirty = false; lastPaint = now; }
      frame = preference.matches ? 0 : requestAnimationFrame(tick);
    }
    function requestDraw() { if (disposed) return; dirty = true; if (!frame && !document.hidden) frame = requestAnimationFrame(tick); }
    function resize() { measure(); requestDraw(); }
    function visibility() { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; previous = 0; } else requestDraw(); }
    function selectOutput(event: Event) {
      const target = event.type === "pointerout" || event.type === "focusout" ? (event as FocusEvent).relatedTarget : event.target;
      activeOutput = target instanceof Element ? target.closest<HTMLElement>("[data-process-output]")?.dataset.processOutput ?? "" : "";
      requestDraw();
    }
    measure(); requestDraw();
    const observer = new ResizeObserver(resize); observer.observe(page);
    document.fonts.ready.then(() => { if (!disposed) resize(); });
    addEventListener("resize", resize);
    addEventListener("scroll", requestDraw, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    preference.addEventListener("change", requestDraw);
    ["pointerover", "pointerout", "focusin", "focusout"].forEach(type => page.addEventListener(type, selectOutput));
    return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); removeEventListener("resize", resize); removeEventListener("scroll", requestDraw); document.removeEventListener("visibilitychange", visibility); preference.removeEventListener("change", requestDraw); ["pointerover", "pointerout", "focusin", "focusout"].forEach(type => page.removeEventListener(type, selectOutput)); };
  }, []);
  return <canvas ref={canvas} className="plant-canvas" aria-hidden="true" />;
}
