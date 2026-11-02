import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareObjectsTemperatures_Skill_Data, distinguishTemperatureFromTheSensationOfWarmth_Skill_Data, recognizeCooling_Skill_Data, recognizeHeating_Skill_Data } from './skills';

export const temperatureAndHeating_SkillGroup_Data = buildSkillGroupConfig({
  slug: "temperatureAndHeating",
  id: "4e0156d6-7880-4fb0-8fff-b003ca29afc9",
  name: {
    en: "Temperature and Heating",
  },
  skills: {
    compareObjectsTemperatures: compareObjectsTemperatures_Skill_Data,
    distinguishTemperatureFromTheSensationOfWarmth: distinguishTemperatureFromTheSensationOfWarmth_Skill_Data,
    recognizeCooling: recognizeCooling_Skill_Data,
    recognizeHeating: recognizeHeating_Skill_Data,
  },
  description: {
    methodological: "Temperature characterizes thermal state but is not the same as a subjective feeling of warmth or cold; heating and cooling are changes of state.",
    frontend: {
      en: "Learn to distinguish temperature measurements from feelings of warmth.",
    },
  },
});
