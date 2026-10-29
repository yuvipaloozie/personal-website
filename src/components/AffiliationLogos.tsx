import Link from "next/link";
import type { CSSProperties } from "react";
import { DitherSweep } from "@/components/ui/dither-sweep";

const affiliations = [
  { name: "Arclin", mark: "arclin", href: "/experience/arclin", context: "experience" },
  { name: "Wood", mark: "wood", href: "/experience/wood-plc", context: "experience" },
  { name: "Bayer", mark: "bayer", href: "/experience/bayer", context: "experience" },
  { name: "Alcon", mark: "alcon", href: "/resume", context: "experience" },
  { name: "Georgia Tech", mark: "gatech", href: "/resume#education", context: "education" },
] as const;

export default function AffiliationLogos() {
  return (
    <ul className="affiliation-logos" aria-label="Work and education">
      <li className="affiliation-orbit" aria-hidden="true"><svg viewBox="0 0 240 240" fill="none"><circle cx="120" cy="120" r="82" /><circle cx="120" cy="120" r="108" /><path d="M116 116h3v3h-3zM122 119h3v3h-3zM119 125h3v3h-3z" /></svg></li>
      {affiliations.map(({ name, mark, href, context }, index) => (
        <li className="affiliation-node" key={mark} style={{ "--angle": `${index * 72 - 90}deg`, "--counter": `${90 - index * 72}deg` } as CSSProperties}>
          <Link href={href} className="affiliation-logo sweep-target" aria-label={`${name} — ${context}`}>
            <DitherSweep />
            <span className={`affiliation-mark affiliation-mark-${mark}`} aria-hidden="true" style={{ maskImage: `url(/logos/${mark === "bayer" ? "" : "icons/"}${mark}.svg)` }} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
