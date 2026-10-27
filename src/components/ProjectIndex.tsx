"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toggle } from "@base-ui/react/toggle";
import { graphData } from "@/data/graphData";

const topics = [
  { id: "all", label: "All work" },
  { id: "industrial", label: "Industrial systems" },
  { id: "graphs", label: "Graphs" },
  { id: "biomedical", label: "Biomedical" },
  { id: "modeling", label: "Modeling" },
];
const memberships: Record<string, string[]> = {
  industrial: ["p_psm", "p_yield"],
  graphs: ["p_psm", "p_gnn"],
  biomedical: ["p_chana", "p_arrhythmia", "p_breastcancer"],
  modeling: [
    "p_yield",
    "p_gnn",
    "p_trading",
    "p_arrhythmia",
    "p_powerlifting",
    "p_breastcancer",
  ],
};
export default function ProjectIndex({
  featured = false,
}: {
  featured?: boolean;
}) {
  const [topic, setTopic] = useState("all");
  const projects = graphData.nodes.filter(
    (node) => node.id.startsWith("p_") && node.details,
  );
  const visible =
    topic === "all"
      ? featured
        ? projects.slice(0, 3)
        : projects
      : projects.filter((node) => memberships[topic]?.includes(node.id));
  return (
    <div className="project-index">
      <ToggleGroup
        className="topic-filter"
        aria-label="Filter projects by topic"
        value={[topic]}
        onValueChange={(value) => {
          if (value[0]) setTopic(value[0]);
        }}
      >
        {topics.map((item) => (
          <Toggle key={item.id} value={item.id} aria-controls="project-results">
            {item.label}
          </Toggle>
        ))}
      </ToggleGroup>
      <p className="result-count" role="status">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
        {featured && topic === "all" ? " selected" : ""}
      </p>
      <div id="project-results">
        {visible.map((node) => (
          <article className="project-entry" key={node.id}>
            <div className="project-figure">
              {node.details!.image ? (
                <Image
                  src={node.details!.image}
                  alt={node.details!.title}
                  width={112}
                  height={86}
                  sizes="112px"
                />
              ) : (
                <span>{node.details!.subtitle?.split(" | ")[0]}</span>
              )}
            </div>
            <div>
              <h3>
                <Link href={node.details!.link!}>{node.details!.title}</Link>
              </h3>
              <p>{node.details!.description}</p>
              <div className="project-links">
                <Link href={node.details!.link!}>
                  Read project
                  <span className="sr-only">: {node.details!.title}</span>
                </Link>
                {node.details!.github && (
                  <a
                    href={node.details!.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Source code
                    <span className="sr-only">: {node.details!.title}</span>
                  </a>
                )}
                <span>
                  {node.details!.image &&
                    node.details!.subtitle?.split(" | ")[0]}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
