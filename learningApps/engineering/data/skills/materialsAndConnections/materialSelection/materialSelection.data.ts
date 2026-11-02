import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compositeMaterialApplications_Skill_Data, distinguishMaterialStrengthAndStiffness_Skill_Data, evaluateMaterialDurability_Skill_Data, identifyRelevantMaterialProperties_Skill_Data, materialSuitabilityAssessment_Skill_Data } from './skills';

export const materialSelection_SkillGroup_Data = buildSkillGroupConfig({
  slug: "materialSelection",
  id: "64e73baf-4901-42e8-848f-738225064f38",
  name: {
    en: "Material Selection",
  },
  skills: {
    compositeMaterialApplications: compositeMaterialApplications_Skill_Data,
    distinguishMaterialStrengthAndStiffness: distinguishMaterialStrengthAndStiffness_Skill_Data,
    evaluateMaterialDurability: evaluateMaterialDurability_Skill_Data,
    identifyRelevantMaterialProperties: identifyRelevantMaterialProperties_Skill_Data,
    materialSuitabilityAssessment: materialSuitabilityAssessment_Skill_Data,
  },
  description: {
    methodological: "A component needs a combination of properties matched to its actual loading, manufacturing process and environment.",
    frontend: {
      en: "Explore how material properties affect technical performance.",
    },
  },
});
