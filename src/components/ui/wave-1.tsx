"use client";

import { DitheringShader } from "./dithering-shader";

export function Component({ paused = false }: { paused?: boolean }) {
  return <DitheringShader shape="wave" type="8x8" colorBack="#ffffff" colorFront="#111111" pxSize={2} speed={0.6} paused={paused} />;
}
