import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const averageProductionCosts_Skill_Data = buildSkillConfig({
  slug: "averageProductionCosts",
  id: "11eef6c3-6d51-47d5-a930-4a50274ec738",
  name: {
    en: "Середні витрати",
  },
  description: {
    methodological: "Calculate cost per unit of output and explain how it depends on scale and the composition of costs.",
    frontend: {
      en: "Find the average cost of producing a unit.",
    },
  },
});
