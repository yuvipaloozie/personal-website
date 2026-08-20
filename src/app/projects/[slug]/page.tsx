import AnimateIn from "@/components/AnimateIn";
import { graphData } from "@/data/graphData";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaGithub } from "react-icons/fa";

export function generateStaticParams() {
  const nodes = graphData.nodes.filter(n => n.type === 'detail' && n.id.startsWith('p_'));
  return nodes.map(node => {
    const slug = node.details?.link?.split("/").pop();
    return { slug };
  });
}

export default async function ProjectPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const node = graphData.nodes.find(n => n.type === 'detail' && n.details?.link === `/projects/${slug}`);

  if (!node || !node.details) {
    notFound();
  }

  const { title, subtitle, image, description, fullDescription, tags, github } = node.details;

  return (
    <div className="container section">
      <AnimateIn delay={0.1}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <Link 
              href="/projects" 
              style={{ 
                color: 'var(--accent-color)', 
                textTransform: 'lowercase', 
                fontWeight: 700, 
                display: 'inline-flex', 
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}
            >
              ← back to projects
            </Link>

            {github && (
              <a 
                href={github} 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  color: 'var(--text-color)',
                  background: '#ffffff',
                  border: 'var(--card-border)',
                  boxShadow: 'var(--card-shadow)',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textDecoration: 'none'
                }}
              >
                <FaGithub size={18} />
                <span>view repository on github ↗</span>
              </a>
            )}
          </div>
          
          {image && (
            <div style={{ marginBottom: '2.5rem', border: 'var(--card-border)', padding: '0.5rem', background: '#ffffff', boxShadow: 'var(--card-shadow)', borderRadius: 'var(--radius)' }}>
              <img src={image} alt={title} style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block', borderRadius: '2px' }} />
            </div>
          )}
          
          <h1 style={{ fontSize: '2.8rem', marginBottom: '0.5rem', color: 'var(--text-color)', fontWeight: 800 }}>{title}</h1>
          <h2 style={{ color: 'var(--accent-color)', fontSize: '1rem', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{subtitle}</h2>
          
          <div style={{ borderLeft: '4px solid var(--accent-color)', paddingLeft: '1.5rem', marginBottom: '2.5rem', background: 'rgba(27, 98, 143, 0.03)', padding: '1.25rem 1.5rem', borderRadius: '0 var(--radius) var(--radius) 0' }}>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-color)', fontWeight: 600, margin: 0, lineHeight: 1.6 }}>{description}</p>
          </div>

          <div style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-color)' }}>
            {fullDescription?.map((p, idx) => (
              <p key={idx} style={{ marginBottom: '1.5rem' }}>{p}</p>
            ))}
          </div>
          
          {tags && tags.length > 0 && (
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: 'var(--card-border)' }}>
              <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: 700 }}>Technologies & Methodologies</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {tags.map(tag => (
                  <span key={tag} style={{ 
                    fontSize: '0.8rem', 
                    background: 'rgba(27, 98, 143, 0.08)', 
                    border: '1px solid rgba(27, 98, 143, 0.25)', 
                    color: 'var(--accent-color)', 
                    padding: '0.3rem 0.75rem', 
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </AnimateIn>
    </div>
  );
}
