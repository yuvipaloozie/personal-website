"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { bayer8, readWaveFrame, seededNoise, waveField } from "@/lib/wave-field";

export default function FloatingPortrait({ width, height, preload = false }: {
  width: number;
  height: number;
  preload?: boolean;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = frame.current;
    const output = canvas.current;
    if (!element || !output) return;
    const context = output.getContext("2d");
    const still = document.createElement("canvas");
    const photo = still.getContext("2d");
    if (!context || !photo) return;
    const source = new window.Image();
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ambient = document.querySelector(".ambient-research");
    let disposed = false;
    let visible = false;
    let request = 0;
    let painted = 0;
    // One random arrangement per mount, interpolated slowly rather than flickering.
    const seed = Math.random() * 1000;

    function draw() {
      if (!still.width || !source.naturalWidth) return;
      const w = output!.width;
      const h = output!.height;
      context!.clearRect(0, 0, w, h);
      context!.drawImage(still, 0, 0);
      const wave = readWaveFrame();
      const time = wave?.time ?? 0;
      const bounds = element!.getBoundingClientRect();
      // Match the ground's pixel grid, including its density and pixel budget.
      const cell = wave ? wave.cellSize * wave.width / wave.pixelsWide : 2;
      const originX = wave ? wave.left : 0;
      const originY = wave ? wave.top + wave.height : 0;
      const startX = Math.floor((bounds.left - originX) / cell) * cell + originX - bounds.left;
      const startY = Math.floor((bounds.top - originY) / cell) * cell + originY - bounds.top;
      const epoch = Math.floor(time * .32);
      const fraction = time * .32 - epoch;
      const blend = fraction * fraction * (3 - 2 * fraction);
      for (let y = startY; y < h; y += cell) {
        for (let x = startX; x < w; x += cell) {
          const nx = (x + cell / 2 - w / 2) / (w * .5);
          const ny = (y + cell / 2 - h / 2) / (h * .5);
          const radius = Math.hypot(nx, ny);
          if (radius < .57) continue; // Keep the face and core photograph untouched.
          const screenX = bounds.left + x + cell / 2;
          const screenY = bounds.top + y + cell / 2;
          const px = wave ? (screenX - wave.left - wave.width / 2) / Math.min(wave.width, wave.height) * wave.scale : nx;
          const py = wave ? (wave.top + wave.height / 2 - screenY) / Math.min(wave.width, wave.height) * wave.scale : -ny;
          const field = waveField(px, py, time);
          const angle = Math.atan2(ny, nx);
          const contour = .025 * Math.sin(angle * 3 + seed + time * .21)
            + .02 * Math.sin(angle * 7 - time * .17) + (field - .5) * .13;
          const fade = Math.max(0, Math.min(1, (radius - .61 - contour) / .43));
          const coverage = 1 - fade * fade * (3 - 2 * fade);
          const gx = Math.floor((screenX - originX) / cell);
          const gy = Math.floor((originY - screenY) / cell);
          const random = seededNoise(gx, gy, seed + epoch) * (1 - blend)
            + seededNoise(gx, gy, seed + epoch + 1) * blend;
          const threshold = .55 * bayer8(gx, gy) + .45 * random;
          // Rasterize shared cell boundaries to whole pixels so transparent cells
          // leave no antialiased hairlines in the dissolved corners.
          if (coverage < threshold) context!.clearRect(Math.round(x), Math.round(y),
            Math.round(x + cell) - Math.round(x), Math.round(y + cell) - Math.round(y));
        }
      }
    }

    function running() {
      return !disposed && visible && !document.hidden && !preference.matches
        && ambient?.getAttribute("data-paused") !== "true";
    }

    function tick(now: number) {
      request = 0;
      if (!running()) return;
      // Bound image work to 12fps; the photographic centre never changes.
      if (now - painted >= 1000 / 12) {
        draw();
        painted = now;
      }
      request = requestAnimationFrame(tick);
    }

    function sync() {
      cancelAnimationFrame(request);
      request = 0;
      if (running()) request = requestAnimationFrame(tick);
    }

    function resize() {
      if (disposed || !source.naturalWidth) return;
      const bounds = element!.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      output!.width = still.width = Math.round(bounds.width);
      output!.height = still.height = Math.round(bounds.height);
      const scale = Math.max(still.width / source.naturalWidth, still.height / source.naturalHeight);
      const cropWidth = still.width / scale;
      const cropHeight = still.height / scale;
      photo!.drawImage(source, (source.naturalWidth - cropWidth) / 2,
        (source.naturalHeight - cropHeight) / 2, cropWidth, cropHeight,
        0, 0, still.width, still.height);
      draw();
      setReady(true);
      sync();
    }

    source.onload = resize;
    source.src = "/profile.jpg";
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(element);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    visibility.observe(element);
    const pauseObserver = new MutationObserver(sync);
    if (ambient) pauseObserver.observe(ambient, { attributes: true, attributeFilter: ["data-paused"] });
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      cancelAnimationFrame(request);
      sizeObserver.disconnect();
      visibility.disconnect();
      pauseObserver.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      source.onload = null;
    };
  }, []);

  return (
    <div ref={frame} className="portrait-frame edge-portrait" data-ready={ready}>
      <Image src="/profile.jpg" alt="Yuvraj Tripathy" width={width} height={height}
        sizes="(max-width: 600px) 148px, (max-width: 760px) 185px, 248px" preload={preload} />
      <canvas ref={canvas} className="portrait-dither" aria-hidden="true" />
    </div>
  );
}
