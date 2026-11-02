import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { limitingReactants_Skill_Data, massMoleConversion_Skill_Data, molarMass_Skill_Data, reactionYield_Skill_Data, stoichiometricRatios_Skill_Data, theMole_Skill_Data } from './skills';

export const amountOfSubstance_SkillGroup_Data = buildSkillGroupConfig({
  slug: "amountOfSubstance",
  id: "730aaa3e-c1de-4895-ba78-14f78184e74b",
  name: {
    en: "Amount of Substance",
  },
  skills: {
    limitingReactants: limitingReactants_Skill_Data,
    massMoleConversion: massMoleConversion_Skill_Data,
    molarMass: molarMass_Skill_Data,
    reactionYield: reactionYield_Skill_Data,
    stoichiometricRatios: stoichiometricRatios_Skill_Data,
    theMole: theMole_Skill_Data,
  },
  description: {
    methodological: "The mole and associated quantities link atom-scale counting to bulk mass, volume and reaction proportions.",
    frontend: {
      en: "Connect numbers of particles with measurable masses and reaction amounts.",
    },
  },
});
