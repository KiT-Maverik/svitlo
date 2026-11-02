import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { discountingFutureConsequences_Skill_Data, intergenerationalEconomicImpacts_Skill_Data } from './skills';

export const sustainabilityAndIntertemporalChoice_SkillGroup_Data = buildSkillGroupConfig({
  slug: "sustainabilityAndIntertemporalChoice",
  id: "aa7653a3-7df3-4c59-b61b-96cc77329c93",
  name: {
    en: "Стійкість та міжчасовий вибір",
  },
  skills: {
    discountingFutureConsequences: discountingFutureConsequences_Skill_Data,
    intergenerationalEconomicImpacts: intergenerationalEconomicImpacts_Skill_Data,
  },
  description: {
    methodological: "Present decisions can change future resource availability, risks, and wellbeing across generations.",
    frontend: {
      en: "Explore how today's choices influence the resources left for tomorrow.",
    },
  },
});
