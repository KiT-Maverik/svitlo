import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { detectAnInfiniteLoop_Skill_Data, handleAnEvent_Skill_Data, implementALoop_Skill_Data, implementConditionalBehavior_Skill_Data, moveLoopInvariantComputationsOutsideALoop_Skill_Data, orderOverlappingConditionalChecks_Skill_Data, writeASequenceOfCommands_Skill_Data } from './skills';

export const programmingConstructs_SkillGroup_Data = buildSkillGroupConfig({
  slug: "programmingConstructs",
  id: "8da65c85-bad1-4a3c-bd42-deb0faeee09b",
  name: {
    en: "Programming Constructs",
  },
  skills: {
    detectAnInfiniteLoop: detectAnInfiniteLoop_Skill_Data,
    handleAnEvent: handleAnEvent_Skill_Data,
    implementALoop: implementALoop_Skill_Data,
    implementConditionalBehavior: implementConditionalBehavior_Skill_Data,
    moveLoopInvariantComputationsOutsideALoop: moveLoopInvariantComputationsOutsideALoop_Skill_Data,
    orderOverlappingConditionalChecks: orderOverlappingConditionalChecks_Skill_Data,
    writeASequenceOfCommands: writeASequenceOfCommands_Skill_Data,
  },
  description: {
    methodological: "Using executable commands, conditions, loops, and event responses to control a program. Unlike algorithm design, the constructs must be implemented in a particular execution environment.",
    frontend: {
      en: "Learn to control programs using sequences, conditions, loops and events.",
    },
  },
});
