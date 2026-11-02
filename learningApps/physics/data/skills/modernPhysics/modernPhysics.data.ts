import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { atomsAndQuantumPhenomena_SkillGroup_Data } from './atomsAndQuantumPhenomena/atomsAndQuantumPhenomena.data';
import { nuclearPhenomena_SkillGroup_Data } from './nuclearPhenomena/nuclearPhenomena.data';
import { relativity_SkillGroup_Data } from './relativity/relativity.data';

export const modernPhysics_SkillDomain_Data = buildSkillDomainConfig({
  slug: "modernPhysics",
  id: "36e539f1-2f2a-4874-b918-49cefddd6bac",
  name: {
    en: "Modern Physics",
  },
  groups: {
    atomsAndQuantumPhenomena: atomsAndQuantumPhenomena_SkillGroup_Data,
    nuclearPhenomena: nuclearPhenomena_SkillGroup_Data,
    relativity: relativity_SkillGroup_Data,
  },
  description: {
    methodological: "Models of atoms, quantum and nuclear phenomena, and spacetime explain observations not covered by classical physics alone. Younger children can encounter the concepts without mathematical formalism.",
    frontend: {
      en: "Explore quantum phenomena, nuclear changes and the physics of spacetime.",
    },
  },
});
