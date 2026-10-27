import type { Metadata } from "next";
import Link from "next/link";
import { graphData } from "@/data/graphData";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return graphData.nodes
    .filter((n) => n.id.startsWith("p_"))
    .map((n) => ({ slug: n.details!.link!.split("/").pop()! }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const details = graphData.nodes.find(
    (n) => n.details?.link === `/projects/${slug}`,
  )?.details;
  return details
    ? { title: details.title, description: details.description }
    : { title: "Project not found" };
}
export default async function ProjectPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const node = graphData.nodes.find(
    (n) => n.id.startsWith("p_") && n.details?.link === `/projects/${slug}`,
  );
  if (!node?.details) notFound();
  const { title, subtitle, description, fullDescription, tags, github } =
    node.details;
  const headings = ["Context & problem", "Technical approach", "What I built"];
  return (
    <article className="container section case-study">
      <div className="case-topline">
        <Link href="/projects">← All projects</Link>
        {github && (
          <a href={github} target="_blank" rel="noreferrer">
            Explore source code ↗
          </a>
        )}
      </div>
      <p className="eyebrow">{subtitle}</p>
      <h1>{title}</h1>
      <p className="summary">{description}</p>
      {fullDescription?.map((paragraph, index) => (
        <section key={index}>
          <h2>{headings[index] ?? "Further detail"}</h2>
          <p>{paragraph}</p>
        </section>
      ))}
      {tags && (
        <div className="tags" aria-label="Technologies">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}
      <section>
        <h2>Discuss this project</h2>
        <p>
          For questions about the implementation, engineering decisions, or
          related roles,{" "}
          <a href="mailto:yuvraj.tripathy@outlook.com">get in touch</a>.
        </p>
      </section>
    </article>
  );
}
