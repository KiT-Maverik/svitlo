import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { acidBaseIndicators_Skill_Data, acidBaseTitration_Skill_Data, bufferSolutions_Skill_Data, neutralization_Skill_Data } from './skills';

export const acidBaseSystems_SkillGroup_Data = buildSkillGroupConfig({
  slug: "acidBaseSystems",
  id: "e2ae79c7-d289-4876-9e50-387883d1e4a0",
  name: {
    en: "Acid–Base Systems",
  },
  skills: {
    acidBaseIndicators: acidBaseIndicators_Skill_Data,
    acidBaseTitration: acidBaseTitration_Skill_Data,
    bufferSolutions: bufferSolutions_Skill_Data,
    neutralization: neutralization_Skill_Data,
  },
  description: {
    methodological: "Neutralization, indicator responses, buffer equilibria and titration exemplify how acid–base behavior is observed, controlled and measured under specific conditions.",
    frontend: {
      en: "Discover how acids and bases react and how their effects are measured.",
    },
  },
});
