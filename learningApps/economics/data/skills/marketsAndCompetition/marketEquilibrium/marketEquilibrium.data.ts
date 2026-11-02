import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { effectsOfDemandChanges_Skill_Data, effectsOfSupplyChanges_Skill_Data, equilibriumPriceAndQuantity_Skill_Data, marketShortagesAndSurpluses_Skill_Data } from './skills';

export const marketEquilibrium_SkillGroup_Data = buildSkillGroupConfig({
  slug: "marketEquilibrium",
  id: "3b3df61b-cc8c-4c36-89f3-cc337283393d",
  name: {
    en: "Ринкова рівновага",
  },
  skills: {
    effectsOfDemandChanges: effectsOfDemandChanges_Skill_Data,
    effectsOfSupplyChanges: effectsOfSupplyChanges_Skill_Data,
    equilibriumPriceAndQuantity: equilibriumPriceAndQuantity_Skill_Data,
    marketShortagesAndSurpluses: marketShortagesAndSurpluses_Skill_Data,
  },
  description: {
    methodological: "The interaction of supply and demand coordinates participants' plans and explains what happens when they do not match.",
    frontend: {
      en: "Understand how buyers' and sellers' plans can reach a balance.",
    },
  },
});
