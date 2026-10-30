import type { Metadata } from "next";
import ProjectIndex from "@/components/ProjectIndex";
import ProcessSurface from "@/components/ProcessSurface";
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects in process safety, interpretable machine learning, biomedical computer vision, and statistical modeling.",
};
export default function Projects() {
  return (
    <ProcessSurface kind="projects">
      <h1 className="page-title">Projects</h1>
      <ProjectIndex />
    </ProcessSurface>
  );
}
