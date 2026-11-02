import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { conductorsAndInsulators_SkillGroup_Data } from './conductorsAndInsulators/conductorsAndInsulators.data';
import { currentVoltageAndResistance_SkillGroup_Data } from './currentVoltageAndResistance/currentVoltageAndResistance.data';
import { electricAndMagneticFields_SkillGroup_Data } from './electricAndMagneticFields/electricAndMagneticFields.data';
import { electricChargesAndInteractions_SkillGroup_Data } from './electricChargesAndInteractions/electricChargesAndInteractions.data';
import { electricCircuits_SkillGroup_Data } from './electricCircuits/electricCircuits.data';
import { electromagnetsAndInduction_SkillGroup_Data } from './electromagnetsAndInduction/electromagnetsAndInduction.data';
import { magneticEffectsInPhysicalSystems_SkillGroup_Data } from './magneticEffectsInPhysicalSystems/magneticEffectsInPhysicalSystems.data';
import { magneticPropertiesAndInteractions_SkillGroup_Data } from './magneticPropertiesAndInteractions/magneticPropertiesAndInteractions.data';

export const electromagnetism_SkillDomain_Data = buildSkillDomainConfig({
  slug: "electromagnetism",
  id: "5ca8345e-cfc6-4753-afd0-0143ba112479",
  name: {
    en: "Electromagnetism",
  },
  groups: {
    conductorsAndInsulators: conductorsAndInsulators_SkillGroup_Data,
    currentVoltageAndResistance: currentVoltageAndResistance_SkillGroup_Data,
    electricAndMagneticFields: electricAndMagneticFields_SkillGroup_Data,
    electricChargesAndInteractions: electricChargesAndInteractions_SkillGroup_Data,
    electricCircuits: electricCircuits_SkillGroup_Data,
    electromagnetsAndInduction: electromagnetsAndInduction_SkillGroup_Data,
    magneticEffectsInPhysicalSystems: magneticEffectsInPhysicalSystems_SkillGroup_Data,
    magneticPropertiesAndInteractions: magneticPropertiesAndInteractions_SkillGroup_Data,
  },
  description: {
    methodological: "Electric charges, currents, and magnetic fields describe related interactions; electricity and magnetism share underlying principles but begin with different observations.",
    frontend: {
      en: "Explore how charges, electric currents and magnetic fields interact.",
    },
  },
});
