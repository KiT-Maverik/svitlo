import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { diminishingMarginalReturns_Skill_Data, factorsOfProduction_Skill_Data, productionFunction_Skill_Data, productivity_Skill_Data } from './skills';

export const productiveResourcesAndTechnology_SkillGroup_Data = buildSkillGroupConfig({
  slug: "productiveResourcesAndTechnology",
  id: "c4cf8e74-e7a6-4bdf-bf0f-3549f5971048",
  name: {
    en: "Ресурси та технологія",
  },
  skills: {
    diminishingMarginalReturns: diminishingMarginalReturns_Skill_Data,
    factorsOfProduction: factorsOfProduction_Skill_Data,
    productionFunction: productionFunction_Skill_Data,
    productivity: productivity_Skill_Data,
  },
  description: {
    methodological: "Labor, capital, land, knowledge, and methods of production determine output possibilities and the substitution of productive inputs.",
    frontend: {
      en: "Discover how resources and technology affect what firms can produce.",
    },
  },
});
