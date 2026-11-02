import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const popAnElementFromAStack_Skill_Data = buildSkillConfig({
  slug: "popAnElementFromAStack",
  id: "6ceb4b87-a744-4a52-98fe-c2b3e13b7404",
  name: {
    en: "Pop an Element from a Stack",
  },
  description: {
    methodological: "Use `pop` to remove the top value while accounting for the special case of an empty stack.",
    frontend: {
      en: "Remove the most recent element while checking whether a stack is empty.",
    },
  },
});
