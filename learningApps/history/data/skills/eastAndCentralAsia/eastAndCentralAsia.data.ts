import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { ancientJapan_SkillGroup_Data } from './ancientJapan/ancientJapan.data';
import { ancientKorea_SkillGroup_Data } from './ancientKorea/ancientKorea.data';
import { earlyChina_SkillGroup_Data } from './earlyChina/earlyChina.data';
import { imperialChina_SkillGroup_Data } from './imperialChina/imperialChina.data';
import { innerAsia_SkillGroup_Data } from './innerAsia/innerAsia.data';

export const eastAndCentralAsia_SkillDomain_Data = buildSkillDomainConfig({
  slug: "eastAndCentralAsia",
  id: "c151bf39-0aba-4a40-b75f-40788f187631",
  name: {
    en: "Східна та Центральна Азія",
  },
  groups: {
    ancientJapan: ancientJapan_SkillGroup_Data,
    ancientKorea: ancientKorea_SkillGroup_Data,
    earlyChina: earlyChina_SkillGroup_Data,
    imperialChina: imperialChina_SkillGroup_Data,
    innerAsia: innerAsia_SkillGroup_Data,
  },
  description: {
    methodological: "China, Korea, Japan, and Inner Asian steppe regions show coexistence and interaction between settled and mobile societies.",
    frontend: {
      en: "Explore the diverse ancient societies of East and Central Asia.",
    },
  },
});
