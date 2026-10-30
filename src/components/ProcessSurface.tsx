import type { ReactNode } from "react";
import ProcessBackdrop, { type ProcessKind } from "./ProcessBackdrop";

export default function ProcessSurface({ kind, children }: { kind: ProcessKind; children: ReactNode }) {
  return <div className={`process-page process-${kind}`}>
    <ProcessBackdrop kind={kind} />
    <div className="process-content">{children}</div>
  </div>;
}
