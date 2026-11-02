import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const discountsAndPromotions_Skill_Data = buildSkillConfig({
  slug: "discountsAndPromotions",
  id: "9081dd65-8482-4fff-b567-68d14a6e0068",
  name: {
    en: "Знижки та акційні пропозиції",
  },
  description: {
    methodological: "Calculate real savings against a verifiable reference price, quantity, and purchase conditions; interpret coupons, bundles, buy-one-get-one offers, and percentage discounts without assuming any discount makes a purchase necessary.",
    frontend: {
      en: "Check whether a discount really saves money before buying.",
    },
  },
});
