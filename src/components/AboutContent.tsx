import FloatingPortrait from "@/components/FloatingPortrait";
import FavoriteMedia from "@/components/FavoriteMedia";
import ProcessSurface from "@/components/ProcessSurface";
import { career, education } from "@/lib/profile";
import "@/styles/process-about-resume.css";
export default function AboutContent() {
  return (
    <ProcessSurface kind="about">
      <section className="process-about-profile" aria-labelledby="about-title">
        <div className="process-about-biography">
          <h1 id="about-title">About</h1>
          <p>
            I’m Yuvraj, a {career.arclin.title} at {career.arclin.employer} and a graduate
            student in {education.graduate.subject} at {education.shortInstitution}.
          </p>
          <p>
            With a background in Chemical and Biomolecular Engineering, I work
            on applied machine learning and process safety. As a {career.pcom.title} at PCOM,
            I study deep learning methods for microscopy image analysis.
          </p>

        </div>
        <figure className="process-about-portrait">
          <FloatingPortrait width={248} height={310} />
        </figure>
      </section>
      <FavoriteMedia />

    </ProcessSurface>
  );
}
