"use client";

import { ShaderBackground, type ShaderBackgroundProps } from "./dither-shader";

export interface DitheringShaderProps extends ShaderBackgroundProps {
  shape?: "wave";
  type?: "8x8";
}

/** Grayscale-capable implementation of the wave API in the supplied demo. */
export function DitheringShader(props: DitheringShaderProps) {
  const { className, paused, colorBack, colorFront, pxSize, speed } = props;
  return <ShaderBackground className={className} paused={paused} colorBack={colorBack} colorFront={colorFront} pxSize={pxSize} speed={speed} />;
}
