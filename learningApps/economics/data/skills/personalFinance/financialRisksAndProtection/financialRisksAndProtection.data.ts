import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { financialFraudWarningSigns_Skill_Data, financialRiskAndExpectedReward_Skill_Data, insurancePrinciples_Skill_Data } from './skills';

export const financialRisksAndProtection_SkillGroup_Data = buildSkillGroupConfig({
  slug: "financialRisksAndProtection",
  id: "e4edf951-cc50-458e-a233-82eef79c324f",
  name: {
    en: "Ризики та захист",
  },
  skills: {
    financialFraudWarningSigns: financialFraudWarningSigns_Skill_Data,
    financialRiskAndExpectedReward: financialRiskAndExpectedReward_Skill_Data,
    insurancePrinciples: insurancePrinciples_Skill_Data,
  },
  description: {
    methodological: "Financial security involves understanding acceptable risk, insurance options, and warning signs of deceptive offers.",
    frontend: {
      en: "Explore ways to recognize financial risks and protect yourself.",
    },
  },
});
