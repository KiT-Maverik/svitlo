import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const useAFunctionsReturnValue_Skill_Data = buildSkillConfig({
  slug: "useAFunctionsReturnValue",
  id: "0ffc3fc0-7e50-47ab-b71d-e26f71e07365",
  name: {
    en: "Use a Function's Return Value",
  },
  description: {
    methodological: "Obtain a returned value and use it in another computation, distinguishing returned data from text printed to the screen.",
    frontend: {
      en: "Use a returned result in further calculations rather than merely displaying it.",
    },
  },
});
