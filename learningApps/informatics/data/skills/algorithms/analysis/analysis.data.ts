import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishLinearAndLogarithmicGrowth_Skill_Data, estimateAnAlgorithmsWorstCase_Skill_Data, explainTimeMemoryTradeOffs_Skill_Data } from './skills';

export const analysis_SkillGroup_Data = buildSkillGroupConfig({
  slug: "analysis",
  id: "bc6b726f-667c-4681-a3d8-4fc2bc81e2d0",
  name: {
    en: "Analysis",
  },
  skills: {
    distinguishLinearAndLogarithmicGrowth: distinguishLinearAndLogarithmicGrowth_Skill_Data,
    estimateAnAlgorithmsWorstCase: estimateAnAlgorithmsWorstCase_Skill_Data,
    explainTimeMemoryTradeOffs: explainTimeMemoryTradeOffs_Skill_Data,
  },
  description: {
    methodological: "Compare procedures using worst-case operation bounds, time growth classes, and memory costs. These are cross-cutting ways to assess algorithms, not additional algorithms themselves.",
    frontend: {
      en: "Explore how time and memory needs change with an algorithm's input.",
    },
  },
});
