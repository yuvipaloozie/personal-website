"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const DitherShader = dynamic(
  () => import("@/components/ui/dither-shader").then((module) => module.ShaderBackground),
  { ssr: false },
);

export default function AmbientResearch() {
  const pathname = usePathname();
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  if (pathname === "/graph") return null;

  return (
    <>
      <div className="ambient-research" aria-hidden="true">
        <div className="ambient-field">
          <DitherShader paused={paused || reduced} />
        </div>
        <div className="ambient-graph" />
      </div>
      {!reduced && (
        <Button
          variant="ghost"
          size="sm"
          className="ambient-control"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          aria-label={paused ? "Resume background motion" : "Pause background motion"}
        >
          {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          <span>{paused ? "Resume motion" : "Pause motion"}</span>
        </Button>
      )}
    </>
  );
}
