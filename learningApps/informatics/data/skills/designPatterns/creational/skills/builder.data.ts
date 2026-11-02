import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const builder_Skill_Data = buildSkillConfig({
  slug: "builder",
  id: "379ba3ad-4f90-4690-b78e-2a4ad112606a",
  name: {
    en: "Builder",
  },
  description: {
    methodological: "Construct a complex object step by step through a separate builder, with sequences of steps reusable for different results.",
    frontend: {
      en: "Assemble a complex object one step at a time using a builder.",
    },
  },
});
