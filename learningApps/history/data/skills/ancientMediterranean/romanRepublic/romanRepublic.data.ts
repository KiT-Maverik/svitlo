import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { crisisOfRomanRepublic_Skill_Data, earlyRomanCommunities_Skill_Data, patricianPlebeianConflict_Skill_Data, punicWars_Skill_Data, romanRepublicanInstitutions_Skill_Data } from './skills';

export const romanRepublic_SkillGroup_Data = buildSkillGroupConfig({
  slug: "romanRepublic",
  id: "54625705-7687-4170-8ff2-45c99bdf217b",
  name: {
    en: "Римська республіка",
  },
  skills: {
    crisisOfRomanRepublic: crisisOfRomanRepublic_Skill_Data,
    earlyRomanCommunities: earlyRomanCommunities_Skill_Data,
    patricianPlebeianConflict: patricianPlebeianConflict_Skill_Data,
    punicWars: punicWars_Skill_Data,
    romanRepublicanInstitutions: romanRepublicanInstitutions_Skill_Data,
  },
  description: {
    methodological: "Conquests and social conflicts reshaped republican institutions and helped produce concentrated individual rule.",
    frontend: {
      en: "Discover how Rome's republic grew and changed.",
    },
  },
});
