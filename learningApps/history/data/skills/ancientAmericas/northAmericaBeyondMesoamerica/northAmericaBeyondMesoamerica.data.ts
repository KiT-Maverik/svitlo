import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { adenaAndHopewellTraditions_Skill_Data, ancientSouthwesternNorthAmerica_Skill_Data, povertyPoint_Skill_Data } from './skills';

export const northAmericaBeyondMesoamerica_SkillGroup_Data = buildSkillGroupConfig({
  slug: "northAmericaBeyondMesoamerica",
  id: "7594459d-1887-477f-9659-f02a0bd82e1a",
  name: {
    en: "Північна Америка поза Мезоамерикою",
  },
  skills: {
    adenaAndHopewellTraditions: adenaAndHopewellTraditions_Skill_Data,
    ancientSouthwesternNorthAmerica: ancientSouthwesternNorthAmerica_Skill_Data,
    povertyPoint: povertyPoint_Skill_Data,
  },
  description: {
    methodological: "River basins and arid regions had independent exchange networks, ritual spaces, and collective works.",
    frontend: {
      en: "Discover ancient societies of North America beyond Mesoamerica.",
    },
  },
});
