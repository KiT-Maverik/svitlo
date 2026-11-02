import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishRotationAboutAnAxisFromMotionAlongACircle_Skill_Data, explainConservationOfAngularMomentum_Skill_Data, explainRotationalInertia_Skill_Data, explainTorque_Skill_Data } from './skills';

export const rotationalMotion_SkillGroup_Data = buildSkillGroupConfig({
  slug: "rotationalMotion",
  id: "a5d66a29-ba09-4f21-99af-091fee972aa9",
  name: {
    en: "Rotational Motion",
  },
  skills: {
    distinguishRotationAboutAnAxisFromMotionAlongACircle: distinguishRotationAboutAnAxisFromMotionAlongACircle_Skill_Data,
    explainConservationOfAngularMomentum: explainConservationOfAngularMomentum_Skill_Data,
    explainRotationalInertia: explainRotationalInertia_Skill_Data,
    explainTorque: explainTorque_Skill_Data,
  },
  description: {
    methodological: "Rotation involves torque, mass distribution, and inertial properties. Conservation of angular momentum describes a system's motion when there is no net external torque.",
    frontend: {
      en: "Explore how turning forces and mass distribution affect rotational motion.",
    },
  },
});
