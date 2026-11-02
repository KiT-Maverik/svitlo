import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { culturalContactsWithIndia_Skill_Data, dongSonCulture_Skill_Data, earlyIslandSoutheastAsianCultures_Skill_Data, earlySoutheastAsianFarming_Skill_Data, earlySoutheastAsianStates_Skill_Data, maritimeTradeOfSoutheastAsia_Skill_Data } from './skills';

export const ancientSoutheastAsia_SkillGroup_Data = buildSkillGroupConfig({
  slug: "ancientSoutheastAsia",
  id: "ee7d8586-eba9-48a9-84d7-d46a4a4b987a",
  name: {
    en: "Південно-Східна Азія",
  },
  skills: {
    culturalContactsWithIndia: culturalContactsWithIndia_Skill_Data,
    dongSonCulture: dongSonCulture_Skill_Data,
    earlyIslandSoutheastAsianCultures: earlyIslandSoutheastAsianCultures_Skill_Data,
    earlySoutheastAsianFarming: earlySoutheastAsianFarming_Skill_Data,
    earlySoutheastAsianStates: earlySoutheastAsianStates_Skill_Data,
    maritimeTradeOfSoutheastAsia: maritimeTradeOfSoutheastAsia_Skill_Data,
  },
  description: {
    methodological: "River valleys, islands, and ports exchanged ideas with India and China while retaining local traditions.",
    frontend: {
      en: "Explore early Southeast Asian societies and maritime links.",
    },
  },
});
