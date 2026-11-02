import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { diagnoseManufacturingDefects_Skill_Data, interpretManufacturingTolerances_Skill_Data, planAnAssemblySequence_Skill_Data, qualityInspection_Skill_Data } from './skills';

export const assemblyAndQuality_SkillGroup_Data = buildSkillGroupConfig({
  slug: "assemblyAndQuality",
  id: "2defad84-67bf-44b1-ba44-ba36b8d54770",
  name: {
    en: "Assembly and Quality",
  },
  skills: {
    diagnoseManufacturingDefects: diagnoseManufacturingDefects_Skill_Data,
    interpretManufacturingTolerances: interpretManufacturingTolerances_Skill_Data,
    planAnAssemblySequence: planAnAssemblySequence_Skill_Data,
    qualityInspection: qualityInspection_Skill_Data,
  },
  description: {
    methodological: "Making components separately is insufficient when fits, order of installation or verification are wrong.",
    frontend: {
      en: "Discover how assembly plans and checks help produce reliable products.",
    },
  },
});
