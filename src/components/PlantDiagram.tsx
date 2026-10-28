"use client";

import { useEffect, useRef } from "react";
import { bayer8 } from "@/lib/wave-field";

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
      context.clearRect(0, 0, width, height);
      const top = page!.getBoundingClientRect().top;
      const mobile = width <= 900;
      const scale = mobile ? 1 : Math.min(width / 1200, 1);
      const left = mobile ? 0 : (width - 1200 * scale) / 2;
      context.save();
      context.translate(left, top);
      context.scale(scale, scale);
      const stage = stages.map(y => y / scale);
      const feed = 310;
      const heat = stage[1] + 310;
      const reaction = stage[2] + 340;
      const separation = stage[3] + 300;
      const outlet = stage[4] + 230;
      const spine = mobile ? width - 27 : 885;
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
        context.save(); context.translate(1188, heat); context.rotate(-Math.PI / 2); context.fillText("Feedback / recycle", 0, 0); context.restore();
      }

      function equipment(path: Path2D, bounds: number[], seed: number) {
        const [x, y, w, h] = bounds;
        // Skip equipment outside the viewport; no offscreen stipple work.
        if ((y + h) * scale + top < -30 || y * scale + top > height + 30) return;
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

      const w = mobile ? 32 : 178;
      const h = mobile ? 95 : 245;
      vessel(spine, feed, w, h, 1);
      if (!mobile) {
        line([[spine - 62, feed + h / 2 - 5], [spine - 62, feed + 146]], "#8b9eac");
        line([[spine + 62, feed + h / 2 - 5], [spine + 62, feed + 146]], "#8b9eac");
        line([[spine - 76, feed + 146], [spine - 48, feed + 146]], "#8b9eac");
        line([[spine + 48, feed + 146], [spine + 76, feed + 146]], "#8b9eac");
        label("Feed vessel", spine - 90, feed - 154);
        label("V-101", spine + 112, feed + 4);
      }
      valve(spine, feed + h / 2 + 52);

      const exchanger = new Path2D();
      exchanger.ellipse(spine, heat, mobile ? 19 : 102, mobile ? 52 : 102, 0, 0, Math.PI * 2);
      equipment(exchanger, [spine - (mobile ? 19 : 102), heat - (mobile ? 52 : 102), mobile ? 38 : 204, mobile ? 104 : 204], 3);
      if (!mobile) {
        line([[spine - 70, heat - 65], [spine + 50, heat - 65], [spine - 50, heat - 20], [spine + 50, heat + 20], [spine - 50, heat + 65], [spine + 70, heat + 65]], "#7890a3", 1.4);
        line([[spine - 170, heat - 25], [spine - 100, heat - 25]], "#a2b0bb");
        line([[spine + 100, heat + 25], [spine + 170, heat + 25]], "#a2b0bb");
        label("Conditioning", spine - 102, heat - 135);
        label("E-201", spine + 124, heat - 62);
      }

      vessel(reactorX, reaction, mobile ? 38 : 210, mobile ? 120 : 280, 5);
      if (!mobile) {
        line([[reactorX, reaction - 175], [reactorX, reaction + 62]], "#587084", 1.8);
        line([[reactorX - 50, reaction + 36], [reactorX + 50, reaction + 60], [reactorX + 50, reaction + 36], [reactorX - 50, reaction + 60]], "#587084");
        line([[reactorX - 120, reaction - 60], [reactorX - 120, reaction + 100], [reactorX - 70, reaction + 152]], "#a6b5c0", 1.3);
        line([[reactorX + 120, reaction - 60], [reactorX + 120, reaction + 100], [reactorX + 70, reaction + 152]], "#a6b5c0", 1.3);
        label("Reaction / applied work", reactorX - 190, reaction - 205);
        label("R-301", reactorX + 143, reaction - 30);
        // A measured signal returns to the process, rather than ornamental wiring.
        line([[reactorX + 105, reaction - 75], [reactorX + 175, reaction - 75], [reactorX + 175, reaction - 255], [reactorX, reaction - 255], [reactorX, reaction - 175]], "#8ea1b0", 1, [4, 5]);
        const instrument = new Path2D(); instrument.arc(reactorX + 175, reaction - 175, 21, 0, Math.PI * 2);
        context.fillStyle = "#fbfaf8"; context.fill(instrument); context.strokeStyle = "#8ea1b0"; context.stroke(instrument);
        context.fillStyle = "#536a7d"; context.font = '12px "Instrument Sans", sans-serif'; context.fillText("TIC", reactorX + 164, reaction - 171);
      }

      vessel(spine, separation, mobile ? 34 : 138, mobile ? 130 : 310, 7);
      if (!mobile) {
        for (let i = -3; i <= 3; i++) line([[spine - 60, separation + i * 30], [spine + 60, separation + i * 30]], "#9bafbe", 1);
        line([[spine + 69, separation - 75], [spine + 155, separation - 75], [spine + 155, separation + 160], [spine, separation + 160]], "#a3b1bc");
        label("Separation / notes", spine + 100, separation - 190);
        label("C-401", spine + 95, separation - 110);
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
    measure(); requestDraw();
    const observer = new ResizeObserver(resize); observer.observe(page);
    addEventListener("resize", resize);
    addEventListener("scroll", requestDraw, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    preference.addEventListener("change", requestDraw);
    return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); removeEventListener("resize", resize); removeEventListener("scroll", requestDraw); document.removeEventListener("visibilitychange", visibility); preference.removeEventListener("change", requestDraw); };
  }, []);
  return <canvas ref={canvas} className="plant-canvas" aria-hidden="true" />;
}
