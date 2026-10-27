import Image from "next/image";
import Link from "next/link";
import ProjectIndex from "@/components/ProjectIndex";
import ResearchThreads from "@/components/ResearchThreads";
import { graphData } from "@/data/graphData";

export default function Home() {
  const notes = graphData.nodes
    .filter((node) => node.id.startsWith("b_"))
    .slice(0, 2);
  return (
    <div className="container academic-home">
      <section className="academic-profile" aria-labelledby="profile-name">
        <div>
          <h1 id="profile-name">Yuvraj Tripathy</h1>
          <p className="affiliation">
            Process engineering · Applied machine learning
          </p>
          <p>
            I work at the intersection of process engineering and data science.
            I am a Process Automation Engineer at Wood and a graduate student in
            Data Science at Georgia Tech, with a background in Chemical and
            Biomolecular Engineering.
          </p>
          <p>
            My interests include knowledge representations for process safety,
            interpretable machine learning for manufacturing, and computer
            vision for biomedical imaging.
          </p>
          <div className="social-links">
            <a
              href="https://github.com/yuvipaloozie"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yuvrajtripathy"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a href="mailto:yuvraj.tripathy@outlook.com">Email</a>
          </div>
        </div>
        <figure>
          <Image
            src="/profile.jpg"
            alt="Yuvraj Tripathy"
            width={185}
            height={225}
            sizes="(max-width: 600px) 110px, 185px"
            preload
          />
          <figcaption>Atlanta, Georgia</figcaption>
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
        <Link href="/graph">Explore the knowledge graph</Link>
        <p>
          An alternative way to follow connections between projects, methods,
          and experience.
        </p>
      </aside>
    </div>
  );
}
