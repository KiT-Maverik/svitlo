import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { centralAndWesternEurope_SkillGroup_Data } from './centralAndWesternEurope/centralAndWesternEurope.data';
import { earlyMedievalEasternEurope_SkillGroup_Data } from './earlyMedievalEasternEurope/earlyMedievalEasternEurope.data';
import { northernAndBalticEurope_SkillGroup_Data } from './northernAndBalticEurope/northernAndBalticEurope.data';
import { northernBlackSeaRegion_SkillGroup_Data } from './northernBlackSeaRegion/northernBlackSeaRegion.data';

export const ancientEuropeBeyondMediterranean_SkillDomain_Data = buildSkillDomainConfig({
  slug: "ancientEuropeBeyondMediterranean",
  id: "397058c6-6268-4a12-b3d3-35e8248f66c1",
  name: {
    en: "Європа поза Середземномор'ям",
  },
  groups: {
    centralAndWesternEurope: centralAndWesternEurope_SkillGroup_Data,
    earlyMedievalEasternEurope: earlyMedievalEasternEurope_SkillGroup_Data,
    northernAndBalticEurope: northernAndBalticEurope_SkillGroup_Data,
    northernBlackSeaRegion: northernBlackSeaRegion_SkillGroup_Data,
  },
  description: {
    methodological: "Most European communities existed beyond the political frameworks of Greek poleis and Rome while sustaining diverse local and distant connections.",
    frontend: {
      en: "Discover ancient European societies beyond Greece and Rome.",
    },
  },
});
