import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { functionalArchitecture_SkillGroup_Data } from './functionalArchitecture/functionalArchitecture.data';
import { interfacesAndInterdependencies_SkillGroup_Data } from './interfacesAndInterdependencies/interfacesAndInterdependencies.data';
import { reliabilityAndMaintenance_SkillGroup_Data } from './reliabilityAndMaintenance/reliabilityAndMaintenance.data';

export const systemsEngineering_SkillDomain_Data = buildSkillDomainConfig({
  slug: "systemsEngineering",
  id: "5f17c610-3f02-41b7-a8c3-f9a053045806",
  name: {
    en: "Systems Engineering",
  },
  groups: {
    functionalArchitecture: functionalArchitecture_SkillGroup_Data,
    interfacesAndInterdependencies: interfacesAndInterdependencies_SkillGroup_Data,
    reliabilityAndMaintenance: reliabilityAndMaintenance_SkillGroup_Data,
  },
  description: {
    methodological: "An engineered system is defined by coordinated functions and exchanges, not just a collection of parts. This domain addresses architecture, interfaces, dependencies, reliability and the consequences of faults.",
    frontend: {
      en: "Explore how components cooperate in complex systems and what happens when they fail.",
    },
  },
});
