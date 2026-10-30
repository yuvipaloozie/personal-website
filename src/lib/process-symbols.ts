type Point = [number, number];

/** Shared connection grammar: solid process nozzles, dotted signals, square terminals. */
export function processPort(ctx: CanvasRenderingContext2D, x: number, y: number, vertical = true, small = false) {
  const half = small ? 4 : 7, stem = small ? 7 : 12;
  ctx.save(); ctx.translate(x, y); if (!vertical) ctx.rotate(Math.PI / 2);
  ctx.strokeStyle = "#71899d"; ctx.lineWidth = 1; ctx.setLineDash([]);
  ctx.beginPath(); ctx.moveTo(0, -stem); ctx.lineTo(0, stem);
  for (const offset of [-3, 3]) { ctx.moveTo(-half, offset); ctx.lineTo(half, offset); }
  ctx.stroke(); ctx.restore();
}

export function processSignal(ctx: CanvasRenderingContext2D, points: Point[], active = false) {
  if (points.length < 2) return;
  ctx.save(); ctx.strokeStyle = active ? "#203858" : "#91a5b7";
  ctx.fillStyle = ctx.strokeStyle; ctx.lineWidth = active ? 1.6 : 1;
  ctx.setLineDash(active ? [] : [2, 5]); ctx.beginPath();
  points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
  ctx.setLineDash([]);
  const [start, end] = [points[0], points[points.length - 1]];
  ctx.fillRect(start[0] - 2, start[1] - 2, 4, 4);
  ctx.fillStyle = "#fbfaf8"; ctx.fillRect(end[0] - 3, end[1] - 3, 6, 6);
  ctx.strokeRect(end[0] - 3, end[1] - 3, 6, 6); ctx.restore();
}
