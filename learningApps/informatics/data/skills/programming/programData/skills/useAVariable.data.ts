import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const useAVariable_Skill_Data = buildSkillConfig({
  slug: "useAVariable",
  id: "896d2bb4-2aa9-4c5c-baca-ea2ae000dc08",
  name: {
    en: "Use a Variable",
  },
  description: {
    methodological: "Define a named location for a value and access its current contents at runtime; distinguish the variable's name from the value it stores.",
    frontend: {
      en: "Store a value under a variable name and read it when needed.",
    },
  },
});
