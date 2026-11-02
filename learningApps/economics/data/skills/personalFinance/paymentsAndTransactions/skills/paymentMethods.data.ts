import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const paymentMethods_Skill_Data = buildSkillConfig({
  slug: "paymentMethods",
  id: "29b5efc8-c76e-49cb-a775-4f189f6c440b",
  name: {
    en: "Платіжні інструменти",
  },
  description: {
    methodological: "Distinguish cash, bank transfers, cards, and digital payments by how they operate and the protections available.",
    frontend: {
      en: "Compare paying with cash, a card, or a digital transfer.",
    },
  },
});
