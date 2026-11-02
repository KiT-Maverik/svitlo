import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const calculateGravitationalPotentialEnergy_Skill_Data = buildSkillConfig({
  slug: "calculateGravitationalPotentialEnergy",
  id: "44abbee0-6cd7-4044-9a2b-47d9b1d9832e",
  name: {
    en: "Calculate gravitational potential energy",
  },
  description: {
    methodological: "Determine the change in a body's gravitational potential energy near Earth's surface from its mass, gravitational acceleration, and change in height, correctly accounting for the chosen reference level and units. This calculation assumes an approximately uniform gravitational field and differs from calculating elastic potential energy.",
    frontend: {
      en: "Calculate changes in gravitational potential energy from mass, gravity and height.",
    },
  },
});
