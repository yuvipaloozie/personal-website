export const profile = {
  name: "Yuvraj Tripathy",
  headline: "Building AI for heavy industry.",
  introduction: "I turn plant data and engineering knowledge into tools for process safety, quality, and automation.",
  location: "Atlanta metro area",
  email: "yuvraj.tripathy@outlook.com",
  github: "https://github.com/yuvipaloozie",
  linkedin: "https://www.linkedin.com/in/yuvrajtripathy",
} as const;

export const technicalSkills = [
  { area: "AI & machine learning", tools: "Python, PyTorch, TensorFlow, XGBoost, Random Forest, OpenCV, LangChain, MLflow, ONNX." },
  { area: "Data engineering & software", tools: "SQL, PostgreSQL, Neo4j, PySpark, TypeScript, GCP, AWS, GitHub, Docker." },
  { area: "Industrial automation", tools: "Ignition, DeltaV, Honeywell Experion, Allen Bradley, RSLogix 500, MQTT." },
] as const;

export const education = {
  institution: "Georgia Institute of Technology",
  shortInstitution: "Georgia Tech",
  graduate: { degree: "M.Sc. Computational Data Analytics", subject: "Computational Data Analytics", completion: "Expected May 2027", year: "2027" },
  undergraduate: { degree: "B.Sc. Chemical Engineering", subject: "Chemical Engineering", completion: "May 2024", year: "2024" },
} as const;

export const career = {
  "arclin": {
    "employer": "Arclin",
    "title": "Corporate Automation Engineer II",
    "dates": "Sep 2026–Present",
    "location": "Alpharetta, Georgia · Hybrid",
    "link": "/experience/arclin",
    "summary": "Works on process control, machine learning for manufacturing, and Industry 4.0 initiatives.",
    "details": [
      "Combines industrial automation and manufacturing data to support process-control and digital-manufacturing initiatives at Arclin."
    ]
  },
  "pcom": {
    "employer": "Philadelphia College of Osteopathic Medicine",
    "title": "Machine Learning Researcher",
    "dates": "May 2025–Present",
    "location": "Suwanee, Georgia · Remote",
    "link": "/experience/pcom-research",
    "summary": "Develops osteoclast segmentation, counting and annotation tools, alongside graph-based molecular modeling for osteoclastogenesis research.",
    "details": [
      "Builds microscopy workflows using U-Net++, OpenCV, watershed postprocessing and synthetic training data to support osteoclast counting and morphometric analysis.",
      "Developed a human-in-the-loop annotation dashboard with tiled inference and exportable image–mask pairs for model refinement.",
      "Trained a graph attention network on more than 113,000 ChEMBL molecules and combined molecular predictions with literature synthesis to inform candidate and assay selection."
    ]
  },
  "wood": {
    "employer": "Wood",
    "title": "Process Automation Engineer",
    "dates": "Jun 2024–Sep 2026",
    "location": "Raleigh, North Carolina · Hybrid",
    "link": "/experience/wood-plc",
    "summary": "Configured wet-milling controls across 200+ I/O points, built NLP tools for alarm rationalization, and developed 50+ operator graphics.",
    "details": [
      "Led greenfield controls configuration and site functional testing for a wet-milling process, including reusable logic, historian screens, sequencing, interlocks and PID loops. The reusable library reduced engineering time by 40%.",
      "Structured HAZOP, PHA and alarm-register data with Python, OCR and NLP, linking engineering documents through relational and graph databases for process-safety review.",
      "Developed more than 50 HMIWeb graphics and performed pre-functional testing during a Honeywell operator-interface migration."
    ]
  },
  "ambitus": {
    "employer": "Ambitus AI",
    "title": "Process Control SME",
    "dates": "Jun 2026–Aug 2026",
    "location": "",
    "link": "/experience/ambitus-ai",
    "summary": "Built a physics-based process simulator and benchmark for AI-generated controllers; evaluated a reference controller across 1,740 simulation trials.",
    "details": [
      "Translated slurry-preparation and wet-mill operating constraints into 420 machine-verifiable requirements covering safety, tracking, quality and disturbance recovery.",
      "Implemented nonlinear balances, actuator saturation, transport delays, sensor noise and uncertainty in Python/NumPy, with a grading and diagnostic workflow.",
      "Reference-controller evaluation covered 60 operating scenarios and 29 plant configurations, with safety, tracking, quality and recovery graded in simulation."
    ]
  },
  "alcon": {
    "employer": "Alcon",
    "title": "Equipment Engineering Co-op",
    "dates": "Aug 2023–Dec 2023",
    "location": "Johns Creek, Georgia · On-site",
    "link": "/resume",
    "summary": "Automated an offline lens-gripper test platform and improved packaging equipment and water-filtration reliability using mechanical design and process-data analysis.",
    "details": [
      "Built and automated a lens-gripper prototype with SolidWorks and ladder logic to test revised pneumatics and reduce dropped-lens faults.",
      "Designed cover guards for primary packaging lines; the resume and experience source document report an 8% OEE improvement.",
      "Applied ARIMA and change detection to water-filter performance across seven process parameters to support filter selection and maintenance planning."
    ]
  },
  "bayer2023": {
    "employer": "Bayer",
    "title": "PCT Engineering Intern",
    "dates": "May 2023–Aug 2023",
    "location": "Kansas City, Missouri · On-site",
    "link": "/experience/bayer-internship",
    "summary": "Integrated heat-tracing controls across 50+ process lines and used process-data analysis to improve water-specification control for dry-flowables manufacturing.",
    "details": [
      "Created electrical schematics, tested PID and alarm/trip settings, and configured DeltaV Operate screens for heat-tracing integration during a plant expansion.",
      "Analyzed eight process parameters using TrendMiner to identify operating ranges and programmed a DeltaV production-rate display."
    ]
  },
  "bayer": {
    "employer": "Bayer",
    "title": "Process Control Engineering Co-op",
    "dates": "Jun 2022–Dec 2022",
    "location": "Luling, Louisiana",
    "link": "/experience/bayer",
    "summary": "Programmed DeltaV modules for hydrocyclone operation and developed heat-recovery concepts using process histories, heat/mass balances and simulation.",
    "details": [
      "Analyzed more than eight process variables over five years of operating history to identify control shortcomings and develop DeltaV modules for hydrocyclone valve operation and product-concentration control.",
      "Prepared FEL-1 deliverables for a heat-recovery concept, including a revised controls scheme, heat and mass balances, P&ID redlines and ASPEN/PIPE-FLO simulation."
    ]
  }
} as const;
