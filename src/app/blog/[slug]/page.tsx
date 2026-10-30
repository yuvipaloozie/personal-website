import type { Metadata } from "next";
import Image from "next/image";
import RelatedReading from "@/components/RelatedReading";
import { graphData } from "@/data/graphData";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProcessSurface from "@/components/ProcessSurface";
import CnnVisionArticle from "@/components/articles/CnnVisionArticle";
import "@/styles/process-reading.css";
import "@/styles/cnn-article.css";

export function generateStaticParams() {
  const blogNodes = graphData.nodes.filter(n => n.type === 'detail' && n.id.startsWith('b_'));
  return blogNodes.map(node => {
    const slug = node.details?.link?.split("/").pop();
    return { slug };
  });
}

export async function generateMetadata({ params }: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const details = graphData.nodes.find(n => n.details?.link === `/blog/${slug}`)?.details;
  return details ? { title: details.title, description: details.description } : { title: "Note not found" };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const node = graphData.nodes.find(n => n.type === 'detail' && n.details?.link === `/blog/${slug}`);

  if (!node || !node.details) {
    notFound();
  }

  const { title, subtitle, image, description, fullDescription } = node.details;

  return (
    <ProcessSurface kind="detail">
      <article className="process-reading process-reading-article">
        <Link href="/blog" className="back-link">Back to blog</Link>
        <h1 className="page-title">{title}</h1>
        <p className="entry-date">{subtitle}{node.id === "b_unet" && " · 7 min read"}</p>
        <p className="project-summary">{description}</p>
        {image && (
          <Image src={image} alt={title} width={760} height={400}
            sizes="(max-width: 800px) 100vw, 760px" className="detail-image" />
        )}
        <div className="prose">
          {node.id === "b_unet" ? <CnnVisionArticle /> : fullDescription?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
        <RelatedReading nodeId={node.id} />
      </article>
    </ProcessSurface>
  );
}
