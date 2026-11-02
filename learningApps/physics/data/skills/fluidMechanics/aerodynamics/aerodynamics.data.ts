import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainAerodynamicLift_Skill_Data, explainTheOriginOfAirResistanceDuringMotion_Skill_Data, predictTheEffectOfShapeOnMotionThroughAir_Skill_Data } from './skills';

export const aerodynamics_SkillGroup_Data = buildSkillGroupConfig({
  slug: "aerodynamics",
  id: "f0f0c450-1ed7-4292-ade8-6f0186e7648c",
  name: {
    en: "Aerodynamics",
  },
  skills: {
    explainAerodynamicLift: explainAerodynamicLift_Skill_Data,
    explainTheOriginOfAirResistanceDuringMotion: explainTheOriginOfAirResistanceDuringMotion_Skill_Data,
    predictTheEffectOfShapeOnMotionThroughAir: predictTheEffectOfShapeOnMotionThroughAir_Skill_Data,
  },
  description: {
    methodological: "Air exerts drag on moving bodies; shape and relative speed affect the interaction. Building aircraft or designing hulls are Engineering applications.",
    frontend: {
      en: "Discover how air influences bodies moving through it.",
    },
  },
});
