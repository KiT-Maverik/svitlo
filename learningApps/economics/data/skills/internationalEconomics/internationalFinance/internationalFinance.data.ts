import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { currencyCrises_Skill_Data, debtCrises_Skill_Data, foreignDirectInvestment_Skill_Data, internationalCapitalFlows_Skill_Data } from './skills';

export const internationalFinance_SkillGroup_Data = buildSkillGroupConfig({
  slug: "internationalFinance",
  id: "ed9e2528-b5b9-4b78-aa4e-97c57dd91cf1",
  name: {
    en: "Міжнародні фінанси",
  },
  skills: {
    currencyCrises: currencyCrises_Skill_Data,
    debtCrises: debtCrises_Skill_Data,
    foreignDirectInvestment: foreignDirectInvestment_Skill_Data,
    internationalCapitalFlows: internationalCapitalFlows_Skill_Data,
  },
  description: {
    methodological: "Capital crosses borders through investments, loans, and other claims with distinctive benefits and risks.",
    frontend: {
      en: "Explore how countries borrow and invest across borders.",
    },
  },
});
