import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const chemicalHandlingDecisions_Skill_Data = buildSkillConfig({
  slug: "chemicalHandlingDecisions",
  id: "0f8497b3-aba2-42ba-9d4c-7450200abf08",
  name: {
    en: "Chemical Handling Decisions",
  },
  description: {
    methodological: "Choose risk-appropriate handling and disposal principles from substance identity, concentration and safety information rather than assuming familiar products are harmless.",
    frontend: {
      en: "Choose safe handling principles based on chemical information and conditions.",
    },
  },
});
