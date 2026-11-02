import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { caralAndEarlyAndeanCenters_Skill_Data, chavinCulture_Skill_Data, mocheCulture_Skill_Data, nazcaCulture_Skill_Data } from './skills';

export const ancientAndes_SkillGroup_Data = buildSkillGroupConfig({
  slug: "ancientAndes",
  id: "80ecf86d-411d-45ad-a562-3147d4346bac",
  name: {
    en: "Анди",
  },
  skills: {
    caralAndEarlyAndeanCenters: caralAndEarlyAndeanCenters_Skill_Data,
    chavinCulture: chavinCulture_Skill_Data,
    mocheCulture: mocheCulture_Skill_Data,
    nazcaCulture: nazcaCulture_Skill_Data,
  },
  description: {
    methodological: "Coastal valleys and highlands supported diverse farming, cities, and social coordination.",
    frontend: {
      en: "Discover the societies that developed in the Andes.",
    },
  },
});
