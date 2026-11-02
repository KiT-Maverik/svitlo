import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const useInputData_Skill_Data = buildSkillConfig({
  slug: "useInputData",
  id: "d78501df-c1f6-4c9f-96df-97c074fa7394",
  name: {
    en: "Use Input Data",
  },
  description: {
    methodological: "Accept an external value as program input and use it in a computation or choice of action. The output should depend on input rather than on a fixed example.",
    frontend: {
      en: "Use information entered from outside the program to determine its behavior.",
    },
  },
});
