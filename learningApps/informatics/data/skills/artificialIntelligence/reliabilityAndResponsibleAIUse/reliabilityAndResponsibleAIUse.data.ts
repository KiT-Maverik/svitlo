import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainHumanResponsibilityForAIAssistedDecisions_Skill_Data, protectPersonalDataInPrompts_Skill_Data, recognizeAIBiasRisks_Skill_Data, verifyFactsInAnAIResponse_Skill_Data } from './skills';

export const reliabilityAndResponsibleAIUse_SkillGroup_Data = buildSkillGroupConfig({
  slug: "reliabilityAndResponsibleAIUse",
  id: "c598e274-63e6-4795-b822-66e0ef76e73b",
  name: {
    en: "Reliability and Responsible AI Use",
  },
  skills: {
    explainHumanResponsibilityForAIAssistedDecisions: explainHumanResponsibilityForAIAssistedDecisions_Skill_Data,
    protectPersonalDataInPrompts: protectPersonalDataInPrompts_Skill_Data,
    recognizeAIBiasRisks: recognizeAIBiasRisks_Skill_Data,
    verifyFactsInAnAIResponse: verifyFactsInAnAIResponse_Skill_Data,
  },
  description: {
    methodological: "Protecting data and identifying unreliable results or unfair consequences of AI use. Fact-checking, bias assessment, and human accountability address different risks.",
    frontend: {
      en: "Learn to check AI outputs and consider their effects on people.",
    },
  },
});
