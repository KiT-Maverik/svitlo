import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const financialFraudWarningSigns_Skill_Data = buildSkillConfig({
  slug: "financialFraudWarningSigns",
  id: "af76cb6c-d23c-40d4-8b6c-174ce461436f",
  name: {
    en: "Ознаки фінансового шахрайства",
  },
  description: {
    methodological: "Recognize implausible guaranteed returns, demands for urgent transfers, and opaque counterparties.",
    frontend: {
      en: "Spot warning signs of suspicious or deceptive financial offers.",
    },
  },
});
