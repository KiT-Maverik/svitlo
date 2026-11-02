import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeMedicineMisuse_Skill_Data = buildSkillConfig({
  slug: "recognizeMedicineMisuse",
  id: "a2031607-e217-475c-832b-9d95884145f6",
  name: {
    en: "Recognize medicine misuse",
  },
  description: {
    methodological: "Identify hazardous use outside prescribed or labelled purposes, including sharing medication and mixing substances.",
    frontend: {
      en: "Recognize dangerous ways medicines may be shared or misused.",
    },
  },
});
