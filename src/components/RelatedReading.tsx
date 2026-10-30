import Link from "next/link";
import { relatedReading } from "@/lib/researchConnections";

export default function RelatedReading({ nodeId }: { nodeId: string }) {
  const entries = relatedReading(nodeId);
  if (!entries.length) return null;
  return (
    <aside className="related-reading" aria-labelledby="related-title">
      <h2 id="related-title">Related</h2>
      <ul>
        {entries.map(({ node, method }) => (
          <li key={node.id}>
            <span className="reading-connection">
              {method}
            </span>
            <div className="reading-preview">
              <Link href={node.details!.link!}>{node.details!.title}</Link>
              <p>{node.details!.description}</p>
            </div>
            <span className="entry-kind">{node.id.startsWith("b_") ? "Note" : "Project"}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
