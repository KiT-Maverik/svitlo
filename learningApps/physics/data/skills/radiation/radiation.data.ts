import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { electromagneticRadiation_SkillGroup_Data } from './electromagneticRadiation/electromagneticRadiation.data';
import { radiationAndMatter_SkillGroup_Data } from './radiationAndMatter/radiationAndMatter.data';

export const radiation_SkillDomain_Data = buildSkillDomainConfig({
  slug: "radiation",
  id: "d6520f72-342a-4286-9f2e-5e45b70a3971",
  name: {
    en: "Radiation",
  },
  groups: {
    electromagneticRadiation: electromagneticRadiation_SkillGroup_Data,
    radiationAndMatter: radiationAndMatter_SkillGroup_Data,
  },
  description: {
    methodological: "Radiation describes energy transfer from a source through space, including invisible parts of the electromagnetic spectrum and their interaction with matter. Geometric image formation with light belongs to Optics.",
    frontend: {
      en: "Explore electromagnetic radiation and its interactions with matter.",
    },
  },
});
