import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const callAFunctionWithArguments_Skill_Data = buildSkillConfig({
  slug: "callAFunctionWithArguments",
  id: "d5342f1e-42c1-4798-86d9-24052620530a",
  name: {
    en: "Call a Function with Arguments",
  },
  description: {
    methodological: "Supply concrete values at a call site and trace how they bind to formal parameters; distinguish defining a function from calling it.",
    frontend: {
      en: "Call a function with arguments and follow how they are used.",
    },
  },
});
