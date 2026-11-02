import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const ionFormation_Skill_Data = buildSkillConfig({
  slug: "ionFormation",
  id: "94e3a7e4-efe5-4c4f-ac47-7779435b25f1",
  name: {
    en: "Ion Formation",
  },
  description: {
    methodological: "Predict plausible monatomic ion charges from electron gain or loss while recognizing chemical context.",
    frontend: {
      en: "Predict common ion charges while accounting for the chemical setting.",
    },
  },
});
