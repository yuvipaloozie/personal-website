"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Card from "@/components/Card";
import AnimateIn from "@/components/AnimateIn";
import { graphData } from "@/data/graphData";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Home() {
  // Highlight 4 representative projects across domains
  const featuredIds = ["p_psm", "p_yield", "p_chana", "p_trading"];
  const featuredProjects = graphData.nodes.filter(
    n => n.type === 'detail' && featuredIds.includes(n.id)
  );

  return (
    <div style={{ paddingBottom: '8rem' }}>
      {/* 1. Hero Section - Technical Blueprint */}
      <section style={{ 
        minHeight: '75vh', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '3rem 0 5rem 0'
      }}>
        <div className="container">
          {/* Schematic Spec Header */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              marginBottom: '2.5rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-color)'
            }}
          >
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--accent-color)', borderRadius: '1px' }}></span>
            <span>RESEARCH & ENGINEERING // GEORGIA TECH // ATLANTA, GA</span>
          </motion.div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', 
            gap: '4rem', 
            alignItems: 'center' 
          }}>
            {/* Left: Bio & Coordinates */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 style={{ 
                fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', 
                fontWeight: 800, 
                letterSpacing: '-0.04em', 
                marginBottom: '1.5rem', 
                lineHeight: 1.1 
              }}>
                Yuvraj <span style={{ color: 'var(--accent-color)' }}>Tripathy</span>
              </h1>
              
              <p style={{ 
                fontSize: '1.1rem', 
                color: 'var(--text-color)', 
                maxWidth: '600px', 
                lineHeight: 1.7, 
                marginBottom: '1.5rem' 
              }}>
                I work at the intersection of process engineering and data science. I am a Process Automation Engineer at Wood and a graduate student in Data Science at Georgia Tech, with a background in Chemical and Biomolecular Engineering.
              </p>

              <p style={{ 
                fontSize: '0.95rem', 
                color: 'var(--text-muted)', 
                maxWidth: '600px', 
                lineHeight: 1.6, 
                marginBottom: '2.5rem' 
              }}>
                My interests include knowledge representations for process safety, interpretable machine learning for manufacturing, and computer vision for biomedical imaging. This site collects my projects, research interests, and technical notes.
              </p>

              {/* Action Buttons & Contact Bridge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <a href="#featured-projects" className="btn">
                  selected projects ↓
                </a>
                <Link href="/graph" className="btn btn-outline">
                  knowledge graph ↗
                </Link>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: '0.5rem' }}>
                  <motion.a 
                    href="https://github.com/yuvipaloozie" 
                    target="_blank" 
                    rel="noreferrer"
                    whileHover={{ scale: 1.1, color: 'var(--accent-color)' }}
                    style={{ color: 'var(--text-color)', fontSize: '1.35rem', transition: 'color 0.2s' }}
                    aria-label="GitHub"
                  >
                    <FaGithub />
                  </motion.a>
                  <motion.a 
                    href="https://www.linkedin.com/in/yuvrajtripathy" 
                    target="_blank" 
                    rel="noreferrer"
                    whileHover={{ scale: 1.1, color: 'var(--accent-color)' }}
                    style={{ color: 'var(--text-color)', fontSize: '1.35rem', transition: 'color 0.2s' }}
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </motion.a>
                  <motion.a 
                    href="mailto:yuvraj.tripathy@outlook.com"
                    whileHover={{ scale: 1.1, color: 'var(--accent-color)' }}
                    style={{ color: 'var(--text-color)', fontSize: '1.35rem', transition: 'color 0.2s' }}
                    aria-label="Email"
                  >
                    <MdEmail />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Right: Technical Blueprint Framing */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div style={{ 
                position: 'relative',
                width: '100%',
                maxWidth: '380px',
                aspectRatio: '1',
                padding: '0.75rem',
                background: '#ffffff',
                border: 'var(--card-border)',
                boxShadow: 'var(--card-shadow)',
                borderRadius: 'var(--radius)'
              }}>
                {/* Schematic Corner Marks */}
                <div style={{ position: 'absolute', top: '-6px', left: '-6px', fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 800 }}>+</div>
                <div style={{ position: 'absolute', top: '-6px', right: '-6px', fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 800 }}>+</div>
                <div style={{ position: 'absolute', bottom: '-6px', left: '-6px', fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 800 }}>+</div>
                <div style={{ position: 'absolute', bottom: '-6px', right: '-6px', fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 800 }}>+</div>

                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  overflow: 'hidden', 
                  borderRadius: '2px',
                  border: '1px solid var(--card-border)',
                  position: 'relative'
                }}>
                  <img 
                    src="/profile.jpg" 
                    alt="Yuvraj Tripathy" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <div style={{ 
                    position: 'absolute', 
                    bottom: '0.75rem', 
                    right: '0.75rem', 
                    background: 'var(--text-color)', 
                    color: '#ffffff',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '2px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em'
                  }}>
                    Georgia Tech // ChBE '24
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Featured Systems / Curated Engineering Grid */}
      <section id="featured-projects" className="container" style={{ marginTop: '5rem', marginBottom: '8rem' }}>
        <AnimateIn delay={0.1}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            marginBottom: '3rem', 
            borderBottom: 'var(--card-border)', 
            paddingBottom: '1.25rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-color)' }}>
                [01] // SELECTED WORK
              </span>
              <h2 style={{ fontSize: '2.4rem', margin: '0.25rem 0 0 0', fontWeight: 800, letterSpacing: '-0.03em' }}>
                selected projects
              </h2>
            </div>
            <Link 
              href="/projects" 
              style={{ 
                fontSize: '0.85rem', 
                fontWeight: 700, 
                color: 'var(--accent-color)', 
                textTransform: 'lowercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              all projects ↗
            </Link>
          </div>
        </AnimateIn>

        <div className="grid grid-2">
          {featuredProjects.map((project, idx) => (
            <AnimateIn delay={0.2 + (idx * 0.1)} key={project.id}>
              <Card 
                title={project.details!.title}
                subtitle={project.details!.subtitle}
                description={project.details!.description}
                tags={project.details!.tags}
                image={project.details!.image}
                link={project.details!.link}
                github={project.details!.github}
              />
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* 3. Core Competency & Toolchain Matrix */}
      <section className="container" style={{ marginBottom: '8rem' }}>
        <AnimateIn delay={0.2}>
          <div style={{ 
            borderBottom: 'var(--card-border)', 
            paddingBottom: '1.25rem', 
            marginBottom: '3rem' 
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-color)' }}>
              [02] // RESEARCH INTERESTS
            </span>
            <h2 style={{ fontSize: '2.4rem', margin: '0.25rem 0 0 0', fontWeight: 800, letterSpacing: '-0.03em' }}>
              research interests &amp; methods
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            {/* Block A */}
            <div style={{ 
              background: '#ffffff', 
              border: 'var(--card-border)', 
              boxShadow: 'var(--card-shadow)', 
              borderRadius: 'var(--radius)', 
              padding: '2.25rem' 
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-color)', letterSpacing: '0.1em' }}>[A] PROCESS &amp; SAFETY</span>
              <h3 style={{ fontSize: '1.35rem', margin: '0.75rem 0 1rem 0', fontWeight: 800 }}>Industrial Systems</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                HAZOP &amp; Alarm parsing, P&amp;ID Tag Cross-referencing, Process Safety Management (PSM), SCADA telemetry, ISA standards.
              </p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {["HAZOP", "Alarm Mgmt", "P&ID", "Industrial IoT", "Process Controls"].map(item => (
                  <span key={item} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(27, 98, 143, 0.08)', color: 'var(--accent-color)', borderRadius: '2px', fontWeight: 600 }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Block B */}
            <div style={{ 
              background: '#ffffff', 
              border: 'var(--card-border)', 
              boxShadow: 'var(--card-shadow)', 
              borderRadius: 'var(--radius)', 
              padding: '2.25rem' 
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-color)', letterSpacing: '0.1em' }}>[B] APPLIED ML &amp; VISION</span>
              <h3 style={{ fontSize: '1.35rem', margin: '0.75rem 0 1rem 0', fontWeight: 800 }}>Machine Learning</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                U-Net++ Segmentation, GraphRAG with Local LLMs, XGBoost, Isolation Forests, SHAP Root Cause Analysis, Time-Series / Wavelets.
              </p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {["PyTorch", "GraphRAG", "U-Net++", "XGBoost", "SHAP", "Neo4j"].map(item => (
                  <span key={item} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(27, 98, 143, 0.08)', color: 'var(--accent-color)', borderRadius: '2px', fontWeight: 600 }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Block C */}
            <div style={{ 
              background: '#ffffff', 
              border: 'var(--card-border)', 
              boxShadow: 'var(--card-shadow)', 
              borderRadius: 'var(--radius)', 
              padding: '2.25rem' 
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-color)', letterSpacing: '0.1em' }}>[C] SOFTWARE &amp; INFRA</span>
              <h3 style={{ fontSize: '1.35rem', margin: '0.75rem 0 1rem 0', fontWeight: 800 }}>Engineering Stack</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Python data pipelines, FastAPI backends, Dockerized inference containers, Next.js &amp; React diagnostic dashboards.
              </p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {["Python", "FastAPI", "Docker", "Next.js", "TypeScript", "OpenCV"].map(item => (
                  <span key={item} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(27, 98, 143, 0.08)', color: 'var(--accent-color)', borderRadius: '2px', fontWeight: 600 }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* 4. Standalone Knowledge Graph Schematic Banner */}
      <section className="container">
        <AnimateIn delay={0.3}>
          <div style={{ 
            background: '#ffffff', 
            border: 'var(--card-border)', 
            boxShadow: 'var(--card-shadow)', 
            borderRadius: 'var(--radius)', 
            padding: '4rem 3rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ maxWidth: '650px', position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-color)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                [03] // CONNECTIONS
              </span>
              <h2 style={{ fontSize: '2.2rem', margin: '0.5rem 0 1rem 0', fontWeight: 800, letterSpacing: '-0.03em' }}>
                interactive knowledge graph
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                An alternative index of the site: explore the relationships between research topics, projects, technical methods, and experience.
              </p>
              <Link href="/graph" className="btn">
                launch full-screen explorer ↗
              </Link>
            </div>

            {/* Decorative Blueprint Corner Accent */}
            <div style={{ 
              position: 'absolute', 
              top: '-20px', 
              right: '-20px', 
              width: '180px', 
              height: '180px', 
              border: '1px dashed var(--accent-color)',
              opacity: 0.15,
              borderRadius: '50%',
              pointerEvents: 'none'
            }} />
          </div>
        </AnimateIn>
      </section>
    </div>
  );
}


