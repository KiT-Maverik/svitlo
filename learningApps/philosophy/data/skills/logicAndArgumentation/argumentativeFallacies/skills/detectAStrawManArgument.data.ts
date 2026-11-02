import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const detectAStrawManArgument_Skill_Data = buildSkillConfig({
  slug: "detectAStrawManArgument",
  id: "9ffb1b1c-5d0e-48bc-a6bd-3581025cf6a7",
  name: {
    en: "Detect a straw-man argument",
  },
  description: {
    methodological: "Show where a position is distorted into an easier target and recover the actual view before evaluating it.",
    frontend: {
      en: "Notice when someone's position is distorted into an easier argument to attack.",
    },
  },
});
