import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishABodysMassFromEarthsGravitationalForce_Skill_Data, explainEarthsGravitationalForceOnABody_Skill_Data, predictTheDirectionOfFalling_Skill_Data } from './skills';

export const gravity_SkillGroup_Data = buildSkillGroupConfig({
  slug: "gravity",
  id: "e150b34d-82de-4a8c-bf5e-3b3ef92cdc16",
  name: {
    en: "Gravity",
  },
  skills: {
    distinguishABodysMassFromEarthsGravitationalForce: distinguishABodysMassFromEarthsGravitationalForce_Skill_Data,
    explainEarthsGravitationalForceOnABody: explainEarthsGravitationalForceOnABody_Skill_Data,
    predictTheDirectionOfFalling: predictTheDirectionOfFalling_Skill_Data,
  },
  description: {
    methodological: "Bodies with mass interact gravitationally even without touching. Earth's gravity governs falling near its surface, and other celestial bodies also exert gravitational influence.",
    frontend: {
      en: "Explore gravity as an interaction between bodies with mass.",
    },
  },
});
