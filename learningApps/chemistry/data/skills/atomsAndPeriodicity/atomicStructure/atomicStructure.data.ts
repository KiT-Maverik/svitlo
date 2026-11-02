import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { atomicMass_Skill_Data, electronsAndCharge_Skill_Data, neutronsAndIsotopes_Skill_Data, protonsAndAtomicNumber_Skill_Data } from './skills';

export const atomicStructure_SkillGroup_Data = buildSkillGroupConfig({
  slug: "atomicStructure",
  id: "1af2e5a2-0b7d-40b2-a822-b0aee201a4c5",
  name: {
    en: "Atomic Structure",
  },
  skills: {
    atomicMass: atomicMass_Skill_Data,
    electronsAndCharge: electronsAndCharge_Skill_Data,
    neutronsAndIsotopes: neutronsAndIsotopes_Skill_Data,
    protonsAndAtomicNumber: protonsAndAtomicNumber_Skill_Data,
  },
  description: {
    methodological: "Chemical element identity is determined by proton number; other atomic characteristics vary independently.",
    frontend: {
      en: "Learn what determines an element's identity and how atoms of the same element can differ.",
    },
  },
});
