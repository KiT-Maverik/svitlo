import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { behavioralExposurePrinciples_Skill_Data, cognitiveBehavioralInterventions_Skill_Data, evaluatingTreatmentClaims_Skill_Data, therapeuticAlliance_Skill_Data } from './skills';

export const interventionEvidenceAndEthics_SkillGroup_Data = buildSkillGroupConfig({
  slug: "interventionEvidenceAndEthics",
  id: "e03d5269-19ec-47a2-855a-dcddf4f0216e",
  name: {
    en: "Intervention Evidence and Ethics",
  },
  skills: {
    behavioralExposurePrinciples: behavioralExposurePrinciples_Skill_Data,
    cognitiveBehavioralInterventions: cognitiveBehavioralInterventions_Skill_Data,
    evaluatingTreatmentClaims: evaluatingTreatmentClaims_Skill_Data,
    therapeuticAlliance: therapeuticAlliance_Skill_Data,
  },
  description: {
    methodological: "Treatment approaches propose different mechanisms and require evaluation for effectiveness, suitability, potential harm, and professional standards.",
    frontend: {
      en: "Explore why treatment claims require evidence, safeguards and professional ethics.",
    },
  },
});
