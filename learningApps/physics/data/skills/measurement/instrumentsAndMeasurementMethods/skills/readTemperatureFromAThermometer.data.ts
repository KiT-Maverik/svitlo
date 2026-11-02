import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const readTemperatureFromAThermometer_Skill_Data = buildSkillConfig({
  slug: "readTemperatureFromAThermometer",
  id: "9c9ff04f-5ae3-4d31-bfc1-562652307a03",
  name: {
    en: "Read temperature from a thermometer",
  },
  description: {
    methodological: "Relate the position of a pointer or liquid column to the temperature scale and units, accounting for the scale origin and measurement limits.",
    frontend: {
      en: "Read a thermometer's scale and units to determine temperature.",
    },
  },
});
