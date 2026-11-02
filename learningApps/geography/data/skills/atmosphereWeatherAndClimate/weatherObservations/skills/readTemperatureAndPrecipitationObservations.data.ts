import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const readTemperatureAndPrecipitationObservations_Skill_Data = buildSkillConfig({
  slug: "readTemperatureAndPrecipitationObservations",
  id: "e9c29ab1-fbca-4068-951f-4e86ac1d9550",
  name: {
    en: "Read temperature and precipitation observations",
  },
  description: {
    methodological: "Interpret a basic station table or chart with units and dates, separating amount of rain from air temperature.",
    frontend: {
      en: "Read temperature and rainfall measurements with their units and dates.",
    },
  },
});
