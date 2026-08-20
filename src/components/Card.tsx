"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Card({
  title,
  subtitle,
  description,
  tags,
  link,
  image,
  github
}: {
  title: string;
  subtitle?: string;
  description: string;
  tags?: string[];
  link?: string;
  image?: string;
  github?: string;
}) {
  return (
    <motion.div 
      whileHover={{ translate: "-2px -2px", boxShadow: "6px 6px 0px rgba(0,0,0,0.15)" }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        background: "var(--card-bg)",
        border: "var(--card-border)",
        boxShadow: "var(--card-shadow)",
        borderRadius: "var(--radius)",
        padding: "2.5rem",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {image && (
        <div style={{ margin: '-2.5rem -2.5rem 2rem -2.5rem', overflow: 'hidden', height: '240px' }}>
          <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      {subtitle && <div style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>{subtitle}</div>}
      
      <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-color)' }}>{title}</h3>
      
      <p style={{ flex: 1, fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>{description}</p>
      
      {tags && tags.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
          {tags.map(tag => (
            <span key={tag} style={{ 
              fontSize: '0.75rem', 
              background: 'rgba(27, 98, 143, 0.08)', 
              color: 'var(--accent-color)', 
              border: '1px solid rgba(27, 98, 143, 0.25)',
              padding: '0.25rem 0.65rem', 
              borderRadius: '4px', 
              fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace"
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {(link || github) && (
        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: 'var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {link ? (
            <Link href={link} style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-color)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textTransform: 'lowercase' }}>
              case study
              <span style={{ fontSize: '1.1rem' }}>→</span>
            </Link>
          ) : <div />}
          {github && (
            <motion.a 
              href={github} 
              target="_blank" 
              rel="noreferrer"
              whileHover={{ scale: 1.05, color: 'var(--accent-color)' }}
              style={{ 
                color: 'var(--text-color)', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.4rem', 
                fontSize: '0.8rem',
                fontWeight: 700,
                border: '1px solid var(--card-border)',
                padding: '0.35rem 0.75rem',
                borderRadius: '4px',
                background: '#ffffff',
                boxShadow: '2px 2px 0px rgba(15, 23, 42, 0.1)',
                textDecoration: 'none'
              }}
              aria-label="View on GitHub"
            >
              <FaGithub size={16} />
              <span>repo</span>
            </motion.a>
          )}
        </div>
      )}
    </motion.div>
  );
}
