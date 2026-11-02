import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { consumerRightsAndResponsibilities_Skill_Data, qualityOfConsumerInformation_Skill_Data, totalCostOfPurchase_Skill_Data, unitPricing_Skill_Data } from './skills';

export const consumerInformationAndRights_SkillGroup_Data = buildSkillGroupConfig({
  slug: "consumerInformationAndRights",
  id: "1a00f55f-eadd-4f85-aaf7-9922b973cf2a",
  name: {
    en: "Інформація та права споживача",
  },
  skills: {
    consumerRightsAndResponsibilities: consumerRightsAndResponsibilities_Skill_Data,
    qualityOfConsumerInformation: qualityOfConsumerInformation_Skill_Data,
    totalCostOfPurchase: totalCostOfPurchase_Skill_Data,
    unitPricing: unitPricing_Skill_Data,
  },
  description: {
    methodological: "Sound consumer decisions depend not only on price but also on product information, contract terms, and possible protections.",
    frontend: {
      en: "Learn how information and consumer rights affect purchase decisions.",
    },
  },
});
