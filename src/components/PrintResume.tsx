"use client";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { DitherSweep } from "@/components/ui/dither-sweep";
import { Button } from "@/components/ui/button";
export default function PrintResume() {
  return (
    <Button
      variant="ghost"
      className="print-action sweep-target"
      type="button"
      onClick={() => window.print()}
    >
      <DitherSweep /><span className="sweep-label"><PixelIcon name="document" />Print / save as PDF</span>
    </Button>
  );
}
