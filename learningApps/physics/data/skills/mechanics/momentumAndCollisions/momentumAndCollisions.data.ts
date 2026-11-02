import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishElasticFromInelasticCollisions_Skill_Data, explainConservationOfLinearMomentum_Skill_Data, explainImpulse_Skill_Data, explainLinearMomentum_Skill_Data } from './skills';

export const momentumAndCollisions_SkillGroup_Data = buildSkillGroupConfig({
  slug: "momentumAndCollisions",
  id: "1d8aeab0-47a2-44b2-8254-77494f6288d1",
  name: {
    en: "Momentum and Collisions",
  },
  skills: {
    distinguishElasticFromInelasticCollisions: distinguishElasticFromInelasticCollisions_Skill_Data,
    explainConservationOfLinearMomentum: explainConservationOfLinearMomentum_Skill_Data,
    explainImpulse: explainImpulse_Skill_Data,
    explainLinearMomentum: explainLinearMomentum_Skill_Data,
  },
  description: {
    methodological: "Momentum characterizes a body's motion, while collisions demonstrate momentum transfer and change. In the absence of external impulse, the total momentum of a system is conserved regardless of the type of collision.",
    frontend: {
      en: "Discover how moving bodies exchange momentum during collisions.",
    },
  },
});
