import Link from "next/link";
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
      <li className="affiliation-network" aria-hidden="true"><svg viewBox="0 0 230 270" fill="none"><path d="M63 72 84 105M146 99 121 116M87 157 65 191M119 153 163 200M106 220 149 220" /><path className="affiliation-junctions" d="M79 96h3v3h-3zM134 106h3v3h-3zM74 174h3v3h-3zM141 178h3v3h-3zM126 219h3v3h-3z" /></svg></li>
      {affiliations.map(({ name, mark, href, context }) => (
        <li className={`affiliation-node affiliation-node-${mark}`} key={mark}>
          <Link href={href} className="affiliation-logo sweep-target" aria-label={`${name} — ${context}`}>
            <DitherSweep />
            <span className={`affiliation-mark affiliation-mark-${mark}`} aria-hidden="true" style={{ maskImage: `url(/logos/${["bayer", "wood", "alcon"].includes(mark) ? "" : "icons/"}${mark}.svg)` }} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
