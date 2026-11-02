import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareAlgorithmsAgainstRequirements_Skill_Data, constructASequentialAlgorithm_Skill_Data, defineAnAlgorithmsGoal_Skill_Data, designConditionalBranching_Skill_Data, designRepetition_Skill_Data, implementARecursiveAlgorithm_Skill_Data } from './skills';

export const construction_SkillGroup_Data = buildSkillGroupConfig({
  slug: "construction",
  id: "0313947e-0474-4685-a697-515adc14eada",
  name: {
    en: "Construction",
  },
  skills: {
    compareAlgorithmsAgainstRequirements: compareAlgorithmsAgainstRequirements_Skill_Data,
    constructASequentialAlgorithm: constructASequentialAlgorithm_Skill_Data,
    defineAnAlgorithmsGoal: defineAnAlgorithmsGoal_Skill_Data,
    designConditionalBranching: designConditionalBranching_Skill_Data,
    designRepetition: designRepetition_Skill_Data,
    implementARecursiveAlgorithm: implementARecursiveAlgorithm_Skill_Data,
  },
  description: {
    methodological: "General ways of specifying an algorithm's goal, sequence, conditions, and repetition, regardless of purpose. Distinguish describing a correct procedure from implementing it in a programming language.",
    frontend: {
      en: "Learn to specify the actions, conditions and stopping rules of an algorithm.",
    },
  },
});
