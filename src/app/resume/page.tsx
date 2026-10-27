import type { Metadata } from "next";
import Link from "next/link";
import PrintResume from "@/components/PrintResume";
import { graphData } from "@/data/graphData";
export const metadata: Metadata = {
  title: "Curriculum vitae",
  description:
    "Education, experience, and technical background of Yuvraj Tripathy.",
};
export default function Resume() {
  const experience = graphData.nodes.filter(
    (node) => node.id.startsWith("e_") && node.details,
  );
  return (
    <div className="container section">
      <h1 className="page-title">Curriculum vitae</h1>
      <p className="page-intro">
        Yuvraj Tripathy · Atlanta, Georgia
        <br />
        <a href="mailto:yuvraj.tripathy@outlook.com">
          yuvraj.tripathy@outlook.com
        </a>
      </p>
      <PrintResume />
      <section className="cv-section">
        <h2>Education</h2>
        <h3>Georgia Institute of Technology</h3>
        <p>MSc. Data Science · Expected May 2027</p>
        <p>BSc. Chemical and Biomolecular Engineering · May 2024</p>
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
        <p>
          <strong>Data science & machine learning:</strong> Python, Pandas,
          NumPy, Scikit-learn, TensorFlow, PyTorch, SQL, time-series modeling,
          computer vision, NLP.
        </p>
        <p>
          <strong>Engineering & automation:</strong> DeltaV, Honeywell Experion,
          RSLogix 5000, SolidWorks, AutoCAD.
        </p>
        <p>
          <strong>Software:</strong> TypeScript, React, Next.js, FastAPI,
          Docker.
        </p>
      </section>
    </div>
  );
}
