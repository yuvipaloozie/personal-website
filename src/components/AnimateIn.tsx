import type { ReactNode, CSSProperties } from "react";
// Keep existing page wrappers without delaying content or shipping an animation runtime.
export default function AnimateIn({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
