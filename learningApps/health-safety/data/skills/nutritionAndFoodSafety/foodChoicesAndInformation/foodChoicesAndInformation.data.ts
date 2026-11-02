import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { adaptFoodChoicesToDietaryNeeds_Skill_Data, interpretFoodLabels_Skill_Data, manageFoodAllergyRisks_Skill_Data, recognizeDietaryMisinformation_Skill_Data } from './skills';

export const foodChoicesAndInformation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "foodChoicesAndInformation",
  id: "2bc5c50a-8f91-4d44-8337-8ab1e50c600c",
  name: {
    en: "Food Choices and Information",
  },
  skills: {
    adaptFoodChoicesToDietaryNeeds: adaptFoodChoicesToDietaryNeeds_Skill_Data,
    interpretFoodLabels: interpretFoodLabels_Skill_Data,
    manageFoodAllergyRisks: manageFoodAllergyRisks_Skill_Data,
    recognizeDietaryMisinformation: recognizeDietaryMisinformation_Skill_Data,
  },
  description: {
    methodological: "Marketing, accessibility, food labels, allergies, and personal circumstances shape real-life nutritional decisions.",
    frontend: {
      en: "Learn to use labels and evidence when selecting foods.",
    },
  },
});
