import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProcessSurface from "@/components/ProcessSurface";
import { graphData } from "@/data/graphData";
import "@/styles/process-reading.css";

export function generateStaticParams() {
  return graphData.nodes
    .filter((node) => node.type === "detail" && node.id.startsWith("e_") && node.details?.link?.startsWith("/experience/"))
    .map((node) => ({ slug: node.details!.link!.split("/").pop()! }));
}

export async function generateMetadata({ params }: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const details = graphData.nodes.find((node) => node.details?.link === `/experience/${slug}`)?.details;
  return details
    ? { title: details.title, description: details.description }
    : { title: "Experience not found" };
}

export default async function ExperiencePost({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const node = graphData.nodes.find((node) => node.type === "detail" && node.details?.link === `/experience/${slug}`);
  if (!node?.details) notFound();
  const { title, subtitle, image, description, fullDescription, tags } = node.details;

  return (
    <ProcessSurface kind="experience">
      <article className="process-reading process-reading-article">
        <Link href="/resume" className="back-link">Back to resume</Link>
        <h1 className="page-title">{title}</h1>
        <p className="entry-date">{subtitle}</p>
        <p className="project-summary">{description}</p>
        {image && (
          <Image src={image} alt={title} width={840} height={400}
            sizes="(max-width: 900px) 100vw, 760px" className="detail-image" />
        )}
        <div className="prose">
          {fullDescription?.filter(paragraph => paragraph !== description).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
        {tags && tags.length > 0 && <p className="entry-tags">{tags.join(" · ")}</p>}
      </article>
    </ProcessSurface>
  );
}
