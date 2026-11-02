import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { jomonCulture_Skill_Data, kofunPeriod_Skill_Data, yayoiCulture_Skill_Data } from './skills';

export const ancientJapan_SkillGroup_Data = buildSkillGroupConfig({
  slug: "ancientJapan",
  id: "db7670ec-8b18-41b9-b78d-47b961434f18",
  name: {
    en: "Японія",
  },
  skills: {
    jomonCulture: jomonCulture_Skill_Data,
    kofunPeriod: kofunPeriod_Skill_Data,
    yayoiCulture: yayoiCulture_Skill_Data,
  },
  description: {
    methodological: "Archaeological traditions from pottery to rice farming and burial mounds show uneven regional changes.",
    frontend: {
      en: "Discover the ancient cultures of the Japanese archipelago.",
    },
  },
});
