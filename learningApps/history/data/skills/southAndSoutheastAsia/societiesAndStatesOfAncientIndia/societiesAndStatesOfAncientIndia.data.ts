import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { guptaKingdom_Skill_Data, mahajanapadas_Skill_Data, mauryanEmpire_Skill_Data, vedicSocieties_Skill_Data } from './skills';

export const societiesAndStatesOfAncientIndia_SkillGroup_Data = buildSkillGroupConfig({
  slug: "societiesAndStatesOfAncientIndia",
  id: "c26d62e2-f630-4279-a5e9-7c2bb237ff27",
  name: {
    en: "Суспільства та держави давньої Індії",
  },
  skills: {
    guptaKingdom: guptaKingdom_Skill_Data,
    mahajanapadas: mahajanapadas_Skill_Data,
    mauryanEmpire: mauryanEmpire_Skill_Data,
    vedicSocieties: vedicSocieties_Skill_Data,
  },
  description: {
    methodological: "After the Vedic period, regional kingdoms and larger empires arose with differing political systems.",
    frontend: {
      en: "Discover how states developed in ancient India.",
    },
  },
});
