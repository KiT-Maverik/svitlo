import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { ancientSaharanPastoralists_Skill_Data, earlyBantuSpeakingDispersals_Skill_Data, earlyWestAfricanUrbanCenters_Skill_Data, nokCulture_Skill_Data, saharanClimateChange_Skill_Data } from './skills';

export const saharaAndSubSaharanAfrica_SkillGroup_Data = buildSkillGroupConfig({
  slug: "saharaAndSubSaharanAfrica",
  id: "2050434f-3ac0-4400-8563-828fd54ff8b8",
  name: {
    en: "Сахара та землі на південь від неї",
  },
  skills: {
    ancientSaharanPastoralists: ancientSaharanPastoralists_Skill_Data,
    earlyBantuSpeakingDispersals: earlyBantuSpeakingDispersals_Skill_Data,
    earlyWestAfricanUrbanCenters: earlyWestAfricanUrbanCenters_Skill_Data,
    nokCulture: nokCulture_Skill_Data,
    saharanClimateChange: saharanClimateChange_Skill_Data,
  },
  description: {
    methodological: "Environmental change, diverse livelihoods, and local technologies shaped societies beyond the Nile states.",
    frontend: {
      en: "Explore early African cultures across the Sahara and farther south.",
    },
  },
});
