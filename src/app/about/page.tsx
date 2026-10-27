import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Yuvraj Tripathy: process automation engineer, Georgia Tech graduate student, and applied machine learning researcher.",
};
export default function About() {
  return (
    <div className="container section case-study">
      <p className="eyebrow">A little background</p>
      <h1>
        I like understanding how things work.
        <br />
        Then making them work better.
      </h1>
      <p className="summary">
        I’m Yuvraj, an engineer working where physical systems meet data and
        software.
      </p>
      <Image
        src="/profile.jpg"
        alt="Yuvraj Tripathy"
        width={240}
        height={270}
        style={{ objectFit: "cover", borderRadius: 3, marginBottom: 20 }}
      />
      <section>
        <h2>From chemical engineering to data science</h2>
        <p>
          My foundation is in Chemical and Biomolecular Engineering at Georgia
          Tech. That training taught me to think in systems: inputs,
          constraints, interactions, and what happens when something changes.
          I’m now pursuing graduate study in Data Science, building on that
          foundation with machine learning and statistical modeling.
        </p>
      </section>
      <section>
        <h2>Building with domain context</h2>
        <p>
          At Wood, my work centers on process automation and engineering
          workflows. In my projects, I explore how software can make technical
          information easier to use—from connecting safety documents in a
          knowledge graph to interpreting manufacturing sensor data.
        </p>
      </section>
      <section>
        <h2>A research perspective</h2>
        <p>
          Biomedical imaging research at PCOM brought me into computer vision:
          training models to segment and count cells in microscopy images. It’s
          a different domain with a familiar challenge—turning complex
          measurements into something people can work with.
        </p>
      </section>
      <section>
        <h2>Outside the work</h2>
        <p>
          I enjoy taekwondo, powerlifting, and experimenting in the kitchen. I’m
          drawn to activities where curiosity, consistency, and a willingness to
          adjust lead to progress.
        </p>
      </section>
      <div className="intro-actions">
        <Link href="/resume" className="btn">
          View résumé ↗
        </Link>
        <a href="mailto:yuvraj.tripathy@outlook.com" className="text-link">
          Get in touch ↗
        </a>
      </div>
    </div>
  );
}
