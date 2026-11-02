import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const updateADictionaryValue_Skill_Data = buildSkillConfig({
  slug: "updateADictionaryValue",
  id: "40a4c105-9e0e-4165-832c-b92a35dae263",
  name: {
    en: "Update a Dictionary Value",
  },
  description: {
    methodological: "Replace the value associated with an existing key without accidentally duplicating the key.",
    frontend: {
      en: "Change a value stored under an existing dictionary key.",
    },
  },
});
