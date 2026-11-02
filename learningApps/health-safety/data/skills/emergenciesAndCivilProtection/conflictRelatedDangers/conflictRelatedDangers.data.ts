import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { recognizeExplosiveOrdnanceRisk_Skill_Data, recognizeHazardsInDamagedBuildings_Skill_Data, respondToAnImmediateAttack_Skill_Data, respondToASuspectedExplosiveObject_Skill_Data, respondToAttackWarnings_Skill_Data } from './skills';

export const conflictRelatedDangers_SkillGroup_Data = buildSkillGroupConfig({
  slug: "conflictRelatedDangers",
  id: "82adb658-f786-4948-ae59-6e7a333a0ffe",
  name: {
    en: "Conflict-Related Dangers",
  },
  skills: {
    recognizeExplosiveOrdnanceRisk: recognizeExplosiveOrdnanceRisk_Skill_Data,
    recognizeHazardsInDamagedBuildings: recognizeHazardsInDamagedBuildings_Skill_Data,
    respondToAnImmediateAttack: respondToAnImmediateAttack_Skill_Data,
    respondToASuspectedExplosiveObject: respondToASuspectedExplosiveObject_Skill_Data,
    respondToAttackWarnings: respondToAttackWarnings_Skill_Data,
  },
  description: {
    methodological: "Armed conflict can produce immediate threats and leave dangerous remnants; civil protection centres on avoidance, shelter, and reporting rather than handling weapons.",
    frontend: {
      en: "Explore ways to protect civilians from conflict-related threats.",
    },
  },
});
