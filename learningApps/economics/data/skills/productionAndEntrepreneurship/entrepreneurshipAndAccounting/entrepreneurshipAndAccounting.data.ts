import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { businessCashFlow_Skill_Data, businessModel_Skill_Data, businessRevenueCostsAndProfit_Skill_Data, entrepreneurialOpportunity_Skill_Data } from './skills';

export const entrepreneurshipAndAccounting_SkillGroup_Data = buildSkillGroupConfig({
  slug: "entrepreneurshipAndAccounting",
  id: "706a9ce9-d932-43da-a1c3-680422c1bc83",
  name: {
    en: "Підприємництво та облік",
  },
  skills: {
    businessCashFlow: businessCashFlow_Skill_Data,
    businessModel: businessModel_Skill_Data,
    businessRevenueCostsAndProfit: businessRevenueCostsAndProfit_Skill_Data,
    entrepreneurialOpportunity: entrepreneurialOpportunity_Skill_Data,
  },
  description: {
    methodological: "A new business requires testing the value offered, organizing resources, and analyzing its financial results.",
    frontend: {
      en: "Learn what makes a business idea economically workable.",
    },
  },
});
