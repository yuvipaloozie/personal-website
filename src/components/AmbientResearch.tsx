"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const DitherShader = dynamic(
  () => import("@/components/ui/wave-1").then((module) => module.Component),
  { ssr: false },
);

export default function AmbientResearch() {
  const pathname = usePathname();
  const [reduced, setReduced] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    const updateVisibility = () => setHidden(document.hidden);
    updateVisibility();
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  if (pathname === "/graph" || pathname === "/plant") return null;

  return (
    <>
      <div className="ambient-research" aria-hidden="true" data-paused={reduced || hidden}>
        <div className="ambient-field">
          <DitherShader paused={reduced || hidden} />
        </div>
      </div>
    </>
  );
}
