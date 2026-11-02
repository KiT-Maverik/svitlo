import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { crossPriceElasticityOfDemand_Skill_Data, incomeElasticityOfDemand_Skill_Data, priceElasticityOfDemand_Skill_Data, priceElasticityOfSupply_Skill_Data } from './skills';

export const elasticity_SkillGroup_Data = buildSkillGroupConfig({
  slug: "elasticity",
  id: "18110f21-9be8-462d-9556-b14e6a2e956b",
  name: {
    en: "Еластичність",
  },
  skills: {
    crossPriceElasticityOfDemand: crossPriceElasticityOfDemand_Skill_Data,
    incomeElasticityOfDemand: incomeElasticityOfDemand_Skill_Data,
    priceElasticityOfDemand: priceElasticityOfDemand_Skill_Data,
    priceElasticityOfSupply: priceElasticityOfSupply_Skill_Data,
  },
  description: {
    methodological: "Quantity responses to changes in price or income vary across products and time horizons.",
    frontend: {
      en: "Discover why buyers and sellers respond differently to price changes.",
    },
  },
});
