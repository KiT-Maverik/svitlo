import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { calibrateConfidenceToEvidence_Skill_Data, evaluateASkepticalChallenge_Skill_Data, identifyADisagreementAboutEvidenceStandards_Skill_Data, recognizeTheLimitsOfPersonalKnowledge_Skill_Data } from './skills';

export const uncertaintyAndSkepticism_SkillGroup_Data = buildSkillGroupConfig({
  slug: "uncertaintyAndSkepticism",
  id: "dd6f875c-0aeb-4987-addc-9f860327a0a2",
  name: {
    en: "Uncertainty and Skepticism",
  },
  skills: {
    calibrateConfidenceToEvidence: calibrateConfidenceToEvidence_Skill_Data,
    evaluateASkepticalChallenge: evaluateASkepticalChallenge_Skill_Data,
    identifyADisagreementAboutEvidenceStandards: identifyADisagreementAboutEvidenceStandards_Skill_Data,
    recognizeTheLimitsOfPersonalKnowledge: recognizeTheLimitsOfPersonalKnowledge_Skill_Data,
  },
  description: {
    methodological: "Rational inquiry must accommodate incomplete evidence and the possibility of error without collapsing into indiscriminate doubt.",
    frontend: {
      en: "Discover how to think responsibly when evidence is incomplete.",
    },
  },
});
