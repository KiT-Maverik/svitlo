import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { earlySteppeCultures_Skill_Data, greekCitiesOfBlackSea_Skill_Data, sarmatians_Skill_Data, scythianSocieties_Skill_Data } from './skills';

export const northernBlackSeaRegion_SkillGroup_Data = buildSkillGroupConfig({
  slug: "northernBlackSeaRegion",
  id: "c64aa0c2-a81c-4147-86f2-2ccdf4c564cb",
  name: {
    en: "Північне Причорномор'я",
  },
  skills: {
    earlySteppeCultures: earlySteppeCultures_Skill_Data,
    greekCitiesOfBlackSea: greekCitiesOfBlackSea_Skill_Data,
    sarmatians: sarmatians_Skill_Data,
    scythianSocieties: scythianSocieties_Skill_Data,
  },
  description: {
    methodological: "The steppe, forest-steppe, and coasts of today's Ukraine held diverse ancient populations without modern state identities being imposed on them.",
    frontend: {
      en: "Explore ancient societies in the northern Black Sea region.",
    },
  },
});
