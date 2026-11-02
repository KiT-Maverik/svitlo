import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { fiscalAndMonetaryPolicy_SkillGroup_Data } from './fiscalAndMonetaryPolicy/fiscalAndMonetaryPolicy.data';
import { publicBudgetAndDebt_SkillGroup_Data } from './publicBudgetAndDebt/publicBudgetAndDebt.data';
import { publicGoodsAndRegulation_SkillGroup_Data } from './publicGoodsAndRegulation/publicGoodsAndRegulation.data';
import { redistributionAndSocialProtection_SkillGroup_Data } from './redistributionAndSocialProtection/redistributionAndSocialProtection.data';
import { taxes_SkillGroup_Data } from './taxes/taxes.data';

export const governmentAndEconomicPolicy_SkillDomain_Data = buildSkillDomainConfig({
  slug: "governmentAndEconomicPolicy",
  id: "386336c3-eed2-476c-8b10-da1ee8c18593",
  name: {
    en: "Держава та економічна політика",
  },
  groups: {
    fiscalAndMonetaryPolicy: fiscalAndMonetaryPolicy_SkillGroup_Data,
    publicBudgetAndDebt: publicBudgetAndDebt_SkillGroup_Data,
    publicGoodsAndRegulation: publicGoodsAndRegulation_SkillGroup_Data,
    redistributionAndSocialProtection: redistributionAndSocialProtection_SkillGroup_Data,
    taxes: taxes_SkillGroup_Data,
  },
  description: {
    methodological: "The public sector changes incentives, finances shared needs, and redistributes resources. Policy instruments have benefits, costs, risks, and political trade-offs; no single approach is assumed universally correct.",
    frontend: {
      en: "Explore how government decisions influence resources, incentives, and economic outcomes.",
    },
  },
});
