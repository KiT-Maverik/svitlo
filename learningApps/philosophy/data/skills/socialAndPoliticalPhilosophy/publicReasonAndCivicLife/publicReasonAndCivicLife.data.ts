import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeDemocraticLegitimacy_Skill_Data, assessAnArgumentAboutTheCommonGood_Skill_Data, distinguishPublicReasonsFromPrivatePreferences_Skill_Data, evaluateCompetingViewsOfPoliticalObligation_Skill_Data } from './skills';

export const publicReasonAndCivicLife_SkillGroup_Data = buildSkillGroupConfig({
  slug: "publicReasonAndCivicLife",
  id: "f4faa2aa-3c17-48a7-a10e-9eb442653432",
  name: {
    en: "Public Reason and Civic Life",
  },
  skills: {
    analyzeDemocraticLegitimacy: analyzeDemocraticLegitimacy_Skill_Data,
    assessAnArgumentAboutTheCommonGood: assessAnArgumentAboutTheCommonGood_Skill_Data,
    distinguishPublicReasonsFromPrivatePreferences: distinguishPublicReasonsFromPrivatePreferences_Skill_Data,
    evaluateCompetingViewsOfPoliticalObligation: evaluateCompetingViewsOfPoliticalObligation_Skill_Data,
  },
  description: {
    methodological: "People with incompatible values must still make shared decisions. Philosophical inquiry examines how disagreements can be handled under pluralism and institutional accountability.",
    frontend: {
      en: "Discover how people with different values can justify decisions affecting everyone.",
    },
  },
});
