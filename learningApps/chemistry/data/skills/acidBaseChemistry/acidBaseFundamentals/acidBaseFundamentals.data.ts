import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { acidBaseModels_Skill_Data, acidStrength_Skill_Data, pH_Skill_Data } from './skills';

export const acidBaseFundamentals_SkillGroup_Data = buildSkillGroupConfig({
  slug: "acidBaseFundamentals",
  id: "375c4757-1f94-4267-a037-d93385e3c3cd",
  name: {
    en: "Acid–Base Fundamentals",
  },
  skills: {
    acidBaseModels: acidBaseModels_Skill_Data,
    acidStrength: acidStrength_Skill_Data,
    pH: pH_Skill_Data,
  },
  description: {
    methodological: "Conceptual acid–base models establish what counts as an acid or base, while strength and pH describe different aspects of chemical behavior and solution conditions.",
    frontend: {
      en: "Understand different acid–base models, acidity, and acid strength.",
    },
  },
});
