import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareMotionOnDifferentSurfaces_Skill_Data, explainTheRoleOfFrictionInStopping_Skill_Data, predictTheEffectOfForceDirection_Skill_Data, recognizePullingForces_Skill_Data, recognizePushingForces_Skill_Data } from './skills';

export const contactForcesAndFriction_SkillGroup_Data = buildSkillGroupConfig({
  slug: "contactForcesAndFriction",
  id: "47da74b7-4574-4a75-9700-4cee1f608ba3",
  name: {
    en: "Contact Forces and Friction",
  },
  skills: {
    compareMotionOnDifferentSurfaces: compareMotionOnDifferentSurfaces_Skill_Data,
    explainTheRoleOfFrictionInStopping: explainTheRoleOfFrictionInStopping_Skill_Data,
    predictTheEffectOfForceDirection: predictTheEffectOfForceDirection_Skill_Data,
    recognizePullingForces: recognizePullingForces_Skill_Data,
    recognizePushingForces: recognizePushingForces_Skill_Data,
  },
  description: {
    methodological: "Contact can produce pushing, pulling, and friction; the direction of interaction and surface properties affect motion.",
    frontend: {
      en: "Explore how pushing, pulling and friction affect contacting objects.",
    },
  },
});
