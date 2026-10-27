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

export const graphData: { nodes: NodeData[]; links: LinkData[] } = {
  nodes: [
    // ROOT
    {
      id: "me",
      label: "Yuvraj Tripathy",
      group: 0,
      type: "root",
      details: {
        title: "Yuvraj Tripathy",
        subtitle: "Data Science & Process Engineering",
        description:
          "Data Science and Chemical Engineering professional specializing in process safety knowledge graphs, machine learning, computer vision, and industrial automation. MSc Data Science at Georgia Tech.",
        fullDescription: [
          "Welcome to my knowledge graph portfolio. I specialize in bridging the gap between heavy industrial engineering and modern data science.",
          "With a foundation in Chemical and Biomolecular Engineering, I approach software and ML with a rigorous, process-oriented mindset. My goal is to build automated, highly reliable systems that solve complex physical and digital problems.",
          "Click around the graph to explore my specific projects, work experiences, and the core technologies I utilize to bring these solutions to life.",
        ],
        image: "/profile.jpg",
        link: "/about",
        github: "https://github.com/yuvipaloozie",
      },
    },

    // CATEGORIES
    { id: "projects", label: "Projects", group: 1, type: "category" },
    { id: "experience", label: "Experience", group: 2, type: "category" },
    { id: "skills", label: "Core Skills", group: 3, type: "category" },
    { id: "blog", label: "Writing", group: 4, type: "category" },

    // PROJECTS
    {
      id: "p_psm",
      label: "PSM Knowledge Graph",
      group: 1,
      type: "detail",
      details: {
        title: "PSM Process Safety Knowledge Graph",
        subtitle: "2026 | NLP & GraphRAG",
        description:
          "An end-to-end Process Safety Knowledge Graph ingesting unstructured HAZOPs & alarm databases using NLP & fuzzy matching with local Llama 3.2 GraphRAG.",
        fullDescription: [
          "Engineered an automated ingestion pipeline that parses complex, multi-thousand-page HAZOP (Hazard and Operability Study) tables and industrial alarm telemetry into structured graph representations.",
          "Implemented NLP entity extraction, fuzzy string matching, and semantic clustering to cross-reference equipment tag numbers against P&ID instrumentation hierarchies.",
          "Constructed a 3D interactive NetworkX and Neo4j graph database integrated with a local Llama 3.2 GraphRAG engine, enabling engineers to query process safety risks, safeguards, and cascading failure pathways in natural language.",
        ],
        tags: [
          "Python",
          "Llama 3.2",
          "GraphRAG",
          "Neo4j",
          "NetworkX",
          "NLP",
          "Process Safety",
        ],
        link: "/projects/psm-knowledge-graph",
        github: "https://github.com/yuvipaloozie/PSM-Knowledge-Graph",
      },
    },

    {
      id: "p_yield",
      label: "Yield Optimization",
      group: 1,
      type: "detail",
      details: {
        title: "Semiconductor Yield Optimization & RCA",
        subtitle: "2025 | Machine Learning & Root Cause Analysis",
        description:
          "Engineered XGBoost/Isolation Forest pipeline on real-world semiconductor manufacturing data to predict batch yield anomalies and extract root-cause sensor limits.",
        fullDescription: [
          "Analyzed 590+ continuous sensor readings per wafer from the real-world UCI SECOM semiconductor manufacturing process.",
          "Implemented SMOTETomek resampling and cost-sensitive loss functions to overcome severe class imbalance (1:14 failure ratio) without sacrificing anomaly recall.",
          "Extracted high-order interaction effects using SHAP (SHapley Additive exPlanations) tree explainers, converting black-box ML outputs into actionable physical operating limits for equipment calibration.",
        ],
        tags: [
          "Python",
          "XGBoost",
          "Isolation Forest",
          "SHAP",
          "SMOTETomek",
          "SECOM",
          "Data Analysis",
        ],
        image: "/semiconductor.png",
        link: "/projects/yield-optimization",
        github:
          "https://github.com/yuvipaloozie/Semiconductor-Yield-Optimization-and-RCA",
      },
    },

    {
      id: "p_chana",
      label: "Project CHANA",
      group: 1,
      type: "detail",
      details: {
        title: "Project CHANA (Biomedical Analyzer)",
        subtitle: "2025 | Deep Learning & Biomedical CV",
        description:
          "Automated counting & segmentation of multinucleated osteoclasts using U-Net++ CNN architecture, data augmentation, and semi-supervised learning with a FastAPI/OpenCV dashboard.",
        fullDescription: [
          "Architected an end-to-end deep learning computer vision pipeline utilizing U-Net++ with nested dense skip connections for multi-scale cellular morphology segmentation.",
          "Achieved a sub-8.8% error rate across 19,600+ analyzed cellular instances, significantly outperforming traditional thresholding and manual microscopic counts.",
          "Engineered a companion local executable dashboard repository (CHANA-dashboard) utilizing FastAPI, Docker, and OpenCV for interactive high-throughput researcher analysis.",
        ],
        tags: [
          "PyTorch",
          "U-Net++",
          "Computer Vision",
          "FastAPI",
          "Docker",
          "OpenCV",
          "Biomedical",
        ],
        image: "/biomedical.png",
        link: "/projects/chana-analyzer",
        github: "https://github.com/yuvipaloozie/OCLAST",
      },
    },

    {
      id: "p_gnn",
      label: "Chemistry with GNNs",
      group: 1,
      type: "detail",
      details: {
        title: "Predicting Chemistry with Graph Neural Networks",
        subtitle: "2025 | Geometric Deep Learning",
        description:
          "Utilized SchNet, DimeNet, and custom Graph Neural Networks (GNNs) on 138,000+ simulated molecules to predict HOMO-LUMO energy gaps and 3D molecular coordinates.",
        fullDescription: [
          "Formulated molecular structures as spatial graph networks where nodes represent atoms with atomic number features and edges encode continuous interatomic Euclidean distances.",
          "Implemented continuous-filter convolutional layers (SchNet) and directional message-passing (DimeNet) to capture 3D spatial rotational and translational equivariance.",
          "Achieved state-of-the-art predictive accuracy on quantum chemical target properties (HOMO-LUMO energy gap) across 138,000+ QM9 molecular structures, reducing simulation times by orders of magnitude.",
        ],
        tags: [
          "Python",
          "PyTorch Geometric",
          "GNNs",
          "Quantum Chemistry",
          "SchNet",
          "Deep Learning",
        ],
        link: "/projects/chemistry-gnns",
        github:
          "https://github.com/yuvipaloozie/Predicting-Chemistry-with-GNNs",
      },
    },

    {
      id: "p_trading",
      label: "Regime-Aware Trading",
      group: 1,
      type: "detail",
      details: {
        title: "Regime-Aware Sector Rotation Strategy",
        subtitle: "2025 | Quantitative Finance & HMMs",
        description:
          "Constructed a dynamic sector ETF rotation portfolio using Gaussian Hidden Markov Models (HMMs) for market regime detection and XGBRanker for alpha generation.",
        fullDescription: [
          "Modeled latent macroeconomic transitions across bull, bear, and high-volatility regimes using multivariate Gaussian Hidden Markov Models (HMMs) on multi-asset market indicators.",
          "Trained an XGBRanker model to dynamically rank and rebalance sector ETF weights based on momentum, valuation, and volatility features conditioned on the active market regime.",
          "Demonstrated superior risk-adjusted returns (Sharpe ratio improvement >35%) and reduced maximum drawdowns compared to static benchmark sector strategies.",
        ],
        tags: [
          "Python",
          "HMMs",
          "XGBRanker",
          "Quantitative Finance",
          "Portfolio Optimization",
          "Scikit-Learn",
        ],
        link: "/projects/regime-aware-trading",
        github: "https://github.com/yuvipaloozie/Regime-Aware-Sector-Trading",
      },
    },

    {
      id: "p_arrhythmia",
      label: "ECG Arrhythmia Classification",
      group: 1,
      type: "detail",
      details: {
        title: "ECG Arrhythmia Classification",
        subtitle: "2025 | Biomedical Signal Processing & ML",
        description:
          "Classified complex cardiac arrhythmias using physics-based feature extraction, wavelet transforms, and ensemble ML models on clinical multi-lead ECG signals.",
        fullDescription: [
          "Preprocessed multi-lead ECG time-series data with Pan-Tompkins QRS detection and discrete wavelet transform (DWT) baseline wander denoising.",
          "Engineered domain-specific morphological features including RR interval variance, ST-segment elevation, and spectral power density distributions.",
          "Trained and evaluated ensemble classifiers achieving high diagnostic sensitivity across ventricular, supraventricular, and normal beat classifications.",
        ],
        tags: [
          "Python",
          "Signal Processing",
          "Wavelets",
          "Scikit-Learn",
          "Biomedical ML",
          "ECG",
        ],
        link: "/projects/arrhythmia-classification",
        github:
          "https://github.com/yuvipaloozie/Arrythmia-Classification-with-ML",
      },
    },

    {
      id: "p_powerlifting",
      label: "Powerlifting Quantiles",
      group: 1,
      type: "detail",
      details: {
        title: "Rescoring Powerlifting with Quantiles",
        subtitle: "2025 | Statistical Modeling & Sports Analytics",
        description:
          "Developed a fair, non-parametric strength coefficient metric using non-linear quantile regression on 500k+ historical lifter entries across weight classes and eras.",
        fullDescription: [
          "Analyzed over 500,000 competitive powerlifting entries from the OpenPowerlifting database to evaluate systemic bias in classical allometric scaling formulas (Wilks, DOTS, GLP).",
          "Constructed continuous non-linear quantile regression curves across bodyweight and age spectrums to normalize athletic performance relative to empirical percentile distributions.",
          "Built an interpretable coefficient calculator that provides athlete-centric percentile ranking independent of historical equipment era shifts.",
        ],
        tags: [
          "Python",
          "Quantile Regression",
          "Statistical Modeling",
          "Sports Analytics",
          "Data Visualization",
        ],
        link: "/projects/powerlifting-quantiles",
        github:
          "https://github.com/yuvipaloozie/Rescoring-Powerlifting-with-Quantiles",
      },
    },

    {
      id: "p_breastcancer",
      label: "Tumor ML Classifier",
      group: 1,
      type: "detail",
      details: {
        title: "Breast Cancer Diagnostic Classifier",
        subtitle: "2025 | Clinical Diagnostics & Supervised ML",
        description:
          "Supervised machine learning classifiers trained on digitized fine needle aspirate (FNA) biopsy data for early malignant tumor diagnosis.",
        fullDescription: [
          "Trained multiple supervised classification models on digitized cell nuclei characteristics from fine needle aspirate (FNA) biopsies.",
          "Conducted extensive cross-validation, recursive feature elimination, and ROC-AUC curve optimization with a focus on eliminating false negative diagnoses.",
          "Delivered a clean, reproducible analysis pipeline documenting calibration curves and model explainability.",
        ],
        tags: [
          "Python",
          "Scikit-Learn",
          "Classification",
          "Biomedical ML",
          "Diagnostics",
        ],
        link: "/projects/breast-cancer-ml",
        github: "https://github.com/yuvipaloozie/BreastCancer",
      },
    },

    // EXPERIENCE
    {
      id: "e_wood",
      label: "Wood Plc",
      group: 2,
      type: "detail",
      details: {
        title: "Process Automation Engineer",
        subtitle: "Wood Plc | 2024 - Present",
        description:
          "Designing automated control systems, developing NLP engineering tooling, and optimizing legacy P&ID workflows.",
        fullDescription: [
          "Working closely with industrial automation hardware to modernize legacy process controls.",
          "Developed Python scripts and NLP tooling to automatically parse and cross-reference critical limits from 1000+ page HAZOP documents.",
          "Reduced manual engineering verification time by 40% across capital infrastructure projects.",
        ],
        link: "/experience/wood-plc",
      },
    },
    {
      id: "e_pcom",
      label: "PCOM",
      group: 2,
      type: "detail",
      details: {
        title: "Machine Learning Researcher",
        subtitle: "PCOM | 2023 - 2024",
        description:
          "Applied deep learning and computer vision techniques to novel biomedical microscopy datasets.",
        fullDescription: [
          "Spearheaded the development of deep learning models for biomedical imaging analysis (Project CHANA).",
          "Collaborated with biologists to refine feature extraction and segmentation protocols for cellular datasets.",
          "Published findings on optimized gradient flow and semi-supervised training in heavily imbalanced microscopy datasets.",
        ],
        link: "/experience/pcom-research",
      },
    },
    {
      id: "e_alcon",
      label: "Alcon",
      group: 2,
      type: "detail",
      details: {
        title: "Backend Equipment Engineering Co-op",
        subtitle: "Alcon | Aug 2023 - Dec 2023",
        description:
          "Leveraged ARIMA and change detection models for predictive maintenance, reducing downtime by weeks.",
        fullDescription: [
          "Worked on backend equipment engineering at Alcon during an August–December 2023 co-op.",
          "Applied ARIMA and change detection methods to equipment telemetry for predictive maintenance.",
        ],
        link: "/resume",
      },
    },

    // BLOG POSTS
    {
      id: "b_unet",
      label: "Scaling U-Net++",
      group: 4,
      type: "detail",
      details: {
        title: "Scaling U-Net++ for High-Res Microscopy Data",
        subtitle: "May 10, 2026",
        description:
          "Exploring the memory management challenges and patch-based optimizations required when adapting segmentation networks for large biological imagery.",
        fullDescription: [
          "When dealing with ultra high-resolution microscopy images, standard Convolutional Neural Networks like U-Net often struggle with memory constraints. Attempting to load a full 4K or 8K cellular scan into VRAM for segmentation usually results in an Out Of Memory (OOM) error.",
          "In this post, we explore patch-based training methodologies. By slicing the original high-resolution image into overlapping 256x256 or 512x512 patches, we can feed the network manageable chunks without losing the critical spatial context. We then use a specialized overlap-stitching algorithm during inference to reconstruct the final segmentation map seamlessly.",
          "Furthermore, we discuss the integration of deep supervision in U-Net++ architectures, which helps gradient flow and accelerates convergence when dealing with highly imbalanced cellular backgrounds.",
        ],
        link: "/blog/scaling-unet",
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
    { source: "experience", target: "e_wood" },
    { source: "experience", target: "e_pcom" },
    { source: "experience", target: "e_alcon" },

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
    { source: "s_auto", target: "e_wood" },
    { source: "s_auto", target: "e_alcon" },
    { source: "s_auto", target: "b_iot" },
    { source: "s_auto", target: "b_dash" },
  ],
};
