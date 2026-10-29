import { seededNoise } from "./wave-field";

export type ReadingArea = { x: number; y: number; w: number; h: number };

/** Shared drawing stock, cached by callers whenever the page geometry changes. */
export function paintProcessGrid(canvas: HTMLCanvasElement, width: number, height: number, reading: ReadingArea[]) {
  canvas.width = Math.ceil(width);
  canvas.height = Math.ceil(height);
  const stock = canvas.getContext("2d");
  if (!stock) return;
  stock.fillStyle = "#a9bac8";
  for (let y = 0; y < height; y += 4) {
    for (let x = 0; x < width; x += 4) {
      const axis = x % 64 === 0 || y % 64 === 0;
      const noise = seededNoise(x, y, 19);
      if (axis ? noise > .76 : noise < .997) continue;
      let clearance = 1;
      for (const rect of reading) {
        const dx = Math.max(rect.x - x, 0, x - rect.x - rect.w);
        const dy = Math.max(rect.y - y, 0, y - rect.y - rect.h);
        clearance = Math.min(clearance, Math.min(1, Math.hypot(dx, dy) / 28));
      }
      if (clearance < .03) continue;
      stock.globalAlpha = (axis ? .34 : .17) * clearance;
      const dot = x % 64 === 0 && y % 64 === 0 ? 2.6 : 1.35;
      stock.fillRect(x, y, dot, dot);
    }
  }
}
