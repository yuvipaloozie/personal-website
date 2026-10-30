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
      <li className="affiliation-network" aria-hidden="true"><svg viewBox="0 0 230 270" fill="none"><path className="affiliation-shell" d="M4 52C4 -1 226 -1 226 52V218C226 271 4 271 4 218Z" /><path className="affiliation-pipes" d="M110 0V12M110 258V270M226 136H230" /><path d="M63 72V91H84V105M146 99H132V116H121M87 157V174H65V191M119 153H142V181H163V200M106 220H149" /><path className="affiliation-junctions" d="M82 89h4v4h-4zM130 114h4v4h-4zM63 172h4v4h-4zM140 179h4v4h-4zM126 218h4v4h-4z" /></svg></li>
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
