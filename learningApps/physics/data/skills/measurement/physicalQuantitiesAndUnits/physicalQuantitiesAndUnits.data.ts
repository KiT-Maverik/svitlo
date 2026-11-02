import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareMeasurementsOfTheSameQuantity_Skill_Data, distinguishAPhysicalQuantityFromItsUnitOfMeasurement_Skill_Data, explainThePhysicalMeaningOfABodysMass_Skill_Data, selectAUnitForAFamiliarPhysicalQuantity_Skill_Data } from './skills';

export const physicalQuantitiesAndUnits_SkillGroup_Data = buildSkillGroupConfig({
  slug: "physicalQuantitiesAndUnits",
  id: "093b9b15-c9bb-4812-b026-b749cf33ea9d",
  name: {
    en: "Physical Quantities and Units",
  },
  skills: {
    compareMeasurementsOfTheSameQuantity: compareMeasurementsOfTheSameQuantity_Skill_Data,
    distinguishAPhysicalQuantityFromItsUnitOfMeasurement: distinguishAPhysicalQuantityFromItsUnitOfMeasurement_Skill_Data,
    explainThePhysicalMeaningOfABodysMass: explainThePhysicalMeaningOfABodysMass_Skill_Data,
    selectAUnitForAFamiliarPhysicalQuantity: selectAUnitForAFamiliarPhysicalQuantity_Skill_Data,
  },
  description: {
    methodological: "A single object can be described using different quantities; comparisons of the same quantity require compatible units and observation conditions.",
    frontend: {
      en: "Learn to describe physical properties with appropriate measurements and units.",
    },
  },
});
