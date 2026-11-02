import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { coordinationCompounds_Skill_Data, hydroxides_Skill_Data, minerals_Skill_Data, oxides_Skill_Data, salts_Skill_Data } from './skills';

export const inorganicCompounds_SkillGroup_Data = buildSkillGroupConfig({
  slug: "inorganicCompounds",
  id: "47d12c86-5c60-4241-aada-295be3553275",
  name: {
    en: "Inorganic Compounds",
  },
  skills: {
    coordinationCompounds: coordinationCompounds_Skill_Data,
    hydroxides: hydroxides_Skill_Data,
    minerals: minerals_Skill_Data,
    oxides: oxides_Skill_Data,
    salts: salts_Skill_Data,
  },
  description: {
    methodological: "Inorganic formulas and classes describe varied substances whose behavior is not determined by a class name alone.",
    frontend: {
      en: "Recognize broad categories of inorganic compounds without assuming all members act alike.",
    },
  },
});
