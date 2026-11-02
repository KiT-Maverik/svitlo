import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainCurrentBalanceAtACircuitNode_Skill_Data = buildSkillConfig({
  slug: "explainCurrentBalanceAtACircuitNode",
  id: "a726f77b-a9cc-4223-b567-ea73eb169b2a",
  name: {
    en: "Explain current balance at a circuit node",
  },
  description: {
    methodological: "Under steady current, charge does not accumulate at a node; the total current entering equals the total current leaving.",
    frontend: {
      en: "Explain why current entering a steady circuit junction equals current leaving.",
    },
  },
});
