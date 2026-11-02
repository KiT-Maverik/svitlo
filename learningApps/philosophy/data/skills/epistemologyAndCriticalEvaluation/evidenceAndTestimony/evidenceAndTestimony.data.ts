import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeEpistemicInjustice_Skill_Data, checkCorroborationAcrossSources_Skill_Data, distinguishAClaimFromItsEvidence_Skill_Data, distinguishDirectEvidenceFromHearsay_Skill_Data, evaluateTestimonialCredibility_Skill_Data } from './skills';

export const evidenceAndTestimony_SkillGroup_Data = buildSkillGroupConfig({
  slug: "evidenceAndTestimony",
  id: "8f645f84-42a6-4385-85cd-a526a8105aa5",
  name: {
    en: "Evidence and Testimony",
  },
  skills: {
    analyzeEpistemicInjustice: analyzeEpistemicInjustice_Skill_Data,
    checkCorroborationAcrossSources: checkCorroborationAcrossSources_Skill_Data,
    distinguishAClaimFromItsEvidence: distinguishAClaimFromItsEvidence_Skill_Data,
    distinguishDirectEvidenceFromHearsay: distinguishDirectEvidenceFromHearsay_Skill_Data,
    evaluateTestimonialCredibility: evaluateTestimonialCredibility_Skill_Data,
  },
  description: {
    methodological: "Knowledge often depends on information supplied by other people or institutions. Source reliability, independence, and evidential fit require appraisal without treating every source as equally trustworthy.",
    frontend: {
      en: "Learn to assess claims and evidence passed on by other people.",
    },
  },
});
