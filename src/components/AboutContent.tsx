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
            I trained in {education.undergraduate.subject} at {education.shortInstitution},
            graduating in {education.undergraduate.year}. My work connects process
            control, manufacturing data and applied AI. As a {career.pcom.title} at PCOM,
            I develop microscopy analysis tools and graph-based molecular models.
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
