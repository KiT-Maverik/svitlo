import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const systemRedundancy_Skill_Data = buildSkillConfig({
  slug: "systemRedundancy",
  id: "209e2d5f-3fe3-46c7-9fe0-bb778a31e03b",
  name: {
    en: "System redundancy",
  },
  description: {
    methodological: "Recognize how independent backup paths can preserve a critical function during a component failure.",
    frontend: {
      en: "Understand how backup paths can keep important functions working.",
    },
  },
});
