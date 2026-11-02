import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { chemicalBonds_SkillGroup_Data } from './chemicalBonds/chemicalBonds.data';
import { interparticleInteractions_SkillGroup_Data } from './interparticleInteractions/interparticleInteractions.data';
import { molecularAndExtendedStructure_SkillGroup_Data } from './molecularAndExtendedStructure/molecularAndExtendedStructure.data';

export const bondingAndStructure_SkillDomain_Data = buildSkillDomainConfig({
  slug: "bondingAndStructure",
  id: "d2cd6136-612f-4c9a-8f63-0581db4243ac",
  name: {
    en: "Bonding and Structure",
  },
  groups: {
    chemicalBonds: chemicalBonds_SkillGroup_Data,
    interparticleInteractions: interparticleInteractions_SkillGroup_Data,
    molecularAndExtendedStructure: molecularAndExtendedStructure_SkillGroup_Data,
  },
  description: {
    methodological: "Chemical properties arise partly from how atoms and ions are connected and how neighboring particles interact. This domain distinguishes intraparticle bonds from interactions between particles and from bulk structural arrangements.",
    frontend: {
      en: "Discover how chemical bonds and attractions between particles shape material properties.",
    },
  },
});
