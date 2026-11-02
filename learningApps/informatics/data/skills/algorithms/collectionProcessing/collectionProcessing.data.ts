import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { applyElementCounting_Skill_Data, applyMaximumFinding_Skill_Data, applyMinimumFinding_Skill_Data, applySumAccumulation_Skill_Data } from './skills';

export const collectionProcessing_SkillGroup_Data = buildSkillGroupConfig({
  slug: "collectionProcessing",
  id: "de8be859-0b36-498b-b8c1-18c4e7ab0249",
  name: {
    en: "Collection Processing",
  },
  skills: {
    applyElementCounting: applyElementCounting_Skill_Data,
    applyMaximumFinding: applyMaximumFinding_Skill_Data,
    applyMinimumFinding: applyMinimumFinding_Skill_Data,
    applySumAccumulation: applySumAccumulation_Skill_Data,
  },
  description: {
    methodological: "Step-by-step procedures that aggregate values while traversing a collection, such as counting, totaling, minimum, and maximum. Objects or cards can illustrate the operations.",
    frontend: {
      en: "Learn how to count, total and find extreme values while scanning data.",
    },
  },
});
