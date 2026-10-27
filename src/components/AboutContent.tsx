import FloatingPortrait from "@/components/FloatingPortrait";
import Link from "next/link";
import { career, education, profile } from "@/lib/profile";
export default function AboutContent() {
  return (
    <div className="container section">
      <section className="about-profile">
        <div className="prose">
          <h1>About</h1>
          <p>
            I’m Yuvraj, a {career.arclin.title} at {career.arclin.employer} and a graduate
            student in {education.graduate.subject} at {education.shortInstitution}.
          </p>
          <p>
            My foundation is in Chemical and Biomolecular Engineering. That
            background shapes how I approach machine learning: understand the
            physical system, the assumptions behind a measurement, and the
            decisions a model will inform.
          </p>
          <p>
            My projects span process safety knowledge graphs, semiconductor
            sensor analysis, and biomedical computer vision. As a {career.pcom.title} at PCOM, I work
            on deep learning methods for microscopy image analysis.
          </p>
          <p>
            This site brings together those projects and the technical ideas
            that connect them.
          </p>
          <p>
            <Link href="/resume">Curriculum vitae</Link> ·{" "}
            <a href={`mailto:${profile.email}`}>Get in touch</a>
          </p>
        </div>
        <figure>
          <FloatingPortrait width={248} height={310} />
        </figure>
      </section>
    </div>
  );
}
