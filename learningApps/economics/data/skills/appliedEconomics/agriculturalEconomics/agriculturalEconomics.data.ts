import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { agriculturalMarkets_Skill_Data, agriculturalSeasonalityAndRisk_Skill_Data, foodSecurityAsAnEconomicIssue_Skill_Data } from './skills';

export const agriculturalEconomics_SkillGroup_Data = buildSkillGroupConfig({
  slug: "agriculturalEconomics",
  id: "d31cc523-188d-488b-972b-f222877bc173",
  name: {
    en: "Сільське господарство",
  },
  skills: {
    agriculturalMarkets: agriculturalMarkets_Skill_Data,
    agriculturalSeasonalityAndRisk: agriculturalSeasonalityAndRisk_Skill_Data,
    foodSecurityAsAnEconomicIssue: foodSecurityAsAnEconomicIssue_Skill_Data,
  },
  description: {
    methodological: "Biological cycles, uncertain weather, land use, and international exchange shape agricultural markets.",
    frontend: {
      en: "Discover why farming involves distinctive costs and risks.",
    },
  },
});
