import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { economicsOfPersonalData_Skill_Data, marginalCostOfDigitalCopying_Skill_Data, subscriptionsVersusOneTimePurchases_Skill_Data } from './skills';

export const digitalProducts_SkillGroup_Data = buildSkillGroupConfig({
  slug: "digitalProducts",
  id: "2ccba606-5b57-4eb7-b4d8-f1087010988c",
  name: {
    en: "Цифрові продукти",
  },
  skills: {
    economicsOfPersonalData: economicsOfPersonalData_Skill_Data,
    marginalCostOfDigitalCopying: marginalCostOfDigitalCopying_Skill_Data,
    subscriptionsVersusOneTimePurchases: subscriptionsVersusOneTimePurchases_Skill_Data,
  },
  description: {
    methodological: "Information goods often involve large initial costs and low costs of reproduction, enabling different business models.",
    frontend: {
      en: "Discover why digital products can be expensive to create but cheap to copy.",
    },
  },
});
