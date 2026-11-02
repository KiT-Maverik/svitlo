import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { chemicalEnergetics_SkillGroup_Data } from './chemicalEnergetics/chemicalEnergetics.data';
import { chemicalEquilibrium_SkillGroup_Data } from './chemicalEquilibrium/chemicalEquilibrium.data';
import { reactionRates_SkillGroup_Data } from './reactionRates/reactionRates.data';

export const energyRatesAndEquilibrium_SkillDomain_Data = buildSkillDomainConfig({
  slug: "energyRatesAndEquilibrium",
  id: "9a267d93-82af-48cb-a1f7-1c9637c04826",
  name: {
    en: "Energy, Rates and Equilibrium",
  },
  groups: {
    chemicalEnergetics: chemicalEnergetics_SkillGroup_Data,
    chemicalEquilibrium: chemicalEquilibrium_SkillGroup_Data,
    reactionRates: reactionRates_SkillGroup_Data,
  },
  description: {
    methodological: "Chemical systems exchange energy, evolve at finite rates and may approach dynamic equilibrium. These are related but distinct questions: whether change is favorable, how quickly it occurs and what composition persists.",
    frontend: {
      en: "Explore energy changes, reaction speeds and the balance between forward and reverse reactions.",
    },
  },
});
