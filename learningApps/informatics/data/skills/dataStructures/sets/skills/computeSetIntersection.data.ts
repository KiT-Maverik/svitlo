import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const computeSetIntersection_Skill_Data = buildSkillConfig({
  slug: "computeSetIntersection",
  id: "1fcffa8d-5b4f-4708-ae32-f5f488e42ea9",
  name: {
    en: "Compute Set Intersection",
  },
  description: {
    methodological: "Find only values shared by two sets, distinguishing intersection from union.",
    frontend: {
      en: "Find only the elements shared by two sets.",
    },
  },
});
