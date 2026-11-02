import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { preventSexuallyTransmittedInfections_Skill_Data, seekConfidentialSexualHealthAdvice_Skill_Data, understandContraception_Skill_Data, understandPregnancyRelatedHealthcare_Skill_Data } from './skills';

export const sexualAndReproductiveHealthcare_SkillGroup_Data = buildSkillGroupConfig({
  slug: "sexualAndReproductiveHealthcare",
  id: "da0ae39b-2045-4b9a-82f5-386b5969df6e",
  name: {
    en: "Sexual and Reproductive Healthcare",
  },
  skills: {
    preventSexuallyTransmittedInfections: preventSexuallyTransmittedInfections_Skill_Data,
    seekConfidentialSexualHealthAdvice: seekConfidentialSexualHealthAdvice_Skill_Data,
    understandContraception: understandContraception_Skill_Data,
    understandPregnancyRelatedHealthcare: understandPregnancyRelatedHealthcare_Skill_Data,
  },
  description: {
    methodological: "Risk reduction and access to care include prevention of sexually transmitted infections, contraception, pregnancy-related care and confidential advice. These are health-service competencies, not a prescribed set of personal choices.",
    frontend: {
      en: "Understand healthcare options for prevention, pregnancy and sexual health.",
    },
  },
});
