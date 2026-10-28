"use client";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { DitherSweep } from "@/components/ui/dither-sweep";
export default function PrintResume() {
  return (
    <button
      className="btn print-action sweep-target sweep-on-dark"
      type="button"
      onClick={() => window.print()}
    >
      <DitherSweep /><span className="sweep-label"><PixelIcon name="document" />Print / save as PDF</span>
    </button>
  );
}
