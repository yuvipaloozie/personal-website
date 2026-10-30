import type { Metadata } from "next";
import Link from "next/link";
import ProcessSurface from "@/components/ProcessSurface";
import { graphData } from "@/data/graphData";
import { education } from "@/lib/profile";
import TechnicalSkills from "@/components/TechnicalSkills";
import "@/styles/process-about-resume.css";

const employerMarks: Record<string, string> = {
  e_arclin: "icons/arclin",
  e_wood: "wood",
  e_alcon: "alcon",
  e_bayer: "bayer",
  e_bayer_2023: "bayer",
};
export const metadata: Metadata = {
  title: "Resume",
  description:
    "Education, experience, and technical background of Yuvraj Tripathy.",
};
export default function Resume() {
  const experience = graphData.nodes.filter(
    (node) => node.id.startsWith("e_") && node.details,
  );
  return (
    <ProcessSurface kind="resume">
      <header className="process-resume-header">
        <h1>Resume</h1>
      </header>
      <section className="process-resume-section" id="education" aria-labelledby="education-title">
        <h2 id="education-title">Education</h2>
        {[education.graduate, education.undergraduate].map(degree => (
          <div className="process-resume-entry" data-process-item key={degree.year}>
            <h3>{education.shortInstitution}</h3>
            <p>{degree.degree} · {degree.completion}</p>
          </div>
        ))}
      </section>
      <section className="process-resume-section" aria-labelledby="experience-title">
        <h2 id="experience-title">Experience</h2>
        <div className="resume-timeline">
        {experience.map((node) => {
          const [employer, dates] = node.details!.subtitle!.split(" | ");
          const mark = employerMarks[node.id];
          return (
          <article className="process-resume-entry resume-timeline-entry" key={node.id} data-process-item>
            <div className="resume-role">
            <h3 className="resume-role-heading">
              {mark && <span className={`resume-employer-mark resume-employer-mark-${node.id}`} aria-hidden="true" style={{ maskImage: `url(/logos/${mark}.svg)` }} />}
              {node.details!.link?.startsWith("/experience/") ? (
                <Link href={node.details!.link}>{node.details!.title}</Link>
              ) : (
                node.details!.title
              )}
            </h3>
            <p className="process-resume-meta">{employer}</p>
            <p>{node.details!.description}</p>
            </div>
            <p className="resume-date">{dates}</p>
          </article>
          );
        })}
        </div>
      </section>
      <section className="process-resume-section" aria-labelledby="technical-title">
        <h2 id="technical-title">Technical background</h2>
        <TechnicalSkills />
      </section>
    </ProcessSurface>
  );
}
