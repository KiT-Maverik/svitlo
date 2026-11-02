import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { depositInsurance_Skill_Data, financialSupervision_Skill_Data, systemicFinancialRisk_Skill_Data } from './skills';

export const financialStabilityAndRegulation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "financialStabilityAndRegulation",
  id: "f1c7d81b-c126-418f-ab87-cb4dd190e2a6",
  name: {
    en: "Стабільність і регулювання",
  },
  skills: {
    depositInsurance: depositInsurance_Skill_Data,
    financialSupervision: financialSupervision_Skill_Data,
    systemicFinancialRisk: systemicFinancialRisk_Skill_Data,
  },
  description: {
    methodological: "Problems at individual intermediaries can spread through debt and confidence to the broader economy.",
    frontend: {
      en: "Explore how the financial system can face problems that spread across institutions.",
    },
  },
});
