import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { balanceOfPayments_Skill_Data, exchangeRateRegimes_Skill_Data, nominalExchangeRate_Skill_Data, realExchangeRate_Skill_Data } from './skills';

export const currenciesAndExternalBalances_SkillGroup_Data = buildSkillGroupConfig({
  slug: "currenciesAndExternalBalances",
  id: "eaffa40a-dc60-4464-bc0f-8de45d609d63",
  name: {
    en: "Валюти та зовнішні баланси",
  },
  skills: {
    balanceOfPayments: balanceOfPayments_Skill_Data,
    exchangeRateRegimes: exchangeRateRegimes_Skill_Data,
    nominalExchangeRate: nominalExchangeRate_Skill_Data,
    realExchangeRate: realExchangeRate_Skill_Data,
  },
  description: {
    methodological: "International transactions involve exchange rates, payments, and financial claims on other countries.",
    frontend: {
      en: "Learn how exchange rates and cross-border accounts work.",
    },
  },
});
