import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const totalCostOfCredit_Skill_Data = buildSkillConfig({
  slug: "totalCostOfCredit",
  id: "c7cec123-a865-446f-83e5-0114b038ced1",
  name: {
    en: "Повна вартість кредиту",
  },
  description: {
    methodological: "Evaluate interest, fees, repayment schedules, and other mandatory payments under a particular loan agreement.",
    frontend: {
      en: "Compare what a loan really costs over its full repayment period.",
    },
  },
});
