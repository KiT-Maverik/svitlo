import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { atomicStructure_SkillGroup_Data } from './atomicStructure/atomicStructure.data';
import { electronicStructure_SkillGroup_Data } from './electronicStructure/electronicStructure.data';
import { nuclearChemistry_SkillGroup_Data } from './nuclearChemistry/nuclearChemistry.data';
import { periodicOrganization_SkillGroup_Data } from './periodicOrganization/periodicOrganization.data';
import { periodicTrends_SkillGroup_Data } from './periodicTrends/periodicTrends.data';

export const atomsAndPeriodicity_SkillDomain_Data = buildSkillDomainConfig({
  slug: "atomsAndPeriodicity",
  id: "21257e92-4a8b-4ca2-a38a-ec1d1ff31110",
  name: {
    en: "Atoms and Periodicity",
  },
  groups: {
    atomicStructure: atomicStructure_SkillGroup_Data,
    electronicStructure: electronicStructure_SkillGroup_Data,
    nuclearChemistry: nuclearChemistry_SkillGroup_Data,
    periodicOrganization: periodicOrganization_SkillGroup_Data,
    periodicTrends: periodicTrends_SkillGroup_Data,
  },
  description: {
    methodological: "The organization and electronic structure of atoms underpin elemental identity, isotopes, ions and recurring chemical behavior. This domain describes atomic constituents and trends; bond formation is treated separately.",
    frontend: {
      en: "Explore the particles inside atoms and the patterns connecting chemical elements.",
    },
  },
});
