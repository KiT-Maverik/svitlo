import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { delineateADrainageBasinFromTerrain_Skill_Data, identifyTheMainPartsOfARiverNetwork_Skill_Data } from './skills';

export const riversAndDrainageBasins_SkillGroup_Data = buildSkillGroupConfig({
  slug: "riversAndDrainageBasins",
  id: "da7661ab-8f47-4f14-ae2f-cb1793b3c081",
  name: {
    en: "Rivers and Drainage Basins",
  },
  skills: {
    delineateADrainageBasinFromTerrain: delineateADrainageBasinFromTerrain_Skill_Data,
    identifyTheMainPartsOfARiverNetwork: identifyTheMainPartsOfARiverNetwork_Skill_Data,
  },
  description: {
    methodological: "Flowing water links sources, tributaries and outlets into networks, while topography governs the surface catchment of a river. Describing different types of water bodies as objects belongs to Geographic Objects.",
    frontend: {
      en: "Discover how streams and rivers connect into drainage networks.",
    },
  },
});
