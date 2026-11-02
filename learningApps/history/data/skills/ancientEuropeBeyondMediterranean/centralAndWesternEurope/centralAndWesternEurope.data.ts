import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { ancientGermanicCommunities_Skill_Data, britainBeforeAndUnderRome_Skill_Data, celticIronAgeCultures_Skill_Data, europeanBronzeAge_Skill_Data } from './skills';

export const centralAndWesternEurope_SkillGroup_Data = buildSkillGroupConfig({
  slug: "centralAndWesternEurope",
  id: "0fbaa949-a1c8-44cd-8f95-a40687821dc1",
  name: {
    en: "Центральна та Західна Європа",
  },
  skills: {
    ancientGermanicCommunities: ancientGermanicCommunities_Skill_Data,
    britainBeforeAndUnderRome: britainBeforeAndUnderRome_Skill_Data,
    celticIronAgeCultures: celticIronAgeCultures_Skill_Data,
    europeanBronzeAge: europeanBronzeAge_Skill_Data,
  },
  description: {
    methodological: "Study metallurgy, settlements, and confederations primarily through archaeological evidence and uneven external descriptions.",
    frontend: {
      en: "Explore Bronze and Iron Age cultures in Central and Western Europe.",
    },
  },
});
