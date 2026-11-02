import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { classifyNaturalAndArtificialLightSources_Skill_Data, distinguishALightSourceFromAnIlluminatedBody_Skill_Data, explainTheConditionForAnObjectToBeVisible_Skill_Data } from './skills';

export const lightSourcesAndVisibility_SkillGroup_Data = buildSkillGroupConfig({
  slug: "lightSourcesAndVisibility",
  id: "a7f25a6b-49d9-43d7-8e43-a107ca77b459",
  name: {
    en: "Light Sources and Visibility",
  },
  skills: {
    classifyNaturalAndArtificialLightSources: classifyNaturalAndArtificialLightSources_Skill_Data,
    distinguishALightSourceFromAnIlluminatedBody: distinguishALightSourceFromAnIlluminatedBody_Skill_Data,
    explainTheConditionForAnObjectToBeVisible: explainTheConditionForAnObjectToBeVisible_Skill_Data,
  },
  description: {
    methodological: "An object is visible when light from it reaches the eye; a light source and an illuminated surface play different roles.",
    frontend: {
      en: "Discover why some objects emit light and others are visible by reflection.",
    },
  },
});
