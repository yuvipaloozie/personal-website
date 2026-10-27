// The portrait samples the same clock, coordinates and wave as the WebGL ground.
export const WAVE_GLSL = `
float waveField(vec2 p, float t) {
  float axis = p.y * 0.95 + 0.32 * sin(p.x * 1.9 + t * 0.45)
    + 0.12 * sin(p.x * 3.6 - t * 0.28);
  return 0.5 + 0.5 * sin(axis * 5.2 - t * 0.22);
}`;

type WaveFrame = { time: number; left: number; top: number; width: number; height: number; pixelsWide: number; pixelsHigh: number; scale: number; cellSize: number };
let frame: WaveFrame | null = null;
export function publishWaveFrame(value: WaveFrame) { frame = value; }
export function readWaveFrame() { return frame; }
export function waveField(x: number, y: number, time: number) {
  const axis = y * .95 + .32 * Math.sin(x * 1.9 + time * .45)
    + .12 * Math.sin(x * 3.6 - time * .28);
  return .5 + .5 * Math.sin(axis * 5.2 - time * .22);
}

const mod = (n: number, d: number) => ((n % d) + d) % d;
const bayer2 = (x: number, y: number) => mod(2 * mod(x, 2) + 3 * mod(y, 2), 4);
export function bayer8(x: number, y: number) {
  return (16 * bayer2(x, y) + 4 * bayer2(Math.floor(x / 2), Math.floor(y / 2))
    + bayer2(Math.floor(x / 4), Math.floor(y / 4)) + .5) / 64;
}

export function seededNoise(x: number, y: number, seed: number) {
  const value = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
  return value - Math.floor(value);
}
