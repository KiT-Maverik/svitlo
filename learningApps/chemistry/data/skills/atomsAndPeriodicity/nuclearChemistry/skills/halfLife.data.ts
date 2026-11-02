import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const halfLife_Skill_Data = buildSkillConfig({
  slug: "halfLife",
  id: "d43c4ea2-0821-4347-9c9c-dbd85622f5a6",
  name: {
    en: "Half-Life",
  },
  description: {
    methodological: "Interpret the characteristic decay time of a radioactive population without implying that individual nuclei have predictable lifetimes.",
    frontend: {
      en: "Understand half-life as a pattern for many radioactive atoms, not a clock for one atom.",
    },
  },
});
