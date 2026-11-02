import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { acoustics_SkillGroup_Data } from './acoustics/acoustics.data';
import { oscillations_SkillGroup_Data } from './oscillations/oscillations.data';
import { wavePhenomena_SkillGroup_Data } from './wavePhenomena/wavePhenomena.data';
import { waveProperties_SkillGroup_Data } from './waveProperties/waveProperties.data';

export const waves_SkillDomain_Data = buildSkillDomainConfig({
  slug: "waves",
  id: "f2aa9a7f-36ce-4add-8f7d-dd2e0973b159",
  name: {
    en: "Waves",
  },
  groups: {
    acoustics: acoustics_SkillGroup_Data,
    oscillations: oscillations_SkillGroup_Data,
    wavePhenomena: wavePhenomena_SkillGroup_Data,
    waveProperties: waveProperties_SkillGroup_Data,
  },
  description: {
    methodological: "Oscillations produce recurring disturbances that can propagate through water, air, and other media. Sound is one manifestation, while wave patterns are visible on the surface of water.",
    frontend: {
      en: "Explore vibrations, sound and the ways wave disturbances travel and interact.",
    },
  },
});
