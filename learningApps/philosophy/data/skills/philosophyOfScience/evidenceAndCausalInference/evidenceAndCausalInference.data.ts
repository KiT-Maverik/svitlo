import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { assessMeasurementValidity_Skill_Data, assessSampleRepresentativeness_Skill_Data, distinguishCorrelationFromCausation_Skill_Data, evaluateACausalConclusionFromAStudy_Skill_Data, evaluateSamplingUncertainty_Skill_Data, identifyAConfoundingFactor_Skill_Data } from './skills';

export const evidenceAndCausalInference_SkillGroup_Data = buildSkillGroupConfig({
  slug: "evidenceAndCausalInference",
  id: "b8d2d950-9001-44af-a7ef-e19c39b6f6c6",
  name: {
    en: "Evidence and Causal Inference",
  },
  skills: {
    assessMeasurementValidity: assessMeasurementValidity_Skill_Data,
    assessSampleRepresentativeness: assessSampleRepresentativeness_Skill_Data,
    distinguishCorrelationFromCausation: distinguishCorrelationFromCausation_Skill_Data,
    evaluateACausalConclusionFromAStudy: evaluateACausalConclusionFromAStudy_Skill_Data,
    evaluateSamplingUncertainty: evaluateSamplingUncertainty_Skill_Data,
    identifyAConfoundingFactor: identifyAConfoundingFactor_Skill_Data,
  },
  description: {
    methodological: "Observations become informative only through assumptions about measurement, variation, and alternative explanations. The quality of a causal conclusion is not identical to the size of an observed association.",
    frontend: {
      en: "Explore what evidence can and cannot establish about causal relationships.",
    },
  },
});
