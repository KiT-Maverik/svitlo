import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const randomAssignment_Skill_Data = buildSkillConfig({
  slug: "randomAssignment",
  id: "1f801f05-e175-4bfc-ac67-bb23ef3e8055",
  name: {
    en: "Random Assignment",
  },
  description: {
    methodological: "Explain how chance allocation to conditions reduces systematic differences without confusing it with population sampling.",
    frontend: {
      en: "Understand how random assignment can make study groups more comparable.",
    },
  },
});
