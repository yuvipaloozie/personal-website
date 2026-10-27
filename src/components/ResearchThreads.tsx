"use client";
import { PixelIcon } from "@/components/ui/pixel-icon";

import { useEffect, useState } from "react";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toggle } from "@base-ui/react/toggle";
import Link from "next/link";
import { entriesForThread, researchThreads } from "@/lib/researchConnections";

export default function ResearchThreads() {
  const [selected, setSelected] = useState(researchThreads[0]);
  useEffect(() => {
    function followAnchor() {
      const thread = researchThreads.find(
        (item) => window.location.hash === `#thread-${item.id}`,
      );
      if (thread) setSelected(thread);
    }
    followAnchor();
    window.addEventListener("hashchange", followAnchor);
    return () => window.removeEventListener("hashchange", followAnchor);
  }, []);
  const entries = entriesForThread(selected.id);

  return (
    <section
      id="research-threads"
      className="research-threads"
      aria-labelledby="threads-title"
    >
      <div className="threads-heading">
        <h2 id="threads-title">Follow a thread</h2>
        <p>Projects and notes connected by shared methods.</p>
      </div>
      <ToggleGroup
        className="thread-choices"
        aria-label="Choose a research thread"
        value={[selected.id]}
        onValueChange={(value) => {
          const next = researchThreads.find((thread) => thread.id === value[0]);
          if (next) setSelected(next);
        }}
      >
        {researchThreads.map((thread) => (
          <Toggle
            key={thread.id}
            id={`thread-${thread.id}`}
            value={thread.id}
            aria-controls="thread-entries"
          >
            {thread.label}
          </Toggle>
        ))}
      </ToggleGroup>
      <p className="thread-status" role="status">
        {entries.length} connected {entries.length === 1 ? "entry" : "entries"}{" "}
        in {selected.label.toLowerCase()}
      </p>
      <ul
        id="thread-entries"
        className="thread-entries"
        aria-label={`${selected.label} reading list`}
      >
        {entries.map((node) => (
          <li key={node.id}>
            <Link href={node.details!.link!}>
              <span className="entry-kind">
                {node.id.startsWith("b_") ? "Note" : "Project"}
              </span>
              <span>{node.details!.title}</span>
              <PixelIcon name="arrow" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
