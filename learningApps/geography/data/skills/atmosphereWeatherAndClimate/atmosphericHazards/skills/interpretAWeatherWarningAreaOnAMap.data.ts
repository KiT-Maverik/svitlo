import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpretAWeatherWarningAreaOnAMap_Skill_Data = buildSkillConfig({
  slug: "interpretAWeatherWarningAreaOnAMap",
  id: "15799551-7e29-44b0-95da-1bf2e5305e85",
  name: {
    en: "Interpret a weather warning area on a map",
  },
  description: {
    methodological: "Identify affected places and the warning's time scope without mistaking a forecast zone for an exact prediction at every point.",
    frontend: {
      en: "Read a weather-warning map to identify affected areas and time periods.",
    },
  },
});
