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
      label: "How CNNs learn to see",
      group: 4,
      type: "detail",
      details: {
        title: "How CNNs learn to see",
        subtitle: "October 30, 2026",
        description: "How small filters become useful visual features, and what this shares with human vision.",
        fullDescription: [
          "An illustrated introduction to convolution, receptive fields, and learning, grounded in visual neuroscience and medical imaging research.",
        ],
        link: "/blog/how-cnns-learn-to-see",
      },
    },
    {
      id: "b_iot",
      label: "Industrial IoT",
      group: 4,
      type: "detail",
      details: {
        title: "Industrial IoT & Predictive Maintenance",
        subtitle: "April 22, 2026",
        description:
          "How combining edge computing with ARIMA models can drastically reduce downtime and false alarms in continuous manufacturing environments.",
        fullDescription: [
          "Modern manufacturing plants are equipped with thousands of sensors, but the majority of this telemetry data is either ignored or simply threshold-monitored. This leads to a reactive maintenance culture, where engineers only respond after a critical failure has occurred.",
          "By deploying Edge IoT gateways, we can perform real-time data aggregation and noise filtering directly on the factory floor. We then feed this cleaned data into an autoregressive integrated moving average (ARIMA) model.",
          "This predictive model learns the normal operating baseline of the equipment. When vibrations or temperature spikes begin to deviate from this baseline, the system triggers a predictive alert weeks before an actual mechanical failure, allowing for planned, minimally disruptive maintenance.",
        ],
        link: "/blog/industrial-iot",
      },
    },
    {
      id: "b_dash",
      label: "Engineering Dashboards",
      group: 4,
      type: "detail",
      details: {
        title: "Designing Minimalist Engineering Dashboards",
        subtitle: "March 05, 2026",
        description:
          "Why depth, texture, and restraint are crucial when building interfaces for complex engineering tools. Moving away from dark-mode clutter.",
        fullDescription: [
          "In the industrial sector, HMIs (Human-Machine Interfaces) and dashboards are notoriously cluttered. They are often built with harsh dark backgrounds, glaring neon text, and an overwhelming array of gauges that cause cognitive overload.",
          "We can solve this by applying modern, minimalist design principles to engineering tools. By utilizing an industrial color palette—like Slate Harbor and Iron Forest—we can create interfaces that are easy on the eyes during long monitoring shifts.",
          "Incorporating subtle depth, such as drafting paper textures and clean structural lines, provides a technical feel without the visual noise. The goal is to highlight the actual data and telemetry anomalies, bringing critical actionable insights to the forefront.",
        ],
        link: "/blog/engineering-dashboards",
      },
    },
    {
      id: "b_imbalance",
      label: "Class Imbalance",
      group: 4,
      type: "detail",
      details: {
        title: "Handling Class Imbalance in Sensor Data",
        subtitle: "February 18, 2026",
        description:
          "A deep dive into SMOTE, Isolation Forests, and customized loss functions for detecting rare failure modes in high-dimensional sensor arrays.",
        fullDescription: [
          "In failure prediction, the dataset is almost always heavily skewed. A manufacturing machine might run perfectly for 99.9% of the time, leaving only a tiny fraction of data representing actual failure modes. Standard machine learning models trained on this data will simply predict 'No Failure' 100% of the time and still achieve 99.9% accuracy.",
          "To combat this, we must utilize advanced sampling techniques. SMOTE (Synthetic Minority Over-sampling Technique) can generate synthetic examples of the minority failure class, giving the model enough examples to learn the decision boundaries.",
          "Alternatively, framing the problem as anomaly detection rather than binary classification can yield better results. Using an Isolation Forest, we train the model exclusively on the 'normal' telemetry data, allowing it to easily flag any rare, out-of-distribution events as anomalies.",
        ],
        link: "/blog/class-imbalance",
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
    { source: "blog", target: "b_iot" },
    { source: "blog", target: "b_dash" },
    { source: "blog", target: "b_imbalance" },

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
    { source: "s_ml", target: "b_imbalance" },

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
    { source: "s_auto", target: "b_iot" },
    { source: "s_auto", target: "b_dash" },
  ],
};

// Share one curated set across cards, reading connections and the graph explorer.
const nodes = originalGraphData.nodes;
const nodeIds = new Set(nodes.map(node => node.id));
export const graphData: { nodes: NodeData[]; links: LinkData[] } = {
  nodes,
  links: originalGraphData.links.filter(link => nodeIds.has(link.source) && nodeIds.has(link.target)),
};
