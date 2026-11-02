import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { economicInequalityInEducation_Skill_Data, economicReturnsToEducation_Skill_Data, educationFinancing_Skill_Data } from './skills';

export const economicsOfEducation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "economicsOfEducation",
  id: "154a28e3-ec94-4701-8365-612622de732e",
  name: {
    en: "Освіта",
  },
  skills: {
    economicInequalityInEducation: economicInequalityInEducation_Skill_Data,
    economicReturnsToEducation: economicReturnsToEducation_Skill_Data,
    educationFinancing: educationFinancing_Skill_Data,
  },
  description: {
    methodological: "Investing in knowledge creates private and social returns and raises questions of financing, access, and uncertain information.",
    frontend: {
      en: "Explore the benefits, costs, and funding of education.",
    },
  },
});
