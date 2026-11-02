import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const testingMarketDemand_Skill_Data = buildSkillConfig({
  slug: "testingMarketDemand",
  id: "1b2c3b7f-8410-4c9f-9ab1-ec451cf4eccb",
  name: {
    en: "Перевірка ринкового попиту",
  },
  description: {
    methodological: "Select evidence of willingness to purchase, distinguishing expressed interest from actual buying behavior.",
    frontend: {
      en: "Find out whether people will really buy a proposed product.",
    },
  },
});
