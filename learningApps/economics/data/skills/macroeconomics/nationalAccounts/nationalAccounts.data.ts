import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { aggregateExpenditureComponents_Skill_Data, gdpPerCapitaAndWelfare_Skill_Data, grossDomesticProduct_Skill_Data, nominalAndRealOutput_Skill_Data } from './skills';

export const nationalAccounts_SkillGroup_Data = buildSkillGroupConfig({
  slug: "nationalAccounts",
  id: "abf7a917-66db-4522-b08e-1fafc957b05a",
  name: {
    en: "Національні рахунки",
  },
  skills: {
    aggregateExpenditureComponents: aggregateExpenditureComponents_Skill_Data,
    gdpPerCapitaAndWelfare: gdpPerCapitaAndWelfare_Skill_Data,
    grossDomesticProduct: grossDomesticProduct_Skill_Data,
    nominalAndRealOutput: nominalAndRealOutput_Skill_Data,
  },
  description: {
    methodological: "Aggregate economic activity is measured using consistent categories of production, income, and expenditure.",
    frontend: {
      en: "Learn how economists measure overall economic activity.",
    },
  },
});
