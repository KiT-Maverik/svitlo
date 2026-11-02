import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareEnvironmentalTradeOffs_Skill_Data, designProductsForMaterialRecycling_Skill_Data, designProductsForReuse_Skill_Data, evaluateRepairability_Skill_Data, traceAProductLifeCycle_Skill_Data } from './skills';

export const lifeCycleAndResources_SkillGroup_Data = buildSkillGroupConfig({
  slug: "lifeCycleAndResources",
  id: "c6c6a121-9c6b-4760-8c4c-f1aaece36d86",
  name: {
    en: "Life Cycle and Resources",
  },
  skills: {
    compareEnvironmentalTradeOffs: compareEnvironmentalTradeOffs_Skill_Data,
    designProductsForMaterialRecycling: designProductsForMaterialRecycling_Skill_Data,
    designProductsForReuse: designProductsForReuse_Skill_Data,
    evaluateRepairability: evaluateRepairability_Skill_Data,
    traceAProductLifeCycle: traceAProductLifeCycle_Skill_Data,
  },
  description: {
    methodological: "Manufacture, operation, repair and disposal can create different impacts; improving one stage does not prove that the whole design is better.",
    frontend: {
      en: "Discover how products consume resources from manufacture to disposal.",
    },
  },
});
