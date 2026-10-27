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
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = frame.current;
    const output = canvas.current;
    if (!element || !output) return;
    const context = output.getContext("2d", { willReadFrequently: true });
    if (!context) return;
    const source = new window.Image();
    let disposed = false;

    function draw() {
      if (disposed || !source.naturalWidth) return;
      const bounds = element!.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      // Work on a small pixel grid; keep the underlying optimized photo visible.
      output!.width = Math.max(1, Math.ceil(bounds.width / 2));
      output!.height = Math.max(1, Math.ceil(bounds.height / 2));
      const scale = Math.max(output!.width / source.naturalWidth, output!.height / source.naturalHeight);
      const cropWidth = output!.width / scale;
      const cropHeight = output!.height / scale;
      context!.drawImage(source, (source.naturalWidth - cropWidth) / 2,
        (source.naturalHeight - cropHeight) / 2, cropWidth, cropHeight,
        0, 0, output!.width, output!.height);
      const pixels = context!.getImageData(0, 0, output!.width, output!.height);
      for (let y = 0; y < output!.height; y++) {
        for (let x = 0; x < output!.width; x++) {
          const offset = (y * output!.width + x) * 4;
          const threshold = (BAYER[(y % 4) * 4 + x % 4] + .5) / 16 - .5;
          for (let channel = 0; channel < 3; channel++) {
            const level = Math.round(pixels.data[offset + channel] / 255 * 5 + threshold);
            pixels.data[offset + channel] = Math.max(0, Math.min(5, level)) / 5 * 255;
          }
        }
      }
      context!.putImageData(pixels, 0, 0);
      setReady(true);
    }

    source.onload = draw;
    source.src = "/profile.jpg";
    const resize = new ResizeObserver(draw);
    resize.observe(element);
    const visibility = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    visibility.observe(element);
    return () => {
      disposed = true;
      resize.disconnect();
      visibility.disconnect();
      source.onload = null;
    };
  }, []);

  return (
    <div ref={frame} className="portrait-frame floating-portrait" data-active={active}>
      <Image src="/profile.jpg" alt="Yuvraj Tripathy" width={width} height={height}
        sizes="(max-width: 600px) 148px, (max-width: 760px) 185px, 248px" preload={preload} />
      <canvas ref={canvas} className="portrait-dither" aria-hidden="true" data-ready={ready} />
    </div>
  );
}
