import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { housingAffordability_Skill_Data, housingMarket_Skill_Data, landUseEconomics_Skill_Data } from './skills';

export const housingAndRealEstate_SkillGroup_Data = buildSkillGroupConfig({
  slug: "housingAndRealEstate",
  id: "e7db97cc-0c63-461a-b970-9bb3520ecd81",
  name: {
    en: "Житло та нерухомість",
  },
  skills: {
    housingAffordability: housingAffordability_Skill_Data,
    housingMarket: housingMarket_Skill_Data,
    landUseEconomics: landUseEconomics_Skill_Data,
  },
  description: {
    methodological: "Housing prices and affordability depend on land, construction, income, mortgage finance, local demand, and regulation.",
    frontend: {
      en: "Explore why home prices and rents vary across places.",
    },
  },
});
