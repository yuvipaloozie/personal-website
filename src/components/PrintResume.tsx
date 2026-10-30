"use client";
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
      <DitherSweep /><span className="sweep-label">Print / save as PDF</span>
    </Button>
  );
}
