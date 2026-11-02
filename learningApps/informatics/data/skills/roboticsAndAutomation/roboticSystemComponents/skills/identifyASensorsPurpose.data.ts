import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyASensorsPurpose_Skill_Data = buildSkillConfig({
  slug: "identifyASensorsPurpose",
  id: "aa2009f8-66f0-411e-b007-876b9360e813",
  name: {
    en: "Identify a Sensor's Purpose",
  },
  description: {
    methodological: "Determine which physical quantity or environmental state a sensor converts into a signal for the controller, such as distance, light, or temperature. A sensor supplies information but does not itself make control decisions.",
    frontend: {
      en: "Recognize sensors that measure light, distance, temperature or other conditions.",
    },
  },
});
