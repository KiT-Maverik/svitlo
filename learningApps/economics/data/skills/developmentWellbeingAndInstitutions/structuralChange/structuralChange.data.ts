import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { sectoralEconomicStructure_Skill_Data, structuralTransformation_Skill_Data, technologicalCatchUp_Skill_Data } from './skills';

export const structuralChange_SkillGroup_Data = buildSkillGroupConfig({
  slug: "structuralChange",
  id: "11c727a8-6902-463b-93ea-a62b9ebdb522",
  name: {
    en: "Структурні зміни",
  },
  skills: {
    sectoralEconomicStructure: sectoralEconomicStructure_Skill_Data,
    structuralTransformation: structuralTransformation_Skill_Data,
    technologicalCatchUp: technologicalCatchUp_Skill_Data,
  },
  description: {
    methodological: "As productivity increases, the shares of industries and occupations and the organization of work change.",
    frontend: {
      en: "Discover how an economy's mix of jobs and industries evolves.",
    },
  },
});
