import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const flightControlSurfaces_Skill_Data = buildSkillConfig({
  slug: "flightControlSurfaces",
  id: "492d14dd-d66d-4442-8220-ce50f656b1fa",
  name: {
    en: "Flight control surfaces",
  },
  description: {
    methodological: "Relate ailerons, elevators and rudders to changes in orientation rather than thrust.",
    frontend: {
      en: "Explain how movable control surfaces change aircraft orientation.",
    },
  },
});
