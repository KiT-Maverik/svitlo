import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishDeductiveCertaintyFromProbabilisticSupport_Skill_Data, evaluateAnalogicalReasoning_Skill_Data, evaluateAnInductiveGeneralization_Skill_Data, evaluateAnInferenceToTheBestExplanation_Skill_Data } from './skills';

export const nonDeductiveReasoning_SkillGroup_Data = buildSkillGroupConfig({
  slug: "nonDeductiveReasoning",
  id: "efea3959-c495-472e-99c9-c8aea629b408",
  name: {
    en: "Non-deductive Reasoning",
  },
  skills: {
    distinguishDeductiveCertaintyFromProbabilisticSupport: distinguishDeductiveCertaintyFromProbabilisticSupport_Skill_Data,
    evaluateAnalogicalReasoning: evaluateAnalogicalReasoning_Skill_Data,
    evaluateAnInductiveGeneralization: evaluateAnInductiveGeneralization_Skill_Data,
    evaluateAnInferenceToTheBestExplanation: evaluateAnInferenceToTheBestExplanation_Skill_Data,
  },
  description: {
    methodological: "Many reasonable arguments support conclusions without guaranteeing them. Their strength depends on evidence, alternatives, sampling, or explanatory power rather than formal certainty.",
    frontend: {
      en: "Learn to assess reasoning that offers support without guaranteeing certainty.",
    },
  },
});
