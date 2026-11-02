import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { foodborneHazards_SkillGroup_Data } from './foodborneHazards/foodborneHazards.data';
import { foodChoicesAndInformation_SkillGroup_Data } from './foodChoicesAndInformation/foodChoicesAndInformation.data';
import { nutritionalFoundations_SkillGroup_Data } from './nutritionalFoundations/nutritionalFoundations.data';

export const nutritionAndFoodSafety_SkillDomain_Data = buildSkillDomainConfig({
  slug: "nutritionAndFoodSafety",
  id: "dda753e6-e49c-4d4e-ae16-6ddae38a4bf8",
  name: {
    en: "Nutrition and Food Safety",
  },
  groups: {
    foodborneHazards: foodborneHazards_SkillGroup_Data,
    foodChoicesAndInformation: foodChoicesAndInformation_SkillGroup_Data,
    nutritionalFoundations: nutritionalFoundations_SkillGroup_Data,
  },
  description: {
    methodological: "Eating and drinking support health through nutrients, adequate intake, and safe preparation. Nutritional choices and microbial or chemical food hazards are distinct competencies, even though the same meal can involve both.",
    frontend: {
      en: "Learn how nourishment and careful food handling support health.",
    },
  },
});
