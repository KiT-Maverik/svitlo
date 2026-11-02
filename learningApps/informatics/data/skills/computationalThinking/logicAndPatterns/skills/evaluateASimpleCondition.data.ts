import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const evaluateASimpleCondition_Skill_Data = buildSkillConfig({
  slug: "evaluateASimpleCondition",
  id: "52ae07ef-6103-48d2-a568-8a2ad38f480c",
  name: {
    en: "Evaluate a Simple Condition",
  },
  description: {
    methodological: "Given known facts, determine whether a single elementary condition holds, such as `temperature > 20` or `isOpen = true`. Distinguish a false statement from one whose truth cannot be determined with the available information; combining conditions is a separate logical operation.",
    frontend: {
      en: "Decide whether a single condition is true, false or cannot yet be determined.",
    },
  },
});
