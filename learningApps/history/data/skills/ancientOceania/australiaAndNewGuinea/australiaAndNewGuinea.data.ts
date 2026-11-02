import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { ancientAboriginalAustralianSocieties_Skill_Data, australianRockArt_Skill_Data, earlyNewGuineaFarming_Skill_Data, peoplingOfSahul_Skill_Data } from './skills';

export const australiaAndNewGuinea_SkillGroup_Data = buildSkillGroupConfig({
  slug: "australiaAndNewGuinea",
  id: "789a7c3c-8525-43fb-827f-1834d88ab398",
  name: {
    en: "Австралія та Нова Гвінея",
  },
  skills: {
    ancientAboriginalAustralianSocieties: ancientAboriginalAustralianSocieties_Skill_Data,
    australianRockArt: australianRockArt_Skill_Data,
    earlyNewGuineaFarming: earlyNewGuineaFarming_Skill_Data,
    peoplingOfSahul: peoplingOfSahul_Skill_Data,
  },
  description: {
    methodological: "Archaeology and living cultural traditions attest to long human presence in the former Sahul landmass.",
    frontend: {
      en: "Discover the ancient communities of Australia and New Guinea.",
    },
  },
});
