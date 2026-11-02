import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { advertisingAndCommunications_SkillGroup_Data } from './advertisingAndCommunications/advertisingAndCommunications.data';
import { marketResearch_SkillGroup_Data } from './marketResearch/marketResearch.data';
import { pricingPromotionsAndFairness_SkillGroup_Data } from './pricingPromotionsAndFairness/pricingPromotionsAndFairness.data';
import { productAndValueProposition_SkillGroup_Data } from './productAndValueProposition/productAndValueProposition.data';
import { retailMerchandising_SkillGroup_Data } from './retailMerchandising/retailMerchandising.data';
import { salesChannelsAndDistribution_SkillGroup_Data } from './salesChannelsAndDistribution/salesChannelsAndDistribution.data';

export const marketingAndTrade_SkillDomain_Data = buildSkillDomainConfig({
  slug: "marketingAndTrade",
  id: "b4bbb2db-d764-4ee3-a188-8aa084ff9929",
  name: {
    en: "Маркетинг і торгівля",
  },
  groups: {
    advertisingAndCommunications: advertisingAndCommunications_SkillGroup_Data,
    marketResearch: marketResearch_SkillGroup_Data,
    pricingPromotionsAndFairness: pricingPromotionsAndFairness_SkillGroup_Data,
    productAndValueProposition: productAndValueProposition_SkillGroup_Data,
    retailMerchandising: retailMerchandising_SkillGroup_Data,
    salesChannelsAndDistribution: salesChannelsAndDistribution_SkillGroup_Data,
  },
  description: {
    methodological: "Marketing examines how firms identify needs, develop offers, and communicate their value. Retail environments, price incentives, and fair influence on buyers are analyzed separately.",
    frontend: {
      en: "Explore how businesses understand customers, present products, and sell responsibly.",
    },
  },
});
