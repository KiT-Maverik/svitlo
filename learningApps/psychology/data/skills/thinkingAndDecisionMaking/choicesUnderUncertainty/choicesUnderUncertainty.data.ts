import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { baseRateNeglect_Skill_Data, choiceArchitecture_Skill_Data, delayDiscounting_Skill_Data, lossAversion_Skill_Data, riskPerception_Skill_Data } from './skills';

export const choicesUnderUncertainty_SkillGroup_Data = buildSkillGroupConfig({
  slug: "choicesUnderUncertainty",
  id: "0659bda5-fcd2-4b35-be47-2e2d8bc65940",
  name: {
    en: "Choices Under Uncertainty",
  },
  skills: {
    baseRateNeglect: baseRateNeglect_Skill_Data,
    choiceArchitecture: choiceArchitecture_Skill_Data,
    delayDiscounting: delayDiscounting_Skill_Data,
    lossAversion: lossAversion_Skill_Data,
    riskPerception: riskPerception_Skill_Data,
  },
  description: {
    methodological: "Decisions depend on reference points, delayed consequences, uncertainty, and how alternatives are presented.",
    frontend: {
      en: "Explore how uncertainty, probability and presentation influence choices.",
    },
  },
});
