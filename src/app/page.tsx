"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { NodeData } from "@/data/graphData";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Card from "@/components/Card";
import AnimateIn from "@/components/AnimateIn";
import { graphData } from "@/data/graphData";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

// Dynamically import GraphCanvas to prevent SSR window issues
const GraphCanvas = dynamic(() => import("@/components/GraphCanvas"), { ssr: false });

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  const featuredProjects = graphData.nodes
    .filter(n => n.type === 'detail' && n.id.startsWith('p_'))
    .slice(0, 3);

  const me = graphData.nodes.find(n => n.id === "me")?.details;

  const skills = [
    "Python", "React", "Machine Learning", "Chemical Engineering", 
    "Process Automation", "U-Net++", "XGBoost", "PyTorch", 
    "WebSockets", "Three.js", "Next.js", "Control Systems", 
    "Data Analysis", "Industrial IoT", "Deep Learning"
  ];

  return (
    <div style={{ paddingBottom: '5rem' }}>
      {/* Hero Section - 2 Column Layout */}
      <section style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '4rem 0'
      }}>
        <div className="container" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '4rem', 
          alignItems: 'center' 
        }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.05em', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              bridging the gap between <span style={{ color: 'var(--accent-color)' }}>physical engineering</span> and data science.
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              With a background in Chemical and Biomolecular Engineering, I build automated, highly reliable solutions that solve critical industrial and digital problems.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <motion.a 
                href="https://www.linkedin.com/in/yuvrajtripathy" 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.1, color: 'var(--accent-color)' }}
                style={{ color: 'var(--text-color)', fontSize: '1.5rem', transition: 'color 0.2s' }}
              >
                <FaLinkedin />
              </motion.a>
              <motion.a 
                href="https://github.com/yuvipaloozie" 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.1, color: 'var(--accent-color)' }}
                style={{ color: 'var(--text-color)', fontSize: '1.5rem', transition: 'color 0.2s' }}
              >
                <FaGithub />
              </motion.a>
              <motion.a 
                href="mailto:yuvraj.tripathy@outlook.com"
                whileHover={{ scale: 1.1, color: 'var(--accent-color)' }}
                style={{ color: 'var(--text-color)', fontSize: '1.5rem', transition: 'color 0.2s' }}
              >
                <MdEmail />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ 
              position: 'relative',
              width: '100%',
              maxWidth: '400px',
              aspectRatio: '1',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              boxShadow: 'var(--card-shadow)',
              border: 'var(--card-border)'
            }}>
              <img 
                src="/profile.jpg" 
                alt="Yuvraj Tripathy" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{ 
                position: 'absolute', 
                bottom: '1rem', 
                right: '1rem', 
                background: 'var(--accent-color)', 
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                GaTech '26
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Primary Knowledge Graph Explorer */}
      <section id="graph" className="container" style={{ paddingBottom: '10rem' }}>
        <AnimateIn delay={0.2}>
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem' }}>the <span style={{ color: 'var(--accent-color)' }}>knowledge</span> explorer.</h2>
            <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'lowercase', letterSpacing: '0.05em' }}>my profile as a network</p>
          </div>
          <div style={{ 
            height: '800px', 
            width: '100%', 
            background: '#ffffff', 
            borderRadius: 'var(--radius)', 
            border: 'var(--card-border)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--card-shadow)'
          }}>
            {/* Embedded Graph Instruction Overlay */}
            <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10, opacity: 0.5, pointerEvents: 'none' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>interactive canvas • scroll to zoom</p>
            </div>
            
            <GraphCanvas onNodeSelect={setSelectedNode} />

            {/* In-Graph Sliding Details Panel */}
            <AnimatePresence>
              {selectedNode && selectedNode.details && (
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "100%",
                    maxWidth: "380px",
                    height: "100%",
                    background: "#ffffff",
                    borderLeft: "var(--card-border)",
                    zIndex: 100,
                    overflowY: "auto",
                    padding: "3rem 1.5rem",
                    boxShadow: "-10px 0 30px rgba(0,0,0,0.05)"
                  }}
                >
                  <button 
                    onClick={() => setSelectedNode(null)}
                    style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "var(--text-color)" }}
                  >
                    &times;
                  </button>
                  <Card 
                    title={selectedNode.details.title}
                    subtitle={selectedNode.details.subtitle}
                    description={selectedNode.details.description}
                    tags={selectedNode.details.tags}
                    link={selectedNode.details.link}
                    github={selectedNode.details.github}
                    image={selectedNode.details.image}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimateIn>
      </section>
    </div>
  );
}
