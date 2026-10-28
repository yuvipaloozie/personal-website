import type { Metadata } from "next";
import Link from "next/link";
import { graphData } from "@/data/graphData";
export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on machine learning, biomedical image analysis, and engineering software.",
};
export default function Blog() {
  const notes = graphData.nodes.filter((n) => n.id.startsWith("b_"));
  return (
    <div className="container section">
      <h1 className="page-title">Blog</h1>
      <p className="page-intro">
        Ideas and methods from working across engineering and machine learning.
      </p>
      <div className="notes-index">
        <ul>
          {notes.map((n) => (
            <li key={n.id}>
              <Link href={n.details!.link!}>{n.details!.title}</Link>
              <p>{n.details!.description}</p>
              <span className="entry-date">{n.details!.subtitle}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
