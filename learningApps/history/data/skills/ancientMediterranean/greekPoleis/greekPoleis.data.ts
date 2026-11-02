import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { athenianDemocracy_Skill_Data, grecoPersianWars_Skill_Data, greekColonization_Skill_Data, greekPolis_Skill_Data, peloponnesianWar_Skill_Data, spartanSystem_Skill_Data } from './skills';

export const greekPoleis_SkillGroup_Data = buildSkillGroupConfig({
  slug: "greekPoleis",
  id: "1e05f5d6-12d6-4c51-bb52-8e99b0cf3bfe",
  name: {
    en: "Грецькі поліси",
  },
  skills: {
    athenianDemocracy: athenianDemocracy_Skill_Data,
    grecoPersianWars: grecoPersianWars_Skill_Data,
    greekColonization: greekColonization_Skill_Data,
    greekPolis: greekPolis_Skill_Data,
    peloponnesianWar: peloponnesianWar_Skill_Data,
    spartanSystem: spartanSystem_Skill_Data,
  },
  description: {
    methodological: "Self-governing citizen communities varied in political institutions, warfare, and who possessed political rights.",
    frontend: {
      en: "Compare how different Greek city-states were governed.",
    },
  },
});
