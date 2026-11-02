import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareWaysToReduceWeatherHazardRisk_Skill_Data, interpretAWeatherWarningAreaOnAMap_Skill_Data, recognizeAreasExposedToWeatherRelatedHazards_Skill_Data } from './skills';

export const atmosphericHazards_SkillGroup_Data = buildSkillGroupConfig({
  slug: "atmosphericHazards",
  id: "2d054268-d946-4660-98de-16b331e29c63",
  name: {
    en: "Atmospheric Hazards",
  },
  skills: {
    compareWaysToReduceWeatherHazardRisk: compareWaysToReduceWeatherHazardRisk_Skill_Data,
    interpretAWeatherWarningAreaOnAMap: interpretAWeatherWarningAreaOnAMap_Skill_Data,
    recognizeAreasExposedToWeatherRelatedHazards: recognizeAreasExposedToWeatherRelatedHazards_Skill_Data,
  },
  description: {
    methodological: "Drought, storms, extreme temperatures, and heavy precipitation become hazards through the interaction of physical exposure and human vulnerability. Geographic representation helps identify where impacts are likely.",
    frontend: {
      en: "Learn why hazardous weather affects different places and people in different ways.",
    },
  },
});
