import type { Metadata } from "next";
import ProjectIndex from "@/components/ProjectIndex";
import ProcessSurface from "@/components/ProcessSurface";
import ResearchThreads from "@/components/ResearchThreads";
import { PixelIcon } from "@/components/ui/pixel-icon";
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects in process safety, interpretable machine learning, biomedical computer vision, and statistical modeling.",
};
export default function Projects() {
  return (
    <ProcessSurface kind="projects">
      <h1 className="page-title">Projects</h1>
      <p className="page-intro">
        Applied research across engineering and machine learning.
      </p>
      <ProjectIndex />
      <details className="thread-disclosure">
        <summary>Explore by research topic<PixelIcon name="arrow" /></summary>
        <ResearchThreads />
      </details>
    </ProcessSurface>
  );
}
