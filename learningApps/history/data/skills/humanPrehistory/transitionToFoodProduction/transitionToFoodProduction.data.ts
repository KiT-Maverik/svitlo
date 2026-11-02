import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { animalDomestication_Skill_Data, earlyWeaving_Skill_Data, permanentSettlements_Skill_Data, plantDomestication_Skill_Data, prehistoricPottery_Skill_Data } from './skills';

export const transitionToFoodProduction_SkillGroup_Data = buildSkillGroupConfig({
  slug: "transitionToFoodProduction",
  id: "14b528ab-ae67-4b32-b2da-1affd02a5910",
  name: {
    en: "Переходи до виробництва їжі",
  },
  skills: {
    animalDomestication: animalDomestication_Skill_Data,
    earlyWeaving: earlyWeaving_Skill_Data,
    permanentSettlements: permanentSettlements_Skill_Data,
    plantDomestication: plantDomestication_Skill_Data,
    prehistoricPottery: prehistoricPottery_Skill_Data,
  },
  description: {
    methodological: "Cultivation, herding, and settlements emerged independently in multiple places rather than in one simultaneous universal revolution.",
    frontend: {
      en: "Discover how growing food spread in different places and times.",
    },
  },
});
