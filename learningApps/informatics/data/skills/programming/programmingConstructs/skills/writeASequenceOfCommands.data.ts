import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const writeASequenceOfCommands_Skill_Data = buildSkillConfig({
  slug: "writeASequenceOfCommands",
  id: "e62d8ab7-d6d7-4d44-9030-4bf107580631",
  name: {
    en: "Write a Sequence of Commands",
  },
  description: {
    methodological: "Translate specified steps into syntactically valid instructions for an environment that executes them in order. Unlike describing an algorithm in prose, this requires observing language rules and command effects.",
    frontend: {
      en: "Write valid commands that perform actions in the intended order.",
    },
  },
});
