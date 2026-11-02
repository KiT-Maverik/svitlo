import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const computeSetUnion_Skill_Data = buildSkillConfig({
  slug: "computeSetUnion",
  id: "21ce9513-77c6-4c04-ae9e-bc38606ccb79",
  name: {
    en: "Compute Set Union",
  },
  description: {
    methodological: "Create the set of all values that occur in either of two sets, eliminating duplicates.",
    frontend: {
      en: "Combine all distinct elements found in either of two sets.",
    },
  },
});
