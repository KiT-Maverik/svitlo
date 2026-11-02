import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { breakAComplexPromptIntoSubtasks_Skill_Data, providePromptContext_Skill_Data, refineAPromptBasedOnResults_Skill_Data, specifyAnOutputFormat_Skill_Data, specifyAPromptObjective_Skill_Data, specifyARoleInAPrompt_Skill_Data, specifyPromptConstraints_Skill_Data } from './skills';

export const prompting_SkillGroup_Data = buildSkillGroupConfig({
  slug: "prompting",
  id: "b1ca0627-ec01-4c90-9e78-d3e54acaf01f",
  name: {
    en: "Prompting",
  },
  skills: {
    breakAComplexPromptIntoSubtasks: breakAComplexPromptIntoSubtasks_Skill_Data,
    providePromptContext: providePromptContext_Skill_Data,
    refineAPromptBasedOnResults: refineAPromptBasedOnResults_Skill_Data,
    specifyAnOutputFormat: specifyAnOutputFormat_Skill_Data,
    specifyAPromptObjective: specifyAPromptObjective_Skill_Data,
    specifyARoleInAPrompt: specifyARoleInAPrompt_Skill_Data,
    specifyPromptConstraints: specifyPromptConstraints_Skill_Data,
  },
  description: {
    methodological: "Specifying requirements for an AI request: objective, context, constraints, desired output format, and iterative refinement. Prompt components can vary independently; checking whether answers are true belongs to AI reliability.",
    frontend: {
      en: "Learn to give AI systems clearer instructions, context and constraints.",
    },
  },
});
