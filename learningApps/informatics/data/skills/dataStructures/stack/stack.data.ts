import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainLIFO_Skill_Data, popAnElementFromAStack_Skill_Data, pushAnElementOntoAStack_Skill_Data } from './skills';

export const stack_SkillGroup_Data = buildSkillGroupConfig({
  slug: "stack",
  id: "db6f2969-d2a6-4eb8-8139-335342dd4deb",
  name: {
    en: "Stack",
  },
  skills: {
    explainLIFO: explainLIFO_Skill_Data,
    popAnElementFromAStack: popAnElementFromAStack_Skill_Data,
    pushAnElementOntoAStack: pushAnElementOntoAStack_Skill_Data,
  },
  description: {
    methodological: "A structure using last-in, first-out (LIFO) access to its top element. Pushing, popping, and handling an empty stack are distinct operations.",
    frontend: {
      en: "Discover how a stack gives access to the most recently added item.",
    },
  },
});
