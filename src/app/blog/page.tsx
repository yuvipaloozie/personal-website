import Card from "@/components/Card";
import AnimateIn from "@/components/AnimateIn";
import { graphData } from "@/data/graphData";

export default function Blog() {
  const blogNodes = graphData.nodes.filter(n => n.type === 'detail' && n.id.startsWith('b_'));

  return (
    <div className="container section">
      <AnimateIn delay={0.1}>
        <h1 className="section-title">blog</h1>
      </AnimateIn>
      
      <div className="grid grid-2">
        {blogNodes.map((node, i) => (
          <AnimateIn delay={0.2 + (i * 0.1)} key={node.id}>
            <Card 
              title={node.details!.title}
              subtitle={node.details!.subtitle}
              description={node.details!.description}
              link={node.details!.link}
            />
          </AnimateIn>
        ))}
      </div>
    </div>
  );
}
