import type { Metadata } from "next";
import Link from "next/link";
import PrintResume from "@/components/PrintResume";
import ProcessSurface from "@/components/ProcessSurface";
import { graphData } from "@/data/graphData";
import { education, profile, technicalSkills } from "@/lib/profile";
import "@/styles/process-about-resume.css";
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
        <p className="process-resume-contact">
          {profile.name} · {profile.location}
          <br />
          <a href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </p>
        <PrintResume />
      </header>
      <section className="process-resume-section" id="education" aria-labelledby="education-title">
        <h2 id="education-title">Education</h2>
        <div className="process-resume-entry" data-process-item>
          <h3>{education.institution}</h3>
          <p>{education.graduate.degree} · {education.graduate.completion}</p>
          <p>{education.undergraduate.degree} · {education.undergraduate.completion}</p>
        </div>
      </section>
      <section className="process-resume-section" aria-labelledby="experience-title">
        <h2 id="experience-title">Experience</h2>
        {experience.map((node) => (
          <article className="process-resume-entry" key={node.id} data-process-item>
            <h3>
              {node.details!.link?.startsWith("/experience/") ? (
                <Link href={node.details!.link}>{node.details!.title}</Link>
              ) : (
                node.details!.title
              )}
            </h3>
            <p className="process-resume-meta">{node.details!.subtitle}</p>
            <p>{node.details!.description}</p>
          </article>
        ))}
      </section>
      <section className="process-resume-section" aria-labelledby="technical-title">
        <h2 id="technical-title">Technical background</h2>
        <dl className="process-resume-skills">
          {technicalSkills.map(({ area, tools }) => (
            <div key={area} data-process-item>
              <dt>{area}</dt>
              <dd>{tools}</dd>
            </div>
          ))}
        </dl>
      </section>
    </ProcessSurface>
  );
}
