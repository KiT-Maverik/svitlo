import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { maintainHygieneDuringFoodPreparation_Skill_Data, preventRawToReadyFoodCrossContamination_Skill_Data, recognizeUnsafeFoodSituations_Skill_Data, safeCookingAndReheating_Skill_Data, safeFoodStorage_Skill_Data } from './skills';

export const foodborneHazards_SkillGroup_Data = buildSkillGroupConfig({
  slug: "foodborneHazards",
  id: "c278cf38-29cb-451a-b710-7c325d81568d",
  name: {
    en: "Foodborne Hazards",
  },
  skills: {
    maintainHygieneDuringFoodPreparation: maintainHygieneDuringFoodPreparation_Skill_Data,
    preventRawToReadyFoodCrossContamination: preventRawToReadyFoodCrossContamination_Skill_Data,
    recognizeUnsafeFoodSituations: recognizeUnsafeFoodSituations_Skill_Data,
    safeCookingAndReheating: safeCookingAndReheating_Skill_Data,
    safeFoodStorage: safeFoodStorage_Skill_Data,
  },
  description: {
    methodological: "Food safety depends on separation, temperature, handling, and storage; appearance or smell alone cannot always establish whether food is safe.",
    frontend: {
      en: "Discover how food preparation and storage can prevent illness.",
    },
  },
});
