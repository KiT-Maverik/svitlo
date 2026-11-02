import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const testAProgramWithDifferentInputs_Skill_Data = buildSkillConfig({
  slug: "testAProgramWithDifferentInputs",
  id: "3f81b086-fa88-4f90-bde2-d5245a529ac3",
  name: {
    en: "Test a Program with Different Inputs",
  },
  description: {
    methodological: "Choose valid and boundary input sets, compare actual with expected results, and identify cases where the program behaves differently. One successful run does not establish overall correctness.",
    frontend: {
      en: "Test a program using different inputs, including boundary cases.",
    },
  },
});
