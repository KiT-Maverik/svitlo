import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const evaluateACategoricalSyllogism_Skill_Data = buildSkillConfig({
  slug: "evaluateACategoricalSyllogism",
  id: "beab0d9a-3e61-41c2-8d74-77bb0c0d9bff",
  name: {
    en: "Evaluate a categorical syllogism",
  },
  description: {
    methodological: "Examine whether relations among classes support the proposed conclusion, rather than relying on familiar subject matter.",
    frontend: {
      en: "Determine whether statements about categories logically support a conclusion.",
    },
  },
});
