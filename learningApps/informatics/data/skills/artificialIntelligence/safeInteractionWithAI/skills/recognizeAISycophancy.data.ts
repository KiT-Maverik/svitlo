import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeAISycophancy_Skill_Data = buildSkillConfig({
  slug: "recognizeAISycophancy",
  id: "ef1a569e-5f00-41ca-9055-8a2673cdb8a5",
  name: {
    en: "Recognize AI Sycophancy",
  },
  description: {
    methodological: "Distinguish evidence-based support from unfounded praise and reinforcement of an incorrect belief; a positive tone does not establish correctness.",
    frontend: {
      en: "Spot AI agreement or praise that is not supported by evidence.",
    },
  },
});
