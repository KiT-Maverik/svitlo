import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const crossPriceElasticityOfDemand_Skill_Data = buildSkillConfig({
  slug: "crossPriceElasticityOfDemand",
  id: "ec7fe522-908b-457e-a19a-9f94d311b1f7",
  name: {
    en: "Перехресна еластичність попиту",
  },
  description: {
    methodological: "Determine how demand for one good responds to another good's price, interpreting possible substitution or complementarity.",
    frontend: {
      en: "Find out whether two products are substitutes or complements.",
    },
  },
});
