import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainTheConceptOfWeather_Skill_Data, identifyWeatherVariablesInAnObservation_Skill_Data, interpretStandardWeatherSymbolsOnAMap_Skill_Data, readTemperatureAndPrecipitationObservations_Skill_Data } from './skills';

export const weatherObservations_SkillGroup_Data = buildSkillGroupConfig({
  slug: "weatherObservations",
  id: "5e8b508b-c2af-4ac9-b5d5-381002c5bb0f",
  name: {
    en: "Weather Observations",
  },
  skills: {
    explainTheConceptOfWeather: explainTheConceptOfWeather_Skill_Data,
    identifyWeatherVariablesInAnObservation: identifyWeatherVariablesInAnObservation_Skill_Data,
    interpretStandardWeatherSymbolsOnAMap: interpretStandardWeatherSymbolsOnAMap_Skill_Data,
    readTemperatureAndPrecipitationObservations: readTemperatureAndPrecipitationObservations_Skill_Data,
  },
  description: {
    methodological: "Weather is described by measurable conditions at a particular location and time. Observations must be interpreted with appropriate units and temporal context.",
    frontend: {
      en: "Learn how to record and interpret weather at a particular place and time.",
    },
  },
});
