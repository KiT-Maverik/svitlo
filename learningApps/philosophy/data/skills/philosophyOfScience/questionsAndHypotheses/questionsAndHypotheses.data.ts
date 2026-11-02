import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareObservationalAndExperimentalResearch_Skill_Data, deriveAPredictionFromAHypothesis_Skill_Data, distinguishObservationFromInterpretation_Skill_Data, formulateAnEmpiricallyInvestigableQuestion_Skill_Data, formulateATestableHypothesis_Skill_Data } from './skills';

export const questionsAndHypotheses_SkillGroup_Data = buildSkillGroupConfig({
  slug: "questionsAndHypotheses",
  id: "4cb1242a-ab8c-491c-b79b-1d96a786c089",
  name: {
    en: "Questions and Hypotheses",
  },
  skills: {
    compareObservationalAndExperimentalResearch: compareObservationalAndExperimentalResearch_Skill_Data,
    deriveAPredictionFromAHypothesis: deriveAPredictionFromAHypothesis_Skill_Data,
    distinguishObservationFromInterpretation: distinguishObservationFromInterpretation_Skill_Data,
    formulateAnEmpiricallyInvestigableQuestion: formulateAnEmpiricallyInvestigableQuestion_Skill_Data,
    formulateATestableHypothesis: formulateATestableHypothesis_Skill_Data,
  },
  description: {
    methodological: "Research design starts with propositions that can be addressed using evidence. Questions, hypotheses, predictions, and observation serve different epistemic roles.",
    frontend: {
      en: "Learn the difference between research questions, hypotheses, predictions and observations.",
    },
  },
});
