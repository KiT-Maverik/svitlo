import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { instrumentsAndMeasurementMethods_SkillGroup_Data } from './instrumentsAndMeasurementMethods/instrumentsAndMeasurementMethods.data';
import { physicalQuantitiesAndUnits_SkillGroup_Data } from './physicalQuantitiesAndUnits/physicalQuantitiesAndUnits.data';

export const measurement_SkillDomain_Data = buildSkillDomainConfig({
  slug: "measurement",
  id: "4355ac3d-d328-4ce5-9a2a-8b5ec21edcc4",
  name: {
    en: "Measurement",
  },
  groups: {
    instrumentsAndMeasurementMethods: instrumentsAndMeasurementMethods_SkillGroup_Data,
    physicalQuantitiesAndUnits: physicalQuantitiesAndUnits_SkillGroup_Data,
  },
  description: {
    methodological: "Physical measurement connects an observable property to an agreed method of comparison through the choice of quantity, unit, and instrument. Its purpose is to make descriptions of phenomena reproducible without tying them to formulas or mathematics lessons.",
    frontend: {
      en: "Explore how physicists measure properties using quantities, units and reliable methods.",
    },
  },
});
