import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const removeAnElementFromASequence_Skill_Data = buildSkillConfig({
  slug: "removeAnElementFromASequence",
  id: "6c2e4182-d9ba-468d-94c9-43f7f0447377",
  name: {
    en: "Remove an Element from a Sequence",
  },
  description: {
    methodological: "Delete an item at a position while preserving the proper order and accessibility of the remaining elements.",
    frontend: {
      en: "Remove an item while preserving the remaining sequence.",
    },
  },
});
