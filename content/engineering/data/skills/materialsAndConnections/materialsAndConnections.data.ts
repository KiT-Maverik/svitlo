import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { jointsAndFasteners_SkillGroup_Data } from './jointsAndFasteners/jointsAndFasteners.data';
import { materialSelection_SkillGroup_Data } from './materialSelection/materialSelection.data';
import { surfacesAndFit_SkillGroup_Data } from './surfacesAndFit/surfacesAndFit.data';

export const materialsAndConnections_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'materialsAndConnections',
  id: '8a847ef2-5004-4773-b074-50146f9d1b34',
  name: {
    en: 'Materials and Connections',
  },
  groups: {
    jointsAndFasteners: jointsAndFasteners_SkillGroup_Data,
    materialSelection: materialSelection_SkillGroup_Data,
    surfacesAndFit: surfacesAndFit_SkillGroup_Data,
  },
  description: {
    methodological:
      'Material choice and the quality of interfaces determine whether parts carry loads, resist their environment, assemble correctly and remain usable. This domain focuses on technical suitability rather than the chemistry of substances.',
    frontend: {
      en: "Learn to choose materials and joining methods suited to a product's conditions.",
    },
  },
});
