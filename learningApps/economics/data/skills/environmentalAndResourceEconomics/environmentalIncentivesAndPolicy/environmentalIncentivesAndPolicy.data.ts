import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { economicAppraisalOfEnvironmentalProjects_Skill_Data, emissionsPermitTrading_Skill_Data, environmentalTaxes_Skill_Data, socialCostOfPollution_Skill_Data } from './skills';

export const environmentalIncentivesAndPolicy_SkillGroup_Data = buildSkillGroupConfig({
  slug: "environmentalIncentivesAndPolicy",
  id: "cce0af3f-fb6a-4402-96db-9571ff15337c",
  name: {
    en: "Екологічні стимули та політика",
  },
  skills: {
    economicAppraisalOfEnvironmentalProjects: economicAppraisalOfEnvironmentalProjects_Skill_Data,
    emissionsPermitTrading: emissionsPermitTrading_Skill_Data,
    environmentalTaxes: environmentalTaxes_Skill_Data,
    socialCostOfPollution: socialCostOfPollution_Skill_Data,
  },
  description: {
    methodological: "Pollution and other externalities can be addressed with instruments that have differing costs and consequences.",
    frontend: {
      en: "Explore economic policies that encourage less pollution.",
    },
  },
});
