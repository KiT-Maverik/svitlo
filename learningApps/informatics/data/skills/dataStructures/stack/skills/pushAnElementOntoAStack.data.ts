import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const pushAnElementOntoAStack_Skill_Data = buildSkillConfig({
  slug: "pushAnElementOntoAStack",
  id: "1043ac4e-4ba2-4a33-afac-cbe6943394c4",
  name: {
    en: "Push an Element onto a Stack",
  },
  description: {
    methodological: "Use `push` to place a new value on top without changing the order of previously added elements.",
    frontend: {
      en: "Place a new element on top of a stack.",
    },
  },
});
