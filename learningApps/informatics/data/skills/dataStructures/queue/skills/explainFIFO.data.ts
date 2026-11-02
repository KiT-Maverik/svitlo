import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainFIFO_Skill_Data = buildSkillConfig({
  slug: "explainFIFO",
  id: "708e0714-f7be-4732-bcc3-6a1efc331bbe",
  name: {
    en: "Explain FIFO",
  },
  description: {
    methodological: "In a queue, the earliest added element is served first unless separate priority rules apply.",
    frontend: {
      en: "Explain why the earliest element in a queue leaves first.",
    },
  },
});
