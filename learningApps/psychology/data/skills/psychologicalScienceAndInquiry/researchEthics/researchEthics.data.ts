import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { deceptionInResearch_Skill_Data, informedConsent_Skill_Data, researchAnonymity_Skill_Data, researchConfidentiality_Skill_Data, researchDebriefing_Skill_Data, researchWithVulnerableParticipants_Skill_Data, riskBenefitAssessment_Skill_Data } from './skills';

export const researchEthics_SkillGroup_Data = buildSkillGroupConfig({
  slug: "researchEthics",
  id: "b9f967a3-7b58-457c-9603-ec79a8cc01eb",
  name: {
    en: "Research Ethics",
  },
  skills: {
    deceptionInResearch: deceptionInResearch_Skill_Data,
    informedConsent: informedConsent_Skill_Data,
    researchAnonymity: researchAnonymity_Skill_Data,
    researchConfidentiality: researchConfidentiality_Skill_Data,
    researchDebriefing: researchDebriefing_Skill_Data,
    researchWithVulnerableParticipants: researchWithVulnerableParticipants_Skill_Data,
    riskBenefitAssessment: riskBenefitAssessment_Skill_Data,
  },
  description: {
    methodological: "Studies involving people must respect autonomy, dignity, safety, and confidentiality, including additional safeguards for vulnerable participants.",
    frontend: {
      en: "Discover how research can respect people's autonomy, dignity and safety.",
    },
  },
});
