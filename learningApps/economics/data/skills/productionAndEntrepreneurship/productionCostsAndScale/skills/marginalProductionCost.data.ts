import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const marginalProductionCost_Skill_Data = buildSkillConfig({
  slug: "marginalProductionCost",
  id: "bf902371-cd6a-421f-8d7c-d9f4fe01cbd0",
  name: {
    en: "Граничні витрати",
  },
  description: {
    methodological: "Determine the additional cost of producing the next unit and use it to analyze production decisions.",
    frontend: {
      en: "Estimate what it costs to make one additional unit.",
    },
  },
});
