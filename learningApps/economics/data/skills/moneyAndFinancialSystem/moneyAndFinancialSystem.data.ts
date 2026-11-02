import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { banksAndCreditIntermediation_SkillGroup_Data } from './banksAndCreditIntermediation/banksAndCreditIntermediation.data';
import { financialMarkets_SkillGroup_Data } from './financialMarkets/financialMarkets.data';
import { financialStabilityAndRegulation_SkillGroup_Data } from './financialStabilityAndRegulation/financialStabilityAndRegulation.data';
import { natureOfMoney_SkillGroup_Data } from './natureOfMoney/natureOfMoney.data';

export const moneyAndFinancialSystem_SkillDomain_Data = buildSkillDomainConfig({
  slug: "moneyAndFinancialSystem",
  id: "43d4b32d-b5bc-4245-9368-36aad346c56a",
  name: {
    en: "Гроші та фінансова система",
  },
  groups: {
    banksAndCreditIntermediation: banksAndCreditIntermediation_SkillGroup_Data,
    financialMarkets: financialMarkets_SkillGroup_Data,
    financialStabilityAndRegulation: financialStabilityAndRegulation_SkillGroup_Data,
    natureOfMoney: natureOfMoney_SkillGroup_Data,
  },
  description: {
    methodological: "Financial institutions redistribute funds across time and among economic participants. The focus is system instruments and mechanisms; personal financial decisions belong to a neighboring domain.",
    frontend: {
      en: "Discover how money, banks, and financial markets connect the economy.",
    },
  },
});
