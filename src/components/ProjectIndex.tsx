"use client";
import { useState } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { DitherSweep } from "@/components/ui/dither-sweep";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toggle } from "@base-ui/react/toggle";
import { graphData } from "@/data/graphData";
import { projectPreviews, selectedProjectIds } from "@/lib/project-previews";
import { SelectionIndicator } from "@/components/ui/selection-indicator";

const topics = [
  { id: "all", label: "All work" },
  { id: "industrial", label: "Industrial systems" },
  { id: "graphs", label: "Graphs" },
  { id: "biomedical", label: "Biomedical" },
  { id: "modeling", label: "Modeling" },
];
const memberships: Record<string, string[]> = {
  industrial: ["p_psm", "p_yield"],
  graphs: ["p_psm"],
  biomedical: ["p_chana", "p_arrhythmia"],
  modeling: [
    "p_yield",
    "p_trading",
    "p_arrhythmia",
  ],
};
export default function ProjectIndex({
  featured = false,
}: {
  featured?: boolean;
}) {
  const [topic, setTopic] = useState("all");
  const ProjectHeading = featured ? "h3" : "h2";
  const projects = selectedProjectIds.map(id => graphData.nodes.find(node => node.id === id)!);
  const visible =
    topic === "all"
      ? featured
        ? projects.slice(0, 3)
        : projects
      : projects.filter((node) => memberships[topic]?.includes(node.id));
  return (
    <div className={featured ? "project-index featured-index" : "project-index"}>
      {!featured && <ToggleGroup
        className="topic-filter"
        aria-label="Filter projects by topic"
        value={[topic]}
        onValueChange={(value) => {
          if (value[0]) setTopic(value[0]);
        }}
      >
        <SelectionIndicator value={topic} />
        {topics.map((item) => (
          <Toggle className="sweep-target" key={item.id} value={item.id} aria-controls="project-results">
            <DitherSweep /><span className="sweep-label">{item.label}</span>
          </Toggle>
        ))}
      </ToggleGroup>}
      {!featured && <p className="result-count" role="status">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
        {featured && topic === "all" ? " selected" : ""}
      </p>}
      <div id="project-results">
        {visible.map((node) => (
          <article data-process-item className={node.details!.image ? "project-entry" : "project-entry project-text-only"} key={node.id}>
            <a className="project-figure" href={node.details!.github!} target="_blank" rel="noreferrer" aria-label={`${node.details!.title} on GitHub, opens in a new tab`}>
              {node.details!.image && (
                <Image
                  src={node.details!.image}
                  alt={projectPreviews[node.id].imageAlt}
                  width={featured ? 480 : 336}
                  height={featured ? 336 : 256}
                  sizes={featured ? "(max-width: 600px) 90vw, 460px" : "(max-width: 600px) 80vw, 168px"}
                />
              )}
            </a>
            <div>
              <ProjectHeading>
                <a href={node.details!.github!} target="_blank" rel="noreferrer">{projectPreviews[node.id].title}<span className="sr-only"> on GitHub, opens in a new tab</span></a>
              </ProjectHeading>
              <p>{projectPreviews[node.id]?.summary ?? node.details!.description}</p>
              <ul className="project-methods" aria-label="Libraries and skills">
                {projectPreviews[node.id].methods.map(method => <li key={method}>{method}</li>)}
              </ul>
              <div className="project-links">
                {node.details!.github && (
                  <a
                    className="sweep-target"
                    href={node.details!.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <DitherSweep /><span className="sweep-label"><FaGithub aria-hidden="true" /> GitHub<span className="sr-only">: {node.details!.title}, opens in a new tab</span></span>
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
