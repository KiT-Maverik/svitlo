import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { buildings_SkillGroup_Data } from './buildings/buildings.data';
import { civilWorks_SkillGroup_Data } from './civilWorks/civilWorks.data';
import { stabilityAndTesting_SkillGroup_Data } from './stabilityAndTesting/stabilityAndTesting.data';
import { structuralElements_SkillGroup_Data } from './structuralElements/structuralElements.data';

export const structuresAndConstruction_SkillDomain_Data = buildSkillDomainConfig({
  slug: "structuresAndConstruction",
  id: "80389a13-4d86-40a2-b177-43a2b21c4741",
  name: {
    en: "Structures and Construction",
  },
  groups: {
    buildings: buildings_SkillGroup_Data,
    civilWorks: civilWorks_SkillGroup_Data,
    stabilityAndTesting: stabilityAndTesting_SkillGroup_Data,
    structuralElements: structuralElements_SkillGroup_Data,
  },
  description: {
    methodological: "Load-bearing works transfer applied actions into suitable supports while satisfying functional, environmental and construction constraints. This domain treats the built solution rather than architectural style.",
    frontend: {
      en: "Explore how buildings, bridges and civil works safely carry loads.",
    },
  },
});
