import { bayer8 } from "@/lib/wave-field";

const nodes = [[5, 6], [17, 4], [26, 13], [12, 19], [4, 18]];
const edges = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 4], [0, 3], [1, 3]];

/** A miniature network with ordered-dither halos; no separate canvas or clock. */
export function GraphMark() {
  return <svg className="graph-mark" viewBox="0 0 32 24" width="32" height="24"
    fill="currentColor" shapeRendering="crispEdges" aria-hidden="true" focusable="false">
    <g opacity=".45">{edges.map(([a, b]) => {
      const [x, y] = nodes[a];
      const [xx, yy] = nodes[b];
      const length = Math.hypot(xx - x, yy - y);
      return Array.from({ length: Math.floor(length / 3) }, (_, i) =>
        <rect key={`${a}-${b}-${i}`} x={Math.round(x + (xx - x) * i * 3 / length)}
          y={Math.round(y + (yy - y) * i * 3 / length)} width="1" height="1" />);
    })}</g>
    {nodes.map(([x, y], i) => <g key={i}>
      <g className={`graph-mark-halo graph-mark-phase-${i % 3}`}>
        {Array.from({ length: 49 }, (_, n) => {
          const dx = n % 7 - 3;
          const dy = Math.floor(n / 7) - 3;
          const radius = Math.hypot(dx, dy);
          return radius > 1.5 && radius < 3.5 && bayer8(dx + x, dy + y) < .65
            ? <rect key={n} x={x + dx} y={y + dy} width="1" height="1" /> : null;
        })}
      </g>
      <rect x={x - 1} y={y - 1} width="3" height="3" />
    </g>)}
  </svg>;
}
