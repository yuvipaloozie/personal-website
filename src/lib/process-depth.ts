import { bayer8 } from "./wave-field";
import type { ReadingArea } from "./process-grid";

type Point = [number, number];
type DepthLayer = { canvas: HTMLCanvasElement; paths: Point[][]; height: number };

/** A separate utility circuit, drawn once; its depth comes from scroll, not blur. */
export function createProcessDepth(width: number): DepthLayer {
  const canvas = document.createElement("canvas");
  const height = 760;
  canvas.width = Math.ceil(width); canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const a = width * .09, b = width * .36, c = width * .67, d = width * .93;
  const paths: Point[][] = [
    [[d, 0], [d, 100], [b, 100], [b, 280], [a, 280], [a, 510], [c, 510], [c, 655], [d, 655], [d, height]],
    [[a, 0], [a, 185], [c, 185], [c, 385], [b, 385], [b, 600], [a, 600], [a, height]],
    [[width * .5, 100], [width * .5, 40], [d, 40]],
    [[b, 385], [b, 450], [d, 450], [d, 655]],
  ];
  ctx.strokeStyle = "#8da3b5"; ctx.fillStyle = "#8da3b5";
  ctx.lineWidth = 1.1;
  ctx.setLineDash([1.3, 3.2]);
  for (const path of paths) {
    ctx.beginPath(); path.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
  }
  ctx.setLineDash([]);
  const equipment = [[b, 210, 44, 86], [c, 330, 60, 100], [d, 550, 28, 72]];
  for (const [x, y, w, h] of equipment) {
    const outline = new Path2D(); outline.roundRect(x - w / 2, y - h / 2, w, h, w / 2);
    ctx.save(); ctx.clip(outline);
    for (let py = y - h / 2; py < y + h / 2; py += 3) for (let px = x - w / 2; px < x + w / 2; px += 3) {
      if (bayer8(Math.floor(px / 3), Math.floor(py / 3)) < .16 + .2 * (px - x + w / 2) / w) ctx.fillRect(px, py, 1.2, 1.2);
    }
    ctx.restore(); ctx.setLineDash([1.2, 2.8]); ctx.stroke(outline); ctx.setLineDash([]);
  }
  // Utility branches, instrument taps and a small exchanger all share the circuit.
  for (const [x, y] of [[b, 100], [c, 185], [b, 385], [c, 510], [d, 655]]) {
    ctx.fillRect(x - 2, y - 2, 4, 4);
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 24, y - 24); ctx.lineTo(x + 42, y - 24); ctx.stroke();
    ctx.beginPath(); ctx.arc(x + 50, y - 24, 8, 0, Math.PI * 2); ctx.stroke();
  }
  ctx.beginPath(); ctx.ellipse(a, 420, 22, 30, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(a - 13, 400); ctx.lineTo(a + 13, 410); ctx.lineTo(a - 13, 430); ctx.lineTo(a + 13, 440); ctx.stroke();
  return { canvas, paths, height };
}

export function drawProcessDepth(ctx: CanvasRenderingContext2D, layer: DepthLayer, width: number, height: number, pageTop: number, time: number, reduced: boolean, reading: ReadingArea[]) {
  const offset = reduced ? pageTop : pageTop * .32;
  const first = Math.floor(-offset / layer.height) - 1;
  const count = Math.ceil(height / layer.height) + 3;
  ctx.save();
  ctx.globalAlpha = width < 600 ? .16 : .22;
  for (let i = first; i < first + count; i++) {
    const top = offset + i * layer.height;
    ctx.drawImage(layer.canvas, 0, top);
    if (!reduced) {
      const path = layer.paths[0];
      const lengths = [0];
      for (let n = 1; n < path.length; n++) lengths.push(lengths[n - 1] + Math.hypot(path[n][0] - path[n - 1][0], path[n][1] - path[n - 1][1]));
      const distance = time * 24 % lengths[lengths.length - 1];
      const segment = lengths.findIndex(length => length >= distance);
      if (segment > 0) {
        const f = (distance - lengths[segment - 1]) / (lengths[segment] - lengths[segment - 1]);
        const a = path[segment - 1], b = path[segment];
        const x = a[0] + (b[0] - a[0]) * f, y = a[1] + (b[1] - a[1]) * f + top;
        ctx.fillStyle = "#58748a"; ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
      }
    }
  }
  // Keep the moving layer out of reading areas, independent of its scroll offset.
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = "destination-out"; ctx.fillStyle = "black";
  for (const area of reading) ctx.fillRect(area.x - 14, area.y + pageTop - 10, area.w + 28, area.h + 20);
  ctx.restore();
}
