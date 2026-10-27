"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { NodeData } from "@/data/graphData";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Card from "@/components/Card";
import { BackgroundSnippets } from "@/components/ui/background-snippets";

// Dynamically import GraphCanvas to prevent SSR window issues
const GraphCanvas = dynamic(() => import("@/components/GraphCanvas"), {
  ssr: false,
  loading: () => <p className="graph-loading" role="status">Loading the knowledge graph…</p>,
});

export default function GraphPage() {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  return (
    <div className="graph-page">
      <BackgroundSnippets />
      <div className="graph-help">
        <p>Select a node to explore; select a category to expand.</p>
        <p>Scroll to zoom · drag to pan.</p>
        <Link href="/projects">Browse the project list</Link>
      </div>
      {/* Physics Canvas */}
      <GraphCanvas onNodeSelect={setSelectedNode} />

      {/* Footer Overlay */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "1.5rem",
          zIndex: 10,
          display: "flex",
          gap: "1.25rem",
          alignItems: "center",
        }}
      >
        <motion.a
          href="https://github.com/yuvipaloozie"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          style={{ color: "var(--text-color)" }}
          whileHover={{ scale: 1.1, color: "var(--accent-color)" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <FaGithub size={22} />
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/yuvrajtripathy"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          style={{ color: "var(--text-color)" }}
          whileHover={{ scale: 1.1, color: "var(--accent-color)" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <FaLinkedin size={22} />
        </motion.a>
        <motion.a
          href="mailto:yuvraj.tripathy@outlook.com"
          aria-label="Email"
          style={{ color: "var(--text-color)" }}
          whileHover={{ scale: 1.1, color: "var(--accent-color)" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <MdEmail size={24} />
        </motion.a>
      </div>

      {/* Sliding Sidebar for Details */}
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
              maxWidth: "400px",
              height: "100%",
              background: "var(--card-bg)",
              borderLeft: "1px solid var(--card-border)",
              boxShadow: "-10px 0 40px rgba(0,0,0,0.05)",
              zIndex: 100,
              overflowY: "auto",
              padding: "4rem 1.5rem",
            }}
          >
            <button
              aria-label="Close project details"
              onClick={() => setSelectedNode(null)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1.5rem",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "var(--text-color)",
              }}
            >
              &times;
            </button>

            <div style={{ marginTop: "1rem" }}>
              <Card
                title={selectedNode.details.title}
                subtitle={selectedNode.details.subtitle}
                description={selectedNode.details.description}
                tags={selectedNode.details.tags}
                link={selectedNode.details.link}
                github={selectedNode.details.github}
                image={selectedNode.details.image}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
