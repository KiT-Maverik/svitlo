import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const wealthDistribution_Skill_Data = buildSkillConfig({
  slug: "wealthDistribution",
  id: "0bfab2ab-f7e4-4644-bb85-03a2fc9a018f",
  name: {
    en: "Розподіл багатства",
  },
  description: {
    methodological: "Analyze inequality in household net assets—property and financial claims less debt—separately from current income flows.",
    frontend: {
      en: "Distinguish inequality in wealth from inequality in income.",
    },
  },
});
