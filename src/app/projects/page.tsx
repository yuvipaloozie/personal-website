import Card from "@/components/Card";
import AnimateIn from "@/components/AnimateIn";
import { graphData } from "@/data/graphData";

export default function Projects() {
  const projectNodes = graphData.nodes.filter(n => n.type === 'detail' && n.id.startsWith('p_'));

  return (
    <div className="container section">
      <AnimateIn delay={0.1}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 className="section-title" style={{ marginTop: '1rem', marginBottom: '0.75rem' }}>projects</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '700px' }}>
            Production engineering systems, deep learning architectures, and quantitative models with public source code and case studies.
          </p>
        </div>
      </AnimateIn>

      <div className="grid grid-2">
        {projectNodes.map((node, i) => (
          <AnimateIn delay={0.2 + (i * 0.1)} key={node.id}>
            <Card
              title={node.details!.title}
              subtitle={node.details!.subtitle}
              description={node.details!.description}
              tags={node.details!.tags}
              image={node.details!.image}
              link={node.details!.link}
              github={node.details!.github}
            />
          </AnimateIn>
        ))}
      </div>
    </div>
  );
}
