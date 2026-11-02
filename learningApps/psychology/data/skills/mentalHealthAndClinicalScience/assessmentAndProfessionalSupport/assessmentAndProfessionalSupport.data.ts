import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { clinicalFormulation_Skill_Data, clinicalInterviewPurpose_Skill_Data, professionalRolesAndReferral_Skill_Data, psychologicalScreeningVersusDiagnosis_Skill_Data } from './skills';

export const assessmentAndProfessionalSupport_SkillGroup_Data = buildSkillGroupConfig({
  slug: "assessmentAndProfessionalSupport",
  id: "fe5923c9-4c5c-4ea1-861d-fc8dd0902af2",
  name: {
    en: "Assessment and Professional Support",
  },
  skills: {
    clinicalFormulation: clinicalFormulation_Skill_Data,
    clinicalInterviewPurpose: clinicalInterviewPurpose_Skill_Data,
    professionalRolesAndReferral: professionalRolesAndReferral_Skill_Data,
    psychologicalScreeningVersusDiagnosis: psychologicalScreeningVersusDiagnosis_Skill_Data,
  },
  description: {
    methodological: "Clinical decisions use trained judgment, validated measures, and context; ethical education focuses on how professional care works rather than practicing diagnosis.",
    frontend: {
      en: "Discover how trained professionals assess difficulties and provide support.",
    },
  },
});
