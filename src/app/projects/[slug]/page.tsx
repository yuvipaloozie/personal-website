import { notFound, permanentRedirect } from "next/navigation";
import { projectPreviews } from "@/lib/project-previews";

export function generateStaticParams() {
  return Object.values(projectPreviews).map(project => ({ slug: project.slug }));
}

/** Repositories are the canonical project details; preserve old selected-project URLs. */
export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = Object.values(projectPreviews).find(project => project.slug === slug);
  if (!project) notFound();
  permanentRedirect(project.github);
}
