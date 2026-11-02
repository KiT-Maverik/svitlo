import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const equilibriumPriceAndQuantity_Skill_Data = buildSkillConfig({
  slug: "equilibriumPriceAndQuantity",
  id: "ed99e7ec-8c48-4f31-b1ee-47bff8b4d171",
  name: {
    en: "Рівноважна ціна та обсяг",
  },
  description: {
    methodological: "Find the price and quantity at which planned purchases equal planned sales in a specified market model.",
    frontend: {
      en: "Find where a demand curve and supply curve meet.",
    },
  },
});
