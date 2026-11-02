import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { caribbeanIslandSettlement_Skill_Data, earlyAmazonianSocieties_Skill_Data, tropicalSouthAmericanFarming_Skill_Data } from './skills';

export const amazonAndCaribbean_SkillGroup_Data = buildSkillGroupConfig({
  slug: "amazonAndCaribbean",
  id: "b71fa763-19d5-423f-b785-85046c9dbf4f",
  name: {
    en: "Амазонія та Карибський басейн",
  },
  skills: {
    caribbeanIslandSettlement: caribbeanIslandSettlement_Skill_Data,
    earlyAmazonianSocieties: earlyAmazonianSocieties_Skill_Data,
    tropicalSouthAmericanFarming: tropicalSouthAmericanFarming_Skill_Data,
  },
  description: {
    methodological: "River and island environments supported diverse cultures that cannot be judged only by the presence of stone cities.",
    frontend: {
      en: "Discover ancient Amazonian and Caribbean communities.",
    },
  },
});
