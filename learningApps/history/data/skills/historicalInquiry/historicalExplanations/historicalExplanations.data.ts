import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { continuityAndChange_Skill_Data, historicalCausality_Skill_Data, historicalComparison_Skill_Data, historicalUncertainty_Skill_Data } from './skills';

export const historicalExplanations_SkillGroup_Data = buildSkillGroupConfig({
  slug: "historicalExplanations",
  id: "dc762b63-609d-434b-9553-0acac99b583b",
  name: {
    en: "Історичні пояснення",
  },
  skills: {
    continuityAndChange: continuityAndChange_Skill_Data,
    historicalCausality: historicalCausality_Skill_Data,
    historicalComparison: historicalComparison_Skill_Data,
    historicalUncertainty: historicalUncertainty_Skill_Data,
  },
  description: {
    methodological: "Distinguish supported facts, explanatory models, values, uncertain reconstructions, and competing interpretations when reasoning about the past.",
    frontend: {
      en: "Learn to build historical explanations from evidence.",
    },
  },
});
