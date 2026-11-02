import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishMisinformationFromDeliberateDeceptionClaims_Skill_Data, distinguishReportingFromOpinion_Skill_Data, evaluateEvidenceBehindAHeadline_Skill_Data, recognizeMisleadingContextInPresentedEvidence_Skill_Data, traceAPublicClaimToItsOriginalSource_Skill_Data } from './skills';

export const mediaAndPublicInformation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "mediaAndPublicInformation",
  id: "0df95913-9aa6-4adc-94e1-4b2eeb91cab9",
  name: {
    en: "Media and Public Information",
  },
  skills: {
    distinguishMisinformationFromDeliberateDeceptionClaims: distinguishMisinformationFromDeliberateDeceptionClaims_Skill_Data,
    distinguishReportingFromOpinion: distinguishReportingFromOpinion_Skill_Data,
    evaluateEvidenceBehindAHeadline: evaluateEvidenceBehindAHeadline_Skill_Data,
    recognizeMisleadingContextInPresentedEvidence: recognizeMisleadingContextInPresentedEvidence_Skill_Data,
    traceAPublicClaimToItsOriginalSource: traceAPublicClaimToItsOriginalSource_Skill_Data,
  },
  description: {
    methodological: "Information environments combine reporting, interpretation, promotion, and falsehood. Epistemic evaluation concerns the warrant for public claims, not the psychological mechanics by which messages persuade audiences.",
    frontend: {
      en: "Learn to investigate reporting, opinions and claims shared in public.",
    },
  },
});
