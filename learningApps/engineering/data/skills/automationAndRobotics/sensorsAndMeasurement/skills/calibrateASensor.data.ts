import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const calibrateASensor_Skill_Data = buildSkillConfig({
  slug: "calibrateASensor",
  id: "e9baf5e7-6c21-4fa9-8126-16d2d9a33734",
  name: {
    en: "Calibrate a sensor",
  },
  description: {
    methodological: "Relate device readings to known references and correct or qualify the measurements.",
    frontend: {
      en: "Calibrate a sensor against a known reference.",
    },
  },
});
