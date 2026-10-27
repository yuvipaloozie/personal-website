"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

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
    let previous = 0;
    let painted = 0;
    let elapsed = 0;

    function draw() {
      if (!still.width || !source.naturalWidth) return;
      const w = output!.width;
      const h = output!.height;
      context!.clearRect(0, 0, w, h);
      context!.drawImage(still, 0, 0);
      // Only the perimeter dissolves. The original colour and facial detail stay intact.
      const cell = 3;
      const band = Math.min(34, w * .16);
      for (let y = 0; y < h; y += cell) {
        for (let x = 0; x < w; x += cell) {
          const distance = Math.min(x, y, w - x - cell, h - y - cell);
          if (distance > band + 5) continue;
          const drift = Math.sin(elapsed * .65 + x * .025 + y * .018) * 5;
          const coverage = Math.max(0, Math.min(1, distance / (band + drift)));
          const threshold = (BAYER[((y / cell) % 4) * 4 + (x / cell) % 4] + .5) / 16;
          if (coverage < threshold) context!.clearRect(x, y, cell, cell);
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
      if (previous) elapsed += Math.min(now - previous, 100) / 1000;
      previous = now;
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
      previous = 0;
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
