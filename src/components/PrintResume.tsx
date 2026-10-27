"use client";
export default function PrintResume() {
  return (
    <button
      className="btn print-action"
      type="button"
      onClick={() => window.print()}
    >
      Print / save as PDF
    </button>
  );
}
