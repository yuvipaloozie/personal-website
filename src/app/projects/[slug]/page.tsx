import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import RelatedReading from "@/components/RelatedReading";
import { graphData } from "@/data/graphData";
import ProcessSurface from "@/components/ProcessSurface";
import "@/styles/process-reading.css";
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
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const node = graphData.nodes.find(
    (n) => n.id.startsWith("p_") && n.details?.link === `/projects/${slug}`,
  );
  if (!node?.details) notFound();
  const { title, subtitle, image, description, fullDescription, tags, github } =
    node.details;
  return (
    <ProcessSurface kind="detail">
    <article className="process-reading process-reading-article">
      <Link href="/projects" className="back-link">
        Back to projects
      </Link>
      <h1 className="page-title">{title}</h1>
      <p className="entry-date">{subtitle}</p>
      <p className="project-summary">{description}</p>
      {image && (
        <Image
          className={node.id === "p_psm" ? "detail-image psm-image" : "detail-image"}
          src={image}
          alt={title}
          width={840}
          height={400}
          sizes="(max-width: 900px) 100vw, 840px"
        />
      )}
      {node.id === "p_psm" && (
        <p className="psm-caption">PSM and its shared methods, drawn from this site’s knowledge graph.</p>
      )}
      <div className="prose">
        {fullDescription?.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {github && (
        <a href={github} target="_blank" rel="noreferrer">
          Explore source code
        </a>
      )}
      {tags && <p className="entry-tags">{tags.join(" · ")}</p>}
      <RelatedReading nodeId={node.id} />
    </article>
    </ProcessSurface>
  );
}
