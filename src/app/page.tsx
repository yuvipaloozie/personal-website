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
            I’m a {career.arclin.title} at {career.arclin.employer} and a graduate student in
            {" "}{education.graduate.subject} at {education.shortInstitution}. My work connects process engineering
            with applied machine learning.
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
          <li>Process safety & knowledge graphs</li>
          <li>Interpretable machine learning</li>
          <li>Biomedical computer vision</li>
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
          <h2>Technical notes</h2>
          <Link href="/blog">All notes</Link>
        </div>
        <ul>
          {notes.map((node) => (
            <li key={node.id}>
              <Link href={node.details!.link!}>{node.details!.title}</Link>
              <p>{node.details!.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <ResearchThreads />
      <aside className="graph-reference">
        <Link href="/graph"><PixelIcon name="graph" />Explore the knowledge graph<PixelIcon name="arrow" /></Link>
        <p>
          An alternative way to follow connections between projects, methods,
          and experience.
        </p>
      </aside>
    </div>
  );
}
