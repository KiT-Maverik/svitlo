import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const pureSubstances_Skill_Data = buildSkillConfig({
  slug: "pureSubstances",
  id: "d903f13e-b3ed-488e-887d-e8857583e2b0",
  name: {
    en: "Pure Substances",
  },
  description: {
    methodological: "Distinguish a chemically defined substance from a sample containing additional components, even when the sample appears uniform.",
    frontend: {
      en: "Recognize when a sample is one pure substance rather than a mixture.",
    },
  },
});
