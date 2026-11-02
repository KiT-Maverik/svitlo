import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const priceElasticityOfSupply_Skill_Data = buildSkillConfig({
  slug: "priceElasticityOfSupply",
  id: "14c86556-f336-45c5-b577-7880608a06ce",
  name: {
    en: "Цінова еластичність пропозиції",
  },
  description: {
    methodological: "Evaluate how much producers can change quantities offered when prices change, taking time constraints into account.",
    frontend: {
      en: "Explore how quickly and strongly producers respond to higher prices.",
    },
  },
});
