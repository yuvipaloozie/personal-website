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
      {affiliations.map(({ name, mark, href, context }) => (
        <li key={mark}>
          <Link href={href} className="affiliation-logo sweep-target" aria-label={`${name} — ${context}`}>
            <DitherSweep />
            <span className={`affiliation-mark affiliation-mark-${mark}`} aria-hidden="true" style={{ maskImage: `url(/logos/${mark}.svg)` }} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
