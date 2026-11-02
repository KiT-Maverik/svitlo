import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { confucianTradition_Skill_Data, daoistTraditions_Skill_Data, shangCulture_Skill_Data, springAndAutumnPeriod_Skill_Data, warringStatesPeriod_Skill_Data, zhouDynasty_Skill_Data } from './skills';

export const earlyChina_SkillGroup_Data = buildSkillGroupConfig({
  slug: "earlyChina",
  id: "6bdf71d4-1451-4391-9ff3-8858f7251b81",
  name: {
    en: "Ранній Китай",
  },
  skills: {
    confucianTradition: confucianTradition_Skill_Data,
    daoistTraditions: daoistTraditions_Skill_Data,
    shangCulture: shangCulture_Skill_Data,
    springAndAutumnPeriod: springAndAutumnPeriod_Skill_Data,
    warringStatesPeriod: warringStatesPeriod_Skill_Data,
    zhouDynasty: zhouDynasty_Skill_Data,
  },
  description: {
    methodological: "Bronze culture, ritual, and rival states shaped later institutions without requiring unchanged continuity.",
    frontend: {
      en: "Discover how early Chinese states and traditions developed.",
    },
  },
});
