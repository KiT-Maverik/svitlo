import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { elementFamiliesInContext_SkillGroup_Data } from './elementFamiliesInContext/elementFamiliesInContext.data';
import { inorganicCompounds_SkillGroup_Data } from './inorganicCompounds/inorganicCompounds.data';
import { ionsInWater_SkillGroup_Data } from './ionsInWater/ionsInWater.data';

export const inorganicChemistry_SkillDomain_Data = buildSkillDomainConfig({
  slug: "inorganicChemistry",
  id: "ad77a99a-a6b3-4db6-8d2a-4a5c870d3a81",
  name: {
    en: "Inorganic Chemistry",
  },
  groups: {
    elementFamiliesInContext: elementFamiliesInContext_SkillGroup_Data,
    inorganicCompounds: inorganicCompounds_SkillGroup_Data,
    ionsInWater: ionsInWater_SkillGroup_Data,
  },
  description: {
    methodological: "The chemistry of elements and non-carbon-centered substance families provides a systematic account of familiar materials and dissolved ions. Organic chemistry handles carbon-based families in greater detail.",
    frontend: {
      en: "Explore the properties and behavior of elements, inorganic compounds and dissolved ions.",
    },
  },
});
