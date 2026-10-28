"use client";

import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { pixelOrder, PX_CELL_MS } from "./dither-sweep-navbar";

/** Reuse the supplied navbar's dissolve independently of its header layout. */
export function DitherSweep({ durationMs = 520 }: { durationMs?: number }) {
  const frame = useRef<HTMLSpanElement>(null);
  const [columns, setColumns] = useState(12);
  useLayoutEffect(() => {
    const target = frame.current?.parentElement;
    if (!target) return;
    const resize = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      // Fit the full sweep to each control instead of clipping its leading columns.
      if (height) setColumns(Math.max(6, Math.min(36, Math.round(width / height * 6))));
    });
    resize.observe(target);
    return () => resize.disconnect();
  }, []);
  const order = useMemo(() => pixelOrder(columns, 6), [columns]);
  return <span ref={frame} className="dither-sweep" aria-hidden="true"
    style={{ "--sweep-cell": `${PX_CELL_MS}ms`, "--sweep-cols": columns } as CSSProperties}>
    <span className="dsn-px">{order.map((rank, i) => <i key={i}
      style={{ "--dsn-d": `${Math.round(rank * Math.max(0, durationMs - PX_CELL_MS))}ms` } as CSSProperties} />)}</span>
  </span>;
}
