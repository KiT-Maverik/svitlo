import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const compareAlgorithmsAgainstRequirements_Skill_Data = buildSkillConfig({
  slug: "compareAlgorithmsAgainstRequirements",
  id: "b4444b39-3f9b-4405-be8c-85f9990aac8b",
  name: {
    en: "Compare Algorithms Against Requirements",
  },
  description: {
    methodological: "Compare correct approaches to the same problem based on constraints such as sortedness, number of checks, resources, and clarity. An algorithm with fewer steps may be unsuitable without its prerequisite.",
    frontend: {
      en: "Compare possible algorithms according to their requirements and limitations.",
    },
  },
});
