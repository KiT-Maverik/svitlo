import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareFaithAndReasonAsSourcesOfJustification_Skill_Data, distinguishPhilosophicalInquiryFromReligiousPractice_Skill_Data, evaluateAReportedMiracleClaim_Skill_Data, evaluateReligiousExperienceAsEvidence_Skill_Data } from './skills';

export const faithReasonAndExperience_SkillGroup_Data = buildSkillGroupConfig({
  slug: "faithReasonAndExperience",
  id: "806c62e3-16e1-4e2e-bbef-1f004f569713",
  name: {
    en: "Faith, Reason, and Experience",
  },
  skills: {
    compareFaithAndReasonAsSourcesOfJustification: compareFaithAndReasonAsSourcesOfJustification_Skill_Data,
    distinguishPhilosophicalInquiryFromReligiousPractice: distinguishPhilosophicalInquiryFromReligiousPractice_Skill_Data,
    evaluateAReportedMiracleClaim: evaluateAReportedMiracleClaim_Skill_Data,
    evaluateReligiousExperienceAsEvidence: evaluateReligiousExperienceAsEvidence_Skill_Data,
  },
  description: {
    methodological: "Different accounts of religious knowledge appeal to reasoning, testimony, revelation, or experience. Philosophical examination weighs what these sources can justify and remains distinct from taking part in a religious practice.",
    frontend: {
      en: "Learn how faith, reasoning and experience are used to justify religious claims.",
    },
  },
});
