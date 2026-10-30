import type { Metadata } from "next";
import Link from "next/link";
import { graphData } from "@/data/graphData";
import ProcessSurface from "@/components/ProcessSurface";
import "@/styles/process-reading.css";
export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on machine learning, biomedical image analysis, and engineering software.",
};
export default function Blog() {
  const notes = graphData.nodes.filter((n) => n.id.startsWith("b_"));
  return (
    <ProcessSurface kind="blog">
      <h1 className="page-title">Blog</h1>
      <div className="process-reading process-writing-list">
        <ul>
          {notes.map((n) => (
            <li key={n.id} data-process-item={n.id}>
              <Link href={n.details!.link!}>{n.details!.title}</Link>
              <time className="entry-date" dateTime={n.details!.subtitle ? new Date(n.details!.subtitle).toISOString().slice(0, 10) : undefined}>{n.details!.subtitle}</time>
            </li>
          ))}
        </ul>
      </div>
    </ProcessSurface>
  );
}
