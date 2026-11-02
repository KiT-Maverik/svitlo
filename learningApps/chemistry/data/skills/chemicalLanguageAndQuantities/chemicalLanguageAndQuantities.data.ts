import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { amountOfSubstance_SkillGroup_Data } from './amountOfSubstance/amountOfSubstance.data';
import { chemicalNotation_SkillGroup_Data } from './chemicalNotation/chemicalNotation.data';
import { reactionEquations_SkillGroup_Data } from './reactionEquations/reactionEquations.data';

export const chemicalLanguageAndQuantities_SkillDomain_Data = buildSkillDomainConfig({
  slug: "chemicalLanguageAndQuantities",
  id: "b53c9b92-9cdb-46fa-9ec5-e4c86e6cfaa6",
  name: {
    en: "Chemical Language and Quantities",
  },
  groups: {
    amountOfSubstance: amountOfSubstance_SkillGroup_Data,
    chemicalNotation: chemicalNotation_SkillGroup_Data,
    reactionEquations: reactionEquations_SkillGroup_Data,
  },
  description: {
    methodological: "Chemists represent composition and transformation with conventional symbols and use amounts to connect microscopic entities to measurable samples. This domain covers representational and quantitative relationships, not specific reaction mechanisms.",
    frontend: {
      en: "Learn the symbols, formulas and calculations chemists use to describe substances and reactions.",
    },
  },
});
