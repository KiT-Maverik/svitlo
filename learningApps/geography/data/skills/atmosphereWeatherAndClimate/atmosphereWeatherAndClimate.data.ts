import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { atmosphericHazards_SkillGroup_Data } from './atmosphericHazards/atmosphericHazards.data';
import { atmosphericProcesses_SkillGroup_Data } from './atmosphericProcesses/atmosphericProcesses.data';
import { climatePatterns_SkillGroup_Data } from './climatePatterns/climatePatterns.data';
import { weatherObservations_SkillGroup_Data } from './weatherObservations/weatherObservations.data';

export const atmosphereWeatherAndClimate_SkillDomain_Data = buildSkillDomainConfig({
  slug: "atmosphereWeatherAndClimate",
  id: "0932373f-a251-4619-9fc4-4779bd00cead",
  name: {
    en: "Atmosphere, Weather, and Climate",
  },
  groups: {
    atmosphericHazards: atmosphericHazards_SkillGroup_Data,
    atmosphericProcesses: atmosphericProcesses_SkillGroup_Data,
    climatePatterns: climatePatterns_SkillGroup_Data,
    weatherObservations: weatherObservations_SkillGroup_Data,
  },
  description: {
    methodological: "Weather describes atmospheric conditions at a place and time, whereas climate characterizes their long-term distributions and change. Geographic inquiry examines how clouds, precipitation, air motion and circulation vary across places, and how hazards and climate trends influence regions.",
    frontend: {
      en: "Explore atmospheric conditions, long-term climate patterns and weather-related hazards.",
    },
  },
});
