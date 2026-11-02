import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { currenciesAndExternalBalances_SkillGroup_Data } from './currenciesAndExternalBalances/currenciesAndExternalBalances.data';
import { internationalFinance_SkillGroup_Data } from './internationalFinance/internationalFinance.data';
import { specializationAndTradeGains_SkillGroup_Data } from './specializationAndTradeGains/specializationAndTradeGains.data';
import { tradePolicy_SkillGroup_Data } from './tradePolicy/tradePolicy.data';

export const internationalEconomics_SkillDomain_Data = buildSkillDomainConfig({
  slug: "internationalEconomics",
  id: "0d701503-d2d5-4d69-8d8c-d8aebc5bff50",
  name: {
    en: "Міжнародна економіка",
  },
  groups: {
    currenciesAndExternalBalances: currenciesAndExternalBalances_SkillGroup_Data,
    internationalFinance: internationalFinance_SkillGroup_Data,
    specializationAndTradeGains: specializationAndTradeGains_SkillGroup_Data,
    tradePolicy: tradePolicy_SkillGroup_Data,
  },
  description: {
    methodological: "Countries are connected by flows of goods, services, capital, and foreign-currency payments. International economic effects cannot be reduced to the geography of trade routes.",
    frontend: {
      en: "Explore how trade, currencies, and investment connect different countries.",
    },
  },
});
