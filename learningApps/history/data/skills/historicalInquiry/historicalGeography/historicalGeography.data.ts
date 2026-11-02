import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { environmentOfAncientSocieties_Skill_Data, historicalMaps_Skill_Data, migrationAndSettlement_Skill_Data } from './skills';

export const historicalGeography_SkillGroup_Data = buildSkillGroupConfig({
  slug: "historicalGeography",
  id: "ddced799-3043-44f5-8045-9ddc8c0374dc",
  name: {
    en: "Простір минулого",
  },
  skills: {
    environmentOfAncientSocieties: environmentOfAncientSocieties_Skill_Data,
    historicalMaps: historicalMaps_Skill_Data,
    migrationAndSettlement: migrationAndSettlement_Skill_Data,
  },
  description: {
    methodological: "Landscapes, climate, distances, and routes inform reconstructions of settlement and exchange without assuming geography determines history.",
    frontend: {
      en: "Explore how places and routes shaped past societies without deciding their fate.",
    },
  },
});
