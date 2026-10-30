"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { graphData, NodeData } from "@/data/graphData";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Card from "@/components/Card";
import { BackgroundSnippets } from "@/components/ui/background-snippets";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { DitherSweep } from "@/components/ui/dither-sweep";
import "./graph.css";

// Dynamically import GraphCanvas to prevent SSR window issues
const GraphCanvas = dynamic(() => import("@/components/GraphCanvas"), {
  ssr: false,
  loading: () => <p className="graph-loading" role="status">Loading the knowledge graph…</p>,
});

export default function GraphPage() {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [paused, setPaused] = useState(false);
  const [resetView, setResetView] = useState(0);
  const [entryId, setEntryId] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const exploreRef = useRef<HTMLSelectElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const selectNode = useCallback((node: NodeData | null) => {
    if (node && node.type !== "category") {
      if (!dialogRef.current?.open) {
        returnFocusRef.current = document.activeElement instanceof HTMLElement
          ? document.activeElement : null;
      }
      setSelectedNode(node);
    } else setSelectedNode(null);
  }, []);
  const closeDetails = useCallback(() => {
    dialogRef.current?.close();
    setSelectedNode(null);
    const target = returnFocusRef.current;
    if (target && target !== document.body && target.isConnected) target.focus();
    else exploreRef.current?.focus();
  }, []);
  useEffect(() => {
    if (selectedNode) {
      if (!dialogRef.current?.open) dialogRef.current?.showModal();
      // A related-entry button may disappear when the panel content changes.
      dialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    } else dialogRef.current?.close();
  }, [selectedNode]);
  const connections = selectedNode?.group === 3 ? graphData.nodes.filter(node =>
    node.details && graphData.links.some(link => {
      const source = typeof link.source === "object" ? (link.source as NodeData).id : link.source;
      const target = typeof link.target === "object" ? (link.target as NodeData).id : link.target;
      return (source === selectedNode.id && target === node.id)
        || (target === selectedNode.id && source === node.id);
    })
  ) : [];

  return (
    <div className="graph-page" data-paused={paused}>
      <BackgroundSnippets />
      <div className="graph-help">
        <h1>Knowledge graph</h1>
        <p>Select a node to explore; select a category to expand.</p>
        <p>Scroll to zoom · drag to pan.</p>
        <label className="graph-explore-label" htmlFor="graph-explore">Explore an entry</label>
        <div className="graph-entry-control">
        <select id="graph-explore" ref={exploreRef} value={entryId}
          onChange={event => setEntryId(event.target.value)}>
          <option value="">Choose an entry…</option>
          <option value="me">Yuvraj Tripathy</option>
          {graphData.nodes.filter(node => node.type === "category").map(category => (
            <optgroup key={category.id} label={category.label}>
              {graphData.nodes.filter(node => node.type === "detail" && node.group === category.group).map(node => (
                <option key={node.id} value={node.id}>{node.label}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <button className="sweep-target" disabled={!entryId}
          onClick={() => selectNode(graphData.nodes.find(node => node.id === entryId) ?? null)}>
          <DitherSweep /><span className="sweep-label">Open entry</span>
        </button>
        </div>
        <div className="graph-actions">
        <button className="sweep-target" onClick={() => setResetView(value => value + 1)}>
          <DitherSweep /><span className="sweep-label">Reset view</span>
        </button>
        <button className="graph-motion-control sweep-target" onClick={() => setPaused(value => !value)} aria-pressed={paused}
          aria-label={paused ? "Resume graph animation" : "Pause graph animation"}>
          <DitherSweep /><span className="sweep-label"><PixelIcon name={paused ? "play" : "pause"} />{paused ? "Resume motion" : "Pause motion"}</span>
        </button>
        </div>
      </div>
      {/* Physics Canvas */}
      <GraphCanvas onNodeSelect={selectNode} paused={paused} resetView={resetView} />

      {/* Footer Overlay */}
      <div className="graph-socials"
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
        <a className="footer-social sweep-target"
          href="https://github.com/yuvipaloozie"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <DitherSweep /><span className="sweep-label"><FaGithub size={20} aria-hidden="true" /></span>
        </a>
        <a className="footer-social sweep-target"
          href="https://www.linkedin.com/in/yuvrajtripathy"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <DitherSweep /><span className="sweep-label"><FaLinkedin size={20} aria-hidden="true" /></span>
        </a>
        <a className="footer-social sweep-target"
          href="mailto:yuvraj.tripathy@outlook.com"
          aria-label="Email"
        >
          <DitherSweep /><span className="sweep-label"><MdEmail size={20} aria-hidden="true" /></span>
        </a>
      </div>

      <dialog ref={dialogRef} className="graph-details" aria-labelledby="graph-detail-title"
        onCancel={event => { event.preventDefault(); closeDetails(); }}>
        <button className="graph-details-close sweep-target" onClick={closeDetails}>
          <DitherSweep /><span className="sweep-label">Close details</span>
        </button>
        {selectedNode && <>
          <h2 id="graph-detail-title" className="sr-only">{selectedNode.details?.title ?? selectedNode.label}</h2>
          {selectedNode.details ? <Card
            title={selectedNode.details.title}
            subtitle={selectedNode.details.subtitle}
            description={selectedNode.details.description}
            tags={selectedNode.details.tags}
            link={selectedNode.details.link}
            github={selectedNode.details.github}
            image={selectedNode.details.image}
          /> : <>
            <h3>{selectedNode.label}</h3>
            <h4 className="graph-connections-heading">Connected entries</h4>
            <ul className="graph-connections">
              {connections.map(node => <li key={node.id}>
                <button onClick={() => selectNode(node)}>{node.label}</button>
              </li>)}
            </ul>
          </>}
        </>}
      </dialog>
    </div>
  );
}
