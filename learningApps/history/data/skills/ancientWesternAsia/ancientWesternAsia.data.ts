import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { anatolia_SkillGroup_Data } from './anatolia/anatolia.data';
import { ancientIranianStates_SkillGroup_Data } from './ancientIranianStates/ancientIranianStates.data';
import { ancientLevant_SkillGroup_Data } from './ancientLevant/ancientLevant.data';
import { ancientSouthArabia_SkillGroup_Data } from './ancientSouthArabia/ancientSouthArabia.data';
import { mesopotamia_SkillGroup_Data } from './mesopotamia/mesopotamia.data';

export const ancientWesternAsia_SkillDomain_Data = buildSkillDomainConfig({
  slug: "ancientWesternAsia",
  id: "ff530e6e-024d-4a8c-9a16-3d0436cc9036",
  name: {
    en: "Західна Азія",
  },
  groups: {
    anatolia: anatolia_SkillGroup_Data,
    ancientIranianStates: ancientIranianStates_SkillGroup_Data,
    ancientLevant: ancientLevant_SkillGroup_Data,
    ancientSouthArabia: ancientSouthArabia_SkillGroup_Data,
    mesopotamia: mesopotamia_SkillGroup_Data,
  },
  description: {
    methodological: "Early cities and states in Mesopotamia, the Levant, Anatolia, Iran, and Arabia developed through local environments and enduring trade, political, and cultural contact.",
    frontend: {
      en: "Explore the diverse ancient societies of Western Asia.",
    },
  },
});
