import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const additiveManufacturing_Skill_Data = buildSkillConfig({
  slug: "additiveManufacturing",
  id: "fd8ac188-af63-42ac-bf10-316fd3af65bd",
  name: {
    en: "Additive manufacturing",
  },
  description: {
    methodological: "Describe incremental material placement or fusion used to produce three-dimensional parts.",
    frontend: {
      en: "Understand how additive processes build components in layers.",
    },
  },
});
