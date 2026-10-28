import type { Metadata } from "next";
import Link from "next/link";
import PrintResume from "@/components/PrintResume";
import { graphData } from "@/data/graphData";
import { education, profile, technicalSkills } from "@/lib/profile";
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
    <div className="container section">
      <h1 className="page-title">Resume</h1>
      <p className="page-intro">
        {profile.name} · {profile.location}
        <br />
        <a href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </p>
      <PrintResume />
      <section className="cv-section">
        <h2>Education</h2>
        <h3>{education.institution}</h3>
        <p>{education.graduate.degree} · {education.graduate.completion}</p>
        <p>{education.undergraduate.degree} · {education.undergraduate.completion}</p>
      </section>
      <section className="cv-section">
        <h2>Experience</h2>
        {experience.map((node) => (
          <article className="cv-role" key={node.id}>
            <h3>
              {node.details!.link?.startsWith("/experience/") ? (
                <Link href={node.details!.link}>{node.details!.title}</Link>
              ) : (
                node.details!.title
              )}
            </h3>
            <p>{node.details!.subtitle}</p>
            <p>{node.details!.description}</p>
          </article>
        ))}
      </section>
      <section className="cv-section">
        <h2>Technical background</h2>
        {technicalSkills.map(({ area, tools }) => (
          <p key={area}><strong>{area}:</strong> {tools}</p>
        ))}
      </section>
    </div>
  );
}
