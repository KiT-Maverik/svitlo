import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpretUniversalQuantification_Skill_Data = buildSkillConfig({
  slug: "interpretUniversalQuantification",
  id: "111aca7c-22d7-44ac-a5b5-1aa500711288",
  name: {
    en: "Interpret universal quantification",
  },
  description: {
    methodological: "Determine what it means for a property to hold for every element of a specified domain and how one counterexample would matter.",
    frontend: {
      en: "Read a statement that applies to every member of a specified group.",
    },
  },
});
