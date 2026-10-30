export const profile = {
  name: "Yuvraj Tripathy",
  location: "Atlanta metro area",
  email: "yuvraj.tripathy@outlook.com",
  github: "https://github.com/yuvipaloozie",
  linkedin: "https://www.linkedin.com/in/yuvrajtripathy",
} as const;

export const technicalSkills = [
  { area: "AI & machine learning", tools: "Python, PyTorch, TensorFlow, XGBoost, Random Forest, OpenCV, LangChain, MLflow, ONNX." },
  { area: "Data engineering & software", tools: "SQL, PostgreSQL, Neo4j, PySpark, TypeScript, GCP, AWS, GitHub, Docker." },
  { area: "Industrial automation", tools: "Ignition, DeltaV, Honeywell Experion, Allen Bradley, RSLogix, MQTT." },
] as const;

export const education = {
  institution: "Georgia Institute of Technology",
  shortInstitution: "Georgia Tech",
  graduate: { degree: "MSc. Data Science", subject: "Data Science", completion: "Expected May 2027" },
  undergraduate: { degree: "BSc. Chemical and Biomolecular Engineering", completion: "May 2024" },
} as const;

export const career = {
  arclin: {
    employer: "Arclin",
    title: "Corporate Automation Engineer II",
    dates: "Sep 2026–Present",
    location: "Alpharetta, Georgia · Hybrid",
    summary: "Corporate Automation Engineer II at Arclin, based at the Alpharetta headquarters in a hybrid role.",
  },
  wood: {
    employer: "Wood",
    title: "Process Automation Engineer",
    dates: "May 2024–2026",
    summary: "Developed automated control systems, NLP engineering tools, and workflows for engineering data and process visualization.",
  },
  pcom: {
    employer: "Philadelphia College of Osteopathic Medicine",
    title: "Machine Learning Researcher",
    dates: "May 2025–Present",
    summary: "Applies deep learning and computer vision to biomedical microscopy, including osteoclast segmentation and counting.",
  },
  alcon: {
    employer: "Alcon",
    title: "Backend Equipment Engineering Co-op",
    dates: "Aug 2023–Dec 2023",
    summary: "Worked on equipment testing, root cause analysis, and predictive maintenance using time-series and change detection methods.",
  },
  bayer: {
    employer: "Bayer",
    title: "Process Control Engineering Co-op",
    dates: "Jun 2022–Dec 2022",
    summary: "Programmed DeltaV control modules and helped integrate a standalone PLC into the plant DCS, with operator graphics and training documentation.",
  },
} as const;
