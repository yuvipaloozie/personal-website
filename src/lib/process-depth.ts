import { bayer8 } from "./wave-field";
import type { ReadingArea } from "./process-grid";

type Point = [number, number];
type Segment = { from: Point; to: Point; start: number; length: number };
type FlowRoute = { segments: Segment[]; length: number };
type DepthLayer = { canvas: HTMLCanvasElement; routes: FlowRoute[]; height: number };

function flowRoute(paths: Point[][]): FlowRoute {
  const segments: Segment[] = [];
  let length = 0;
  for (const path of paths) for (let i = 1; i < path.length; i++) {
    const from = path[i - 1], to = path[i];
    const distance = Math.hypot(to[0] - from[0], to[1] - from[1]);
    segments.push({ from, to, start: length, length: distance });
    length += distance;
  }
  return { segments, length };
}

/** Original connected process train: feed, pump, heat exchange, reaction and separation. */
export function createProcessDepth(width: number): DepthLayer {
  const canvas = document.createElement("canvas");
  const height = 1100;
  canvas.width = Math.ceil(width); canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const unit = Math.min(1, width / 760);
  const a = width * .1, b = width * .37, c = width * .66, d = width * .84;
  const utility = width * .96;
  const pumpRadius = 19 * unit, exchangerRadius = 32 * unit;
  const tankWidth = 70 * unit, reactorWidth = 86 * unit, columnWidth = 54 * unit;
  const pumpY = 260, exchangerY = 360;
  const tankTop = 70, tankBottom = 188, reactorTop = 478, reactorBottom = 640;
  const columnTop = 750, columnBottom = 948;

  // Each segment ends at a real nozzle; no pipe runs through an equipment outline.
  // The feed/product trunk meets the next tile at exactly the same x coordinate.
  const main: Point[][] = [
    [[a, 0], [a, tankTop]],
    [[a, tankBottom], [a, pumpY - pumpRadius]],
    [[a + pumpRadius, pumpY], [width * .23, pumpY], [width * .23, exchangerY], [b - exchangerRadius, exchangerY]],
    [[b + exchangerRadius, exchangerY], [c, exchangerY], [c, reactorTop]],
    [[c, reactorBottom], [c, 694], [d, 694], [d, columnTop]],
    [[d, columnBottom], [d, 1028], [a, 1028], [a, height]],
  ];
  const recycle: Point[][] = [
    [[d - columnWidth / 2, 852], [b, 852], [b, 558], [c - reactorWidth / 2, 558]],
  ];
  const utilities: Point[][] = [
    [[utility, 0], [utility, height]],
    [[utility, 304], [b, 304], [b, exchangerY - exchangerRadius]],
    [[b, exchangerY + exchangerRadius], [b, 420], [utility, 420]],
    [[utility, 518], [c + reactorWidth / 2, 518]],
    [[c + reactorWidth / 2, 602], [utility, 602]],
  ];
  function pipe(points: Point[], dashed = false, solid = false) {
    ctx.save(); ctx.beginPath(); ctx.moveTo(...points[0]);
    for (let i = 1; i < points.length - 1; i++) {
      const [ax, ay] = points[i - 1], [bx, by] = points[i], [cx, cy] = points[i + 1];
      const before = Math.hypot(bx - ax, by - ay), after = Math.hypot(cx - bx, cy - by);
      const r = Math.min(8 * unit, before / 2, after / 2);
      if (!before || !after) { ctx.lineTo(bx, by); continue; }
      ctx.lineTo(bx - (bx - ax) / before * r, by - (by - ay) / before * r);
      ctx.quadraticCurveTo(bx, by, bx + (cx - bx) / after * r, by + (cy - by) / after * r);
    }
    ctx.lineTo(...points[points.length - 1]);
    ctx.setLineDash(dashed ? [2, 4] : []);
    if (solid) { ctx.lineWidth = 3 * unit; ctx.stroke(); ctx.lineWidth = 1.2 * unit; ctx.strokeStyle = "#e4ebf0"; }
    ctx.stroke(); ctx.restore();
  }
  ctx.strokeStyle = "#7892a6"; ctx.fillStyle = "#7892a6";
  ctx.lineWidth = 1.15; ctx.lineJoin = "miter";
  main.forEach(path => pipe(path, false, true));
  recycle.forEach(path => pipe(path, false, true));
  ctx.strokeStyle = "#9aabba"; ctx.lineWidth = .9;
  utilities.forEach(path => pipe(path, true));

  // Stipple belongs to the equipment; outlines remain continuous and legible.
  function vessel(x: number, top: number, w: number, h: number, trays = false) {
    const outline = new Path2D();
    const cap = w * .18;
    outline.moveTo(x - w / 2, top + cap);
    outline.bezierCurveTo(x - w / 2, top - cap / 3, x + w / 2, top - cap / 3, x + w / 2, top + cap);
    outline.lineTo(x + w / 2, top + h - cap);
    outline.bezierCurveTo(x + w / 2, top + h + cap / 3, x - w / 2, top + h + cap / 3, x - w / 2, top + h - cap);
    outline.closePath();
    ctx.save(); ctx.clip(outline);
    ctx.fillStyle = "#8da3b5";
    for (let py = top; py < top + h; py += 3) for (let px = x - w / 2; px < x + w / 2; px += 3) {
      const nx = (px - x) / (w / 2);
      const light = Math.max(0, -.48 * nx + .82 * Math.sqrt(Math.max(0, 1 - nx * nx)));
      const density = .72 - light * .65;
      if (bayer8(Math.floor(px / 3), Math.floor(py / 3)) < density) ctx.fillRect(px, py, 1.8, 1.8);
    }
    ctx.restore();
    ctx.strokeStyle = "#7892a6"; ctx.lineWidth = .85; ctx.stroke(outline);
    ctx.beginPath(); ctx.ellipse(x, top + cap, w / 2, cap, 0, 0, Math.PI); ctx.stroke();
    if (trays) for (let y = top + 30; y < top + h - 20; y += 26) {
      pipe([[x - w / 2 + 6 * unit, y], [x + w / 2 - 6 * unit, y]]);
    }
  }
  vessel(a, tankTop, tankWidth, tankBottom - tankTop);
  vessel(c, reactorTop, reactorWidth, reactorBottom - reactorTop);
  vessel(d, columnTop, columnWidth, columnBottom - columnTop, true);

  // Pump suction at the top, discharge to the right; heat exchanger has four ports.
  ctx.beginPath(); ctx.arc(a, pumpY, pumpRadius, 0, Math.PI * 2); ctx.stroke();
  pipe([[a - pumpRadius * .45, pumpY + pumpRadius * .45], [a + pumpRadius * .5, pumpY], [a - pumpRadius * .45, pumpY - pumpRadius * .45]]);
  ctx.beginPath(); ctx.arc(b, exchangerY, exchangerRadius, 0, Math.PI * 2); ctx.stroke();
  pipe([[b - exchangerRadius * .7, exchangerY], [b - exchangerRadius * .35, exchangerY - exchangerRadius * .45], [b + exchangerRadius * .35, exchangerY + exchangerRadius * .45], [b + exchangerRadius * .7, exchangerY]]);
  // Agitator and jacket connections make the reactor distinct from a storage vessel.
  pipe([[c, reactorTop + 16], [c, reactorTop + 86], [c - reactorWidth * .2, reactorTop + 94], [c + reactorWidth * .2, reactorTop + 94]]);
  pipe([[c - reactorWidth * .2, reactorTop + 16], [c + reactorWidth * .2, reactorTop + 16]]);

  // Actual branch junctions and instrument impulse lines share the same circuit.
  for (const [x, y] of [[c, exchangerY], [d, 694], [b, 852]]) {
    ctx.fillStyle = "#7892a6"; ctx.fillRect(x - 1.8, y - 1.8, 3.6, 3.6);
    const r = 9 * unit, stem = 27 * unit;
    pipe([[x, y], [x, y - stem]]);
    ctx.beginPath(); ctx.arc(x, y - stem - r, r, 0, Math.PI * 2); ctx.stroke();
  }
  // Small flow arrows distinguish process direction from dashed utilities.
  for (const [x, y, direction] of [[a, 222, 1], [c, 440, 1], [d, 984, 1], [a, 1070, 1], [b, 710, -1]]) {
    const s = 4 * unit;
    pipe([[x - s, y - s * direction], [x, y], [x + s, y - s * direction]]);
  }
  return { canvas, routes: [flowRoute(main), flowRoute(recycle)], height };
}

export function drawProcessDepth(ctx: CanvasRenderingContext2D, layer: DepthLayer, width: number, height: number, pageTop: number, time: number, reduced: boolean, reading: ReadingArea[]) {
  const offset = reduced ? pageTop : pageTop * .32;
  const first = Math.floor(-offset / layer.height) - 1;
  const count = Math.ceil(height / layer.height) + 3;
  ctx.save();
  ctx.globalAlpha = width < 600 ? .2 : .27;
  for (let i = first; i < first + count; i++) {
    const top = offset + i * layer.height;
    ctx.drawImage(layer.canvas, 0, top);
    if (!reduced) layer.routes.forEach((route, routeIndex) => {
      const distance = (time * 24 + routeIndex * 137) % route.length;
      const segment = route.segments.find(segment => distance >= segment.start && distance < segment.start + segment.length);
      if (!segment) return;
      const f = (distance - segment.start) / segment.length;
      const x = segment.from[0] + (segment.to[0] - segment.from[0]) * f;
      const y = segment.from[1] + (segment.to[1] - segment.from[1]) * f + top;
      ctx.fillStyle = "#58748a"; ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
    });
  }
  // Clear only the depth layer beneath current reading positions.
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = "destination-out"; ctx.fillStyle = "black";
  for (const area of reading) ctx.fillRect(area.x - 14, area.y + pageTop - 10, area.w + 28, area.h + 20);
  ctx.restore();
}
