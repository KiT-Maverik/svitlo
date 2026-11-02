import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const idealGasModel_Skill_Data = buildSkillConfig({
  slug: "idealGasModel",
  id: "b5cc0247-5c5d-4884-a9f3-44ac9876ac8b",
  name: {
    en: "Ideal Gas Model",
  },
  description: {
    methodological: "Use the ideal-gas equation as an approximation and identify conditions in which real gases deviate.",
    frontend: {
      en: "Use the ideal-gas model while recognizing when it becomes inaccurate.",
    },
  },
});
