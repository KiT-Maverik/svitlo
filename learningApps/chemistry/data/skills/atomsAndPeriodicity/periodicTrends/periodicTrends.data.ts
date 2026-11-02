import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { atomicRadiusTrends_Skill_Data, electronAffinity_Skill_Data, electronegativity_Skill_Data, ionizationEnergy_Skill_Data } from './skills';

export const periodicTrends_SkillGroup_Data = buildSkillGroupConfig({
  slug: "periodicTrends",
  id: "83b84a45-c52f-45b3-bec0-76dec24f3599",
  name: {
    en: "Periodic Trends",
  },
  skills: {
    atomicRadiusTrends: atomicRadiusTrends_Skill_Data,
    electronAffinity: electronAffinity_Skill_Data,
    electronegativity: electronegativity_Skill_Data,
    ionizationEnergy: ionizationEnergy_Skill_Data,
  },
  description: {
    methodological: "Atomic size and electrostatic attraction influence recurring patterns and their important exceptions.",
    frontend: {
      en: "Explore trends in atomic size and attraction for electrons.",
    },
  },
});
