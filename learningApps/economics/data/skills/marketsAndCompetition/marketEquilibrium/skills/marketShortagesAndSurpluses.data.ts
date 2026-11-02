import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const marketShortagesAndSurpluses_Skill_Data = buildSkillConfig({
  slug: "marketShortagesAndSurpluses",
  id: "b25ac561-dd31-4136-99d3-cc751559a37d",
  name: {
    en: "Дефіцит і надлишок товару",
  },
  description: {
    methodological: "Diagnose excess demand or excess supply when a price differs from its equilibrium level.",
    frontend: {
      en: "Recognize when a market has too little or too much of a product.",
    },
  },
});
