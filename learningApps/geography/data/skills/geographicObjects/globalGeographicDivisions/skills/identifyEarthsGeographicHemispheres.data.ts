import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyEarthsGeographicHemispheres_Skill_Data = buildSkillConfig({
  slug: "identifyEarthsGeographicHemispheres",
  id: "092c2a88-5988-4318-99cb-0162a1c0489a",
  name: {
    en: "Identify Earth's geographic hemispheres",
  },
  description: {
    methodological: "Use the Equator and a stated meridian division to identify northern, southern, eastern or western hemispheres, while recognizing that eastern/western boundaries depend on the chosen conventional meridian.",
    frontend: {
      en: "Identify Earth's hemispheres using the Equator and a stated meridian.",
    },
  },
});
