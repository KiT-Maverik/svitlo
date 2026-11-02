import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const priceElasticityOfDemand_Skill_Data = buildSkillConfig({
  slug: "priceElasticityOfDemand",
  id: "17a5e25d-f94d-4f1b-93fb-b50feb3e6784",
  name: {
    en: "Цінова еластичність попиту",
  },
  description: {
    methodological: "Evaluate the proportional change in quantity demanded following a price change and distinguish elasticity from the slope of the demand curve.",
    frontend: {
      en: "Measure how strongly buying responds to a change in price.",
    },
  },
});
