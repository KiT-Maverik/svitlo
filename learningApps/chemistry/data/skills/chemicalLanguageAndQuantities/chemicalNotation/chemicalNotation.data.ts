import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { chemicalFormulas_Skill_Data, elementSymbols_Skill_Data, empiricalFormulas_Skill_Data, inorganicNomenclature_Skill_Data, ionicCompoundFormulas_Skill_Data, molecularFormulas_Skill_Data, organicNomenclature_Skill_Data, oxidationStates_Skill_Data } from './skills';

export const chemicalNotation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "chemicalNotation",
  id: "44b3b95c-0c6e-47ac-946e-eb2ba200a3b6",
  name: {
    en: "Chemical Notation",
  },
  skills: {
    chemicalFormulas: chemicalFormulas_Skill_Data,
    elementSymbols: elementSymbols_Skill_Data,
    empiricalFormulas: empiricalFormulas_Skill_Data,
    inorganicNomenclature: inorganicNomenclature_Skill_Data,
    ionicCompoundFormulas: ionicCompoundFormulas_Skill_Data,
    molecularFormulas: molecularFormulas_Skill_Data,
    organicNomenclature: organicNomenclature_Skill_Data,
    oxidationStates: oxidationStates_Skill_Data,
  },
  description: {
    methodological: "Symbols and formulas must preserve elemental identity, proportions and charge while being read according to their convention.",
    frontend: {
      en: "Discover how chemical symbols and formulas communicate composition and charge.",
    },
  },
});
