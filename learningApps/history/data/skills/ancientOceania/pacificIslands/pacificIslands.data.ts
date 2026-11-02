import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { austronesianExpansion_Skill_Data, earlyWesternPolynesianSettlement_Skill_Data, lapitaCulture_Skill_Data, oceanicNavigation_Skill_Data } from './skills';

export const pacificIslands_SkillGroup_Data = buildSkillGroupConfig({
  slug: "pacificIslands",
  id: "5c26ca3e-28b8-435c-abc0-8959cf1af92f",
  name: {
    en: "Острівний Тихий океан",
  },
  skills: {
    austronesianExpansion: austronesianExpansion_Skill_Data,
    earlyWesternPolynesianSettlement: earlyWesternPolynesianSettlement_Skill_Data,
    lapitaCulture: lapitaCulture_Skill_Data,
    oceanicNavigation: oceanicNavigation_Skill_Data,
  },
  description: {
    methodological: "Seafaring societies progressively settled distant archipelagos, transporting languages, crops, animals, and navigation knowledge.",
    frontend: {
      en: "Explore how people traveled among distant Pacific islands.",
    },
  },
});
