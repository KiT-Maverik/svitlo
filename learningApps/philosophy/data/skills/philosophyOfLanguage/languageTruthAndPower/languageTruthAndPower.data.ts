import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeAFramingChoice_Skill_Data, analyzeATruthConditionalClaim_Skill_Data, distinguishDescriptiveFromEvaluativeLanguage_Skill_Data, evaluateAClaimAboutLinguisticRepresentation_Skill_Data } from './skills';

export const languageTruthAndPower_SkillGroup_Data = buildSkillGroupConfig({
  slug: "languageTruthAndPower",
  id: "c837574a-91d4-4909-9266-63a3f0511575",
  name: {
    en: "Language, Truth, and Power",
  },
  skills: {
    analyzeAFramingChoice: analyzeAFramingChoice_Skill_Data,
    analyzeATruthConditionalClaim: analyzeATruthConditionalClaim_Skill_Data,
    distinguishDescriptiveFromEvaluativeLanguage: distinguishDescriptiveFromEvaluativeLanguage_Skill_Data,
    evaluateAClaimAboutLinguisticRepresentation: evaluateAClaimAboutLinguisticRepresentation_Skill_Data,
  },
  description: {
    methodological: "Descriptive categories, framing, and public speech influence which interpretations appear available. Evaluating their justification differs from explaining psychological persuasion.",
    frontend: {
      en: "Explore how language expresses judgments and shapes public discussion.",
    },
  },
});
