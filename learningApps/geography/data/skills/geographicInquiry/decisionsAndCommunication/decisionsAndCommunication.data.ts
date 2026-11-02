import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { communicateAGeographicConclusionWithEvidence_Skill_Data, compareLocationsAgainstStatedGeographicCriteria_Skill_Data, explainTradeOffsOfAProposedSpatialDecision_Skill_Data } from './skills';

export const decisionsAndCommunication_SkillGroup_Data = buildSkillGroupConfig({
  slug: "decisionsAndCommunication",
  id: "aee7c7e7-a27d-469c-b3d8-6b4962023e52",
  name: {
    en: "Decisions and Communication",
  },
  skills: {
    communicateAGeographicConclusionWithEvidence: communicateAGeographicConclusionWithEvidence_Skill_Data,
    compareLocationsAgainstStatedGeographicCriteria: compareLocationsAgainstStatedGeographicCriteria_Skill_Data,
    explainTradeOffsOfAProposedSpatialDecision: explainTradeOffsOfAProposedSpatialDecision_Skill_Data,
  },
  description: {
    methodological: "A geographic recommendation combines evidence about places with competing objectives and uncertainty. Maps can communicate reasoning, but they do not settle value judgments on their own.",
    frontend: {
      en: "Learn to compare places and explain decisions using geographic evidence.",
    },
  },
});
