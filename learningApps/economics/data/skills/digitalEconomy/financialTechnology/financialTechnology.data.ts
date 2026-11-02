import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { cryptoassetsAndDigitalCurrencies_Skill_Data, paymentFinancialTechnologies_Skill_Data } from './skills';

export const financialTechnology_SkillGroup_Data = buildSkillGroupConfig({
  slug: "financialTechnology",
  id: "d312f368-e15a-4c37-be64-c00773a9e72f",
  name: {
    en: "Фінансові технології",
  },
  skills: {
    cryptoassetsAndDigitalCurrencies: cryptoassetsAndDigitalCurrencies_Skill_Data,
    paymentFinancialTechnologies: paymentFinancialTechnologies_Skill_Data,
  },
  description: {
    methodological: "Digital payment services and new asset classes alter financial intermediation, transaction speed, and risks; technological design does not by itself determine economic status.",
    frontend: {
      en: "Discover how digital financial services change payments and risk.",
    },
  },
});
