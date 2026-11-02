import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { discountsAndPromotions_Skill_Data, ethicalMarketing_Skill_Data, hiddenChargesAndForcedExtras_Skill_Data, manipulativeCommercialTactics_Skill_Data, psychologicalPricing_Skill_Data, retailPricingStrategies_Skill_Data, subscriptionCancellationBarriers_Skill_Data } from './skills';

export const pricingPromotionsAndFairness_SkillGroup_Data = buildSkillGroupConfig({
  slug: "pricingPromotionsAndFairness",
  id: "3abaa57c-0495-4bba-9b46-22652eec60a7",
  name: {
    en: "Ціни, акції та добросовісність",
  },
  skills: {
    discountsAndPromotions: discountsAndPromotions_Skill_Data,
    ethicalMarketing: ethicalMarketing_Skill_Data,
    hiddenChargesAndForcedExtras: hiddenChargesAndForcedExtras_Skill_Data,
    manipulativeCommercialTactics: manipulativeCommercialTactics_Skill_Data,
    psychologicalPricing: psychologicalPricing_Skill_Data,
    retailPricingStrategies: retailPricingStrategies_Skill_Data,
    subscriptionCancellationBarriers: subscriptionCancellationBarriers_Skill_Data,
  },
  description: {
    methodological: "Price offers have commercial effects, but judging them requires verifying actual savings and methods of influencing buyers.",
    frontend: {
      en: "Learn to evaluate sale prices, discounts, and fair selling practices.",
    },
  },
});
