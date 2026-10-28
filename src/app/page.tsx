import FloatingPortrait from "@/components/FloatingPortrait";
import Link from "next/link";
import { PixelIcon } from "@/components/ui/pixel-icon";
import ProjectIndex from "@/components/ProjectIndex";
import ResearchThreads from "@/components/ResearchThreads";
import { graphData } from "@/data/graphData";
import { career, education, profile } from "@/lib/profile";

export default function Home() {
  const notes = graphData.nodes
    .filter((node) => node.id.startsWith("b_"))
    .slice(0, 2);
  return (
    <div className="container academic-home">
      <section className="academic-profile" aria-labelledby="profile-name">
        <div>
          <h1 id="profile-name" aria-label={profile.name}>{profile.name.split(" ").map((part) => <span key={part}>{part}</span>)}</h1>
          <p className="affiliation">
            Process engineering · Applied machine learning
          </p>
          <p>
            {career.arclin.title} at {career.arclin.employer}.
            {" "}{education.graduate.subject} graduate student at {education.shortInstitution}.
          </p>
          <div className="social-links">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`}>Email</a>
          </div>
        </div>
        <figure>
          <FloatingPortrait width={248} height={292} preload />
          <figcaption>{profile.location}</figcaption>
        </figure>
      </section>
      <section className="research-interests">
        <h2>Research interests</h2>
        <ul>
          <li>Process safety</li>
          <li>Interpretable ML</li>
          <li>Biomedical imaging</li>
        </ul>
      </section>
      <section className="selected-projects" aria-labelledby="selected-heading">
        <div className="heading-row">
          <h2 id="selected-heading">Selected projects</h2>
          <Link href="/projects">All projects</Link>
        </div>
        <ProjectIndex featured />
      </section>
      <section className="notes-index">
        <div className="heading-row">
          <h2>Blog</h2>
          <Link href="/blog">All posts</Link>
        </div>
        <ul>
          {notes.map((node) => (
            <li key={node.id}>
              <Link href={node.details!.link!}>{node.details!.title}</Link>
              <span className="entry-date">{node.details!.subtitle}</span>
            </li>
          ))}
        </ul>
      </section>
      <details className="thread-disclosure">
        <summary>Explore by research topic<PixelIcon name="arrow" /></summary>
        <ResearchThreads />
      </details>
    </div>
  );
}
