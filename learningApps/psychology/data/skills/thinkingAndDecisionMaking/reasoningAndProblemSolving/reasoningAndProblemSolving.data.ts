import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { deductiveReasoning_Skill_Data, functionalFixedness_Skill_Data, inductiveReasoning_Skill_Data, insightAndRestructuring_Skill_Data, meansEndsAnalysis_Skill_Data, problemRepresentation_Skill_Data } from './skills';

export const reasoningAndProblemSolving_SkillGroup_Data = buildSkillGroupConfig({
  slug: "reasoningAndProblemSolving",
  id: "337857fc-226b-4dcd-a9e8-459c9e552e0e",
  name: {
    en: "Reasoning and Problem Solving",
  },
  skills: {
    deductiveReasoning: deductiveReasoning_Skill_Data,
    functionalFixedness: functionalFixedness_Skill_Data,
    inductiveReasoning: inductiveReasoning_Skill_Data,
    insightAndRestructuring: insightAndRestructuring_Skill_Data,
    meansEndsAnalysis: meansEndsAnalysis_Skill_Data,
    problemRepresentation: problemRepresentation_Skill_Data,
  },
  description: {
    methodological: "A person's representation of a challenge constrains which rules, heuristics, and solutions become available.",
    frontend: {
      en: "Explore psychological processes involved in reasoning and solving problems.",
    },
  },
});
