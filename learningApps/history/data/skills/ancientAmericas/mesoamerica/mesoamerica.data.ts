import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { earlyMayaCities_Skill_Data, mayaWriting_Skill_Data, mesoamericanCalendars_Skill_Data, olmecCenters_Skill_Data, teotihuacan_Skill_Data } from './skills';

export const mesoamerica_SkillGroup_Data = buildSkillGroupConfig({
  slug: "mesoamerica",
  id: "dd189fec-807f-47ae-b575-3c8dfa34ae53",
  name: {
    en: "Мезоамерика",
  },
  skills: {
    earlyMayaCities: earlyMayaCities_Skill_Data,
    mayaWriting: mayaWriting_Skill_Data,
    mesoamericanCalendars: mesoamericanCalendars_Skill_Data,
    olmecCenters: olmecCenters_Skill_Data,
    teotihuacan: teotihuacan_Skill_Data,
  },
  description: {
    methodological: "Independent urban centers, monumental ritual spaces, writing, and polities developed before European colonization.",
    frontend: {
      en: "Explore the ancient cities and cultures of Mesoamerica.",
    },
  },
});
