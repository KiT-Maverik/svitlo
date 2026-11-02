import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { adaptationToAmericanEcosystems_Skill_Data, independentAmericanCropDomestication_Skill_Data, peoplingOfTheAmericas_Skill_Data } from './skills';

export const earliestAmericanPopulations_SkillGroup_Data = buildSkillGroupConfig({
  slug: "earliestAmericanPopulations",
  id: "c6fa86ed-782c-49a5-934b-dac368645a53",
  name: {
    en: "Раннє населення",
  },
  skills: {
    adaptationToAmericanEcosystems: adaptationToAmericanEcosystems_Skill_Data,
    independentAmericanCropDomestication: independentAmericanCropDomestication_Skill_Data,
    peoplingOfTheAmericas: peoplingOfTheAmericas_Skill_Data,
  },
  description: {
    methodological: "Examine early settlement dates and lifeways through archaeology, environmental research, and genetics.",
    frontend: {
      en: "Discover how researchers investigate the Americas' earliest inhabitants.",
    },
  },
});
