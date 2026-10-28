import type { CSSProperties } from "react";
import { Pixels, PX_CELL_MS } from "./dither-sweep-navbar";

/** Reuse the supplied navbar's dissolve independently of its header layout. */
export function DitherSweep({ durationMs = 440 }: { durationMs?: number }) {
  return <span className="dither-sweep" aria-hidden="true"
    style={{ "--sweep-cell": `${PX_CELL_MS}ms` } as CSSProperties}>
    <Pixels sweepMs={Math.max(0, durationMs - PX_CELL_MS)} />
  </span>;
}
