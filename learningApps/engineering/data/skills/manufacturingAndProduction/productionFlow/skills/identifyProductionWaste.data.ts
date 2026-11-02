import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyProductionWaste_Skill_Data = buildSkillConfig({
  slug: "identifyProductionWaste",
  id: "386ddad5-f38e-4603-a964-c946780bc29f",
  name: {
    en: "Identify production waste",
  },
  description: {
    methodological: "Recognize avoidable scrap, waiting, transport or rework in a manufacturing process.",
    frontend: {
      en: "Recognize wasted materials, movement or time in a production process.",
    },
  },
});
