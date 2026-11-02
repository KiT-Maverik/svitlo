import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { australiaAndNewGuinea_SkillGroup_Data } from './australiaAndNewGuinea/australiaAndNewGuinea.data';
import { pacificIslands_SkillGroup_Data } from './pacificIslands/pacificIslands.data';

export const ancientOceania_SkillDomain_Data = buildSkillDomainConfig({
  slug: "ancientOceania",
  id: "83bcaecb-a01b-450c-9e1e-540a4c4f5b12",
  name: {
    en: "Океанія",
  },
  groups: {
    australiaAndNewGuinea: australiaAndNewGuinea_SkillGroup_Data,
    pacificIslands: pacificIslands_SkillGroup_Data,
  },
  description: {
    methodological: "The settlement of Australia and Pacific islands occurred through successive waves over a long period and required extensive environmental and navigation knowledge.",
    frontend: {
      en: "Explore how ancient people reached and lived across Oceania.",
    },
  },
});
