import { projectPreviews } from "@/lib/project-previews";
import { career, education, profile } from "@/lib/profile";

export type NodeData = {
  id: string;
  label: string;
  group: number;
  type: "root" | "category" | "detail";
  details?: {
    title: string;
    subtitle?: string;
    date?: string;
    description: string;
    fullDescription?: string[];
    tags?: string[];
    image?: string;
    link?: string;
    github?: string;
  };
};

export type LinkData = {
  source: string;
  target: string;
};

const originalGraphData: { nodes: NodeData[]; links: LinkData[] } = {
  nodes: [
    // ROOT
    {
      id: "me",
      label: profile.name,
      group: 0,
      type: "root",
      details: {
        title: profile.name,
        subtitle: "Industrial AI & Process Engineering",
        description:
          `${career.arclin.title} at ${career.arclin.employer} and graduate student in ${education.graduate.subject} at ${education.shortInstitution}. Interests include process safety knowledge graphs, machine learning, computer vision, and industrial automation.`,
        fullDescription: [profile.introduction],
        image: "/profile.jpg",
        link: "/about",
        github: profile.github,
      },
    },

    // CATEGORIES
    { id: "projects", label: "Projects", group: 1, type: "category" },
    { id: "experience", label: "Experience", group: 2, type: "category" },
    { id: "skills", label: "Core Skills", group: 3, type: "category" },
    { id: "blog", label: "Writing", group: 4, type: "category" },

    // Project truth is shared with the curated cards and GitHub redirects.
    ...Object.entries(projectPreviews).map(([id, project]): NodeData => ({
      id, label: project.title, group: 1, type: "detail",
      details: {
        title: project.title, subtitle: String(project.year),
        description: project.summary, fullDescription: [project.summary],
        image: project.image, tags: project.tags,
        link: project.github, github: project.github,
      },
    })),

    // Shared professional facts also drive the resume and experience pages.
    ...Object.entries(career).map(([key, role]): NodeData => ({
      id: key === "bayer2023" ? "e_bayer_2023" : `e_${key}`,
      label: key === "pcom" ? "PCOM" : role.employer,
      group: 2, type: "detail",
      details: { title: role.title, subtitle: `${role.employer} | ${role.dates}`,
        description: role.summary, fullDescription: [...role.details], link: role.link },
    })),

    // BLOG POSTS
    {
      id: "b_unet",
      label: "CNNs and the visual cortex",
      group: 4,
      type: "detail",
      details: {
        title: "CNNs and the visual cortex",
        subtitle: "September 2026",
        date: "2026-09",
        description: "How CNNs inherit ideas from visual cortex, and how researchers test the overlap using human brain data.",
        fullDescription: [
          "A research-led explanation of receptive fields, pooling, cortical hierarchies, and the experiments that measure shared representations in CNNs and human visual cortex.",
        ],
        link: "/blog/how-cnns-learn-to-see",
      },
    },
    // SKILLS
    { id: "s_python", label: "Python", group: 3, type: "detail" },
    { id: "s_ml", label: "Machine Learning", group: 3, type: "detail" },
    { id: "s_cv", label: "Computer Vision", group: 3, type: "detail" },
    { id: "s_gnn", label: "GNNs & GraphRAG", group: 3, type: "detail" },
    { id: "s_auto", label: "Industrial Auto", group: 3, type: "detail" },
    { id: "s_stats", label: "Statistical Modeling", group: 3, type: "detail" },
  ],
  links: [
    // Categories to Root
    { source: "me", target: "projects" },
    { source: "me", target: "experience" },
    { source: "me", target: "skills" },
    { source: "me", target: "blog" },

    // Projects to Category
    { source: "projects", target: "p_psm" },
    { source: "projects", target: "p_yield" },
    { source: "projects", target: "p_chana" },
    { source: "projects", target: "p_gnn" },
    { source: "projects", target: "p_trading" },
    { source: "projects", target: "p_arrhythmia" },
    { source: "projects", target: "p_powerlifting" },
    { source: "projects", target: "p_breastcancer" },

    // Experience to Category
    { source: "experience", target: "e_arclin" },
    { source: "experience", target: "e_wood" },
    { source: "experience", target: "e_pcom" },
    { source: "experience", target: "e_alcon" },
    { source: "experience", target: "e_bayer" },
    { source: "experience", target: "e_bayer_2023" },
    { source: "experience", target: "e_ambitus" },

    // Blog to Category
    { source: "blog", target: "b_unet" },

    // Skills to Category
    { source: "skills", target: "s_python" },
    { source: "skills", target: "s_ml" },
    { source: "skills", target: "s_cv" },
    { source: "skills", target: "s_gnn" },
    { source: "skills", target: "s_auto" },
    { source: "skills", target: "s_stats" },

    // Cross-links (Skills to Projects/Experience/Blog)
    { source: "s_python", target: "p_psm" },
    { source: "s_python", target: "p_yield" },
    { source: "s_python", target: "p_gnn" },
    { source: "s_python", target: "p_trading" },
    { source: "s_python", target: "p_powerlifting" },

    { source: "s_gnn", target: "p_psm" },
    { source: "s_gnn", target: "p_gnn" },

    { source: "s_ml", target: "p_yield" },
    { source: "s_ml", target: "p_trading" },
    { source: "s_ml", target: "p_arrhythmia" },
    { source: "s_ml", target: "p_breastcancer" },

    { source: "s_cv", target: "p_chana" },
    { source: "s_cv", target: "b_unet" },
    { source: "s_cv", target: "e_pcom" },

    { source: "s_stats", target: "p_powerlifting" },
    { source: "s_stats", target: "p_trading" },
    { source: "s_stats", target: "p_arrhythmia" },

    { source: "s_auto", target: "p_psm" },
    { source: "s_auto", target: "e_arclin" },
    { source: "s_auto", target: "e_wood" },
    { source: "s_auto", target: "e_alcon" },
    { source: "s_auto", target: "e_bayer" },
    { source: "s_auto", target: "e_bayer_2023" },
    { source: "s_auto", target: "e_ambitus" },
  ],
};

// Share one curated set across cards, reading connections and the graph explorer.
const nodes = originalGraphData.nodes;
const nodeIds = new Set(nodes.map(node => node.id));
export const graphData: { nodes: NodeData[]; links: LinkData[] } = {
  nodes,
  links: originalGraphData.links.filter(link => nodeIds.has(link.source) && nodeIds.has(link.target)),
};
