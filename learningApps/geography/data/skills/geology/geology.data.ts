import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { earthquakesAndVolcanism_SkillGroup_Data } from './earthquakesAndVolcanism/earthquakesAndVolcanism.data';
import { earthsInteriorAndPlateTectonics_SkillGroup_Data } from './earthsInteriorAndPlateTectonics/earthsInteriorAndPlateTectonics.data';
import { geologicalTimeAndEvidence_SkillGroup_Data } from './geologicalTimeAndEvidence/geologicalTimeAndEvidence.data';
import { mineralDeposits_SkillGroup_Data } from './mineralDeposits/mineralDeposits.data';
import { mineralsAndTheirProperties_SkillGroup_Data } from './mineralsAndTheirProperties/mineralsAndTheirProperties.data';
import { rocksAndTheRockCycle_SkillGroup_Data } from './rocksAndTheRockCycle/rocksAndTheRockCycle.data';

export const geology_SkillDomain_Data = buildSkillDomainConfig({
  slug: "geology",
  id: "3d68dee0-0a19-4391-bcec-059cd8b60e7a",
  name: {
    en: "Geology",
  },
  groups: {
    earthquakesAndVolcanism: earthquakesAndVolcanism_SkillGroup_Data,
    earthsInteriorAndPlateTectonics: earthsInteriorAndPlateTectonics_SkillGroup_Data,
    geologicalTimeAndEvidence: geologicalTimeAndEvidence_SkillGroup_Data,
    mineralDeposits: mineralDeposits_SkillGroup_Data,
    mineralsAndTheirProperties: mineralsAndTheirProperties_SkillGroup_Data,
    rocksAndTheRockCycle: rocksAndTheRockCycle_SkillGroup_Data,
  },
  description: {
    methodological: "Minerals and rocks, Earth's internal structure, tectonic activity, geological evidence and mineral deposits reveal the solid planet's origins and evolution through deep time. Its focus is recognizing materials, processes and spatial evidence, distinct from describing everyday terrain or individual surface features.",
    frontend: {
      en: "Discover what rocks and minerals reveal about Earth's structure, history and resources.",
    },
  },
});
