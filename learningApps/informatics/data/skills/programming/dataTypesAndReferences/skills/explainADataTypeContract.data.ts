import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainADataTypeContract_Skill_Data = buildSkillConfig({
  slug: "explainADataTypeContract",
  id: "2f5ef4e7-1714-4486-9b5b-3abde40b8272",
  name: {
    en: "Explain a Data Type Contract",
  },
  description: {
    methodological: "Determine what type or form of value a declared input contract requires for a function, component, or call; text cannot always safely substitute for a number.",
    frontend: {
      en: "Understand the kind of value a program function expects to receive.",
    },
  },
});
