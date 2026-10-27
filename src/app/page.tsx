import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    number: "01",
    field: "Process safety · NLP",
    title: "Making engineering knowledge searchable.",
    description:
      "A knowledge graph that connects HAZOP studies, alarm records, and equipment tags, helping engineers navigate the relationships buried in industrial documents.",
    stack: "Python / Neo4j / GraphRAG",
    href: "/projects/psm-knowledge-graph",
    name: "Process Safety Knowledge Graph",
  },
  {
    number: "02",
    field: "Manufacturing · Applied ML",
    title: "Finding the signals behind manufacturing failures.",
    description:
      "An anomaly detection and classification pipeline for semiconductor sensor data. SHAP explanations connect model predictions back to the process variables an engineer can investigate.",
    stack: "XGBoost / Isolation Forest / SHAP",
    href: "/projects/yield-optimization",
    name: "Semiconductor Yield & Root Cause Analysis",
  },
  {
    number: "03",
    field: "Biomedical research · Computer vision",
    title: "Turning microscopy images into usable measurements.",
    description:
      "A segmentation and counting workflow for multinucleated osteoclasts, pairing a U-Net++ model with an analysis interface for biomedical researchers.",
    stack: "PyTorch / U-Net++ / OpenCV",
    href: "/projects/chana-analyzer",
    name: "Osteoclast Image Analysis",
  },
];
export default function Home() {
  return (
    <div className="container home">
      <section className="intro" aria-labelledby="intro-title">
        <div>
          <p className="eyebrow">
            Yuvraj Tripathy <span className="dot">/</span> Atlanta, GA
          </p>
          <h1 id="intro-title">
            Engineering context.
            <br />
            <span>Data-driven thinking.</span>
          </h1>
          <p className="intro-lead">
            I build machine learning and automation tools for the physical
            world.
          </p>
          <p className="intro-copy">
            I’m a process automation engineer with a background in Chemical and
            Biomolecular Engineering, pursuing graduate study in Data Science at
            Georgia Tech. My work connects industrial systems, messy data, and
            software that helps people make better decisions.
          </p>
          <div className="intro-actions">
            <a className="btn" href="#selected-work">
              Explore my work <span aria-hidden="true">↓</span>
            </a>
            <Link className="text-link" href="/resume">
              View résumé <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <figure className="portrait">
          <Image
            src="/profile.jpg"
            alt="Yuvraj Tripathy"
            width={420}
            height={500}
            sizes="(max-width: 700px) 110px, 250px"
            preload
          />
          <figcaption>Engineer. Researcher. Curious by default.</figcaption>
        </figure>
      </section>
      <div className="context-strip">
        <span>
          Process automation at <strong>Wood</strong>
        </span>
        <span>
          Data Science at <strong>Georgia Tech</strong>
        </span>
        <span>
          Focus: <strong>Applied ML & industrial systems</strong>
        </span>
      </div>
      <section
        id="selected-work"
        className="home-section"
        aria-labelledby="work-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title">Real problems. Thoughtful systems.</h2>
          </div>
          <Link className="text-link" href="/projects">
            All projects ↗
          </Link>
        </div>
        {projects.map((project) => (
          <article className="work-row" key={project.number}>
            <span className="work-number" aria-hidden="true">
              {project.number}
            </span>
            <div className="work-title">
              <p className="eyebrow">{project.field}</p>
              <h3>
                <Link href={project.href}>{project.title}</Link>
              </h3>
              <p className="project-name">{project.name}</p>
            </div>
            <div className="work-description">
              <p>{project.description}</p>
              <p className="stack">{project.stack}</p>
              <Link className="text-link" href={project.href}>
                Read project ↗<span className="sr-only">: {project.name}</span>
              </Link>
            </div>
          </article>
        ))}
      </section>
      <section
        className="home-section approach"
        aria-labelledby="approach-title"
      >
        <div>
          <p className="eyebrow">How I work</p>
          <h2 id="approach-title">
            Start with the process.
            <br />
            Build toward understanding.
          </h2>
          <Link className="text-link" href="/about">
            More about me ↗
          </Link>
        </div>
        <div className="approach-copy">
          <p>
            My engineering background shapes how I approach data science:
            understand the system, ask what the data actually represents, and
            make the result useful to the person working with it.
          </p>
          <p>
            I’m especially interested in work where domain knowledge
            matters—whether that means tracing equipment relationships in a
            safety study, interpreting sensor behavior, or measuring cells in a
            microscopy image.
          </p>
          <dl className="capabilities">
            <div>
              <dt>Model & interpret</dt>
              <dd>Python, PyTorch, XGBoost, SHAP</dd>
            </div>
            <div>
              <dt>Connect & structure</dt>
              <dd>NLP, knowledge graphs, Neo4j</dd>
            </div>
            <div>
              <dt>Build & deliver</dt>
              <dd>FastAPI, Docker, React, TypeScript</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="home-section" aria-labelledby="experience-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Experience</p>
            <h2 id="experience-title">Across industry and research.</h2>
          </div>
          <Link className="text-link" href="/resume">
            Full résumé ↗
          </Link>
        </div>
        <Link className="experience-row" href="/experience/wood-plc">
          <span>Wood</span>
          <div>
            <h3>Process Automation Engineer</h3>
            <p>
              Industrial controls, engineering workflows, and process safety
              tooling.
            </p>
          </div>
          <span>2024–present ↗</span>
        </Link>
        <Link className="experience-row" href="/experience/pcom-research">
          <span>PCOM</span>
          <div>
            <h3>Machine Learning Researcher</h3>
            <p>Computer vision and deep learning for biomedical microscopy.</p>
          </div>
          <span>2023–2024 ↗</span>
        </Link>
        <Link className="experience-row" href="/resume">
          <span>Alcon</span>
          <div>
            <h3>Equipment Engineering Co-op</h3>
            <p>Time-series modeling and predictive maintenance.</p>
          </div>
          <span>2023 ↗</span>
        </Link>
      </section>
      <aside className="graph-note">
        <div>
          <h2>A different way to explore.</h2>
          <p>
            See how my projects, experience, and skills connect in an
            interactive knowledge graph.
          </p>
        </div>
        <Link className="text-link" href="/graph">
          Explore the connections ↗
        </Link>
      </aside>
      <section className="contact-section" aria-labelledby="contact-title">
        <p className="eyebrow">Get in touch</p>
        <h2 id="contact-title">Have a role where this thinking fits?</h2>
        <p>
          I’d be glad to talk about applied machine learning, process
          automation, and engineering software.
        </p>
        <a className="text-link" href="mailto:yuvraj.tripathy@outlook.com">
          yuvraj.tripathy@outlook.com ↗
        </a>
      </section>
    </div>
  );
}
