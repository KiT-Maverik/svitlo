import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { absoluteAndRelativePoverty_Skill_Data, humanDevelopmentIndicators_Skill_Data, multidimensionalPoverty_Skill_Data } from './skills';

export const povertyAndWellbeing_SkillGroup_Data = buildSkillGroupConfig({
  slug: "povertyAndWellbeing",
  id: "08c40c03-8d1c-490f-8e68-a3ce11baf921",
  name: {
    en: "Бідність та добробут",
  },
  skills: {
    absoluteAndRelativePoverty: absoluteAndRelativePoverty_Skill_Data,
    humanDevelopmentIndicators: humanDevelopmentIndicators_Skill_Data,
    multidimensionalPoverty: multidimensionalPoverty_Skill_Data,
  },
  description: {
    methodological: "Assessing living conditions requires attention to income, opportunities, and access to essential goods.",
    frontend: {
      en: "Discover different ways to measure poverty and wellbeing.",
    },
  },
});
