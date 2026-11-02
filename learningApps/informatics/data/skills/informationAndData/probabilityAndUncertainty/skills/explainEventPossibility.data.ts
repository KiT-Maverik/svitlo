import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainEventPossibility_Skill_Data = buildSkillConfig({
  slug: "explainEventPossibility",
  id: "150b86c1-484c-4d87-973e-c92438b6107e",
  name: {
    en: "Explain Event Possibility",
  },
  description: {
    methodological: "Determine whether an outcome is allowed by a model's conditions, even if extremely unlikely. If a box contains only blue balls, drawing a red one is impossible under those conditions.",
    frontend: {
      en: "Decide whether an outcome is allowed under a given set of conditions.",
    },
  },
});
