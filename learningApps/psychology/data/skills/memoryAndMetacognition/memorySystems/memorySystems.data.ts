import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { episodicMemory_Skill_Data, longTermRetention_Skill_Data, proceduralMemory_Skill_Data, semanticMemory_Skill_Data, sensoryMemory_Skill_Data, workingMemory_Skill_Data } from './skills';

export const memorySystems_SkillGroup_Data = buildSkillGroupConfig({
  slug: "memorySystems",
  id: "6edbad9c-a04d-4ca6-b82c-322269dae5fb",
  name: {
    en: "Memory Systems",
  },
  skills: {
    episodicMemory: episodicMemory_Skill_Data,
    longTermRetention: longTermRetention_Skill_Data,
    proceduralMemory: proceduralMemory_Skill_Data,
    semanticMemory: semanticMemory_Skill_Data,
    sensoryMemory: sensoryMemory_Skill_Data,
    workingMemory: workingMemory_Skill_Data,
  },
  description: {
    methodological: "Distinct forms of memory support immediate processing, recall of experiences and facts, and skilled performance.",
    frontend: {
      en: "Explore the different memory systems involved in remembering.",
    },
  },
});
