import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { geographicLaborMobility_Skill_Data, jobSearchAndMatching_Skill_Data, laborMarketDiscrimination_Skill_Data, occupationalMobility_Skill_Data } from './skills';

export const employmentAndMobility_SkillGroup_Data = buildSkillGroupConfig({
  slug: "employmentAndMobility",
  id: "b02d11b1-e6df-413d-ac0b-337df2f8a497",
  name: {
    en: "Працевлаштування та мобільність",
  },
  skills: {
    geographicLaborMobility: geographicLaborMobility_Skill_Data,
    jobSearchAndMatching: jobSearchAndMatching_Skill_Data,
    laborMarketDiscrimination: laborMarketDiscrimination_Skill_Data,
    occupationalMobility: occupationalMobility_Skill_Data,
  },
  description: {
    methodological: "Job searches and occupational changes are constrained by information, location, and qualifications.",
    frontend: {
      en: "Discover what helps or prevents people from finding or changing jobs.",
    },
  },
});
