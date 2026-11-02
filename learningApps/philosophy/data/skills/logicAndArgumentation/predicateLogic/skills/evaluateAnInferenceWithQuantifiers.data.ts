import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const evaluateAnInferenceWithQuantifiers_Skill_Data = buildSkillConfig({
  slug: "evaluateAnInferenceWithQuantifiers",
  id: "2b656dd4-44b4-448c-b106-d77f5f611ee7",
  name: {
    en: "Evaluate an inference with quantifiers",
  },
  description: {
    methodological: "Check whether a conclusion about all or some members of a domain follows from quantified premises under a stated interpretation.",
    frontend: {
      en: "Check whether quantified premises really imply a proposed conclusion.",
    },
  },
});
