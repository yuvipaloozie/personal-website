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
            <p className="plant-intro">Process engineering.<br />Applied machine learning.</p>
            <div className="plant-person">
              <FloatingPortrait width={112} height={136} preload />
              <p>{career.arclin.title} at {career.arclin.employer}.<br />{education.graduate.subject} graduate student at {education.shortInstitution}.</p>
            </div>
            <div className="plant-actions">
              <a href="#conditioning" className="sweep-target"><DitherSweep /><span className="sweep-label">Background <PixelIcon name="arrow" /></span></a>
              <Link href="/about">About me</Link>
            </div>
          </div>
        </section>

        <section className="plant-background" id="conditioning" aria-labelledby="plant-background-title">
          <div className="plant-copy">
            <h2 id="plant-background-title">Background</h2>
            <p>My background is in Chemical and Biomolecular Engineering. My work connects physical processes, automation, and data.</p>
            <div className="plant-background-details"><dl className="plant-career">
              <div><dt>{career.arclin.employer}</dt><dd>{career.arclin.title}</dd></div>
              <div><dt>Georgia Tech</dt><dd>{education.graduate.degree} · {education.graduate.completion}</dd></div>
              <div><dt>PCOM</dt><dd>Machine learning research · Biomedical imaging</dd></div>
            </dl>
            <AffiliationLogos /></div>
            <Link className="plant-text-link" href="/resume">Resume <PixelIcon name="arrow" /></Link>
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

        <section className="plant-close" id="feedback" aria-labelledby="plant-close-title">
          <h2 id="plant-close-title">Contact</h2>
          <div className="plant-actions"><a className="sweep-target" data-process-output="contact" href={`mailto:${profile.email}`}><DitherSweep /><span className="sweep-label">Get in touch <PixelIcon name="mail" /></span></a><Link href="/graph">Explore the knowledge graph</Link></div>
        </section>
      </div>
    </div>
  );
}
