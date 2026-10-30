/** Portfolio narrative, grounded in profile.ts and the linked project summaries.
 * These are conceptual stage captions, not operating equipment or instrument tags.
 */
export const processStory = {
  foundation: { title: "Chemical engineering", context: "Mass & energy balances" },
  conditioning: { title: "Plant data & controls", context: "Signals & constraints" },
  models: { title: "Applied models", feedback: "Validation", instrument: "Test" },
  writing: { title: "Shared methods" },
  recycle: { title: "New questions" },
  description: "The process diagram follows my work from chemical engineering and industrial experience to plant data and controls, then applied models and shared methods. A validation loop returns model results for testing and refinement. The return line represents new questions feeding further learning.",
} as const;
