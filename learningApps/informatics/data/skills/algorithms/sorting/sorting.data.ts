import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { applyBubbleSort_Skill_Data, applyInsertionSort_Skill_Data, applySelectionSort_Skill_Data, explainASortingCriterion_Skill_Data } from './skills';

export const sorting_SkillGroup_Data = buildSkillGroupConfig({
  slug: "sorting",
  id: "00da5ac1-e268-4e7a-9676-d3a6631feb96",
  name: {
    en: "Sorting",
  },
  skills: {
    applyBubbleSort: applyBubbleSort_Skill_Data,
    applyInsertionSort: applyInsertionSort_Skill_Data,
    applySelectionSort: applySelectionSort_Skill_Data,
    explainASortingCriterion: explainASortingCriterion_Skill_Data,
  },
  description: {
    methodological: "Put elements in order according to a criterion using successive selection, insertion into a sorted prefix, or swapping adjacent items. Each method has its own independently assessable Skill.",
    frontend: {
      en: "Learn how sorting methods arrange values into a chosen order.",
    },
  },
});
