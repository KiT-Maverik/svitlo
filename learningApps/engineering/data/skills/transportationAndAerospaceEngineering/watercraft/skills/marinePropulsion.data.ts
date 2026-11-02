import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const marinePropulsion_Skill_Data = buildSkillConfig({
  slug: "marinePropulsion",
  id: "6f5b69aa-b4a2-4d4e-8fed-71bacb9f0f58",
  name: {
    en: "Marine propulsion",
  },
  description: {
    methodological: "Trace motor or engine output to propeller or waterjet thrust.",
    frontend: {
      en: "Trace how marine engines and propellers move a vessel.",
    },
  },
});
