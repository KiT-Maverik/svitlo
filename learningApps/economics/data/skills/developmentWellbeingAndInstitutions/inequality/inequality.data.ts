import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { giniCoefficient_Skill_Data, incomeDistribution_Skill_Data, intergenerationalEconomicMobility_Skill_Data, wealthDistribution_Skill_Data } from './skills';

export const inequality_SkillGroup_Data = buildSkillGroupConfig({
  slug: "inequality",
  id: "8a274f84-80f8-4691-be7f-60301d304b68",
  name: {
    en: "Нерівність",
  },
  skills: {
    giniCoefficient: giniCoefficient_Skill_Data,
    incomeDistribution: incomeDistribution_Skill_Data,
    intergenerationalEconomicMobility: intergenerationalEconomicMobility_Skill_Data,
    wealthDistribution: wealthDistribution_Skill_Data,
  },
  description: {
    methodological: "Distributions of income and wealth can differ even among societies with identical average incomes.",
    frontend: {
      en: "Explore why an average income does not reveal how resources are shared.",
    },
  },
});
