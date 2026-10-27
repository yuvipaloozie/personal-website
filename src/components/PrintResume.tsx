"use client";
import { PixelIcon } from "@/components/ui/pixel-icon";
export default function PrintResume() {
  return (
    <button
      className="btn print-action"
      type="button"
      onClick={() => window.print()}
    >
      <PixelIcon name="document" />Print / save as PDF
    </button>
  );
}
