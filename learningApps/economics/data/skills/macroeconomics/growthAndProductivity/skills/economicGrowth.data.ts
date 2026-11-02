import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const economicGrowth_Skill_Data = buildSkillConfig({
  slug: "economicGrowth",
  id: "5f006a43-3af3-40b4-8de3-5d254d9f0f5c",
  name: {
    en: "Економічне зростання",
  },
  description: {
    methodological: "Evaluate changes in real output over time and distinguish its growth rate from its absolute level.",
    frontend: {
      en: "Measure how quickly inflation-adjusted production is growing.",
    },
  },
});
