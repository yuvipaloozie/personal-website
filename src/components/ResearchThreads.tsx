"use client";

import { useState } from "react";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toggle } from "@base-ui/react/toggle";
import Link from "next/link";
import { entriesForThread, researchThreads } from "@/lib/researchConnections";

export default function ResearchThreads() {
  const [selected, setSelected] = useState(researchThreads[0]);
  const entries = entriesForThread(selected.id);

  return (
    <section
      id="research-threads"
      className="research-threads"
      aria-labelledby="threads-title"
    >
      <div className="threads-heading">
        <h2 id="threads-title">Follow a thread</h2>
        <p>A small index of ideas that connect the work.</p>
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
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10h11m-4-4 4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
