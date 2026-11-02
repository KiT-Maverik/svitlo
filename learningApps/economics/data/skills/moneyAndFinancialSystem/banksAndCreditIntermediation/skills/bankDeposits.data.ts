import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const bankDeposits_Skill_Data = buildSkillConfig({
  slug: "bankDeposits",
  id: "55bec763-a9f6-408a-a1a4-c94bc63aa71a",
  name: {
    en: "Банківські депозити",
  },
  description: {
    methodological: "Interpret funds placed with banks, access conditions, interest, and the difference between a deposit and holding physical cash.",
    frontend: {
      en: "Learn how bank deposits work and what their conditions mean.",
    },
  },
});
