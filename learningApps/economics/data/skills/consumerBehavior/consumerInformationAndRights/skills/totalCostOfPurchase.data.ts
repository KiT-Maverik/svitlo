import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const totalCostOfPurchase_Skill_Data = buildSkillConfig({
  slug: "totalCostOfPurchase",
  id: "9e19ecb1-2986-4e3d-b34b-e60313b48cd0",
  name: {
    en: "Повна вартість покупки",
  },
  description: {
    methodological: "Estimate all substantial buyer-side costs, including delivery, operation, maintenance, and fees, when comparing options, even when these costs are disclosed. Seller-imposed optional extras belong to commercial-practices analysis.",
    frontend: {
      en: "Compare the true overall cost of purchases, not just the displayed price.",
    },
  },
});
