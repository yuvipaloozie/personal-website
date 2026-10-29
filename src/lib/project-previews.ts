/** Curated project copy, verified against GitHub listings and READMEs on October 29, 2026. */
export const projectPreviews: Record<string, { title: string; summary: string; github: string; slug: string; image: string; imageAlt: string; year: number; tags: string[] }> = {
  "p_psm": {
    "title": "PSM Knowledge Graph",
    "summary": "Structures HAZOPs, alarm registers and P&IDs into a process safety graph with NLP, fuzzy matching and local GraphRAG.",
    "github": "https://github.com/yuvipaloozie/PSM-Knowledge-Graph",
    "slug": "psm-knowledge-graph",
    "image": "/projects/psm.svg",
    "imageAlt": "Schematic of engineering documents connected to a process safety knowledge graph.",
    "year": 2026,
    "tags": [
      "Python",
      "NetworkX",
      "NLP",
      "GraphRAG",
      "Streamlit"
    ]
  },
  "p_chana": {
    "title": "OCLAST",
    "summary": "Compares U-Net, U-Net++ and TransUNet with a four-stage curriculum for osteoclast segmentation, counting and morphometry.",
    "github": "https://github.com/yuvipaloozie/OCLAST",
    "slug": "chana-analyzer",
    "image": "/projects/oclast.svg",
    "imageAlt": "Schematic of osteoclast image segmentation and curriculum learning.",
    "year": 2025,
    "tags": [
      "TensorFlow",
      "U-Net++",
      "TransUNet",
      "Curriculum learning"
    ]
  },
  "p_trading": {
    "title": "Regime-Aware Sector Rotation",
    "summary": "Combines Gaussian HMM regimes with XGBRanker to allocate across sector ETFs using purged walk-forward evaluation.",
    "github": "https://github.com/yuvipaloozie/Regime-Aware-Sector-Trading",
    "slug": "regime-aware-trading",
    "image": "/projects/trading.svg",
    "imageAlt": "Schematic of regime transitions feeding sector ranking and allocation.",
    "year": 2025,
    "tags": [
      "Gaussian HMM",
      "XGBRanker",
      "Walk-forward evaluation"
    ]
  },
  "p_arrhythmia": {
    "title": "ECG Arrhythmia Classification",
    "summary": "Compares physiology-based ECG features and logistic regression against a 1D CNN on MIT-BIH arrhythmia recordings.",
    "github": "https://github.com/yuvipaloozie/Arrythmia-Classification-with-ML",
    "slug": "arrhythmia-classification",
    "image": "/projects/arrhythmia.svg",
    "imageAlt": "Illustrative ECG signal branching into feature engineering and neural classification.",
    "year": 2025,
    "tags": [
      "ECG",
      "Feature engineering",
      "Logistic regression",
      "1D CNN"
    ]
  },
  "p_yield": {
    "title": "Semiconductor Yield Optimization & RCA",
    "summary": "Uses XGBoost on SECOM sensor data to predict batch failures, with cost-sensitive thresholds and SHAP-based sensor analysis.",
    "github": "https://github.com/yuvipaloozie/Semiconductor-Yield-Optimization-and-RCA",
    "slug": "yield-optimization",
    "image": "/projects/yield.svg",
    "imageAlt": "Schematic of manufacturing sensor data feeding yield prediction and feature explanations.",
    "year": 2025,
    "tags": [
      "XGBoost",
      "SHAP",
      "SECOM",
      "Cost-sensitive learning"
    ]
  }
};

export const selectedProjectIds = Object.keys(projectPreviews);
