import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const applyLogicalAND_Skill_Data = buildSkillConfig({
  slug: "applyLogicalAND",
  id: "09f1c8e9-9e7b-4d80-8d91-c18f86e96b06",
  name: {
    en: "Apply Logical AND",
  },
  description: {
    methodological: "Evaluate the conjunction of two conditions: it is true only when both conditions are true. For example, access requires both a correct code and authorization; do not confuse this with an alternative condition.",
    frontend: {
      en: "Use AND to check whether two requirements are both satisfied.",
    },
  },
});
