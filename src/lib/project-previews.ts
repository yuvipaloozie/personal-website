/** Curated project copy, verified against GitHub listings and READMEs on October 29, 2026. */
export const projectPreviews: Record<string, { title: string; summary: string; github: string; slug: string; image: string; imageAlt: string; year: number; tags: string[]; methods: string[] }> = {
  "p_psm": {
    "title": "PSM Knowledge Graph",
    "summary": "Builds a process safety graph from HAZOPs and alarm registers using NLP and local GraphRAG. Synthetic demo: 3,584 nodes and 5,537 relationships.",
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
    ],
    "methods": [
      "NLP",
      "GraphRAG",
      "Ollama"
    ]
  },
  "p_chana": {
    "title": "OCLAST",
    "summary": "Curriculum learning for osteoclast segmentation and counting. U-Net++ reports 0.793 mean Dice on a fixed 281-image-tile holdout.",
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
    ],
    "methods": [
      "Diffusion Model",
      "OpenCV",
      "CNNs"
    ]
  },
  "p_trading": {
    "title": "Regime-Aware Sector Rotation",
    "summary": "Ranks sector ETFs with HMM regimes and XGBRanker. Original backtest (legacy): Sharpe 0.88 versus 0.65 for SPY; not yet reproduced by the revised pipeline.",
    "github": "https://github.com/yuvipaloozie/Regime-Aware-Sector-Trading",
    "slug": "regime-aware-trading",
    "image": "/projects/trading.svg",
    "imageAlt": "Schematic of regime transitions feeding sector ranking and allocation.",
    "year": 2025,
    "tags": [
      "Gaussian HMM",
      "XGBRanker",
      "Walk-forward evaluation"
    ],
    "methods": [
      "HMM",
      "XGBRanker",
      "Time Series"
    ]
  },
  "p_arrhythmia": {
    "title": "ECG Arrhythmia Classification",
    "summary": "Benchmarks physiology-based ECG features against a 1D CNN on MIT-BIH data. Reported binary accuracy: 83.0% for logistic regression versus 82.8% for the CNN.",
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
    ],
    "methods": [
      "Feature Engineering",
      "Logistic Regression",
      "1D CNN"
    ]
  },
  "p_yield": {
    "title": "Semiconductor Yield Optimization & RCA",
    "summary": "Predicts SECOM batch failures with XGBoost and SHAP sensor analysis. Reports 0.733 ROC-AUC and 48% defect recall.",
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
    ],
    "methods": [
      "XGBoost",
      "Cost-Sensitive Learning",
      "SHAP"
    ]
  }
};

export const selectedProjectIds = Object.keys(projectPreviews);
