import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const detectAnInfiniteLoop_Skill_Data = buildSkillConfig({
  slug: "detectAnInfiniteLoop",
  id: "8324d7cb-d042-4280-9258-cd39f659597d",
  name: {
    en: "Detect an Infinite Loop",
  },
  description: {
    methodological: "Identify when a loop's termination condition can never be reached because a counter stays unchanged or state is updated incorrectly; explain the consequences for program execution.",
    frontend: {
      en: "Find a loop that cannot stop because its condition never becomes false.",
    },
  },
});
