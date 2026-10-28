import FloatingPortrait from "@/components/FloatingPortrait";
import Link from "next/link";
import { PixelIcon } from "@/components/ui/pixel-icon";
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
            With a background in Chemical and Biomolecular Engineering, I work
            on applied machine learning and process safety. As a {career.pcom.title} at PCOM,
            I study deep learning methods for microscopy image analysis.
          </p>
          <p className="profile-actions">
            <Link href="/resume"><PixelIcon name="document" />Resume</Link>
            <a href={`mailto:${profile.email}`}><PixelIcon name="mail" />Get in touch</a>
          </p>
        </div>
        <figure>
          <FloatingPortrait width={248} height={310} />
        </figure>
      </section>
    </div>
  );
}
