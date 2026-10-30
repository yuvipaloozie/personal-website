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
      <li className="affiliation-network" aria-hidden="true">
        <svg viewBox="0 0 230 270" fill="none">
          <path className="affiliation-manifold" d="M220 28V240M72 48H80Q88 48 88 40V36Q88 28 96 28H220M208 68H220M128 132H230M104 218H126Q134 218 134 210V198Q134 190 142 190H220M204 220H220" />
          <path className="affiliation-junctions" d="M217 81h6v6h-6zM217 129h6v6h-6zM217 187h6v6h-6zM217 217h6v6h-6z" />
        </svg>
      </li>
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
