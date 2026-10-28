import type { Metadata } from "next";
import ProjectIndex from "@/components/ProjectIndex";
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects in process safety, interpretable machine learning, biomedical computer vision, and statistical modeling.",
};
export default function Projects() {
  return (
    <div className="container section">
      <h1 className="page-title">Projects</h1>
      <p className="page-intro">
        Applied research across engineering and machine learning.
      </p>
      <ProjectIndex />
    </div>
  );
}
