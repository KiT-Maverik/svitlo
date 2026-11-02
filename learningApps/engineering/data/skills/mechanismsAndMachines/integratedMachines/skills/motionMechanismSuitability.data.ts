import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const motionMechanismSuitability_Skill_Data = buildSkillConfig({
  slug: "motionMechanismSuitability",
  id: "d3c1b15e-f25e-4c12-bc4b-e6b3ef5805dc",
  name: {
    en: "Motion-mechanism suitability",
  },
  description: {
    methodological: "Relate the output direction, movement pattern, displacement and force needs to feasible mechanisms and their operating limits.",
    frontend: {
      en: "Select mechanisms suited to a required direction and pattern of movement.",
    },
  },
});
