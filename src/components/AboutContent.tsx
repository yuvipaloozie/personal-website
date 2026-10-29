import FloatingPortrait from "@/components/FloatingPortrait";
import ProcessSurface from "@/components/ProcessSurface";
import Link from "next/link";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { career, education, profile } from "@/lib/profile";
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
          <p className="process-about-actions">
            <Link href="/resume"><PixelIcon name="document" />Resume</Link>
            <a href={`mailto:${profile.email}`}><PixelIcon name="mail" />Get in touch</a>
          </p>
        </div>
        <figure className="process-about-portrait">
          <FloatingPortrait width={248} height={310} />
        </figure>
      </section>
      <section className="process-about-foundation" aria-labelledby="foundation-title">
        <h2 id="foundation-title">Background</h2>
        <ol className="process-about-path">
          <li data-process-item>
            <Link href="/resume#education">
              <span className="process-about-path-title">Chemical engineering</span>
              <span>{education.shortInstitution}</span>
              <PixelIcon name="arrow" />
            </Link>
          </li>
          <li data-process-item>
            <Link href="/experience/arclin">
              <span className="process-about-path-title">Automation</span>
              <span>{career.arclin.employer}</span>
              <PixelIcon name="arrow" />
            </Link>
          </li>
          <li data-process-item>
            <Link href="/experience/pcom-research">
              <span className="process-about-path-title">Applied machine learning</span>
              <span>PCOM research</span>
              <PixelIcon name="arrow" />
            </Link>
          </li>
        </ol>
      </section>
    </ProcessSurface>
  );
}
