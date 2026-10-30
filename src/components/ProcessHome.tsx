import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import FloatingPortrait from "@/components/FloatingPortrait";
import PlantDiagram from "@/components/PlantDiagram";
import AffiliationLogos from "@/components/AffiliationLogos";
import { DitherSweep } from "@/components/ui/dither-sweep";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { career, education, profile } from "@/lib/profile";
import { projectPreviews } from "@/lib/project-previews";
import { graphData } from "@/data/graphData";

export default function PlantPage() {
  const projects = ["p_psm", "p_yield", "p_chana"].map(id => graphData.nodes.find(n => n.id === id)!);
  const writing = graphData.nodes.filter(n => n.id.startsWith("b_")).slice(0, 3);
  return (
    <div className="plant-page">
      <PlantDiagram />
      <div className="plant-content">
        <section className="plant-hero" id="feed" aria-labelledby="plant-name">
          <div className="plant-copy">
            <h1 id="plant-name">Yuvraj<br />Tripathy</h1>
            <p className="plant-intro">{profile.headline}</p>
            <div className="plant-person">
              <FloatingPortrait width={112} height={136} preload />
              <p>{career.arclin.title} at {career.arclin.employer}.<br />Process control and ML for manufacturing.</p>
            </div>
            <div className="plant-background-details" id="conditioning">
              <div className="plant-background-summary">
                <p>{profile.introduction}</p>
                <dl className="plant-education">
                  {[education.undergraduate, education.graduate].map(degree => <div key={degree.year}>
                    <dt>{education.shortInstitution}</dt>
                    <dd>{degree.degree}<br />{degree === education.graduate ? "Expected " : ""}{degree.year}</dd>
                  </div>)}
                </dl>
              </div>
              <AffiliationLogos />
            </div>
            <div className="plant-actions">
              <Link href="/about" className="sweep-target"><DitherSweep /><span className="sweep-label">About me <PixelIcon name="arrow" /></span></Link>
              <Link href="/resume" className="sweep-target"><DitherSweep /><span className="sweep-label">Resume <PixelIcon name="arrow" /></span></Link>
            </div>
          </div>
        </section>

        <section className="plant-projects" id="reaction" aria-labelledby="plant-projects-title">
          <div className="plant-copy">
            <h2 id="plant-projects-title">Selected projects</h2>
            <div className="plant-project-list">
              {projects.map(node => <article key={node.id}>
                <a href={node.details!.github!} target="_blank" rel="noreferrer" aria-label={`${projectPreviews[node.id].title} on GitHub, opens in a new tab`} data-process-output={node.id} className="plant-project-link sweep-target">
                  <DitherSweep /><span className="sweep-label">{projectPreviews[node.id].title}<FaGithub aria-hidden="true" /></span>
                </a>
                <p>{projectPreviews[node.id].summary}</p>
              </article>)}
            </div>
            <Link className="plant-text-link" href="/projects">All projects <PixelIcon name="arrow" /></Link>
          </div>
        </section>

        <section className="plant-writing" id="separation" aria-labelledby="plant-writing-title">
          <div className="plant-copy">
            <h2 id="plant-writing-title">Blog</h2>
            <ul>{writing.map(node => <li key={node.id}><Link href={node.details!.link!}>{node.details!.title}<PixelIcon name="arrow" /></Link></li>)}</ul>
            <Link className="plant-text-link" href="/blog">All posts <PixelIcon name="arrow" /></Link>
          </div>
        </section>

        <div className="plant-outlet" id="feedback" aria-hidden="true" />
      </div>
    </div>
  );
}
