import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const electrolysis_Skill_Data = buildSkillConfig({
  slug: "electrolysis",
  id: "6ba82660-4883-45ec-9ce2-f07cf2cde3a9",
  name: {
    en: "Electrolysis",
  },
  description: {
    methodological: "Explain how externally supplied electrical energy drives non-spontaneous redox reactions at electrodes, including transformations such as electroplating.",
    frontend: {
      en: "Understand how electricity can drive reactions that would not occur spontaneously.",
    },
  },
});
