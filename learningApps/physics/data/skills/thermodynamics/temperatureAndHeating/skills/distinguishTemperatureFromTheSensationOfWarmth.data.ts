import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishTemperatureFromTheSensationOfWarmth_Skill_Data = buildSkillConfig({
  slug: "distinguishTemperatureFromTheSensationOfWarmth",
  id: "d38935af-72be-4728-bd55-dae223d738ff",
  name: {
    en: "Distinguish temperature from the sensation of warmth",
  },
  description: {
    methodological: "Explain why the sensation of touch is not always an accurate measure of temperature.",
    frontend: {
      en: "Explain why two objects at the same temperature can feel different.",
    },
  },
});
