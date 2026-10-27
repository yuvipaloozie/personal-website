"use client";

import { useEffect, useRef, useState } from "react";

/** 21st.dev Silk Blend, using the supplied palette, stops and sway formula. */
export default function SilkGradient() {
  const surface = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const element = surface.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous: number | null = null;
    let visible = false;

    function draw(now: number) {
      if (previous !== null) elapsed.current += (now - previous) / 1000;
      previous = now;
      const t = elapsed.current;
      const ph = t * 0.63;
      const amt = 0.32;
      const dir = 1;
      const spin = ph * dir;
      // Zero modulation at t=0; retain fractional precision on every frame.
      const angle = 187 + Math.sin(spin * 0.6) * 24 * amt;
      element!.style.setProperty("--silk-angle", `${angle}deg`);
      frame = requestAnimationFrame(draw);
    }

    function sync() {
      cancelAnimationFrame(frame);
      previous = null;
      if (reduced.matches) {
        elapsed.current = 0;
        element!.style.setProperty("--silk-angle", "187deg");
      } else if (!paused && visible && !document.hidden) {
        frame = requestAnimationFrame(draw);
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [paused]);

  return (
    <div className="silk-band">
      <div ref={surface} className="silk-gradient" aria-hidden="true" />
      <button
        type="button"
        className="silk-motion-toggle"
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? "Resume motion" : "Pause motion"}
      </button>
    </div>
  );
}
