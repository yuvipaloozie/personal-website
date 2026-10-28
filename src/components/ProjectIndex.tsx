"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { DitherSweep } from "@/components/ui/dither-sweep";
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
  const ProjectHeading = featured ? "h3" : "h2";
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
    <div className={featured ? "project-index featured-index" : "project-index"}>
      <ToggleGroup
        className="topic-filter"
        aria-label="Filter projects by topic"
        value={[topic]}
        onValueChange={(value) => {
          if (value[0]) setTopic(value[0]);
        }}
      >
        {topics.map((item) => (
          <Toggle className="sweep-target" key={item.id} value={item.id} aria-controls="project-results">
            <DitherSweep /><span className="sweep-label">{item.label}</span>
          </Toggle>
        ))}
      </ToggleGroup>
      <p className="result-count" role="status">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
        {featured && topic === "all" ? " selected" : ""}
      </p>
      <div id="project-results">
        {visible.map((node) => (
          <article className={node.details!.image ? "project-entry" : "project-entry project-text-only"} key={node.id}>
            <div className="project-figure">
              {node.details!.image && (
                <Image
                  src={node.details!.image}
                  alt={node.details!.title}
                  width={featured ? 480 : 112}
                  height={featured ? 336 : 86}
                  sizes={featured ? "(max-width: 600px) 90vw, 460px" : "112px"}
                />
              )}
            </div>
            <div>
              <ProjectHeading>
                <Link href={node.details!.link!}>{node.details!.title}</Link>
              </ProjectHeading>
              <p>{node.details!.description}</p>
              <div className="project-links">
                <Link href={node.details!.link!}>
                  Read project
                  <PixelIcon name="arrow" />
                  <span className="sr-only">: {node.details!.title}</span>
                </Link>
                {node.details!.github && (
                  <a
                    href={node.details!.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Source code
                    <PixelIcon name="code" />
                    <span className="sr-only">: {node.details!.title}</span>
                  </a>
                )}
                <span>
                  {node.details!.subtitle?.split(" | ")[0]}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
