import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyEssentialObjectProperties_Skill_Data = buildSkillConfig({
  slug: "identifyEssentialObjectProperties",
  id: "35e71073-e3e6-4156-ba56-75e952aa78fc",
  name: {
    en: "Identify Essential Object Properties",
  },
  description: {
    methodological: "Choose only characteristics relevant to the given task: sorting books by author depends on the author's name, not the cover color. Properties omitted from one model may matter in another.",
    frontend: {
      en: "Choose the details that matter for a task and set irrelevant details aside.",
    },
  },
});
