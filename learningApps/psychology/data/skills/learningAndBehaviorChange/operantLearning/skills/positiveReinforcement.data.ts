import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const positiveReinforcement_Skill_Data = buildSkillConfig({
  slug: "positiveReinforcement",
  id: "32fd8364-71c2-4e4d-9fe7-e0e8976b02ad",
  name: {
    en: "Positive Reinforcement",
  },
  description: {
    methodological: "Identify a consequence added after a behavior that increases its future occurrence under the relevant conditions.",
    frontend: {
      en: "Recognize when adding a desirable consequence makes behavior more likely.",
    },
  },
});
