import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { callAFunctionWithArguments_Skill_Data, defineAFunctionWithParameters_Skill_Data, explainRecursion_Skill_Data, explainThePurposeOfAFunction_Skill_Data, useAFunctionsReturnValue_Skill_Data } from './skills';

export const functionsAndReuse_SkillGroup_Data = buildSkillGroupConfig({
  slug: "functionsAndReuse",
  id: "b5b2b3f4-e49c-4296-a7d5-9347dddba11c",
  name: {
    en: "Functions and Reuse",
  },
  skills: {
    callAFunctionWithArguments: callAFunctionWithArguments_Skill_Data,
    defineAFunctionWithParameters: defineAFunctionWithParameters_Skill_Data,
    explainRecursion: explainRecursion_Skill_Data,
    explainThePurposeOfAFunction: explainThePurposeOfAFunction_Skill_Data,
    useAFunctionsReturnValue: useAFunctionsReturnValue_Skill_Data,
  },
  description: {
    methodological: "Named sections of programs with inputs, outputs, and defined responsibilities that help divide tasks and avoid repeating the same logic.",
    frontend: {
      en: "Learn to organize reusable operations as functions.",
    },
  },
});
