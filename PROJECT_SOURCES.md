# Project description metrics

Checked against repository READMEs on October 29, 2026. These are repository-reported values, not independently rerun evaluations. Shared descriptions live in `src/lib/project-previews.ts`.

| Project / source | Description evidence | Scope retained |
| --- | --- | --- |
| [PSM Knowledge Graph](https://github.com/yuvipaloozie/PSM-Knowledge-Graph/blob/main/README.md#dataset-metrics) | 3,584 nodes; 5,537 relationships | Synthetic demonstration dataset, not production coverage or model accuracy. |
| [OCLAST](https://github.com/yuvipaloozie/OCLAST/blob/main/README.md#condensed-results) | Curriculum U-Net++ mean Dice 0.793; 281 held-out image tiles | Fixed holdout; README does not establish biological-replicate independence. Do not imply patient-level or external validation. |
| [Regime-Aware Sector Rotation](https://github.com/yuvipaloozie/Regime-Aware-Sector-Trading/blob/main/README.md#original-project-results--legacy-snapshot) | Original legacy backtest Sharpe 0.88 vs SPY 0.65 | Explicitly labeled legacy and not reproduced by revised pipeline. The archived QuantStats tearsheet uses an 11-sector equal-weight benchmark and reports strategy/benchmark Sharpe 3.11/3.52 and Sortino 4.92/5.58; do not mix benchmarks or claim Sortino outperformance. |
| [ECG Arrhythmia Classification](https://github.com/yuvipaloozie/Arrythmia-Classification-with-ML/blob/main/README.md#model-performance) | Binary accuracy 83.0% logistic regression / 82.8% 1D CNN | MIT-BIH benchmark comparison; not multiclass accuracy or clinical deployment performance. |
| [Semiconductor Yield Optimization & RCA](https://github.com/yuvipaloozie/Semiconductor-Yield-Optimization-and-RCA/blob/main/README.md#2-cost-sensitive-modeling) | ROC-AUC 0.733; defect recall 48% | Reported SECOM modeling results. Projected financial savings and simulated cost assumptions are not presented as realized outcomes. |

Archived comparison source: [QuantStats tearsheet](https://github.com/yuvipaloozie/Regime-Aware-Sector-Trading/blob/main/regime_sector_rotation/ML_Sector_Rotation_Tearsheet.html), matched dates December 12, 2014–April 17, 2026. These archived figures are not validated results of the revised causal pipeline.
