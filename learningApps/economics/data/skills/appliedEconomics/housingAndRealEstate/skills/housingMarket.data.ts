import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const housingMarket_Skill_Data = buildSkillConfig({
  slug: "housingMarket",
  id: "f7db6a27-2c7a-4cfd-bb56-527fd3886684",
  name: {
    en: "Ринок житла",
  },
  description: {
    methodological: "Analyze rents and house prices in relation to local demand, available supply, construction lead times, and financing.",
    frontend: {
      en: "Understand how local supply and demand affect housing prices.",
    },
  },
});
